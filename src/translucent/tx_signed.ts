import { C } from "../core/mod.ts";
import { Transaction, TxHash } from "../types/mod.ts";
import { Translucent } from "./translucent.ts";
import { toHex } from "../utils/mod.ts";

export class TxSigned {
  txSigned: C.Transaction;
  private translucent: Translucent;
  constructor(translucent: Translucent, tx: C.Transaction) {
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
