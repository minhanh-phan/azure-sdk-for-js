/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { Group } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { ApiManagementClient } from "../apiManagementClient.js";
import {
  GroupContract,
  GroupListByServiceNextOptionalParams,
  GroupListByServiceOptionalParams,
  GroupListByServiceResponse,
  GroupGetEntityTagOptionalParams,
  GroupGetEntityTagResponse,
  GroupGetOptionalParams,
  GroupGetResponse,
  GroupCreateParameters,
  GroupCreateOrUpdateOptionalParams,
  GroupCreateOrUpdateResponse,
  GroupUpdateParameters,
  GroupUpdateOptionalParams,
  GroupUpdateResponse,
  GroupDeleteOptionalParams,
  GroupListByServiceNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Group operations. */
export class GroupImpl implements Group {
  private readonly client: ApiManagementClient;

  /**
   * Initialize a new instance of the class Group class.
   * @param client Reference to the service client
   */
  constructor(client: ApiManagementClient) {
    this.client = client;
  }

  /**
   * Lists a collection of groups defined within a service instance.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param options The options parameters.
   */
  public listByService(
    resourceGroupName: string,
    serviceName: string,
    options?: GroupListByServiceOptionalParams,
  ): PagedAsyncIterableIterator<GroupContract> {
    const iter = this.listByServicePagingAll(
      resourceGroupName,
      serviceName,
      options,
    );
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
        return this.listByServicePagingPage(
          resourceGroupName,
          serviceName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByServicePagingPage(
    resourceGroupName: string,
    serviceName: string,
    options?: GroupListByServiceOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<GroupContract[]> {
    let result: GroupListByServiceResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByService(
        resourceGroupName,
        serviceName,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByServiceNext(
        resourceGroupName,
        serviceName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByServicePagingAll(
    resourceGroupName: string,
    serviceName: string,
    options?: GroupListByServiceOptionalParams,
  ): AsyncIterableIterator<GroupContract> {
    for await (const page of this.listByServicePagingPage(
      resourceGroupName,
      serviceName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Lists a collection of groups defined within a service instance.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param options The options parameters.
   */
  private _listByService(
    resourceGroupName: string,
    serviceName: string,
    options?: GroupListByServiceOptionalParams,
  ): Promise<GroupListByServiceResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, options },
      listByServiceOperationSpec,
    );
  }

  /**
   * Gets the entity state (Etag) version of the group specified by its identifier.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param groupId Group identifier. Must be unique in the current API Management service instance.
   * @param options The options parameters.
   */
  getEntityTag(
    resourceGroupName: string,
    serviceName: string,
    groupId: string,
    options?: GroupGetEntityTagOptionalParams,
  ): Promise<GroupGetEntityTagResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, groupId, options },
      getEntityTagOperationSpec,
    );
  }

  /**
   * Gets the details of the group specified by its identifier.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param groupId Group identifier. Must be unique in the current API Management service instance.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serviceName: string,
    groupId: string,
    options?: GroupGetOptionalParams,
  ): Promise<GroupGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, groupId, options },
      getOperationSpec,
    );
  }

  /**
   * Creates or Updates a group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param groupId Group identifier. Must be unique in the current API Management service instance.
   * @param parameters Create parameters.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    serviceName: string,
    groupId: string,
    parameters: GroupCreateParameters,
    options?: GroupCreateOrUpdateOptionalParams,
  ): Promise<GroupCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, groupId, parameters, options },
      createOrUpdateOperationSpec,
    );
  }

  /**
   * Updates the details of the group specified by its identifier.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param groupId Group identifier. Must be unique in the current API Management service instance.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param parameters Update parameters.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    serviceName: string,
    groupId: string,
    ifMatch: string,
    parameters: GroupUpdateParameters,
    options?: GroupUpdateOptionalParams,
  ): Promise<GroupUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, groupId, ifMatch, parameters, options },
      updateOperationSpec,
    );
  }

  /**
   * Deletes specific group of the API Management service instance.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param groupId Group identifier. Must be unique in the current API Management service instance.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    serviceName: string,
    groupId: string,
    ifMatch: string,
    options?: GroupDeleteOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, groupId, ifMatch, options },
      deleteOperationSpec,
    );
  }

  /**
   * ListByServiceNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param nextLink The nextLink from the previous successful call to the ListByService method.
   * @param options The options parameters.
   */
  private _listByServiceNext(
    resourceGroupName: string,
    serviceName: string,
    nextLink: string,
    options?: GroupListByServiceNextOptionalParams,
  ): Promise<GroupListByServiceNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, nextLink, options },
      listByServiceNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByServiceOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/groups",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GroupCollection,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.filter,
    Parameters.top,
    Parameters.skip,
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.serviceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getEntityTagOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/groups/{groupId}",
  httpMethod: "HEAD",
  responses: {
    200: {
      headersMapper: Mappers.GroupGetEntityTagHeaders,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.serviceName,
    Parameters.groupId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/groups/{groupId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GroupContract,
      headersMapper: Mappers.GroupGetHeaders,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.serviceName,
    Parameters.groupId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/groups/{groupId}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.GroupContract,
      headersMapper: Mappers.GroupCreateOrUpdateHeaders,
    },
    201: {
      bodyMapper: Mappers.GroupContract,
      headersMapper: Mappers.GroupCreateOrUpdateHeaders,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.parameters55,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.serviceName,
    Parameters.groupId,
  ],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept,
    Parameters.ifMatch,
  ],
  mediaType: "json",
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/groups/{groupId}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.GroupContract,
      headersMapper: Mappers.GroupUpdateHeaders,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.parameters56,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.serviceName,
    Parameters.groupId,
  ],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept,
    Parameters.ifMatch1,
  ],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/groups/{groupId}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.serviceName,
    Parameters.groupId,
  ],
  headerParameters: [Parameters.accept, Parameters.ifMatch1],
  serializer,
};
const listByServiceNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GroupCollection,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.serviceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
