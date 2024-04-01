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

export type {
  Address as CAddress,
  ByronAddress as CByronAddress,
  Value as CValue,
  ScriptRef as CScriptRef,
  TransactionUnspentOutput as CTransactionUnspentOutput,
  NativeScript as CNativeScript,
  Transaction as CTransaction,
  TransactionWitnessSet as CTransactionWitnessSet,
  TransactionBuilderConfig as CTransactionBuilderConfig,
  TransactionUnspentOutputs as CTransactionUnspentOutputs,
  PoolRegistration as CPoolRegistration,
  PlutusScript as CPlutusScript,
  PlutusV2Script as CPlutusV2Script,
  PrivateKey as CPrivateKey,
  Ed25519KeyHash as CEd25519KeyHash,
  TransactionBuilder as CTransactionBuilder,
  InputBuilderResult as CInputBuilderResult,
  MintBuilderResult as CMintBuilderResult,
  CertificateBuilderResult as CCertificateBuilderResult,
  WithdrawalBuilderResult as CWithdrawalBuilderResult,
  Redeemer as CRedeemer,
  BigNum as CBigNum,
  Ed25519KeyHashes as CEd25519KeyHashes,
  PlutusData as CPlutusData,
} from "@dcspark/cardano-multiplatform-lib-nodejs";

export { C, U, M, loadModule };

declare global {
  namespace NodeJS {
    interface Process {
      browser: boolean;
    }
  }
}
