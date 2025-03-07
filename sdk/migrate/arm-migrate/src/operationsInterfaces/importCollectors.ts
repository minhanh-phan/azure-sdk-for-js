/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  ImportCollector,
  ImportCollectorsListByProjectOptionalParams,
  ImportCollectorsGetOptionalParams,
  ImportCollectorsGetResponse,
  ImportCollectorsCreateOptionalParams,
  ImportCollectorsCreateResponse,
  ImportCollectorsDeleteOptionalParams,
  ImportCollectorsDeleteResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a ImportCollectors. */
export interface ImportCollectors {
  /**
   * Get a list of Import collector.
   * @param resourceGroupName Name of the Azure Resource Group that project is part of.
   * @param projectName Name of the Azure Migrate project.
   * @param options The options parameters.
   */
  listByProject(
    resourceGroupName: string,
    projectName: string,
    options?: ImportCollectorsListByProjectOptionalParams
  ): PagedAsyncIterableIterator<ImportCollector>;
  /**
   * Get a Import collector.
   * @param resourceGroupName Name of the Azure Resource Group that project is part of.
   * @param projectName Name of the Azure Migrate project.
   * @param importCollectorName Unique name of a Import collector within a project.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    projectName: string,
    importCollectorName: string,
    options?: ImportCollectorsGetOptionalParams
  ): Promise<ImportCollectorsGetResponse>;
  /**
   * Create or Update Import collector
   * @param resourceGroupName Name of the Azure Resource Group that project is part of.
   * @param projectName Name of the Azure Migrate project.
   * @param importCollectorName Unique name of a Import collector within a project.
   * @param options The options parameters.
   */
  create(
    resourceGroupName: string,
    projectName: string,
    importCollectorName: string,
    options?: ImportCollectorsCreateOptionalParams
  ): Promise<ImportCollectorsCreateResponse>;
  /**
   * Delete a Import collector from the project.
   * @param resourceGroupName Name of the Azure Resource Group that project is part of.
   * @param projectName Name of the Azure Migrate project.
   * @param importCollectorName Unique name of a Import collector within a project.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    projectName: string,
    importCollectorName: string,
    options?: ImportCollectorsDeleteOptionalParams
  ): Promise<ImportCollectorsDeleteResponse>;
}
