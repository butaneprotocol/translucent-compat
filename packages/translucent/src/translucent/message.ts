import { Translucent } from "./mod";
import type {
  Address,
  Payload,
  PrivateKey,
  RewardAddress,
  SignedMessage,
} from "../types/mod.ts";
import { signData } from "../misc/sign_data";
import { C } from "../mod";

export class Message {
  translucent: Translucent;
  address: Address | RewardAddress;
  payload: Payload;

  constructor(
    translucent: Translucent,
    address: Address | RewardAddress,
    payload: Payload,
  ) {
    this.translucent = translucent;
    this.address = address;
    this.payload = payload;
  }

  /** Sign message with selected wallet. */
  sign(): Promise<SignedMessage> {
    return this.translucent.wallet.signMessage(this.address, this.payload);
  }

  /** Sign message with a separate private key. */
  signWithPrivateKey(privateKey: PrivateKey): SignedMessage {
    const {
      paymentCredential,
      stakeCredential,
      address: { hex: hexAddress },
    } = this.translucent.utils.getAddressDetails(this.address);

    const keyHash = paymentCredential?.hash || stakeCredential?.hash;

    const keyHashOriginal = C.PrivateKey.from_bech32(privateKey)
      .to_public()
      .hash()
      .to_hex();

    if (!keyHash || keyHash !== keyHashOriginal) {
      throw new Error(`Cannot sign message for address: ${this.address}.`);
    }

    return signData(hexAddress, this.payload, privateKey);
  }
}
