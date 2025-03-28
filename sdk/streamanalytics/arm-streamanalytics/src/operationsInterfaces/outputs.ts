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
  Output,
  OutputsListByStreamingJobOptionalParams,
  OutputsCreateOrReplaceOptionalParams,
  OutputsCreateOrReplaceResponse,
  OutputsUpdateOptionalParams,
  OutputsUpdateResponse,
  OutputsDeleteOptionalParams,
  OutputsGetOptionalParams,
  OutputsGetResponse,
  OutputsTestOptionalParams,
  OutputsTestResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Outputs. */
export interface Outputs {
  /**
   * Lists all of the outputs under the specified streaming job.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName The name of the streaming job.
   * @param options The options parameters.
   */
  listByStreamingJob(
    resourceGroupName: string,
    jobName: string,
    options?: OutputsListByStreamingJobOptionalParams,
  ): PagedAsyncIterableIterator<Output>;
  /**
   * Creates an output or replaces an already existing output under an existing streaming job.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName The name of the streaming job.
   * @param outputName The name of the output.
   * @param output The definition of the output that will be used to create a new output or replace the
   *               existing one under the streaming job.
   * @param options The options parameters.
   */
  createOrReplace(
    resourceGroupName: string,
    jobName: string,
    outputName: string,
    output: Output,
    options?: OutputsCreateOrReplaceOptionalParams,
  ): Promise<OutputsCreateOrReplaceResponse>;
  /**
   * Updates an existing output under an existing streaming job. This can be used to partially update
   * (ie. update one or two properties) an output without affecting the rest the job or output
   * definition.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName The name of the streaming job.
   * @param outputName The name of the output.
   * @param output An Output object. The properties specified here will overwrite the corresponding
   *               properties in the existing output (ie. Those properties will be updated). Any properties that are
   *               set to null here will mean that the corresponding property in the existing output will remain the
   *               same and not change as a result of this PATCH operation.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    jobName: string,
    outputName: string,
    output: Output,
    options?: OutputsUpdateOptionalParams,
  ): Promise<OutputsUpdateResponse>;
  /**
   * Deletes an output from the streaming job.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName The name of the streaming job.
   * @param outputName The name of the output.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    jobName: string,
    outputName: string,
    options?: OutputsDeleteOptionalParams,
  ): Promise<void>;
  /**
   * Gets details about the specified output.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName The name of the streaming job.
   * @param outputName The name of the output.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    jobName: string,
    outputName: string,
    options?: OutputsGetOptionalParams,
  ): Promise<OutputsGetResponse>;
  /**
   * Tests whether an output’s datasource is reachable and usable by the Azure Stream Analytics service.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName The name of the streaming job.
   * @param outputName The name of the output.
   * @param options The options parameters.
   */
  beginTest(
    resourceGroupName: string,
    jobName: string,
    outputName: string,
    options?: OutputsTestOptionalParams,
  ): Promise<
    SimplePollerLike<OperationState<OutputsTestResponse>, OutputsTestResponse>
  >;
  /**
   * Tests whether an output’s datasource is reachable and usable by the Azure Stream Analytics service.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName The name of the streaming job.
   * @param outputName The name of the output.
   * @param options The options parameters.
   */
  beginTestAndWait(
    resourceGroupName: string,
    jobName: string,
    outputName: string,
    options?: OutputsTestOptionalParams,
  ): Promise<OutputsTestResponse>;
}
