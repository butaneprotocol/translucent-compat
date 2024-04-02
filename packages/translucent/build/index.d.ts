import * as _emurgo_cardano_message_signing_nodejs from '@emurgo/cardano-message-signing-nodejs';
import * as uplc_node from 'uplc-node';
import * as _dcspark_cardano_multiplatform_lib_nodejs from '@dcspark/cardano-multiplatform-lib-nodejs';
import { Value, ScriptRef as ScriptRef$1, TransactionUnspentOutput, Transaction as Transaction$1, TransactionBuilder, TransactionUnspentOutputs, TransactionWitnessSet, TransactionBuilderConfig, Ed25519KeyHash } from '@dcspark/cardano-multiplatform-lib-nodejs';
export { Address as CAddress, BigNum as CBigNum, ByronAddress as CByronAddress, CertificateBuilderResult as CCertificateBuilderResult, Ed25519KeyHash as CEd25519KeyHash, Ed25519KeyHashes as CEd25519KeyHashes, InputBuilderResult as CInputBuilderResult, MintBuilderResult as CMintBuilderResult, NativeScript as CNativeScript, PlutusData as CPlutusData, PlutusScript as CPlutusScript, PlutusV2Script as CPlutusV2Script, PoolRegistration as CPoolRegistration, PrivateKey as CPrivateKey, Redeemer as CRedeemer, ScriptRef as CScriptRef, StakeCredential as CStakeCredential, Transaction as CTransaction, TransactionBuilder as CTransactionBuilder, TransactionBuilderConfig as CTransactionBuilderConfig, TransactionUnspentOutput as CTransactionUnspentOutput, TransactionUnspentOutputs as CTransactionUnspentOutputs, TransactionWitnessSet as CTransactionWitnessSet, Value as CValue, WithdrawalBuilderResult as CWithdrawalBuilderResult } from '@dcspark/cardano-multiplatform-lib-nodejs';
import * as _sinclair_typebox from '@sinclair/typebox';
import { TSchema, Static, TProperties, TLiteralValue, TLiteral } from '@sinclair/typebox';

type CModule = typeof _dcspark_cardano_multiplatform_lib_nodejs;
type UModule = typeof uplc_node;
type MModule = typeof _emurgo_cardano_message_signing_nodejs;
declare let C: CModule;
declare let U: UModule;
declare let M: MModule;
declare function loadModule(): Promise<void>;

declare global {
    namespace NodeJS {
        interface Process {
            browser: boolean;
        }
    }
}

type CostModel = Record<string, number>;
type CostModels = Record<PlutusVersion, CostModel>;
type ProtocolParameters = {
    minFeeA: number;
    minFeeB: number;
    maxTxSize: number;
    maxValSize: number;
    keyDeposit: bigint;
    poolDeposit: bigint;
    priceMem: [bigint, bigint];
    priceStep: [bigint, bigint];
    maxTxExMem: bigint;
    maxTxExSteps: bigint;
    coinsPerUtxoByte: bigint;
    collateralPercentage: number;
    maxCollateralInputs: number;
    costModels: CostModels;
};
type Slot = number;
interface Provider {
    getProtocolParameters(): Promise<ProtocolParameters>;
    /** Query UTxOs by address or payment credential. */
    getUtxos(addressOrCredential: Address | Credential): Promise<UTxO[]>;
    /** Query UTxOs by address or payment credential filtered by a specific unit. */
    getUtxosWithUnit(addressOrCredential: Address | Credential, unit: Unit): Promise<UTxO[]>;
    /** Query a UTxO by a unit. It needs to be an NFT (or optionally the entire supply in one UTxO). */
    getUtxoByUnit(unit: Unit): Promise<UTxO>;
    /** Query UTxOs by the output reference (tx hash and index). */
    getUtxosByOutRef(outRefs: Array<OutRef>): Promise<UTxO[]>;
    getDelegation(rewardAddress: RewardAddress): Promise<Delegation>;
    getDatum(datumHash: DatumHash): Promise<Datum>;
    awaitTx(txHash: TxHash, checkInterval?: number): Promise<boolean>;
    submitTx(tx: Transaction): Promise<TxHash>;
}
type Credential = {
    type: "Key" | "Script";
    hash: KeyHash | ScriptHash;
};
/** Concatenation of policy id and asset name in Hex. */
type Unit = string;
type Assets = Record<Unit | "lovelace", bigint>;
type ScriptType = "Native" | PlutusVersion;
type PlutusVersion = "PlutusV1" | "PlutusV2";
/** Hex */
type PolicyId = string;
type Script = {
    type: ScriptType;
    script: string;
};
type Validator = MintingPolicy | SpendingValidator | CertificateValidator | WithdrawalValidator;
type MintingPolicy = Script;
type SpendingValidator = Script;
type CertificateValidator = Script;
type WithdrawalValidator = Script;
/** Bech32 */
type Address = string;
/** Bech32 */
type RewardAddress = string;
/** Hex */
type PaymentKeyHash = string;
/** Hex */
type StakeKeyHash = string;
/** Hex */
type KeyHash = string | PaymentKeyHash | StakeKeyHash;
/** Hex */
type VrfKeyHash = string;
/** Hex */
type ScriptHash = string;
/** Hex */
type TxHash = string;
/** Bech32 */
type PoolId = string;
/** Hex */
type Datum = string;
/**
 * **hash** adds the datum hash to the output.
 *
 * **asHash** hashes the datum and adds the datum hash to the output and the datum to the witness set.
 *
 * **inline** adds the datum to the output.
 *
 * **scriptRef** will add any script to the output.
 *
 * You can either specify **hash**, **asHash** or **inline**, only one option is allowed.
 */
type OutputData = {
    hash?: DatumHash;
    asHash?: Datum;
    inline?: Datum;
    scriptRef?: Script;
};
/** Hex */
type DatumHash = string;
/** Hex (Redeemer is only PlutusData, same as Datum) */
type Redeemer = string;
type Lovelace = bigint;
type Label = number;
/** Hex */
type TransactionWitnesses = string;
/** Hex */
type Transaction = string;
/** Bech32 */
type PrivateKey = string;
/** Bech32 */
type PublicKey = string;
/** Hex */
type ScriptRef = string;
/** Hex */
type Payload = string;
type UTxO = {
    txHash: TxHash;
    outputIndex: number;
    assets: Assets;
    address: Address;
    datumHash?: DatumHash | null;
    datum?: Datum | null;
    scriptRef?: Script | null;
};
type OutRef = {
    txHash: TxHash;
    outputIndex: number;
};
type AddressType = "Base" | "Enterprise" | "Pointer" | "Reward" | "Byron";
type Network = "Mainnet" | "Preview" | "Preprod" | "Custom";
type AddressDetails = {
    type: AddressType;
    networkId: number;
    address: {
        bech32: Address;
        hex: string;
    };
    paymentCredential?: Credential;
    stakeCredential?: Credential;
};
type Delegation = {
    poolId: PoolId | null;
    rewards: Lovelace;
};
type SignedMessage = {
    signature: string;
    key: string;
};
/** JSON object */
type Json = any;
/** Time in milliseconds */
type UnixTime = number;
type PoolParams = {
    poolId: PoolId;
    vrfKeyHash: VrfKeyHash;
    pledge: Lovelace;
    cost: Lovelace;
    margin: [bigint, bigint];
    rewardAddress: RewardAddress;
    owners: Array<RewardAddress>;
    relays: Array<Relay>;
    metadataUrl?: string;
};
type Relay = {
    type: "SingleHostIp" | "SingleHostDomainName" | "MultiHost";
    ipV4?: string;
    ipV6?: string;
    port?: number;
    domainName?: string;
};
type NativeScript = {
    type: "sig";
    keyHash: KeyHash;
} | {
    type: "all";
    scripts: NativeScript[];
} | {
    type: "any";
    scripts: NativeScript[];
} | {
    type: "before";
    slot: Slot;
} | {
    type: "after";
    slot: Slot;
} | {
    type: "atLeast";
    required: number;
    scripts: NativeScript[];
};
type SlotConfig = {
    zeroTime: UnixTime;
    zeroSlot: Slot;
    slotLength: number;
};
type Exact<T> = T extends infer U ? U : never;
type Metadata = {
    222: {
        name: string;
        image: string;
        mediaType?: string;
        description?: string;
        files?: {
            name?: string;
            mediaType: string;
            src: string;
        }[];
        [key: string]: Json;
    };
    333: {
        name: string;
        description: string;
        ticker?: string;
        url?: string;
        logo?: string;
        decimals?: number;
        [key: string]: Json;
    };
    444: Metadata["222"] & {
        decimals?: number;
    };
};

declare function createCostModels(costModels: CostModels): _dcspark_cardano_multiplatform_lib_nodejs.Costmdls;
declare const PROTOCOL_PARAMETERS_DEFAULT: ProtocolParameters;
declare const costModelKeys: {
    PlutusV1: string[];
    PlutusV2: string[];
};

type WalletApi = {
    getNetworkId(): Promise<number>;
    getUtxos(): Promise<string[] | undefined>;
    getBalance(): Promise<string>;
    getUsedAddresses(): Promise<string[]>;
    getUnusedAddresses(): Promise<string[]>;
    getChangeAddress(): Promise<string>;
    getRewardAddresses(): Promise<string[]>;
    signTx(tx: string, partialSign: boolean): Promise<string>;
    signData(address: string, payload: string): Promise<{
        signature: string;
        key: string;
    }>;
    submitTx(tx: string): Promise<string>;
    getCollateral(): Promise<string[]>;
    experimental: {
        getCollateral(): Promise<string[]>;
        on(eventName: string, callback: (...args: unknown[]) => void): void;
        off(eventName: string, callback: (...args: unknown[]) => void): void;
    };
};
type Cardano = {
    [key: string]: {
        name: string;
        icon: string;
        apiVersion: string;
        enable(): Promise<WalletApi>;
        isEnabled(): Promise<boolean>;
    };
};
declare global {
    interface Window {
        cardano: Cardano;
    }
}

declare class Constr<T> {
    index: number;
    fields: T[];
    constructor(index: number, fields: T[]);
}
declare namespace Data {
    type Static<T extends TSchema, P extends unknown[] = []> = Static<T, P>;
}
type Data = bigint | string | Array<Data> | Map<Data, Data> | Constr<Data>;
declare const Data: {
    Integer: (options?: {
        minimum?: number;
        maximum?: number;
        exclusiveMinimum?: number;
        exclusiveMaximum?: number;
    }) => _sinclair_typebox.TUnsafe<bigint>;
    Bytes: (options?: {
        minLength?: number;
        maxLength?: number;
        enum?: string[];
    }) => _sinclair_typebox.TUnsafe<string>;
    Boolean: () => _sinclair_typebox.TUnsafe<boolean>;
    Any: () => _sinclair_typebox.TUnsafe<Data>;
    Array: <T extends TSchema>(items: T, options?: {
        minItems?: number;
        maxItems?: number;
        uniqueItems?: boolean;
    }) => _sinclair_typebox.TArray<T>;
    Map: <T_1 extends TSchema, U extends TSchema>(keys: T_1, values: U, options?: {
        minItems?: number;
        maxItems?: number;
    }) => _sinclair_typebox.TUnsafe<Map<Data.Static<T_1, []>, Data.Static<U, []>>>;
    /**
     * Object applies by default a PlutusData Constr with index 0.\
     * Set 'hasConstr' to false to serialize Object as PlutusData List.
     */
    Object: <T_2 extends TProperties>(properties: T_2, options?: {
        hasConstr?: boolean;
    }) => _sinclair_typebox.TObject<T_2>;
    Enum: <T_3 extends TSchema>(items: T_3[]) => _sinclair_typebox.TUnion<T_3[]>;
    /**
     * Tuple is by default a PlutusData List.\
     * Set 'hasConstr' to true to apply a PlutusData Constr with index 0.
     */
    Tuple: <T_4 extends TSchema[]>(items: [...T_4], options?: {
        hasConstr?: boolean;
    }) => _sinclair_typebox.TTuple<T_4>;
    Literal: <T_5 extends TLiteralValue>(title: T_5) => TLiteral<T_5>;
    Nullable: <T_6 extends TSchema>(item: T_6) => _sinclair_typebox.TUnsafe<Data.Static<T_6, []> | null>;
    /**
     * Convert PlutusData to Cbor encoded data.\
     * Or apply a shape and convert the provided data struct to Cbor encoded data.
     */
    to: typeof to;
    /** Convert Cbor encoded data to PlutusData */
    from: typeof from;
    /**
     * Note Constr cannot be used here.\
     * Strings prefixed with '0x' are not UTF-8 encoded.
     */
    fromJson: typeof fromJson;
    /**
     * Note Constr cannot be used here, also only bytes/integers as Json keys.\
     */
    toJson: typeof toJson;
    void: () => Datum | Redeemer;
    castFrom: typeof castFrom;
    castTo: typeof castTo;
};
/**
 * Convert PlutusData to Cbor encoded data.\
 * Or apply a shape and convert the provided data struct to Cbor encoded data.
 */
declare function to<T = Data>(data: Exact<T>, type?: T, recType?: string): Datum | Redeemer;
/**
 *  Convert Cbor encoded data to Data.\
 *  Or apply a shape and cast the cbor encoded data to a certain type.
 */
declare function from<T = Data>(raw: Datum | Redeemer, type?: T): T;
/**
 * Note Constr cannot be used here.\
 * Strings prefixed with '0x' are not UTF-8 encoded.
 */
declare function fromJson(json: Json): Data;
/**
 * Note Constr cannot be used here, also only bytes/integers as Json keys.\
 */
declare function toJson(plutusData: Data): Json;
declare function castFrom<T = Data>(data: Data, type: T): T;
declare function castTo<T>(struct: Exact<T>, type: T, recType?: string, recShape?: {
    recType: string;
    shape: T;
    shapeType: string;
}): Data;

declare class Utils {
    private translucent;
    constructor(translucent: Translucent);
    validatorToAddress(validator: SpendingValidator, stakeCredential?: Credential): Address;
    credentialToAddress(paymentCredential: Credential, stakeCredential?: Credential): Address;
    validatorToRewardAddress(validator: CertificateValidator | WithdrawalValidator): RewardAddress;
    credentialToRewardAddress(stakeCredential: Credential): RewardAddress;
    validatorToScriptHash(validator: Validator): ScriptHash;
    mintingPolicyToId(mintingPolicy: MintingPolicy): PolicyId;
    datumToHash(datum: Datum): DatumHash;
    scriptHashToCredential(scriptHash: ScriptHash): Credential;
    keyHashToCredential(keyHash: KeyHash): Credential;
    generatePrivateKey(): PrivateKey;
    generateSeedPhrase(): string;
    unixTimeToSlot(unixTime: UnixTime): Slot;
    slotToUnixTime(slot: Slot): UnixTime;
    /** Address can be in Bech32 or Hex. */
    getAddressDetails(address: string): AddressDetails;
    /**
     * Convert a native script from Json to the Hex representation.
     * It follows this Json format: https://github.com/input-output-hk/cardano-node/blob/master/doc/reference/simple-scripts.md
     */
    nativeScriptFromJson(nativeScript: NativeScript): Script;
    paymentCredentialOf(address: Address): Credential;
    stakeCredentialOf(rewardAddress: RewardAddress): Credential;
}
/** Address can be in Bech32 or Hex. */
declare function getAddressDetails(address: string): AddressDetails;
declare function paymentCredentialOf(address: Address): Credential;
declare function stakeCredentialOf(rewardAddress: RewardAddress): Credential;
declare function generatePrivateKey(): PrivateKey;
declare function generateSeedPhrase(): string;
declare function valueToAssets(value: Value): Assets;
declare function assetsToValue(assets: Assets): Value;
declare function fromScriptRef(scriptRef: ScriptRef$1): Script;
declare function toScriptRef(script: Script): ScriptRef$1;
declare function utxoToCore(utxo: UTxO): TransactionUnspentOutput;
declare function coreToUtxo(coreUtxo: TransactionUnspentOutput): UTxO;
declare function networkToId(network: Network): number;
declare function fromHex(hex: string): Uint8Array;
declare function toHex(bytes: Uint8Array): string;
/** Convert a Hex encoded string to a Utf-8 encoded string. */
declare function toText(hex: string): string;
/** Convert a Utf-8 encoded string to a Hex encoded string. */
declare function fromText(text: string): string;
declare function toPublicKey(privateKey: PrivateKey): PublicKey;
declare function toLabel(num: number): string;
declare function fromLabel(label: string): number | null;
/**
 * @param name Hex encoded
 */
declare function toUnit(policyId: PolicyId, name?: string | null, label?: number | null): Unit;
/**
 * Splits unit into policy id, asset name (entire asset name), name (asset name without label) and label if applicable.
 * name will be returned in Hex.
 */
declare function fromUnit(unit: Unit): {
    policyId: PolicyId;
    assetName: string | null;
    name: string | null;
    label: number | null;
};
/**
 * Convert a native script from Json to the Hex representation.
 * It follows this Json format: https://github.com/input-output-hk/cardano-node/blob/master/doc/reference/simple-scripts.md
 */
declare function nativeScriptFromJson(nativeScript: NativeScript): Script;
declare function applyParamsToScript<T extends unknown[] = Data[]>(plutusScript: string, params: Exact<[...T]>, type?: T): string;
/** Returns double cbor encoded script. If script is already double cbor encoded it's returned as it is. */
declare function applyDoubleCborEncoding(script: string): string;
declare function addAssets(...assets: Assets[]): Assets;

declare class TxSigned {
    txSigned: Transaction$1;
    private translucent;
    constructor(translucent: Translucent, tx: Transaction$1);
    submit(): Promise<TxHash>;
    /** Returns the transaction in Hex encoded Cbor. */
    toString(): Transaction;
    /** Return the transaction hash. */
    toHash(): TxHash;
}

declare class TxComplete {
    txComplete: Transaction$1;
    witnessSetBuilder: _dcspark_cardano_multiplatform_lib_nodejs.TransactionWitnessSetBuilder;
    private tasks;
    private translucent;
    fee: number;
    exUnits: {
        cpu: number;
        mem: number;
    } | null;
    constructor(translucent: Translucent, tx: Transaction$1);
    sign(): TxComplete;
    /** Add an extra signature from a private key. */
    signWithPrivateKey(privateKey: PrivateKey): TxComplete;
    /** Sign the transaction and return the witnesses that were just made. */
    partialSign(): Promise<TransactionWitnesses>;
    /**
     * Sign the transaction and return the witnesses that were just made.
     * Add an extra signature from a private key.
     */
    partialSignWithPrivateKey(privateKey: PrivateKey): TransactionWitnesses;
    /** Sign the transaction with the given witnesses. */
    assemble(witnesses: TransactionWitnesses[]): TxComplete;
    complete(): Promise<TxSigned>;
    /** Return the transaction in Hex encoded Cbor. */
    toString(): Transaction;
    /** Return the transaction hash. */
    toHash(): TxHash;
}

declare class Tx {
    txBuilder: TransactionBuilder;
    private scripts;
    private native_scripts;
    /** Stores the tx instructions, which get executed after calling .complete() */
    private tasks;
    private earlyTasks;
    private translucent;
    private UTxOs;
    private referencedUTxOs;
    constructor(translucent: Translucent);
    /** Read data from utxos. These utxos are only referenced and not spent. */
    readFrom(utxos: UTxO[]): Tx;
    /**
     * A public key or native script input.
     * With redeemer it's a plutus script input.
     */
    collectFrom(utxos: UTxO[], redeemer?: Redeemer): Tx;
    /**
     * All assets should be of the same policy id.
     * You can chain mintAssets functions together if you need to mint assets with different policy ids.
     * If the plutus script doesn't need a redeemer, you still need to specifiy the void redeemer.
     */
    mintAssets(assets: Assets, redeemer?: Redeemer): Tx;
    /** Pay to a public key or native script address. */
    payToAddress(address: Address, assets: Assets): Tx;
    /** Pay to a public key or native script address with datum or scriptRef. */
    payToAddressWithData(address: Address, outputData: Datum | OutputData, assets: Assets): Tx;
    /** Pay to a plutus script address with datum or scriptRef. */
    payToContract(address: Address, outputData: Datum | OutputData, assets: Assets): Tx;
    /** Delegate to a stake pool. */
    delegateTo(rewardAddress: RewardAddress, poolId: PoolId, redeemer?: Redeemer): Tx;
    /** Register a reward address in order to delegate to a pool and receive rewards. */
    registerStake(rewardAddress: RewardAddress): Tx;
    /** Deregister a reward address. */
    deregisterStake(rewardAddress: RewardAddress, redeemer?: Redeemer): Tx;
    /** Register a stake pool. A pool deposit is required. The metadataUrl needs to be hosted already before making the registration. */
    /**
     * Retire a stake pool. The epoch needs to be the greater than the current epoch + 1 and less than current epoch + eMax.
     * The pool deposit will be sent to reward address as reward after full retirement of the pool.
     */
    retirePool(poolId: PoolId, epoch: number): Tx;
    withdraw(rewardAddress: RewardAddress, amount: Lovelace, redeemer?: Redeemer): Tx;
    /**
     * Needs to be a public key address.
     * The PaymentKeyHash is taken when providing a Base, Enterprise or Pointer address.
     * The StakeKeyHash is taken when providing a Reward address.
     */
    addSigner(address: Address | RewardAddress): Tx;
    /** Add a payment or stake key hash as a required signer of the transaction. */
    addSignerKey(keyHash: PaymentKeyHash | StakeKeyHash): Tx;
    validFrom(unixTime: UnixTime): Tx;
    validTo(unixTime: UnixTime): Tx;
    attachMetadata(label: Label, metadata: Json): Tx;
    /** Converts strings to bytes if prefixed with **'0x'**. */
    attachMetadataWithConversion(label: Label, metadata: Json): Tx;
    attachMetadataWithDetailedConversion(label: Label, metadata: Json): Tx;
    /** Explicitely set the network id in the transaction body. */
    addNetworkId(id: number): Tx;
    attachSpendingValidator(spendingValidator: SpendingValidator): Tx;
    attachMintingPolicy(mintingPolicy: MintingPolicy): Tx;
    attachCertificateValidator(certValidator: CertificateValidator): Tx;
    attachWithdrawalValidator(withdrawalValidator: WithdrawalValidator): Tx;
    attachScript({ type, script, }: SpendingValidator | MintingPolicy | CertificateValidator | WithdrawalValidator): void;
    /** Compose transactions. */
    compose(tx: Tx | null): Tx;
    complete(options?: {
        change?: {
            address?: Address;
            outputData?: OutputData;
        };
        coinSelection?: boolean;
        overEstimateMem?: number;
        overEstimateSteps?: number;
    }): Promise<TxComplete>;
    /** Return the current transaction body in Hex encoded Cbor. */
    toString(): Promise<string>;
}

declare class Message {
    translucent: Translucent;
    address: Address | RewardAddress;
    payload: Payload;
    constructor(translucent: Translucent, address: Address | RewardAddress, payload: Payload);
    /** Sign message with selected wallet. */
    sign(): Promise<SignedMessage>;
    /** Sign message with a separate private key. */
    signWithPrivateKey(privateKey: PrivateKey): SignedMessage;
}

declare abstract class AbstractWallet {
    abstract address(): Promise<Address>;
    abstract rewardAddress(): Promise<RewardAddress | null>;
    abstract getUtxos(): Promise<UTxO[]>;
    abstract getUtxosCore(): Promise<TransactionUnspentOutputs>;
    abstract getDelegation(): Promise<Delegation>;
    abstract signTx(tx: Transaction$1): Promise<TransactionWitnessSet>;
    abstract signMessage(address: Address | RewardAddress, payload: Payload): Promise<SignedMessage>;
    abstract submitTx(signedTx: Transaction): Promise<TxHash>;
}

declare class Translucent {
    txBuilderConfig: TransactionBuilderConfig;
    wallet: AbstractWallet;
    provider: Provider;
    network: Network;
    utils: Utils;
    static new(provider?: Provider, network?: Network): Promise<Translucent>;
    /**
     * Switch provider and/or network.
     * If provider or network unset, no overwriting happens. Provider or network from current instance are taken then.
     */
    switchProvider(provider?: Provider, network?: Network): Promise<Translucent>;
    newTx(): Tx;
    fromTx(tx: Transaction): TxComplete;
    /** Signs a message. Expects the payload to be Hex encoded. */
    newMessage(address: Address | RewardAddress, payload: Payload): Message;
    /** Verify a message. Expects the payload to be Hex encoded. */
    verifyMessage(address: Address | RewardAddress, payload: Payload, signedMessage: SignedMessage): boolean;
    currentSlot(): Slot;
    utxosAt(addressOrCredential: Address | Credential): Promise<UTxO[]>;
    utxosAtWithUnit(addressOrCredential: Address | Credential, unit: Unit): Promise<UTxO[]>;
    /** Unit needs to be an NFT (or optionally the entire supply in one UTxO). */
    utxoByUnit(unit: Unit): Promise<UTxO>;
    utxosByOutRef(outRefs: Array<OutRef>): Promise<UTxO[]>;
    delegationAt(rewardAddress: RewardAddress): Promise<Delegation>;
    awaitTx(txHash: TxHash, checkInterval?: number): Promise<boolean>;
    datumOf<T = Data>(utxo: UTxO, type?: T): Promise<T>;
    /** Query CIP-0068 metadata for a specifc asset. */
    metadataOf<T = Json>(unit: Unit): Promise<T>;
    selectWalletFromPrivateKey(privateKey: PrivateKey): Translucent;
    selectWallet(api: WalletApi): Translucent;
    selectWalletFrom(address: Address, utxos?: UTxO[], rewardAddress?: RewardAddress): Translucent;
    selectWalletFromSeed(seed: string, options?: {
        addressType?: "Base" | "Enterprise";
        accountIndex?: number;
        password?: string;
    }): Translucent;
    useWallet(wallet: AbstractWallet): this;
}

declare class Kupmios implements Provider {
    kupoUrl: string;
    ogmiosUrl: string;
    headers?: any;
    /**
     * This provider is based on Kupo + Ogmios v6.
     * This is a way to support both ogmios 5.6 and 6.0 until 6.0 is released as stable and the Conway hard-fork is done.
     * @param kupoUrl: http(s)://localhost:1442
     * @param ogmiosUrl: ws(s)://localhost:1337
     */
    constructor(kupoUrl: string, ogmiosUrl: string, headers?: any);
    getProtocolParameters(): Promise<ProtocolParameters>;
    getUtxos(addressOrCredential: Address | Credential): Promise<UTxO[]>;
    getUtxosWithUnit(addressOrCredential: Address | Credential, unit: Unit): Promise<UTxO[]>;
    getUtxoByUnit(unit: Unit): Promise<UTxO>;
    getUtxosByOutRef(outRefs: Array<OutRef>): Promise<UTxO[]>;
    getDelegation(rewardAddress: RewardAddress): Promise<Delegation>;
    getDatum(datumHash: DatumHash): Promise<Datum>;
    awaitTx(txHash: TxHash, checkInterval?: number): Promise<boolean>;
    submitTx(tx: Transaction): Promise<TxHash>;
    private ogmiosWsp;
}

declare class KupmiosV5 implements Provider {
    kupoUrl: string;
    ogmiosUrl: string;
    /**
     * This provider is based on Kupo + Ogmios v5.6.
     * This is a way to support both ogmios 5.6 and 6.0 until 6.0 is released as stable and the Conway hard-fork is done.
     * @param kupoUrl: http(s)://localhost:1442
     * @param ogmiosUrl: ws(s)://localhost:1337
     */
    constructor(kupoUrl: string, ogmiosUrl: string);
    getProtocolParameters(): Promise<ProtocolParameters>;
    getUtxos(addressOrCredential: Address | Credential): Promise<UTxO[]>;
    getUtxosWithUnit(addressOrCredential: Address | Credential, unit: Unit): Promise<UTxO[]>;
    getUtxoByUnit(unit: Unit): Promise<UTxO>;
    getUtxosByOutRef(outRefs: Array<OutRef>): Promise<UTxO[]>;
    getDelegation(rewardAddress: RewardAddress): Promise<Delegation>;
    getDatum(datumHash: DatumHash): Promise<Datum>;
    awaitTx(txHash: TxHash, checkInterval?: number): Promise<boolean>;
    submitTx(tx: Transaction): Promise<TxHash>;
    private kupmiosUtxosToUtxos;
    private ogmiosWsp;
}

type MaestroSupportedNetworks = "Mainnet" | "Preprod" | "Preview";
interface MaestroConfig {
    network: MaestroSupportedNetworks;
    apiKey: string;
    turboSubmit?: boolean;
}
declare class Maestro implements Provider {
    url: string;
    apiKey: string;
    turboSubmit: boolean;
    constructor({ network, apiKey, turboSubmit }: MaestroConfig);
    getProtocolParameters(): Promise<ProtocolParameters>;
    private getUtxosInternal;
    getUtxos(addressOrCredential: Address | Credential): Promise<UTxO[]>;
    getUtxosWithUnit(addressOrCredential: Address | Credential, unit: Unit): Promise<UTxO[]>;
    getUtxoByUnit(unit: Unit): Promise<UTxO>;
    getUtxosByOutRef(outRefs: OutRef[]): Promise<UTxO[]>;
    getDelegation(rewardAddress: RewardAddress): Promise<Delegation>;
    getDatum(datumHash: DatumHash): Promise<Datum>;
    awaitTx(txHash: TxHash, checkInterval?: number): Promise<boolean>;
    submitTx(tx: Transaction): Promise<TxHash>;
    private commonHeaders;
    private requireAmountsAsStrings;
    private maestroUtxoToUtxo;
    private getAllPagesData;
}

/** Concatentation of txHash + outputIndex */
type FlatOutRef = string;
declare class Emulator implements Provider {
    ledger: Record<FlatOutRef, {
        utxo: UTxO;
        spent: boolean;
    }>;
    mempool: Record<FlatOutRef, {
        utxo: UTxO;
        spent: boolean;
    }>;
    /**
     * Only stake key registrations/delegations and rewards are tracked.
     * Other certificates are not tracked.
     */
    chain: Record<RewardAddress, {
        registeredStake: boolean;
        delegation: Delegation;
    }>;
    blockHeight: number;
    slot: number;
    time: UnixTime;
    protocolParameters: ProtocolParameters;
    datumTable: Record<DatumHash, Datum>;
    constructor(accounts: {
        address: Address;
        assets: Assets;
        outputData?: OutputData;
    }[], protocolParameters?: ProtocolParameters);
    now(): UnixTime;
    awaitSlot(length?: number): void;
    awaitBlock(height?: number): void;
    getUtxos(addressOrCredential: Address | Credential): Promise<UTxO[]>;
    getProtocolParameters(): Promise<ProtocolParameters>;
    getDatum(datumHash: DatumHash): Promise<Datum>;
    getUtxosWithUnit(addressOrCredential: Address | Credential, unit: Unit): Promise<UTxO[]>;
    getUtxosByOutRef(outRefs: OutRef[]): Promise<UTxO[]>;
    getUtxoByUnit(unit: string): Promise<UTxO>;
    getDelegation(rewardAddress: RewardAddress): Promise<Delegation>;
    awaitTx(txHash: string): Promise<boolean>;
    /**
     * Emulates the behaviour of the reward distribution at epoch boundaries.
     * Stake keys need to be registered and delegated like on a real chain in order to receive rewards.
     */
    distributeRewards(rewards: Lovelace): void;
    submitTx(tx: Transaction): Promise<TxHash>;
    log(): void;
}

declare class ChainedWallet implements AbstractWallet {
    translucent: Translucent;
    wallet: AbstractWallet;
    utxos: UTxO[];
    constructor(translucent: Translucent, wallet: AbstractWallet);
    refreshUtxos(): Promise<void>;
    chain(tx: Transaction, predicate: (utxo: UTxO) => boolean): Promise<void>;
    address(): Promise<Address>;
    rewardAddress(): Promise<RewardAddress | null>;
    getUtxos(): Promise<UTxO[]>;
    getUtxosCore(): Promise<TransactionUnspentOutputs>;
    getDelegation(): Promise<Delegation>;
    signTx(tx: Transaction$1): Promise<TransactionWitnessSet>;
    signMessage(address: Address | RewardAddress, payload: Payload): Promise<SignedMessage>;
    submitTx(signedTx: Transaction): Promise<TxHash>;
}

/**
 * Cardano Private key in bech32; not the BIP32 private key or any key that is not fully derived.
 * Only an Enteprise address (without stake credential) is derived.
 */
declare class PrivateKeyWallet implements AbstractWallet {
    translucent: Translucent;
    private privateKey;
    private priv;
    pubKeyHash: Ed25519KeyHash;
    constructor(translucent: Translucent, privateKey: PrivateKey);
    address(): Promise<Address>;
    rewardAddress(): Promise<RewardAddress | null>;
    getUtxos(): Promise<UTxO[]>;
    getUtxosCore(): Promise<TransactionUnspentOutputs>;
    getDelegation(): Promise<Delegation>;
    signTx(tx: Transaction$1): Promise<TransactionWitnessSet>;
    signMessage(address: Address | RewardAddress, payload: Payload): Promise<SignedMessage>;
    submitTx(tx: Transaction): Promise<TxHash>;
}

/**
 * A wallet that can be constructed from external data e.g utxos and an address.
 * It doesn't allow you to sign transactions/messages. This needs to be handled separately.
 */
declare class ExternalWallet implements AbstractWallet {
    translucent: Translucent;
    walletDetails: {
        address: Address;
        utxos?: UTxO[];
        rewardAddress?: RewardAddress;
    };
    addressDetails: AddressDetails;
    constructor(translucent: Translucent, address: Address, utxos?: UTxO[], rewardAddress?: RewardAddress);
    address(): Promise<Address>;
    rewardAddress(): Promise<RewardAddress | null>;
    getUtxos(): Promise<UTxO[]>;
    getUtxosCore(): Promise<TransactionUnspentOutputs>;
    getDelegation(): Promise<Delegation>;
    signTx(): Promise<TransactionWitnessSet>;
    signMessage(): Promise<SignedMessage>;
    submitTx(tx: Transaction): Promise<TxHash>;
}

/**
 * Select wallet from a seed phrase (e.g. 15 or 24 words). You have the option to choose between a Base address (with stake credential)
 * and Enterprise address (without stake credential). You can also decide which account index to derive. By default account 0 is derived.
 */
declare class SeedWallet implements AbstractWallet {
    translucent: Translucent;
    private address_;
    private rewardAddress_;
    private paymentKeyHash;
    private stakeKeyHash;
    private privKeyHashMap;
    constructor(translucent: Translucent, seed: string, options?: {
        addressType?: "Base" | "Enterprise";
        accountIndex?: number;
        password?: string;
    });
    address(): Promise<Address>;
    rewardAddress(): Promise<RewardAddress | null>;
    getUtxos(): Promise<UTxO[]>;
    getUtxosCore(): Promise<TransactionUnspentOutputs>;
    getDelegation(): Promise<Delegation>;
    signTx(tx: Transaction$1): Promise<TransactionWitnessSet>;
    signMessage(address: Address | RewardAddress, payload: Payload): Promise<SignedMessage>;
    submitTx(tx: Transaction): Promise<TxHash>;
}

declare class WalletConnector implements AbstractWallet {
    translucent: Translucent;
    api: WalletApi;
    constructor(translucent: Translucent, api: WalletApi);
    getAddressHex(): Promise<string>;
    address(): Promise<Address>;
    rewardAddress(): Promise<RewardAddress | null>;
    getUtxos(): Promise<UTxO[]>;
    getUtxosCore(): Promise<TransactionUnspentOutputs>;
    getDelegation(): Promise<Delegation>;
    signTx(tx: Transaction$1): Promise<TransactionWitnessSet>;
    signMessage(address: Address | RewardAddress, payload: Payload): Promise<SignedMessage>;
    submitTx(tx: Transaction): Promise<TxHash>;
}

declare const SLOT_CONFIG_NETWORK: Record<Network, SlotConfig>;
declare function slotToBeginUnixTime(slot: Slot, slotConfig: SlotConfig): UnixTime;
declare function unixTimeToEnclosingSlot(unixTime: UnixTime, slotConfig: SlotConfig): Slot;

export { AbstractWallet, type Address, type AddressDetails, type AddressType, type Assets, C, type Cardano, type CertificateValidator, ChainedWallet, Constr, type CostModels, type Credential, Data, type Datum, type DatumHash, type Delegation, Emulator, type Exact, ExternalWallet, type Json, type KeyHash, Kupmios, KupmiosV5, type Label, type Lovelace, M, Maestro, type MaestroConfig, type MaestroSupportedNetworks, type Metadata, type MintingPolicy, type NativeScript, type Network, type OutRef, type OutputData, PROTOCOL_PARAMETERS_DEFAULT, type Payload, type PaymentKeyHash, type PlutusVersion, type PolicyId, type PoolId, type PoolParams, type PrivateKey, PrivateKeyWallet, type ProtocolParameters, type Provider, type PublicKey, type Redeemer, type Relay, type RewardAddress, SLOT_CONFIG_NETWORK, type Script, type ScriptHash, type ScriptRef, type ScriptType, SeedWallet, type SignedMessage, type Slot, type SlotConfig, type SpendingValidator, type StakeKeyHash, type Transaction, type TransactionWitnesses, Translucent, Tx, TxComplete, type TxHash, TxSigned, U, type UTxO, type Unit, type UnixTime, Utils, type Validator, type VrfKeyHash, type WalletApi, WalletConnector, type WithdrawalValidator, addAssets, applyDoubleCborEncoding, applyParamsToScript, assetsToValue, coreToUtxo, costModelKeys, createCostModels, fromHex, fromLabel, fromScriptRef, fromText, fromUnit, generatePrivateKey, generateSeedPhrase, getAddressDetails, loadModule, nativeScriptFromJson, networkToId, paymentCredentialOf, slotToBeginUnixTime, stakeCredentialOf, toHex, toLabel, toPublicKey, toScriptRef, toText, toUnit, unixTimeToEnclosingSlot, utxoToCore, valueToAssets };
