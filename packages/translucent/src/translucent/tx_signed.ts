import { C, CTransaction } from "../core/mod";
import type { Transaction, TxHash } from "../types/mod";
import { Translucent } from "./translucent";
import { toHex } from "../utils/mod";

export class TxSigned {
  txSigned: CTransaction;
  private translucent: Translucent;
  constructor(translucent: Translucent, tx: CTransaction) {
    this.translucent = translucent;
    this.txSigned = tx;
  }

  async submit(): Promise<TxHash> {
    return await (
      this.translucent.wallet || this.translucent.provider
    ).submitTx(toHex(this.txSigned.to_bytes()));
  }

  /** Returns the transaction in Hex encoded Cbor. */
  toString(): Transaction {
    return toHex(this.txSigned.to_bytes());
  }

  /** Return the transaction hash. */
  toHash(): TxHash {
    return C.hash_transaction(this.txSigned.body()).to_hex();
  }
}
