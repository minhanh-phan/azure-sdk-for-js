/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  RegulatoryComplianceStandard,
  RegulatoryComplianceStandardsListOptionalParams,
  RegulatoryComplianceStandardsGetOptionalParams,
  RegulatoryComplianceStandardsGetResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a RegulatoryComplianceStandards. */
export interface RegulatoryComplianceStandards {
  /**
   * Supported regulatory compliance standards details and state
   * @param options The options parameters.
   */
  list(
    options?: RegulatoryComplianceStandardsListOptionalParams,
  ): PagedAsyncIterableIterator<RegulatoryComplianceStandard>;
  /**
   * Supported regulatory compliance details state for selected standard
   * @param regulatoryComplianceStandardName Name of the regulatory compliance standard object
   * @param options The options parameters.
   */
  get(
    regulatoryComplianceStandardName: string,
    options?: RegulatoryComplianceStandardsGetOptionalParams,
  ): Promise<RegulatoryComplianceStandardsGetResponse>;
}
