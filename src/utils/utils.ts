import { C, U } from "../core/mod.ts";
import {
  Address,
  AddressDetails,
  Assets,
  CertificateValidator,
  Credential,
  Datum,
  DatumHash,
  Exact,
  KeyHash,
  MintingPolicy,
  NativeScript,
  Network,
  PolicyId,
  PrivateKey,
  PublicKey,
  RewardAddress,
  Script,
  ScriptHash,
  Slot,
  SpendingValidator,
  Unit,
  UnixTime,
  UTxO,
  Validator,
  WithdrawalValidator,
} from "../types/mod.ts";
import { Translucent } from "../translucent/mod.ts";
import { generateMnemonic } from "../misc/bip39.ts";
import { crc8 } from "../misc/crc8.ts";
import {
  SLOT_CONFIG_NETWORK,
  slotToBeginUnixTime,
  unixTimeToEnclosingSlot,
} from "../plutus/time.ts";
import { Data } from "../plutus/data.ts";
export class Utils {
  private translucent: Translucent;
  constructor(translucent: Translucent) {
    this.translucent = translucent;
  }

  validatorToAddress(
    validator: SpendingValidator,
    stakeCredential?: Credential,
  ): Address {
    const validatorHash = this.validatorToScriptHash(validator);
    if (stakeCredential) {
      return C.Address.new(
        networkToId(this.translucent.network),
        C.StakeCredential.from_scripthash(C.ScriptHash.from_hex(validatorHash)),
        stakeCredential.type === "Key"
          ? C.StakeCredential.from_keyhash(
              C.Ed25519KeyHash.from_hex(stakeCredential.hash),
            )
          : C.StakeCredential.from_scripthash(
              C.ScriptHash.from_hex(stakeCredential.hash),
            ),
      )
        .to_address()
        .to_bech32(undefined);
    } else {
      return C.EnterpriseAddress.new(
        networkToId(this.translucent.network),
        C.StakeCredential.from_scripthash(C.ScriptHash.from_hex(validatorHash)),
      )
        .to_address()
        .to_bech32(undefined);
    }
    
  }

  credentialToAddress(
    paymentCredential: Credential,
    stakeCredential?: Credential,
  ): Address {
    if (stakeCredential) {
      return C.BaseAddress.new(
        networkToId(this.translucent.network),
        paymentCredential.type === "Key"
          ? C.StakeCredential.from_keyhash(
              C.Ed25519KeyHash.from_hex(paymentCredential.hash),
            )
          : C.StakeCredential.from_scripthash(
              C.ScriptHash.from_hex(paymentCredential.hash),
            ),
        stakeCredential.type === "Key"
          ? C.StakeCredential.from_keyhash(
              C.Ed25519KeyHash.from_hex(stakeCredential.hash),
            )
          : C.StakeCredential.from_scripthash(
              C.ScriptHash.from_hex(stakeCredential.hash),
            ),
      )
        .to_address()
        .to_bech32(undefined);
    } else {
      return C.EnterpriseAddress.new(
        networkToId(this.translucent.network),
        paymentCredential.type === "Key"
          ? C.StakeCredential.from_keyhash(
              C.Ed25519KeyHash.from_hex(paymentCredential.hash),
            )
          : C.StakeCredential.from_scripthash(
              C.ScriptHash.from_hex(paymentCredential.hash),
            ),
      )
        .to_address()
        .to_bech32(undefined);
    }
  }

  validatorToRewardAddress(
    validator: CertificateValidator | WithdrawalValidator,
  ): RewardAddress {
    const validatorHash = this.validatorToScriptHash(validator);
    return C.Address.new(
      networkToId(this.translucent.network),
      C.StakeCredential.from_scripthash(C.ScriptHash.from_hex(validatorHash)),
    )
      .to_address()
      .to_bech32(undefined);
  }

  credentialToRewardAddress(stakeCredential: Credential): RewardAddress {
    return C.RewardAddress.new(
      networkToId(this.translucent.network),
      stakeCredential.type === "Key"
        ? C.StakeCredential.from_keyhash(
            C.Ed25519KeyHash.from_hex(stakeCredential.hash),
          )
        : C.StakeCredential.from_scripthash(
            C.ScriptHash.from_hex(stakeCredential.hash),
          ),
    )
      .to_address()
      .to_bech32(undefined);
  }

  validatorToScriptHash(validator: Validator): ScriptHash {
    if (validator.type === "Native") {
      return C.NativeScript.from_cbor_hex(validator.script)
        .hash()
        .to_hex();
    } else if (validator.type === "PlutusV1") {
      return C.PlutusV1Script.from_cbor_hex(
          applyDoubleCborEncoding(validator.script),
        )
        .hash()
        .to_hex();
    } else if (validator.type === "PlutusV2") {
      return C.PlutusV2Script.from_cbor_hex(
        applyDoubleCborEncoding(validator.script),
      )
      .hash()
      .to_hex();
    } else {
      throw new Error("No variant matched");
    }
  }

  mintingPolicyToId(mintingPolicy: MintingPolicy): PolicyId {
    return this.validatorToScriptHash(mintingPolicy);
  }

  datumToHash(datum: Datum): DatumHash {
    return C.hash_plutus_data(C.PlutusData.from_cbor_hex(datum)).to_hex();
  }

  scriptHashToCredential(scriptHash: ScriptHash): Credential {
    return {
      type: "Script",
      hash: scriptHash,
    };
  }

  keyHashToCredential(keyHash: KeyHash): Credential {
    return {
      type: "Key",
      hash: keyHash,
    };
  }

  generatePrivateKey(): PrivateKey {
    return generatePrivateKey();
  }

  generateSeedPhrase(): string {
    return generateSeedPhrase();
  }

  unixTimeToSlot(unixTime: UnixTime): Slot {
    return unixTimeToEnclosingSlot(
      unixTime,
      SLOT_CONFIG_NETWORK[this.translucent.network],
    );
  }

  slotToUnixTime(slot: Slot): UnixTime {
    return slotToBeginUnixTime(
      slot,
      SLOT_CONFIG_NETWORK[this.translucent.network],
    );
  }

  /** Address can be in Bech32 or Hex. */
  getAddressDetails(address: string): AddressDetails {
    return getAddressDetails(address);
  }

  /**
   * Convert a native script from Json to the Hex representation.
   * It follows this Json format: https://github.com/input-output-hk/cardano-node/blob/master/doc/reference/simple-scripts.md
   */
  nativeScriptFromJson(nativeScript: NativeScript): Script {
    return nativeScriptFromJson(nativeScript);
  }

  paymentCredentialOf(address: Address): Credential {
    return paymentCredentialOf(address);
  }

  stakeCredentialOf(rewardAddress: RewardAddress): Credential {
    return stakeCredentialOf(rewardAddress);
  }
}

function addressFromHexOrBech32(address: string): C.Address {
  try {
    return C.Address.from_hex(address);
  } catch (_e) {
    try {
      return C.Address.from_bech32(address);
    } catch (_e) {
      throw new Error("Could not deserialize address.");
    }
  }
}

/** Address can be in Bech32 or Hex. */
export function getAddressDetails(address: string): AddressDetails {
  // Base Address
  try {
    const parsedAddress = addressFromHexOrBech32(address)
    const paymentCredential: Credential =
      parsedAddress.payment_cred()!.kind() === 0
        ? {
            type: "Key",
            hash: parsedAddress.payment_cred()!.as_pub_key()!.to_hex(),
          }
        : {
            type: "Script",
            hash: 
              parsedAddress.payment_cred()!.as_script()!.to_hex(),
            
          };
    const stakeCredential: Credential =
      parsedAddress.staking_cred()!.kind() === 0
        ? {
            type: "Key",
            hash: parsedAddress.staking_cred()!.as_pub_key()!.to_hex(),
          }
        : {
            type: "Script",
            hash: parsedAddress.staking_cred()!.as_script()!.to_hex(),
          };
    return {
      type: "Base",
      networkId: parsedAddress.network_id(),
      address: {
        bech32: parsedAddress.to_bech32(undefined),
        hex: parsedAddress.to_hex(),
      },
      paymentCredential,
      stakeCredential,
    };
  } catch (_e) {
    /* pass */
  }

  // Limited support for Byron addresses
  try {
    const parsedAddress = ((address: string): C.ByronAddress => {
      try {
        return C.ByronAddress.from_address(C.Address.from_hex(address))!;
      } catch (_e) {
        try {
          return C.ByronAddress.from_base58(address);
        } catch (_e) {
          throw new Error("Could not deserialize address.");
        }
      }
    })(address);

    return {
      type: "Byron",
      networkId: parsedAddress.to_address().network_id(),
      address: {
        bech32: "",
        hex: toHex(parsedAddress.to_address().to_raw_bytes()),
      },
    };
  } catch (_e) {
    /* pass */
  }

  throw new Error("No address type matched for: " + address);
}

export function paymentCredentialOf(address: Address): Credential {
  const { paymentCredential } = getAddressDetails(address);
  if (!paymentCredential) {
    throw new Error(
      "The specified address does not contain a payment credential.",
    );
  }
  return paymentCredential;
}

export function stakeCredentialOf(rewardAddress: RewardAddress): Credential {
  const { stakeCredential } = getAddressDetails(rewardAddress);
  if (!stakeCredential) {
    throw new Error(
      "The specified address does not contain a stake credential.",
    );
  }
  return stakeCredential;
}

export function generatePrivateKey(): PrivateKey {
  return C.PrivateKey.generate_ed25519().to_bech32();
}

export function generateSeedPhrase(): string {
  return generateMnemonic(256);
}

export function valueToAssets(value: C.Value): Assets {
  const assets: Assets = {};
  assets["lovelace"] = value.coin()
  const ma = value.multi_asset();
  if (ma) {
    const multiAssets = ma.keys();
    for (let j = 0; j < multiAssets.len(); j++) {
      const policy = multiAssets.get(j);
      const policyAssets = ma.get_assets(policy)!;
      const assetNames = policyAssets.keys();
      for (let k = 0; k < assetNames.len(); k++) {
        const policyAsset = assetNames.get(k);
        const quantity = policyAssets.get(policyAsset)!;
        const unit = toHex(policy.to_raw_bytes()) + fromText(policyAsset.to_str());
        assets[unit] = quantity;
      }
    }
  }
  return assets;
}

export function assetsToValue(assets: Assets): C.Value {
  const multiAsset = C.MultiAsset.new();
  const lovelace = assets["lovelace"];
  const units = Object.keys(assets);
  const policies = Array.from(
    new Set(
      units
        .filter((unit) => unit !== "lovelace")
        .map((unit) => unit.slice(0, 56)),
    ),
  );
  policies.forEach((policy) => {
    const policyUnits = units.filter((unit) => unit.slice(0, 56) === policy);
    const assetsValue = C.MapAssetNameToCoin.new();
    policyUnits.forEach((unit) => {
      assetsValue.insert(
        C.AssetName.from_str(toText(unit.slice(56))),
        assets[unit],
      );
    });
    multiAsset.insert_assets(C.ScriptHash.from_hex(policy), assetsValue);
  });
  const value = C.Value.new(
    lovelace,
    multiAsset
  );
  return value;
}

export function fromScriptRef(scriptRef: C.Script): Script {
  const kind = scriptRef.kind();
  if (kind === 0) {
    return {
      type: "Native",
      script: toHex(scriptRef.as_native()!.to_cbor_bytes()),
    };
  } else if (kind === 1) {
    return {
      type: "PlutusV1",
      script: toHex(scriptRef.as_plutus_v1()!.to_cbor_bytes()),
    };
  } else if (kind === 2) {
    return {
      type: "PlutusV2",
      script: toHex(scriptRef.as_plutus_v2()!.to_cbor_bytes()),
    };
  } else {
    throw new Error("No variant matched.");
  }
}

export function toScriptRef(script: Script): C.Script {
  if (script.type === "Native") {
    return C.Script.new_native(
      C.NativeScript.from_cbor_hex(script.script),
    );
  } 
  if (script.type === "PlutusV1") {
    return C.Script.new_plutus_v1(
        C.PlutusV1Script.from_cbor_hex(
          applyDoubleCborEncoding(script.script),
        ),
    );
  } 
  if (script.type === "PlutusV2") {
    return C.Script.new_plutus_v1(
        C.PlutusV2Script.from_cbor_hex(
          applyDoubleCborEncoding(script.script),
        ),
    );
  } 
  throw new Error("No script variant matched for toScriptRef.");
}

export function utxoToCore(utxo: UTxO): C.TransactionUnspentOutput {
  const address: C.Address = (() => {
    try {
      return C.Address.from_bech32(utxo.address);
    } catch (_e) {
      return C.ByronAddress.from_base58(utxo.address).to_address();
    }
  })();
  const output: {
    address: C.Address,
    value: C.Value,
    datum: C.DatumOption | undefined,
    script_reference: C.Script | undefined,
  } = {
    address,
    value: assetsToValue(utxo.assets),
    datum: undefined,
    script_reference: undefined,
  }
  if (utxo.datumHash) {
    output.datum = C.DatumOption.new_hash(C.DatumHash.from_hex(utxo.datumHash))
  }
  // inline datum
  if (!utxo.datumHash && utxo.datum) {
    output.datum = C.DatumOption.new_datum(C.PlutusData.from_cbor_hex(utxo.datum!))
  }

  if (utxo.scriptRef) {
    output.script_reference = toScriptRef(utxo.scriptRef)
  }

  return C.TransactionUnspentOutput.new(
    C.TransactionInput.new(
      C.TransactionHash.from_hex(utxo.txHash),
      BigInt(utxo.outputIndex),
    ),
    C.TransactionOutput.new(output.address, output.value, output.datum, output.script_reference),
  );
}

export function coreToUtxo(coreUtxo: C.TransactionUnspentOutput): UTxO {
  return {
    txHash: toHex(coreUtxo.input().transaction_id().to_bytes()),
    outputIndex: parseInt(coreUtxo.input().index().to_str()),
    assets: valueToAssets(coreUtxo.output().amount()),
    address: coreUtxo.output().address().as_byron()
      ? coreUtxo.output().address().as_byron()?.to_base58()!
      : coreUtxo.output().address().to_bech32(undefined),
    datumHash: coreUtxo.output()?.datum()?.as_data_hash()?.to_hex(),
    datum:
      coreUtxo.output()?.datum()?.as_inline_data() &&
      toHex(coreUtxo.output().datum()!.as_inline_data()!.to_bytes()),
    scriptRef:
      coreUtxo.output()?.script_ref() &&
      fromScriptRef(coreUtxo.output().script_ref()!),
  };
}

export function networkToId(network: Network): number {
  switch (network) {
    case "Preview":
      return 0;
    case "Preprod":
      return 0;
    case "Custom":
      return 0;
    case "Mainnet":
      return 1;
    default:
      throw new Error("Network not found");
  }
}

export function fromHex(hex: string): Uint8Array {
  const matched = hex.match(/.{1,2}/g);
  return new Uint8Array(
    matched ? matched.map((byte) => parseInt(byte, 16)) : [],
  );
}

export function toHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/** Convert a Hex encoded string to a Utf-8 encoded string. */
export function toText(hex: string): string {
  return new TextDecoder().decode(fromHex(hex));
}

/** Convert a Utf-8 encoded string to a Hex encoded string. */
export function fromText(text: string): string {
  return toHex(new TextEncoder().encode(text));
}

export function toPublicKey(privateKey: PrivateKey): PublicKey {
  return C.PrivateKey.from_bech32(privateKey).to_public().to_bech32();
}

/** Padded number in Hex. */
function checksum(num: string): string {
  return crc8(fromHex(num)).toString(16).padStart(2, "0");
}

export function toLabel(num: number): string {
  if (num < 0 || num > 65535) {
    throw new Error(
      `Label ${num} out of range: min label 1 - max label 65535.`,
    );
  }
  const numHex = num.toString(16).padStart(4, "0");
  return "0" + numHex + checksum(numHex) + "0";
}

export function fromLabel(label: string): number | null {
  if (label.length !== 8 || !(label[0] === "0" && label[7] === "0")) {
    return null;
  }
  const numHex = label.slice(1, 5);
  const num = parseInt(numHex, 16);
  const check = label.slice(5, 7);
  return check === checksum(numHex) ? num : null;
}

/**
 * @param name Hex encoded
 */
export function toUnit(
  policyId: PolicyId,
  name?: string | null,
  label?: number | null,
): Unit {
  const hexLabel = Number.isInteger(label) ? toLabel(label!) : "";
  const n = name ? name : "";
  if ((n + hexLabel).length > 64) {
    throw new Error("Asset name size exceeds 32 bytes.");
  }
  if (policyId.length !== 56) {
    throw new Error(`Policy id invalid: ${policyId}.`);
  }
  return policyId + hexLabel + n;
}

/**
 * Splits unit into policy id, asset name (entire asset name), name (asset name without label) and label if applicable.
 * name will be returned in Hex.
 */
export function fromUnit(unit: Unit): {
  policyId: PolicyId;
  assetName: string | null;
  name: string | null;
  label: number | null;
} {
  const policyId = unit.slice(0, 56);
  const assetName = unit.slice(56) || null;
  const label = fromLabel(unit.slice(56, 64));
  const name = (() => {
    const hexName = Number.isInteger(label) ? unit.slice(64) : unit.slice(56);
    return hexName || null;
  })();
  return { policyId, assetName, name, label };
}

/**
 * Convert a native script from Json to the Hex representation.
 * It follows this Json format: https://github.com/input-output-hk/cardano-node/blob/master/doc/reference/simple-scripts.md
 */
export function nativeScriptFromJson(nativeScript: NativeScript): Script {
  return {
    type: "Native",
    script: toHex(doNativeScriptFromJSON(nativeScript).to_cbor_bytes()),
  };
}

function doNativeScriptFromJSON(nativeScript: NativeScript): C.NativeScript {
  if (nativeScript.type === "sig") {
    return C.NativeScript.new_script_pubkey(
      C.Ed25519KeyHash.from_hex(nativeScript.keyHash),
    );
  } else if (nativeScript.type === "all") {
    const nativeScripts = C.NativeScriptList.new();
    for (const subScript of nativeScript.scripts) {
      let subNativeScript = doNativeScriptFromJSON(subScript);
      nativeScripts.add(subNativeScript);
    }
    return C.NativeScript.new_script_all(nativeScripts);
  } else if (nativeScript.type === "any") {
    const nativeScripts = C.NativeScriptList.new();
    for (const subScript of nativeScript.scripts) {
      let subNativeScript = doNativeScriptFromJSON(subScript);
      nativeScripts.add(subNativeScript);
    }
    return C.NativeScript.new_script_any(nativeScripts);
  } else if (nativeScript.type === "before") {
    return C.NativeScript.new_script_invalid_before(
      BigInt(nativeScript.slot)
    );
  } else if (nativeScript.type === "after") {
    return C.NativeScript.new_script_invalid_hereafter(
      BigInt(nativeScript.slot),
    );
  } else if (nativeScript.type === "atLeast") {
    const nativeScripts = C.NativeScriptList.new();
    for (const subScript of nativeScript.scripts) {
      let subNativeScript = doNativeScriptFromJSON(subScript);
      nativeScripts.add(subNativeScript);
    }
    return C.NativeScript.new_script_n_of_k(
      BigInt(nativeScript.required), nativeScripts
    );
  }
  throw "No nativescript type variants matched";
}

export function applyParamsToScript<T extends unknown[] = Data[]>(
  plutusScript: string,
  params: Exact<[...T]>,
  type?: T,
): string {
  const p = (type ? Data.castTo<T>(params, type) : params) as Data[];
  return toHex(
    U.apply_params_to_script(fromHex(Data.to(p)), fromHex(plutusScript)),
  );
}

/** Returns double cbor encoded script. If script is already double cbor encoded it's returned as it is. */
export function applyDoubleCborEncoding(script: string): string {
  try {
    C.PlutusV2Script.from_cbor_bytes(
      C.PlutusV2Script.from_cbor_hex(script).get(),
    );
    return script;
  } catch (_e) {
    return toHex(C.PlutusV2Script.from_cbor_hex(script).get());
  }
}

export function addAssets(...assets: Assets[]): Assets {
  return assets.reduce((a, b) => {
    for (const k in b) {
      if (Object.hasOwn(b, k)) {
        a[k] = (a[k] || 0n) + b[k];
      }
    }
    return a;
  }, {});
}
