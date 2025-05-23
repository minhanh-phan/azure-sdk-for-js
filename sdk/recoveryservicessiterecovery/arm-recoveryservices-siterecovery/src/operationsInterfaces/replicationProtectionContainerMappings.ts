/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import {
  ProtectionContainerMapping,
  ReplicationProtectionContainerMappingsListByReplicationProtectionContainersOptionalParams,
  ReplicationProtectionContainerMappingsListOptionalParams,
  ReplicationProtectionContainerMappingsGetOptionalParams,
  ReplicationProtectionContainerMappingsGetResponse,
  CreateProtectionContainerMappingInput,
  ReplicationProtectionContainerMappingsCreateOptionalParams,
  ReplicationProtectionContainerMappingsCreateResponse,
  ReplicationProtectionContainerMappingsPurgeOptionalParams,
  UpdateProtectionContainerMappingInput,
  ReplicationProtectionContainerMappingsUpdateOptionalParams,
  ReplicationProtectionContainerMappingsUpdateResponse,
  RemoveProtectionContainerMappingInput,
  ReplicationProtectionContainerMappingsDeleteOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a ReplicationProtectionContainerMappings. */
export interface ReplicationProtectionContainerMappings {
  /**
   * Lists the protection container mappings for a protection container.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param fabricName Fabric name.
   * @param protectionContainerName Protection container name.
   * @param options The options parameters.
   */
  listByReplicationProtectionContainers(
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    options?: ReplicationProtectionContainerMappingsListByReplicationProtectionContainersOptionalParams,
  ): PagedAsyncIterableIterator<ProtectionContainerMapping>;
  /**
   * Lists the protection container mappings in the vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationProtectionContainerMappingsListOptionalParams,
  ): PagedAsyncIterableIterator<ProtectionContainerMapping>;
  /**
   * Gets the details of a protection container mapping.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param fabricName Fabric name.
   * @param protectionContainerName Protection container name.
   * @param mappingName Protection Container mapping name.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    mappingName: string,
    options?: ReplicationProtectionContainerMappingsGetOptionalParams,
  ): Promise<ReplicationProtectionContainerMappingsGetResponse>;
  /**
   * The operation to create a protection container mapping.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param fabricName Fabric name.
   * @param protectionContainerName Protection container name.
   * @param mappingName Protection container mapping name.
   * @param creationInput Mapping creation input.
   * @param options The options parameters.
   */
  beginCreate(
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    mappingName: string,
    creationInput: CreateProtectionContainerMappingInput,
    options?: ReplicationProtectionContainerMappingsCreateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<ReplicationProtectionContainerMappingsCreateResponse>,
      ReplicationProtectionContainerMappingsCreateResponse
    >
  >;
  /**
   * The operation to create a protection container mapping.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param fabricName Fabric name.
   * @param protectionContainerName Protection container name.
   * @param mappingName Protection container mapping name.
   * @param creationInput Mapping creation input.
   * @param options The options parameters.
   */
  beginCreateAndWait(
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    mappingName: string,
    creationInput: CreateProtectionContainerMappingInput,
    options?: ReplicationProtectionContainerMappingsCreateOptionalParams,
  ): Promise<ReplicationProtectionContainerMappingsCreateResponse>;
  /**
   * The operation to purge(force delete) a protection container mapping.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param fabricName Fabric name.
   * @param protectionContainerName Protection container name.
   * @param mappingName Protection container mapping name.
   * @param options The options parameters.
   */
  beginPurge(
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    mappingName: string,
    options?: ReplicationProtectionContainerMappingsPurgeOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * The operation to purge(force delete) a protection container mapping.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param fabricName Fabric name.
   * @param protectionContainerName Protection container name.
   * @param mappingName Protection container mapping name.
   * @param options The options parameters.
   */
  beginPurgeAndWait(
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    mappingName: string,
    options?: ReplicationProtectionContainerMappingsPurgeOptionalParams,
  ): Promise<void>;
  /**
   * The operation to update protection container mapping.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param fabricName Fabric name.
   * @param protectionContainerName Protection container name.
   * @param mappingName Protection container mapping name.
   * @param updateInput Mapping update input.
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    mappingName: string,
    updateInput: UpdateProtectionContainerMappingInput,
    options?: ReplicationProtectionContainerMappingsUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<ReplicationProtectionContainerMappingsUpdateResponse>,
      ReplicationProtectionContainerMappingsUpdateResponse
    >
  >;
  /**
   * The operation to update protection container mapping.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param fabricName Fabric name.
   * @param protectionContainerName Protection container name.
   * @param mappingName Protection container mapping name.
   * @param updateInput Mapping update input.
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    mappingName: string,
    updateInput: UpdateProtectionContainerMappingInput,
    options?: ReplicationProtectionContainerMappingsUpdateOptionalParams,
  ): Promise<ReplicationProtectionContainerMappingsUpdateResponse>;
  /**
   * The operation to delete or remove a protection container mapping.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param fabricName Fabric name.
   * @param protectionContainerName Protection container name.
   * @param mappingName Protection container mapping name.
   * @param removalInput Removal input.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    mappingName: string,
    removalInput: RemoveProtectionContainerMappingInput,
    options?: ReplicationProtectionContainerMappingsDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * The operation to delete or remove a protection container mapping.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param fabricName Fabric name.
   * @param protectionContainerName Protection container name.
   * @param mappingName Protection container mapping name.
   * @param removalInput Removal input.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    mappingName: string,
    removalInput: RemoveProtectionContainerMappingInput,
    options?: ReplicationProtectionContainerMappingsDeleteOptionalParams,
  ): Promise<void>;
}
