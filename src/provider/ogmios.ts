export type PointOrOrigin = Point | Origin;
export type Slot = number;
export type DigestBlake2B256 = string;
export type Origin = "origin";
export type TipOrOrigin = Tip | Origin;
export type BlockHeight = number;
export type Block = BlockEBB | BlockBFT | BlockPraos;
export type Int64 = number;
export type TransactionId = string;
export type UInt32 = number;
export type Address = string;
export type AssetQuantity = bigint;
export type Datum = string;
export type Script = Native | Plutus;
export type ScriptNative = ClauseSignature | ClauseAny | ClauseAll | ClauseSome | ClauseBefore | ClauseAfter;
export type DigestBlake2B224 = string;
export type Certificate = StakeDelegation | StakeCredentialRegistration | StakeCredentialDeregistration | StakePoolRegistration | StakePoolRetirement | GenesisDelegation | ConstitutionalCommitteeHotKeyRegistration | ConstitutionalCommitteeRetirement | DelegateRepresentativeRegistration | DelegateRepresentativeUpdate | DelegateRepresentativeRetirement;
export type StakePoolId = string;
export type DelegateRepresentative = DelegateRepresentativeRegistered | DelegateRepresentativeNoConfidence | DelegateRepresentativeAbstain;
export type Ratio = string;
export type RewardAccount = string;
export type DigestAny = string;
export type Relay = RelayByAddress | RelayByName;
export type Epoch = number;
export type None = null;
export type Network = "mainnet" | "testnet";
export type UInt64 = number;
export type Nonce = Neutral | DigestBlake2B256;
export type Neutral = "neutral";
export type CostModel = Int64[];
export type Metadatum = Integer | String | ArrayMetadatum | ObjectMetadatum;
export type Integer = bigint;
export type String = string;
export type ArrayMetadatum = Metadatum[];
export type VerificationKey = string;
export type Signature = string;
export type ChainCode = string;
export type AddressAttributes = string;
export type RedeemerData = string;
export type BootstrapProtocolId = number;
export type ExtendedVerificationKey = string;
export type GenesisHash = "genesis";
export type VrfProof = string;
export type VrfOutput = string;
export type KesVerificationKey = string;
export type SubmitTransactionFailure = SubmitTransactionFailureEraMismatch | SubmitTransactionFailureInvalidSignatories | SubmitTransactionFailureMissingSignatories | SubmitTransactionFailureMissingScripts | SubmitTransactionFailureFailingNativeScript | SubmitTransactionFailureExtraneousScripts | SubmitTransactionFailureMissingMetadataHash | SubmitTransactionFailureMissingMetadata | SubmitTransactionFailureMetadataHashMismatch | SubmitTransactionFailureInvalidMetadata | SubmitTransactionFailureMissingRedeemers | SubmitTransactionFailureExtraneousRedeemers | SubmitTransactionFailureMissingDatums | SubmitTransactionFailureExtraneousDatums | SubmitTransactionFailureScriptIntegrityHashMismatch | SubmitTransactionFailureOrphanScriptInputs | SubmitTransactionFailureMissingCostModels | SubmitTransactionFailureMalformedScripts | SubmitTransactionFailureUnknownOutputReferences | SubmitTransactionFailureOutsideOfValidityInterval | SubmitTransactionFailureTransactionTooLarge | SubmitTransactionFailureValueTooLarge | SubmitTransactionFailureEmptyInputSet | SubmitTransactionFailureTransactionFeeTooSmall | SubmitTransactionFailureValueNotConserved | SubmitTransactionFailureNetworkMismatch | SubmitTransactionFailureInsufficientlyFundedOutputs | SubmitTransactionFailureBootstrapAttributesTooLarge | SubmitTransactionFailureMintingOrBurningAda | SubmitTransactionFailureInsufficientCollateral | SubmitTransactionFailureCollateralLockedByScript | SubmitTransactionFailureUnforeseeableSlot | SubmitTransactionFailureTooManyCollateralInputs | SubmitTransactionFailureMissingCollateralInputs | SubmitTransactionFailureNonAdaCollateral | SubmitTransactionFailureExecutionUnitsTooLarge | SubmitTransactionFailureTotalCollateralMismatch | SubmitTransactionFailureSpendsMismatch | SubmitTransactionFailureUnauthorizedVotes | SubmitTransactionFailureUnknownGovernanceProposals | SubmitTransactionFailureInvalidProtocolParametersUpdate | SubmitTransactionFailureUnknownStakePool | SubmitTransactionFailureIncompleteWithdrawals | SubmitTransactionFailureRetirementTooLate | SubmitTransactionFailureStakePoolCostTooLow | SubmitTransactionFailureMetadataHashTooLarge | SubmitTransactionFailureCredentialAlreadyRegistered | SubmitTransactionFailureUnknownCredential | SubmitTransactionFailureNonEmptyRewardAccount | SubmitTransactionFailureInvalidGenesisDelegation | SubmitTransactionFailureInvalidMIRTransfer | SubmitTransactionFailureForbiddenWithdrawal | SubmitTransactionFailureCredentialDepositMismatch | SubmitTransactionFailureDRepAlreadyRegistered | SubmitTransactionFailureDRepNotRegistered | SubmitTransactionFailureUnknownConstitutionalCommitteeMember | SubmitTransactionFailureGovernanceProposalDepositMismatch | SubmitTransactionFailureConflictingCommitteeUpdate | SubmitTransactionFailureInvalidCommitteeUpdate | SubmitTransactionFailureTreasuryWithdrawalMismatch | SubmitTransactionFailureInvalidOrMissingPreviousProposals | SubmitTransactionFailureUnrecognizedCertificateType | SubmitTransactionFailureInternalLedgerTypeConversionError;
export type Era = "byron" | "shelley" | "allegra" | "mary" | "alonzo" | "babbage" | "conway";
export type ScriptPurpose = ScriptPurposeSpend | ScriptPurposeMint | ScriptPurposePublish | ScriptPurposeWithdraw;
export type PolicyId = string;
export type RedeemerPointer = string;
export type Language = "plutus:v1" | "plutus:v2" | "plutus:v3";
export type Utxo = {
    transaction: {
        id: TransactionId;
    };
    index: UInt32;
    address: Address;
    value: Value;
    datumHash?: DigestBlake2B256;
    datum?: Datum;
    script?: Script;
}[];
export type EvaluateTransactionFailure = EvaluateTransactionFailureIncompatibleEra | EvaluateTransactionFailureUnsupportedEra | EvaluateTransactionFailureOverlappingAdditionalUtxo | EvaluateTransactionFailureNodeTipTooOld | EvaluateTransactionFailureCannotCreateEvaluationContext | EvaluateTransactionFailureScriptExecutionFailure;
export type ScriptExecutionFailure = ScriptExecutionFailureMissingScripts | ScriptExecutionFailureValidationFailure | ScriptExecutionFailureUnsuitableOutputReference | SubmitTransactionFailureExtraneousRedeemers | SubmitTransactionFailureMissingDatums | SubmitTransactionFailureUnknownOutputReferences | SubmitTransactionFailureMissingCostModels | SubmitTransactionFailureInternalLedgerTypeConversionError;
export type SafeZone = number;
export type AnyStakeCredential = Base16 | Bech32 | StakeAddress;
export type Base16 = string;
export type Bech32 = string;
export type StakeAddress = string;
export type EraWithGenesis = "byron" | "shelley" | "alonzo" | "conway";
export type UtcTime = string;
export type NetworkMagic = number;
export type InitialDelegates = {
    issuer: {
        id: DigestBlake2B224;
    };
    delegate: GenesisDelegate;
}[];
export interface Ogmios {
    FindIntersection: FindIntersection;
    FindIntersectionResponse: IntersectionFound | IntersectionNotFound | IntersectionInterleaved;
    NextBlock: NextBlock;
    NextBlockResponse: NextBlockResponse;
    SubmitTransaction: SubmitTransaction;
    SubmitTransactionResponse: SubmitTransactionSuccess | SubmitTransactionError | SubmitTransactionDeserialisationError;
    EvaluateTransaction: EvaluateTransaction;
    EvaluateTransactionResponse: EvaluateTransactionSuccess | EvaluateTransactionError | EvaluateTransactionDeserialisationError;
    AcquireLedgerState: AcquireLedgerState;
    AcquireLedgerStateFailure?: AcquireLedgerStateFailure;
    AcquireLedgerStateResponse: AcquireLedgerStateSuccess | AcquireLedgerStateFailure;
    ReleaseLedgerState: ReleaseLedgerState;
    ReleaseLedgerStateResponse: ReleaseLedgerStateResponse;
    QueryLedgerStateEraMismatch?: QueryLedgerStateEraMismatch;
    QueryLedgerStateUnavailableInCurrentEra?: QueryLedgerStateUnavailableInCurrentEra;
    QueryLedgerStateAcquiredExpire?: QueryLedgerStateAcquiredExpired;
    QueryLedgerStateEpoch: QueryLedgerStateEpoch;
    QueryLedgerStateEpochResponse: QueryLedgerStateEpochResponse | QueryLedgerStateEraMismatch | QueryLedgerStateUnavailableInCurrentEra | QueryLedgerStateAcquiredExpired;
    QueryLedgerStateEraStart: QueryLedgerStateEraStart;
    QueryLedgerStateEraStartResponse: QueryLedgerStateEraStartResponse | QueryLedgerStateEraMismatch | QueryLedgerStateUnavailableInCurrentEra | QueryLedgerStateAcquiredExpired;
    QueryLedgerStateEraSummaries: QueryLedgerStateEraSummaries;
    QueryLedgerStateEraSummariesResponse: QueryLedgerStateEraSummariesResponse | QueryLedgerStateEraMismatch | QueryLedgerStateUnavailableInCurrentEra | QueryLedgerStateAcquiredExpired;
    QueryLedgerStateLiveStakeDistribution: QueryLedgerStateLiveStakeDistribution;
    QueryLedgerStateLiveStakeDistributionResponse: QueryLedgerStateLiveStakeDistributionResponse | QueryLedgerStateEraMismatch | QueryLedgerStateUnavailableInCurrentEra | QueryLedgerStateAcquiredExpired;
    QueryLedgerStateProjectedRewards: QueryLedgerStateProjectedRewards;
    QueryLedgerStateProjectedRewardsResponse: QueryLedgerStateProjectedRewardsResponse | QueryLedgerStateEraMismatch | QueryLedgerStateUnavailableInCurrentEra | QueryLedgerStateAcquiredExpired;
    QueryLedgerStateProposedProtocolParameters: QueryLedgerStateProposedProtocolParameters;
    QueryLedgerStateProposedProtocolParametersResponse: QueryLedgerStateProposedProtocolParametersResponse | QueryLedgerStateEraMismatch | QueryLedgerStateUnavailableInCurrentEra | QueryLedgerStateAcquiredExpired;
    QueryLedgerStateProtocolParameters: QueryLedgerStateProtocolParameters;
    QueryLedgerStateProtocolParametersResponse: QueryLedgerStateProtocolParametersResponse | QueryLedgerStateEraMismatch | QueryLedgerStateUnavailableInCurrentEra | QueryLedgerStateAcquiredExpired;
    QueryLedgerStateRewardAccountSummaries: QueryLedgerStateRewardAccountSummaries;
    QueryLedgerStateRewardAccountSummariesResponse: QueryLedgerStateRewardAccountSummariesResponse | QueryLedgerStateEraMismatch | QueryLedgerStateUnavailableInCurrentEra | QueryLedgerStateAcquiredExpired;
    QueryLedgerStateRewardsProvenance: QueryLedgerStateRewardsProvenance;
    QueryLedgerStateRewardsProvenanceResponse: QueryLedgerStateRewardsProvenanceResponse | QueryLedgerStateEraMismatch | QueryLedgerStateUnavailableInCurrentEra | QueryLedgerStateAcquiredExpired;
    QueryLedgerStateStakePools: QueryLedgerStateStakePools;
    QueryLedgerStateStakePoolsResponse: QueryLedgerStateStakePoolsResponse | QueryLedgerStateEraMismatch | QueryLedgerStateUnavailableInCurrentEra | QueryLedgerStateAcquiredExpired;
    QueryLedgerStateTip: QueryLedgerStateTip;
    QueryLedgerStateTipResponse: QueryLedgerStateTipResponse | QueryLedgerStateEraMismatch | QueryLedgerStateUnavailableInCurrentEra | QueryLedgerStateAcquiredExpired;
    QueryLedgerStateUtxo: QueryLedgerStateUtxo;
    QueryLedgerStateUtxoResponse: QueryLedgerStateUtxoResponse | QueryLedgerStateEraMismatch | QueryLedgerStateUnavailableInCurrentEra | QueryLedgerStateAcquiredExpired;
    QueryNetworkBlockHeight: QueryNetworkBlockHeight;
    QueryNetworkBlockHeightResponse: QueryNetworkBlockHeightResponse;
    QueryNetworkGenesisConfiguration: QueryNetworkGenesisConfiguration;
    QueryNetworkGenesisConfigurationResponse: QueryNetworkGenesisConfigurationResponse;
    QueryNetworkStartTime: QueryNetworkStartTime;
    QueryNetworkStartTimeResponse: QueryNetworkStartTimeResponse;
    QueryNetworkTip: QueryNetworkTip;
    QueryNetworkTipResponse: QueryNetworkTipResponse;
    AcquireMempool: AcquireMempool;
    AcquireMempoolResponse: AcquireMempoolResponse;
    NextTransaction: NextTransaction;
    MustAcquireMempoolFirst?: MustAcquireMempoolFirst;
    NextTransactionResponse: NextTransactionResponse | MustAcquireMempoolFirst;
    HasTransaction: HasTransaction;
    HasTransactionResponse: HasTransactionResponse | MustAcquireMempoolFirst;
    SizeOfMempool: SizeOfMempool;
    SizeOfMempoolResponse?: SizeOfMempoolResponse | MustAcquireMempoolFirst;
    ReleaseMempool: ReleaseMempool;
    ReleaseMempoolResponse: ReleaseMempoolResponse | MustAcquireMempoolFirst;
    RpcError: RpcError;
}
export interface FindIntersection {
    jsonrpc: "2.0";
    method: "findIntersection";
    params: {
        points?: PointOrOrigin[];
    };
    id?: unknown;
}
export interface Point {
    slot: Slot;
    id: DigestBlake2B256;
}
export interface IntersectionFound {
    jsonrpc: "2.0";
    method: "findIntersection";
    result: {
        intersection: PointOrOrigin;
        tip: TipOrOrigin;
    };
    id?: unknown;
}
export interface Tip {
    slot: Slot;
    id: DigestBlake2B256;
    height: BlockHeight;
}
export interface IntersectionNotFound {
    jsonrpc: "2.0";
    method: "findIntersection";
    error: {
        code: 1000;
        message: string;
        data: {
            tip: TipOrOrigin;
        };
    };
    id?: unknown;
}
export interface IntersectionInterleaved {
    jsonrpc: "2.0";
    method: "findIntersection";
    error: {
        code: 1001;
        message: string;
    };
    id?: unknown;
}
export interface NextBlock {
    jsonrpc: "2.0";
    method: "nextBlock";
    id?: unknown;
}
export interface NextBlockResponse {
    jsonrpc: "2.0";
    method: "nextBlock";
    result: RollForward | RollBackward;
    id?: unknown;
}
export interface RollForward {
    direction: "forward";
    tip: Tip;
    block: Block;
}
export interface BlockEBB {
    type: "ebb";
    era: "byron";
    id: DigestBlake2B256;
    ancestor: DigestBlake2B256;
    height: BlockHeight;
}
export interface BlockBFT {
    type: "bft";
    era: "byron";
    id: DigestBlake2B256;
    ancestor: DigestBlake2B256;
    height: BlockHeight;
    slot: Slot;
    size: {
        bytes: Int64;
    };
    transactions?: Transaction[];
    operationalCertificates?: BootstrapOperationalCertificate[];
    protocol: {
        id: BootstrapProtocolId;
        version: ProtocolVersion;
        software: SoftwareVersion;
        update?: BootstrapProtocolUpdate;
    };
    issuer: {
        verificationKey: ExtendedVerificationKey;
    };
    delegate: {
        verificationKey: ExtendedVerificationKey;
    };
}
export interface Transaction {
    id: DigestBlake2B256;
    spends: "inputs" | "collaterals";
    inputs: TransactionOutputReference[];
    references?: TransactionOutputReference[];
    collaterals?: TransactionOutputReference[];
    totalCollateral?: Lovelace;
    collateralReturn?: TransactionOutput;
    outputs: TransactionOutput[];
    certificates?: Certificate[];
    withdrawals?: Withdrawals;
    fee?: Lovelace;
    validityInterval?: ValidityInterval;
    mint?: Assets;
    network?: Network;
    scriptIntegrityHash?: DigestBlake2B256;
    requiredExtraSignatories?: DigestBlake2B224[];
    requiredExtraScripts?: DigestBlake2B224[];
    proposals?: GovernanceProposal[];
    votes?: GovernanceVote[];
    metadata?: Metadata;
    signatories: Signatory[];
    scripts?: {
        [k: string]: Script;
    };
    datums?: {
        [k: string]: Datum;
    };
    redeemers?: {
        [k: string]: Redeemer;
    };
    cbor?: string;
}
export interface TransactionOutputReference {
    transaction: {
        id: TransactionId;
    };
    index: UInt32;
}
export interface Lovelace {
    lovelace: bigint;
}
export interface TransactionOutput {
    address: Address;
    value: Value;
    datumHash?: DigestBlake2B256;
    datum?: Datum;
    script?: Script;
}
export interface Value {
    ada: {
        lovelace: bigint;
    };
    [k: string]: {
        [k: string]: AssetQuantity;
    };
}
export interface Native {
    language: "native";
    json: ScriptNative;
    cbor?: string;
}
export interface ClauseSignature {
    clause: "signature";
    from: DigestBlake2B224;
}
export interface ClauseAny {
    clause: "any";
    from: ScriptNative[];
}
export interface ClauseAll {
    clause: "all";
    from: ScriptNative[];
}
export interface ClauseSome {
    clause: "some";
    atLeast: bigint;
    from: ScriptNative[];
}
export interface ClauseBefore {
    clause: "before";
    slot: Slot;
}
export interface ClauseAfter {
    clause: "after";
    slot: Slot;
}
export interface Plutus {
    language: "plutus:v1" | "plutus:v2" | "plutus:v3";
    cbor: string;
}
export interface StakeDelegation {
    type: "stakeDelegation";
    credential: DigestBlake2B224;
    stakePool?: {
        id: StakePoolId;
    };
    delegateRepresentative?: DelegateRepresentative;
}
export interface DelegateRepresentativeRegistered {
    id: DigestBlake2B224;
    type: "registered";
}
export interface DelegateRepresentativeNoConfidence {
    type: "noConfidence";
}
export interface DelegateRepresentativeAbstain {
    type: "abstain";
}
export interface StakeCredentialRegistration {
    type: "stakeCredentialRegistration";
    credential: DigestBlake2B224;
    deposit?: Lovelace;
}
export interface StakeCredentialDeregistration {
    type: "stakeCredentialDeregistration";
    credential: DigestBlake2B224;
    deposit?: Lovelace;
}
export interface StakePoolRegistration {
    type: "stakePoolRegistration";
    stakePool: StakePool;
}
export interface StakePool {
    id: StakePoolId;
    vrfVerificationKeyHash: DigestBlake2B256;
    owners: DigestBlake2B224[];
    cost: Lovelace;
    margin: Ratio;
    pledge: Lovelace;
    rewardAccount: RewardAccount;
    metadata?: Anchor;
    relays: Relay[];
}
export interface Anchor {
    hash: DigestAny;
    url: string;
}
export interface RelayByAddress {
    type: "ipAddress";
    ipv4?: string;
    ipv6?: string;
    port?: number;
}
export interface RelayByName {
    type: "hostname";
    hostname: string;
    port?: number;
}
export interface StakePoolRetirement {
    type: "stakePoolRetirement";
    stakePool: {
        retirementEpoch: Epoch;
        id: StakePoolId;
    };
}
export interface GenesisDelegation {
    type: "genesisDelegation";
    delegate: {
        id: DigestBlake2B224;
    };
    issuer: {
        id: DigestBlake2B224;
        vrfVerificationKeyHash: DigestBlake2B256;
    };
}
export interface ConstitutionalCommitteeHotKeyRegistration {
    type: "constitutionalCommitteeHotKeyRegistration";
    member: {
        id: DigestBlake2B224;
    };
    hotKey: DigestBlake2B224;
}
export interface ConstitutionalCommitteeRetirement {
    type: "constitutionalCommitteeRetirement";
    member: {
        id: DigestBlake2B224;
    };
    anchor?: Anchor;
}
export interface DelegateRepresentativeRegistration {
    type: "delegateRepresentativeRegistration";
    delegateRepresentative: DelegateRepresentative;
    deposit: Lovelace;
    anchor?: Anchor;
}
export interface DelegateRepresentativeUpdate {
    type: "delegateRepresentativeUpdate";
    delegateRepresentative: DelegateRepresentative;
    anchor: None | Anchor;
}
export interface DelegateRepresentativeRetirement {
    type: "delegateRepresentativeRetirement";
    delegateRepresentative: DelegateRepresentative;
    deposit: Lovelace;
}
export interface Withdrawals {
    [k: string]: Lovelace;
}
export interface ValidityInterval {
    invalidBefore?: Slot;
    invalidAfter?: Slot;
}
export interface Assets {
    [k: string]: {
        [k: string]: AssetQuantity;
    };
}
export interface GovernanceProposal {
    deposit?: Lovelace;
    returnAccount?: RewardAccount;
    anchor?: Anchor;
    action: GovernanceActionProtocolParametersUpdate | GovernanceActionHardForkInitiation | GovernanceActionTreasuryTransfer | GovernanceActionTreasuryWithdrawals | GovernanceActionConstitutionalCommittee | GovernanceActionConstitution | GovernanceActionNoConfidence | GovernanceActionInformation;
}
export interface GovernanceActionProtocolParametersUpdate {
    type: "protocolParametersUpdate";
    parameters: ProposedProtocolParameters;
}
export interface ProposedProtocolParameters {
    minFeeCoefficient?: UInt64;
    minFeeConstant?: Lovelace;
    minUtxoDepositCoefficient?: UInt64;
    minUtxoDepositConstant?: Lovelace;
    maxBlockBodySize?: {
        bytes: Int64;
    };
    maxBlockHeaderSize?: {
        bytes: Int64;
    };
    maxTransactionSize?: {
        bytes: Int64;
    };
    maxValueSize?: {
        bytes: Int64;
    };
    extraEntropy?: Nonce;
    stakeCredentialDeposit?: Lovelace;
    stakePoolDeposit?: Lovelace;
    stakePoolRetirementEpochBound?: UInt64;
    stakePoolPledgeInfluence?: Ratio;
    minStakePoolCost?: Lovelace;
    desiredNumberOfStakePools?: UInt64;
    federatedBlockProductionRatio?: Ratio;
    monetaryExpansion?: Ratio;
    treasuryExpansion?: Ratio;
    collateralPercentage?: UInt64;
    maxCollateralInputs?: UInt64;
    plutusCostModels?: CostModels;
    scriptExecutionPrices?: ScriptExecutionPrices;
    maxExecutionUnitsPerTransaction?: ExecutionUnits;
    maxExecutionUnitsPerBlock?: ExecutionUnits;
    stakePoolVotingThresholds?: StakePoolVotingThresholds;
    constitutionalCommitteeMinSize?: UInt64;
    constitutionalCommitteeMaxTermLength?: UInt64;
    governanceActionLifetime?: Epoch;
    governanceActionDeposit?: Lovelace;
    delegateRepresentativeVotingThresholds?: DelegateRepresentativeVotingThresholds;
    delegateRepresentativeDeposit?: Lovelace;
    delegateRepresentativeMaxIdleTime?: Epoch;
    version?: ProtocolVersion;
}
export interface CostModels {
    [k: string]: CostModel;
}
export interface ScriptExecutionPrices {
    memory: Ratio;
    cpu: Ratio;
}
export interface ExecutionUnits {
    memory: UInt64;
    cpu: UInt64;
}
export interface StakePoolVotingThresholds {
    noConfidence: Ratio;
    constitutionalCommittee: {
        default: Ratio;
        stateOfNoConfidence: Ratio;
    };
    hardForkInitiation: Ratio;
}
export interface DelegateRepresentativeVotingThresholds {
    noConfidence: Ratio;
    constitution: Ratio;
    constitutionalCommittee: {
        default: Ratio;
        stateOfNoConfidence: Ratio;
    };
    hardForkInitiation: Ratio;
    protocolParametersUpdate: {
        network: Ratio;
        economic: Ratio;
        technical: Ratio;
        governance: Ratio;
    };
    treasuryWithdrawals: Ratio;
}
export interface ProtocolVersion {
    major: UInt32;
    minor: UInt32;
    patch?: UInt32;
}
export interface GovernanceActionHardForkInitiation {
    type: "hardForkInitiation";
    version: ProtocolVersion;
}
export interface GovernanceActionTreasuryTransfer {
    type: "treasuryTransfer";
    source: "reserves" | "treasury";
    target: "reserves" | "treasury";
    value: Lovelace;
}
export interface GovernanceActionTreasuryWithdrawals {
    type: "treasuryWithdrawals";
    withdrawals: RewardTransfer;
}
export interface RewardTransfer {
    [k: string]: LovelaceDelta;
}
export interface LovelaceDelta {
    lovelace: number;
}
export interface GovernanceActionConstitutionalCommittee {
    type: "constitutionalCommittee";
    members: {
        added: ConstitutionalCommitteeMember[];
        removed: {
            id: DigestBlake2B224;
        }[];
    };
    quorum: Ratio;
}
export interface ConstitutionalCommitteeMember {
    id: DigestBlake2B224;
    mandate: {
        epoch: Epoch;
    };
}
export interface GovernanceActionConstitution {
    type: "constitution";
    hash?: DigestBlake2B224;
    anchor: Anchor;
}
export interface GovernanceActionNoConfidence {
    type: "noConfidence";
}
export interface GovernanceActionInformation {
    type: "information";
}
export interface GovernanceVote {
    issuer: VoterGenesisDelegate | VoterConstitutionalCommittee | VoterDelegateRepresentative | VoterStakePoolOperator;
    anchor?: Anchor;
    vote: "yes" | "no" | "abstain";
    proposal?: GovernanceProposalReference;
}
export interface VoterGenesisDelegate {
    role: "genesisDelegate";
    id: DigestBlake2B224;
}
export interface VoterConstitutionalCommittee {
    role: "constitutionalCommittee";
    id: DigestBlake2B224;
}
export interface VoterDelegateRepresentative {
    role: "delegateRepresentative";
    id: DigestBlake2B224;
}
export interface VoterStakePoolOperator {
    role: "stakePoolOperator";
    id: StakePoolId;
}
export interface GovernanceProposalReference {
    transaction: {
        id: TransactionId;
    };
    index: UInt32;
}
export interface Metadata {
    hash: DigestBlake2B256;
    labels: MetadataLabels;
}
export interface MetadataLabels {
    [k: string]: {
        cbor?: string;
        json?: Metadatum;
    };
}
export interface ObjectMetadatum {
    [k: string]: Metadatum;
}
export interface Signatory {
    key: VerificationKey;
    signature: Signature;
    chainCode?: ChainCode;
    addressAttributes?: AddressAttributes;
}
export interface Redeemer {
    redeemer: RedeemerData;
    executionUnits: ExecutionUnits;
}
export interface BootstrapOperationalCertificate {
    issuer: {
        verificationKey: VerificationKey;
    };
    delegate: {
        verificationKey: VerificationKey;
    };
}
export interface SoftwareVersion {
    appName: string;
    number: UInt32;
}
export interface BootstrapProtocolUpdate {
    proposal?: {
        version: ProtocolVersion;
        software: SoftwareVersion;
        parameters: BootstrapProtocolParameters;
        metadata: {
            [k: string]: string;
        };
    };
    votes: BootstrapVote[];
}
export interface BootstrapProtocolParameters {
    heavyDelegationThreshold?: Ratio;
    maxBlockBodySize?: {
        bytes: Int64;
    };
    maxBlockHeaderSize?: {
        bytes: Int64;
    };
    maxUpdateProposalSize?: {
        bytes: Int64;
    };
    maxTransactionSize?: {
        bytes: Int64;
    };
    multiPartyComputationThreshold?: Ratio;
    scriptVersion?: UInt64;
    slotDuration?: UInt64;
    unlockStakeEpoch?: UInt64;
    updateProposalThreshold?: Ratio;
    updateProposalTimeToLive?: UInt64;
    updateVoteThreshold?: Ratio;
    softForkInitThreshold?: Ratio;
    softForkMinThreshold?: Ratio;
    softForkDecrementThreshold?: Ratio;
    minFeeCoefficient?: UInt64;
    minFeeConstant?: Lovelace;
}
export interface BootstrapVote {
    voter: {
        verificationKey: VerificationKey;
    };
    proposal: {
        id: DigestBlake2B256;
    };
}
export interface BlockPraos {
    type: "praos";
    era: "shelley" | "allegra" | "mary" | "alonzo" | "babbage";
    id: DigestBlake2B256;
    ancestor: DigestBlake2B256 | GenesisHash;
    nonce?: CertifiedVrf;
    height: BlockHeight;
    size: {
        bytes: Int64;
    };
    slot: Slot;
    transactions?: Transaction[];
    protocol: {
        version: ProtocolVersion;
    };
    issuer: {
        verificationKey: VerificationKey;
        vrfVerificationKey: VerificationKey;
        operationalCertificate: OperationalCertificate;
        leaderValue: CertifiedVrf;
    };
}
export interface CertifiedVrf {
    proof?: VrfProof;
    output?: VrfOutput;
}
export interface OperationalCertificate {
    count: UInt64;
    kes: {
        period: UInt64;
        verificationKey: KesVerificationKey;
    };
}
export interface RollBackward {
    direction: "backward";
    tip: TipOrOrigin;
    point: PointOrOrigin;
}
export interface SubmitTransaction {
    jsonrpc: "2.0";
    method: "submitTransaction";
    params: {
        transaction: {
            cbor: string;
        };
    };
    id?: unknown;
}
export interface SubmitTransactionSuccess {
    jsonrpc: "2.0";
    method: "submitTransaction";
    result: {
        transaction: {
            id: TransactionId;
        };
    };
    id?: unknown;
}
export interface SubmitTransactionError {
    jsonrpc: "2.0";
    method: "submitTransaction";
    error: SubmitTransactionFailure;
    id?: unknown;
}
export interface SubmitTransactionFailureEraMismatch {
    code: 3005;
    message: string;
    data: EraMismatch;
}
export interface EraMismatch {
    queryEra: Era;
    ledgerEra: Era;
}
export interface SubmitTransactionFailureInvalidSignatories {
    code: 3100;
    message: string;
    data: {
        invalidSignatories: VerificationKey[];
    };
}
export interface SubmitTransactionFailureMissingSignatories {
    code: 3101;
    message: string;
    data: {
        missingSignatories: DigestBlake2B224[];
    };
}
export interface SubmitTransactionFailureMissingScripts {
    code: 3102;
    message: string;
    data: {
        missingScripts: DigestBlake2B224[];
    };
}
export interface SubmitTransactionFailureFailingNativeScript {
    code: 3103;
    message: string;
    data: {
        failingNativeScripts: DigestBlake2B224[];
    };
}
export interface SubmitTransactionFailureExtraneousScripts {
    code: 3104;
    message: string;
    data: {
        extraneousScripts: DigestBlake2B224[];
    };
}
export interface SubmitTransactionFailureMissingMetadataHash {
    code: 3105;
    message: string;
    data: {
        metadata: {
            hash: DigestBlake2B256;
        };
    };
}
export interface SubmitTransactionFailureMissingMetadata {
    code: 3106;
    message: string;
    data: {
        metadata: {
            hash: DigestBlake2B256;
        };
    };
}
export interface SubmitTransactionFailureMetadataHashMismatch {
    code: 3107;
    message: string;
    data: {
        provided: {
            hash: DigestBlake2B256;
        };
        computed: {
            hash: DigestBlake2B256;
        };
    };
}
export interface SubmitTransactionFailureInvalidMetadata {
    code: 3108;
    message: string;
}
export interface SubmitTransactionFailureMissingRedeemers {
    code: 3109;
    message: string;
    data: {
        missingRedeemers: ScriptPurpose[];
    };
}
export interface ScriptPurposeSpend {
    purpose: "spend";
    outputReference: TransactionOutputReference;
}
export interface ScriptPurposeMint {
    purpose: "mint";
    policy: PolicyId;
}
export interface ScriptPurposePublish {
    purpose: "publish";
    certificate: Certificate;
}
export interface ScriptPurposeWithdraw {
    purpose: "withdraw";
    rewardAccount: RewardAccount;
}
export interface SubmitTransactionFailureExtraneousRedeemers {
    code: 3110;
    message: string;
    data: {
        extraneousRedeemers: RedeemerPointer[];
    };
}
export interface SubmitTransactionFailureMissingDatums {
    code: 3111;
    message: string;
    data: {
        missingDatums: DigestBlake2B256[];
    };
}
export interface SubmitTransactionFailureExtraneousDatums {
    code: 3112;
    message: string;
    data: {
        extraneousDatums: DigestBlake2B256[];
    };
}
export interface SubmitTransactionFailureScriptIntegrityHashMismatch {
    code: 3113;
    message: string;
    data: {
        providedScriptIntegrity: DigestBlake2B256 | null;
        computedScriptIntegrity: DigestBlake2B256 | null;
    };
}
export interface SubmitTransactionFailureOrphanScriptInputs {
    code: 3114;
    message: string;
    data: {
        orphanInputs?: TransactionOutputReference[];
    };
}
export interface SubmitTransactionFailureMissingCostModels {
    code: 3115;
    message: string;
    data: {
        missingCostModels: Language[];
    };
}
export interface SubmitTransactionFailureMalformedScripts {
    code: 3116;
    message: string;
    data: {
        malformedScripts: DigestBlake2B224[];
    };
}
export interface SubmitTransactionFailureUnknownOutputReferences {
    code: 3117;
    message: string;
    data: {
        unknownOutputReferences: TransactionOutputReference[];
    };
}
export interface SubmitTransactionFailureOutsideOfValidityInterval {
    code: 3118;
    message: string;
    data: {
        validityInterval: ValidityInterval;
        currentSlot: Slot;
    };
}
export interface SubmitTransactionFailureTransactionTooLarge {
    code: 3119;
    message: string;
    data: {
        measuredTransactionSize: {
            bytes: Int64;
        };
        maximumTransactionSize: {
            bytes: Int64;
        };
    };
}
export interface SubmitTransactionFailureValueTooLarge {
    code: 3120;
    message: string;
    data: {
        excessivelyLargeOutputs: TransactionOutput[];
    };
}
export interface SubmitTransactionFailureEmptyInputSet {
    code: 3121;
    message: string;
}
export interface SubmitTransactionFailureTransactionFeeTooSmall {
    code: 3122;
    message: string;
    data: {
        minimumRequiredFee: Lovelace;
        providedFee: Lovelace;
    };
}
export interface SubmitTransactionFailureValueNotConserved {
    code: 3123;
    message: string;
    data: {
        valueConsumed: Value;
        valueProduced: Value;
    };
}
export interface SubmitTransactionFailureNetworkMismatch {
    code: 3124;
    message: string;
    data: {
        expectedNetwork: Network;
        discriminatedType: "address";
        invalidEntities: Address[];
    } | {
        expectedNetwork: Network;
        discriminatedType: "rewardAccount";
        invalidEntities: RewardAccount[];
    } | {
        expectedNetwork: Network;
        discriminatedType: "stakePoolCertificate";
        invalidEntities: StakePoolId[];
    } | {
        expectedNetwork: Network;
        discriminatedType: "transaction";
    };
}
export interface SubmitTransactionFailureInsufficientlyFundedOutputs {
    code: 3125;
    message: string;
    data: {
        insufficientlyFundedOutputs: {
            output: TransactionOutput;
            minimumRequiredValue?: Lovelace;
        }[];
    };
}
export interface SubmitTransactionFailureBootstrapAttributesTooLarge {
    code: 3126;
    message: string;
    data: {
        bootstrapOutputs: TransactionOutput[];
    };
}
export interface SubmitTransactionFailureMintingOrBurningAda {
    code: 3127;
    message: string;
}
export interface SubmitTransactionFailureInsufficientCollateral {
    code: 3128;
    message: string;
    data: {
        providedCollateral: Lovelace;
        minimumRequiredCollateral: Lovelace;
    };
}
export interface SubmitTransactionFailureCollateralLockedByScript {
    code: 3129;
    message: string;
    data: {
        unsuitableCollateralInputs: TransactionOutputReference[];
    };
}
export interface SubmitTransactionFailureUnforeseeableSlot {
    code: 3130;
    message: string;
    data: {
        unforeseeableSlot: Slot;
    };
}
export interface SubmitTransactionFailureTooManyCollateralInputs {
    code: 3131;
    message: string;
    data: {
        maximumCollateralInputs: UInt32;
        countedCollateralInputs: UInt32;
    };
}
export interface SubmitTransactionFailureMissingCollateralInputs {
    code: 3132;
    message: string;
}
export interface SubmitTransactionFailureNonAdaCollateral {
    code: 3133;
    message: string;
    data: {
        unsuitableCollateralValue: Value;
    };
}
export interface SubmitTransactionFailureExecutionUnitsTooLarge {
    code: 3134;
    message: string;
    data: {
        providedExecutionUnits: ExecutionUnits;
        maximumExecutionUnits: ExecutionUnits;
    };
}
export interface SubmitTransactionFailureTotalCollateralMismatch {
    code: 3135;
    message: string;
    data: {
        declaredTotalCollateral: Lovelace;
        computedTotalCollateral: Lovelace;
    };
}
export interface SubmitTransactionFailureSpendsMismatch {
    code: 3136;
    message: string;
    data: {
        declaredSpending?: "inputs" | "collaterals";
        mismatchReason: string;
    };
}
export interface SubmitTransactionFailureUnauthorizedVotes {
    code: 3137;
    message: string;
    data: {
        unauthorizedVotes: {
            proposal: GovernanceProposalReference;
            voter: VoterGenesisDelegate | VoterConstitutionalCommittee | VoterDelegateRepresentative | VoterStakePoolOperator;
        }[];
    };
}
export interface SubmitTransactionFailureUnknownGovernanceProposals {
    code: 3138;
    message: string;
    data: {
        unknownProposals: GovernanceProposalReference[];
    };
}
export interface SubmitTransactionFailureInvalidProtocolParametersUpdate {
    code: 3139;
    message: string;
}
export interface SubmitTransactionFailureUnknownStakePool {
    code: 3140;
    message: string;
    data: {
        unknownStakePool: StakePoolId;
    };
}
export interface SubmitTransactionFailureIncompleteWithdrawals {
    code: 3141;
    message: string;
    data: {
        incompleteWithdrawals: Withdrawals;
    };
}
export interface SubmitTransactionFailureRetirementTooLate {
    code: 3142;
    message: string;
    data: {
        currentEpoch: Epoch;
        declaredEpoch: Epoch;
        firstInvalidEpoch: Epoch;
    };
}
export interface SubmitTransactionFailureStakePoolCostTooLow {
    code: 3143;
    message: string;
    data: {
        minimumStakePoolCost: Lovelace;
        declaredStakePoolCost: Lovelace;
    };
}
export interface SubmitTransactionFailureMetadataHashTooLarge {
    code: 3144;
    message: string;
    data: {
        infringingStakePool: {
            id: StakePoolId;
        };
        computedMetadataHashSize: {
            bytes: Int64;
        };
    };
}
export interface SubmitTransactionFailureCredentialAlreadyRegistered {
    code: 3145;
    message: string;
    data: {
        knownCredential: DigestBlake2B224;
    };
}
export interface SubmitTransactionFailureUnknownCredential {
    code: 3146;
    message: string;
    data: {
        unknownCredential: DigestBlake2B224;
    };
}
export interface SubmitTransactionFailureNonEmptyRewardAccount {
    code: 3147;
    message: string;
    data: {
        nonEmptyRewardAccountBalance: Lovelace;
    };
}
export interface SubmitTransactionFailureInvalidGenesisDelegation {
    code: 3148;
    message: string;
}
export interface SubmitTransactionFailureInvalidMIRTransfer {
    code: 3149;
    message: string;
}
export interface SubmitTransactionFailureForbiddenWithdrawal {
    code: 3150;
    message: string;
    data: {
        marginalizedCredentials: DigestBlake2B224[];
    };
}
export interface SubmitTransactionFailureCredentialDepositMismatch {
    code: 3151;
    message: string;
    data: {
        providedDeposit: Lovelace;
        expectedDeposit?: Lovelace;
    };
}
export interface SubmitTransactionFailureDRepAlreadyRegistered {
    code: 3152;
    message: string;
    data: {
        knownDelegateRepresentative: DelegateRepresentative;
    };
}
export interface SubmitTransactionFailureDRepNotRegistered {
    code: 3153;
    message: string;
    data: {
        unknownDelegateRepresentative: DelegateRepresentative;
    };
}
export interface SubmitTransactionFailureUnknownConstitutionalCommitteeMember {
    code: 3154;
    message: string;
    data: {
        unknownConstitutionalCommitteeMember: {
            id: DigestBlake2B224;
        };
    };
}
export interface SubmitTransactionFailureGovernanceProposalDepositMismatch {
    code: 3155;
    message: string;
    data: {
        providedDeposit: Lovelace;
        expectedDeposit: Lovelace;
    };
}
export interface SubmitTransactionFailureConflictingCommitteeUpdate {
    code: 3156;
    message: string;
    data: {
        conflictingMembers: {
            id: DigestBlake2B224;
        }[];
    };
}
export interface SubmitTransactionFailureInvalidCommitteeUpdate {
    code: 3157;
    message: string;
    data: {
        alreadyRetiredMembers: {
            id: DigestBlake2B224;
        };
    };
}
export interface SubmitTransactionFailureTreasuryWithdrawalMismatch {
    code: 3158;
    message: string;
    data: {
        providedWithdrawal: Lovelace;
        expectedWithdrawal?: Lovelace;
    };
}
export interface SubmitTransactionFailureInvalidOrMissingPreviousProposals {
    code: 3159;
    message: string;
    data: {
        invalidOrMissingPreviousProposals: {
            anchor: Anchor;
            type: "hardForkInitiation" | "protocolParametersUpdate" | "constitutionalCommittee" | "constitution";
            invalidPreviousProposal?: GovernanceProposalReference;
        }[];
    };
}
export interface SubmitTransactionFailureUnrecognizedCertificateType {
    code: 3998;
    message: string;
}
export interface SubmitTransactionFailureInternalLedgerTypeConversionError {
    code: 3999;
    message: string;
}
export interface SubmitTransactionDeserialisationError {
    jsonrpc: "2.0";
    method: "submitTransaction";
    error: DeserialisationFailure;
    id?: unknown;
}
export interface DeserialisationFailure {
    code: -32602;
    message: string;
    data: {
        shelley: string;
        allegra: string;
        mary: string;
        alonzo: string;
        babbage: string;
        conway: string;
    };
}
export interface EvaluateTransaction {
    jsonrpc: "2.0";
    method: "evaluateTransaction";
    params: {
        transaction: {
            cbor: string;
        };
        additionalUtxo?: Utxo;
    };
    id?: unknown;
}
export interface EvaluateTransactionSuccess {
    jsonrpc: "2.0";
    method: "evaluateTransaction";
    result: {
        validator: RedeemerPointer;
        budget: ExecutionUnits;
    }[];
    id?: unknown;
}
export interface EvaluateTransactionError {
    jsonrpc: "2.0";
    method: "evaluateTransaction";
    error: EvaluateTransactionFailure;
    id?: unknown;
}
export interface EvaluateTransactionFailureIncompatibleEra {
    code: 3000;
    message: string;
    data: {
        incompatibleEra: Era;
    };
}
export interface EvaluateTransactionFailureUnsupportedEra {
    code: 3001;
    message: string;
    data: {
        unsupportedEra: Era;
    };
}
export interface EvaluateTransactionFailureOverlappingAdditionalUtxo {
    code: 3002;
    message: string;
    data: {
        overlappingOutputReferences: TransactionOutputReference[];
    };
}
export interface EvaluateTransactionFailureNodeTipTooOld {
    code: 3003;
    message: string;
    data: {
        minimumRequiredEra: Era;
        currentNodeEra: Era;
    };
}
export interface EvaluateTransactionFailureCannotCreateEvaluationContext {
    code: 3004;
    message: string;
    data: {
        reason: string;
    };
}
export interface EvaluateTransactionFailureScriptExecutionFailure {
    code: 3010;
    message: string;
    data: {
        validator: RedeemerPointer;
        error: ScriptExecutionFailure;
    }[];
}
export interface ScriptExecutionFailureMissingScripts {
    code: 3011;
    message: string;
    data: {
        missingScripts: RedeemerPointer[];
    };
}
export interface ScriptExecutionFailureValidationFailure {
    code: 3012;
    message: string;
    data: {
        validationError: string;
        traces: string[];
    };
}
export interface ScriptExecutionFailureUnsuitableOutputReference {
    code: 3013;
    message: string;
    data: {
        unsuitableOutputReference: TransactionOutputReference;
    };
}
export interface EvaluateTransactionDeserialisationError {
    jsonrpc: "2.0";
    method: "evaluateTransaction";
    error: DeserialisationFailure;
    id?: unknown;
}
export interface AcquireLedgerState {
    jsonrpc: "2.0";
    method: "acquireLedgerState";
    params: {
        point: PointOrOrigin;
    };
    id?: unknown;
}
export interface AcquireLedgerStateFailure {
    jsonrpc: "2.0";
    method: "acquireLedgerState";
    error: {
        code: 2000;
        message: string;
        data: string;
    };
    id?: unknown;
}
export interface AcquireLedgerStateSuccess {
    jsonrpc: "2.0";
    method: "acquireLedgerState";
    result: {
        acquired: "ledgerState";
        point: PointOrOrigin;
    };
    id?: unknown;
}
export interface ReleaseLedgerState {
    jsonrpc: "2.0";
    method: "releaseLedgerState";
    id?: unknown;
}
export interface ReleaseLedgerStateResponse {
    jsonrpc: "2.0";
    method: "releaseLedgerState";
    result: {
        released: "ledgerState";
    };
    id?: unknown;
}
export interface QueryLedgerStateEraMismatch {
    jsonrpc: "2.0";
    method: "queryLedgerState/epoch" | "queryLedgerState/eraStart" | "queryLedgerState/eraSummaries" | "queryLedgerState/liveStakeDistribution" | "queryLedgerState/projectedRewards" | "queryLedgerState/protocolParameters" | "queryLedgerState/proposedProtocolParameters" | "queryLedgerState/rewardAccountSummaries" | "queryLedgerState/rewardsProvenance" | "queryLedgerState/stakePools" | "queryLedgerState/utxo" | "queryLedgerState/tip";
    error: {
        code: 2001;
        message: string;
        data: EraMismatch;
    };
    id?: unknown;
}
export interface QueryLedgerStateUnavailableInCurrentEra {
    jsonrpc: "2.0";
    method: "queryLedgerState/epoch" | "queryLedgerState/eraStart" | "queryLedgerState/eraSummaries" | "queryLedgerState/liveStakeDistribution" | "queryLedgerState/projectedRewards" | "queryLedgerState/protocolParameters" | "queryLedgerState/proposedProtocolParameters" | "queryLedgerState/rewardAccountSummaries" | "queryLedgerState/rewardsProvenance" | "queryLedgerState/stakePools" | "queryLedgerState/utxo" | "queryLedgerState/tip";
    error: {
        code: 2002;
        message: string;
    };
    id?: unknown;
}
export interface QueryLedgerStateAcquiredExpired {
    jsonrpc: "2.0";
    method: "queryLedgerState/epoch" | "queryLedgerState/eraStart" | "queryLedgerState/eraSummaries" | "queryLedgerState/liveStakeDistribution" | "queryLedgerState/projectedRewards" | "queryLedgerState/protocolParameters" | "queryLedgerState/proposedProtocolParameters" | "queryLedgerState/rewardAccountSummaries" | "queryLedgerState/rewardsProvenance" | "queryLedgerState/stakePools" | "queryLedgerState/utxo" | "queryLedgerState/tip";
    error: {
        code: 2003;
        message: string;
        data: string;
    };
    id?: unknown;
}
export interface QueryLedgerStateEpoch {
    jsonrpc: "2.0";
    method: "queryLedgerState/epoch";
    id?: unknown;
}
export interface QueryLedgerStateEpochResponse {
    jsonrpc: "2.0";
    method: "queryLedgerState/epoch";
    result: Epoch;
    id?: unknown;
}
export interface QueryLedgerStateEraStart {
    jsonrpc: "2.0";
    method: "queryLedgerState/eraStart";
    id?: unknown;
}
export interface QueryLedgerStateEraStartResponse {
    jsonrpc: "2.0";
    method: "queryLedgerState/eraStart";
    result: Bound;
    id?: unknown;
}
export interface Bound {
    time: RelativeTime;
    slot: Slot;
    epoch: Epoch;
}
export interface RelativeTime {
    seconds: bigint;
}
export interface QueryLedgerStateEraSummaries {
    jsonrpc: "2.0";
    method: "queryLedgerState/eraSummaries";
    id?: unknown;
}
export interface QueryLedgerStateEraSummariesResponse {
    jsonrpc: "2.0";
    method: "queryLedgerState/eraSummaries";
    result: EraSummary[];
    id?: unknown;
}
export interface EraSummary {
    start: Bound;
    end?: Bound;
    parameters: EraParameters;
}
export interface EraParameters {
    epochLength: Epoch;
    slotLength: SlotLength;
    safeZone: SafeZone | null;
}
export interface SlotLength {
    milliseconds: bigint;
}
export interface QueryLedgerStateLiveStakeDistribution {
    jsonrpc: "2.0";
    method: "queryLedgerState/liveStakeDistribution";
    id?: unknown;
}
export interface QueryLedgerStateLiveStakeDistributionResponse {
    jsonrpc: "2.0";
    method: "queryLedgerState/liveStakeDistribution";
    result: LiveStakeDistribution;
    id?: unknown;
}
export interface LiveStakeDistribution {
    [k: string]: {
        stake: Ratio;
        vrf: DigestBlake2B256;
    };
}
export interface QueryLedgerStateProjectedRewards {
    jsonrpc: "2.0";
    method: "queryLedgerState/projectedRewards";
    params: {
        stake?: Lovelace[];
        scripts?: AnyStakeCredential[];
        keys?: AnyStakeCredential[];
    };
    id?: unknown;
}
export interface QueryLedgerStateProjectedRewardsResponse {
    jsonrpc: "2.0";
    method: "queryLedgerState/projectedRewards";
    result: ProjectedRewards;
    id?: unknown;
}
export interface ProjectedRewards {
    [k: string]: {
        [k: string]: Lovelace;
    };
}
export interface QueryLedgerStateProposedProtocolParameters {
    jsonrpc: "2.0";
    method: "queryLedgerState/proposedProtocolParameters";
    id?: unknown;
}
export interface QueryLedgerStateProposedProtocolParametersResponse {
    jsonrpc: "2.0";
    method: "queryLedgerState/proposedProtocolParameters";
    result: ProposedProtocolParameters[];
    id?: unknown;
}
export interface QueryLedgerStateProtocolParameters {
    jsonrpc: "2.0";
    method: "queryLedgerState/protocolParameters";
    id?: unknown;
}
export interface QueryLedgerStateProtocolParametersResponse {
    jsonrpc: "2.0";
    method: "queryLedgerState/protocolParameters";
    result: ProtocolParameters;
    id?: unknown;
}
export interface ProtocolParameters {
    minFeeCoefficient: UInt64;
    minFeeConstant: Lovelace;
    minUtxoDepositCoefficient: UInt64;
    minUtxoDepositConstant: Lovelace;
    maxBlockBodySize: {
        bytes: Int64;
    };
    maxBlockHeaderSize: {
        bytes: Int64;
    };
    maxTransactionSize?: {
        bytes: Int64;
    };
    maxValueSize?: {
        bytes: Int64;
    };
    extraEntropy?: Nonce;
    stakeCredentialDeposit: Lovelace;
    stakePoolDeposit: Lovelace;
    stakePoolRetirementEpochBound: UInt64;
    stakePoolPledgeInfluence: Ratio;
    minStakePoolCost: Lovelace;
    desiredNumberOfStakePools: UInt64;
    federatedBlockProductionRatio?: Ratio;
    monetaryExpansion: Ratio;
    treasuryExpansion: Ratio;
    collateralPercentage?: UInt64;
    maxCollateralInputs?: UInt64;
    plutusCostModels?: CostModels;
    scriptExecutionPrices?: ScriptExecutionPrices;
    maxExecutionUnitsPerTransaction?: ExecutionUnits;
    maxExecutionUnitsPerBlock?: ExecutionUnits;
    stakePoolVotingThresholds?: StakePoolVotingThresholds;
    constitutionalCommitteeMinSize?: UInt64;
    constitutionalCommitteeMaxTermLength?: UInt64;
    governanceActionLifetime?: Epoch;
    governanceActionDeposit?: Lovelace;
    delegateRepresentativeVotingThresholds?: DelegateRepresentativeVotingThresholds;
    delegateRepresentativeDeposit?: Lovelace;
    delegateRepresentativeMaxIdleTime?: Epoch;
    version: ProtocolVersion;
}
export interface QueryLedgerStateRewardAccountSummaries {
    jsonrpc: "2.0";
    method: "queryLedgerState/rewardAccountSummaries";
    params: {
        scripts?: AnyStakeCredential[];
        keys?: AnyStakeCredential[];
    };
    id?: unknown;
}
export interface QueryLedgerStateRewardAccountSummariesResponse {
    jsonrpc: "2.0";
    method: "queryLedgerState/rewardAccountSummaries";
    result: RewardAccountSummaries;
    id?: unknown;
}
export interface RewardAccountSummaries {
    [k: string]: RewardAccountSummary;
}
export interface RewardAccountSummary {
    delegate?: {
        id: StakePoolId;
    };
    rewards?: Lovelace;
}
export interface QueryLedgerStateRewardsProvenance {
    jsonrpc: "2.0";
    method: "queryLedgerState/rewardsProvenance";
    id?: unknown;
}
export interface QueryLedgerStateRewardsProvenanceResponse {
    jsonrpc: "2.0";
    method: "queryLedgerState/rewardsProvenance";
    result: RewardsProvenance;
    id?: unknown;
}
export interface RewardsProvenance {
    desiredNumberOfStakePools: number;
    stakePoolPledgeInfluence: string;
    totalRewardsInEpoch: {
        lovelace: bigint;
    };
    activeStakeInEpoch: {
        lovelace: bigint;
    };
    stakePools: {
        [k: string]: StakePoolSummary;
    };
}
export interface StakePoolSummary {
    id: StakePoolId;
    stake: Lovelace;
    ownerStake: Lovelace;
    approximatePerformance: number;
    parameters: {
        cost: Lovelace;
        margin: Ratio;
        pledge: Lovelace;
    };
}
export interface QueryLedgerStateStakePools {
    jsonrpc: "2.0";
    method: "queryLedgerState/stakePools";
    params?: {
        stakePools: {
            id: StakePoolId;
        }[];
    };
    id?: unknown;
}
export interface QueryLedgerStateStakePoolsResponse {
    jsonrpc: "2.0";
    method: "queryLedgerState/stakePools";
    result: {
        [k: string]: StakePool;
    };
    id?: unknown;
}
export interface QueryLedgerStateTip {
    jsonrpc: "2.0";
    method: "queryLedgerState/tip";
    id?: unknown;
}
export interface QueryLedgerStateTipResponse {
    jsonrpc: "2.0";
    method: "queryLedgerState/tip";
    result: PointOrOrigin;
    id?: unknown;
}
export interface QueryLedgerStateUtxo {
    jsonrpc: "2.0";
    method: "queryLedgerState/utxo";
    params?: UtxoByOutputReferences | UtxoByAddresses | WholeUtxo;
    id?: unknown;
}
export interface UtxoByOutputReferences {
    outputReferences: TransactionOutputReference[];
}
export interface UtxoByAddresses {
    addresses: Address[];
}
export interface WholeUtxo {
}
export interface QueryLedgerStateUtxoResponse {
    jsonrpc: "2.0";
    method: "queryLedgerState/utxo";
    result: Utxo;
    id?: unknown;
}
export interface QueryNetworkBlockHeight {
    jsonrpc: "2.0";
    method: "queryNetwork/blockHeight";
    id?: unknown;
}
export interface QueryNetworkBlockHeightResponse {
    jsonrpc: "2.0";
    method: "queryNetwork/blockHeight";
    result: BlockHeight | Origin;
    id?: unknown;
}
export interface QueryNetworkGenesisConfiguration {
    jsonrpc: "2.0";
    method: "queryNetwork/genesisConfiguration";
    params: {
        era: EraWithGenesis;
    };
    id?: unknown;
}
export interface QueryNetworkGenesisConfigurationResponse {
    jsonrpc: "2.0";
    method: "queryNetwork/genesisConfiguration";
    result: GenesisByron | GenesisShelley | GenesisAlonzo | GenesisConway;
    id?: unknown;
}
export interface GenesisByron {
    era: "byron";
    genesisKeyHashes: DigestBlake2B224[];
    genesisDelegations: {
        [k: string]: BootstrapOperationalCertificate;
    };
    startTime: UtcTime;
    initialFunds: {
        [k: string]: Lovelace;
    };
    initialVouchers: {
        [k: string]: Lovelace;
    };
    securityParameter: UInt64;
    networkMagic: NetworkMagic;
    updatableParameters?: ProtocolParameters;
}
export interface GenesisShelley {
    era: "shelley";
    startTime: UtcTime;
    networkMagic: NetworkMagic;
    network: Network;
    activeSlotsCoefficient: Ratio;
    securityParameter: UInt64;
    epochLength: Epoch;
    slotsPerKesPeriod: UInt64;
    maxKesEvolutions: UInt64;
    slotLength: SlotLength;
    updateQuorum: UInt64;
    maxLovelaceSupply: UInt64;
    initialParameters: ProtocolParameters;
    initialDelegates: InitialDelegates;
    initialFunds: InitialFunds;
    initialStakePools: GenesisStakePools;
}
export interface GenesisDelegate {
    id: DigestBlake2B224;
    vrfVerificationKeyHash: DigestBlake2B256;
}
export interface InitialFunds {
    [k: string]: Lovelace;
}
export interface GenesisStakePools {
    stakePools: {
        [k: string]: StakePool;
    };
    delegators: {
        [k: string]: StakePoolId;
    };
}
export interface GenesisAlonzo {
    era: "alonzo";
    updatableParameters: {
        minUtxoDepositCoefficient: UInt64;
        collateralPercentage: UInt64;
        plutusCostModels: CostModels;
        maxCollateralInputs: UInt64;
        maxExecutionUnitsPerBlock: ExecutionUnits;
        maxExecutionUnitsPerTransaction: ExecutionUnits;
        maxValueSize: {
            bytes: Int64;
        };
        scriptExecutionPrices: ScriptExecutionPrices;
    };
}
export interface GenesisConway {
    era: "conway";
    constitution: {
        hash?: DigestBlake2B224;
        anchor: Anchor;
    };
    constitutionalCommittee: {
        members: ConstitutionalCommitteeMember[];
        quorum: Ratio;
    };
    updatableParameters: {
        stakePoolVotingThresholds: StakePoolVotingThresholds;
        constitutionalCommitteeMinSize: UInt64;
        constitutionalCommitteeMaxTermLength: UInt64;
        governanceActionLifetime: Epoch;
        governanceActionDeposit: Lovelace;
        delegateRepresentativeVotingThresholds: DelegateRepresentativeVotingThresholds;
        delegateRepresentativeDeposit: Lovelace;
        delegateRepresentativeMaxIdleTime: Epoch;
    };
}
export interface QueryNetworkStartTime {
    jsonrpc: "2.0";
    method: "queryNetwork/startTime";
    id?: unknown;
}
export interface QueryNetworkStartTimeResponse {
    jsonrpc: "2.0";
    method: "queryNetwork/startTime";
    result: UtcTime;
    id?: unknown;
}
export interface QueryNetworkTip {
    jsonrpc: "2.0";
    method: "queryNetwork/tip";
    id?: unknown;
}
export interface QueryNetworkTipResponse {
    jsonrpc: "2.0";
    method: "queryNetwork/tip";
    result: PointOrOrigin;
    id?: unknown;
}
export interface AcquireMempool {
    jsonrpc: "2.0";
    method: "acquireMempool";
    id?: unknown;
}
export interface AcquireMempoolResponse {
    jsonrpc: "2.0";
    method: "acquireMempool";
    result: {
        acquired: "mempool";
        slot: Slot;
    };
    id?: unknown;
}
export interface NextTransaction {
    jsonrpc: "2.0";
    method: "nextTransaction";
    params?: {
        fields?: "all";
    };
    id?: unknown;
}
export interface MustAcquireMempoolFirst {
    jsonrpc: "2.0";
    method: "hasTransaction" | "nextTransaction" | "sizeOfMempool" | "releaseMempool";
    error: {
        code: 4000;
        message: string;
    };
    id?: unknown;
}
export interface NextTransactionResponse {
    jsonrpc: "2.0";
    method: "nextTransaction";
    result: {
        transaction: {
            id: TransactionId;
        } | Transaction | null;
    };
    id?: unknown;
}
export interface HasTransaction {
    jsonrpc: "2.0";
    method: "hasTransaction";
    params: {
        id: TransactionId;
    };
    id?: unknown;
}
export interface HasTransactionResponse {
    jsonrpc: "2.0";
    method: "hasTransaction";
    result: boolean;
    id?: unknown;
}
export interface SizeOfMempool {
    jsonrpc: "2.0";
    method: "sizeOfMempool";
    id?: unknown;
}
export interface SizeOfMempoolResponse {
    jsonrpc: "2.0";
    method: "sizeOfMempool";
    result: MempoolSizeAndCapacity;
    id?: unknown;
}
export interface MempoolSizeAndCapacity {
    maxCapacity: {
        bytes: Int64;
    };
    currentSize: {
        bytes: Int64;
    };
    transactions: {
        count: UInt32;
    };
}
export interface ReleaseMempool {
    jsonrpc: "2.0";
    method: "releaseMempool";
    id?: unknown;
}
export interface ReleaseMempoolResponse {
    jsonrpc: "2.0";
    method: "releaseMempool";
    result: {
        released: "mempool";
    };
    id?: unknown;
}
export interface RpcError {
    jsonrpc: "2.0";
    error: {
        code: number;
        message?: string;
        data?: unknown;
    };
    id?: unknown;
}
//# sourceMappingURL=index.d.ts.map