/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  PrivateEndpointGetOperationStatusOptionalParams,
  PrivateEndpointGetOperationStatusResponse,
} from "../models/index.js";

/** Interface representing a PrivateEndpointOperations. */
export interface PrivateEndpointOperations {
  /**
   * Gets the operation status for a private endpoint connection.
   * @param vaultName The name of the recovery services vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param privateEndpointConnectionName The name of the private endpoint connection.
   * @param operationId Operation id
   * @param options The options parameters.
   */
  getOperationStatus(
    vaultName: string,
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    operationId: string,
    options?: PrivateEndpointGetOperationStatusOptionalParams,
  ): Promise<PrivateEndpointGetOperationStatusResponse>;
}
