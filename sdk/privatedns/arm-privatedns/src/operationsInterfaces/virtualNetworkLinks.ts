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
  VirtualNetworkLink,
  VirtualNetworkLinksListOptionalParams,
  VirtualNetworkLinksCreateOrUpdateOptionalParams,
  VirtualNetworkLinksCreateOrUpdateResponse,
  VirtualNetworkLinksUpdateOptionalParams,
  VirtualNetworkLinksUpdateResponse,
  VirtualNetworkLinksDeleteOptionalParams,
  VirtualNetworkLinksGetOptionalParams,
  VirtualNetworkLinksGetResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a VirtualNetworkLinks. */
export interface VirtualNetworkLinks {
  /**
   * Lists the virtual network links to the specified Private DNS zone.
   * @param resourceGroupName The name of the resource group.
   * @param privateZoneName The name of the Private DNS zone (without a terminating dot).
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    privateZoneName: string,
    options?: VirtualNetworkLinksListOptionalParams,
  ): PagedAsyncIterableIterator<VirtualNetworkLink>;
  /**
   * Creates or updates a virtual network link to the specified Private DNS zone.
   * @param resourceGroupName The name of the resource group.
   * @param privateZoneName The name of the Private DNS zone (without a terminating dot).
   * @param virtualNetworkLinkName The name of the virtual network link.
   * @param parameters Parameters supplied to the CreateOrUpdate operation.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    privateZoneName: string,
    virtualNetworkLinkName: string,
    parameters: VirtualNetworkLink,
    options?: VirtualNetworkLinksCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<VirtualNetworkLinksCreateOrUpdateResponse>,
      VirtualNetworkLinksCreateOrUpdateResponse
    >
  >;
  /**
   * Creates or updates a virtual network link to the specified Private DNS zone.
   * @param resourceGroupName The name of the resource group.
   * @param privateZoneName The name of the Private DNS zone (without a terminating dot).
   * @param virtualNetworkLinkName The name of the virtual network link.
   * @param parameters Parameters supplied to the CreateOrUpdate operation.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    privateZoneName: string,
    virtualNetworkLinkName: string,
    parameters: VirtualNetworkLink,
    options?: VirtualNetworkLinksCreateOrUpdateOptionalParams,
  ): Promise<VirtualNetworkLinksCreateOrUpdateResponse>;
  /**
   * Updates a virtual network link to the specified Private DNS zone.
   * @param resourceGroupName The name of the resource group.
   * @param privateZoneName The name of the Private DNS zone (without a terminating dot).
   * @param virtualNetworkLinkName The name of the virtual network link.
   * @param parameters Parameters supplied to the Update operation.
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    privateZoneName: string,
    virtualNetworkLinkName: string,
    parameters: VirtualNetworkLink,
    options?: VirtualNetworkLinksUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<VirtualNetworkLinksUpdateResponse>,
      VirtualNetworkLinksUpdateResponse
    >
  >;
  /**
   * Updates a virtual network link to the specified Private DNS zone.
   * @param resourceGroupName The name of the resource group.
   * @param privateZoneName The name of the Private DNS zone (without a terminating dot).
   * @param virtualNetworkLinkName The name of the virtual network link.
   * @param parameters Parameters supplied to the Update operation.
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    privateZoneName: string,
    virtualNetworkLinkName: string,
    parameters: VirtualNetworkLink,
    options?: VirtualNetworkLinksUpdateOptionalParams,
  ): Promise<VirtualNetworkLinksUpdateResponse>;
  /**
   * Deletes a virtual network link to the specified Private DNS zone. WARNING: In case of a registration
   * virtual network, all auto-registered DNS records in the zone for the virtual network will also be
   * deleted. This operation cannot be undone.
   * @param resourceGroupName The name of the resource group.
   * @param privateZoneName The name of the Private DNS zone (without a terminating dot).
   * @param virtualNetworkLinkName The name of the virtual network link.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    privateZoneName: string,
    virtualNetworkLinkName: string,
    options?: VirtualNetworkLinksDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Deletes a virtual network link to the specified Private DNS zone. WARNING: In case of a registration
   * virtual network, all auto-registered DNS records in the zone for the virtual network will also be
   * deleted. This operation cannot be undone.
   * @param resourceGroupName The name of the resource group.
   * @param privateZoneName The name of the Private DNS zone (without a terminating dot).
   * @param virtualNetworkLinkName The name of the virtual network link.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    privateZoneName: string,
    virtualNetworkLinkName: string,
    options?: VirtualNetworkLinksDeleteOptionalParams,
  ): Promise<void>;
  /**
   * Gets a virtual network link to the specified Private DNS zone.
   * @param resourceGroupName The name of the resource group.
   * @param privateZoneName The name of the Private DNS zone (without a terminating dot).
   * @param virtualNetworkLinkName The name of the virtual network link.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    privateZoneName: string,
    virtualNetworkLinkName: string,
    options?: VirtualNetworkLinksGetOptionalParams,
  ): Promise<VirtualNetworkLinksGetResponse>;
}
