import { sleep } from "bun";
import {
  fromText,
  Maestro,
  MintingPolicy,
  PolicyId,
  TxHash,
  Unit,
} from "../mod.ts";
import { getInstanceWithWallet } from "./common.ts";

/*
  MintSimpleNFT Example
  Mint or burn a simple NFT.
 */

// This will create a new Translucent instance either by creating a new Seed Phrase or using the one provided in seed.txt
const translucent = await getInstanceWithWallet(
  new Maestro({
    network: "Preview",
    apiKey: "<API_KEY>",
  }),
  "Preview",
);

const address = await translucent.wallet.address();
const { paymentCredential } = translucent.utils.getAddressDetails(address);

const mintingPolicy: MintingPolicy = translucent.utils.nativeScriptFromJson({
  type: "all",
  scripts: [
    { type: "sig", keyHash: paymentCredential?.hash! },
    {
      type: "before",
      slot: translucent.utils.unixTimeToSlot(Date.now() + 10000000),
    },
  ],
});

const policyId: PolicyId = translucent.utils.mintingPolicyToId(mintingPolicy);

await mintNFT("test");
await sleep(30000);
await burnNFT("test");

export async function mintNFT(name: string): Promise<TxHash> {
  const unit: Unit = policyId + fromText(name);

  const tx = await translucent
    .newTx()
    .attachMintingPolicy(mintingPolicy)
    .mintAssets({ [unit]: 1n })
    .addSignerKey(paymentCredential?.hash!)
    .validTo(Date.now() + 100000)
    .complete();

  const signedTx = await tx.sign().complete();

  const txHash = await signedTx.submit();

  return txHash;
}

export async function burnNFT(name: string): Promise<TxHash> {
  const unit: Unit = policyId + fromText(name);

  const tx = await translucent
    .newTx()
    .mintAssets({ [unit]: -1n })
    .validTo(Date.now() + 100000)
    .attachMintingPolicy(mintingPolicy)
    .complete();

  const signedTx = await tx.sign().complete();

  const txHash = await signedTx.submit();

  return txHash;
}
