import type {
  UTxO,
  Delegation,
  Payload,
  TxHash,
  Address,
  RewardAddress,
  Transaction,
  SignedMessage,
  CTransactionWitnessSet,
  CTransactionUnspentOutputs,
  CTransaction,
} from "../mod";

export abstract class AbstractWallet {
  abstract address(): Promise<Address>;
  abstract rewardAddress(): Promise<RewardAddress | null>;
  abstract getUtxos(): Promise<UTxO[]>;
  abstract getUtxosCore(): Promise<CTransactionUnspentOutputs>;
  abstract getDelegation(): Promise<Delegation>;
  abstract signTx(tx: CTransaction): Promise<CTransactionWitnessSet>;
  abstract signMessage(
    address: Address | RewardAddress,
    payload: Payload,
  ): Promise<SignedMessage>;
  abstract submitTx(signedTx: Transaction): Promise<TxHash>;
}
