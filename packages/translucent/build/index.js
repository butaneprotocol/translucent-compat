'use strict';

var sha256 = require('sha256');
var typebox = require('@sinclair/typebox');

exports.C = void 0;
exports.U = void 0;
exports.M = void 0;
async function loadModule() {
  if (process.browser) {
    exports.C = await import('@dcspark/cardano-multiplatform-lib-browser');
    exports.U = await import('uplc-web');
    exports.M = await import('@emurgo/cardano-message-signing-browser');
  } else {
    exports.C = await import('@dcspark/cardano-multiplatform-lib-nodejs');
    exports.U = await import('uplc-node');
    exports.M = await import('@emurgo/cardano-message-signing-nodejs');
  }
}

function createCostModels(costModels) {
  const costmdls = exports.C.Costmdls.new();
  const costmdlV1 = exports.C.CostModel.empty_model(exports.C.Language.new_plutus_v1());
  Object.values(costModels.PlutusV1).forEach((cost, index) => {
    costmdlV1.set(index, exports.C.Int.new(exports.C.BigNum.from_str(cost.toString())));
  });
  costmdls.insert(costmdlV1);
  const costmdlV2 = exports.C.CostModel.empty_model(exports.C.Language.new_plutus_v2());
  Object.values(costModels.PlutusV2 || []).forEach((cost, index) => {
    costmdlV2.set(index, exports.C.Int.new(exports.C.BigNum.from_str(cost.toString())));
  });
  costmdls.insert(costmdlV2);
  return costmdls;
}
const PROTOCOL_PARAMETERS_DEFAULT = {
  minFeeA: 44,
  minFeeB: 155381,
  maxTxSize: 16384,
  maxValSize: 5e3,
  keyDeposit: 2000000n,
  poolDeposit: 500000000n,
  priceMem: [577n, 10000n],
  priceStep: [721n, 10000000n],
  maxTxExMem: 14000000n,
  maxTxExSteps: 10000000000n,
  coinsPerUtxoByte: 4310n,
  collateralPercentage: 150,
  maxCollateralInputs: 3,
  costModels: {
    PlutusV1: {
      "addInteger-cpu-arguments-intercept": 205665,
      "addInteger-cpu-arguments-slope": 812,
      "addInteger-memory-arguments-intercept": 1,
      "addInteger-memory-arguments-slope": 1,
      "appendByteString-cpu-arguments-intercept": 1e3,
      "appendByteString-cpu-arguments-slope": 571,
      "appendByteString-memory-arguments-intercept": 0,
      "appendByteString-memory-arguments-slope": 1,
      "appendString-cpu-arguments-intercept": 1e3,
      "appendString-cpu-arguments-slope": 24177,
      "appendString-memory-arguments-intercept": 4,
      "appendString-memory-arguments-slope": 1,
      "bData-cpu-arguments": 1e3,
      "bData-memory-arguments": 32,
      "blake2b_256-cpu-arguments-intercept": 117366,
      "blake2b_256-cpu-arguments-slope": 10475,
      "blake2b_256-memory-arguments": 4,
      "cekApplyCost-exBudgetCPU": 23e3,
      "cekApplyCost-exBudgetMemory": 100,
      "cekBuiltinCost-exBudgetCPU": 23e3,
      "cekBuiltinCost-exBudgetMemory": 100,
      "cekConstCost-exBudgetCPU": 23e3,
      "cekConstCost-exBudgetMemory": 100,
      "cekDelayCost-exBudgetCPU": 23e3,
      "cekDelayCost-exBudgetMemory": 100,
      "cekForceCost-exBudgetCPU": 23e3,
      "cekForceCost-exBudgetMemory": 100,
      "cekLamCost-exBudgetCPU": 23e3,
      "cekLamCost-exBudgetMemory": 100,
      "cekStartupCost-exBudgetCPU": 100,
      "cekStartupCost-exBudgetMemory": 100,
      "cekVarCost-exBudgetCPU": 23e3,
      "cekVarCost-exBudgetMemory": 100,
      "chooseData-cpu-arguments": 19537,
      "chooseData-memory-arguments": 32,
      "chooseList-cpu-arguments": 175354,
      "chooseList-memory-arguments": 32,
      "chooseUnit-cpu-arguments": 46417,
      "chooseUnit-memory-arguments": 4,
      "consByteString-cpu-arguments-intercept": 221973,
      "consByteString-cpu-arguments-slope": 511,
      "consByteString-memory-arguments-intercept": 0,
      "consByteString-memory-arguments-slope": 1,
      "constrData-cpu-arguments": 89141,
      "constrData-memory-arguments": 32,
      "decodeUtf8-cpu-arguments-intercept": 497525,
      "decodeUtf8-cpu-arguments-slope": 14068,
      "decodeUtf8-memory-arguments-intercept": 4,
      "decodeUtf8-memory-arguments-slope": 2,
      "divideInteger-cpu-arguments-constant": 196500,
      "divideInteger-cpu-arguments-model-arguments-intercept": 453240,
      "divideInteger-cpu-arguments-model-arguments-slope": 220,
      "divideInteger-memory-arguments-intercept": 0,
      "divideInteger-memory-arguments-minimum": 1,
      "divideInteger-memory-arguments-slope": 1,
      "encodeUtf8-cpu-arguments-intercept": 1e3,
      "encodeUtf8-cpu-arguments-slope": 28662,
      "encodeUtf8-memory-arguments-intercept": 4,
      "encodeUtf8-memory-arguments-slope": 2,
      "equalsByteString-cpu-arguments-constant": 245e3,
      "equalsByteString-cpu-arguments-intercept": 216773,
      "equalsByteString-cpu-arguments-slope": 62,
      "equalsByteString-memory-arguments": 1,
      "equalsData-cpu-arguments-intercept": 1060367,
      "equalsData-cpu-arguments-slope": 12586,
      "equalsData-memory-arguments": 1,
      "equalsInteger-cpu-arguments-intercept": 208512,
      "equalsInteger-cpu-arguments-slope": 421,
      "equalsInteger-memory-arguments": 1,
      "equalsString-cpu-arguments-constant": 187e3,
      "equalsString-cpu-arguments-intercept": 1e3,
      "equalsString-cpu-arguments-slope": 52998,
      "equalsString-memory-arguments": 1,
      "fstPair-cpu-arguments": 80436,
      "fstPair-memory-arguments": 32,
      "headList-cpu-arguments": 43249,
      "headList-memory-arguments": 32,
      "iData-cpu-arguments": 1e3,
      "iData-memory-arguments": 32,
      "ifThenElse-cpu-arguments": 80556,
      "ifThenElse-memory-arguments": 1,
      "indexByteString-cpu-arguments": 57667,
      "indexByteString-memory-arguments": 4,
      "lengthOfByteString-cpu-arguments": 1e3,
      "lengthOfByteString-memory-arguments": 10,
      "lessThanByteString-cpu-arguments-intercept": 197145,
      "lessThanByteString-cpu-arguments-slope": 156,
      "lessThanByteString-memory-arguments": 1,
      "lessThanEqualsByteString-cpu-arguments-intercept": 197145,
      "lessThanEqualsByteString-cpu-arguments-slope": 156,
      "lessThanEqualsByteString-memory-arguments": 1,
      "lessThanEqualsInteger-cpu-arguments-intercept": 204924,
      "lessThanEqualsInteger-cpu-arguments-slope": 473,
      "lessThanEqualsInteger-memory-arguments": 1,
      "lessThanInteger-cpu-arguments-intercept": 208896,
      "lessThanInteger-cpu-arguments-slope": 511,
      "lessThanInteger-memory-arguments": 1,
      "listData-cpu-arguments": 52467,
      "listData-memory-arguments": 32,
      "mapData-cpu-arguments": 64832,
      "mapData-memory-arguments": 32,
      "mkCons-cpu-arguments": 65493,
      "mkCons-memory-arguments": 32,
      "mkNilData-cpu-arguments": 22558,
      "mkNilData-memory-arguments": 32,
      "mkNilPairData-cpu-arguments": 16563,
      "mkNilPairData-memory-arguments": 32,
      "mkPairData-cpu-arguments": 76511,
      "mkPairData-memory-arguments": 32,
      "modInteger-cpu-arguments-constant": 196500,
      "modInteger-cpu-arguments-model-arguments-intercept": 453240,
      "modInteger-cpu-arguments-model-arguments-slope": 220,
      "modInteger-memory-arguments-intercept": 0,
      "modInteger-memory-arguments-minimum": 1,
      "modInteger-memory-arguments-slope": 1,
      "multiplyInteger-cpu-arguments-intercept": 69522,
      "multiplyInteger-cpu-arguments-slope": 11687,
      "multiplyInteger-memory-arguments-intercept": 0,
      "multiplyInteger-memory-arguments-slope": 1,
      "nullList-cpu-arguments": 60091,
      "nullList-memory-arguments": 32,
      "quotientInteger-cpu-arguments-constant": 196500,
      "quotientInteger-cpu-arguments-model-arguments-intercept": 453240,
      "quotientInteger-cpu-arguments-model-arguments-slope": 220,
      "quotientInteger-memory-arguments-intercept": 0,
      "quotientInteger-memory-arguments-minimum": 1,
      "quotientInteger-memory-arguments-slope": 1,
      "remainderInteger-cpu-arguments-constant": 196500,
      "remainderInteger-cpu-arguments-model-arguments-intercept": 453240,
      "remainderInteger-cpu-arguments-model-arguments-slope": 220,
      "remainderInteger-memory-arguments-intercept": 0,
      "remainderInteger-memory-arguments-minimum": 1,
      "remainderInteger-memory-arguments-slope": 1,
      "sha2_256-cpu-arguments-intercept": 806990,
      "sha2_256-cpu-arguments-slope": 30482,
      "sha2_256-memory-arguments": 4,
      "sha3_256-cpu-arguments-intercept": 1927926,
      "sha3_256-cpu-arguments-slope": 82523,
      "sha3_256-memory-arguments": 4,
      "sliceByteString-cpu-arguments-intercept": 265318,
      "sliceByteString-cpu-arguments-slope": 0,
      "sliceByteString-memory-arguments-intercept": 4,
      "sliceByteString-memory-arguments-slope": 0,
      "sndPair-cpu-arguments": 85931,
      "sndPair-memory-arguments": 32,
      "subtractInteger-cpu-arguments-intercept": 205665,
      "subtractInteger-cpu-arguments-slope": 812,
      "subtractInteger-memory-arguments-intercept": 1,
      "subtractInteger-memory-arguments-slope": 1,
      "tailList-cpu-arguments": 41182,
      "tailList-memory-arguments": 32,
      "trace-cpu-arguments": 212342,
      "trace-memory-arguments": 32,
      "unBData-cpu-arguments": 31220,
      "unBData-memory-arguments": 32,
      "unConstrData-cpu-arguments": 32696,
      "unConstrData-memory-arguments": 32,
      "unIData-cpu-arguments": 43357,
      "unIData-memory-arguments": 32,
      "unListData-cpu-arguments": 32247,
      "unListData-memory-arguments": 32,
      "unMapData-cpu-arguments": 38314,
      "unMapData-memory-arguments": 32,
      "verifyEd25519Signature-cpu-arguments-intercept": 9462713,
      "verifyEd25519Signature-cpu-arguments-slope": 1021,
      "verifyEd25519Signature-memory-arguments": 10
    },
    PlutusV2: {
      "addInteger-cpu-arguments-intercept": 205665,
      "addInteger-cpu-arguments-slope": 812,
      "addInteger-memory-arguments-intercept": 1,
      "addInteger-memory-arguments-slope": 1,
      "appendByteString-cpu-arguments-intercept": 1e3,
      "appendByteString-cpu-arguments-slope": 571,
      "appendByteString-memory-arguments-intercept": 0,
      "appendByteString-memory-arguments-slope": 1,
      "appendString-cpu-arguments-intercept": 1e3,
      "appendString-cpu-arguments-slope": 24177,
      "appendString-memory-arguments-intercept": 4,
      "appendString-memory-arguments-slope": 1,
      "bData-cpu-arguments": 1e3,
      "bData-memory-arguments": 32,
      "blake2b_256-cpu-arguments-intercept": 117366,
      "blake2b_256-cpu-arguments-slope": 10475,
      "blake2b_256-memory-arguments": 4,
      "cekApplyCost-exBudgetCPU": 23e3,
      "cekApplyCost-exBudgetMemory": 100,
      "cekBuiltinCost-exBudgetCPU": 23e3,
      "cekBuiltinCost-exBudgetMemory": 100,
      "cekConstCost-exBudgetCPU": 23e3,
      "cekConstCost-exBudgetMemory": 100,
      "cekDelayCost-exBudgetCPU": 23e3,
      "cekDelayCost-exBudgetMemory": 100,
      "cekForceCost-exBudgetCPU": 23e3,
      "cekForceCost-exBudgetMemory": 100,
      "cekLamCost-exBudgetCPU": 23e3,
      "cekLamCost-exBudgetMemory": 100,
      "cekStartupCost-exBudgetCPU": 100,
      "cekStartupCost-exBudgetMemory": 100,
      "cekVarCost-exBudgetCPU": 23e3,
      "cekVarCost-exBudgetMemory": 100,
      "chooseData-cpu-arguments": 19537,
      "chooseData-memory-arguments": 32,
      "chooseList-cpu-arguments": 175354,
      "chooseList-memory-arguments": 32,
      "chooseUnit-cpu-arguments": 46417,
      "chooseUnit-memory-arguments": 4,
      "consByteString-cpu-arguments-intercept": 221973,
      "consByteString-cpu-arguments-slope": 511,
      "consByteString-memory-arguments-intercept": 0,
      "consByteString-memory-arguments-slope": 1,
      "constrData-cpu-arguments": 89141,
      "constrData-memory-arguments": 32,
      "decodeUtf8-cpu-arguments-intercept": 497525,
      "decodeUtf8-cpu-arguments-slope": 14068,
      "decodeUtf8-memory-arguments-intercept": 4,
      "decodeUtf8-memory-arguments-slope": 2,
      "divideInteger-cpu-arguments-constant": 196500,
      "divideInteger-cpu-arguments-model-arguments-intercept": 453240,
      "divideInteger-cpu-arguments-model-arguments-slope": 220,
      "divideInteger-memory-arguments-intercept": 0,
      "divideInteger-memory-arguments-minimum": 1,
      "divideInteger-memory-arguments-slope": 1,
      "encodeUtf8-cpu-arguments-intercept": 1e3,
      "encodeUtf8-cpu-arguments-slope": 28662,
      "encodeUtf8-memory-arguments-intercept": 4,
      "encodeUtf8-memory-arguments-slope": 2,
      "equalsByteString-cpu-arguments-constant": 245e3,
      "equalsByteString-cpu-arguments-intercept": 216773,
      "equalsByteString-cpu-arguments-slope": 62,
      "equalsByteString-memory-arguments": 1,
      "equalsData-cpu-arguments-intercept": 1060367,
      "equalsData-cpu-arguments-slope": 12586,
      "equalsData-memory-arguments": 1,
      "equalsInteger-cpu-arguments-intercept": 208512,
      "equalsInteger-cpu-arguments-slope": 421,
      "equalsInteger-memory-arguments": 1,
      "equalsString-cpu-arguments-constant": 187e3,
      "equalsString-cpu-arguments-intercept": 1e3,
      "equalsString-cpu-arguments-slope": 52998,
      "equalsString-memory-arguments": 1,
      "fstPair-cpu-arguments": 80436,
      "fstPair-memory-arguments": 32,
      "headList-cpu-arguments": 43249,
      "headList-memory-arguments": 32,
      "iData-cpu-arguments": 1e3,
      "iData-memory-arguments": 32,
      "ifThenElse-cpu-arguments": 80556,
      "ifThenElse-memory-arguments": 1,
      "indexByteString-cpu-arguments": 57667,
      "indexByteString-memory-arguments": 4,
      "lengthOfByteString-cpu-arguments": 1e3,
      "lengthOfByteString-memory-arguments": 10,
      "lessThanByteString-cpu-arguments-intercept": 197145,
      "lessThanByteString-cpu-arguments-slope": 156,
      "lessThanByteString-memory-arguments": 1,
      "lessThanEqualsByteString-cpu-arguments-intercept": 197145,
      "lessThanEqualsByteString-cpu-arguments-slope": 156,
      "lessThanEqualsByteString-memory-arguments": 1,
      "lessThanEqualsInteger-cpu-arguments-intercept": 204924,
      "lessThanEqualsInteger-cpu-arguments-slope": 473,
      "lessThanEqualsInteger-memory-arguments": 1,
      "lessThanInteger-cpu-arguments-intercept": 208896,
      "lessThanInteger-cpu-arguments-slope": 511,
      "lessThanInteger-memory-arguments": 1,
      "listData-cpu-arguments": 52467,
      "listData-memory-arguments": 32,
      "mapData-cpu-arguments": 64832,
      "mapData-memory-arguments": 32,
      "mkCons-cpu-arguments": 65493,
      "mkCons-memory-arguments": 32,
      "mkNilData-cpu-arguments": 22558,
      "mkNilData-memory-arguments": 32,
      "mkNilPairData-cpu-arguments": 16563,
      "mkNilPairData-memory-arguments": 32,
      "mkPairData-cpu-arguments": 76511,
      "mkPairData-memory-arguments": 32,
      "modInteger-cpu-arguments-constant": 196500,
      "modInteger-cpu-arguments-model-arguments-intercept": 453240,
      "modInteger-cpu-arguments-model-arguments-slope": 220,
      "modInteger-memory-arguments-intercept": 0,
      "modInteger-memory-arguments-minimum": 1,
      "modInteger-memory-arguments-slope": 1,
      "multiplyInteger-cpu-arguments-intercept": 69522,
      "multiplyInteger-cpu-arguments-slope": 11687,
      "multiplyInteger-memory-arguments-intercept": 0,
      "multiplyInteger-memory-arguments-slope": 1,
      "nullList-cpu-arguments": 60091,
      "nullList-memory-arguments": 32,
      "quotientInteger-cpu-arguments-constant": 196500,
      "quotientInteger-cpu-arguments-model-arguments-intercept": 453240,
      "quotientInteger-cpu-arguments-model-arguments-slope": 220,
      "quotientInteger-memory-arguments-intercept": 0,
      "quotientInteger-memory-arguments-minimum": 1,
      "quotientInteger-memory-arguments-slope": 1,
      "remainderInteger-cpu-arguments-constant": 196500,
      "remainderInteger-cpu-arguments-model-arguments-intercept": 453240,
      "remainderInteger-cpu-arguments-model-arguments-slope": 220,
      "remainderInteger-memory-arguments-intercept": 0,
      "remainderInteger-memory-arguments-minimum": 1,
      "remainderInteger-memory-arguments-slope": 1,
      "serialiseData-cpu-arguments-intercept": 1159724,
      "serialiseData-cpu-arguments-slope": 392670,
      "serialiseData-memory-arguments-intercept": 0,
      "serialiseData-memory-arguments-slope": 2,
      "sha2_256-cpu-arguments-intercept": 806990,
      "sha2_256-cpu-arguments-slope": 30482,
      "sha2_256-memory-arguments": 4,
      "sha3_256-cpu-arguments-intercept": 1927926,
      "sha3_256-cpu-arguments-slope": 82523,
      "sha3_256-memory-arguments": 4,
      "sliceByteString-cpu-arguments-intercept": 265318,
      "sliceByteString-cpu-arguments-slope": 0,
      "sliceByteString-memory-arguments-intercept": 4,
      "sliceByteString-memory-arguments-slope": 0,
      "sndPair-cpu-arguments": 85931,
      "sndPair-memory-arguments": 32,
      "subtractInteger-cpu-arguments-intercept": 205665,
      "subtractInteger-cpu-arguments-slope": 812,
      "subtractInteger-memory-arguments-intercept": 1,
      "subtractInteger-memory-arguments-slope": 1,
      "tailList-cpu-arguments": 41182,
      "tailList-memory-arguments": 32,
      "trace-cpu-arguments": 212342,
      "trace-memory-arguments": 32,
      "unBData-cpu-arguments": 31220,
      "unBData-memory-arguments": 32,
      "unConstrData-cpu-arguments": 32696,
      "unConstrData-memory-arguments": 32,
      "unIData-cpu-arguments": 43357,
      "unIData-memory-arguments": 32,
      "unListData-cpu-arguments": 32247,
      "unListData-memory-arguments": 32,
      "unMapData-cpu-arguments": 38314,
      "unMapData-memory-arguments": 32,
      "verifyEcdsaSecp256k1Signature-cpu-arguments": 35892428,
      "verifyEcdsaSecp256k1Signature-memory-arguments": 10,
      "verifyEd25519Signature-cpu-arguments-intercept": 57996947,
      "verifyEd25519Signature-cpu-arguments-slope": 18975,
      "verifyEd25519Signature-memory-arguments": 10,
      "verifySchnorrSecp256k1Signature-cpu-arguments-intercept": 38887044,
      "verifySchnorrSecp256k1Signature-cpu-arguments-slope": 32947,
      "verifySchnorrSecp256k1Signature-memory-arguments": 10
    }
  }
};
const costModelKeys = {
  PlutusV1: [
    "addInteger-cpu-arguments-intercept",
    "addInteger-cpu-arguments-slope",
    "addInteger-memory-arguments-intercept",
    "addInteger-memory-arguments-slope",
    "appendByteString-cpu-arguments-intercept",
    "appendByteString-cpu-arguments-slope",
    "appendByteString-memory-arguments-intercept",
    "appendByteString-memory-arguments-slope",
    "appendString-cpu-arguments-intercept",
    "appendString-cpu-arguments-slope",
    "appendString-memory-arguments-intercept",
    "appendString-memory-arguments-slope",
    "bData-cpu-arguments",
    "bData-memory-arguments",
    "blake2b_256-cpu-arguments-intercept",
    "blake2b_256-cpu-arguments-slope",
    "blake2b_256-memory-arguments",
    "cekApplyCost-exBudgetCPU",
    "cekApplyCost-exBudgetMemory",
    "cekBuiltinCost-exBudgetCPU",
    "cekBuiltinCost-exBudgetMemory",
    "cekConstCost-exBudgetCPU",
    "cekConstCost-exBudgetMemory",
    "cekDelayCost-exBudgetCPU",
    "cekDelayCost-exBudgetMemory",
    "cekForceCost-exBudgetCPU",
    "cekForceCost-exBudgetMemory",
    "cekLamCost-exBudgetCPU",
    "cekLamCost-exBudgetMemory",
    "cekStartupCost-exBudgetCPU",
    "cekStartupCost-exBudgetMemory",
    "cekVarCost-exBudgetCPU",
    "cekVarCost-exBudgetMemory",
    "chooseData-cpu-arguments",
    "chooseData-memory-arguments",
    "chooseList-cpu-arguments",
    "chooseList-memory-arguments",
    "chooseUnit-cpu-arguments",
    "chooseUnit-memory-arguments",
    "consByteString-cpu-arguments-intercept",
    "consByteString-cpu-arguments-slope",
    "consByteString-memory-arguments-intercept",
    "consByteString-memory-arguments-slope",
    "constrData-cpu-arguments",
    "constrData-memory-arguments",
    "decodeUtf8-cpu-arguments-intercept",
    "decodeUtf8-cpu-arguments-slope",
    "decodeUtf8-memory-arguments-intercept",
    "decodeUtf8-memory-arguments-slope",
    "divideInteger-cpu-arguments-constant",
    "divideInteger-cpu-arguments-model-arguments-intercept",
    "divideInteger-cpu-arguments-model-arguments-slope",
    "divideInteger-memory-arguments-intercept",
    "divideInteger-memory-arguments-minimum",
    "divideInteger-memory-arguments-slope",
    "encodeUtf8-cpu-arguments-intercept",
    "encodeUtf8-cpu-arguments-slope",
    "encodeUtf8-memory-arguments-intercept",
    "encodeUtf8-memory-arguments-slope",
    "equalsByteString-cpu-arguments-constant",
    "equalsByteString-cpu-arguments-intercept",
    "equalsByteString-cpu-arguments-slope",
    "equalsByteString-memory-arguments",
    "equalsData-cpu-arguments-intercept",
    "equalsData-cpu-arguments-slope",
    "equalsData-memory-arguments",
    "equalsInteger-cpu-arguments-intercept",
    "equalsInteger-cpu-arguments-slope",
    "equalsInteger-memory-arguments",
    "equalsString-cpu-arguments-constant",
    "equalsString-cpu-arguments-intercept",
    "equalsString-cpu-arguments-slope",
    "equalsString-memory-arguments",
    "fstPair-cpu-arguments",
    "fstPair-memory-arguments",
    "headList-cpu-arguments",
    "headList-memory-arguments",
    "iData-cpu-arguments",
    "iData-memory-arguments",
    "ifThenElse-cpu-arguments",
    "ifThenElse-memory-arguments",
    "indexByteString-cpu-arguments",
    "indexByteString-memory-arguments",
    "lengthOfByteString-cpu-arguments",
    "lengthOfByteString-memory-arguments",
    "lessThanByteString-cpu-arguments-intercept",
    "lessThanByteString-cpu-arguments-slope",
    "lessThanByteString-memory-arguments",
    "lessThanEqualsByteString-cpu-arguments-intercept",
    "lessThanEqualsByteString-cpu-arguments-slope",
    "lessThanEqualsByteString-memory-arguments",
    "lessThanEqualsInteger-cpu-arguments-intercept",
    "lessThanEqualsInteger-cpu-arguments-slope",
    "lessThanEqualsInteger-memory-arguments",
    "lessThanInteger-cpu-arguments-intercept",
    "lessThanInteger-cpu-arguments-slope",
    "lessThanInteger-memory-arguments",
    "listData-cpu-arguments",
    "listData-memory-arguments",
    "mapData-cpu-arguments",
    "mapData-memory-arguments",
    "mkCons-cpu-arguments",
    "mkCons-memory-arguments",
    "mkNilData-cpu-arguments",
    "mkNilData-memory-arguments",
    "mkNilPairData-cpu-arguments",
    "mkNilPairData-memory-arguments",
    "mkPairData-cpu-arguments",
    "mkPairData-memory-arguments",
    "modInteger-cpu-arguments-constant",
    "modInteger-cpu-arguments-model-arguments-intercept",
    "modInteger-cpu-arguments-model-arguments-slope",
    "modInteger-memory-arguments-intercept",
    "modInteger-memory-arguments-minimum",
    "modInteger-memory-arguments-slope",
    "multiplyInteger-cpu-arguments-intercept",
    "multiplyInteger-cpu-arguments-slope",
    "multiplyInteger-memory-arguments-intercept",
    "multiplyInteger-memory-arguments-slope",
    "nullList-cpu-arguments",
    "nullList-memory-arguments",
    "quotientInteger-cpu-arguments-constant",
    "quotientInteger-cpu-arguments-model-arguments-intercept",
    "quotientInteger-cpu-arguments-model-arguments-slope",
    "quotientInteger-memory-arguments-intercept",
    "quotientInteger-memory-arguments-minimum",
    "quotientInteger-memory-arguments-slope",
    "remainderInteger-cpu-arguments-constant",
    "remainderInteger-cpu-arguments-model-arguments-intercept",
    "remainderInteger-cpu-arguments-model-arguments-slope",
    "remainderInteger-memory-arguments-intercept",
    "remainderInteger-memory-arguments-minimum",
    "remainderInteger-memory-arguments-slope",
    "sha2_256-cpu-arguments-intercept",
    "sha2_256-cpu-arguments-slope",
    "sha2_256-memory-arguments",
    "sha3_256-cpu-arguments-intercept",
    "sha3_256-cpu-arguments-slope",
    "sha3_256-memory-arguments",
    "sliceByteString-cpu-arguments-intercept",
    "sliceByteString-cpu-arguments-slope",
    "sliceByteString-memory-arguments-intercept",
    "sliceByteString-memory-arguments-slope",
    "sndPair-cpu-arguments",
    "sndPair-memory-arguments",
    "subtractInteger-cpu-arguments-intercept",
    "subtractInteger-cpu-arguments-slope",
    "subtractInteger-memory-arguments-intercept",
    "subtractInteger-memory-arguments-slope",
    "tailList-cpu-arguments",
    "tailList-memory-arguments",
    "trace-cpu-arguments",
    "trace-memory-arguments",
    "unBData-cpu-arguments",
    "unBData-memory-arguments",
    "unConstrData-cpu-arguments",
    "unConstrData-memory-arguments",
    "unIData-cpu-arguments",
    "unIData-memory-arguments",
    "unListData-cpu-arguments",
    "unListData-memory-arguments",
    "unMapData-cpu-arguments",
    "unMapData-memory-arguments",
    "verifyEd25519Signature-cpu-arguments-intercept",
    "verifyEd25519Signature-cpu-arguments-slope",
    "verifyEd25519Signature-memory-arguments"
  ],
  PlutusV2: [
    "addInteger-cpu-arguments-intercept",
    "addInteger-cpu-arguments-slope",
    "addInteger-memory-arguments-intercept",
    "addInteger-memory-arguments-slope",
    "appendByteString-cpu-arguments-intercept",
    "appendByteString-cpu-arguments-slope",
    "appendByteString-memory-arguments-intercept",
    "appendByteString-memory-arguments-slope",
    "appendString-cpu-arguments-intercept",
    "appendString-cpu-arguments-slope",
    "appendString-memory-arguments-intercept",
    "appendString-memory-arguments-slope",
    "bData-cpu-arguments",
    "bData-memory-arguments",
    "blake2b_256-cpu-arguments-intercept",
    "blake2b_256-cpu-arguments-slope",
    "blake2b_256-memory-arguments",
    "cekApplyCost-exBudgetCPU",
    "cekApplyCost-exBudgetMemory",
    "cekBuiltinCost-exBudgetCPU",
    "cekBuiltinCost-exBudgetMemory",
    "cekConstCost-exBudgetCPU",
    "cekConstCost-exBudgetMemory",
    "cekDelayCost-exBudgetCPU",
    "cekDelayCost-exBudgetMemory",
    "cekForceCost-exBudgetCPU",
    "cekForceCost-exBudgetMemory",
    "cekLamCost-exBudgetCPU",
    "cekLamCost-exBudgetMemory",
    "cekStartupCost-exBudgetCPU",
    "cekStartupCost-exBudgetMemory",
    "cekVarCost-exBudgetCPU",
    "cekVarCost-exBudgetMemory",
    "chooseData-cpu-arguments",
    "chooseData-memory-arguments",
    "chooseList-cpu-arguments",
    "chooseList-memory-arguments",
    "chooseUnit-cpu-arguments",
    "chooseUnit-memory-arguments",
    "consByteString-cpu-arguments-intercept",
    "consByteString-cpu-arguments-slope",
    "consByteString-memory-arguments-intercept",
    "consByteString-memory-arguments-slope",
    "constrData-cpu-arguments",
    "constrData-memory-arguments",
    "decodeUtf8-cpu-arguments-intercept",
    "decodeUtf8-cpu-arguments-slope",
    "decodeUtf8-memory-arguments-intercept",
    "decodeUtf8-memory-arguments-slope",
    "divideInteger-cpu-arguments-constant",
    "divideInteger-cpu-arguments-model-arguments-intercept",
    "divideInteger-cpu-arguments-model-arguments-slope",
    "divideInteger-memory-arguments-intercept",
    "divideInteger-memory-arguments-minimum",
    "divideInteger-memory-arguments-slope",
    "encodeUtf8-cpu-arguments-intercept",
    "encodeUtf8-cpu-arguments-slope",
    "encodeUtf8-memory-arguments-intercept",
    "encodeUtf8-memory-arguments-slope",
    "equalsByteString-cpu-arguments-constant",
    "equalsByteString-cpu-arguments-intercept",
    "equalsByteString-cpu-arguments-slope",
    "equalsByteString-memory-arguments",
    "equalsData-cpu-arguments-intercept",
    "equalsData-cpu-arguments-slope",
    "equalsData-memory-arguments",
    "equalsInteger-cpu-arguments-intercept",
    "equalsInteger-cpu-arguments-slope",
    "equalsInteger-memory-arguments",
    "equalsString-cpu-arguments-constant",
    "equalsString-cpu-arguments-intercept",
    "equalsString-cpu-arguments-slope",
    "equalsString-memory-arguments",
    "fstPair-cpu-arguments",
    "fstPair-memory-arguments",
    "headList-cpu-arguments",
    "headList-memory-arguments",
    "iData-cpu-arguments",
    "iData-memory-arguments",
    "ifThenElse-cpu-arguments",
    "ifThenElse-memory-arguments",
    "indexByteString-cpu-arguments",
    "indexByteString-memory-arguments",
    "lengthOfByteString-cpu-arguments",
    "lengthOfByteString-memory-arguments",
    "lessThanByteString-cpu-arguments-intercept",
    "lessThanByteString-cpu-arguments-slope",
    "lessThanByteString-memory-arguments",
    "lessThanEqualsByteString-cpu-arguments-intercept",
    "lessThanEqualsByteString-cpu-arguments-slope",
    "lessThanEqualsByteString-memory-arguments",
    "lessThanEqualsInteger-cpu-arguments-intercept",
    "lessThanEqualsInteger-cpu-arguments-slope",
    "lessThanEqualsInteger-memory-arguments",
    "lessThanInteger-cpu-arguments-intercept",
    "lessThanInteger-cpu-arguments-slope",
    "lessThanInteger-memory-arguments",
    "listData-cpu-arguments",
    "listData-memory-arguments",
    "mapData-cpu-arguments",
    "mapData-memory-arguments",
    "mkCons-cpu-arguments",
    "mkCons-memory-arguments",
    "mkNilData-cpu-arguments",
    "mkNilData-memory-arguments",
    "mkNilPairData-cpu-arguments",
    "mkNilPairData-memory-arguments",
    "mkPairData-cpu-arguments",
    "mkPairData-memory-arguments",
    "modInteger-cpu-arguments-constant",
    "modInteger-cpu-arguments-model-arguments-intercept",
    "modInteger-cpu-arguments-model-arguments-slope",
    "modInteger-memory-arguments-intercept",
    "modInteger-memory-arguments-minimum",
    "modInteger-memory-arguments-slope",
    "multiplyInteger-cpu-arguments-intercept",
    "multiplyInteger-cpu-arguments-slope",
    "multiplyInteger-memory-arguments-intercept",
    "multiplyInteger-memory-arguments-slope",
    "nullList-cpu-arguments",
    "nullList-memory-arguments",
    "quotientInteger-cpu-arguments-constant",
    "quotientInteger-cpu-arguments-model-arguments-intercept",
    "quotientInteger-cpu-arguments-model-arguments-slope",
    "quotientInteger-memory-arguments-intercept",
    "quotientInteger-memory-arguments-minimum",
    "quotientInteger-memory-arguments-slope",
    "remainderInteger-cpu-arguments-constant",
    "remainderInteger-cpu-arguments-model-arguments-intercept",
    "remainderInteger-cpu-arguments-model-arguments-slope",
    "remainderInteger-memory-arguments-intercept",
    "remainderInteger-memory-arguments-minimum",
    "remainderInteger-memory-arguments-slope",
    "serialiseData-cpu-arguments-intercept",
    "serialiseData-cpu-arguments-slope",
    "serialiseData-memory-arguments-intercept",
    "serialiseData-memory-arguments-slope",
    "sha2_256-cpu-arguments-intercept",
    "sha2_256-cpu-arguments-slope",
    "sha2_256-memory-arguments",
    "sha3_256-cpu-arguments-intercept",
    "sha3_256-cpu-arguments-slope",
    "sha3_256-memory-arguments",
    "sliceByteString-cpu-arguments-intercept",
    "sliceByteString-cpu-arguments-slope",
    "sliceByteString-memory-arguments-intercept",
    "sliceByteString-memory-arguments-slope",
    "sndPair-cpu-arguments",
    "sndPair-memory-arguments",
    "subtractInteger-cpu-arguments-intercept",
    "subtractInteger-cpu-arguments-slope",
    "subtractInteger-memory-arguments-intercept",
    "subtractInteger-memory-arguments-slope",
    "tailList-cpu-arguments",
    "tailList-memory-arguments",
    "trace-cpu-arguments",
    "trace-memory-arguments",
    "unBData-cpu-arguments",
    "unBData-memory-arguments",
    "unConstrData-cpu-arguments",
    "unConstrData-memory-arguments",
    "unIData-cpu-arguments",
    "unIData-memory-arguments",
    "unListData-cpu-arguments",
    "unListData-memory-arguments",
    "unMapData-cpu-arguments",
    "unMapData-memory-arguments",
    "verifyEcdsaSecp256k1Signature-cpu-arguments",
    "verifyEcdsaSecp256k1Signature-memory-arguments",
    "verifyEd25519Signature-cpu-arguments-intercept",
    "verifyEd25519Signature-cpu-arguments-slope",
    "verifyEd25519Signature-memory-arguments",
    "verifySchnorrSecp256k1Signature-cpu-arguments-intercept",
    "verifySchnorrSecp256k1Signature-cpu-arguments-slope",
    "verifySchnorrSecp256k1Signature-memory-arguments"
  ]
};

const INVALID_MNEMONIC = "Invalid mnemonic";
const INVALID_ENTROPY = "Invalid entropy";
const INVALID_CHECKSUM = "Invalid mnemonic checksum";
const WORDLIST_REQUIRED = "A wordlist is required but a default could not be found.\nPlease pass a 2048 word array explicitly.";
function mnemonicToEntropy(mnemonic, wordlist) {
  wordlist = wordlist || DEFAULT_WORDLIST;
  if (!wordlist) {
    throw new Error(WORDLIST_REQUIRED);
  }
  const words = normalize(mnemonic).split(" ");
  if (words.length % 3 !== 0) {
    throw new Error(INVALID_MNEMONIC);
  }
  const bits = words.map((word) => {
    const index = wordlist.indexOf(word);
    if (index === -1) {
      throw new Error(INVALID_MNEMONIC);
    }
    return lpad(index.toString(2), "0", 11);
  }).join("");
  const dividerIndex = Math.floor(bits.length / 33) * 32;
  const entropyBits = bits.slice(0, dividerIndex);
  const checksumBits = bits.slice(dividerIndex);
  const entropyBytes = entropyBits.match(/(.{1,8})/g).map(binaryToByte);
  if (entropyBytes.length < 16) {
    throw new Error(INVALID_ENTROPY);
  }
  if (entropyBytes.length > 32) {
    throw new Error(INVALID_ENTROPY);
  }
  if (entropyBytes.length % 4 !== 0) {
    throw new Error(INVALID_ENTROPY);
  }
  const entropy = new Uint8Array(entropyBytes);
  const newChecksum = deriveChecksumBits(entropy);
  if (newChecksum !== checksumBits) {
    throw new Error(INVALID_CHECKSUM);
  }
  return toHex(entropy);
}
function randomBytes(size) {
  const MAX_UINT32 = 4294967295;
  const MAX_BYTES = 65536;
  const bytes = new Uint8Array(size);
  if (size > MAX_UINT32) {
    throw new RangeError("requested too many random bytes");
  }
  if (size > 0) {
    if (size > MAX_BYTES) {
      for (let generated = 0; generated < size; generated += MAX_BYTES) {
        crypto.getRandomValues(bytes.slice(generated, generated + MAX_BYTES));
      }
    } else {
      crypto.getRandomValues(bytes);
    }
  }
  return bytes;
}
function generateMnemonic(strength, rng, wordlist) {
  strength = strength || 128;
  if (strength % 32 !== 0) {
    throw new TypeError(INVALID_ENTROPY);
  }
  rng = rng || randomBytes;
  return entropyToMnemonic(rng(strength / 8), wordlist);
}
function entropyToMnemonic(entropy, wordlist) {
  wordlist = wordlist || DEFAULT_WORDLIST;
  if (!wordlist) {
    throw new Error(WORDLIST_REQUIRED);
  }
  if (entropy.length < 16) {
    throw new TypeError(INVALID_ENTROPY);
  }
  if (entropy.length > 32) {
    throw new TypeError(INVALID_ENTROPY);
  }
  if (entropy.length % 4 !== 0) {
    throw new TypeError(INVALID_ENTROPY);
  }
  const entropyBits = bytesToBinary(Array.from(entropy));
  const checksumBits = deriveChecksumBits(entropy);
  const bits = entropyBits + checksumBits;
  const chunks = bits.match(/(.{1,11})/g);
  const words = chunks.map((binary) => {
    const index = binaryToByte(binary);
    return wordlist[index];
  });
  return wordlist[0] === "\u3042\u3044\u3053\u304F\u3057\u3093" ? words.join("\u3000") : words.join(" ");
}
function deriveChecksumBits(entropyBuffer) {
  const ENT = entropyBuffer.length * 8;
  const CS = ENT / 32;
  const hash = sha256(Array.from(entropyBuffer), { asBytes: true });
  return bytesToBinary(Array.from(hash)).slice(0, CS);
}
function lpad(str, padString, length) {
  while (str.length < length) {
    str = padString + str;
  }
  return str;
}
function bytesToBinary(bytes) {
  return bytes.map((x) => lpad(x.toString(2), "0", 8)).join("");
}
function normalize(str) {
  return (str || "").normalize("NFKD");
}
function binaryToByte(bin) {
  return parseInt(bin, 2);
}
const DEFAULT_WORDLIST = [
  "abandon",
  "ability",
  "able",
  "about",
  "above",
  "absent",
  "absorb",
  "abstract",
  "absurd",
  "abuse",
  "access",
  "accident",
  "account",
  "accuse",
  "achieve",
  "acid",
  "acoustic",
  "acquire",
  "across",
  "act",
  "action",
  "actor",
  "actress",
  "actual",
  "adapt",
  "add",
  "addict",
  "address",
  "adjust",
  "admit",
  "adult",
  "advance",
  "advice",
  "aerobic",
  "affair",
  "afford",
  "afraid",
  "again",
  "age",
  "agent",
  "agree",
  "ahead",
  "aim",
  "air",
  "airport",
  "aisle",
  "alarm",
  "album",
  "alcohol",
  "alert",
  "alien",
  "all",
  "alley",
  "allow",
  "almost",
  "alone",
  "alpha",
  "already",
  "also",
  "alter",
  "always",
  "amateur",
  "amazing",
  "among",
  "amount",
  "amused",
  "analyst",
  "anchor",
  "ancient",
  "anger",
  "angle",
  "angry",
  "animal",
  "ankle",
  "announce",
  "annual",
  "another",
  "answer",
  "antenna",
  "antique",
  "anxiety",
  "any",
  "apart",
  "apology",
  "appear",
  "apple",
  "approve",
  "april",
  "arch",
  "arctic",
  "area",
  "arena",
  "argue",
  "arm",
  "armed",
  "armor",
  "army",
  "around",
  "arrange",
  "arrest",
  "arrive",
  "arrow",
  "art",
  "artefact",
  "artist",
  "artwork",
  "ask",
  "aspect",
  "assault",
  "asset",
  "assist",
  "assume",
  "asthma",
  "athlete",
  "atom",
  "attack",
  "attend",
  "attitude",
  "attract",
  "auction",
  "audit",
  "august",
  "aunt",
  "author",
  "auto",
  "autumn",
  "average",
  "avocado",
  "avoid",
  "awake",
  "aware",
  "away",
  "awesome",
  "awful",
  "awkward",
  "axis",
  "baby",
  "bachelor",
  "bacon",
  "badge",
  "bag",
  "balance",
  "balcony",
  "ball",
  "bamboo",
  "banana",
  "banner",
  "bar",
  "barely",
  "bargain",
  "barrel",
  "base",
  "basic",
  "basket",
  "battle",
  "beach",
  "bean",
  "beauty",
  "because",
  "become",
  "beef",
  "before",
  "begin",
  "behave",
  "behind",
  "believe",
  "below",
  "belt",
  "bench",
  "benefit",
  "best",
  "betray",
  "better",
  "between",
  "beyond",
  "bicycle",
  "bid",
  "bike",
  "bind",
  "biology",
  "bird",
  "birth",
  "bitter",
  "black",
  "blade",
  "blame",
  "blanket",
  "blast",
  "bleak",
  "bless",
  "blind",
  "blood",
  "blossom",
  "blouse",
  "blue",
  "blur",
  "blush",
  "board",
  "boat",
  "body",
  "boil",
  "bomb",
  "bone",
  "bonus",
  "book",
  "boost",
  "border",
  "boring",
  "borrow",
  "boss",
  "bottom",
  "bounce",
  "box",
  "boy",
  "bracket",
  "brain",
  "brand",
  "brass",
  "brave",
  "bread",
  "breeze",
  "brick",
  "bridge",
  "brief",
  "bright",
  "bring",
  "brisk",
  "broccoli",
  "broken",
  "bronze",
  "broom",
  "brother",
  "brown",
  "brush",
  "bubble",
  "buddy",
  "budget",
  "buffalo",
  "build",
  "bulb",
  "bulk",
  "bullet",
  "bundle",
  "bunker",
  "burden",
  "burger",
  "burst",
  "bus",
  "business",
  "busy",
  "butter",
  "buyer",
  "buzz",
  "cabbage",
  "cabin",
  "cable",
  "cactus",
  "cage",
  "cake",
  "call",
  "calm",
  "camera",
  "camp",
  "can",
  "canal",
  "cancel",
  "candy",
  "cannon",
  "canoe",
  "canvas",
  "canyon",
  "capable",
  "capital",
  "captain",
  "car",
  "carbon",
  "card",
  "cargo",
  "carpet",
  "carry",
  "cart",
  "case",
  "cash",
  "casino",
  "castle",
  "casual",
  "cat",
  "catalog",
  "catch",
  "category",
  "cattle",
  "caught",
  "cause",
  "caution",
  "cave",
  "ceiling",
  "celery",
  "cement",
  "census",
  "century",
  "cereal",
  "certain",
  "chair",
  "chalk",
  "champion",
  "change",
  "chaos",
  "chapter",
  "charge",
  "chase",
  "chat",
  "cheap",
  "check",
  "cheese",
  "chef",
  "cherry",
  "chest",
  "chicken",
  "chief",
  "child",
  "chimney",
  "choice",
  "choose",
  "chronic",
  "chuckle",
  "chunk",
  "churn",
  "cigar",
  "cinnamon",
  "circle",
  "citizen",
  "city",
  "civil",
  "claim",
  "clap",
  "clarify",
  "claw",
  "clay",
  "clean",
  "clerk",
  "clever",
  "click",
  "client",
  "cliff",
  "climb",
  "clinic",
  "clip",
  "clock",
  "clog",
  "close",
  "cloth",
  "cloud",
  "clown",
  "club",
  "clump",
  "cluster",
  "clutch",
  "coach",
  "coast",
  "coconut",
  "code",
  "coffee",
  "coil",
  "coin",
  "collect",
  "color",
  "column",
  "combine",
  "come",
  "comfort",
  "comic",
  "common",
  "company",
  "concert",
  "conduct",
  "confirm",
  "congress",
  "connect",
  "consider",
  "control",
  "convince",
  "cook",
  "cool",
  "copper",
  "copy",
  "coral",
  "core",
  "corn",
  "correct",
  "cost",
  "cotton",
  "couch",
  "country",
  "couple",
  "course",
  "cousin",
  "cover",
  "coyote",
  "crack",
  "cradle",
  "craft",
  "cram",
  "crane",
  "crash",
  "crater",
  "crawl",
  "crazy",
  "cream",
  "credit",
  "creek",
  "crew",
  "cricket",
  "crime",
  "crisp",
  "critic",
  "crop",
  "cross",
  "crouch",
  "crowd",
  "crucial",
  "cruel",
  "cruise",
  "crumble",
  "crunch",
  "crush",
  "cry",
  "crystal",
  "cube",
  "culture",
  "cup",
  "cupboard",
  "curious",
  "current",
  "curtain",
  "curve",
  "cushion",
  "custom",
  "cute",
  "cycle",
  "dad",
  "damage",
  "damp",
  "dance",
  "danger",
  "daring",
  "dash",
  "daughter",
  "dawn",
  "day",
  "deal",
  "debate",
  "debris",
  "decade",
  "december",
  "decide",
  "decline",
  "decorate",
  "decrease",
  "deer",
  "defense",
  "define",
  "defy",
  "degree",
  "delay",
  "deliver",
  "demand",
  "demise",
  "denial",
  "dentist",
  "deny",
  "depart",
  "depend",
  "deposit",
  "depth",
  "deputy",
  "derive",
  "describe",
  "desert",
  "design",
  "desk",
  "despair",
  "destroy",
  "detail",
  "detect",
  "develop",
  "device",
  "devote",
  "diagram",
  "dial",
  "diamond",
  "diary",
  "dice",
  "diesel",
  "diet",
  "differ",
  "digital",
  "dignity",
  "dilemma",
  "dinner",
  "dinosaur",
  "direct",
  "dirt",
  "disagree",
  "discover",
  "disease",
  "dish",
  "dismiss",
  "disorder",
  "display",
  "distance",
  "divert",
  "divide",
  "divorce",
  "dizzy",
  "doctor",
  "document",
  "dog",
  "doll",
  "dolphin",
  "domain",
  "donate",
  "donkey",
  "donor",
  "door",
  "dose",
  "double",
  "dove",
  "draft",
  "dragon",
  "drama",
  "drastic",
  "draw",
  "dream",
  "dress",
  "drift",
  "drill",
  "drink",
  "drip",
  "drive",
  "drop",
  "drum",
  "dry",
  "duck",
  "dumb",
  "dune",
  "during",
  "dust",
  "dutch",
  "duty",
  "dwarf",
  "dynamic",
  "eager",
  "eagle",
  "early",
  "earn",
  "earth",
  "easily",
  "east",
  "easy",
  "echo",
  "ecology",
  "economy",
  "edge",
  "edit",
  "educate",
  "effort",
  "egg",
  "eight",
  "either",
  "elbow",
  "elder",
  "electric",
  "elegant",
  "element",
  "elephant",
  "elevator",
  "elite",
  "else",
  "embark",
  "embody",
  "embrace",
  "emerge",
  "emotion",
  "employ",
  "empower",
  "empty",
  "enable",
  "enact",
  "end",
  "endless",
  "endorse",
  "enemy",
  "energy",
  "enforce",
  "engage",
  "engine",
  "enhance",
  "enjoy",
  "enlist",
  "enough",
  "enrich",
  "enroll",
  "ensure",
  "enter",
  "entire",
  "entry",
  "envelope",
  "episode",
  "equal",
  "equip",
  "era",
  "erase",
  "erode",
  "erosion",
  "error",
  "erupt",
  "escape",
  "essay",
  "essence",
  "estate",
  "eternal",
  "ethics",
  "evidence",
  "evil",
  "evoke",
  "evolve",
  "exact",
  "example",
  "excess",
  "exchange",
  "excite",
  "exclude",
  "excuse",
  "execute",
  "exercise",
  "exhaust",
  "exhibit",
  "exile",
  "exist",
  "exit",
  "exotic",
  "expand",
  "expect",
  "expire",
  "explain",
  "expose",
  "express",
  "extend",
  "extra",
  "eye",
  "eyebrow",
  "fabric",
  "face",
  "faculty",
  "fade",
  "faint",
  "faith",
  "fall",
  "false",
  "fame",
  "family",
  "famous",
  "fan",
  "fancy",
  "fantasy",
  "farm",
  "fashion",
  "fat",
  "fatal",
  "father",
  "fatigue",
  "fault",
  "favorite",
  "feature",
  "february",
  "federal",
  "fee",
  "feed",
  "feel",
  "female",
  "fence",
  "festival",
  "fetch",
  "fever",
  "few",
  "fiber",
  "fiction",
  "field",
  "figure",
  "file",
  "film",
  "filter",
  "final",
  "find",
  "fine",
  "finger",
  "finish",
  "fire",
  "firm",
  "first",
  "fiscal",
  "fish",
  "fit",
  "fitness",
  "fix",
  "flag",
  "flame",
  "flash",
  "flat",
  "flavor",
  "flee",
  "flight",
  "flip",
  "float",
  "flock",
  "floor",
  "flower",
  "fluid",
  "flush",
  "fly",
  "foam",
  "focus",
  "fog",
  "foil",
  "fold",
  "follow",
  "food",
  "foot",
  "force",
  "forest",
  "forget",
  "fork",
  "fortune",
  "forum",
  "forward",
  "fossil",
  "foster",
  "found",
  "fox",
  "fragile",
  "frame",
  "frequent",
  "fresh",
  "friend",
  "fringe",
  "frog",
  "front",
  "frost",
  "frown",
  "frozen",
  "fruit",
  "fuel",
  "fun",
  "funny",
  "furnace",
  "fury",
  "future",
  "gadget",
  "gain",
  "galaxy",
  "gallery",
  "game",
  "gap",
  "garage",
  "garbage",
  "garden",
  "garlic",
  "garment",
  "gas",
  "gasp",
  "gate",
  "gather",
  "gauge",
  "gaze",
  "general",
  "genius",
  "genre",
  "gentle",
  "genuine",
  "gesture",
  "ghost",
  "giant",
  "gift",
  "giggle",
  "ginger",
  "giraffe",
  "girl",
  "give",
  "glad",
  "glance",
  "glare",
  "glass",
  "glide",
  "glimpse",
  "globe",
  "gloom",
  "glory",
  "glove",
  "glow",
  "glue",
  "goat",
  "goddess",
  "gold",
  "good",
  "goose",
  "gorilla",
  "gospel",
  "gossip",
  "govern",
  "gown",
  "grab",
  "grace",
  "grain",
  "grant",
  "grape",
  "grass",
  "gravity",
  "great",
  "green",
  "grid",
  "grief",
  "grit",
  "grocery",
  "group",
  "grow",
  "grunt",
  "guard",
  "guess",
  "guide",
  "guilt",
  "guitar",
  "gun",
  "gym",
  "habit",
  "hair",
  "half",
  "hammer",
  "hamster",
  "hand",
  "happy",
  "harbor",
  "hard",
  "harsh",
  "harvest",
  "hat",
  "have",
  "hawk",
  "hazard",
  "head",
  "health",
  "heart",
  "heavy",
  "hedgehog",
  "height",
  "hello",
  "helmet",
  "help",
  "hen",
  "hero",
  "hidden",
  "high",
  "hill",
  "hint",
  "hip",
  "hire",
  "history",
  "hobby",
  "hockey",
  "hold",
  "hole",
  "holiday",
  "hollow",
  "home",
  "honey",
  "hood",
  "hope",
  "horn",
  "horror",
  "horse",
  "hospital",
  "host",
  "hotel",
  "hour",
  "hover",
  "hub",
  "huge",
  "human",
  "humble",
  "humor",
  "hundred",
  "hungry",
  "hunt",
  "hurdle",
  "hurry",
  "hurt",
  "husband",
  "hybrid",
  "ice",
  "icon",
  "idea",
  "identify",
  "idle",
  "ignore",
  "ill",
  "illegal",
  "illness",
  "image",
  "imitate",
  "immense",
  "immune",
  "impact",
  "impose",
  "improve",
  "impulse",
  "inch",
  "include",
  "income",
  "increase",
  "index",
  "indicate",
  "indoor",
  "industry",
  "infant",
  "inflict",
  "inform",
  "inhale",
  "inherit",
  "initial",
  "inject",
  "injury",
  "inmate",
  "inner",
  "innocent",
  "input",
  "inquiry",
  "insane",
  "insect",
  "inside",
  "inspire",
  "install",
  "intact",
  "interest",
  "into",
  "invest",
  "invite",
  "involve",
  "iron",
  "island",
  "isolate",
  "issue",
  "item",
  "ivory",
  "jacket",
  "jaguar",
  "jar",
  "jazz",
  "jealous",
  "jeans",
  "jelly",
  "jewel",
  "job",
  "join",
  "joke",
  "journey",
  "joy",
  "judge",
  "juice",
  "jump",
  "jungle",
  "junior",
  "junk",
  "just",
  "kangaroo",
  "keen",
  "keep",
  "ketchup",
  "key",
  "kick",
  "kid",
  "kidney",
  "kind",
  "kingdom",
  "kiss",
  "kit",
  "kitchen",
  "kite",
  "kitten",
  "kiwi",
  "knee",
  "knife",
  "knock",
  "know",
  "lab",
  "label",
  "labor",
  "ladder",
  "lady",
  "lake",
  "lamp",
  "language",
  "laptop",
  "large",
  "later",
  "latin",
  "laugh",
  "laundry",
  "lava",
  "law",
  "lawn",
  "lawsuit",
  "layer",
  "lazy",
  "leader",
  "leaf",
  "learn",
  "leave",
  "lecture",
  "left",
  "leg",
  "legal",
  "legend",
  "leisure",
  "lemon",
  "lend",
  "length",
  "lens",
  "leopard",
  "lesson",
  "letter",
  "level",
  "liar",
  "liberty",
  "library",
  "license",
  "life",
  "lift",
  "light",
  "like",
  "limb",
  "limit",
  "link",
  "lion",
  "liquid",
  "list",
  "little",
  "live",
  "lizard",
  "load",
  "loan",
  "lobster",
  "local",
  "lock",
  "logic",
  "lonely",
  "long",
  "loop",
  "lottery",
  "loud",
  "lounge",
  "love",
  "loyal",
  "lucky",
  "luggage",
  "lumber",
  "lunar",
  "lunch",
  "luxury",
  "lyrics",
  "machine",
  "mad",
  "magic",
  "magnet",
  "maid",
  "mail",
  "main",
  "major",
  "make",
  "mammal",
  "man",
  "manage",
  "mandate",
  "mango",
  "mansion",
  "manual",
  "maple",
  "marble",
  "march",
  "margin",
  "marine",
  "market",
  "marriage",
  "mask",
  "mass",
  "master",
  "match",
  "material",
  "math",
  "matrix",
  "matter",
  "maximum",
  "maze",
  "meadow",
  "mean",
  "measure",
  "meat",
  "mechanic",
  "medal",
  "media",
  "melody",
  "melt",
  "member",
  "memory",
  "mention",
  "menu",
  "mercy",
  "merge",
  "merit",
  "merry",
  "mesh",
  "message",
  "metal",
  "method",
  "middle",
  "midnight",
  "milk",
  "million",
  "mimic",
  "mind",
  "minimum",
  "minor",
  "minute",
  "miracle",
  "mirror",
  "misery",
  "miss",
  "mistake",
  "mix",
  "mixed",
  "mixture",
  "mobile",
  "model",
  "modify",
  "mom",
  "moment",
  "monitor",
  "monkey",
  "monster",
  "month",
  "moon",
  "moral",
  "more",
  "morning",
  "mosquito",
  "mother",
  "motion",
  "motor",
  "mountain",
  "mouse",
  "move",
  "movie",
  "much",
  "muffin",
  "mule",
  "multiply",
  "muscle",
  "museum",
  "mushroom",
  "music",
  "must",
  "mutual",
  "myself",
  "mystery",
  "myth",
  "naive",
  "name",
  "napkin",
  "narrow",
  "nasty",
  "nation",
  "nature",
  "near",
  "neck",
  "need",
  "negative",
  "neglect",
  "neither",
  "nephew",
  "nerve",
  "nest",
  "net",
  "network",
  "neutral",
  "never",
  "news",
  "next",
  "nice",
  "night",
  "noble",
  "noise",
  "nominee",
  "noodle",
  "normal",
  "north",
  "nose",
  "notable",
  "note",
  "nothing",
  "notice",
  "novel",
  "now",
  "nuclear",
  "number",
  "nurse",
  "nut",
  "oak",
  "obey",
  "object",
  "oblige",
  "obscure",
  "observe",
  "obtain",
  "obvious",
  "occur",
  "ocean",
  "october",
  "odor",
  "off",
  "offer",
  "office",
  "often",
  "oil",
  "okay",
  "old",
  "olive",
  "olympic",
  "omit",
  "once",
  "one",
  "onion",
  "online",
  "only",
  "open",
  "opera",
  "opinion",
  "oppose",
  "option",
  "orange",
  "orbit",
  "orchard",
  "order",
  "ordinary",
  "organ",
  "orient",
  "original",
  "orphan",
  "ostrich",
  "other",
  "outdoor",
  "outer",
  "output",
  "outside",
  "oval",
  "oven",
  "over",
  "own",
  "owner",
  "oxygen",
  "oyster",
  "ozone",
  "pact",
  "paddle",
  "page",
  "pair",
  "palace",
  "palm",
  "panda",
  "panel",
  "panic",
  "panther",
  "paper",
  "parade",
  "parent",
  "park",
  "parrot",
  "party",
  "pass",
  "patch",
  "path",
  "patient",
  "patrol",
  "pattern",
  "pause",
  "pave",
  "payment",
  "peace",
  "peanut",
  "pear",
  "peasant",
  "pelican",
  "pen",
  "penalty",
  "pencil",
  "people",
  "pepper",
  "perfect",
  "permit",
  "person",
  "pet",
  "phone",
  "photo",
  "phrase",
  "physical",
  "piano",
  "picnic",
  "picture",
  "piece",
  "pig",
  "pigeon",
  "pill",
  "pilot",
  "pink",
  "pioneer",
  "pipe",
  "pistol",
  "pitch",
  "pizza",
  "place",
  "planet",
  "plastic",
  "plate",
  "play",
  "please",
  "pledge",
  "pluck",
  "plug",
  "plunge",
  "poem",
  "poet",
  "point",
  "polar",
  "pole",
  "police",
  "pond",
  "pony",
  "pool",
  "popular",
  "portion",
  "position",
  "possible",
  "post",
  "potato",
  "pottery",
  "poverty",
  "powder",
  "power",
  "practice",
  "praise",
  "predict",
  "prefer",
  "prepare",
  "present",
  "pretty",
  "prevent",
  "price",
  "pride",
  "primary",
  "print",
  "priority",
  "prison",
  "private",
  "prize",
  "problem",
  "process",
  "produce",
  "profit",
  "program",
  "project",
  "promote",
  "proof",
  "property",
  "prosper",
  "protect",
  "proud",
  "provide",
  "public",
  "pudding",
  "pull",
  "pulp",
  "pulse",
  "pumpkin",
  "punch",
  "pupil",
  "puppy",
  "purchase",
  "purity",
  "purpose",
  "purse",
  "push",
  "put",
  "puzzle",
  "pyramid",
  "quality",
  "quantum",
  "quarter",
  "question",
  "quick",
  "quit",
  "quiz",
  "quote",
  "rabbit",
  "raccoon",
  "race",
  "rack",
  "radar",
  "radio",
  "rail",
  "rain",
  "raise",
  "rally",
  "ramp",
  "ranch",
  "random",
  "range",
  "rapid",
  "rare",
  "rate",
  "rather",
  "raven",
  "raw",
  "razor",
  "ready",
  "real",
  "reason",
  "rebel",
  "rebuild",
  "recall",
  "receive",
  "recipe",
  "record",
  "recycle",
  "reduce",
  "reflect",
  "reform",
  "refuse",
  "region",
  "regret",
  "regular",
  "reject",
  "relax",
  "release",
  "relief",
  "rely",
  "remain",
  "remember",
  "remind",
  "remove",
  "render",
  "renew",
  "rent",
  "reopen",
  "repair",
  "repeat",
  "replace",
  "report",
  "require",
  "rescue",
  "resemble",
  "resist",
  "resource",
  "response",
  "result",
  "retire",
  "retreat",
  "return",
  "reunion",
  "reveal",
  "review",
  "reward",
  "rhythm",
  "rib",
  "ribbon",
  "rice",
  "rich",
  "ride",
  "ridge",
  "rifle",
  "right",
  "rigid",
  "ring",
  "riot",
  "ripple",
  "risk",
  "ritual",
  "rival",
  "river",
  "road",
  "roast",
  "robot",
  "robust",
  "rocket",
  "romance",
  "roof",
  "rookie",
  "room",
  "rose",
  "rotate",
  "rough",
  "round",
  "route",
  "royal",
  "rubber",
  "rude",
  "rug",
  "rule",
  "run",
  "runway",
  "rural",
  "sad",
  "saddle",
  "sadness",
  "safe",
  "sail",
  "salad",
  "salmon",
  "salon",
  "salt",
  "salute",
  "same",
  "sample",
  "sand",
  "satisfy",
  "satoshi",
  "sauce",
  "sausage",
  "save",
  "say",
  "scale",
  "scan",
  "scare",
  "scatter",
  "scene",
  "scheme",
  "school",
  "science",
  "scissors",
  "scorpion",
  "scout",
  "scrap",
  "screen",
  "script",
  "scrub",
  "sea",
  "search",
  "season",
  "seat",
  "second",
  "secret",
  "section",
  "security",
  "seed",
  "seek",
  "segment",
  "select",
  "sell",
  "seminar",
  "senior",
  "sense",
  "sentence",
  "series",
  "service",
  "session",
  "settle",
  "setup",
  "seven",
  "shadow",
  "shaft",
  "shallow",
  "share",
  "shed",
  "shell",
  "sheriff",
  "shield",
  "shift",
  "shine",
  "ship",
  "shiver",
  "shock",
  "shoe",
  "shoot",
  "shop",
  "short",
  "shoulder",
  "shove",
  "shrimp",
  "shrug",
  "shuffle",
  "shy",
  "sibling",
  "sick",
  "side",
  "siege",
  "sight",
  "sign",
  "silent",
  "silk",
  "silly",
  "silver",
  "similar",
  "simple",
  "since",
  "sing",
  "siren",
  "sister",
  "situate",
  "six",
  "size",
  "skate",
  "sketch",
  "ski",
  "skill",
  "skin",
  "skirt",
  "skull",
  "slab",
  "slam",
  "sleep",
  "slender",
  "slice",
  "slide",
  "slight",
  "slim",
  "slogan",
  "slot",
  "slow",
  "slush",
  "small",
  "smart",
  "smile",
  "smoke",
  "smooth",
  "snack",
  "snake",
  "snap",
  "sniff",
  "snow",
  "soap",
  "soccer",
  "social",
  "sock",
  "soda",
  "soft",
  "solar",
  "soldier",
  "solid",
  "solution",
  "solve",
  "someone",
  "song",
  "soon",
  "sorry",
  "sort",
  "soul",
  "sound",
  "soup",
  "source",
  "south",
  "space",
  "spare",
  "spatial",
  "spawn",
  "speak",
  "special",
  "speed",
  "spell",
  "spend",
  "sphere",
  "spice",
  "spider",
  "spike",
  "spin",
  "spirit",
  "split",
  "spoil",
  "sponsor",
  "spoon",
  "sport",
  "spot",
  "spray",
  "spread",
  "spring",
  "spy",
  "square",
  "squeeze",
  "squirrel",
  "stable",
  "stadium",
  "staff",
  "stage",
  "stairs",
  "stamp",
  "stand",
  "start",
  "state",
  "stay",
  "steak",
  "steel",
  "stem",
  "step",
  "stereo",
  "stick",
  "still",
  "sting",
  "stock",
  "stomach",
  "stone",
  "stool",
  "story",
  "stove",
  "strategy",
  "street",
  "strike",
  "strong",
  "struggle",
  "student",
  "stuff",
  "stumble",
  "style",
  "subject",
  "submit",
  "subway",
  "success",
  "such",
  "sudden",
  "suffer",
  "sugar",
  "suggest",
  "suit",
  "summer",
  "sun",
  "sunny",
  "sunset",
  "super",
  "supply",
  "supreme",
  "sure",
  "surface",
  "surge",
  "surprise",
  "surround",
  "survey",
  "suspect",
  "sustain",
  "swallow",
  "swamp",
  "swap",
  "swarm",
  "swear",
  "sweet",
  "swift",
  "swim",
  "swing",
  "switch",
  "sword",
  "symbol",
  "symptom",
  "syrup",
  "system",
  "table",
  "tackle",
  "tag",
  "tail",
  "talent",
  "talk",
  "tank",
  "tape",
  "target",
  "task",
  "taste",
  "tattoo",
  "taxi",
  "teach",
  "team",
  "tell",
  "ten",
  "tenant",
  "tennis",
  "tent",
  "term",
  "test",
  "text",
  "thank",
  "that",
  "theme",
  "then",
  "theory",
  "there",
  "they",
  "thing",
  "this",
  "thought",
  "three",
  "thrive",
  "throw",
  "thumb",
  "thunder",
  "ticket",
  "tide",
  "tiger",
  "tilt",
  "timber",
  "time",
  "tiny",
  "tip",
  "tired",
  "tissue",
  "title",
  "toast",
  "tobacco",
  "today",
  "toddler",
  "toe",
  "together",
  "toilet",
  "token",
  "tomato",
  "tomorrow",
  "tone",
  "tongue",
  "tonight",
  "tool",
  "tooth",
  "top",
  "topic",
  "topple",
  "torch",
  "tornado",
  "tortoise",
  "toss",
  "total",
  "tourist",
  "toward",
  "tower",
  "town",
  "toy",
  "track",
  "trade",
  "traffic",
  "tragic",
  "train",
  "transfer",
  "trap",
  "trash",
  "travel",
  "tray",
  "treat",
  "tree",
  "trend",
  "trial",
  "tribe",
  "trick",
  "trigger",
  "trim",
  "trip",
  "trophy",
  "trouble",
  "truck",
  "true",
  "truly",
  "trumpet",
  "trust",
  "truth",
  "try",
  "tube",
  "tuition",
  "tumble",
  "tuna",
  "tunnel",
  "turkey",
  "turn",
  "turtle",
  "twelve",
  "twenty",
  "twice",
  "twin",
  "twist",
  "two",
  "type",
  "typical",
  "ugly",
  "umbrella",
  "unable",
  "unaware",
  "uncle",
  "uncover",
  "under",
  "undo",
  "unfair",
  "unfold",
  "unhappy",
  "uniform",
  "unique",
  "unit",
  "universe",
  "unknown",
  "unlock",
  "until",
  "unusual",
  "unveil",
  "update",
  "upgrade",
  "uphold",
  "upon",
  "upper",
  "upset",
  "urban",
  "urge",
  "usage",
  "use",
  "used",
  "useful",
  "useless",
  "usual",
  "utility",
  "vacant",
  "vacuum",
  "vague",
  "valid",
  "valley",
  "valve",
  "van",
  "vanish",
  "vapor",
  "various",
  "vast",
  "vault",
  "vehicle",
  "velvet",
  "vendor",
  "venture",
  "venue",
  "verb",
  "verify",
  "version",
  "very",
  "vessel",
  "veteran",
  "viable",
  "vibrant",
  "vicious",
  "victory",
  "video",
  "view",
  "village",
  "vintage",
  "violin",
  "virtual",
  "virus",
  "visa",
  "visit",
  "visual",
  "vital",
  "vivid",
  "vocal",
  "voice",
  "void",
  "volcano",
  "volume",
  "vote",
  "voyage",
  "wage",
  "wagon",
  "wait",
  "walk",
  "wall",
  "walnut",
  "want",
  "warfare",
  "warm",
  "warrior",
  "wash",
  "wasp",
  "waste",
  "water",
  "wave",
  "way",
  "wealth",
  "weapon",
  "wear",
  "weasel",
  "weather",
  "web",
  "wedding",
  "weekend",
  "weird",
  "welcome",
  "west",
  "wet",
  "whale",
  "what",
  "wheat",
  "wheel",
  "when",
  "where",
  "whip",
  "whisper",
  "wide",
  "width",
  "wife",
  "wild",
  "will",
  "win",
  "window",
  "wine",
  "wing",
  "wink",
  "winner",
  "winter",
  "wire",
  "wisdom",
  "wise",
  "wish",
  "witness",
  "wolf",
  "woman",
  "wonder",
  "wood",
  "wool",
  "word",
  "work",
  "world",
  "worry",
  "worth",
  "wrap",
  "wreck",
  "wrestle",
  "wrist",
  "write",
  "wrong",
  "yard",
  "year",
  "yellow",
  "you",
  "young",
  "youth",
  "zebra",
  "zero",
  "zone",
  "zoo"
];

let TABLE = [
  0,
  7,
  14,
  9,
  28,
  27,
  18,
  21,
  56,
  63,
  54,
  49,
  36,
  35,
  42,
  45,
  112,
  119,
  126,
  121,
  108,
  107,
  98,
  101,
  72,
  79,
  70,
  65,
  84,
  83,
  90,
  93,
  224,
  231,
  238,
  233,
  252,
  251,
  242,
  245,
  216,
  223,
  214,
  209,
  196,
  195,
  202,
  205,
  144,
  151,
  158,
  153,
  140,
  139,
  130,
  133,
  168,
  175,
  166,
  161,
  180,
  179,
  186,
  189,
  199,
  192,
  201,
  206,
  219,
  220,
  213,
  210,
  255,
  248,
  241,
  246,
  227,
  228,
  237,
  234,
  183,
  176,
  185,
  190,
  171,
  172,
  165,
  162,
  143,
  136,
  129,
  134,
  147,
  148,
  157,
  154,
  39,
  32,
  41,
  46,
  59,
  60,
  53,
  50,
  31,
  24,
  17,
  22,
  3,
  4,
  13,
  10,
  87,
  80,
  89,
  94,
  75,
  76,
  69,
  66,
  111,
  104,
  97,
  102,
  115,
  116,
  125,
  122,
  137,
  142,
  135,
  128,
  149,
  146,
  155,
  156,
  177,
  182,
  191,
  184,
  173,
  170,
  163,
  164,
  249,
  254,
  247,
  240,
  229,
  226,
  235,
  236,
  193,
  198,
  207,
  200,
  221,
  218,
  211,
  212,
  105,
  110,
  103,
  96,
  117,
  114,
  123,
  124,
  81,
  86,
  95,
  88,
  77,
  74,
  67,
  68,
  25,
  30,
  23,
  16,
  5,
  2,
  11,
  12,
  33,
  38,
  47,
  40,
  61,
  58,
  51,
  52,
  78,
  73,
  64,
  71,
  82,
  85,
  92,
  91,
  118,
  113,
  120,
  127,
  106,
  109,
  100,
  99,
  62,
  57,
  48,
  55,
  34,
  37,
  44,
  43,
  6,
  1,
  8,
  15,
  26,
  29,
  20,
  19,
  174,
  169,
  160,
  167,
  178,
  181,
  188,
  187,
  150,
  145,
  152,
  159,
  138,
  141,
  132,
  131,
  222,
  217,
  208,
  215,
  194,
  197,
  204,
  203,
  230,
  225,
  232,
  239,
  250,
  253,
  244,
  243
];
if (typeof Int32Array !== "undefined") {
  TABLE = new Int32Array(TABLE);
}
function crc8(current, previous = 0) {
  let crc = ~~previous;
  for (let index = 0; index < current.length; index++) {
    crc = TABLE[(crc ^ current[index]) & 255] & 255;
  }
  return crc;
}

const SLOT_CONFIG_NETWORK = {
  Mainnet: { zeroTime: 1596059091e3, zeroSlot: 4492800, slotLength: 1e3 },
  // Starting at Shelley era
  Preview: { zeroTime: 1666656e6, zeroSlot: 0, slotLength: 1e3 },
  // Starting at Shelley era
  Preprod: {
    zeroTime: 16540416e5 + 1728e6,
    zeroSlot: 86400,
    slotLength: 1e3
  },
  // Starting at Shelley era
  /** Customizable slot config (Initialized with 0 values). */
  Custom: { zeroTime: 0, zeroSlot: 0, slotLength: 0 }
};
function slotToBeginUnixTime(slot, slotConfig) {
  const msAfterBegin = (slot - slotConfig.zeroSlot) * slotConfig.slotLength;
  return slotConfig.zeroTime + msAfterBegin;
}
function unixTimeToEnclosingSlot(unixTime, slotConfig) {
  const timePassed = unixTime - slotConfig.zeroTime;
  const slotsPassed = Math.floor(timePassed / slotConfig.slotLength);
  return slotsPassed + slotConfig.zeroSlot;
}

var __defProp$f = Object.defineProperty;
var __defNormalProp$f = (obj, key, value) => key in obj ? __defProp$f(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$f = (obj, key, value) => {
  __defNormalProp$f(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Constr {
  constructor(index, fields) {
    __publicField$f(this, "index");
    __publicField$f(this, "fields");
    this.index = index;
    this.fields = fields;
  }
}
const Data = {
  // Types
  // Note: Recursive types are not supported (yet)
  Integer: function(options) {
    const integer = typebox.Type.Unsafe({ dataType: "integer" });
    if (options) {
      Object.entries(options).forEach(([key, value]) => {
        integer[key] = value;
      });
    }
    return integer;
  },
  Bytes: function(options) {
    const bytes = typebox.Type.Unsafe({ dataType: "bytes" });
    if (options) {
      Object.entries(options).forEach(([key, value]) => {
        bytes[key] = value;
      });
    }
    return bytes;
  },
  Boolean: function() {
    return typebox.Type.Unsafe({
      anyOf: [
        {
          title: "False",
          dataType: "constructor",
          index: 0,
          fields: []
        },
        {
          title: "True",
          dataType: "constructor",
          index: 1,
          fields: []
        }
      ]
    });
  },
  Any: function() {
    return typebox.Type.Unsafe({ description: "Any Data." });
  },
  Array: function(items, options) {
    const array = typebox.Type.Array(items);
    replaceProperties(array, { dataType: "list", items });
    if (options) {
      Object.entries(options).forEach(([key, value]) => {
        array[key] = value;
      });
    }
    return array;
  },
  Map: function(keys, values, options) {
    const map = typebox.Type.Unsafe({
      dataType: "map",
      keys,
      values
    });
    if (options) {
      Object.entries(options).forEach(([key, value]) => {
        map[key] = value;
      });
    }
    return map;
  },
  /**
   * Object applies by default a PlutusData Constr with index 0.\
   * Set 'hasConstr' to false to serialize Object as PlutusData List.
   */
  Object: function(properties, options) {
    const object = typebox.Type.Object(properties);
    replaceProperties(object, {
      anyOf: [
        {
          dataType: "constructor",
          index: 0,
          // Will be replaced when using Data.Enum
          fields: Object.entries(properties).map(([title, p]) => ({
            ...p,
            title
          }))
        }
      ]
    });
    object.anyOf[0].hasConstr = typeof options?.hasConstr === "undefined" || options.hasConstr;
    return object;
  },
  Enum: function(items) {
    const union = typebox.Type.Union(items);
    replaceProperties(union, {
      anyOf: items.map(
        (item, index) => item.anyOf[0].fields.length === 0 ? {
          ...item.anyOf[0],
          index
        } : {
          dataType: "constructor",
          title: (() => {
            const title = item.anyOf[0].fields[0].title;
            if (title.charAt(0) !== title.charAt(0).toUpperCase()) {
              throw new Error(
                `Enum '${title}' needs to start with an uppercase letter.`
              );
            }
            return item.anyOf[0].fields[0].title;
          })(),
          index,
          fields: item.anyOf[0].fields[0].items || item.anyOf[0].fields[0].anyOf[0].fields
        }
      )
    });
    return union;
  },
  /**
   * Tuple is by default a PlutusData List.\
   * Set 'hasConstr' to true to apply a PlutusData Constr with index 0.
   */
  Tuple: function(items, options) {
    const tuple = typebox.Type.Tuple(items);
    replaceProperties(tuple, {
      dataType: "list",
      items
    });
    if (options) {
      Object.entries(options).forEach(([key, value]) => {
        tuple[key] = value;
      });
    }
    return tuple;
  },
  Literal: function(title) {
    if (title.charAt(0) !== title.charAt(0).toUpperCase()) {
      throw new Error(
        `Enum '${title}' needs to start with an uppercase letter.`
      );
    }
    const literal = typebox.Type.Literal(title);
    replaceProperties(literal, {
      anyOf: [
        {
          dataType: "constructor",
          title,
          index: 0,
          // Will be replaced in Data.Enum
          fields: []
        }
      ]
    });
    return literal;
  },
  Nullable: function(item) {
    return typebox.Type.Unsafe({
      anyOf: [
        {
          title: "Some",
          description: "An optional value.",
          dataType: "constructor",
          index: 0,
          fields: [item]
        },
        {
          title: "None",
          description: "Nothing.",
          dataType: "constructor",
          index: 1,
          fields: []
        }
      ]
    });
  },
  /**
   * Convert PlutusData to Cbor encoded data.\
   * Or apply a shape and convert the provided data struct to Cbor encoded data.
   */
  to,
  /** Convert Cbor encoded data to PlutusData */
  from,
  /**
   * Note Constr cannot be used here.\
   * Strings prefixed with '0x' are not UTF-8 encoded.
   */
  fromJson,
  /**
   * Note Constr cannot be used here, also only bytes/integers as Json keys.\
   */
  toJson,
  void: function() {
    return "d87980";
  },
  castFrom,
  castTo
};
function to(data, type, recType) {
  function serialize(data2) {
    try {
      if (typeof data2 === "bigint") {
        return exports.C.PlutusData.new_integer(exports.C.BigInt.from_str(data2.toString()));
      } else if (typeof data2 === "string") {
        return exports.C.PlutusData.new_bytes(fromHex(data2));
      } else if (data2 instanceof Constr) {
        const { index, fields } = data2;
        const plutusList = exports.C.PlutusList.new();
        fields.forEach((field) => plutusList.add(serialize(field)));
        return exports.C.PlutusData.new_constr_plutus_data(
          exports.C.ConstrPlutusData.new(
            exports.C.BigNum.from_str(index.toString()),
            plutusList
          )
        );
      } else if (data2 instanceof Array) {
        const plutusList = exports.C.PlutusList.new();
        data2.forEach((arg) => plutusList.add(serialize(arg)));
        return exports.C.PlutusData.new_list(plutusList);
      } else if (data2 instanceof Map) {
        const plutusMap = exports.C.PlutusMap.new();
        for (const [key, value] of data2.entries()) {
          plutusMap.insert(serialize(key), serialize(value));
        }
        return exports.C.PlutusData.new_map(plutusMap);
      }
      throw new Error("Unsupported type");
    } catch (error) {
      throw new Error("Could not serialize the data: " + error);
    }
  }
  const d = type ? castTo(data, type, recType) : data;
  return toHex(serialize(d).to_bytes());
}
function from(raw, type) {
  function deserialize(data2) {
    if (data2.kind() === 0) {
      const constr = data2.as_constr_plutus_data();
      const l = constr.data();
      const desL = [];
      for (let i = 0; i < l.len(); i++) {
        desL.push(deserialize(l.get(i)));
      }
      return new Constr(parseInt(constr.alternative().to_str()), desL);
    } else if (data2.kind() === 1) {
      const m = data2.as_map();
      const desM = /* @__PURE__ */ new Map();
      const keys = m.keys();
      for (let i = 0; i < keys.len(); i++) {
        desM.set(deserialize(keys.get(i)), deserialize(m.get(keys.get(i))));
      }
      return desM;
    } else if (data2.kind() === 2) {
      const l = data2.as_list();
      const desL = [];
      for (let i = 0; i < l.len(); i++) {
        desL.push(deserialize(l.get(i)));
      }
      return desL;
    } else if (data2.kind() === 3) {
      return BigInt(data2.as_integer().to_str());
    } else if (data2.kind() === 4) {
      return toHex(data2.as_bytes());
    }
    throw new Error("Unsupported type");
  }
  const data = deserialize(exports.C.PlutusData.from_bytes(fromHex(raw)));
  return type ? castFrom(data, type) : data;
}
function fromJson(json) {
  function toData(json2) {
    if (typeof json2 === "string") {
      return json2.startsWith("0x") ? toHex(fromHex(json2.slice(2))) : fromText(json2);
    }
    if (typeof json2 === "number")
      return BigInt(json2);
    if (typeof json2 === "bigint")
      return json2;
    if (json2 instanceof Array)
      return json2.map((v) => toData(v));
    if (json2 instanceof Object) {
      const tempMap = /* @__PURE__ */ new Map();
      Object.entries(json2).forEach(([key, value]) => {
        tempMap.set(toData(key), toData(value));
      });
      return tempMap;
    }
    throw new Error("Unsupported type");
  }
  return toData(json);
}
function toJson(plutusData) {
  function fromData(data) {
    if (typeof data === "bigint" || typeof data === "number" || typeof data === "string" && !isNaN(parseInt(data)) && data.slice(-1) === "n") {
      const bigint = typeof data === "string" ? BigInt(data.slice(0, -1)) : data;
      return parseInt(bigint.toString());
    }
    if (typeof data === "string") {
      try {
        return new TextDecoder(void 0, { fatal: true }).decode(
          fromHex(data)
        );
      } catch (_) {
        return "0x" + toHex(fromHex(data));
      }
    }
    if (data instanceof Array)
      return data.map((v) => fromData(v));
    if (data instanceof Map) {
      const tempJson = {};
      data.forEach((value, key) => {
        const convertedKey = fromData(key);
        if (typeof convertedKey !== "string" && typeof convertedKey !== "number") {
          throw new Error(
            "Unsupported type (Note: Only bytes or integers can be keys of a JSON object)"
          );
        }
        tempJson[convertedKey] = fromData(value);
      });
      return tempJson;
    }
    throw new Error(
      "Unsupported type (Note: Constructor cannot be converted to JSON)"
    );
  }
  return fromData(plutusData);
}
function castFrom(data, type) {
  const shape = type;
  if (!shape)
    throw new Error("Could not type cast data.");
  const shapeType = (shape.anyOf ? "enum" : "") || shape.dataType;
  switch (shapeType) {
    case "integer": {
      if (typeof data !== "bigint") {
        throw new Error("Could not type cast to integer.");
      }
      integerConstraints(data, shape);
      return data;
    }
    case "bytes": {
      if (typeof data !== "string") {
        throw new Error("Could not type cast to bytes.");
      }
      bytesConstraints(data, shape);
      return data;
    }
    case "constructor": {
      if (isVoid(shape)) {
        if (!(data instanceof Constr) || data.index !== 0 || data.fields.length !== 0) {
          throw new Error("Could not type cast to void.");
        }
        return void 0;
      } else if (data instanceof Constr && data.index === shape.index && (shape.hasConstr || shape.hasConstr === void 0)) {
        const fields = {};
        if (shape.fields.length !== data.fields.length) {
          throw new Error(
            "Could not type cast to object. Fields do not match."
          );
        }
        shape.fields.forEach((field, fieldIndex) => {
          const title = field.title || "wrapper";
          if (/[A-Z]/.test(title[0])) {
            throw new Error(
              "Could not type cast to object. Object properties need to start with a lowercase letter."
            );
          }
          fields[title] = castFrom(data.fields[fieldIndex], field);
        });
        return fields;
      } else if (data instanceof Array && !shape.hasConstr && shape.hasConstr !== void 0) {
        const fields = {};
        if (shape.fields.length !== data.length) {
          throw new Error("Could not ype cast to object. Fields do not match.");
        }
        shape.fields.forEach((field, fieldIndex) => {
          const title = field.title || "wrapper";
          if (/[A-Z]/.test(title[0])) {
            throw new Error(
              "Could not type cast to object. Object properties need to start with a lowercase letter."
            );
          }
          fields[title] = castFrom(data[fieldIndex], field);
        });
        return fields;
      }
      throw new Error("Could not type cast to object.");
    }
    case "enum": {
      if (shape.anyOf.length === 1) {
        return castFrom(data, shape.anyOf[0]);
      }
      if (!(data instanceof Constr)) {
        throw new Error("Could not type cast to enum.");
      }
      const enumShape = shape.anyOf.find(
        (entry) => entry.index === data.index
      );
      if (!enumShape || enumShape.fields.length !== data.fields.length) {
        throw new Error("Could not type cast to enum.");
      }
      if (isBoolean(shape)) {
        if (data.fields.length !== 0) {
          throw new Error("Could not type cast to boolean.");
        }
        switch (data.index) {
          case 0:
            return false;
          case 1:
            return true;
        }
        throw new Error("Could not type cast to boolean.");
      } else if (isNullable(shape)) {
        switch (data.index) {
          case 0: {
            if (data.fields.length !== 1) {
              throw new Error("Could not type cast to nullable object.");
            }
            return castFrom(data.fields[0], shape.anyOf[0].fields[0]);
          }
          case 1: {
            if (data.fields.length !== 0) {
              throw new Error("Could not type cast to nullable object.");
            }
            return null;
          }
        }
        throw new Error("Could not type cast to nullable object.");
      }
      switch (enumShape.dataType) {
        case "constructor": {
          if (enumShape.fields.length === 0) {
            if (/[A-Z]/.test(enumShape.title[0])) {
              return enumShape.title;
            }
            throw new Error("Could not type cast to enum.");
          } else {
            if (!/[A-Z]/.test(enumShape.title)) {
              throw new Error(
                "Could not type cast to enum. Enums need to start with an uppercase letter."
              );
            }
            if (enumShape.fields.length !== data.fields.length) {
              throw new Error("Could not type cast to enum.");
            }
            const args = enumShape.fields[0].title ? Object.fromEntries(
              enumShape.fields.map((field, index) => [
                field.title,
                castFrom(data.fields[index], field)
              ])
            ) : enumShape.fields.map(
              (field, index) => castFrom(data.fields[index], field)
            );
            return {
              [enumShape.title]: args
            };
          }
        }
      }
      throw new Error("Could not type cast to enum.");
    }
    case "list": {
      if (shape.items instanceof Array) {
        if (data instanceof Constr && data.index === 0 && shape.hasConstr) {
          return data.fields.map(
            (field, index) => castFrom(field, shape.items[index])
          );
        } else if (data instanceof Array && !shape.hasConstr) {
          return data.map(
            (field, index) => castFrom(field, shape.items[index])
          );
        }
        throw new Error("Could not type cast to tuple.");
      } else {
        if (!(data instanceof Array)) {
          throw new Error("Could not type cast to array.");
        }
        listConstraints(data, shape);
        return data.map((field) => castFrom(field, shape.items));
      }
    }
    case "map": {
      if (!(data instanceof Map)) {
        throw new Error("Could not type cast to map.");
      }
      mapConstraints(data, shape);
      const map = /* @__PURE__ */ new Map();
      for (const [key, value] of data.entries()) {
        map.set(castFrom(key, shape.keys), castFrom(value, shape.values));
      }
      return map;
    }
    case void 0: {
      return data;
    }
  }
  throw new Error("Could not type cast data.");
}
function castTo(struct, type, recType, recShape) {
  let shape = type;
  if (!shape)
    throw new Error("Could not type cast struct.");
  let shapeType = (shape.anyOf ? "enum" : "") || shape.dataType;
  if (recType === shape.title) {
    recShape = { recType, shape, shapeType };
  } else if (recShape && shape.$ref) {
    shape = recShape.shape;
    shapeType = recShape.shapeType;
  }
  switch (shapeType) {
    case "integer": {
      if (typeof struct !== "bigint") {
        throw new Error("Could not type cast to integer.");
      }
      integerConstraints(struct, shape);
      return struct;
    }
    case "bytes": {
      if (typeof struct !== "string") {
        throw new Error("Could not type cast to bytes.");
      }
      bytesConstraints(struct, shape);
      return struct;
    }
    case "constructor": {
      if (isVoid(shape)) {
        if (struct !== void 0) {
          throw new Error("Could not type cast to void.");
        }
        return new Constr(0, []);
      } else if (typeof struct !== "object" || struct === null || shape.fields.length !== Object.keys(struct).length) {
        throw new Error("Could not type cast to constructor.");
      }
      const fields = shape.fields.map(
        (field) => castTo(
          struct[field.title || "wrapper"],
          field,
          recType,
          recShape
        )
      );
      return shape.hasConstr || shape.hasConstr === void 0 ? new Constr(shape.index, fields) : fields;
    }
    case "enum": {
      if (shape.anyOf.length === 1) {
        return castTo(struct, shape.anyOf[0], recType, recShape);
      }
      if (isBoolean(shape)) {
        if (typeof struct !== "boolean") {
          throw new Error("Could not type cast to boolean.");
        }
        return new Constr(struct ? 1 : 0, []);
      } else if (isNullable(shape)) {
        if (struct === null)
          return new Constr(1, []);
        else {
          const fields = shape.anyOf[0].fields;
          if (fields.length !== 1) {
            throw new Error("Could not type cast to nullable object.");
          }
          return new Constr(0, [
            castTo(struct, fields[0], recType, recShape)
          ]);
        }
      }
      switch (typeof struct) {
        case "string": {
          if (!/[A-Z]/.test(struct[0])) {
            throw new Error(
              "Could not type cast to enum. Enum needs to start with an uppercase letter."
            );
          }
          const enumIndex = shape.anyOf.findIndex(
            (s) => s.dataType === "constructor" && s.fields.length === 0 && s.title === struct
          );
          if (enumIndex === -1)
            throw new Error("Could not type cast to enum.");
          return new Constr(enumIndex, []);
        }
        case "object": {
          if (struct === null)
            throw new Error("Could not type cast to enum.");
          const structTitle = Object.keys(struct)[0];
          if (!/[A-Z]/.test(structTitle)) {
            throw new Error(
              "Could not type cast to enum. Enum needs to start with an uppercase letter."
            );
          }
          const enumEntry = shape.anyOf.find(
            (s) => s.dataType === "constructor" && s.title === structTitle
          );
          if (!enumEntry)
            throw new Error("Could not type cast to enum.");
          const args = struct[structTitle];
          return new Constr(
            enumEntry.index,
            // check if named args
            args instanceof Array ? args.map(
              (item, index) => castTo(item, enumEntry.fields[index], recType, recShape)
            ) : enumEntry.fields.map((entry) => {
              const [_, item] = Object.entries(args).find(
                ([title]) => title === entry.title
              );
              return castTo(item, entry, recType, recShape);
            })
          );
        }
      }
      throw new Error("Could not type cast to enum.");
    }
    case "list": {
      if (!(struct instanceof Array)) {
        throw new Error("Could not type cast to array/tuple.");
      }
      if (shape.items instanceof Array) {
        const fields = struct.map(
          (item, index) => castTo(item, shape.items[index], recType, recShape)
        );
        return shape.hasConstr ? new Constr(0, fields) : fields;
      } else {
        listConstraints(struct, shape);
        return struct.map(
          (item) => castTo(item, shape.items, recType, recShape)
        );
      }
    }
    case "map": {
      if (!(struct instanceof Map)) {
        throw new Error("Could not type cast to map.");
      }
      mapConstraints(struct, shape);
      const map = /* @__PURE__ */ new Map();
      for (const [key, value] of struct.entries()) {
        map.set(
          castTo(key, shape.keys, recType, recShape),
          castTo(value, shape.values, recType, recShape)
        );
      }
      return map;
    }
    case void 0: {
      return struct;
    }
  }
  throw new Error("Could not type cast struct.");
}
function integerConstraints(integer, shape) {
  if (shape.minimum && integer < BigInt(shape.minimum)) {
    throw new Error(
      `Integer ${integer} is below the minimum ${shape.minimum}.`
    );
  }
  if (shape.maximum && integer > BigInt(shape.maximum)) {
    throw new Error(
      `Integer ${integer} is above the maxiumum ${shape.maximum}.`
    );
  }
  if (shape.exclusiveMinimum && integer <= BigInt(shape.exclusiveMinimum)) {
    throw new Error(
      `Integer ${integer} is below the exclusive minimum ${shape.exclusiveMinimum}.`
    );
  }
  if (shape.exclusiveMaximum && integer >= BigInt(shape.exclusiveMaximum)) {
    throw new Error(
      `Integer ${integer} is above the exclusive maximum ${shape.exclusiveMaximum}.`
    );
  }
}
function bytesConstraints(bytes, shape) {
  if (shape.enum && !shape.enum.some((keyword) => keyword === bytes))
    throw new Error(`None of the keywords match with '${bytes}'.`);
  if (shape.minLength && bytes.length / 2 < shape.minLength) {
    throw new Error(
      `Bytes need to have a length of at least ${shape.minLength} bytes.`
    );
  }
  if (shape.maxLength && bytes.length / 2 > shape.maxLength) {
    throw new Error(
      `Bytes can have a length of at most ${shape.minLength} bytes.`
    );
  }
}
function listConstraints(list, shape) {
  if (shape.minItems && list.length < shape.minItems) {
    throw new Error(`Array needs to contain at least ${shape.minItems} items.`);
  }
  if (shape.maxItems && list.length > shape.maxItems) {
    throw new Error(`Array can contain at most ${shape.maxItems} items.`);
  }
  if (shape.uniqueItems && new Set(list).size !== list.length) {
    throw new Error("Array constains duplicates.");
  }
}
function mapConstraints(map, shape) {
  if (shape.minItems && map.size < shape.minItems) {
    throw new Error(`Map needs to contain at least ${shape.minItems} items.`);
  }
  if (shape.maxItems && map.size > shape.maxItems) {
    throw new Error(`Map can contain at most ${shape.maxItems} items.`);
  }
}
function isBoolean(shape) {
  return shape.anyOf && shape.anyOf[0]?.title === "False" && shape.anyOf[1]?.title === "True";
}
function isVoid(shape) {
  return shape.index === 0 && shape.fields.length === 0;
}
function isNullable(shape) {
  return shape.anyOf && shape.anyOf[0]?.title === "Some" && shape.anyOf[1]?.title === "None";
}
function replaceProperties(object, properties) {
  Object.keys(object).forEach((key) => {
    delete object[key];
  });
  Object.assign(object, properties);
}

const toCore = {
  credential(credential) {
    if (credential.type == "Key") {
      return exports.C.StakeCredential.from_keyhash(
        exports.C.Ed25519KeyHash.from_hex(credential.hash)
      );
    } else if (credential.type == "Script") {
      return exports.C.StakeCredential.from_scripthash(
        exports.C.ScriptHash.from_hex(credential.hash)
      );
    }
    throw new Error("Lucid credential type mismatch");
  }
};

var __defProp$e = Object.defineProperty;
var __defNormalProp$e = (obj, key, value) => key in obj ? __defProp$e(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$e = (obj, key, value) => {
  __defNormalProp$e(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Utils {
  constructor(translucent) {
    __publicField$e(this, "translucent");
    this.translucent = translucent;
  }
  validatorToAddress(validator, stakeCredential) {
    const validatorHash = this.validatorToScriptHash(validator);
    if (stakeCredential) {
      return exports.C.BaseAddress.new(
        networkToId(this.translucent.network),
        exports.C.StakeCredential.from_scripthash(exports.C.ScriptHash.from_hex(validatorHash)),
        toCore.credential(stakeCredential)
      ).to_address().to_bech32(void 0);
    } else {
      return exports.C.EnterpriseAddress.new(
        networkToId(this.translucent.network),
        exports.C.StakeCredential.from_scripthash(exports.C.ScriptHash.from_hex(validatorHash))
      ).to_address().to_bech32(void 0);
    }
  }
  credentialToAddress(paymentCredential, stakeCredential) {
    if (stakeCredential) {
      return exports.C.BaseAddress.new(
        networkToId(this.translucent.network),
        paymentCredential.type === "Key" ? exports.C.StakeCredential.from_keyhash(
          exports.C.Ed25519KeyHash.from_hex(paymentCredential.hash)
        ) : exports.C.StakeCredential.from_scripthash(
          exports.C.ScriptHash.from_hex(paymentCredential.hash)
        ),
        stakeCredential.type === "Key" ? exports.C.StakeCredential.from_keyhash(
          exports.C.Ed25519KeyHash.from_hex(stakeCredential.hash)
        ) : exports.C.StakeCredential.from_scripthash(
          exports.C.ScriptHash.from_hex(stakeCredential.hash)
        )
      ).to_address().to_bech32(void 0);
    } else {
      return exports.C.EnterpriseAddress.new(
        networkToId(this.translucent.network),
        paymentCredential.type === "Key" ? exports.C.StakeCredential.from_keyhash(
          exports.C.Ed25519KeyHash.from_hex(paymentCredential.hash)
        ) : exports.C.StakeCredential.from_scripthash(
          exports.C.ScriptHash.from_hex(paymentCredential.hash)
        )
      ).to_address().to_bech32(void 0);
    }
  }
  validatorToRewardAddress(validator) {
    const validatorHash = this.validatorToScriptHash(validator);
    return exports.C.RewardAddress.new(
      networkToId(this.translucent.network),
      exports.C.StakeCredential.from_scripthash(exports.C.ScriptHash.from_hex(validatorHash))
    ).to_address().to_bech32(void 0);
  }
  credentialToRewardAddress(stakeCredential) {
    return exports.C.RewardAddress.new(
      networkToId(this.translucent.network),
      stakeCredential.type === "Key" ? exports.C.StakeCredential.from_keyhash(
        exports.C.Ed25519KeyHash.from_hex(stakeCredential.hash)
      ) : exports.C.StakeCredential.from_scripthash(
        exports.C.ScriptHash.from_hex(stakeCredential.hash)
      )
    ).to_address().to_bech32(void 0);
  }
  validatorToScriptHash(validator) {
    switch (validator.type) {
      case "Native":
        return exports.C.NativeScript.from_bytes(fromHex(validator.script)).hash().to_hex();
      case "PlutusV1":
        return exports.C.PlutusScript.from_v1(
          exports.C.PlutusV1Script.from_bytes(
            fromHex(applyDoubleCborEncoding(validator.script))
          )
        ).hash().to_hex();
      case "PlutusV2":
        return exports.C.PlutusScript.from_v2(
          exports.C.PlutusV2Script.from_bytes(
            fromHex(applyDoubleCborEncoding(validator.script))
          )
        ).hash().to_hex();
      default:
        throw new Error("No variant matched");
    }
  }
  mintingPolicyToId(mintingPolicy) {
    return this.validatorToScriptHash(mintingPolicy);
  }
  datumToHash(datum) {
    return exports.C.hash_plutus_data(exports.C.PlutusData.from_bytes(fromHex(datum))).to_hex();
  }
  scriptHashToCredential(scriptHash) {
    return {
      type: "Script",
      hash: scriptHash
    };
  }
  keyHashToCredential(keyHash) {
    return {
      type: "Key",
      hash: keyHash
    };
  }
  generatePrivateKey() {
    return generatePrivateKey();
  }
  generateSeedPhrase() {
    return generateSeedPhrase();
  }
  unixTimeToSlot(unixTime) {
    return unixTimeToEnclosingSlot(
      unixTime,
      SLOT_CONFIG_NETWORK[this.translucent.network]
    );
  }
  slotToUnixTime(slot) {
    return slotToBeginUnixTime(
      slot,
      SLOT_CONFIG_NETWORK[this.translucent.network]
    );
  }
  /** Address can be in Bech32 or Hex. */
  getAddressDetails(address) {
    return getAddressDetails(address);
  }
  /**
   * Convert a native script from Json to the Hex representation.
   * It follows this Json format: https://github.com/input-output-hk/cardano-node/blob/master/doc/reference/simple-scripts.md
   */
  nativeScriptFromJson(nativeScript) {
    return nativeScriptFromJson(nativeScript);
  }
  paymentCredentialOf(address) {
    return paymentCredentialOf(address);
  }
  stakeCredentialOf(rewardAddress) {
    return stakeCredentialOf(rewardAddress);
  }
}
function addressFromHexOrBech32(address) {
  try {
    return exports.C.Address.from_bytes(fromHex(address));
  } catch (_e) {
    try {
      return exports.C.Address.from_bech32(address);
    } catch (_e2) {
      throw new Error("Could not deserialize address.");
    }
  }
}
function getAddressDetails(address) {
  try {
    const parsedAddress = exports.C.BaseAddress.from_address(
      addressFromHexOrBech32(address)
    );
    const paymentCredential = parsedAddress.payment_cred().kind() === 0 ? {
      type: "Key",
      hash: toHex(parsedAddress.payment_cred().to_keyhash().to_bytes())
    } : {
      type: "Script",
      hash: toHex(
        parsedAddress.payment_cred().to_scripthash().to_bytes()
      )
    };
    const stakeCredential = parsedAddress.stake_cred().kind() === 0 ? {
      type: "Key",
      hash: toHex(parsedAddress.stake_cred().to_keyhash().to_bytes())
    } : {
      type: "Script",
      hash: toHex(parsedAddress.stake_cred().to_scripthash().to_bytes())
    };
    return {
      type: "Base",
      networkId: parsedAddress.to_address().network_id(),
      address: {
        bech32: parsedAddress.to_address().to_bech32(void 0),
        hex: toHex(parsedAddress.to_address().to_bytes())
      },
      paymentCredential,
      stakeCredential
    };
  } catch (_e) {
  }
  try {
    const parsedAddress = exports.C.EnterpriseAddress.from_address(
      addressFromHexOrBech32(address)
    );
    const paymentCredential = parsedAddress.payment_cred().kind() === 0 ? {
      type: "Key",
      hash: toHex(parsedAddress.payment_cred().to_keyhash().to_bytes())
    } : {
      type: "Script",
      hash: toHex(
        parsedAddress.payment_cred().to_scripthash().to_bytes()
      )
    };
    return {
      type: "Enterprise",
      networkId: parsedAddress.to_address().network_id(),
      address: {
        bech32: parsedAddress.to_address().to_bech32(void 0),
        hex: toHex(parsedAddress.to_address().to_bytes())
      },
      paymentCredential
    };
  } catch (_e) {
  }
  try {
    const parsedAddress = exports.C.PointerAddress.from_address(
      addressFromHexOrBech32(address)
    );
    const paymentCredential = parsedAddress.payment_cred().kind() === 0 ? {
      type: "Key",
      hash: toHex(parsedAddress.payment_cred().to_keyhash().to_bytes())
    } : {
      type: "Script",
      hash: toHex(
        parsedAddress.payment_cred().to_scripthash().to_bytes()
      )
    };
    return {
      type: "Pointer",
      networkId: parsedAddress.to_address().network_id(),
      address: {
        bech32: parsedAddress.to_address().to_bech32(void 0),
        hex: toHex(parsedAddress.to_address().to_bytes())
      },
      paymentCredential
    };
  } catch (_e) {
  }
  try {
    const parsedAddress = exports.C.RewardAddress.from_address(
      addressFromHexOrBech32(address)
    );
    const stakeCredential = parsedAddress.payment_cred().kind() === 0 ? {
      type: "Key",
      hash: toHex(parsedAddress.payment_cred().to_keyhash().to_bytes())
    } : {
      type: "Script",
      hash: toHex(
        parsedAddress.payment_cred().to_scripthash().to_bytes()
      )
    };
    return {
      type: "Reward",
      networkId: parsedAddress.to_address().network_id(),
      address: {
        bech32: parsedAddress.to_address().to_bech32(void 0),
        hex: toHex(parsedAddress.to_address().to_bytes())
      },
      stakeCredential
    };
  } catch (_e) {
  }
  try {
    const parsedAddress = ((address2) => {
      try {
        return exports.C.ByronAddress.from_bytes(fromHex(address2));
      } catch (_e) {
        try {
          return exports.C.ByronAddress.from_base58(address2);
        } catch (_e2) {
          throw new Error("Could not deserialize address.");
        }
      }
    })(address);
    return {
      type: "Byron",
      networkId: parsedAddress.to_address().network_id(),
      address: {
        bech32: "",
        hex: toHex(parsedAddress.to_address().to_bytes())
      }
    };
  } catch (_e) {
  }
  throw new Error("No address type matched for: " + address);
}
function paymentCredentialOf(address) {
  const { paymentCredential } = getAddressDetails(address);
  if (!paymentCredential) {
    throw new Error(
      "The specified address does not contain a payment credential."
    );
  }
  return paymentCredential;
}
function stakeCredentialOf(rewardAddress) {
  const { stakeCredential } = getAddressDetails(rewardAddress);
  if (!stakeCredential) {
    throw new Error(
      "The specified address does not contain a stake credential."
    );
  }
  return stakeCredential;
}
function generatePrivateKey() {
  return exports.C.PrivateKey.generate_ed25519().to_bech32();
}
function generateSeedPhrase() {
  return generateMnemonic(256);
}
function valueToAssets(value) {
  const assets = {};
  assets["lovelace"] = BigInt(value.coin().to_str());
  const ma = value.multiasset();
  if (ma) {
    const multiAssets = ma.keys();
    for (let j = 0; j < multiAssets.len(); j++) {
      const policy = multiAssets.get(j);
      const policyAssets = ma.get(policy);
      const assetNames = policyAssets.keys();
      for (let k = 0; k < assetNames.len(); k++) {
        const policyAsset = assetNames.get(k);
        const quantity = policyAssets.get(policyAsset);
        const unit = toHex(policy.to_bytes()) + toHex(policyAsset.name());
        assets[unit] = BigInt(quantity.to_str());
      }
    }
  }
  return assets;
}
function assetsToValue(assets) {
  const multiAsset = exports.C.MultiAsset.new();
  const lovelace = assets["lovelace"];
  const units = Object.keys(assets);
  const policies = Array.from(
    new Set(
      units.filter((unit) => unit !== "lovelace").map((unit) => unit.slice(0, 56))
    )
  );
  policies.forEach((policy) => {
    const policyUnits = units.filter((unit) => unit.slice(0, 56) === policy);
    const assetsValue = exports.C.Assets.new();
    policyUnits.forEach((unit) => {
      assetsValue.insert(
        exports.C.AssetName.new(fromHex(unit.slice(56))),
        exports.C.BigNum.from_str(assets[unit].toString())
      );
    });
    multiAsset.insert(exports.C.ScriptHash.from_bytes(fromHex(policy)), assetsValue);
  });
  const value = exports.C.Value.new(
    exports.C.BigNum.from_str(lovelace ? lovelace.toString() : "0")
  );
  if (units.length > 1 || !lovelace)
    value.set_multiasset(multiAsset);
  return value;
}
function fromScriptRef(scriptRef) {
  const kind = scriptRef.script().kind();
  switch (kind) {
    case 0:
      return {
        type: "Native",
        script: toHex(scriptRef.script().as_native().to_bytes())
      };
    case 1:
      return {
        type: "PlutusV1",
        script: toHex(scriptRef.script().as_plutus_v1().to_bytes())
      };
    case 2:
      return {
        type: "PlutusV2",
        script: toHex(scriptRef.script().as_plutus_v2().to_bytes())
      };
    default:
      throw new Error("No variant matched.");
  }
}
function toScriptRef(script) {
  switch (script.type) {
    case "Native":
      return exports.C.ScriptRef.new(
        exports.C.Script.new_native(exports.C.NativeScript.from_bytes(fromHex(script.script)))
      );
    case "PlutusV1":
      return exports.C.ScriptRef.new(
        exports.C.Script.new_plutus_v1(
          exports.C.PlutusV1Script.from_bytes(
            fromHex(applyDoubleCborEncoding(script.script))
          )
        )
      );
    case "PlutusV2":
      return exports.C.ScriptRef.new(
        exports.C.Script.new_plutus_v2(
          exports.C.PlutusV2Script.from_bytes(
            fromHex(applyDoubleCborEncoding(script.script))
          )
        )
      );
    default:
      throw new Error("No variant matched.");
  }
}
function utxoToCore(utxo) {
  const address = (() => {
    try {
      return exports.C.Address.from_bech32(utxo.address);
    } catch (_e) {
      return exports.C.ByronAddress.from_base58(utxo.address).to_address();
    }
  })();
  const output = exports.C.TransactionOutput.new(address, assetsToValue(utxo.assets));
  if (utxo.datumHash) {
    output.set_datum(
      exports.C.Datum.new_data_hash(exports.C.DataHash.from_bytes(fromHex(utxo.datumHash)))
    );
  }
  if (!utxo.datumHash && utxo.datum) {
    output.set_datum(
      exports.C.Datum.new_data(exports.C.PlutusData.from_bytes(fromHex(utxo.datum)))
    );
  }
  if (utxo.scriptRef) {
    output.set_script_ref(toScriptRef(utxo.scriptRef));
  }
  return exports.C.TransactionUnspentOutput.new(
    exports.C.TransactionInput.new(
      exports.C.TransactionHash.from_bytes(fromHex(utxo.txHash)),
      exports.C.BigNum.from_str(utxo.outputIndex.toString())
    ),
    output
  );
}
function coreToUtxo(coreUtxo) {
  return {
    txHash: toHex(coreUtxo.input().transaction_id().to_bytes()),
    outputIndex: parseInt(coreUtxo.input().index().to_str()),
    assets: valueToAssets(coreUtxo.output().amount()),
    address: coreUtxo.output().address().as_byron() ? coreUtxo.output().address().as_byron()?.to_base58() : coreUtxo.output().address().to_bech32(void 0),
    datumHash: coreUtxo.output()?.datum()?.as_data_hash()?.to_hex(),
    datum: coreUtxo.output()?.datum()?.as_inline_data() && toHex(coreUtxo.output().datum().as_inline_data().to_bytes()),
    scriptRef: coreUtxo.output()?.script_ref() && fromScriptRef(coreUtxo.output().script_ref())
  };
}
function networkToId(network) {
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
function fromHex(hex) {
  const matched = hex.match(/.{1,2}/g);
  return new Uint8Array(
    matched ? matched.map((byte) => parseInt(byte, 16)) : []
  );
}
function toHex(bytes) {
  return Array.from(bytes).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
function toText(hex) {
  return new TextDecoder().decode(fromHex(hex));
}
function fromText(text) {
  return toHex(new TextEncoder().encode(text));
}
function toPublicKey(privateKey) {
  return exports.C.PrivateKey.from_bech32(privateKey).to_public().to_bech32();
}
function checksum(num) {
  return crc8(fromHex(num)).toString(16).padStart(2, "0");
}
function toLabel(num) {
  if (num < 0 || num > 65535) {
    throw new Error(
      `Label ${num} out of range: min label 1 - max label 65535.`
    );
  }
  const numHex = num.toString(16).padStart(4, "0");
  return "0" + numHex + checksum(numHex) + "0";
}
function fromLabel(label) {
  if (label.length !== 8 || !(label[0] === "0" && label[7] === "0")) {
    return null;
  }
  const numHex = label.slice(1, 5);
  const num = parseInt(numHex, 16);
  const check = label.slice(5, 7);
  return check === checksum(numHex) ? num : null;
}
function toUnit(policyId, name, label) {
  const hexLabel = Number.isInteger(label) ? toLabel(label) : "";
  const n = name ? name : "";
  if ((n + hexLabel).length > 64) {
    throw new Error("Asset name size exceeds 32 bytes.");
  }
  if (policyId.length !== 56) {
    throw new Error(`Policy id invalid: ${policyId}.`);
  }
  return policyId + hexLabel + n;
}
function fromUnit(unit) {
  const policyId = unit.slice(0, 56);
  const assetName = unit.slice(56) || null;
  const label = fromLabel(unit.slice(56, 64));
  const name = (() => {
    const hexName = Number.isInteger(label) ? unit.slice(64) : unit.slice(56);
    return hexName || null;
  })();
  return { policyId, assetName, name, label };
}
function nativeScriptFromJson(nativeScript) {
  return {
    type: "Native",
    script: toHex(doNativeScriptFromJSON(nativeScript).to_bytes())
  };
}
function doNativeScriptFromJSON(nativeScript) {
  if (nativeScript.type === "sig") {
    return exports.C.NativeScript.new_script_pubkey(
      exports.C.ScriptPubkey.new(exports.C.Ed25519KeyHash.from_hex(nativeScript.keyHash))
    );
  } else if (nativeScript.type === "all") {
    const nativeScripts = exports.C.NativeScripts.new();
    for (const subScript of nativeScript.scripts) {
      let subNativeScript = doNativeScriptFromJSON(subScript);
      nativeScripts.add(subNativeScript);
    }
    return exports.C.NativeScript.new_script_all(exports.C.ScriptAll.new(nativeScripts));
  } else if (nativeScript.type === "any") {
    const nativeScripts = exports.C.NativeScripts.new();
    for (const subScript of nativeScript.scripts) {
      let subNativeScript = doNativeScriptFromJSON(subScript);
      nativeScripts.add(subNativeScript);
    }
    return exports.C.NativeScript.new_script_all(exports.C.ScriptAny.new(nativeScripts));
  } else if (nativeScript.type === "before") {
    return exports.C.NativeScript.new_timelock_expiry(
      exports.C.TimelockExpiry.new(exports.C.BigNum.from_str(nativeScript.slot.toString()))
    );
  } else if (nativeScript.type === "after") {
    return exports.C.NativeScript.new_timelock_start(
      exports.C.TimelockStart.new(exports.C.BigNum.from_str(nativeScript.slot.toString()))
    );
  } else if (nativeScript.type === "atLeast") {
    const nativeScripts = exports.C.NativeScripts.new();
    for (const subScript of nativeScript.scripts) {
      let subNativeScript = doNativeScriptFromJSON(subScript);
      nativeScripts.add(subNativeScript);
    }
    return exports.C.NativeScript.new_script_n_of_k(
      exports.C.ScriptNOfK.new(nativeScript.required, nativeScripts)
    );
  }
  throw "No nativescript type variants matched";
}
function applyParamsToScript(plutusScript, params, type) {
  const p = type ? Data.castTo(params, type) : params;
  return toHex(
    exports.U.apply_params_to_script(fromHex(Data.to(p)), fromHex(plutusScript))
  );
}
function applyDoubleCborEncoding(script) {
  try {
    exports.C.PlutusV2Script.from_bytes(
      exports.C.PlutusV2Script.from_bytes(fromHex(script)).bytes()
    );
    return script;
  } catch (_e) {
    return toHex(exports.C.PlutusV2Script.new(fromHex(script)).to_bytes());
  }
}
function addAssets(...assets) {
  return assets.reduce((a, b) => {
    for (const k in b) {
      if (Object.hasOwn(b, k)) {
        a[k] = (a[k] || 0n) + b[k];
      }
    }
    return a;
  }, {});
}

var __defProp$d = Object.defineProperty;
var __defNormalProp$d = (obj, key, value) => key in obj ? __defProp$d(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$d = (obj, key, value) => {
  __defNormalProp$d(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class TxSigned {
  constructor(translucent, tx) {
    __publicField$d(this, "txSigned");
    __publicField$d(this, "translucent");
    this.translucent = translucent;
    this.txSigned = tx;
  }
  async submit() {
    return await (this.translucent.wallet || this.translucent.provider).submitTx(toHex(this.txSigned.to_bytes()));
  }
  /** Returns the transaction in Hex encoded Cbor. */
  toString() {
    return toHex(this.txSigned.to_bytes());
  }
  /** Return the transaction hash. */
  toHash() {
    return exports.C.hash_transaction(this.txSigned.body()).to_hex();
  }
}

var __defProp$c = Object.defineProperty;
var __defNormalProp$c = (obj, key, value) => key in obj ? __defProp$c(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$c = (obj, key, value) => {
  __defNormalProp$c(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class TxComplete {
  constructor(translucent, tx) {
    __publicField$c(this, "txComplete");
    __publicField$c(this, "witnessSetBuilder");
    __publicField$c(this, "tasks");
    __publicField$c(this, "translucent");
    __publicField$c(this, "fee");
    __publicField$c(this, "exUnits", null);
    this.translucent = translucent;
    this.txComplete = tx;
    this.witnessSetBuilder = exports.C.TransactionWitnessSetBuilder.new();
    this.tasks = [];
    this.fee = parseInt(tx.body().fee().to_str());
    const redeemers = tx.witness_set().redeemers();
    if (redeemers) {
      const exUnits = { cpu: 0, mem: 0 };
      for (let i = 0; i < redeemers.len(); i++) {
        const redeemer = redeemers.get(i);
        exUnits.cpu += parseInt(redeemer.ex_units().steps().to_str());
        exUnits.mem += parseInt(redeemer.ex_units().mem().to_str());
      }
      this.exUnits = exUnits;
    }
  }
  sign() {
    this.tasks.push(async () => {
      const witnesses = await this.translucent.wallet.signTx(this.txComplete);
      this.witnessSetBuilder.add_existing(witnesses);
    });
    return this;
  }
  /** Add an extra signature from a private key. */
  signWithPrivateKey(privateKey) {
    const priv = exports.C.PrivateKey.from_bech32(privateKey);
    const witness = exports.C.make_vkey_witness(
      exports.C.hash_transaction(this.txComplete.body()),
      priv
    );
    this.witnessSetBuilder.add_vkey(witness);
    return this;
  }
  /** Sign the transaction and return the witnesses that were just made. */
  async partialSign() {
    const witnesses = await this.translucent.wallet.signTx(this.txComplete);
    this.witnessSetBuilder.add_existing(witnesses);
    return toHex(witnesses.to_bytes());
  }
  /**
   * Sign the transaction and return the witnesses that were just made.
   * Add an extra signature from a private key.
   */
  partialSignWithPrivateKey(privateKey) {
    const priv = exports.C.PrivateKey.from_bech32(privateKey);
    const witness = exports.C.make_vkey_witness(
      exports.C.hash_transaction(this.txComplete.body()),
      priv
    );
    this.witnessSetBuilder.add_vkey(witness);
    const witnesses = exports.C.TransactionWitnessSetBuilder.new();
    witnesses.add_vkey(witness);
    return toHex(witnesses.build().to_bytes());
  }
  /** Sign the transaction with the given witnesses. */
  assemble(witnesses) {
    witnesses.forEach((witness) => {
      const witnessParsed = exports.C.TransactionWitnessSet.from_bytes(
        fromHex(witness)
      );
      this.witnessSetBuilder.add_existing(witnessParsed);
    });
    return this;
  }
  async complete() {
    for (const task of this.tasks) {
      await task();
    }
    this.witnessSetBuilder.add_existing(this.txComplete.witness_set());
    const signedTx = exports.C.Transaction.new(
      this.txComplete.body(),
      this.witnessSetBuilder.build(),
      this.txComplete.auxiliary_data()
    );
    return new TxSigned(this.translucent, signedTx);
  }
  /** Return the transaction in Hex encoded Cbor. */
  toString() {
    return toHex(this.txComplete.to_bytes());
  }
  /** Return the transaction hash. */
  toHash() {
    return exports.C.hash_transaction(this.txComplete.body()).to_hex();
  }
}

var __defProp$b = Object.defineProperty;
var __defNormalProp$b = (obj, key, value) => key in obj ? __defProp$b(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$b = (obj, key, value) => {
  __defNormalProp$b(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Tx {
  constructor(translucent) {
    __publicField$b(this, "txBuilder");
    __publicField$b(this, "scripts");
    __publicField$b(this, "native_scripts");
    /** Stores the tx instructions, which get executed after calling .complete() */
    __publicField$b(this, "tasks");
    __publicField$b(this, "earlyTasks");
    __publicField$b(this, "translucent");
    __publicField$b(this, "UTxOs", []);
    __publicField$b(this, "referencedUTxOs", []);
    this.translucent = translucent;
    this.txBuilder = exports.C.TransactionBuilder.new(this.translucent.txBuilderConfig);
    this.tasks = [];
    this.earlyTasks = [];
    this.scripts = {};
    this.native_scripts = {};
  }
  /** Read data from utxos. These utxos are only referenced and not spent. */
  readFrom(utxos) {
    this.earlyTasks.push(async (that) => {
      for (const utxo of utxos) {
        if (utxo.datumHash) {
          throw "Reference hash not supported";
        }
        const coreUtxo = utxoToCore(utxo);
        {
          let scriptRef = coreUtxo.output().script_ref();
          if (scriptRef) {
            let script = scriptRef.script();
            if (!script.as_plutus_v2()) {
              throw "Reference script wasn't V2 compatible";
            }
            this.scripts[script.hash().to_hex()] = {
              referenceScript: script.as_plutus_v2()
            };
          }
        }
        this.referencedUTxOs.push(coreUtxo);
        that.txBuilder.add_reference_input(coreUtxo);
      }
    });
    return this;
  }
  /**
   * A public key or native script input.
   * With redeemer it's a plutus script input.
   */
  collectFrom(utxos, redeemer) {
    this.tasks.push(async (that) => {
      for (const utxo of utxos) {
        if (utxo.datumHash && !utxo.datum) {
          utxo.datum = Data.to(await that.translucent.datumOf(utxo));
        }
        const coreUtxo = utxoToCore(utxo);
        this.UTxOs.push(coreUtxo);
        let inputBuilder = exports.C.SingleInputBuilder.new(
          coreUtxo.input(),
          coreUtxo.output()
        );
        let mr;
        let address = coreUtxo.output().address();
        let paymentCredential = address.payment_cred();
        if (redeemer && paymentCredential?.to_scripthash()) {
          let paymentCredential2 = address.payment_cred();
          if (!paymentCredential2) {
            throw "Address has no payment credential";
          }
          if (!paymentCredential2.to_scripthash()) {
            throw "Address isn't a scripthash but has a redeemer";
          }
          let scriptHash = paymentCredential2.to_scripthash().to_hex();
          let script = this.scripts[scriptHash];
          if (!script) {
            throw "Script was not attached for UTxO spend";
          }
          let datum = coreUtxo.output().datum()?.as_inline_data();
          if ("inlineScript" in script) {
            mr = inputBuilder.plutus_script(
              exports.C.PartialPlutusWitness.new(
                exports.C.PlutusScriptWitness.from_script(script.inlineScript),
                exports.C.PlutusData.from_bytes(fromHex(redeemer))
              ),
              exports.C.Ed25519KeyHashes.new(),
              datum
            );
          } else {
            mr = inputBuilder.plutus_script(
              exports.C.PartialPlutusWitness.new(
                exports.C.PlutusScriptWitness.from_ref(script.referenceScript.hash()),
                exports.C.PlutusData.from_bytes(fromHex(redeemer))
              ),
              exports.C.Ed25519KeyHashes.new(),
              datum
            );
          }
        } else {
          let payCred = coreUtxo.output().address().payment_cred();
          if (payCred?.kind() == 0) {
            mr = inputBuilder.payment_key();
          } else {
            let scriptHash = payCred?.to_scripthash()?.to_hex().toString();
            let ns = this.native_scripts[scriptHash];
            if (!ns) {
              throw "No native script was found for your mint without redeemer!";
            }
            mr = inputBuilder.native_script(
              ns,
              exports.C.NativeScriptWitnessInfo.assume_signature_count()
            );
          }
        }
        that.txBuilder.add_input(mr);
      }
    });
    return this;
  }
  /**
   * All assets should be of the same policy id.
   * You can chain mintAssets functions together if you need to mint assets with different policy ids.
   * If the plutus script doesn't need a redeemer, you still need to specifiy the void redeemer.
   */
  mintAssets(assets, redeemer) {
    this.tasks.push((that) => {
      const units = Object.keys(assets);
      const policyId = units[0].slice(0, 56);
      const mintAssets = exports.C.MintAssets.new();
      units.forEach((unit) => {
        if (unit.slice(0, 56) !== policyId) {
          throw new Error(
            "Only one policy id allowed. You can chain multiple mintAssets functions together if you need to mint assets with different policy ids."
          );
        }
        mintAssets.insert(
          exports.C.AssetName.new(fromHex(unit.slice(56))),
          exports.C.Int.from_str(assets[unit].toString())
        );
      });
      let mintBuilder = exports.C.SingleMintBuilder.new(mintAssets);
      let mr;
      if (redeemer) {
        let script = this.scripts[policyId];
        if (!script) {
          throw "Scripts must be attached BEFORE they are used";
        }
        if ("inlineScript" in script) {
          mr = mintBuilder.plutus_script(
            exports.C.PartialPlutusWitness.new(
              exports.C.PlutusScriptWitness.from_script(script.inlineScript),
              exports.C.PlutusData.from_bytes(fromHex(redeemer))
            ),
            exports.C.Ed25519KeyHashes.new()
          );
        } else {
          mr = mintBuilder.plutus_script(
            exports.C.PartialPlutusWitness.new(
              exports.C.PlutusScriptWitness.from_ref(script.referenceScript.hash()),
              exports.C.PlutusData.from_bytes(fromHex(redeemer))
            ),
            exports.C.Ed25519KeyHashes.new()
          );
        }
      } else {
        let ns = this.native_scripts[policyId];
        if (!ns) {
          throw "No native script was found for your mint without redeemer!";
        }
        mr = mintBuilder.native_script(
          ns,
          exports.C.NativeScriptWitnessInfo.assume_signature_count()
        );
      }
      that.txBuilder.add_mint(mr);
    });
    return this;
  }
  /** Pay to a public key or native script address. */
  payToAddress(address, assets) {
    this.tasks.push(async (that) => {
      exports.C.TransactionOutput.new(
        addressFromWithNetworkCheck(address, that.translucent),
        assetsToValue(assets)
      );
      let outputBuilder = exports.C.TransactionOutputBuilder.new();
      let outputAddress = addressFromWithNetworkCheck(
        address,
        that.translucent
      );
      outputBuilder = outputBuilder.with_address(outputAddress);
      let valueBuilder = outputBuilder.next();
      let assetsC = assetsToValue(assets);
      let params = this.translucent.provider ? await this.translucent.provider.getProtocolParameters() : PROTOCOL_PARAMETERS_DEFAULT;
      {
        let masset = assetsC.multiasset() || exports.C.MultiAsset.new();
        valueBuilder = valueBuilder.with_asset_and_min_required_coin(
          masset,
          exports.C.BigNum.from_str(params.coinsPerUtxoByte.toString())
        );
        let output2 = valueBuilder.build();
        let coin = Math.max(
          parseInt(output2.output().amount().coin().to_str()),
          Number(assets.lovelace || 0)
        );
        valueBuilder = valueBuilder.with_coin_and_asset(
          exports.C.BigNum.from_str(coin.toString()),
          masset
        );
      }
      that.txBuilder.add_output(valueBuilder.build());
    });
    return this;
  }
  /** Pay to a public key or native script address with datum or scriptRef. */
  payToAddressWithData(address, outputData, assets) {
    this.tasks.push(async (that) => {
      if (typeof outputData === "string") {
        outputData = { asHash: outputData };
      }
      if ([outputData.hash, outputData.asHash, outputData.inline].filter((b) => b).length > 1) {
        throw new Error(
          "Not allowed to set hash, asHash and inline at the same time."
        );
      }
      let outputBuilder = exports.C.TransactionOutputBuilder.new();
      let outputAddress = addressFromWithNetworkCheck(
        address,
        that.translucent
      );
      outputBuilder = outputBuilder.with_address(outputAddress);
      if (outputData.hash) ; else if (outputData.asHash) {
        throw "no support for as hash";
      } else if (outputData.inline) {
        const plutusData = exports.C.PlutusData.from_bytes(fromHex(outputData.inline));
        outputBuilder = outputBuilder.with_data(exports.C.Datum.new_data(plutusData));
      }
      const script = outputData.scriptRef;
      if (script) {
        outputBuilder = outputBuilder.with_reference_script(
          toScriptRef(script)
        );
      }
      let valueBuilder = outputBuilder.next();
      let assetsC = assetsToValue(assets);
      let params = this.translucent.provider ? await this.translucent.provider.getProtocolParameters() : PROTOCOL_PARAMETERS_DEFAULT;
      {
        let masset = assetsC.multiasset() || exports.C.MultiAsset.new();
        valueBuilder = valueBuilder.with_asset_and_min_required_coin(
          masset,
          exports.C.BigNum.from_str(params.coinsPerUtxoByte.toString())
        );
        let output2 = valueBuilder.build();
        let coin = Math.max(
          parseInt(output2.output().amount().coin().to_str()),
          Number(assets.lovelace || 0)
        );
        valueBuilder = valueBuilder.with_coin_and_asset(
          exports.C.BigNum.from_str(coin.toString()),
          masset
        );
      }
      let output = valueBuilder.build();
      that.txBuilder.add_output(output);
    });
    return this;
  }
  /** Pay to a plutus script address with datum or scriptRef. */
  payToContract(address, outputData, assets) {
    if (typeof outputData === "string") {
      outputData = { asHash: outputData };
    }
    if (!(outputData.hash || outputData.asHash || outputData.inline)) {
      throw new Error(
        "No datum set. Script output becomes unspendable without datum."
      );
    }
    return this.payToAddressWithData(address, outputData, assets);
  }
  /** Delegate to a stake pool. */
  delegateTo(rewardAddress, poolId, redeemer) {
    this.tasks.push((that) => {
      const addressDetails = that.translucent.utils.getAddressDetails(rewardAddress);
      if (addressDetails.type !== "Reward" || !addressDetails.stakeCredential) {
        throw new Error("Not a reward address provided.");
      }
      const credential = toCore.credential(addressDetails.stakeCredential);
      let certBuilder = exports.C.SingleCertificateBuilder.new(
        exports.C.Certificate.new_stake_delegation(
          exports.C.StakeDelegation.new(
            credential,
            exports.C.Ed25519KeyHash.from_bech32(poolId)
          )
        )
      );
      let cr;
      if (redeemer) {
        let script = this.scripts[credential.to_scripthash()?.to_hex()];
        if (!script) {
          throw "Scripts must be attached BEFORE they are used";
        }
        if ("inlineScript" in script) {
          cr = certBuilder.plutus_script(
            exports.C.PartialPlutusWitness.new(
              exports.C.PlutusScriptWitness.from_script(script.inlineScript),
              exports.C.PlutusData.from_bytes(fromHex(redeemer))
            ),
            exports.C.Ed25519KeyHashes.new()
          );
        } else {
          cr = certBuilder.plutus_script(
            exports.C.PartialPlutusWitness.new(
              exports.C.PlutusScriptWitness.from_ref(script.referenceScript.hash()),
              exports.C.PlutusData.from_bytes(fromHex(redeemer))
            ),
            exports.C.Ed25519KeyHashes.new()
          );
        }
      } else {
        if (credential.kind() == 0) {
          cr = certBuilder.payment_key();
        } else {
          let ns = this.native_scripts[credential.to_scripthash()?.to_hex()];
          if (!ns) {
            throw "Script with no redeemer should be a nativescript, but none provided";
          } else {
            cr = certBuilder.native_script(
              ns,
              exports.C.NativeScriptWitnessInfo.assume_signature_count()
            );
          }
        }
      }
      that.txBuilder.add_cert(cr);
    });
    return this;
  }
  /** Register a reward address in order to delegate to a pool and receive rewards. */
  registerStake(rewardAddress) {
    this.tasks.push((that) => {
      const addressDetails = that.translucent.utils.getAddressDetails(rewardAddress);
      if (addressDetails.type !== "Reward" || !addressDetails.stakeCredential) {
        throw new Error("Not a reward address provided.");
      }
      const credential = toCore.credential(addressDetails.stakeCredential);
      that.txBuilder.add_cert(
        exports.C.SingleCertificateBuilder.new(
          exports.C.Certificate.new_stake_registration(
            exports.C.StakeRegistration.new(credential)
          )
        ).skip_witness()
      );
    });
    return this;
  }
  /** Deregister a reward address. */
  deregisterStake(rewardAddress, redeemer) {
    this.tasks.push((that) => {
      const addressDetails = that.translucent.utils.getAddressDetails(rewardAddress);
      if (addressDetails.type !== "Reward" || !addressDetails.stakeCredential) {
        throw new Error("Not a reward address provided.");
      }
      const credential = addressDetails.stakeCredential.type === "Key" ? exports.C.StakeCredential.from_keyhash(
        exports.C.Ed25519KeyHash.from_bytes(
          fromHex(addressDetails.stakeCredential.hash)
        )
      ) : exports.C.StakeCredential.from_scripthash(
        exports.C.ScriptHash.from_bytes(
          fromHex(addressDetails.stakeCredential.hash)
        )
      );
      let certBuilder = exports.C.SingleCertificateBuilder.new(
        exports.C.Certificate.new_stake_deregistration(
          exports.C.StakeDeregistration.new(credential)
        )
      );
      let cr;
      if (redeemer) {
        let script = this.scripts[credential.to_scripthash()?.to_hex()];
        if (!script) {
          throw "Scripts must be attached BEFORE they are used";
        }
        if ("inlineScript" in script) {
          cr = certBuilder.plutus_script(
            exports.C.PartialPlutusWitness.new(
              exports.C.PlutusScriptWitness.from_script(script.inlineScript),
              exports.C.PlutusData.from_bytes(fromHex(redeemer))
            ),
            exports.C.Ed25519KeyHashes.new()
          );
        } else {
          cr = certBuilder.plutus_script(
            exports.C.PartialPlutusWitness.new(
              exports.C.PlutusScriptWitness.from_ref(script.referenceScript.hash()),
              exports.C.PlutusData.from_bytes(fromHex(redeemer))
            ),
            exports.C.Ed25519KeyHashes.new()
          );
        }
      } else {
        if (credential.kind() == 0) {
          cr = certBuilder.payment_key();
        } else {
          let ns = this.native_scripts[credential.to_scripthash()?.to_hex()];
          if (!ns) {
            throw "Script with no redeemer should be a nativescript, but none provided";
          } else {
            cr = certBuilder.native_script(
              ns,
              exports.C.NativeScriptWitnessInfo.assume_signature_count()
            );
          }
        }
      }
      that.txBuilder.add_cert(cr);
    });
    return this;
  }
  /** Register a stake pool. A pool deposit is required. The metadataUrl needs to be hosted already before making the registration. */
  // registerPool(poolParams: PoolParams): Tx {
  //   this.tasks.push(async (that) => {
  //     const poolRegistration = await createPoolRegistration(
  //       poolParams,
  //       that.translucent,
  //     )
  //     const certificate = C.Certificate.new_pool_registration(poolRegistration)
  //     that.txBuilder.add_cert(certificate)
  //   })
  //   return this
  // }
  // /** Update a stake pool. No pool deposit is required. The metadataUrl needs to be hosted already before making the update. */
  // updatePool(poolParams: PoolParams): Tx {
  //   this.tasks.push(async (that) => {
  //     const poolRegistration = await createPoolRegistration(
  //       poolParams,
  //       that.translucent,
  //     )
  //     // This flag makes sure a pool deposit is not required
  //     //poolRegistration.set_is_update(true)
  //     const certificate = C.Certificate.new_pool_registration(poolRegistration)
  //     that.txBuilder.add_cert(certificate)
  //   })
  //   return this
  // }
  /**
   * Retire a stake pool. The epoch needs to be the greater than the current epoch + 1 and less than current epoch + eMax.
   * The pool deposit will be sent to reward address as reward after full retirement of the pool.
   */
  retirePool(poolId, epoch) {
    this.tasks.push((that) => {
      const certificate = exports.C.Certificate.new_pool_retirement(
        exports.C.PoolRetirement.new(exports.C.Ed25519KeyHash.from_bech32(poolId), epoch)
      );
      that.txBuilder.add_cert(certificate);
    });
    return this;
  }
  withdraw(rewardAddress, amount, redeemer) {
    this.tasks.push((that) => {
      let rewAdd = exports.C.RewardAddress.from_address(
        addressFromWithNetworkCheck(rewardAddress, that.translucent)
      );
      let certBuilder = exports.C.SingleWithdrawalBuilder.new(
        rewAdd,
        exports.C.BigNum.from_str(amount.toString())
      );
      let wr;
      if (redeemer) {
        let script = this.scripts[rewAdd.payment_cred()?.to_scripthash()?.to_hex()];
        if (!script) {
          throw "Scripts must be attached BEFORE they are used";
        }
        if ("inlineScript" in script) {
          wr = certBuilder.plutus_script(
            exports.C.PartialPlutusWitness.new(
              exports.C.PlutusScriptWitness.from_script(script.inlineScript),
              exports.C.PlutusData.from_bytes(fromHex(redeemer))
            ),
            exports.C.Ed25519KeyHashes.new()
          );
        } else {
          wr = certBuilder.plutus_script(
            exports.C.PartialPlutusWitness.new(
              exports.C.PlutusScriptWitness.from_ref(script.referenceScript.hash()),
              exports.C.PlutusData.from_bytes(fromHex(redeemer))
            ),
            exports.C.Ed25519KeyHashes.new()
          );
        }
      } else {
        if (rewAdd.payment_cred().kind() == 0) {
          wr = certBuilder.payment_key();
        } else {
          let ns = this.native_scripts[rewAdd.payment_cred()?.to_scripthash()?.to_hex()];
          if (!ns) {
            throw "Script with no redeemer should be a nativescript, but none provided";
          } else {
            wr = certBuilder.native_script(
              ns,
              exports.C.NativeScriptWitnessInfo.assume_signature_count()
            );
          }
        }
      }
      that.txBuilder.add_withdrawal(wr);
    });
    return this;
  }
  /**
   * Needs to be a public key address.
   * The PaymentKeyHash is taken when providing a Base, Enterprise or Pointer address.
   * The StakeKeyHash is taken when providing a Reward address.
   */
  addSigner(address) {
    const addressDetails = this.translucent.utils.getAddressDetails(address);
    if (!addressDetails.paymentCredential && !addressDetails.stakeCredential) {
      throw new Error("Not a valid address.");
    }
    const credential = addressDetails.type === "Reward" ? addressDetails.stakeCredential : addressDetails.paymentCredential;
    if (credential.type === "Script") {
      throw new Error("Only key hashes are allowed as signers.");
    }
    return this.addSignerKey(credential.hash);
  }
  /** Add a payment or stake key hash as a required signer of the transaction. */
  addSignerKey(keyHash) {
    this.tasks.push((that) => {
      that.txBuilder.add_required_signer(
        exports.C.Ed25519KeyHash.from_bytes(fromHex(keyHash))
      );
    });
    return this;
  }
  validFrom(unixTime) {
    this.tasks.push((that) => {
      const slot = that.translucent.utils.unixTimeToSlot(unixTime);
      that.txBuilder.set_validity_start_interval(
        exports.C.BigNum.from_str(slot.toString())
      );
    });
    return this;
  }
  validTo(unixTime) {
    this.tasks.push((that) => {
      const slot = that.translucent.utils.unixTimeToSlot(unixTime);
      that.txBuilder.set_ttl(exports.C.BigNum.from_str(slot.toString()));
    });
    return this;
  }
  attachMetadata(label, metadata) {
    this.tasks.push((that) => {
      let aux = exports.C.AuxiliaryData.new();
      aux.add_metadatum(
        exports.C.BigNum.from_str(label.toString()),
        exports.C.TransactionMetadatum.new_text(JSON.stringify(metadata))
      );
      that.txBuilder.add_auxiliary_data(aux);
    });
    return this;
  }
  /** Converts strings to bytes if prefixed with **'0x'**. */
  attachMetadataWithConversion(label, metadata) {
    this.tasks.push((that) => {
      let aux = exports.C.AuxiliaryData.new();
      aux.add_json_metadatum_with_schema(
        exports.C.BigNum.from_str(label.toString()),
        JSON.stringify(metadata),
        exports.C.MetadataJsonSchema.BasicConversions
      );
      that.txBuilder.add_auxiliary_data(aux);
    });
    return this;
  }
  /* Same as above but MORE detailed! */
  attachMetadataWithDetailedConversion(label, metadata) {
    this.tasks.push((that) => {
      let aux = exports.C.AuxiliaryData.new();
      aux.add_json_metadatum_with_schema(
        exports.C.BigNum.from_str(label.toString()),
        JSON.stringify(metadata),
        exports.C.MetadataJsonSchema.DetailedSchema
      );
      that.txBuilder.add_auxiliary_data(aux);
    });
    return this;
  }
  /** Explicitely set the network id in the transaction body. */
  addNetworkId(id) {
    this.tasks.push((that) => {
      that.txBuilder.set_network_id(
        exports.C.NetworkId.from_bytes(fromHex(id.toString(16).padStart(2, "0")))
      );
    });
    return this;
  }
  attachSpendingValidator(spendingValidator) {
    this.earlyTasks.push((that) => {
      that.attachScript(spendingValidator);
    });
    return this;
  }
  attachMintingPolicy(mintingPolicy) {
    this.earlyTasks.push((that) => {
      that.attachScript(mintingPolicy);
    });
    return this;
  }
  attachCertificateValidator(certValidator) {
    this.earlyTasks.push((that) => {
      that.attachScript(certValidator);
    });
    return this;
  }
  attachWithdrawalValidator(withdrawalValidator) {
    this.earlyTasks.push((that) => {
      that.attachScript(withdrawalValidator);
    });
    return this;
  }
  attachScript({
    type,
    script
  }) {
    if (type === "Native") {
      let ns = exports.C.NativeScript.from_bytes(fromHex(script));
      this.native_scripts[ns.hash().to_hex()] = ns;
    } else if (type === "PlutusV1" || type === "PlutusV2") {
      let ps;
      if (type === "PlutusV1") {
        ps = exports.C.PlutusScript.from_v1(
          exports.C.PlutusV1Script.from_bytes(fromHex(applyDoubleCborEncoding(script)))
        );
      } else {
        ps = exports.C.PlutusScript.from_v2(
          exports.C.PlutusV2Script.from_bytes(fromHex(applyDoubleCborEncoding(script)))
        );
      }
      this.scripts[ps.hash().to_hex().toString()] = { inlineScript: ps };
    } else {
      throw new Error("No variant matched.");
    }
  }
  /** Compose transactions. */
  compose(tx) {
    if (tx)
      this.tasks = this.tasks.concat(tx.tasks);
    return this;
  }
  async complete(options) {
    if ([
      options?.change?.outputData?.hash,
      options?.change?.outputData?.asHash,
      options?.change?.outputData?.inline
    ].filter((b) => b).length > 1) {
      throw new Error(
        "Not allowed to set hash, asHash and inline at the same time."
      );
    }
    let task = this.earlyTasks.shift();
    while (task) {
      await task(this);
      task = this.earlyTasks.shift();
    }
    task = this.tasks.shift();
    while (task) {
      await task(this);
      task = this.tasks.shift();
    }
    const rawWalletUTxOs = await this.translucent.wallet.getUtxosCore();
    let walletUTxOs = [];
    for (let i = 0; i < rawWalletUTxOs.len(); i++) {
      walletUTxOs.push(rawWalletUTxOs.get(i));
    }
    let allUtxos = [...this.UTxOs, ...walletUTxOs, ...this.referencedUTxOs];
    const changeAddress = addressFromWithNetworkCheck(
      options?.change?.address || await this.translucent.wallet.address(),
      this.translucent
    );
    for (const utxo of walletUTxOs) {
      this.txBuilder.add_utxo(
        exports.C.SingleInputBuilder.new(utxo.input(), utxo.output()).payment_key()
      );
    }
    this.txBuilder.select_utxos(2);
    {
      let foundUtxo = walletUTxOs.find(
        (x) => BigInt(x.output().amount().coin().to_str()) >= BigInt(Math.pow(10, 7))
      );
      if (foundUtxo == void 0) {
        throw "Could not find a suitable collateral UTxO.";
      } else {
        let collateralUTxO = exports.C.SingleInputBuilder.new(
          foundUtxo.input(),
          foundUtxo.output()
        ).payment_key();
        let minCollateralOutput = exports.C.TransactionOutputBuilder.new();
        minCollateralOutput = minCollateralOutput.with_address(
          foundUtxo.output().address()
        );
        let amtBuilder = minCollateralOutput.next();
        let params = this.translucent.provider ? await this.translucent.provider.getProtocolParameters() : PROTOCOL_PARAMETERS_DEFAULT;
        let multiAsset = foundUtxo.output().amount().multiasset();
        amtBuilder = amtBuilder.with_asset_and_min_required_coin(
          multiAsset || exports.C.MultiAsset.new(),
          exports.C.BigNum.from_str(params.coinsPerUtxoByte.toString())
        );
        const collateralReturn = amtBuilder.build().output();
        this.txBuilder.add_collateral(collateralUTxO);
        this.txBuilder.set_collateral_return(collateralReturn);
      }
    }
    let txRedeemerBuilder = this.txBuilder.build_for_evaluation(
      0,
      changeAddress
    );
    let protocolParameters;
    try {
      protocolParameters = await this.translucent.provider.getProtocolParameters();
    } catch {
      protocolParameters = PROTOCOL_PARAMETERS_DEFAULT;
    }
    const costMdls = createCostModels(protocolParameters.costModels);
    const slotConfig = SLOT_CONFIG_NETWORK[this.translucent.network];
    let draftTx = txRedeemerBuilder.draft_tx();
    {
      let redeemers2 = draftTx.witness_set().redeemers();
      if (redeemers2) {
        let newRedeemers = exports.C.Redeemers.new();
        for (let i = 0; i < redeemers2.len(); i++) {
          let redeemer = redeemers2.get(i);
          let new_redeemer = exports.C.Redeemer.new(
            redeemer.tag(),
            redeemer.index(),
            redeemer.data(),
            exports.C.ExUnits.new(exports.C.BigNum.zero(), exports.C.BigNum.zero())
          );
          newRedeemers.add(new_redeemer);
        }
        let new_witnesses = draftTx.witness_set();
        new_witnesses.set_redeemers(newRedeemers);
        draftTx = exports.C.Transaction.new(
          draftTx.body(),
          new_witnesses,
          draftTx.auxiliary_data()
        );
      }
    }
    let draftTxBytes = draftTx.to_bytes();
    const uplcResults = exports.U.eval_phase_two_raw(
      draftTxBytes,
      allUtxos.map((x) => x.input().to_bytes()),
      allUtxos.map((x) => x.output().to_bytes()),
      costMdls.to_bytes(),
      BigInt(Math.floor(Number(protocolParameters.maxTxExSteps) / (options?.overEstimateSteps ?? 1))),
      BigInt(Math.floor(Number(protocolParameters.maxTxExMem) / (options?.overEstimateMem ?? 1))),
      BigInt(slotConfig.zeroTime),
      BigInt(slotConfig.zeroSlot),
      slotConfig.slotLength
    );
    const redeemers = exports.C.Redeemers.new();
    for (const redeemerBytes of uplcResults) {
      let redeemer = exports.C.Redeemer.from_bytes(redeemerBytes);
      const exUnits = exports.C.ExUnits.new(
        exports.C.BigNum.from_str(
          Math.floor(
            parseInt(redeemer.ex_units().mem().to_str()) * (options?.overEstimateMem ?? 1)
          ).toString()
        ),
        exports.C.BigNum.from_str(
          Math.floor(
            parseInt(redeemer.ex_units().steps().to_str()) * (options?.overEstimateSteps ?? 1)
          ).toString()
        )
      );
      this.txBuilder.set_exunits(
        exports.C.RedeemerWitnessKey.new(redeemer.tag(), redeemer.index()),
        exUnits
      );
      redeemers.add(redeemer);
    }
    let builtTx = this.txBuilder.build(0, changeAddress).build_unchecked();
    {
      const datums = exports.C.PlutusList.new();
      const unhashedData = builtTx.witness_set().plutus_data();
      let hashes = [];
      if (unhashedData) {
        for (let i = 0; i < unhashedData.len(), i++; ) {
          hashes.push(exports.C.hash_plutus_data(unhashedData.get(i)).to_hex());
        }
      }
      for (let i = 0; i < builtTx.body().inputs().len(), i++; ) {
        const input = builtTx.body().inputs().get(i);
        const utxo = allUtxos.find(
          (utxo2) => utxo2.input().to_bytes() == input.to_bytes()
        );
        const datum = utxo?.output().datum();
        if (datum) {
          const inline = datum.as_inline_data();
          if (inline) {
            datums.add(inline);
          } else {
            const hash = datum.as_data_hash();
            if (hash) {
              const idx = hashes.indexOf(hash.to_hex());
              const data = unhashedData?.get(idx);
              datums.add(data);
            }
          }
        }
      }
      const languages = exports.C.Languages.new();
      languages.add(exports.C.Language.new_plutus_v2());
      const sdh = exports.C.calc_script_data_hash(
        redeemers,
        datums,
        costMdls,
        languages
      );
      if (sdh) {
        const bodyWithDataHash = builtTx.body();
        bodyWithDataHash.set_script_data_hash(sdh);
        builtTx = exports.C.Transaction.new(
          bodyWithDataHash,
          builtTx.witness_set(),
          builtTx.auxiliary_data()
        );
      }
    }
    return new TxComplete(this.translucent, builtTx);
  }
  /** Return the current transaction body in Hex encoded Cbor. */
  async toString() {
    let complete = await this.complete();
    return complete.toString();
  }
}
function addressFromWithNetworkCheck(address, translucent) {
  const { type, networkId } = translucent.utils.getAddressDetails(address);
  const actualNetworkId = networkToId(translucent.network);
  if (networkId !== actualNetworkId) {
    throw new Error(
      `Invalid address: Expected address with network id ${actualNetworkId}, but got ${networkId}`
    );
  }
  return type === "Byron" ? exports.C.ByronAddress.from_base58(address).to_address() : exports.C.Address.from_bech32(address);
}

function signData(addressHex, payload, privateKey) {
  const protectedHeaders = exports.M.HeaderMap.new();
  protectedHeaders.set_algorithm_id(
    exports.M.Label.from_algorithm_id(exports.M.AlgorithmId.EdDSA)
  );
  protectedHeaders.set_header(
    exports.M.Label.new_text("address"),
    exports.M.CBORValue.new_bytes(fromHex(addressHex))
  );
  const protectedSerialized = exports.M.ProtectedHeaderMap.new(protectedHeaders);
  const unprotectedHeaders = exports.M.HeaderMap.new();
  const headers = exports.M.Headers.new(protectedSerialized, unprotectedHeaders);
  const builder = exports.M.COSESign1Builder.new(headers, fromHex(payload), false);
  const toSign = builder.make_data_to_sign().to_bytes();
  const priv = exports.C.PrivateKey.from_bech32(privateKey);
  const signedSigStruc = priv.sign(toSign).to_bytes();
  const coseSign1 = builder.build(signedSigStruc);
  const key = exports.M.COSEKey.new(
    exports.M.Label.from_key_type(exports.M.KeyType.OKP)
    //OKP
  );
  key.set_algorithm_id(exports.M.Label.from_algorithm_id(exports.M.AlgorithmId.EdDSA));
  key.set_header(
    exports.M.Label.new_int(exports.M.Int.new_negative(exports.M.BigNum.from_str("1"))),
    exports.M.CBORValue.new_int(
      exports.M.Int.new_i32(6)
      //M.CurveType.Ed25519
    )
  );
  key.set_header(
    exports.M.Label.new_int(exports.M.Int.new_negative(exports.M.BigNum.from_str("2"))),
    exports.M.CBORValue.new_bytes(priv.to_public().as_bytes())
  );
  return {
    signature: toHex(coseSign1.to_bytes()),
    key: toHex(key.to_bytes())
  };
}
function verifyData(addressHex, keyHash, payload, signedMessage) {
  const cose1 = exports.M.COSESign1.from_bytes(fromHex(signedMessage.signature));
  const key = exports.M.COSEKey.from_bytes(fromHex(signedMessage.key));
  const protectedHeaders = cose1.headers().protected().deserialized_headers();
  const cose1Address = (() => {
    try {
      return toHex(
        protectedHeaders.header(exports.M.Label.new_text("address"))?.as_bytes()
      );
    } catch (_e) {
      throw new Error("No address found in signature.");
    }
  })();
  const cose1AlgorithmId = (() => {
    try {
      const int = protectedHeaders.algorithm_id()?.as_int();
      if (int?.is_positive())
        return parseInt(int.as_positive()?.to_str());
      return parseInt(int?.as_negative()?.to_str());
    } catch (_e) {
      throw new Error("Failed to retrieve Algorithm Id.");
    }
  })();
  const keyAlgorithmId = (() => {
    try {
      const int = key.algorithm_id()?.as_int();
      if (int?.is_positive())
        return parseInt(int.as_positive()?.to_str());
      return parseInt(int?.as_negative()?.to_str());
    } catch (_e) {
      throw new Error("Failed to retrieve Algorithm Id.");
    }
  })();
  const keyCurve = (() => {
    try {
      const int = key.header(exports.M.Label.new_int(exports.M.Int.new_negative(exports.M.BigNum.from_str("1"))))?.as_int();
      if (int?.is_positive())
        return parseInt(int.as_positive()?.to_str());
      return parseInt(int?.as_negative()?.to_str());
    } catch (_e) {
      throw new Error("Failed to retrieve Curve.");
    }
  })();
  const keyType = (() => {
    try {
      const int = key.key_type().as_int();
      if (int?.is_positive())
        return parseInt(int.as_positive()?.to_str());
      return parseInt(int?.as_negative()?.to_str());
    } catch (_e) {
      throw new Error("Failed to retrieve Key Type.");
    }
  })();
  const publicKey = (() => {
    try {
      return exports.C.PublicKey.from_bytes(
        key.header(exports.M.Label.new_int(exports.M.Int.new_negative(exports.M.BigNum.from_str("2"))))?.as_bytes()
      );
    } catch (_e) {
      throw new Error("No public key found.");
    }
  })();
  const cose1Payload = (() => {
    try {
      return toHex(cose1.payload());
    } catch (_e) {
      throw new Error("No payload found.");
    }
  })();
  const signature = exports.C.Ed25519Signature.from_bytes(cose1.signature());
  const data = cose1.signed_data(void 0, void 0).to_bytes();
  if (cose1Address !== addressHex)
    return false;
  if (keyHash !== publicKey.hash().to_hex())
    return false;
  if (cose1AlgorithmId !== keyAlgorithmId && cose1AlgorithmId !== exports.M.AlgorithmId.EdDSA) {
    return false;
  }
  if (keyCurve !== 6)
    return false;
  if (keyType !== 1)
    return false;
  if (cose1Payload !== payload)
    return false;
  return publicKey.verify(data, signature);
}

var __defProp$a = Object.defineProperty;
var __defNormalProp$a = (obj, key, value) => key in obj ? __defProp$a(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$a = (obj, key, value) => {
  __defNormalProp$a(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Message {
  constructor(translucent, address, payload) {
    __publicField$a(this, "translucent");
    __publicField$a(this, "address");
    __publicField$a(this, "payload");
    this.translucent = translucent;
    this.address = address;
    this.payload = payload;
  }
  /** Sign message with selected wallet. */
  sign() {
    return this.translucent.wallet.signMessage(this.address, this.payload);
  }
  /** Sign message with a separate private key. */
  signWithPrivateKey(privateKey) {
    const {
      paymentCredential,
      stakeCredential,
      address: { hex: hexAddress }
    } = this.translucent.utils.getAddressDetails(this.address);
    const keyHash = paymentCredential?.hash || stakeCredential?.hash;
    const keyHashOriginal = exports.C.PrivateKey.from_bech32(privateKey).to_public().hash().to_hex();
    if (!keyHash || keyHash !== keyHashOriginal) {
      throw new Error(`Cannot sign message for address: ${this.address}.`);
    }
    return signData(hexAddress, this.payload, privateKey);
  }
}

var __defProp$9 = Object.defineProperty;
var __defNormalProp$9 = (obj, key, value) => key in obj ? __defProp$9(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$9 = (obj, key, value) => {
  __defNormalProp$9(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function verifyNativeScript(ns, start, end, edKeyHashes) {
  return true;
}
class Emulator {
  constructor(accounts, protocolParameters = PROTOCOL_PARAMETERS_DEFAULT) {
    __publicField$9(this, "ledger");
    __publicField$9(this, "mempool", {});
    /**
     * Only stake key registrations/delegations and rewards are tracked.
     * Other certificates are not tracked.
     */
    __publicField$9(this, "chain", {});
    __publicField$9(this, "blockHeight");
    __publicField$9(this, "slot");
    __publicField$9(this, "time");
    __publicField$9(this, "protocolParameters");
    __publicField$9(this, "datumTable", {});
    const GENESIS_HASH = "00".repeat(32);
    this.blockHeight = 0;
    this.slot = 0;
    this.time = Date.now();
    this.ledger = {};
    accounts.forEach(({ address, assets, outputData }, index) => {
      if ([outputData?.hash, outputData?.asHash, outputData?.inline].filter(
        (b) => b
      ).length > 1) {
        throw new Error(
          "Not allowed to set hash, asHash and inline at the same time."
        );
      }
      this.ledger[GENESIS_HASH + index] = {
        utxo: {
          txHash: GENESIS_HASH,
          outputIndex: index,
          address,
          assets,
          datumHash: outputData?.asHash ? exports.C.hash_plutus_data(
            exports.C.PlutusData.from_bytes(fromHex(outputData.asHash))
          ).to_hex() : outputData?.hash,
          datum: outputData?.inline,
          scriptRef: outputData?.scriptRef
        },
        spent: false
      };
    });
    this.protocolParameters = protocolParameters;
  }
  now() {
    return this.time;
  }
  awaitSlot(length = 1) {
    this.slot += length;
    this.time += length * 1e3;
    const currentHeight = this.blockHeight;
    this.blockHeight = Math.floor(this.slot / 20);
    if (this.blockHeight > currentHeight) {
      for (const [outRef, { utxo, spent }] of Object.entries(this.mempool)) {
        this.ledger[outRef] = { utxo, spent };
      }
      for (const [outRef, { spent }] of Object.entries(this.ledger)) {
        if (spent)
          delete this.ledger[outRef];
      }
      this.mempool = {};
    }
  }
  awaitBlock(height = 1) {
    this.blockHeight += height;
    this.slot += height * 20;
    this.time += height * 20 * 1e3;
    for (const [outRef, { utxo, spent }] of Object.entries(this.mempool)) {
      this.ledger[outRef] = { utxo, spent };
    }
    for (const [outRef, { spent }] of Object.entries(this.ledger)) {
      if (spent)
        delete this.ledger[outRef];
    }
    this.mempool = {};
  }
  getUtxos(addressOrCredential) {
    const utxos = Object.values(this.ledger).flatMap(({ utxo }) => {
      if (typeof addressOrCredential === "string") {
        return addressOrCredential === utxo.address ? utxo : [];
      } else {
        const { paymentCredential } = getAddressDetails(utxo.address);
        return paymentCredential?.hash === addressOrCredential.hash ? utxo : [];
      }
    });
    return Promise.resolve(utxos);
  }
  getProtocolParameters() {
    return Promise.resolve(this.protocolParameters);
  }
  getDatum(datumHash) {
    return Promise.resolve(this.datumTable[datumHash]);
  }
  getUtxosWithUnit(addressOrCredential, unit) {
    const utxos = Object.values(this.ledger).flatMap(({ utxo }) => {
      if (typeof addressOrCredential === "string") {
        return addressOrCredential === utxo.address && utxo.assets[unit] > 0n ? utxo : [];
      } else {
        const { paymentCredential } = getAddressDetails(utxo.address);
        return paymentCredential?.hash === addressOrCredential.hash && utxo.assets[unit] > 0n ? utxo : [];
      }
    });
    return Promise.resolve(utxos);
  }
  getUtxosByOutRef(outRefs) {
    return Promise.resolve(
      outRefs.flatMap(
        (outRef) => this.ledger[outRef.txHash + outRef.outputIndex]?.utxo || []
      )
    );
  }
  getUtxoByUnit(unit) {
    const utxos = Object.values(this.ledger).flatMap(
      ({ utxo }) => utxo.assets[unit] > 0n ? utxo : []
    );
    if (utxos.length > 1) {
      throw new Error("Unit needs to be an NFT or only held by one address.");
    }
    return Promise.resolve(utxos[0]);
  }
  getDelegation(rewardAddress) {
    return Promise.resolve({
      poolId: this.chain[rewardAddress]?.delegation?.poolId || null,
      rewards: this.chain[rewardAddress]?.delegation?.rewards || 0n
    });
  }
  awaitTx(txHash) {
    if (this.mempool[txHash + 0]) {
      this.awaitBlock();
      return Promise.resolve(true);
    }
    return Promise.resolve(true);
  }
  /**
   * Emulates the behaviour of the reward distribution at epoch boundaries.
   * Stake keys need to be registered and delegated like on a real chain in order to receive rewards.
   */
  distributeRewards(rewards) {
    for (const [
      rewardAddress,
      { registeredStake, delegation }
    ] of Object.entries(this.chain)) {
      if (registeredStake && delegation.poolId) {
        this.chain[rewardAddress] = {
          registeredStake,
          delegation: {
            poolId: delegation.poolId,
            rewards: delegation.rewards += rewards
          }
        };
      }
    }
    this.awaitBlock();
  }
  submitTx(tx) {
    const desTx = exports.C.Transaction.from_bytes(fromHex(tx));
    const body = desTx.body();
    const witnesses = desTx.witness_set();
    const datums = witnesses.plutus_data();
    const txHash = exports.C.hash_transaction(body).to_hex();
    const lowerBound = body.validity_start_interval() ? parseInt(body.validity_start_interval().to_str()) : null;
    const upperBound = body.ttl() ? parseInt(body.ttl().to_str()) : null;
    if (Number.isInteger(lowerBound) && this.slot < lowerBound) {
      throw new Error(
        `Lower bound (${lowerBound}) not in slot range (${this.slot}).`
      );
    }
    if (Number.isInteger(upperBound) && this.slot > upperBound) {
      throw new Error(
        `Upper bound (${upperBound}) not in slot range (${this.slot}).`
      );
    }
    const datumTable = (() => {
      const table = {};
      for (let i = 0; i < (datums?.len() || 0); i++) {
        const datum = datums.get(i);
        const datumHash = exports.C.hash_plutus_data(datum).to_hex();
        table[datumHash] = toHex(datum.to_bytes());
      }
      return table;
    })();
    const consumedHashes = /* @__PURE__ */ new Set();
    const keyHashes = (() => {
      const keyHashes2 = [];
      for (let i = 0; i < (witnesses.vkeys()?.len() || 0); i++) {
        const witness = witnesses.vkeys().get(i);
        const publicKey = witness.vkey().public_key();
        const keyHash = publicKey.hash().to_hex();
        if (!publicKey.verify(fromHex(txHash), witness.signature())) {
          throw new Error(`Invalid vkey witness. Key hash: ${keyHash}`);
        }
        keyHashes2.push(keyHash);
      }
      return keyHashes2;
    })();
    const edKeyHashes = exports.C.Ed25519KeyHashes.new();
    keyHashes.forEach(
      (keyHash) => edKeyHashes.add(exports.C.Ed25519KeyHash.from_hex(keyHash))
    );
    const nativeHashes = (() => {
      const scriptHashes = [];
      for (let i = 0; i < (witnesses.native_scripts()?.len() || 0); i++) {
        const witness = witnesses.native_scripts().get(i);
        const scriptHash = witness.hash().to_hex();
        if (!verifyNativeScript(
          witness,
          Number.isInteger(lowerBound) ? exports.C.BigNum.from_str(lowerBound.toString()) : void 0,
          Number.isInteger(upperBound) ? exports.C.BigNum.from_str(upperBound.toString()) : void 0)) ;
        for (let i2 = 0; i2 < witness.get_required_signers().len(); i2++) {
          const keyHash = witness.get_required_signers().get(i2).to_hex();
          consumedHashes.add(keyHash);
        }
        scriptHashes.push(scriptHash);
      }
      return scriptHashes;
    })();
    const nativeHashesOptional = {};
    const plutusHashesOptional = [];
    const plutusHashes = (() => {
      const scriptHashes = [];
      for (let i = 0; i < (witnesses.plutus_v1_scripts()?.len() || 0); i++) {
        const script = witnesses.plutus_v1_scripts().get(i);
        const scriptHash = script.hash().to_hex();
        scriptHashes.push(scriptHash);
      }
      for (let i = 0; i < (witnesses.plutus_v2_scripts()?.len() || 0); i++) {
        const script = witnesses.plutus_v2_scripts().get(i);
        const scriptHash = script.hash().to_hex();
        scriptHashes.push(scriptHash);
      }
      return scriptHashes;
    })();
    const inputs = body.inputs();
    const resolvedInputs = [];
    for (let i = 0; i < inputs.len(); i++) {
      const input = inputs.get(i);
      const outRef = input.transaction_id().to_hex() + input.index().to_str();
      const entryLedger = this.ledger[outRef];
      const { entry, type } = !entryLedger ? { entry: this.mempool[outRef], type: "Mempool" } : { entry: entryLedger, type: "Ledger" };
      if (!entry || entry.spent) {
        throw new Error(
          `Could not spend UTxO: ${JSON.stringify({
            txHash: entry?.utxo.txHash,
            outputIndex: entry?.utxo.outputIndex
          })}
It does not exist or was already spent.`
        );
      }
      const scriptRef = entry.utxo.scriptRef;
      if (scriptRef) {
        switch (scriptRef.type) {
          case "Native": {
            const script = exports.C.NativeScript.from_bytes(fromHex(scriptRef.script));
            nativeHashesOptional[script.hash().to_hex()] = script;
            break;
          }
          case "PlutusV1": {
            const script = exports.C.PlutusV1Script.from_bytes(
              fromHex(scriptRef.script)
            );
            plutusHashesOptional.push(script.hash().to_hex());
            break;
          }
          case "PlutusV2": {
            const script = exports.C.PlutusV2Script.from_bytes(
              fromHex(scriptRef.script)
            );
            plutusHashesOptional.push(script.hash().to_hex());
            break;
          }
        }
      }
      if (entry.utxo.datumHash)
        consumedHashes.add(entry.utxo.datumHash);
      resolvedInputs.push({ entry, type });
    }
    for (let i = 0; i < (body.reference_inputs()?.len() || 0); i++) {
      const input = body.reference_inputs().get(i);
      const outRef = input.transaction_id().to_hex() + input.index().to_str();
      const entry = this.ledger[outRef] || this.mempool[outRef];
      if (!entry || entry.spent) {
        throw new Error(
          `Could not read UTxO: ${JSON.stringify({
            txHash: entry?.utxo.txHash,
            outputIndex: entry?.utxo.outputIndex
          })}
It does not exist or was already spent.`
        );
      }
      const scriptRef = entry.utxo.scriptRef;
      if (scriptRef) {
        switch (scriptRef.type) {
          case "Native": {
            const script = exports.C.NativeScript.from_bytes(fromHex(scriptRef.script));
            nativeHashesOptional[script.hash().to_hex()] = script;
            break;
          }
          case "PlutusV1": {
            const script = exports.C.PlutusV1Script.from_bytes(
              fromHex(scriptRef.script)
            );
            plutusHashesOptional.push(script.hash().to_hex());
            break;
          }
          case "PlutusV2": {
            const script = exports.C.PlutusV2Script.from_bytes(
              fromHex(scriptRef.script)
            );
            plutusHashesOptional.push(script.hash().to_hex());
            break;
          }
        }
      }
      if (entry.utxo.datumHash)
        consumedHashes.add(entry.utxo.datumHash);
    }
    const redeemers = (() => {
      const tagMap = {
        0: "Spend",
        1: "Mint",
        2: "Cert",
        3: "Reward"
      };
      const collected = [];
      for (let i = 0; i < (witnesses.redeemers()?.len() || 0); i++) {
        const redeemer = witnesses.redeemers().get(i);
        collected.push({
          tag: tagMap[redeemer.tag().kind()],
          index: parseInt(redeemer.index().to_str())
        });
      }
      return collected;
    })();
    function checkAndConsumeHash(credential, tag, index) {
      switch (credential.type) {
        case "Key": {
          if (!keyHashes.includes(credential.hash)) {
            throw new Error(
              `Missing vkey witness. Key hash: ${credential.hash}`
            );
          }
          consumedHashes.add(credential.hash);
          break;
        }
        case "Script": {
          if (nativeHashes.includes(credential.hash)) {
            consumedHashes.add(credential.hash);
            break;
          } else if (nativeHashesOptional[credential.hash]) {
            if (!verifyNativeScript(
              nativeHashesOptional[credential.hash],
              Number.isInteger(lowerBound) ? exports.C.BigNum.from_str(lowerBound.toString()) : void 0,
              Number.isInteger(upperBound) ? exports.C.BigNum.from_str(upperBound.toString()) : void 0)) ;
            break;
          } else if (plutusHashes.includes(credential.hash) || plutusHashesOptional.includes(credential.hash)) {
            if (redeemers.find(
              (redeemer) => redeemer.tag === tag && redeemer.index === index
            )) {
              consumedHashes.add(credential.hash);
              break;
            }
          }
          throw new Error(
            `Missing script witness. Script hash: ${credential.hash}`
          );
        }
      }
    }
    for (let i = 0; i < (body.collateral()?.len() || 0); i++) {
      const input = body.collateral().get(i);
      const outRef = input.transaction_id().to_hex() + input.index().to_str();
      const entry = this.ledger[outRef] || this.mempool[outRef];
      if (!entry || entry.spent) {
        throw new Error(
          `Could not read UTxO: ${JSON.stringify({
            txHash: entry?.utxo.txHash,
            outputIndex: entry?.utxo.outputIndex
          })}
It does not exist or was already spent.`
        );
      }
      const { paymentCredential } = getAddressDetails(entry.utxo.address);
      if (paymentCredential?.type === "Script") {
        throw new Error("Collateral inputs can only contain vkeys.");
      }
      checkAndConsumeHash(paymentCredential, null, null);
    }
    for (let i = 0; i < (body.required_signers()?.len() || 0); i++) {
      const signer = body.required_signers().get(i);
      checkAndConsumeHash({ type: "Key", hash: signer.to_hex() }, null, null);
    }
    for (let index = 0; index < (body.mint()?.keys().len() || 0); index++) {
      const policyId = body.mint().keys().get(index).to_hex();
      checkAndConsumeHash({ type: "Script", hash: policyId }, "Mint", index);
    }
    const withdrawalRequests = [];
    for (let index = 0; index < (body.withdrawals()?.keys().len() || 0); index++) {
      const rawAddress = body.withdrawals().keys().get(index);
      const withdrawal = BigInt(
        body.withdrawals().get(rawAddress).to_str()
      );
      const rewardAddress = rawAddress.to_address().to_bech32(void 0);
      const { stakeCredential } = getAddressDetails(rewardAddress);
      checkAndConsumeHash(stakeCredential, "Reward", index);
      if (this.chain[rewardAddress]?.delegation.rewards !== withdrawal) {
        throw new Error(
          "Withdrawal amount doesn't match actual reward balance."
        );
      }
      withdrawalRequests.push({ rewardAddress, withdrawal });
    }
    const certRequests = [];
    for (let index = 0; index < (body.certs()?.len() || 0); index++) {
      const cert = body.certs().get(index);
      switch (cert.kind()) {
        case 0: {
          const registration = cert.as_stake_registration();
          const rewardAddress = exports.C.RewardAddress.new(
            exports.C.NetworkInfo.testnet().network_id(),
            registration.stake_credential()
          ).to_address().to_bech32(void 0);
          if (this.chain[rewardAddress]?.registeredStake) {
            throw new Error(
              `Stake key is already registered. Reward address: ${rewardAddress}`
            );
          }
          certRequests.push({ type: "Registration", rewardAddress });
          break;
        }
        case 1: {
          const deregistration = cert.as_stake_deregistration();
          const rewardAddress = exports.C.RewardAddress.new(
            exports.C.NetworkInfo.testnet().network_id(),
            deregistration.stake_credential()
          ).to_address().to_bech32(void 0);
          const { stakeCredential } = getAddressDetails(rewardAddress);
          checkAndConsumeHash(stakeCredential, "Cert", index);
          if (!this.chain[rewardAddress]?.registeredStake) {
            throw new Error(
              `Stake key is already deregistered. Reward address: ${rewardAddress}`
            );
          }
          certRequests.push({ type: "Deregistration", rewardAddress });
          break;
        }
        case 2: {
          const delegation = cert.as_stake_delegation();
          const rewardAddress = exports.C.RewardAddress.new(
            exports.C.NetworkInfo.testnet().network_id(),
            delegation.stake_credential()
          ).to_address().to_bech32(void 0);
          const poolId = delegation.pool_keyhash().to_bech32("pool");
          const { stakeCredential } = getAddressDetails(rewardAddress);
          checkAndConsumeHash(stakeCredential, "Cert", index);
          if (!this.chain[rewardAddress]?.registeredStake && !certRequests.find(
            (request) => request.type === "Registration" && request.rewardAddress === rewardAddress
          )) {
            throw new Error(
              `Stake key is not registered. Reward address: ${rewardAddress}`
            );
          }
          certRequests.push({ type: "Delegation", rewardAddress, poolId });
          break;
        }
      }
    }
    resolvedInputs.forEach(({ entry: { utxo } }, index) => {
      const { paymentCredential } = getAddressDetails(utxo.address);
      checkAndConsumeHash(paymentCredential, "Spend", index);
    });
    const outputs = (() => {
      const collected = [];
      for (let i = 0; i < body.outputs().len(); i++) {
        const output = body.outputs().get(i);
        const unspentOutput = exports.C.TransactionUnspentOutput.new(
          exports.C.TransactionInput.new(
            exports.C.TransactionHash.from_hex(txHash),
            exports.C.BigNum.from_str(i.toString())
          ),
          output
        );
        const utxo = coreToUtxo(unspentOutput);
        if (utxo.datumHash)
          consumedHashes.add(utxo.datumHash);
        collected.push({
          utxo,
          spent: false
        });
      }
      return collected;
    })();
    const [extraKeyHash] = keyHashes.filter(
      (keyHash) => !consumedHashes.has(keyHash)
    );
    if (extraKeyHash) {
      throw new Error(`Extraneous vkey witness. Key hash: ${extraKeyHash}`);
    }
    const [extraNativeHash] = nativeHashes.filter(
      (scriptHash) => !consumedHashes.has(scriptHash)
    );
    if (extraNativeHash) {
      throw new Error(
        `Extraneous native script. Script hash: ${extraNativeHash}`
      );
    }
    const [extraPlutusHash] = plutusHashes.filter(
      (scriptHash) => !consumedHashes.has(scriptHash)
    );
    if (extraPlutusHash) {
      throw new Error(
        `Extraneous plutus script. Script hash: ${extraPlutusHash}`
      );
    }
    const [extraDatumHash] = Object.keys(datumTable).filter(
      (datumHash) => !consumedHashes.has(datumHash)
    );
    if (extraDatumHash) {
      throw new Error(`Extraneous plutus data. Datum hash: ${extraDatumHash}`);
    }
    resolvedInputs.forEach(({ entry, type }) => {
      const outRef = entry.utxo.txHash + entry.utxo.outputIndex;
      entry.spent = true;
      if (type === "Ledger")
        this.ledger[outRef] = entry;
      else if (type === "Mempool")
        this.mempool[outRef] = entry;
    });
    withdrawalRequests.forEach(({ rewardAddress, withdrawal }) => {
      this.chain[rewardAddress].delegation.rewards -= withdrawal;
    });
    certRequests.forEach(({ type, rewardAddress, poolId }) => {
      switch (type) {
        case "Registration": {
          if (this.chain[rewardAddress]) {
            this.chain[rewardAddress].registeredStake = true;
          } else {
            this.chain[rewardAddress] = {
              registeredStake: true,
              delegation: { poolId: null, rewards: 0n }
            };
          }
          break;
        }
        case "Deregistration": {
          this.chain[rewardAddress].registeredStake = false;
          this.chain[rewardAddress].delegation.poolId = null;
          break;
        }
        case "Delegation": {
          this.chain[rewardAddress].delegation.poolId = poolId;
        }
      }
    });
    outputs.forEach(({ utxo, spent }) => {
      this.mempool[utxo.txHash + utxo.outputIndex] = {
        utxo,
        spent
      };
    });
    for (const [datumHash, datum] of Object.entries(datumTable)) {
      this.datumTable[datumHash] = datum;
    }
    return Promise.resolve(txHash);
  }
  log() {
    function getRandomColor(unit) {
      const seed = unit === "lovelace" ? "1" : unit;
      let num = 0;
      for (let i = 0; i < seed.length; i++) {
        num += seed.charCodeAt(i);
      }
      const r = num * 123 % 256;
      const g = num * 321 % 256;
      const b = num * 213 % 256;
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    const totalBalances = {};
    const balances = {};
    for (const { utxo } of Object.values(this.ledger)) {
      for (const [unit, quantity] of Object.entries(utxo.assets)) {
        if (!balances[utxo.address]) {
          balances[utxo.address] = { [unit]: quantity };
        } else if (!balances[utxo.address]?.[unit]) {
          balances[utxo.address][unit] = quantity;
        } else {
          balances[utxo.address][unit] += quantity;
        }
        if (!totalBalances[unit]) {
          totalBalances[unit] = quantity;
        } else {
          totalBalances[unit] += quantity;
        }
      }
    }
    console.log("\n%cBlockchain state", "color:purple");
    console.log(
      `
    Block height:   %c${this.blockHeight}%c
    Slot:           %c${this.slot}%c
    Unix time:      %c${this.time}
  `,
      "color:yellow",
      "color:white",
      "color:yellow",
      "color:white",
      "color:yellow"
    );
    console.log("\n");
    for (const [address, assets] of Object.entries(balances)) {
      console.log(`Address: %c${address}`, "color:blue", "\n");
      for (const [unit, quantity] of Object.entries(assets)) {
        const barLength = Math.max(
          Math.floor(60 * (Number(quantity) / Number(totalBalances[unit]))),
          1
        );
        console.log(
          `%c${"\u2586".repeat(barLength) + " ".repeat(60 - barLength)}`,
          `color: ${getRandomColor(unit)}`,
          "",
          `${unit}:`,
          quantity,
          ""
        );
      }
      console.log(`
${"\u2581".repeat(60)}
`);
    }
  }
}

var __defProp$8 = Object.defineProperty;
var __defNormalProp$8 = (obj, key, value) => key in obj ? __defProp$8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$8 = (obj, key, value) => {
  __defNormalProp$8(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class WalletConnector {
  constructor(translucent, api) {
    __publicField$8(this, "translucent");
    __publicField$8(this, "api");
    this.translucent = translucent;
    this.api = api;
  }
  async getAddressHex() {
    const [addressHex] = await this.api.getUsedAddresses();
    if (addressHex)
      return addressHex;
    const [unusedAddressHex] = await this.api.getUnusedAddresses();
    return unusedAddressHex;
  }
  async address() {
    return exports.C.Address.from_bytes(fromHex(await this.getAddressHex())).to_bech32(
      void 0
    );
  }
  async rewardAddress() {
    const [rewardAddressHex] = await this.api.getRewardAddresses();
    const rewardAddress = rewardAddressHex ? exports.C.RewardAddress.from_address(
      exports.C.Address.from_bytes(fromHex(rewardAddressHex))
    ).to_address().to_bech32(void 0) : null;
    return rewardAddress;
  }
  async getUtxos() {
    const utxos = (await this.api.getUtxos() || []).map((utxo) => {
      const parsedUtxo = exports.C.TransactionUnspentOutput.from_bytes(fromHex(utxo));
      return coreToUtxo(parsedUtxo);
    });
    return utxos;
  }
  async getUtxosCore() {
    const utxos = exports.C.TransactionUnspentOutputs.new();
    (await this.api.getUtxos() || []).forEach((utxo) => {
      utxos.add(exports.C.TransactionUnspentOutput.from_bytes(fromHex(utxo)));
    });
    return utxos;
  }
  async getDelegation() {
    const rewardAddr = await this.rewardAddress();
    return rewardAddr ? await this.translucent.delegationAt(rewardAddr) : { poolId: null, rewards: 0n };
  }
  async signTx(tx) {
    const witnessSet = await this.api.signTx(toHex(tx.to_bytes()), true);
    return exports.C.TransactionWitnessSet.from_bytes(fromHex(witnessSet));
  }
  async signMessage(address, payload) {
    const hexAddress = toHex(exports.C.Address.from_bech32(address).to_bytes());
    return await this.api.signData(hexAddress, payload);
  }
  async submitTx(tx) {
    const txHash = await this.api.submitTx(tx);
    return txHash;
  }
}

var __defProp$7 = Object.defineProperty;
var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$7 = (obj, key, value) => {
  __defNormalProp$7(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PrivateKeyWallet {
  constructor(translucent, privateKey) {
    __publicField$7(this, "translucent");
    __publicField$7(this, "privateKey");
    __publicField$7(this, "priv");
    __publicField$7(this, "pubKeyHash");
    this.translucent = translucent;
    this.privateKey = privateKey;
    this.priv = exports.C.PrivateKey.from_bech32(privateKey);
    this.pubKeyHash = this.priv.to_public().hash();
  }
  async address() {
    return exports.C.EnterpriseAddress.new(
      this.translucent.network === "Mainnet" ? 1 : 0,
      exports.C.StakeCredential.from_keyhash(this.pubKeyHash)
    ).to_address().to_bech32(void 0);
  }
  // deno-lint-ignore require-await
  async rewardAddress() {
    return null;
  }
  async getUtxos() {
    return await this.translucent.utxosAt(
      paymentCredentialOf(await this.address())
    );
  }
  async getUtxosCore() {
    const utxos = await this.translucent.utxosAt(
      paymentCredentialOf(await this.address())
    );
    const coreUtxos = exports.C.TransactionUnspentOutputs.new();
    utxos.forEach((utxo) => {
      coreUtxos.add(utxoToCore(utxo));
    });
    return coreUtxos;
  }
  // deno-lint-ignore require-await
  async getDelegation() {
    return { poolId: null, rewards: 0n };
  }
  // deno-lint-ignore require-await
  async signTx(tx) {
    const witness = exports.C.make_vkey_witness(
      exports.C.hash_transaction(tx.body()),
      this.priv
    );
    const txWitnessSetBuilder = exports.C.TransactionWitnessSetBuilder.new();
    txWitnessSetBuilder.add_vkey(witness);
    return txWitnessSetBuilder.build();
  }
  // deno-lint-ignore require-await
  async signMessage(address, payload) {
    const {
      paymentCredential,
      address: { hex: hexAddress }
    } = this.translucent.utils.getAddressDetails(address);
    const keyHash = paymentCredential?.hash;
    const originalKeyHash = this.pubKeyHash.to_hex();
    if (!keyHash || keyHash !== originalKeyHash) {
      throw new Error(`Cannot sign message for address: ${address}.`);
    }
    return signData(hexAddress, payload, this.privateKey);
  }
  async submitTx(tx) {
    return await this.translucent.provider.submitTx(tx);
  }
}

function walletFromSeed(seed, options = { addressType: "Base", accountIndex: 0, network: "Mainnet" }) {
  function harden(num) {
    if (typeof num !== "number")
      throw new Error("Type number required here!");
    return 2147483648 + num;
  }
  const entropy = mnemonicToEntropy(seed);
  const rootKey = exports.C.Bip32PrivateKey.from_bip39_entropy(
    fromHex(entropy),
    options.password ? new TextEncoder().encode(options.password) : new Uint8Array()
  );
  const accountKey = rootKey.derive(harden(1852)).derive(harden(1815)).derive(harden(options.accountIndex));
  const paymentKey = accountKey.derive(0).derive(0).to_raw_key();
  const stakeKey = accountKey.derive(2).derive(0).to_raw_key();
  const paymentKeyHash = paymentKey.to_public().hash();
  const stakeKeyHash = stakeKey.to_public().hash();
  const networkId = options.network === "Mainnet" ? 1 : 0;
  const address = options.addressType === "Base" ? exports.C.BaseAddress.new(
    networkId,
    exports.C.StakeCredential.from_keyhash(paymentKeyHash),
    exports.C.StakeCredential.from_keyhash(stakeKeyHash)
  ).to_address().to_bech32(void 0) : exports.C.EnterpriseAddress.new(
    networkId,
    exports.C.StakeCredential.from_keyhash(paymentKeyHash)
  ).to_address().to_bech32(void 0);
  const rewardAddress = options.addressType === "Base" ? exports.C.RewardAddress.new(
    networkId,
    exports.C.StakeCredential.from_keyhash(stakeKeyHash)
  ).to_address().to_bech32(void 0) : null;
  return {
    address,
    rewardAddress,
    paymentKey: paymentKey.to_bech32(),
    stakeKey: options.addressType === "Base" ? stakeKey.to_bech32() : null
  };
}
function discoverOwnUsedTxKeyHashes(tx, ownKeyHashes, ownUtxos) {
  const usedKeyHashes = [];
  const inputs = tx.body().inputs();
  for (let i = 0; i < inputs.len(); i++) {
    const input = inputs.get(i);
    const txHash = toHex(input.transaction_id().to_bytes());
    const outputIndex = parseInt(input.index().to_str());
    const utxo = ownUtxos.find(
      (utxo2) => utxo2.txHash === txHash && utxo2.outputIndex === outputIndex
    );
    if (utxo) {
      const { paymentCredential } = getAddressDetails(utxo.address);
      usedKeyHashes.push(paymentCredential?.hash);
    }
  }
  const txBody = tx.body();
  function keyHashFromCert(txBody2) {
    const certs = txBody2.certs();
    if (!certs)
      return;
    for (let i = 0; i < certs.len(); i++) {
      const cert = certs.get(i);
      if (cert.kind() === 0) {
        const credential = cert.as_stake_registration()?.stake_credential();
        if (credential?.kind() === 0) ;
      } else if (cert.kind() === 1) {
        const credential = cert.as_stake_deregistration()?.stake_credential();
        if (credential?.kind() === 0) {
          const keyHash = toHex(credential.to_keyhash().to_bytes());
          usedKeyHashes.push(keyHash);
        }
      } else if (cert.kind() === 2) {
        const credential = cert.as_stake_delegation()?.stake_credential();
        if (credential?.kind() === 0) {
          const keyHash = toHex(credential.to_keyhash().to_bytes());
          usedKeyHashes.push(keyHash);
        }
      } else if (cert.kind() === 3) {
        const poolParams = cert.as_pool_registration()?.pool_params();
        const owners = poolParams?.pool_owners();
        if (!owners)
          break;
        for (let i2 = 0; i2 < owners.len(); i2++) {
          const keyHash = toHex(owners.get(i2).to_bytes());
          usedKeyHashes.push(keyHash);
        }
        const operator = poolParams.operator().to_hex();
        usedKeyHashes.push(operator);
      } else if (cert.kind() === 4) {
        const operator = cert.as_pool_retirement().pool_keyhash().to_hex();
        usedKeyHashes.push(operator);
      } else if (cert.kind() === 6) {
        const instantRewards = cert.as_move_instantaneous_rewards_cert()?.move_instantaneous_reward().as_to_stake_creds()?.keys();
        if (!instantRewards)
          break;
        for (let i2 = 0; i2 < instantRewards.len(); i2++) {
          const credential = instantRewards.get(i2);
          if (credential.kind() === 0) {
            const keyHash = toHex(credential.to_keyhash().to_bytes());
            usedKeyHashes.push(keyHash);
          }
        }
      }
    }
  }
  if (txBody.certs())
    keyHashFromCert(txBody);
  const withdrawals = txBody.withdrawals();
  function keyHashFromWithdrawal(withdrawals2) {
    const rewardAddresses = withdrawals2.keys();
    for (let i = 0; i < rewardAddresses.len(); i++) {
      const credential = rewardAddresses.get(i).payment_cred();
      if (credential.kind() === 0) {
        usedKeyHashes.push(credential.to_keyhash().to_hex());
      }
    }
  }
  if (withdrawals)
    keyHashFromWithdrawal(withdrawals);
  const scripts = tx.witness_set().native_scripts();
  function keyHashFromScript(scripts2) {
    for (let i = 0; i < scripts2.len(); i++) {
      const script = scripts2.get(i);
      if (script.kind() === 0) {
        const keyHash = toHex(
          script.as_script_pubkey().addr_keyhash().to_bytes()
        );
        usedKeyHashes.push(keyHash);
      }
      if (script.kind() === 1) {
        keyHashFromScript(script.as_script_all().native_scripts());
        return;
      }
      if (script.kind() === 2) {
        keyHashFromScript(script.as_script_any().native_scripts());
        return;
      }
      if (script.kind() === 3) {
        keyHashFromScript(script.as_script_n_of_k().native_scripts());
        return;
      }
    }
  }
  if (scripts)
    keyHashFromScript(scripts);
  const requiredSigners = txBody.required_signers();
  if (requiredSigners) {
    for (let i = 0; i < requiredSigners.len(); i++) {
      usedKeyHashes.push(toHex(requiredSigners.get(i).to_bytes()));
    }
  }
  const collateral = txBody.collateral();
  if (collateral) {
    for (let i = 0; i < collateral.len(); i++) {
      const input = collateral.get(i);
      const txHash = toHex(input.transaction_id().to_bytes());
      const outputIndex = parseInt(input.index().to_str());
      const utxo = ownUtxos.find(
        (utxo2) => utxo2.txHash === txHash && utxo2.outputIndex === outputIndex
      );
      if (utxo) {
        const { paymentCredential } = getAddressDetails(utxo.address);
        usedKeyHashes.push(paymentCredential?.hash);
      }
    }
  }
  return usedKeyHashes.filter((k) => ownKeyHashes.includes(k));
}

var __defProp$6 = Object.defineProperty;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$6 = (obj, key, value) => {
  __defNormalProp$6(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class SeedWallet {
  constructor(translucent, seed, options) {
    __publicField$6(this, "translucent");
    __publicField$6(this, "address_");
    __publicField$6(this, "rewardAddress_");
    __publicField$6(this, "paymentKeyHash");
    __publicField$6(this, "stakeKeyHash");
    __publicField$6(this, "privKeyHashMap");
    this.translucent = translucent;
    const { address, rewardAddress, paymentKey, stakeKey } = walletFromSeed(
      seed,
      {
        addressType: options?.addressType || "Base",
        accountIndex: options?.accountIndex || 0,
        password: options?.password,
        network: this.translucent.network
      }
    );
    this.address_ = address;
    this.rewardAddress_ = rewardAddress;
    const paymentKeyHash = exports.C.PrivateKey.from_bech32(paymentKey).to_public().hash().to_hex();
    this.paymentKeyHash = paymentKeyHash;
    const stakeKeyHash = stakeKey ? exports.C.PrivateKey.from_bech32(stakeKey).to_public().hash().to_hex() : "";
    this.stakeKeyHash = stakeKeyHash;
    const privKeyHashMap = {
      [paymentKeyHash]: paymentKey,
      [stakeKeyHash]: stakeKey
    };
    this.privKeyHashMap = privKeyHashMap;
  }
  // deno-lint-ignore require-await
  async address() {
    return this.address_;
  }
  // deno-lint-ignore require-await
  async rewardAddress() {
    return this.rewardAddress_ || null;
  }
  // deno-lint-ignore require-await
  async getUtxos() {
    return this.translucent.utxosAt(paymentCredentialOf(this.address_));
  }
  async getUtxosCore() {
    const coreUtxos = exports.C.TransactionUnspentOutputs.new();
    (await this.translucent.utxosAt(paymentCredentialOf(this.address_))).forEach((utxo) => {
      coreUtxos.add(utxoToCore(utxo));
    });
    return coreUtxos;
  }
  async getDelegation() {
    const rewardAddr = await this.rewardAddress();
    return rewardAddr ? await this.translucent.delegationAt(rewardAddr) : { poolId: null, rewards: 0n };
  }
  async signTx(tx) {
    const utxos = await this.translucent.utxosAt(this.address_);
    const ownKeyHashes = [
      this.paymentKeyHash,
      this.stakeKeyHash
    ];
    const usedKeyHashes = discoverOwnUsedTxKeyHashes(tx, ownKeyHashes, utxos);
    const txWitnessSetBuilder = exports.C.TransactionWitnessSetBuilder.new();
    usedKeyHashes.forEach((keyHash) => {
      const witness = exports.C.make_vkey_witness(
        exports.C.hash_transaction(tx.body()),
        exports.C.PrivateKey.from_bech32(this.privKeyHashMap[keyHash])
      );
      txWitnessSetBuilder.add_vkey(witness);
    });
    return txWitnessSetBuilder.build();
  }
  // deno-lint-ignore require-await
  async signMessage(address, payload) {
    const {
      paymentCredential,
      stakeCredential,
      address: { hex: hexAddress }
    } = this.translucent.utils.getAddressDetails(address);
    const keyHash = paymentCredential?.hash || stakeCredential?.hash;
    const privateKey = this.privKeyHashMap[keyHash];
    if (!privateKey) {
      throw new Error(`Cannot sign message for address: ${address}.`);
    }
    return signData(hexAddress, payload, privateKey);
  }
  async submitTx(tx) {
    return await this.translucent.provider.submitTx(tx);
  }
}

var __defProp$5 = Object.defineProperty;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$5 = (obj, key, value) => {
  __defNormalProp$5(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ExternalWallet {
  constructor(translucent, address, utxos, rewardAddress) {
    __publicField$5(this, "translucent");
    __publicField$5(this, "walletDetails");
    __publicField$5(this, "addressDetails");
    this.translucent = translucent;
    this.walletDetails = {
      address,
      utxos,
      rewardAddress
    };
    const addressDetails = this.translucent.utils.getAddressDetails(address);
    this.addressDetails = addressDetails;
  }
  async address() {
    return this.walletDetails.address;
  }
  async rewardAddress() {
    const rewardAddr = !this.walletDetails.rewardAddress && this.addressDetails.stakeCredential ? (() => exports.C.RewardAddress.new(
      this.translucent.network === "Mainnet" ? 1 : 0,
      toCore.credential(this.addressDetails.stakeCredential)
    ).to_address().to_bech32(void 0))() : this.walletDetails.rewardAddress;
    return rewardAddr || null;
  }
  async getUtxos() {
    return this.walletDetails.utxos ? this.walletDetails.utxos : await this.translucent.utxosAt(
      paymentCredentialOf(this.walletDetails.address)
    );
  }
  async getUtxosCore() {
    const coreUtxos = exports.C.TransactionUnspentOutputs.new();
    (this.walletDetails.utxos ? this.walletDetails.utxos : await this.translucent.utxosAt(
      paymentCredentialOf(this.walletDetails.address)
    )).forEach((utxo) => coreUtxos.add(utxoToCore(utxo)));
    return coreUtxos;
  }
  async getDelegation() {
    const rewardAddr = await this.rewardAddress();
    return rewardAddr ? await this.translucent.delegationAt(rewardAddr) : { poolId: null, rewards: 0n };
  }
  async signTx() {
    throw new Error("Not implemented");
  }
  async signMessage() {
    throw new Error("Not implemented");
  }
  async submitTx(tx) {
    return await this.translucent.provider.submitTx(tx);
  }
}

var __defProp$4 = Object.defineProperty;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$4 = (obj, key, value) => {
  __defNormalProp$4(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Translucent {
  constructor() {
    __publicField$4(this, "txBuilderConfig");
    __publicField$4(this, "wallet");
    __publicField$4(this, "provider");
    __publicField$4(this, "network", "Mainnet");
    __publicField$4(this, "utils");
  }
  static async new(provider, network) {
    const translucent = new this();
    if (network)
      translucent.network = network;
    if (provider) {
      translucent.provider = provider;
      const protocolParameters = await provider.getProtocolParameters();
      if (translucent.provider instanceof Emulator) {
        translucent.network = "Custom";
        SLOT_CONFIG_NETWORK[translucent.network] = {
          zeroTime: translucent.provider.now(),
          zeroSlot: 0,
          slotLength: 1e3
        };
      }
      SLOT_CONFIG_NETWORK[translucent.network];
      translucent.txBuilderConfig = exports.C.TransactionBuilderConfigBuilder.new().coins_per_utxo_byte(
        exports.C.BigNum.from_str(protocolParameters.coinsPerUtxoByte.toString())
      ).fee_algo(
        exports.C.LinearFee.new(
          exports.C.BigNum.from_str(protocolParameters.minFeeA.toString()),
          exports.C.BigNum.from_str(protocolParameters.minFeeB.toString())
        )
      ).key_deposit(
        exports.C.BigNum.from_str(protocolParameters.keyDeposit.toString())
      ).pool_deposit(
        exports.C.BigNum.from_str(protocolParameters.poolDeposit.toString())
      ).max_tx_size(protocolParameters.maxTxSize).max_value_size(protocolParameters.maxValSize).collateral_percentage(protocolParameters.collateralPercentage).max_collateral_inputs(protocolParameters.maxCollateralInputs).ex_unit_prices(
        exports.C.ExUnitPrices.new(
          exports.C.UnitInterval.new(
            exports.C.BigNum.from_str(protocolParameters.priceMem[0].toString()),
            exports.C.BigNum.from_str(protocolParameters.priceMem[1].toString())
          ),
          exports.C.UnitInterval.new(
            exports.C.BigNum.from_str(protocolParameters.priceStep[0].toString()),
            exports.C.BigNum.from_str(protocolParameters.priceStep[1].toString())
          )
        )
      ).costmdls(createCostModels(protocolParameters.costModels)).build();
    }
    translucent.utils = new Utils(translucent);
    return translucent;
  }
  /**
   * Switch provider and/or network.
   * If provider or network unset, no overwriting happens. Provider or network from current instance are taken then.
   */
  async switchProvider(provider, network) {
    if (this.network === "Custom") {
      throw new Error("Cannot switch when on custom network.");
    }
    const translucent = await Translucent.new(provider, network);
    this.txBuilderConfig = translucent.txBuilderConfig;
    this.provider = provider || this.provider;
    this.network = network || this.network;
    this.wallet = translucent.wallet;
    return this;
  }
  newTx() {
    return new Tx(this);
  }
  fromTx(tx) {
    return new TxComplete(this, exports.C.Transaction.from_bytes(fromHex(tx)));
  }
  /** Signs a message. Expects the payload to be Hex encoded. */
  newMessage(address, payload) {
    return new Message(this, address, payload);
  }
  /** Verify a message. Expects the payload to be Hex encoded. */
  verifyMessage(address, payload, signedMessage) {
    const {
      paymentCredential,
      stakeCredential,
      address: { hex: addressHex }
    } = this.utils.getAddressDetails(address);
    const keyHash = paymentCredential?.hash || stakeCredential?.hash;
    if (!keyHash)
      throw new Error("Not a valid address provided.");
    return verifyData(addressHex, keyHash, payload, signedMessage);
  }
  currentSlot() {
    return this.utils.unixTimeToSlot(Date.now());
  }
  utxosAt(addressOrCredential) {
    return this.provider.getUtxos(addressOrCredential);
  }
  utxosAtWithUnit(addressOrCredential, unit) {
    return this.provider.getUtxosWithUnit(addressOrCredential, unit);
  }
  /** Unit needs to be an NFT (or optionally the entire supply in one UTxO). */
  utxoByUnit(unit) {
    return this.provider.getUtxoByUnit(unit);
  }
  utxosByOutRef(outRefs) {
    return this.provider.getUtxosByOutRef(outRefs);
  }
  delegationAt(rewardAddress) {
    return this.provider.getDelegation(rewardAddress);
  }
  awaitTx(txHash, checkInterval = 3e3) {
    return this.provider.awaitTx(txHash, checkInterval);
  }
  async datumOf(utxo, type) {
    if (!utxo.datum) {
      if (!utxo.datumHash) {
        throw new Error("This UTxO does not have a datum hash.");
      }
      utxo.datum = await this.provider.getDatum(utxo.datumHash);
    }
    return Data.from(utxo.datum, type);
  }
  /** Query CIP-0068 metadata for a specifc asset. */
  async metadataOf(unit) {
    const { policyId, name, label } = fromUnit(unit);
    switch (label) {
      case 222:
      case 333:
      case 444: {
        const utxo = await this.utxoByUnit(toUnit(policyId, name, 100));
        const metadata = await this.datumOf(utxo);
        return Data.toJson(metadata.fields[0]);
      }
      default:
        throw new Error("No variant matched.");
    }
  }
  selectWalletFromPrivateKey(privateKey) {
    return this.useWallet(new PrivateKeyWallet(this, privateKey));
  }
  selectWallet(api) {
    return this.useWallet(new WalletConnector(this, api));
  }
  selectWalletFrom(address, utxos, rewardAddress) {
    return this.useWallet(
      new ExternalWallet(this, address, utxos, rewardAddress)
    );
  }
  selectWalletFromSeed(seed, options) {
    return this.useWallet(new SeedWallet(this, seed, options));
  }
  useWallet(wallet) {
    this.wallet = wallet;
    return this;
  }
}

var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$3 = (obj, key, value) => {
  __defNormalProp$3(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function fromMaybeBuffer(x) {
  if (typeof x === "string") {
    return x;
  } else {
    return x.toString();
  }
}
function fromOgmiosValue(value) {
  const assets = {};
  for (const policy_id of Object.keys(value)) {
    if (policy_id == "ada") {
      assets["lovelace"] = value[policy_id].lovelace;
    } else {
      for (const token_name of Object.keys(value[policy_id])) {
        assets[policy_id + token_name] = value[policy_id][token_name];
      }
    }
  }
  return assets;
}
class Kupmios {
  //TODO: fix this type not sure what the header should be
  /**
   * This provider is based on Kupo + Ogmios v6.
   * This is a way to support both ogmios 5.6 and 6.0 until 6.0 is released as stable and the Conway hard-fork is done.
   * @param kupoUrl: http(s)://localhost:1442
   * @param ogmiosUrl: ws(s)://localhost:1337
   */
  constructor(kupoUrl, ogmiosUrl, headers) {
    __publicField$3(this, "kupoUrl");
    __publicField$3(this, "ogmiosUrl");
    __publicField$3(this, "headers");
    this.kupoUrl = kupoUrl;
    this.ogmiosUrl = ogmiosUrl;
    this.headers = headers;
  }
  async getProtocolParameters() {
    const client = await this.ogmiosWsp(
      "queryLedgerState/protocolParameters",
      {}
    );
    return new Promise((res, rej) => {
      client.addEventListener(
        "message",
        (msg) => {
          console.log("queryLedgerState/protocolParameters", msg.data);
          try {
            const {
              result
            } = JSON.parse(
              fromMaybeBuffer(msg.data)
            );
            const costModels = {
              PlutusV1: Object.fromEntries(
                result.plutusCostModels["plutus:v1"].map((val, idx) => [
                  costModelKeys.PlutusV1[idx],
                  val
                ])
              ),
              PlutusV2: Object.fromEntries(
                result.plutusCostModels["plutus:v2"].map((val, idx) => [
                  costModelKeys.PlutusV2[idx],
                  val
                ])
              )
            };
            const [memNum, memDenom] = result.scriptExecutionPrices.memory.split("/");
            const [stepsNum, stepsDenom] = result.scriptExecutionPrices.cpu.split("/");
            const protocolParams = {
              minFeeA: result.minFeeCoefficient,
              minFeeB: Number(result.minFeeConstant.ada.lovelace),
              maxTxSize: result.maxTransactionSize.bytes,
              maxValSize: result.maxValueSize.bytes,
              keyDeposit: BigInt(result.stakeCredentialDeposit.ada.lovelace),
              poolDeposit: BigInt(result.stakePoolDeposit.ada.lovelace),
              priceMem: [BigInt(memNum), BigInt(memDenom)],
              priceStep: [BigInt(stepsNum), BigInt(stepsDenom)],
              maxTxExMem: BigInt(
                result.maxExecutionUnitsPerTransaction.memory
              ),
              maxTxExSteps: BigInt(result.maxExecutionUnitsPerTransaction.cpu),
              coinsPerUtxoByte: BigInt(result.minUtxoDepositCoefficient),
              collateralPercentage: result.collateralPercentage,
              maxCollateralInputs: result.maxCollateralInputs,
              costModels
            };
            res(protocolParams);
            client.close();
          } catch (e) {
            rej(e);
          }
          return void 0;
        },
        { once: true }
      );
    });
  }
  async getUtxos(addressOrCredential) {
    let addy = typeof addressOrCredential == "string" ? addressOrCredential : exports.C.EnterpriseAddress.new(
      0,
      exports.C.StakeCredential.from_keyhash(
        exports.C.Ed25519KeyHash.from_hex(addressOrCredential.hash)
      )
    ).to_address().to_bech32(void 0);
    let params = {
      addresses: [addy]
    };
    const client = await this.ogmiosWsp("queryLedgerState/utxo", params);
    return new Promise((res, rej) => {
      client.addEventListener(
        "message",
        (msg) => {
          try {
            const response = JSON.parse(
              fromMaybeBuffer(msg.data)
            );
            if ("result" in response) {
              res(
                response.result.map((utxo) => {
                  return {
                    txHash: utxo.transaction.id,
                    outputIndex: utxo.index,
                    assets: fromOgmiosValue(utxo.value),
                    address: utxo.address,
                    datumHash: utxo.datumHash,
                    datum: utxo.datum,
                    script: utxo.script
                  };
                })
              );
            } else {
              console.error("UTXO Fetch error", response.error);
            }
          } catch {
          }
        }
      );
    });
  }
  async getUtxosWithUnit(addressOrCredential, unit) {
    const isAddress = typeof addressOrCredential === "string";
    const queryPredicate = isAddress ? addressOrCredential : addressOrCredential.hash;
    const { policyId, assetName } = fromUnit(unit);
    const result = await fetch(
      `${this.kupoUrl}/matches/${queryPredicate}${isAddress ? "" : "/*"}?unspent&policy_id=${policyId}${assetName ? `&asset_name=${assetName}` : ""}`,
      {
        headers: this.headers
      }
    ).then((res) => res.json());
    return await this.getUtxosByOutRef(
      result.map((x) => {
        return { txHash: x.transaction_id, outputIndex: x.output_index };
      })
    );
  }
  async getUtxoByUnit(unit) {
    const { policyId, assetName } = fromUnit(unit);
    const result = await fetch(
      `${this.kupoUrl}/matches/${policyId}.${assetName ? `${assetName}` : "*"}?unspent`,
      {
        headers: this.headers
      }
    ).then((res) => res.json());
    if (result.length > 1) {
      throw new Error("Unit needs to be an NFT or only held by one address.");
    }
    return (await this.getUtxosByOutRef(
      result.map((x) => {
        return { txHash: x.transaction_id, outputIndex: x.output_index };
      })
    ))[0];
  }
  async getUtxosByOutRef(outRefs) {
    let params = {
      outputReferences: outRefs.map((x) => {
        return { transaction: { id: x.txHash }, index: x.outputIndex };
      })
    };
    const client = await this.ogmiosWsp("queryLedgerState/utxo", params);
    return new Promise((res, rej) => {
      client.addEventListener(
        "message",
        (msg) => {
          try {
            const response = JSON.parse(
              fromMaybeBuffer(msg.data)
            );
            if ("result" in response) {
              res(
                response.result.map((utxo) => {
                  return {
                    txHash: utxo.transaction.id,
                    outputIndex: utxo.index,
                    assets: fromOgmiosValue(utxo.value),
                    address: utxo.address,
                    datumHash: utxo.datumHash,
                    datum: utxo.datum,
                    script: utxo.script
                  };
                })
              );
            } else {
              console.error("UTXO Fetch error", response.error);
            }
          } catch {
          }
        }
      );
    });
  }
  async getDelegation(rewardAddress) {
    const client = await this.ogmiosWsp(
      "queryLedgerState/rewardAccountSummaries",
      {
        keys: [rewardAddress]
      }
    );
    return new Promise((res, rej) => {
      client.addEventListener(
        "message",
        (msg) => {
          try {
            const { result } = JSON.parse(fromMaybeBuffer(msg.data));
            const delegation = result ? Object.values(result)[0] : {};
            res({
              poolId: delegation?.delegate || null,
              rewards: BigInt(delegation?.rewards || 0)
            });
            client.close();
          } catch (e) {
            rej(e);
          }
        },
        { once: true }
      );
    });
  }
  async getDatum(datumHash) {
    const result = await fetch(
      `${this.kupoUrl}/datums/${datumHash}`,
      {
        headers: this.headers
      }
    ).then((res) => res.json());
    if (!result || !result.datum) {
      throw new Error(`No datum found for datum hash: ${datumHash}`);
    }
    return result.datum;
  }
  awaitTx(txHash, checkInterval = 3e3) {
    return new Promise((res) => {
      const confirmation = setInterval(async () => {
        const isConfirmed = await fetch(
          `${this.kupoUrl}/matches/*@${txHash}?unspent`,
          {
            headers: this.headers
          }
        ).then((res2) => res2.json());
        if (isConfirmed && Object.keys(isConfirmed).length > 0) {
          clearInterval(confirmation);
          await new Promise((res2) => setTimeout(() => res2(1), 1e3));
          return res(true);
        }
      }, checkInterval);
    });
  }
  async submitTx(tx) {
    const client = await this.ogmiosWsp("submitTransaction", {
      transaction: { cbor: tx }
    });
    return new Promise((res, rej) => {
      client.addEventListener(
        "message",
        (msg) => {
          try {
            const response = JSON.parse(fromMaybeBuffer(msg.data));
            if ("result" in response)
              res(response.result.transaction.id);
            else
              rej(response.error);
            client.close();
          } catch (e) {
            rej(e);
          }
        },
        { once: true }
      );
    });
  }
  async ogmiosWsp(method, params = {}, id) {
    const client = new WebSocket(this.ogmiosUrl);
    await new Promise((res) => {
      client.addEventListener("open", () => res(1), { once: true });
    });
    client.send(
      JSON.stringify({
        jsonrpc: "2.0",
        method,
        params,
        id
      })
    );
    return client;
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class KupmiosV5 {
  /**
   * This provider is based on Kupo + Ogmios v5.6.
   * This is a way to support both ogmios 5.6 and 6.0 until 6.0 is released as stable and the Conway hard-fork is done.
   * @param kupoUrl: http(s)://localhost:1442
   * @param ogmiosUrl: ws(s)://localhost:1337
   */
  constructor(kupoUrl, ogmiosUrl) {
    __publicField$2(this, "kupoUrl");
    __publicField$2(this, "ogmiosUrl");
    this.kupoUrl = kupoUrl;
    this.ogmiosUrl = ogmiosUrl;
  }
  async getProtocolParameters() {
    const client = await this.ogmiosWsp("Query", {
      query: "currentProtocolParameters"
    });
    return new Promise((res, rej) => {
      client.addEventListener(
        "message",
        (msg) => {
          try {
            const { result } = JSON.parse(msg.data);
            const costModels = {};
            Object.keys(result.costModels).forEach((v) => {
              const version = v.split(":")[1].toUpperCase();
              const plutusVersion = "Plutus" + version;
              costModels[plutusVersion] = result.costModels[v];
            });
            const [memNum, memDenom] = result.prices.memory.split("/");
            const [stepsNum, stepsDenom] = result.prices.steps.split("/");
            res({
              minFeeA: parseInt(result.minFeeCoefficient),
              minFeeB: parseInt(result.minFeeConstant),
              maxTxSize: parseInt(result.maxTxSize),
              maxValSize: parseInt(result.maxValueSize),
              keyDeposit: BigInt(result.stakeKeyDeposit),
              poolDeposit: BigInt(result.poolDeposit),
              priceMem: [BigInt(memNum), BigInt(memDenom)],
              priceStep: [BigInt(stepsNum), BigInt(stepsDenom)],
              maxTxExMem: BigInt(result.maxExecutionUnitsPerTransaction.memory),
              maxTxExSteps: BigInt(
                result.maxExecutionUnitsPerTransaction.steps
              ),
              coinsPerUtxoByte: BigInt(result.coinsPerUtxoByte),
              collateralPercentage: parseInt(result.collateralPercentage),
              maxCollateralInputs: parseInt(result.maxCollateralInputs),
              costModels
            });
            client.close();
          } catch (e) {
            rej(e);
          }
        },
        { once: true }
      );
    });
  }
  async getUtxos(addressOrCredential) {
    const isAddress = typeof addressOrCredential === "string";
    const queryPredicate = isAddress ? addressOrCredential : addressOrCredential.hash;
    const result = await fetch(
      `${this.kupoUrl}/matches/${queryPredicate}${isAddress ? "" : "/*"}?unspent`
    ).then((res) => res.json());
    return this.kupmiosUtxosToUtxos(result);
  }
  async getUtxosWithUnit(addressOrCredential, unit) {
    const isAddress = typeof addressOrCredential === "string";
    const queryPredicate = isAddress ? addressOrCredential : addressOrCredential.hash;
    const { policyId, assetName } = fromUnit(unit);
    const result = await fetch(
      `${this.kupoUrl}/matches/${queryPredicate}${isAddress ? "" : "/*"}?unspent&policy_id=${policyId}${assetName ? `&asset_name=${assetName}` : ""}`
    ).then((res) => res.json());
    return this.kupmiosUtxosToUtxos(result);
  }
  async getUtxoByUnit(unit) {
    const { policyId, assetName } = fromUnit(unit);
    const result = await fetch(
      `${this.kupoUrl}/matches/${policyId}.${assetName ? `${assetName}` : "*"}?unspent`
    ).then((res) => res.json());
    const utxos = await this.kupmiosUtxosToUtxos(result);
    if (utxos.length > 1) {
      throw new Error("Unit needs to be an NFT or only held by one address.");
    }
    return utxos[0];
  }
  async getUtxosByOutRef(outRefs) {
    const queryHashes = [...new Set(outRefs.map((outRef) => outRef.txHash))];
    const utxos = await Promise.all(
      queryHashes.map(async (txHash) => {
        const result = await fetch(
          `${this.kupoUrl}/matches/*@${txHash}?unspent`
        ).then((res) => res.json());
        return this.kupmiosUtxosToUtxos(result);
      })
    );
    return utxos.reduce((acc, utxos2) => acc.concat(utxos2), []).filter(
      (utxo) => outRefs.some(
        (outRef) => utxo.txHash === outRef.txHash && utxo.outputIndex === outRef.outputIndex
      )
    );
  }
  async getDelegation(rewardAddress) {
    const client = await this.ogmiosWsp("Query", {
      query: { delegationsAndRewards: [rewardAddress] }
    });
    return new Promise((res, rej) => {
      client.addEventListener(
        "message",
        (msg) => {
          try {
            const { result } = JSON.parse(msg.data);
            const delegation = result ? Object.values(result)[0] : {};
            res({
              poolId: delegation?.delegate || null,
              rewards: BigInt(delegation?.rewards || 0)
            });
            client.close();
          } catch (e) {
            rej(e);
          }
        },
        { once: true }
      );
    });
  }
  async getDatum(datumHash) {
    const result = await fetch(`${this.kupoUrl}/datums/${datumHash}`).then(
      (res) => res.json()
    );
    if (!result || !result.datum) {
      throw new Error(`No datum found for datum hash: ${datumHash}`);
    }
    return result.datum;
  }
  awaitTx(txHash, checkInterval = 3e3) {
    return new Promise((res) => {
      const confirmation = setInterval(async () => {
        const isConfirmed = await fetch(
          `${this.kupoUrl}/matches/*@${txHash}?unspent`
        ).then((res2) => res2.json());
        if (isConfirmed && isConfirmed.length > 0) {
          clearInterval(confirmation);
          await new Promise((res2) => setTimeout(() => res2(1), 1e3));
          return res(true);
        }
      }, checkInterval);
    });
  }
  async submitTx(tx) {
    const client = await this.ogmiosWsp("SubmitTx", {
      submit: tx
    });
    return new Promise((res, rej) => {
      client.addEventListener(
        "message",
        (msg) => {
          try {
            const { result } = JSON.parse(msg.data);
            if (result.SubmitSuccess)
              res(result.SubmitSuccess.txId);
            else
              rej(result.SubmitFail);
            client.close();
          } catch (e) {
            rej(e);
          }
        },
        { once: true }
      );
    });
  }
  kupmiosUtxosToUtxos(utxos) {
    return Promise.all(
      utxos.map(async (utxo) => {
        return {
          txHash: utxo.transaction_id,
          outputIndex: parseInt(utxo.output_index),
          address: utxo.address,
          assets: (() => {
            const a = { lovelace: BigInt(utxo.value.coins) };
            Object.keys(utxo.value.assets).forEach((unit) => {
              a[unit.replace(".", "")] = BigInt(utxo.value.assets[unit]);
            });
            return a;
          })(),
          datumHash: utxo?.datum_type === "hash" ? utxo.datum_hash : null,
          datum: utxo?.datum_type === "inline" ? await this.getDatum(utxo.datum_hash) : null,
          scriptRef: utxo.script_hash && await (async () => {
            const { script, language } = await fetch(
              `${this.kupoUrl}/scripts/${utxo.script_hash}`
            ).then((res) => res.json());
            if (language === "native") {
              return { type: "Native", script };
            } else if (language === "plutus:v1") {
              return {
                type: "PlutusV1",
                script: toHex(
                  exports.C.PlutusV1Script.new(fromHex(script)).to_bytes()
                )
              };
            } else if (language === "plutus:v2") {
              return {
                type: "PlutusV2",
                script: toHex(
                  exports.C.PlutusV2Script.new(fromHex(script)).to_bytes()
                )
              };
            }
          })()
        };
      })
    );
  }
  async ogmiosWsp(methodname, args) {
    const client = new WebSocket(this.ogmiosUrl);
    await new Promise((res) => {
      client.addEventListener("open", () => res(1), { once: true });
    });
    client.send(
      JSON.stringify({
        type: "jsonwsp/request",
        version: "1.0",
        servicename: "ogmios",
        methodname,
        args
      })
    );
    return client;
  }
}

var name = "translucent-cardano";
var version = "0.0.6";
var scripts = {
	build: "rimraf build && rollup -c rollup.config.mjs"
};
var main = "./build/index.js";
var module$1 = "./build/index.es.js";
var types = "./build/index.d.ts";
var files = [
	"build"
];
var devDependencies = {
	"@cardano-ogmios/schema": "^6.0.0-rc6",
	"@rollup/plugin-json": "^6.0.1",
	"@types/jest": "^29.5.5",
	"@types/sha256": "^0.2.2",
	"bun-types": "latest",
	eslint: "^8.50.0",
	jest: "^29.7.0",
	"ts-jest": "^29.1.1",
	typescript: "^5.3.3"
};
var dependencies = {
	"@dcspark/cardano-multiplatform-lib-browser": "^3.1.2",
	"@dcspark/cardano-multiplatform-lib-nodejs": "^3.1.2",
	"@emurgo/cardano-message-signing-browser": "^1.0.1",
	"@emurgo/cardano-message-signing-nodejs": "^1.0.1",
	"@sinclair/typebox": "^0.31.28",
	"@vercel/ncc": "^0.38.1",
	"fast-check": "^3.14.0",
	prettier: "^3.1.1",
	sha256: "^0.2.0",
	"uplc-node": "^0.0.3",
	"uplc-web": "^0.0.3",
	rimraf: "^5.0.5",
	rollup: "^4.5.0",
	"rollup-plugin-dts": "^6.1.0",
	"rollup-plugin-esbuild": "^6.1.0"
};
var packageJson = {
	name: name,
	version: version,
	scripts: scripts,
	main: main,
	module: module$1,
	types: types,
	files: files,
	devDependencies: devDependencies,
	dependencies: dependencies
};

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Maestro {
  constructor({ network, apiKey, turboSubmit = false }) {
    __publicField$1(this, "url");
    __publicField$1(this, "apiKey");
    __publicField$1(this, "turboSubmit");
    this.url = `https://${network}.gomaestro-api.org/v1`;
    this.apiKey = apiKey;
    this.turboSubmit = turboSubmit;
  }
  async getProtocolParameters() {
    const timestampedResult = await fetch(`${this.url}/protocol-params`, {
      headers: this.commonHeaders()
    }).then((res) => res.json());
    const result = timestampedResult.data;
    const rationalFromRationalString = (str) => {
      const forwardSlashIndex = str.indexOf("/");
      return [
        BigInt(str.slice(0, forwardSlashIndex)),
        BigInt(str.slice(forwardSlashIndex + 1))
      ];
    };
    const renameKeysAndSort = (obj, newKeys) => {
      const entries = Object.keys(obj).sort().map((key) => {
        const newKey = newKeys[key] || key;
        return {
          [newKey]: Object.fromEntries(
            Object.entries(obj[key]).sort(
              ([k, _v], [k2, _v2]) => k.localeCompare(k2)
            )
          )
        };
      });
      return Object.assign({}, ...entries);
    };
    return {
      minFeeA: parseInt(result.min_fee_coefficient),
      minFeeB: parseInt(result.min_fee_constant),
      maxTxSize: parseInt(result.max_tx_size),
      maxValSize: parseInt(result.max_value_size),
      keyDeposit: BigInt(result.stake_key_deposit),
      poolDeposit: BigInt(result.pool_deposit),
      priceMem: rationalFromRationalString(result.prices.memory),
      priceStep: rationalFromRationalString(result.prices.steps),
      maxTxExMem: BigInt(result.max_execution_units_per_transaction.memory),
      maxTxExSteps: BigInt(result.max_execution_units_per_transaction.steps),
      coinsPerUtxoByte: BigInt(result.coins_per_utxo_byte),
      collateralPercentage: parseInt(result.collateral_percentage),
      maxCollateralInputs: parseInt(result.max_collateral_inputs),
      costModels: renameKeysAndSort(result.cost_models, {
        "plutus:v1": "PlutusV1",
        "plutus:v2": "PlutusV2"
      })
    };
  }
  async getUtxosInternal(addressOrCredential, unit) {
    const queryPredicate = (() => {
      if (typeof addressOrCredential === "string") {
        return "/addresses/" + addressOrCredential;
      }
      let credentialBech32Query = "/addresses/cred/";
      credentialBech32Query += addressOrCredential.type === "Key" ? exports.C.Ed25519KeyHash.from_hex(addressOrCredential.hash).to_bech32(
        "addr_vkh"
      ) : exports.C.ScriptHash.from_hex(addressOrCredential.hash).to_bech32(
        "addr_shared_vkh"
      );
      return credentialBech32Query;
    })();
    const qparams = new URLSearchParams({
      count: "100",
      ...unit && { asset: unit }
    });
    const result = await this.getAllPagesData(
      async (qry) => await fetch(qry, {
        headers: this.requireAmountsAsStrings(this.commonHeaders())
      }),
      `${this.url}${queryPredicate}/utxos`,
      qparams,
      "Location: getUtxosInternal. Error: Could not fetch UTxOs from Maestro"
    );
    return result.map(this.maestroUtxoToUtxo);
  }
  getUtxos(addressOrCredential) {
    return this.getUtxosInternal(addressOrCredential);
  }
  getUtxosWithUnit(addressOrCredential, unit) {
    return this.getUtxosInternal(addressOrCredential, unit);
  }
  async getUtxoByUnit(unit) {
    const timestampedAddressesResponse = await fetch(
      `${this.url}/assets/${unit}/addresses?count=2`,
      { headers: this.commonHeaders() }
    );
    const timestampedAddresses = await timestampedAddressesResponse.json();
    if (!timestampedAddressesResponse.ok) {
      if (timestampedAddresses.message) {
        throw new Error(timestampedAddresses.message);
      }
      throw new Error(
        "Location: getUtxoByUnit. Error: Couldn't perform query. Received status code: " + timestampedAddressesResponse.status
      );
    }
    const addressesWithAmount = timestampedAddresses.data;
    if (addressesWithAmount.length === 0) {
      throw new Error("Location: getUtxoByUnit. Error: Unit not found.");
    }
    if (addressesWithAmount.length > 1) {
      throw new Error(
        "Location: getUtxoByUnit. Error: Unit needs to be an NFT or only held by one address."
      );
    }
    const address = addressesWithAmount[0].address;
    const utxos = await this.getUtxosWithUnit(address, unit);
    if (utxos.length > 1) {
      throw new Error(
        "Location: getUtxoByUnit. Error: Unit needs to be an NFT or only held by one address."
      );
    }
    return utxos[0];
  }
  async getUtxosByOutRef(outRefs) {
    const qry = `${this.url}/transactions/outputs`;
    const body = JSON.stringify(
      outRefs.map(({ txHash, outputIndex }) => `${txHash}#${outputIndex}`)
    );
    const utxos = await this.getAllPagesData(
      async (qry2) => await fetch(qry2, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...this.requireAmountsAsStrings(this.commonHeaders())
        },
        body
      }),
      qry,
      new URLSearchParams({}),
      "Location: getUtxosByOutRef. Error: Could not fetch UTxOs by references from Maestro"
    );
    return utxos.map(this.maestroUtxoToUtxo);
  }
  async getDelegation(rewardAddress) {
    const timestampedResultResponse = await fetch(
      `${this.url}/accounts/${rewardAddress}`,
      { headers: this.commonHeaders() }
    );
    if (!timestampedResultResponse.ok) {
      return { poolId: null, rewards: 0n };
    }
    const timestampedResult = await timestampedResultResponse.json();
    const result = timestampedResult.data;
    return {
      poolId: result.delegated_pool || null,
      rewards: BigInt(result.rewards_available)
    };
  }
  async getDatum(datumHash) {
    const timestampedResultResponse = await fetch(
      `${this.url}/datums/${datumHash}`,
      {
        headers: this.commonHeaders()
      }
    );
    if (!timestampedResultResponse.ok) {
      if (timestampedResultResponse.status === 404) {
        throw new Error(`No datum found for datum hash: ${datumHash}`);
      } else {
        throw new Error(
          "Location: getDatum. Error: Couldn't successfully perform query. Received status code: " + timestampedResultResponse.status
        );
      }
    }
    const timestampedResult = await timestampedResultResponse.json();
    return timestampedResult.data.bytes;
  }
  awaitTx(txHash, checkInterval = 3e3) {
    return new Promise((res) => {
      const confirmation = setInterval(async () => {
        const isConfirmedResponse = await fetch(
          `${this.url}/transactions/${txHash}/cbor`,
          {
            headers: this.commonHeaders()
          }
        );
        if (isConfirmedResponse.ok) {
          await isConfirmedResponse.json();
          clearInterval(confirmation);
          await new Promise((res2) => setTimeout(() => res2(1), 1e3));
          return res(true);
        }
      }, checkInterval);
    });
  }
  async submitTx(tx) {
    let queryUrl = `${this.url}/txmanager`;
    queryUrl += this.turboSubmit ? "/turbosubmit" : "";
    const response = await fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/cbor",
        Accept: "text/plain",
        ...this.commonHeaders()
      },
      body: fromHex(tx)
    });
    const result = await response.text();
    if (!response.ok) {
      if (response.status === 400)
        throw new Error(result);
      else {
        throw new Error(
          "Could not submit transaction. Received status code: " + response.status
        );
      }
    }
    return result;
  }
  commonHeaders() {
    return { "api-key": this.apiKey, translucent: packageJson.version };
  }
  requireAmountsAsStrings(obj) {
    return { ...obj, "amounts-as-strings": "true" };
  }
  maestroUtxoToUtxo(result) {
    return {
      txHash: result.tx_hash,
      outputIndex: result.index,
      assets: (() => {
        const a = {};
        result.assets.forEach((am) => {
          a[am.unit] = BigInt(am.amount);
        });
        return a;
      })(),
      address: result.address,
      datumHash: result.datum ? result.datum.type == "inline" ? void 0 : result.datum.hash : void 0,
      datum: result.datum?.bytes,
      scriptRef: result.reference_script ? result.reference_script.type == "native" ? void 0 : {
        type: result.reference_script.type == "plutusv1" ? "PlutusV1" : "PlutusV2",
        script: applyDoubleCborEncoding(result.reference_script.bytes)
      } : void 0
    };
  }
  async getAllPagesData(getResponse, qry, paramsGiven, errorMsg) {
    let nextCursor = null;
    let result = [];
    while (true) {
      if (nextCursor !== null) {
        paramsGiven.set("cursor", nextCursor);
      }
      const response = await getResponse(`${qry}?` + paramsGiven);
      const pageResult = await response.json();
      if (!response.ok) {
        throw new Error(
          `${errorMsg}. Received status code: ${response.status}`
        );
      }
      nextCursor = pageResult.next_cursor;
      result = result.concat(pageResult.data);
      if (nextCursor == null)
        break;
    }
    return result;
  }
}

class AbstractWallet {
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ChainedWallet {
  constructor(translucent, wallet) {
    __publicField(this, "translucent");
    __publicField(this, "wallet");
    __publicField(this, "utxos", []);
    this.translucent = translucent;
    this.wallet = wallet;
    wallet.getUtxos().then((utxos) => this.utxos = utxos);
  }
  async refreshUtxos() {
    this.utxos = await this.wallet.getUtxos();
  }
  async chain(tx, predicate) {
    const txCore = exports.C.Transaction.from_bytes(fromHex(tx));
    const hash = exports.C.hash_transaction(txCore.body());
    const inputs = txCore.body().inputs();
    const outputs = txCore.body().outputs();
    const toConsume = {};
    for (let i = 0; i < inputs.len(); i++) {
      const input = inputs.get(i);
      toConsume[input.transaction_id().to_hex() + input.index()] = true;
    }
    this.utxos = this.utxos.filter(
      (utxo) => toConsume[utxo.txHash + utxo.outputIndex.toString()] == true
    );
    for (let i = 0; i < outputs.len(); i++) {
      const output = exports.C.TransactionUnspentOutput.new(
        exports.C.TransactionInput.new(hash, exports.C.BigNum.from_str(i.toString())),
        outputs.get(i)
      );
      const utxo = coreToUtxo(output);
      if (predicate(utxo)) {
        this.utxos.push(utxo);
      }
    }
  }
  address() {
    return this.wallet.address();
  }
  rewardAddress() {
    return this.wallet.rewardAddress();
  }
  getUtxos() {
    return Promise.resolve(this.utxos);
  }
  getUtxosCore() {
    const outputs = exports.C.TransactionUnspentOutputs.new();
    const utxos = this.utxos.map(utxoToCore);
    for (const utxo of utxos) {
      outputs.add(utxo);
    }
    return Promise.resolve(outputs);
  }
  getDelegation() {
    return this.wallet.getDelegation();
  }
  signTx(tx) {
    return this.wallet.signTx(tx);
  }
  signMessage(address, payload) {
    return this.wallet.signMessage(address, payload);
  }
  submitTx(signedTx) {
    return this.wallet.submitTx(signedTx);
  }
}

exports.AbstractWallet = AbstractWallet;
exports.ChainedWallet = ChainedWallet;
exports.Constr = Constr;
exports.Data = Data;
exports.Emulator = Emulator;
exports.ExternalWallet = ExternalWallet;
exports.Kupmios = Kupmios;
exports.KupmiosV5 = KupmiosV5;
exports.Maestro = Maestro;
exports.PROTOCOL_PARAMETERS_DEFAULT = PROTOCOL_PARAMETERS_DEFAULT;
exports.PrivateKeyWallet = PrivateKeyWallet;
exports.SLOT_CONFIG_NETWORK = SLOT_CONFIG_NETWORK;
exports.SeedWallet = SeedWallet;
exports.Translucent = Translucent;
exports.Tx = Tx;
exports.TxComplete = TxComplete;
exports.TxSigned = TxSigned;
exports.Utils = Utils;
exports.WalletConnector = WalletConnector;
exports.addAssets = addAssets;
exports.applyDoubleCborEncoding = applyDoubleCborEncoding;
exports.applyParamsToScript = applyParamsToScript;
exports.assetsToValue = assetsToValue;
exports.coreToUtxo = coreToUtxo;
exports.costModelKeys = costModelKeys;
exports.createCostModels = createCostModels;
exports.fromHex = fromHex;
exports.fromLabel = fromLabel;
exports.fromScriptRef = fromScriptRef;
exports.fromText = fromText;
exports.fromUnit = fromUnit;
exports.generatePrivateKey = generatePrivateKey;
exports.generateSeedPhrase = generateSeedPhrase;
exports.getAddressDetails = getAddressDetails;
exports.loadModule = loadModule;
exports.nativeScriptFromJson = nativeScriptFromJson;
exports.networkToId = networkToId;
exports.paymentCredentialOf = paymentCredentialOf;
exports.slotToBeginUnixTime = slotToBeginUnixTime;
exports.stakeCredentialOf = stakeCredentialOf;
exports.toHex = toHex;
exports.toLabel = toLabel;
exports.toPublicKey = toPublicKey;
exports.toScriptRef = toScriptRef;
exports.toText = toText;
exports.toUnit = toUnit;
exports.unixTimeToEnclosingSlot = unixTimeToEnclosingSlot;
exports.utxoToCore = utxoToCore;
exports.valueToAssets = valueToAssets;
//# sourceMappingURL=index.js.map
