import { setupTestInstance } from "../test_utils/mod.ts";

it("Mint(success): policy with required signature", async () => {
  const { translucent, details } = await setupTestInstance({ accountIndex: 0 });
  const mintingPolicy = translucent.utils.nativeScriptFromJson({
    type: "sig",
    keyHash: details.paymentCredential?.hash!,
  });
  const policyId = translucent.utils.mintingPolicyToId(mintingPolicy);
  const unit = policyId.concat("test");
  const tx = await translucent
    .newTx()
    .attachMintingPolicy(mintingPolicy)
    .mintAssets({ [unit]: 1n })
    .addSignerKey(details.paymentCredential?.hash!)
    .complete();

  const signedTx = await tx.sign().complete();

  await expect(signedTx.submit()).resolves.toBeDefined();
});

it("Mint(fails): policy with required signature - Missing signature", async () => {
  const { details: detailsAccount0, address: adr } = await setupTestInstance({
    accountIndex: 0,
  });
  const { translucent, address } = await setupTestInstance({ accountIndex: 1 });
  const mintingPolicy = translucent.utils.nativeScriptFromJson({
    type: "sig",
    keyHash: detailsAccount0.paymentCredential?.hash!,
  });
  const policyId = translucent.utils.mintingPolicyToId(mintingPolicy);
  const unit = policyId.concat("test");
  const tx = await translucent
    .newTx()
    .attachMintingPolicy(mintingPolicy)
    .mintAssets({ [unit]: 1n })
    .complete();

  const signedTx = await tx.sign().complete();
  await expect(signedTx.submit()).rejects.toThrow();
});
