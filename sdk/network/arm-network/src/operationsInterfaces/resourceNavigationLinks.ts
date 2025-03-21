/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  ResourceNavigationLinksListOptionalParams,
  ResourceNavigationLinksListResponse,
} from "../models/index.js";

/** Interface representing a ResourceNavigationLinks. */
export interface ResourceNavigationLinks {
  /**
   * Gets a list of resource navigation links for a subnet.
   * @param resourceGroupName The name of the resource group.
   * @param virtualNetworkName The name of the virtual network.
   * @param subnetName The name of the subnet.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    options?: ResourceNavigationLinksListOptionalParams,
  ): Promise<ResourceNavigationLinksListResponse>;
}
