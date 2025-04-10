/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  PrivateLinkResourceDescription,
  WorkspacePrivateLinkResourcesListByWorkspaceOptionalParams,
  WorkspacePrivateLinkResourcesGetOptionalParams,
  WorkspacePrivateLinkResourcesGetResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a WorkspacePrivateLinkResources. */
export interface WorkspacePrivateLinkResources {
  /**
   * Gets the private link resources that need to be created for a workspace.
   * @param resourceGroupName The name of the resource group that contains the service instance.
   * @param workspaceName The name of workspace resource.
   * @param options The options parameters.
   */
  listByWorkspace(
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacePrivateLinkResourcesListByWorkspaceOptionalParams,
  ): PagedAsyncIterableIterator<PrivateLinkResourceDescription>;
  /**
   * Gets a private link resource that need to be created for a workspace.
   * @param resourceGroupName The name of the resource group that contains the service instance.
   * @param workspaceName The name of workspace resource.
   * @param groupName The name of the private link resource group.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    workspaceName: string,
    groupName: string,
    options?: WorkspacePrivateLinkResourcesGetOptionalParams,
  ): Promise<WorkspacePrivateLinkResourcesGetResponse>;
}
