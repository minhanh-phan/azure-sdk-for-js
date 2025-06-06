/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  PrivateLinkResourcesListOptionalParams,
  PrivateLinkResourcesListResponse,
} from "../models/index.js";

/** Interface representing a PrivateLinkResources. */
export interface PrivateLinkResources {
  /**
   * Gets the private link resources that need to be created for a Cognitive Services account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    accountName: string,
    options?: PrivateLinkResourcesListOptionalParams,
  ): Promise<PrivateLinkResourcesListResponse>;
}
