/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  ReplicationExtensionOperationStatusGetOptionalParams,
  ReplicationExtensionOperationStatusGetResponse
} from "../models/index.js";

/** Interface representing a ReplicationExtensionOperationStatus. */
export interface ReplicationExtensionOperationStatus {
  /**
   * Tracks the results of an asynchronous operation on the replication extension.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param vaultName The vault name.
   * @param replicationExtensionName The replication extension name.
   * @param operationId The ID of an ongoing async operation.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    vaultName: string,
    replicationExtensionName: string,
    operationId: string,
    options?: ReplicationExtensionOperationStatusGetOptionalParams
  ): Promise<ReplicationExtensionOperationStatusGetResponse>;
}
