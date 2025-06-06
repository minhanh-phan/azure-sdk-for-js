/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { ProjectAllowedEnvironmentTypes } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { DevCenterClient } from "../devCenterClient.js";
import {
  AllowedEnvironmentType,
  ProjectAllowedEnvironmentTypesListNextOptionalParams,
  ProjectAllowedEnvironmentTypesListOptionalParams,
  ProjectAllowedEnvironmentTypesListResponse,
  ProjectAllowedEnvironmentTypesGetOptionalParams,
  ProjectAllowedEnvironmentTypesGetResponse,
  ProjectAllowedEnvironmentTypesListNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing ProjectAllowedEnvironmentTypes operations. */
export class ProjectAllowedEnvironmentTypesImpl
  implements ProjectAllowedEnvironmentTypes
{
  private readonly client: DevCenterClient;

  /**
   * Initialize a new instance of the class ProjectAllowedEnvironmentTypes class.
   * @param client Reference to the service client
   */
  constructor(client: DevCenterClient) {
    this.client = client;
  }

  /**
   * Lists allowed environment types for a project.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param projectName The name of the project.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    projectName: string,
    options?: ProjectAllowedEnvironmentTypesListOptionalParams,
  ): PagedAsyncIterableIterator<AllowedEnvironmentType> {
    const iter = this.listPagingAll(resourceGroupName, projectName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listPagingPage(
          resourceGroupName,
          projectName,
          options,
          settings,
        );
      },
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    projectName: string,
    options?: ProjectAllowedEnvironmentTypesListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<AllowedEnvironmentType[]> {
    let result: ProjectAllowedEnvironmentTypesListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(resourceGroupName, projectName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        projectName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    projectName: string,
    options?: ProjectAllowedEnvironmentTypesListOptionalParams,
  ): AsyncIterableIterator<AllowedEnvironmentType> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      projectName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Lists allowed environment types for a project.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param projectName The name of the project.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    projectName: string,
    options?: ProjectAllowedEnvironmentTypesListOptionalParams,
  ): Promise<ProjectAllowedEnvironmentTypesListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, projectName, options },
      listOperationSpec,
    );
  }

  /**
   * Gets an allowed environment type.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param projectName The name of the project.
   * @param environmentTypeName The name of the environment type.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    projectName: string,
    environmentTypeName: string,
    options?: ProjectAllowedEnvironmentTypesGetOptionalParams,
  ): Promise<ProjectAllowedEnvironmentTypesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, projectName, environmentTypeName, options },
      getOperationSpec,
    );
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param projectName The name of the project.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    projectName: string,
    nextLink: string,
    options?: ProjectAllowedEnvironmentTypesListNextOptionalParams,
  ): Promise<ProjectAllowedEnvironmentTypesListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, projectName, nextLink, options },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/allowedEnvironmentTypes",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AllowedEnvironmentTypeListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion, Parameters.top],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.projectName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/allowedEnvironmentTypes/{environmentTypeName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AllowedEnvironmentType,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.projectName,
    Parameters.environmentTypeName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AllowedEnvironmentTypeListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink,
    Parameters.projectName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
