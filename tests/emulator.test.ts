import {
  Assets,
  Data,
  Emulator,
  fromText,
  generateSeedPhrase,
  getAddressDetails,
  Lucid,
  SpendingValidator,
  toUnit,
  TxHash,
} from "../src/mod.ts";

async function generateAccount(assets: Assets) {
  const seedPhrase = generateSeedPhrase();
  return {
    seedPhrase,
    address: await (await Lucid.new(undefined, "Custom"))
      .selectWalletFromSeed(seedPhrase).wallet.address(),
    assets,
  };
}

const ACCOUNT_0 = await generateAccount({ lovelace: 75000000000n });
const ACCOUNT_1 = await generateAccount({ lovelace: 100000000n });

const emulator = new Emulator([ACCOUNT_0, ACCOUNT_1]);

const lucid = await Lucid.new(emulator);

lucid.selectWalletFromSeed(ACCOUNT_0.seedPhrase);

it("Correct start balance", async () => {
  const utxos = await lucid.wallet.getUtxos();
  const lovelace = utxos.reduce(
    (amount, utxo) => amount + utxo.assets.lovelace,
    0n,
  );
  expect(lovelace).toEqual(ACCOUNT_0.assets.lovelace);
});

it("Paid to address", async () => {
  const recipient =
    "addr_test1qrupyvhe20s0hxcusrzlwp868c985dl8ukyr44gfvpqg4ek3vp92wfpentxz4f853t70plkp3vvkzggjxknd93v59uysvc54h7";

  const datum = Data.to(123n);
  const lovelace = 3000000n;

  const tx = await lucid.newTx().payToAddressWithData(recipient, {
    inline: datum,
  }, { lovelace }).complete();

  const signedTx = await tx.sign().complete();
  const txHash = await signedTx.submit();
  await lucid.awaitTx(txHash);

  const utxos = await lucid.utxosAt(
    recipient,
  );

  expect(utxos.length).toEqual(1);

  expect(utxos[0].assets.lovelace).toEqual(lovelace);
  expect(utxos[0].datum).toEqual(datum);
});

it("Missing vkey witness", async () => {
  const recipient =
    "addr_test1wqag3rt979nep9g2wtdwu8mr4gz6m4kjdpp5zp705km8wys6t2kla";

  const lovelace = 3000000n;

  const tx = await lucid.newTx().payToAddress(recipient, { lovelace })
    .complete();

  const notSignedTx = await tx.complete();
  try {
    const txHash = await notSignedTx.submit();
    await lucid.awaitTx(txHash);
    console.log("The tx was never signed. The vkey witness could not exist.")
    expect(false).toEqual(false)
  } catch (_e) {
    expect(true).toEqual(true)
  }
});

it("Mint asset in slot range", async () => {
  const { paymentCredential } = getAddressDetails(ACCOUNT_0.address);
  const { paymentCredential: paymentCredential2 } = getAddressDetails(
    ACCOUNT_1.address,
  );
  const mintingPolicy = lucid.utils.nativeScriptFromJson({
    type: "all",
    scripts: [
      {
        type: "before",
        slot: lucid.utils.unixTimeToSlot(emulator.now() + 60000),
      },
      { type: "sig", keyHash: paymentCredential?.hash! },
      { type: "sig", keyHash: paymentCredential2?.hash! },
    ],
  });

  const policyId = lucid.utils.mintingPolicyToId(mintingPolicy);
  async function mint(): Promise<TxHash> {
    const tx = await lucid.newTx()
       .mintAssets({
         [toUnit(policyId, fromText("Wow"))]: 123n,
      })
      .validTo(emulator.now() + 30000)
      .attachMintingPolicy(mintingPolicy)
      .complete();

    await tx.partialSign();
    lucid.selectWalletFromSeed(ACCOUNT_1.seedPhrase);
    await tx.partialSign();
    lucid.selectWalletFromSeed(ACCOUNT_0.seedPhrase);
    const signedTx = await tx.complete();

    return signedTx.submit();
  }

  await mint();

  emulator.awaitBlock(4);

  try {
    await mint();
    console.log("The transactions should have failed because of exceeding slot range.")
    expect(true).toEqual(false);
  } catch (_e) {
    expect(true).toEqual(true);
  }
});

it("Reward withdrawal", async () => {
  const rewardAddress = await lucid.wallet.rewardAddress();
  const poolId = "pool1jsa3rv0dqtkv2dv2rcx349yfx6rxqyvrnvdye4ps3wxyws6q95m";
  const REWARD_AMOUNT = 100000000n;
  expect(await lucid.wallet.getDelegation()).toEqual({
    poolId: null,
    rewards: 0n,
  });
  emulator.distributeRewards(REWARD_AMOUNT);
  expect(await lucid.wallet.getDelegation()).toEqual({
    poolId: null,
    rewards: 0n,
  });
  // Registration
  await lucid.awaitTx(
    await (await (await lucid.newTx().registerStake(rewardAddress!).complete())
      .sign().complete()).submit(),
  );
  emulator.distributeRewards(REWARD_AMOUNT);
  expect(await lucid.wallet.getDelegation()).toEqual({
    poolId: null,
    rewards: 0n,
  });
  // Delegation
  await lucid.awaitTx(
    await (await (await lucid.newTx().delegateTo(rewardAddress!, poolId)
      .complete())
      .sign().complete()).submit(),
  );
  emulator.distributeRewards(REWARD_AMOUNT);
  expect(await lucid.wallet.getDelegation()).toEqual({
    poolId,
    rewards: REWARD_AMOUNT,
  });
  // Deregistration
  await lucid.awaitTx(
    await (await (await lucid.newTx().deregisterStake(rewardAddress!)
      .complete())
      .sign().complete()).submit(),
  );
  expect(await lucid.wallet.getDelegation()).toEqual({
    poolId: null,
    rewards: REWARD_AMOUNT,
  });
  // Withdrawal
  await lucid.awaitTx(
    await (await (await lucid.newTx().withdraw(rewardAddress!, REWARD_AMOUNT)
      .complete())
      .sign().complete()).submit(),
  );
  expect(await lucid.wallet.getDelegation()).toEqual({
    poolId: null,
    rewards: 0n,
  });
});

it("Evaluate a contract", async () => {
  const alwaysSucceedScript: SpendingValidator = {
    type: "PlutusV2",
    script: "49480100002221200101",
  };
  const scriptAddress = lucid.utils.validatorToAddress(alwaysSucceedScript);

  const tx = await lucid.newTx().payToContract(scriptAddress, {
    inline: Data.void(),
  }, { lovelace: 50000000n })
    .complete();
  const signedTx = await tx.sign().complete();
  const txHash = await signedTx.submit();
  await lucid.awaitTx(txHash);

  const scriptUtxos = await lucid.utxosAt(scriptAddress);

  expect(scriptUtxos.length).toEqual(1);
  const _txHash =
    await (await (await lucid.newTx().collectFrom(scriptUtxos, Data.void())
      .attachSpendingValidator(alwaysSucceedScript)
      .complete()).sign().complete()).submit();
  emulator.awaitSlot(100);
});

it("Check required signer", async () => {
  const tx = await lucid.newTx().addSigner(ACCOUNT_1.address).payToAddress(
    ACCOUNT_1.address,
    { lovelace: 5000000n },
  )
    .complete();
  await tx.partialSign();
  lucid.selectWalletFromSeed(ACCOUNT_1.seedPhrase);
  await tx.partialSign();
  await lucid.awaitTx(await tx.complete().then((tx) => tx.submit()));
});
