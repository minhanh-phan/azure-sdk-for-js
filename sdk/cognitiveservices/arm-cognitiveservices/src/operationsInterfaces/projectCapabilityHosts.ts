/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { SimplePollerLike, OperationState } from "@azure/core-lro";
import {
  ProjectCapabilityHostsDeleteOptionalParams,
  ProjectCapabilityHostsDeleteResponse,
  ProjectCapabilityHostsGetOptionalParams,
  ProjectCapabilityHostsGetResponse,
  CapabilityHost,
  ProjectCapabilityHostsCreateOrUpdateOptionalParams,
  ProjectCapabilityHostsCreateOrUpdateResponse,
} from "../models/index.js";

/** Interface representing a ProjectCapabilityHosts. */
export interface ProjectCapabilityHosts {
  /**
   * Delete project capabilityHost.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param projectName The name of Cognitive Services account's project.
   * @param capabilityHostName The name of the capability host associated with the Cognitive Services
   *                           Resource
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    capabilityHostName: string,
    options?: ProjectCapabilityHostsDeleteOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<ProjectCapabilityHostsDeleteResponse>,
      ProjectCapabilityHostsDeleteResponse
    >
  >;
  /**
   * Delete project capabilityHost.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param projectName The name of Cognitive Services account's project.
   * @param capabilityHostName The name of the capability host associated with the Cognitive Services
   *                           Resource
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    capabilityHostName: string,
    options?: ProjectCapabilityHostsDeleteOptionalParams,
  ): Promise<ProjectCapabilityHostsDeleteResponse>;
  /**
   * Get project capabilityHost.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param projectName The name of Cognitive Services account's project.
   * @param capabilityHostName The name of the capability host associated with the Cognitive Services
   *                           Resource
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    capabilityHostName: string,
    options?: ProjectCapabilityHostsGetOptionalParams,
  ): Promise<ProjectCapabilityHostsGetResponse>;
  /**
   * Create or update project capabilityHost.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param projectName The name of Cognitive Services account's project.
   * @param capabilityHostName The name of the capability host associated with the Cognitive Services
   *                           Resource
   * @param capabilityHost CapabilityHost definition.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    capabilityHostName: string,
    capabilityHost: CapabilityHost,
    options?: ProjectCapabilityHostsCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<ProjectCapabilityHostsCreateOrUpdateResponse>,
      ProjectCapabilityHostsCreateOrUpdateResponse
    >
  >;
  /**
   * Create or update project capabilityHost.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param projectName The name of Cognitive Services account's project.
   * @param capabilityHostName The name of the capability host associated with the Cognitive Services
   *                           Resource
   * @param capabilityHost CapabilityHost definition.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    capabilityHostName: string,
    capabilityHost: CapabilityHost,
    options?: ProjectCapabilityHostsCreateOrUpdateOptionalParams,
  ): Promise<ProjectCapabilityHostsCreateOrUpdateResponse>;
}
