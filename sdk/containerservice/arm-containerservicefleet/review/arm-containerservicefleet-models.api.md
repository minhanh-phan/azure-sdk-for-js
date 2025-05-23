## API Report File for "@azure/arm-containerservicefleet"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @public
export type ActionType = string;

// @public
export interface AgentProfile {
    subnetId?: string;
    vmSize?: string;
}

// @public
export interface APIServerAccessProfile {
    enablePrivateCluster?: boolean;
    enableVnetIntegration?: boolean;
    subnetId?: string;
}

// @public
export type AutoUpgradeLastTriggerStatus = string;

// @public
export interface AutoUpgradeNodeImageSelection {
    type: AutoUpgradeNodeImageSelectionType;
}

// @public
export type AutoUpgradeNodeImageSelectionType = string;

// @public
export interface AutoUpgradeProfile extends ProxyResource {
    readonly eTag?: string;
    properties?: AutoUpgradeProfileProperties;
}

// @public
export interface AutoUpgradeProfileProperties {
    autoUpgradeProfileStatus?: AutoUpgradeProfileStatus;
    channel: UpgradeChannel;
    disabled?: boolean;
    nodeImageSelection?: AutoUpgradeNodeImageSelection;
    readonly provisioningState?: AutoUpgradeProfileProvisioningState;
    updateStrategyId?: string;
}

// @public
export type AutoUpgradeProfileProvisioningState = string;

// @public
export interface AutoUpgradeProfileStatus {
    readonly lastTriggeredAt?: Date;
    readonly lastTriggerError?: ErrorDetail;
    readonly lastTriggerStatus?: AutoUpgradeLastTriggerStatus;
    readonly lastTriggerUpgradeVersions?: string[];
}

// @public
export type CreatedByType = string;

// @public
export interface ErrorAdditionalInfo {
    readonly info?: Record<string, any>;
    readonly type?: string;
}

// @public
export interface ErrorDetail {
    readonly additionalInfo?: ErrorAdditionalInfo[];
    readonly code?: string;
    readonly details?: ErrorDetail[];
    readonly message?: string;
    readonly target?: string;
}

// @public
export interface ErrorResponse {
    error?: ErrorDetail;
}

// @public
export interface Fleet extends TrackedResource {
    readonly eTag?: string;
    identity?: ManagedServiceIdentity;
    properties?: FleetProperties;
}

// @public
export interface FleetCredentialResult {
    readonly name?: string;
    readonly value?: Uint8Array;
}

// @public
export interface FleetCredentialResults {
    readonly kubeconfigs?: FleetCredentialResult[];
}

// @public
export interface FleetHubProfile {
    agentProfile?: AgentProfile;
    apiServerAccessProfile?: APIServerAccessProfile;
    dnsPrefix?: string;
    readonly fqdn?: string;
    readonly kubernetesVersion?: string;
    readonly portalFqdn?: string;
}

// @public
export interface FleetMember extends ProxyResource {
    readonly eTag?: string;
    properties?: FleetMemberProperties;
}

// @public
export interface FleetMemberProperties {
    clusterResourceId: string;
    group?: string;
    readonly provisioningState?: FleetMemberProvisioningState;
    readonly status?: FleetMemberStatus;
}

// @public
export type FleetMemberProvisioningState = string;

// @public
export interface FleetMemberStatus {
    readonly lastOperationError?: ErrorDetail;
    readonly lastOperationId?: string;
}

// @public
export interface FleetMemberUpdate {
    properties?: FleetMemberUpdateProperties;
}

// @public
export interface FleetMemberUpdateProperties {
    group?: string;
}

// @public
export interface FleetPatch {
    identity?: ManagedServiceIdentity;
    tags?: Record<string, string>;
}

// @public
export interface FleetProperties {
    hubProfile?: FleetHubProfile;
    readonly provisioningState?: FleetProvisioningState;
    readonly status?: FleetStatus;
}

// @public
export type FleetProvisioningState = string;

// @public
export interface FleetStatus {
    readonly lastOperationError?: ErrorDetail;
    readonly lastOperationId?: string;
}

// @public
export interface FleetUpdateStrategy extends ProxyResource {
    readonly eTag?: string;
    properties?: FleetUpdateStrategyProperties;
}

// @public
export interface FleetUpdateStrategyProperties {
    readonly provisioningState?: FleetUpdateStrategyProvisioningState;
    strategy: UpdateRunStrategy;
}

// @public
export type FleetUpdateStrategyProvisioningState = string;

// @public
export interface GenerateResponse {
    readonly id: string;
}

// @public
export enum KnownActionType {
    Internal = "Internal"
}

// @public
export enum KnownAutoUpgradeLastTriggerStatus {
    Failed = "Failed",
    Succeeded = "Succeeded"
}

// @public
export enum KnownAutoUpgradeNodeImageSelectionType {
    Consistent = "Consistent",
    Latest = "Latest"
}

// @public
export enum KnownAutoUpgradeProfileProvisioningState {
    Canceled = "Canceled",
    Failed = "Failed",
    Succeeded = "Succeeded"
}

// @public
export enum KnownCreatedByType {
    Application = "Application",
    Key = "Key",
    ManagedIdentity = "ManagedIdentity",
    User = "User"
}

// @public
export enum KnownFleetMemberProvisioningState {
    Canceled = "Canceled",
    Failed = "Failed",
    Joining = "Joining",
    Leaving = "Leaving",
    Succeeded = "Succeeded",
    Updating = "Updating"
}

// @public
export enum KnownFleetProvisioningState {
    Canceled = "Canceled",
    Creating = "Creating",
    Deleting = "Deleting",
    Failed = "Failed",
    Succeeded = "Succeeded",
    Updating = "Updating"
}

// @public
export enum KnownFleetUpdateStrategyProvisioningState {
    Canceled = "Canceled",
    Failed = "Failed",
    Succeeded = "Succeeded"
}

// @public
export enum KnownManagedClusterUpgradeType {
    ControlPlaneOnly = "ControlPlaneOnly",
    Full = "Full",
    NodeImageOnly = "NodeImageOnly"
}

// @public
export enum KnownManagedServiceIdentityType {
    None = "None",
    SystemAndUserAssigned = "SystemAssigned, UserAssigned",
    SystemAssigned = "SystemAssigned",
    UserAssigned = "UserAssigned"
}

// @public
export enum KnownNodeImageSelectionType {
    Consistent = "Consistent",
    Custom = "Custom",
    Latest = "Latest"
}

// @public
export enum KnownOrigin {
    System = "system",
    User = "user",
    UserSystem = "user,system"
}

// @public
export enum KnownTargetType {
    AfterStageWait = "AfterStageWait",
    Group = "Group",
    Member = "Member",
    Stage = "Stage"
}

// @public
export enum KnownUpdateRunProvisioningState {
    Canceled = "Canceled",
    Failed = "Failed",
    Succeeded = "Succeeded"
}

// @public
export enum KnownUpdateState {
    Completed = "Completed",
    Failed = "Failed",
    NotStarted = "NotStarted",
    Running = "Running",
    Skipped = "Skipped",
    Stopped = "Stopped",
    Stopping = "Stopping"
}

// @public
export enum KnownUpgradeChannel {
    NodeImage = "NodeImage",
    Rapid = "Rapid",
    Stable = "Stable"
}

// @public
export enum KnownVersions {
    V20231015 = "2023-10-15",
    V20240401 = "2024-04-01",
    V20250301 = "2025-03-01"
}

// @public
export interface ManagedClusterUpdate {
    nodeImageSelection?: NodeImageSelection;
    upgrade: ManagedClusterUpgradeSpec;
}

// @public
export interface ManagedClusterUpgradeSpec {
    kubernetesVersion?: string;
    type: ManagedClusterUpgradeType;
}

// @public
export type ManagedClusterUpgradeType = string;

// @public
export interface ManagedServiceIdentity {
    readonly principalId?: string;
    readonly tenantId?: string;
    type: ManagedServiceIdentityType;
    userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

// @public
export type ManagedServiceIdentityType = string;

// @public
export interface MemberUpdateStatus {
    readonly clusterResourceId?: string;
    readonly message?: string;
    readonly name?: string;
    readonly operationId?: string;
    readonly status?: UpdateStatus;
}

// @public
export interface NodeImageSelection {
    customNodeImageVersions?: NodeImageVersion[];
    type: NodeImageSelectionType;
}

// @public
export interface NodeImageSelectionStatus {
    readonly selectedNodeImageVersions?: NodeImageVersion[];
}

// @public
export type NodeImageSelectionType = string;

// @public
export interface NodeImageVersion {
    readonly version?: string;
}

// @public
export interface Operation {
    readonly actionType?: ActionType;
    display?: OperationDisplay;
    readonly isDataAction?: boolean;
    readonly name?: string;
    readonly origin?: Origin;
}

// @public
export interface OperationDisplay {
    readonly description?: string;
    readonly operation?: string;
    readonly provider?: string;
    readonly resource?: string;
}

// @public
export type Origin = string;

// @public
export interface ProxyResource extends Resource {
}

// @public
export interface Resource {
    readonly id?: string;
    readonly name?: string;
    readonly systemData?: SystemData;
    readonly type?: string;
}

// @public
export interface SkipProperties {
    targets: SkipTarget[];
}

// @public
export interface SkipTarget {
    name: string;
    type: TargetType;
}

// @public
export interface SystemData {
    createdAt?: Date;
    createdBy?: string;
    createdByType?: CreatedByType;
    lastModifiedAt?: Date;
    lastModifiedBy?: string;
    lastModifiedByType?: CreatedByType;
}

// @public
export type TargetType = string;

// @public
export interface TrackedResource extends Resource {
    location: string;
    tags?: Record<string, string>;
}

// @public
export interface UpdateGroup {
    name: string;
}

// @public
export interface UpdateGroupStatus {
    readonly members?: MemberUpdateStatus[];
    readonly name?: string;
    readonly status?: UpdateStatus;
}

// @public
export interface UpdateRun extends ProxyResource {
    readonly eTag?: string;
    properties?: UpdateRunProperties;
}

// @public
export interface UpdateRunProperties {
    readonly autoUpgradeProfileId?: string;
    managedClusterUpdate: ManagedClusterUpdate;
    readonly provisioningState?: UpdateRunProvisioningState;
    readonly status?: UpdateRunStatus;
    strategy?: UpdateRunStrategy;
    updateStrategyId?: string;
}

// @public
export type UpdateRunProvisioningState = string;

// @public
export interface UpdateRunStatus {
    readonly nodeImageSelection?: NodeImageSelectionStatus;
    readonly stages?: UpdateStageStatus[];
    readonly status?: UpdateStatus;
}

// @public
export interface UpdateRunStrategy {
    stages: UpdateStage[];
}

// @public
export interface UpdateStage {
    afterStageWaitInSeconds?: number;
    groups?: UpdateGroup[];
    name: string;
}

// @public
export interface UpdateStageStatus {
    readonly afterStageWaitStatus?: WaitStatus;
    readonly groups?: UpdateGroupStatus[];
    readonly name?: string;
    readonly status?: UpdateStatus;
}

// @public
export type UpdateState = string;

// @public
export interface UpdateStatus {
    readonly completedTime?: Date;
    readonly error?: ErrorDetail;
    readonly startTime?: Date;
    readonly state?: UpdateState;
}

// @public
export type UpgradeChannel = string;

// @public
export interface UserAssignedIdentity {
    readonly clientId?: string;
    readonly principalId?: string;
}

// @public
export interface WaitStatus {
    readonly status?: UpdateStatus;
    readonly waitDurationInSeconds?: number;
}

// (No @packageDocumentation comment for this package)

```
