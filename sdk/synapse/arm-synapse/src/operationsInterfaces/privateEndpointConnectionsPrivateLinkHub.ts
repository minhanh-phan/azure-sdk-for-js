/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  PrivateEndpointConnectionForPrivateLinkHub,
  PrivateEndpointConnectionsPrivateLinkHubListOptionalParams,
  PrivateEndpointConnectionsPrivateLinkHubGetOptionalParams,
  PrivateEndpointConnectionsPrivateLinkHubGetResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a PrivateEndpointConnectionsPrivateLinkHub. */
export interface PrivateEndpointConnectionsPrivateLinkHub {
  /**
   * Get all PrivateEndpointConnections in the PrivateLinkHub
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param privateLinkHubName Name of the privateLinkHub
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    privateLinkHubName: string,
    options?: PrivateEndpointConnectionsPrivateLinkHubListOptionalParams
  ): PagedAsyncIterableIterator<PrivateEndpointConnectionForPrivateLinkHub>;
  /**
   * Get all PrivateEndpointConnection in the PrivateLinkHub by name
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param privateLinkHubName Name of the privateLinkHub
   * @param privateEndpointConnectionName Name of the privateEndpointConnection
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    privateLinkHubName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsPrivateLinkHubGetOptionalParams
  ): Promise<PrivateEndpointConnectionsPrivateLinkHubGetResponse>;
}
