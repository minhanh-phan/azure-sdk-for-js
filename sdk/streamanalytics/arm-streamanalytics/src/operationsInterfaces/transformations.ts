/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  Transformation,
  TransformationsCreateOrReplaceOptionalParams,
  TransformationsCreateOrReplaceResponse,
  TransformationsUpdateOptionalParams,
  TransformationsUpdateResponse,
  TransformationsGetOptionalParams,
  TransformationsGetResponse,
} from "../models/index.js";

/** Interface representing a Transformations. */
export interface Transformations {
  /**
   * Creates a transformation or replaces an already existing transformation under an existing streaming
   * job.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName The name of the streaming job.
   * @param transformationName The name of the transformation.
   * @param transformation The definition of the transformation that will be used to create a new
   *                       transformation or replace the existing one under the streaming job.
   * @param options The options parameters.
   */
  createOrReplace(
    resourceGroupName: string,
    jobName: string,
    transformationName: string,
    transformation: Transformation,
    options?: TransformationsCreateOrReplaceOptionalParams,
  ): Promise<TransformationsCreateOrReplaceResponse>;
  /**
   * Updates an existing transformation under an existing streaming job. This can be used to partially
   * update (ie. update one or two properties) a transformation without affecting the rest the job or
   * transformation definition.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName The name of the streaming job.
   * @param transformationName The name of the transformation.
   * @param transformation A Transformation object. The properties specified here will overwrite the
   *                       corresponding properties in the existing transformation (ie. Those properties will be updated). Any
   *                       properties that are set to null here will mean that the corresponding property in the existing
   *                       transformation will remain the same and not change as a result of this PATCH operation.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    jobName: string,
    transformationName: string,
    transformation: Transformation,
    options?: TransformationsUpdateOptionalParams,
  ): Promise<TransformationsUpdateResponse>;
  /**
   * Gets details about the specified transformation.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName The name of the streaming job.
   * @param transformationName The name of the transformation.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    jobName: string,
    transformationName: string,
    options?: TransformationsGetOptionalParams,
  ): Promise<TransformationsGetResponse>;
}
