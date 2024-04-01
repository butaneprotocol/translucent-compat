import { signData } from "../misc/sign_data";
import { discoverOwnUsedTxKeyHashes, walletFromSeed } from "../misc/wallet";
import {
  type Address,
  C,
  type Delegation,
  type KeyHash,
  type Payload,
  type RewardAddress,
  type SignedMessage,
  type Transaction,
  Translucent,
  type TxHash,
  type UTxO,
  paymentCredentialOf,
  utxoToCore,
  CTransaction,
  CTransactionWitnessSet,
  CTransactionUnspentOutputs,
} from "../mod";
import { AbstractWallet } from "./abstract";

/**
 * Select wallet from a seed phrase (e.g. 15 or 24 words). You have the option to choose between a Base address (with stake credential)
 * and Enterprise address (without stake credential). You can also decide which account index to derive. By default account 0 is derived.
 */
export class SeedWallet implements AbstractWallet {
  translucent: Translucent;
  private address_: string;
  private rewardAddress_: string | null;
  private paymentKeyHash: string;
  private stakeKeyHash: string;
  private privKeyHashMap: Record<string, string | null>;
  constructor(
    translucent: Translucent,
    seed: string,
    options?: {
      addressType?: "Base" | "Enterprise";
      accountIndex?: number;
      password?: string;
    },
  ) {
    this.translucent = translucent;
    const { address, rewardAddress, paymentKey, stakeKey } = walletFromSeed(
      seed,
      {
        addressType: options?.addressType || "Base",
        accountIndex: options?.accountIndex || 0,
        password: options?.password,
        network: this.translucent.network,
      },
    );
    this.address_ = address;
    this.rewardAddress_ = rewardAddress;
    const paymentKeyHash = C.PrivateKey.from_bech32(paymentKey)
      .to_public()
      .hash()
      .to_hex();
    this.paymentKeyHash = paymentKeyHash;
    const stakeKeyHash = stakeKey
      ? C.PrivateKey.from_bech32(stakeKey).to_public().hash().to_hex()
      : "";
    this.stakeKeyHash = stakeKeyHash;
    const privKeyHashMap = {
      [paymentKeyHash]: paymentKey,
      [stakeKeyHash]: stakeKey,
    };
    this.privKeyHashMap = privKeyHashMap;
  }

  // deno-lint-ignore require-await
  async address(): Promise<Address> {
    return this.address_;
  }
  // deno-lint-ignore require-await
  async rewardAddress(): Promise<RewardAddress | null> {
    return this.rewardAddress_ || null;
  }
  // deno-lint-ignore require-await
  async getUtxos(): Promise<UTxO[]> {
    return this.translucent.utxosAt(paymentCredentialOf(this.address_));
  }
  async getUtxosCore(): Promise<CTransactionUnspentOutputs> {
    const coreUtxos = C.TransactionUnspentOutputs.new();
    (
      await this.translucent.utxosAt(paymentCredentialOf(this.address_))
    ).forEach((utxo) => {
      coreUtxos.add(utxoToCore(utxo));
    });
    return coreUtxos;
  }
  async getDelegation(): Promise<Delegation> {
    const rewardAddr = await this.rewardAddress();
    return rewardAddr
      ? await this.translucent.delegationAt(rewardAddr)
      : { poolId: null, rewards: 0n };
  }
  async signTx(tx: CTransaction): Promise<CTransactionWitnessSet> {
    const utxos = await this.translucent.utxosAt(this.address_);
    const ownKeyHashes: Array<KeyHash> = [
      this.paymentKeyHash,
      this.stakeKeyHash,
    ];
    const usedKeyHashes = discoverOwnUsedTxKeyHashes(tx, ownKeyHashes, utxos);
    const txWitnessSetBuilder = C.TransactionWitnessSetBuilder.new();
    usedKeyHashes.forEach((keyHash) => {
      const witness = C.make_vkey_witness(
        C.hash_transaction(tx.body()),
        C.PrivateKey.from_bech32(this.privKeyHashMap[keyHash]!),
      );
      txWitnessSetBuilder.add_vkey(witness);
    });
    return txWitnessSetBuilder.build();
  }
  // deno-lint-ignore require-await
  async signMessage(
    address: Address | RewardAddress,
    payload: Payload,
  ): Promise<SignedMessage> {
    const {
      paymentCredential,
      stakeCredential,
      address: { hex: hexAddress },
    } = this.translucent.utils.getAddressDetails(address);
    const keyHash = paymentCredential?.hash || stakeCredential?.hash;
    const privateKey = this.privKeyHashMap[keyHash!];
    if (!privateKey) {
      throw new Error(`Cannot sign message for address: ${address}.`);
    }
    return signData(hexAddress, payload, privateKey);
  }
  async submitTx(tx: Transaction): Promise<TxHash> {
    return await this.translucent.provider.submitTx(tx);
  }
}
