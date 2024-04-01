import {
  type Address,
  type Delegation,
  type Payload,
  type RewardAddress,
  type SignedMessage,
  type Transaction,
  type TxHash,
  type UTxO,
  type WalletApi,
  coreToUtxo,
  fromHex,
  toHex,
  C,
  Translucent,
  CTransactionUnspentOutputs,
  CTransaction,
  CTransactionWitnessSet,
} from "../mod";
import { AbstractWallet } from "./abstract";

export class WalletConnector implements AbstractWallet {
  translucent: Translucent;
  api: WalletApi;

  constructor(translucent: Translucent, api: WalletApi) {
    this.translucent = translucent;
    this.api = api;
  }

  async getAddressHex() {
    const [addressHex] = await this.api.getUsedAddresses();
    if (addressHex) return addressHex;

    const [unusedAddressHex] = await this.api.getUnusedAddresses();
    return unusedAddressHex;
  }

  async address(): Promise<Address> {
    return C.Address.from_bytes(fromHex(await this.getAddressHex())).to_bech32(
      undefined,
    );
  }
  async rewardAddress(): Promise<RewardAddress | null> {
    const [rewardAddressHex] = await this.api.getRewardAddresses();
    const rewardAddress = rewardAddressHex
      ? C.RewardAddress.from_address(
        C.Address.from_bytes(fromHex(rewardAddressHex)),
      )!
        .to_address()
        .to_bech32(undefined)
      : null;
    return rewardAddress;
  }
  async getUtxos(): Promise<UTxO[]> {
    const utxos = ((await this.api.getUtxos()) || []).map((utxo) => {
      const parsedUtxo = C.TransactionUnspentOutput.from_bytes(fromHex(utxo));
      return coreToUtxo(parsedUtxo);
    });
    return utxos;
  }
  async getUtxosCore(): Promise<CTransactionUnspentOutputs> {
    const utxos = C.TransactionUnspentOutputs.new();
    ((await this.api.getUtxos()) || []).forEach((utxo) => {
      utxos.add(C.TransactionUnspentOutput.from_bytes(fromHex(utxo)));
    });
    return utxos;
  }
  async getDelegation(): Promise<Delegation> {
    const rewardAddr = await this.rewardAddress();
    return rewardAddr
      ? await this.translucent.delegationAt(rewardAddr)
      : { poolId: null, rewards: 0n };
  }
  async signTx(tx: CTransaction): Promise<CTransactionWitnessSet> {
    const witnessSet = await this.api.signTx(toHex(tx.to_bytes()), true);
    return C.TransactionWitnessSet.from_bytes(fromHex(witnessSet));
  }
  async signMessage(
    address: Address | RewardAddress,
    payload: Payload,
  ): Promise<SignedMessage> {
    const hexAddress = toHex(C.Address.from_bech32(address).to_bytes());
    return await this.api.signData(hexAddress, payload);
  }
  async submitTx(tx: Transaction): Promise<TxHash> {
    const txHash = await this.api.submitTx(tx);
    return txHash;
  }
}
