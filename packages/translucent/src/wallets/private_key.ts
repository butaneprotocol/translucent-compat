import { signData } from "../misc/sign_data";
import {
  SignedMessage,
  PrivateKey,
  Address,
  RewardAddress,
  Transaction,
  Translucent,
  WalletApi,
  C,
  UTxO,
  paymentCredentialOf,
  utxoToCore,
  Delegation,
  Payload,
  TxHash,
} from "../mod";
import { AbstractWallet } from "./abstract";

/**
 * Cardano Private key in bech32; not the BIP32 private key or any key that is not fully derived.
 * Only an Enteprise address (without stake credential) is derived.
 */
export class PrivateKeyWallet implements AbstractWallet {
  translucent: Translucent;
  private privateKey: PrivateKey;
  private priv: C.PrivateKey;
  pubKeyHash: C.Ed25519KeyHash;

  constructor(translucent: Translucent, privateKey: PrivateKey) {
    this.translucent = translucent;
    this.privateKey = privateKey;
    this.priv = C.PrivateKey.from_bech32(privateKey);
    this.pubKeyHash = this.priv.to_public().hash();
  }

  async address(): Promise<Address> {
    return C.EnterpriseAddress.new(
      this.translucent.network === "Mainnet" ? 1 : 0,
      C.StakeCredential.from_keyhash(this.pubKeyHash),
    )
      .to_address()
      .to_bech32(undefined);
  }
  // deno-lint-ignore require-await
  async rewardAddress(): Promise<RewardAddress | null> {
    return null;
  }
  async getUtxos(): Promise<UTxO[]> {
    return await this.translucent.utxosAt(
      paymentCredentialOf(await this.address()),
    );
  }
  async getUtxosCore(): Promise<C.TransactionUnspentOutputs> {
    const utxos = await this.translucent.utxosAt(
      paymentCredentialOf(await this.address()),
    );
    const coreUtxos = C.TransactionUnspentOutputs.new();
    utxos.forEach((utxo) => {
      coreUtxos.add(utxoToCore(utxo));
    });
    return coreUtxos;
  }
  // deno-lint-ignore require-await
  async getDelegation(): Promise<Delegation> {
    return { poolId: null, rewards: 0n };
  }
  // deno-lint-ignore require-await
  async signTx(tx: C.Transaction): Promise<C.TransactionWitnessSet> {
    const witness = C.make_vkey_witness(
      C.hash_transaction(tx.body()),
      this.priv,
    );
    const txWitnessSetBuilder = C.TransactionWitnessSetBuilder.new();
    txWitnessSetBuilder.add_vkey(witness);
    return txWitnessSetBuilder.build();
  }
  // deno-lint-ignore require-await
  async signMessage(
    address: Address | RewardAddress,
    payload: Payload,
  ): Promise<SignedMessage> {
    const {
      paymentCredential,
      address: { hex: hexAddress },
    } = this.translucent.utils.getAddressDetails(address);
    const keyHash = paymentCredential?.hash;
    const originalKeyHash = this.pubKeyHash.to_hex();
    if (!keyHash || keyHash !== originalKeyHash) {
      throw new Error(`Cannot sign message for address: ${address}.`);
    }
    return signData(hexAddress, payload, this.privateKey);
  }
  async submitTx(tx: Transaction): Promise<TxHash> {
    return await this.translucent.provider.submitTx(tx);
  }
}
