/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  IoTSecurityAggregatedRecommendation,
  IotSecuritySolutionsAnalyticsRecommendationListOptionalParams,
  IotSecuritySolutionsAnalyticsRecommendationGetOptionalParams,
  IotSecuritySolutionsAnalyticsRecommendationGetResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a IotSecuritySolutionsAnalyticsRecommendation. */
export interface IotSecuritySolutionsAnalyticsRecommendation {
  /**
   * Use this method to get the list of aggregated security analytics recommendations of yours IoT
   * Security solution.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param solutionName The name of the IoT Security solution.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    solutionName: string,
    options?: IotSecuritySolutionsAnalyticsRecommendationListOptionalParams,
  ): PagedAsyncIterableIterator<IoTSecurityAggregatedRecommendation>;
  /**
   * Use this method to get the aggregated security analytics recommendation of yours IoT Security
   * solution. This aggregation is performed by recommendation name.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param solutionName The name of the IoT Security solution.
   * @param aggregatedRecommendationName Name of the recommendation aggregated for this query.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    solutionName: string,
    aggregatedRecommendationName: string,
    options?: IotSecuritySolutionsAnalyticsRecommendationGetOptionalParams,
  ): Promise<IotSecuritySolutionsAnalyticsRecommendationGetResponse>;
}
