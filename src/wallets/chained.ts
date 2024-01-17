import {
  UTxO,
  C,
  Delegation,
  Payload,
  TxHash,
  SignedMessage,
  Address,
  RewardAddress,
  Transaction,
  Translucent,
  utxoToCore,
  fromHex,
  coreToUtxo,
} from "../mod";
import { AbstractWallet } from "./abstract";

export class ChainedWallet implements AbstractWallet {
  translucent: Translucent;
  wallet: AbstractWallet;
  utxos: UTxO[] = [];

  constructor(translucent: Translucent, wallet: AbstractWallet) {
    this.translucent = translucent;
    this.wallet = wallet;
    wallet.getUtxos().then((utxos) => (this.utxos = utxos));
  }

  async refreshUtxos() {
    this.utxos = await this.wallet.getUtxos();
  }

  async chain(tx: Transaction, predicate: (utxo: UTxO) => boolean) {
    const txCore = C.Transaction.from_bytes(fromHex(tx));
    const hash = C.hash_transaction(txCore.body());
    const inputs = txCore.body().inputs();
    const outputs = txCore.body().outputs();
    const toConsume: Record<string, boolean> = {};
    for (let i = 0; i < inputs.len(); i++) {
      const input = inputs.get(i);
      toConsume[input.transaction_id().to_hex() + input.index()] = true;
    }
    this.utxos = this.utxos.filter(
      (utxo) => toConsume[utxo.txHash + utxo.outputIndex.toString()] == true,
    );
    for (let i = 0; i < outputs.len(); i++) {
      const output = C.TransactionUnspentOutput.new(
        C.TransactionInput.new(hash, C.BigNum.from_str(i.toString())),
        outputs.get(i),
      );
      const utxo = coreToUtxo(output);
      if (predicate(utxo)) {
        this.utxos.push(utxo);
      }
    }
  }

  address(): Promise<Address> {
    return this.wallet.address();
  }

  rewardAddress(): Promise<RewardAddress | null> {
    return this.wallet.rewardAddress();
  }

  getUtxos(): Promise<UTxO[]> {
    return Promise.resolve(this.utxos);
  }

  getUtxosCore(): Promise<C.TransactionUnspentOutputs> {
    const outputs = C.TransactionUnspentOutputs.new();
    const utxos = this.utxos.map(utxoToCore);
    for (const utxo of utxos) {
      outputs.add(utxo);
    }
    return Promise.resolve(outputs);
  }

  getDelegation(): Promise<Delegation> {
    return this.wallet.getDelegation();
  }

  signTx(tx: C.Transaction): Promise<C.TransactionWitnessSet> {
    return this.wallet.signTx(tx);
  }

  signMessage(
    address: Address | RewardAddress,
    payload: Payload,
  ): Promise<SignedMessage> {
    return this.wallet.signMessage(address, payload);
  }

  submitTx(signedTx: Transaction): Promise<TxHash> {
    return this.wallet.submitTx(signedTx);
  }
}
