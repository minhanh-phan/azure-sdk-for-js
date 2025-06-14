## API Report File for "@azure/arm-onlineexperimentation"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @public
export type ActionType = string;

// @public
export type CreatedByType = string;

// @public
export interface CustomerManagedKeyEncryption {
    keyEncryptionKeyIdentity?: KeyEncryptionKeyIdentity;
    keyEncryptionKeyUrl?: string;
}

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
export interface KeyEncryptionKeyIdentity {
    federatedClientId?: string;
    identityType?: KeyEncryptionKeyIdentityType;
    userAssignedIdentityResourceId?: string;
}

// @public
export type KeyEncryptionKeyIdentityType = string;

// @public
export enum KnownActionType {
    Internal = "Internal"
}

// @public
export enum KnownCreatedByType {
    Application = "Application",
    Key = "Key",
    ManagedIdentity = "ManagedIdentity",
    User = "User"
}

// @public
export enum KnownKeyEncryptionKeyIdentityType {
    SystemAssignedIdentity = "SystemAssignedIdentity",
    UserAssignedIdentity = "UserAssignedIdentity"
}

// @public
export enum KnownManagedServiceIdentityType {
    None = "None",
    SystemAssigned = "SystemAssigned",
    SystemAssignedUserAssigned = "SystemAssigned,UserAssigned",
    UserAssigned = "UserAssigned"
}

// @public
export enum KnownOnlineExperimentationWorkspaceSkuName {
    D0 = "D0",
    F0 = "F0",
    P0 = "P0",
    S0 = "S0"
}

// @public
export enum KnownOnlineExperimentationWorkspaceSkuTier {
    Developer = "Developer",
    Free = "Free",
    Premium = "Premium",
    Standard = "Standard"
}

// @public
export enum KnownOrigin {
    System = "system",
    User = "user",
    UserSystem = "user,system"
}

// @public
export enum KnownResourceProvisioningState {
    Canceled = "Canceled",
    Failed = "Failed",
    Succeeded = "Succeeded"
}

// @public
export enum KnownVersions {
    V20250531Preview = "2025-05-31-preview"
}

// @public
export interface ManagedServiceIdentity {
    readonly principalId?: string;
    readonly tenantId?: string;
    type: ManagedServiceIdentityType;
    userAssignedIdentities?: Record<string, UserAssignedIdentity | null>;
}

// @public
export type ManagedServiceIdentityType = string;

// @public
export interface OnlineExperimentationWorkspace extends TrackedResource {
    identity?: ManagedServiceIdentity;
    properties?: OnlineExperimentationWorkspaceProperties;
    sku?: OnlineExperimentationWorkspaceSku;
}

// @public
export interface OnlineExperimentationWorkspacePatch {
    identity?: ManagedServiceIdentity;
    properties?: {
        logAnalyticsWorkspaceResourceId?: string;
        logsExporterStorageAccountResourceId?: string;
        encryption?: ResourceEncryptionConfiguration;
    };
    sku?: OnlineExperimentationWorkspaceSku;
    tags?: Record<string, string>;
}

// @public
export interface OnlineExperimentationWorkspaceProperties {
    appConfigurationResourceId: string;
    encryption?: ResourceEncryptionConfiguration;
    readonly endpoint?: string;
    logAnalyticsWorkspaceResourceId: string;
    logsExporterStorageAccountResourceId: string;
    readonly provisioningState?: ResourceProvisioningState;
    readonly workspaceId?: string;
}

// @public
export interface OnlineExperimentationWorkspaceSku {
    name: OnlineExperimentationWorkspaceSkuName;
    readonly tier?: OnlineExperimentationWorkspaceSkuTier;
}

// @public
export type OnlineExperimentationWorkspaceSkuName = string;

// @public
export type OnlineExperimentationWorkspaceSkuTier = string;

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
export interface Resource {
    readonly id?: string;
    readonly name?: string;
    readonly systemData?: SystemData;
    readonly type?: string;
}

// @public
export interface ResourceEncryptionConfiguration {
    customerManagedKeyEncryption?: CustomerManagedKeyEncryption;
}

// @public
export type ResourceProvisioningState = string;

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
export interface TrackedResource extends Resource {
    location: string;
    tags?: Record<string, string>;
}

// @public
export interface UserAssignedIdentity {
    readonly clientId?: string;
    readonly principalId?: string;
}

// (No @packageDocumentation comment for this package)

```
