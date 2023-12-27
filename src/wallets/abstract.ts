import { UTxO, C, Delegation, Payload, TxHash, Address, RewardAddress , Transaction, SignedMessage} from "../mod";

export abstract class AbstractWallet {
    abstract address(): Promise<Address>;
    abstract rewardAddress(): Promise<RewardAddress | null>;
    abstract getUtxos(): Promise<UTxO[]>;
    abstract getUtxosCore(): Promise<C.TransactionUnspentOutputs>;
    abstract getDelegation(): Promise<Delegation>;
    abstract signTx(tx: C.Transaction): Promise<C.TransactionWitnessSet>;
    abstract signMessage(
        address: Address | RewardAddress,
        payload: Payload,
    ): Promise<SignedMessage>;
    abstract submitTx(signedTx: Transaction): Promise<TxHash>;
}