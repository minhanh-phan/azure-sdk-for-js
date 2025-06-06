/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { MetricNamespace, MetricNamespacesListOptionalParams } from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a MetricNamespaces. */
export interface MetricNamespaces {
  /**
   * Lists the metric namespaces for the resource.
   * @param resourceUri The identifier of the resource.
   * @param options The options parameters.
   */
  list(
    resourceUri: string,
    options?: MetricNamespacesListOptionalParams,
  ): PagedAsyncIterableIterator<MetricNamespace>;
}
