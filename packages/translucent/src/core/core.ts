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

export { C, U, M, loadModule };

declare global {
  namespace NodeJS {
    interface Process {
      browser: boolean;
    }
  }
}
