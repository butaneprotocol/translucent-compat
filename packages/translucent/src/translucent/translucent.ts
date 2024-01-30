import { C } from "../core/mod.ts";
import {
  createCostModels,
  fromHex,
  fromUnit,
  paymentCredentialOf,
  toUnit,
  Utils,
  utxoToCore,
} from "../utils/mod.ts";
import {
  Address,
  Credential,
  Delegation,
  Json,
  KeyHash,
  Network,
  OutRef,
  Payload,
  PrivateKey,
  ProtocolParameters,
  Provider,
  RewardAddress,
  SignedMessage,
  Slot,
  Transaction,
  TxHash,
  Unit,
  UTxO,
  WalletApi,
} from "../types/mod.ts";
import { Tx } from "./tx.ts";
import { TxComplete } from "./tx_complete.ts";
import { discoverOwnUsedTxKeyHashes, walletFromSeed } from "../misc/wallet.ts";
import { signData, verifyData } from "../misc/sign_data.ts";
import { Message } from "./message.ts";
import { SLOT_CONFIG_NETWORK } from "../plutus/time.ts";
import { Constr, Data } from "../plutus/data.ts";
import { Emulator } from "../provider/emulator.ts";
import { toCore } from "../utils/to.ts";
import { WalletConnector } from "../wallets/wallet_connector.ts";
import { AbstractWallet } from "../wallets/abstract.ts";
import { PrivateKeyWallet } from "../wallets/private_key.ts";
import { SeedWallet } from "../wallets/seed.ts";
import { ExternalWallet } from "../wallets/public_wallet.ts";

export class Translucent {
  txBuilderConfig!: C.TransactionBuilderConfig;
  wallet!: AbstractWallet;
  provider!: Provider;
  protocolParams: ProtocolParameters | null = null
  network: Network = "Mainnet";
  utils!: Utils;

  static async new(
    provider?: Provider,
    network?: Network,
  ): Promise<Translucent> {
    const translucent = new this();
    if (network) translucent.network = network;
    if (provider) {
      translucent.provider = provider;
      const protocolParameters = await provider.getProtocolParameters();

      if (translucent.provider instanceof Emulator) {
        translucent.network = "Custom";
        SLOT_CONFIG_NETWORK[translucent.network] = {
          zeroTime: translucent.provider.now(),
          zeroSlot: 0,
          slotLength: 1000,
        };
      }

      const slotConfig = SLOT_CONFIG_NETWORK[translucent.network];
      translucent.txBuilderConfig = C.TransactionBuilderConfigBuilder.new()
        .coins_per_utxo_byte(
          C.BigNum.from_str(protocolParameters.coinsPerUtxoByte.toString()),
        )
        .fee_algo(
          C.LinearFee.new(
            C.BigNum.from_str(protocolParameters.minFeeA.toString()),
            C.BigNum.from_str(protocolParameters.minFeeB.toString()),
          ),
        )
        .key_deposit(
          C.BigNum.from_str(protocolParameters.keyDeposit.toString()),
        )
        .pool_deposit(
          C.BigNum.from_str(protocolParameters.poolDeposit.toString()),
        )
        .max_tx_size(protocolParameters.maxTxSize)
        .max_value_size(protocolParameters.maxValSize)
        .collateral_percentage(protocolParameters.collateralPercentage)
        .max_collateral_inputs(protocolParameters.maxCollateralInputs)
        .ex_unit_prices(
          C.ExUnitPrices.new(
            C.UnitInterval.new(
              C.BigNum.from_str(protocolParameters.priceMem[0].toString()),
              C.BigNum.from_str(protocolParameters.priceMem[1].toString()),
            ),
            C.UnitInterval.new(
              C.BigNum.from_str(protocolParameters.priceStep[0].toString()),
              C.BigNum.from_str(protocolParameters.priceStep[1].toString()),
            ),
          ),
        )
        .costmdls(createCostModels(protocolParameters.costModels))
        .build();
    }
    translucent.utils = new Utils(translucent);
    return translucent;
  }

  async getProtocolParameters(): Promise<ProtocolParameters> {
    if (this.protocolParams === null) {
      this.protocolParams = await this.provider.getProtocolParameters();
    }
    return this.protocolParams;
  }

  /**
   * Switch provider and/or network.
   * If provider or network unset, no overwriting happens. Provider or network from current instance are taken then.
   */
  async switchProvider(
    provider?: Provider,
    network?: Network,
  ): Promise<Translucent> {
    if (this.network === "Custom") {
      throw new Error("Cannot switch when on custom network.");
    }
    const translucent = await Translucent.new(provider, network);
    this.txBuilderConfig = translucent.txBuilderConfig;
    this.provider = provider || this.provider;
    this.network = network || this.network;
    this.wallet = translucent.wallet;
    return this;
  }

  newTx(): Tx {
    return new Tx(this);
  }

  fromTx(tx: Transaction): TxComplete {
    return new TxComplete(this, C.Transaction.from_bytes(fromHex(tx)));
  }

  /** Signs a message. Expects the payload to be Hex encoded. */
  newMessage(address: Address | RewardAddress, payload: Payload): Message {
    return new Message(this, address, payload);
  }

  /** Verify a message. Expects the payload to be Hex encoded. */
  verifyMessage(
    address: Address | RewardAddress,
    payload: Payload,
    signedMessage: SignedMessage,
  ): boolean {
    const {
      paymentCredential,
      stakeCredential,
      address: { hex: addressHex },
    } = this.utils.getAddressDetails(address);
    const keyHash = paymentCredential?.hash || stakeCredential?.hash;
    if (!keyHash) throw new Error("Not a valid address provided.");

    return verifyData(addressHex, keyHash, payload, signedMessage);
  }

  currentSlot(): Slot {
    return this.utils.unixTimeToSlot(Date.now());
  }

  utxosAt(addressOrCredential: Address | Credential): Promise<UTxO[]> {
    return this.provider.getUtxos(addressOrCredential);
  }

  utxosAtWithUnit(
    addressOrCredential: Address | Credential,
    unit: Unit,
  ): Promise<UTxO[]> {
    return this.provider.getUtxosWithUnit(addressOrCredential, unit);
  }

  /** Unit needs to be an NFT (or optionally the entire supply in one UTxO). */
  utxoByUnit(unit: Unit): Promise<UTxO> {
    return this.provider.getUtxoByUnit(unit);
  }

  utxosByOutRef(outRefs: Array<OutRef>): Promise<UTxO[]> {
    return this.provider.getUtxosByOutRef(outRefs);
  }

  delegationAt(rewardAddress: RewardAddress): Promise<Delegation> {
    return this.provider.getDelegation(rewardAddress);
  }

  awaitTx(txHash: TxHash, checkInterval = 3000): Promise<boolean> {
    return this.provider.awaitTx(txHash, checkInterval);
  }

  async datumOf<T = Data>(utxo: UTxO, type?: T): Promise<T> {
    if (!utxo.datum) {
      if (!utxo.datumHash) {
        throw new Error("This UTxO does not have a datum hash.");
      }
      utxo.datum = await this.provider.getDatum(utxo.datumHash);
    }
    return Data.from<T>(utxo.datum, type);
  }

  /** Query CIP-0068 metadata for a specifc asset. */
  async metadataOf<T = Json>(unit: Unit): Promise<T> {
    const { policyId, name, label } = fromUnit(unit);
    switch (label) {
      case 222:
      case 333:
      case 444: {
        const utxo = await this.utxoByUnit(toUnit(policyId, name, 100));
        const metadata = (await this.datumOf(utxo)) as Constr<Data>;
        return Data.toJson(metadata.fields[0]);
      }
      default:
        throw new Error("No variant matched.");
    }
  }

  selectWalletFromPrivateKey(privateKey: PrivateKey): Translucent {
    return this.useWallet(new PrivateKeyWallet(this, privateKey));
  }

  selectWallet(api: WalletApi): Translucent {
    return this.useWallet(new WalletConnector(this, api));
  }

  selectWalletFrom(
    address: Address,
    utxos?: UTxO[],
    rewardAddress?: RewardAddress,
  ): Translucent {
    return this.useWallet(
      new ExternalWallet(this, address, utxos, rewardAddress),
    );
  }

  selectWalletFromSeed(
    seed: string,
    options?: {
      addressType?: "Base" | "Enterprise";
      accountIndex?: number;
      password?: string;
    },
  ): Translucent {
    return this.useWallet(new SeedWallet(this, seed, options));
  }

  useWallet(wallet: AbstractWallet) {
    this.wallet = wallet;
    return this;
  }
}
