## API Report File for "@azure/arm-storageimportexport"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import * as coreAuth from '@azure/core-auth';
import * as coreClient from '@azure/core-client';
import { PagedAsyncIterableIterator } from '@azure/core-paging';

// @public
export interface BitLockerKeys {
    list(jobName: string, resourceGroupName: string, options?: BitLockerKeysListOptionalParams): PagedAsyncIterableIterator<DriveBitLockerKey>;
}

// @public
export interface BitLockerKeysListOptionalParams extends coreClient.OperationOptions {
}

// @public
export type BitLockerKeysListResponse = GetBitLockerKeysResponse;

// @public
export type CreatedByType = string;

// @public
export interface DeliveryPackageInformation {
    carrierName: string;
    driveCount?: number;
    shipDate?: string;
    trackingNumber: string;
}

// @public
export interface DriveBitLockerKey {
    bitLockerKey?: string;
    driveId?: string;
}

// @public
export type DriveState = string;

// @public
export interface DriveStatus {
    bitLockerKey?: string;
    bytesSucceeded?: number;
    copyStatus?: string;
    driveHeaderHash?: string;
    driveId?: string;
    errorLogUri?: string;
    manifestFile?: string;
    manifestHash?: string;
    manifestUri?: string;
    percentComplete?: number;
    state?: DriveState;
    verboseLogUri?: string;
}

// @public
export type EncryptionKekType = string;

// @public
export interface EncryptionKeyDetails {
    kekType?: EncryptionKekType;
    kekUrl?: string;
    kekVaultResourceID?: string;
}

// @public
export interface ErrorResponse {
    code?: string;
    details?: ErrorResponseErrorDetailsItem[];
    innererror?: Record<string, unknown>;
    message?: string;
    target?: string;
}

// @public (undocumented)
export interface ErrorResponseErrorDetailsItem {
    code?: string;
    message?: string;
    target?: string;
}

// @public
export interface Export {
    blobListBlobPath?: string;
    blobPath?: string[];
    blobPathPrefix?: string[];
}

// @public
export interface GetBitLockerKeysResponse {
    value?: DriveBitLockerKey[];
}

// @public
export function getContinuationToken(page: unknown): string | undefined;

// @public
export interface IdentityDetails {
    readonly principalId?: string;
    readonly tenantId?: string;
    type?: IdentityType;
}

// @public
export type IdentityType = string;

// @public
export interface JobDetails {
    backupDriveManifest?: boolean;
    cancelRequested?: boolean;
    deliveryPackage?: DeliveryPackageInformation;
    diagnosticsPath?: string;
    driveList?: DriveStatus[];
    encryptionKey?: EncryptionKeyDetails;
    export?: Export;
    incompleteBlobListUri?: string;
    jobType?: string;
    logLevel?: string;
    percentComplete?: number;
    provisioningState?: string;
    returnAddress?: ReturnAddress;
    returnPackage?: PackageInformation;
    returnShipping?: ReturnShipping;
    shippingInformation?: ShippingInformation;
    state?: string;
    storageAccountId?: string;
}

// @public
export interface JobResponse {
    readonly id?: string;
    identity?: IdentityDetails;
    location?: string;
    readonly name?: string;
    properties?: JobDetails;
    readonly systemData?: SystemData;
    tags?: Record<string, unknown>;
    readonly type?: string;
}

// @public
export interface Jobs {
    create(jobName: string, resourceGroupName: string, body: PutJobParameters, options?: JobsCreateOptionalParams): Promise<JobsCreateResponse>;
    delete(jobName: string, resourceGroupName: string, options?: JobsDeleteOptionalParams): Promise<void>;
    get(jobName: string, resourceGroupName: string, options?: JobsGetOptionalParams): Promise<JobsGetResponse>;
    listByResourceGroup(resourceGroupName: string, options?: JobsListByResourceGroupOptionalParams): PagedAsyncIterableIterator<JobResponse>;
    listBySubscription(options?: JobsListBySubscriptionOptionalParams): PagedAsyncIterableIterator<JobResponse>;
    update(jobName: string, resourceGroupName: string, body: UpdateJobParameters, options?: JobsUpdateOptionalParams): Promise<JobsUpdateResponse>;
}

// @public
export interface JobsCreateOptionalParams extends coreClient.OperationOptions {
    clientTenantId?: string;
}

// @public
export type JobsCreateResponse = JobResponse;

// @public
export interface JobsDeleteOptionalParams extends coreClient.OperationOptions {
}

// @public
export interface JobsGetOptionalParams extends coreClient.OperationOptions {
}

// @public
export type JobsGetResponse = JobResponse;

// @public
export interface JobsListByResourceGroupNextOptionalParams extends coreClient.OperationOptions {
}

// @public
export type JobsListByResourceGroupNextResponse = ListJobsResponse;

// @public
export interface JobsListByResourceGroupOptionalParams extends coreClient.OperationOptions {
    filter?: string;
    top?: number;
}

// @public
export type JobsListByResourceGroupResponse = ListJobsResponse;

// @public
export interface JobsListBySubscriptionNextOptionalParams extends coreClient.OperationOptions {
}

// @public
export type JobsListBySubscriptionNextResponse = ListJobsResponse;

// @public
export interface JobsListBySubscriptionOptionalParams extends coreClient.OperationOptions {
    filter?: string;
    top?: number;
}

// @public
export type JobsListBySubscriptionResponse = ListJobsResponse;

// @public
export interface JobsUpdateOptionalParams extends coreClient.OperationOptions {
}

// @public
export type JobsUpdateResponse = JobResponse;

// @public
export enum KnownCreatedByType {
    Application = "Application",
    Key = "Key",
    ManagedIdentity = "ManagedIdentity",
    User = "User"
}

// @public
export enum KnownDriveState {
    Completed = "Completed",
    CompletedMoreInfo = "CompletedMoreInfo",
    NeverReceived = "NeverReceived",
    Received = "Received",
    ShippedBack = "ShippedBack",
    Specified = "Specified",
    Transferring = "Transferring"
}

// @public
export enum KnownEncryptionKekType {
    CustomerManaged = "CustomerManaged",
    MicrosoftManaged = "MicrosoftManaged"
}

// @public
export enum KnownIdentityType {
    None = "None",
    SystemAssigned = "SystemAssigned",
    UserAssigned = "UserAssigned"
}

// @public
export interface ListJobsResponse {
    nextLink?: string;
    value?: JobResponse[];
}

// @public
export interface ListOperationsResponse {
    value?: Operation[];
}

// @public
export interface Location {
    additionalShippingInformation?: string;
    alternateLocations?: string[];
    city?: string;
    countryOrRegion?: string;
    id?: string;
    name?: string;
    phone?: string;
    postalCode?: string;
    recipientName?: string;
    stateOrProvince?: string;
    streetAddress1?: string;
    streetAddress2?: string;
    supportedCarriers?: string[];
    type?: string;
}

// @public
export interface Locations {
    get(locationName: string, options?: LocationsGetOptionalParams): Promise<LocationsGetResponse>;
    list(options?: LocationsListOptionalParams): PagedAsyncIterableIterator<Location>;
}

// @public
export interface LocationsGetOptionalParams extends coreClient.OperationOptions {
}

// @public
export type LocationsGetResponse = Location;

// @public
export interface LocationsListOptionalParams extends coreClient.OperationOptions {
}

// @public
export type LocationsListResponse = LocationsResponse;

// @public
export interface LocationsResponse {
    value?: Location[];
}

// @public
export interface Operation {
    description?: string;
    name: string;
    operation?: string;
    provider?: string;
    resource?: string;
}

// @public
export interface Operations {
    list(options?: OperationsListOptionalParams): PagedAsyncIterableIterator<Operation>;
}

// @public
export interface OperationsListOptionalParams extends coreClient.OperationOptions {
}

// @public
export type OperationsListResponse = ListOperationsResponse;

// @public
export interface PackageInformation {
    carrierName: string;
    driveCount: number;
    shipDate: string;
    trackingNumber: string;
}

// @public
export interface PutJobParameters {
    location?: string;
    properties?: JobDetails;
    tags?: Record<string, unknown>;
}

// @public
export interface ReturnAddress {
    city: string;
    countryOrRegion: string;
    email: string;
    phone: string;
    postalCode: string;
    recipientName: string;
    stateOrProvince?: string;
    streetAddress1: string;
    streetAddress2?: string;
}

// @public
export interface ReturnShipping {
    carrierAccountNumber: string;
    carrierName: string;
}

// @public
export interface ShippingInformation {
    readonly additionalInformation?: string;
    city?: string;
    countryOrRegion?: string;
    phone?: string;
    postalCode?: string;
    recipientName?: string;
    stateOrProvince?: string;
    streetAddress1?: string;
    streetAddress2?: string;
}

// @public (undocumented)
export class StorageImportExport extends coreClient.ServiceClient {
    // (undocumented)
    $host: string;
    constructor(credentials: coreAuth.TokenCredential, subscriptionId: string, options?: StorageImportExportOptionalParams);
    // (undocumented)
    acceptLanguage?: string;
    // (undocumented)
    apiVersion: string;
    // (undocumented)
    bitLockerKeys: BitLockerKeys;
    // (undocumented)
    jobs: Jobs;
    // (undocumented)
    locations: Locations;
    // (undocumented)
    operations: Operations;
    // (undocumented)
    subscriptionId: string;
}

// @public
export interface StorageImportExportOptionalParams extends coreClient.ServiceClientOptions {
    $host?: string;
    acceptLanguage?: string;
    apiVersion?: string;
    endpoint?: string;
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
export interface UpdateJobParameters {
    backupDriveManifest?: boolean;
    cancelRequested?: boolean;
    deliveryPackage?: DeliveryPackageInformation;
    driveList?: DriveStatus[];
    logLevel?: string;
    returnAddress?: ReturnAddress;
    returnShipping?: ReturnShipping;
    state?: string;
    tags?: Record<string, unknown>;
}

// (No @packageDocumentation comment for this package)

```
