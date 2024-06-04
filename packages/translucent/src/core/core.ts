type CModule = typeof import("@dcspark/cardano-multiplatform-lib-nodejs");
type UModule = typeof import("uplc-node");
type MModule = typeof import("@emurgo/cardano-message-signing-nodejs");

let C: CModule;
let U: UModule;
let M: MModule;

async function loadModule() {
  if (process.browser) {
    C = await import("@dcspark/cardano-multiplatform-lib-browser");
    U = await import("uplc-web");
    M = await import("@emurgo/cardano-message-signing-browser");
  } else {
    C = await import("@dcspark/cardano-multiplatform-lib-nodejs");
    U = await import("uplc-node");
    M = await import("@emurgo/cardano-message-signing-nodejs");
  }
}

class CModuleLoader {
  private _wasm: CModule | null = null;

  get get(): CModule {
    if (this._wasm === null) {
      throw new Error("C has not been loaded");
    }
    return this._wasm;
  }

  async load(): Promise<void> {
    if (this._wasm !== null) {
      return;
    }

    if (process.browser) {
      this._wasm = await import("@dcspark/cardano-multiplatform-lib-browser");
    } else {
      this._wasm = await import("@dcspark/cardano-multiplatform-lib-nodejs");
    }
  }
}

class UModuleLoader {
  private _wasm: UModule | null = null;

  get get(): UModule {
    if (this._wasm === null) {
      throw new Error("U has not been loaded");
    }
    return this._wasm;
  }

  async load(): Promise<void> {
    if (this._wasm !== null) {
      return;
    }

    if (process.browser) {
      this._wasm = await import("uplc-web");
    } else {
      this._wasm = await import("uplc-node");
    }
  }
}

class MModuleLoader {
  private _wasm: MModule | null = null;

  get get(): MModule {
    if (this._wasm === null) {
      throw new Error("M has not been loaded");
    }
    return this._wasm;
  }

  async load(): Promise<void> {
    if (this._wasm !== null) {
      return;
    }

    if (process.browser) {
      this._wasm = await import("@emurgo/cardano-message-signing-browser");
    } else {
      this._wasm = await import("@emurgo/cardano-message-signing-nodejs");
    }
  }
}

export const cModuleLoader: CModuleLoader = new CModuleLoader();
export const uModuleLoader: UModuleLoader = new UModuleLoader();
export const mModuleLoader: MModuleLoader = new MModuleLoader();

export type {
  Address as CAddress,
  BigNum as CBigNum,
  ByronAddress as CByronAddress,
  CertificateBuilderResult as CCertificateBuilderResult,
  Ed25519KeyHash as CEd25519KeyHash,
  Ed25519KeyHashes as CEd25519KeyHashes,
  InputBuilderResult as CInputBuilderResult,
  MintBuilderResult as CMintBuilderResult,
  NativeScript as CNativeScript,
  PlutusData as CPlutusData,
  PlutusScript as CPlutusScript,
  PlutusV2Script as CPlutusV2Script,
  PoolRegistration as CPoolRegistration,
  PrivateKey as CPrivateKey,
  Redeemer as CRedeemer,
  ScriptRef as CScriptRef,
  StakeCredential as CStakeCredential,
  Transaction as CTransaction,
  TransactionBuilder as CTransactionBuilder,
  TransactionBuilderConfig as CTransactionBuilderConfig,
  TransactionUnspentOutput as CTransactionUnspentOutput,
  TransactionUnspentOutputs as CTransactionUnspentOutputs,
  TransactionWitnessSet as CTransactionWitnessSet,
  Value as CValue,
  WithdrawalBuilderResult as CWithdrawalBuilderResult,
} from "@dcspark/cardano-multiplatform-lib-nodejs";

export {
  C,
  U,
  M,
  loadModule,
  cModuleLoader as CModuleLoader,
  uModuleLoader as UModuleLoader,
  mModuleLoader as MModuleLoader,
};

declare global {
  namespace NodeJS {
    interface Process {
      browser: boolean;
    }
  }
}
