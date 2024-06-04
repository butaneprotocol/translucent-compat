import { C, type CStakeCredential, type Credential } from "../mod";

export const toCore = {
  credential(credential: Credential): CStakeCredential {
    if (credential.type == "Key") {
      return C.StakeCredential.from_keyhash(
        C.Ed25519KeyHash.from_hex(credential.hash),
      );
    } else if (credential.type == "Script") {
      return C.StakeCredential.from_scripthash(
        C.ScriptHash.from_hex(credential.hash),
      );
    }
    throw new Error("Lucid credential type mismatch");
  },
};
