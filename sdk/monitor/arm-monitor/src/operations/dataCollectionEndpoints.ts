/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { DataCollectionEndpoints } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { MonitorClient } from "../monitorClient.js";
import {
  DataCollectionEndpointResource,
  DataCollectionEndpointsListByResourceGroupNextOptionalParams,
  DataCollectionEndpointsListByResourceGroupOptionalParams,
  DataCollectionEndpointsListByResourceGroupResponse,
  DataCollectionEndpointsListBySubscriptionNextOptionalParams,
  DataCollectionEndpointsListBySubscriptionOptionalParams,
  DataCollectionEndpointsListBySubscriptionResponse,
  DataCollectionEndpointsGetOptionalParams,
  DataCollectionEndpointsGetResponse,
  DataCollectionEndpointsCreateOptionalParams,
  DataCollectionEndpointsCreateResponse,
  DataCollectionEndpointsUpdateOptionalParams,
  DataCollectionEndpointsUpdateResponse,
  DataCollectionEndpointsDeleteOptionalParams,
  DataCollectionEndpointsListByResourceGroupNextResponse,
  DataCollectionEndpointsListBySubscriptionNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing DataCollectionEndpoints operations. */
export class DataCollectionEndpointsImpl implements DataCollectionEndpoints {
  private readonly client: MonitorClient;

  /**
   * Initialize a new instance of the class DataCollectionEndpoints class.
   * @param client Reference to the service client
   */
  constructor(client: MonitorClient) {
    this.client = client;
  }

  /**
   * Lists all data collection endpoints in the specified resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  public listByResourceGroup(
    resourceGroupName: string,
    options?: DataCollectionEndpointsListByResourceGroupOptionalParams,
  ): PagedAsyncIterableIterator<DataCollectionEndpointResource> {
    const iter = this.listByResourceGroupPagingAll(resourceGroupName, options);
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
        return this.listByResourceGroupPagingPage(
          resourceGroupName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByResourceGroupPagingPage(
    resourceGroupName: string,
    options?: DataCollectionEndpointsListByResourceGroupOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<DataCollectionEndpointResource[]> {
    let result: DataCollectionEndpointsListByResourceGroupResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByResourceGroup(resourceGroupName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByResourceGroupNext(
        resourceGroupName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByResourceGroupPagingAll(
    resourceGroupName: string,
    options?: DataCollectionEndpointsListByResourceGroupOptionalParams,
  ): AsyncIterableIterator<DataCollectionEndpointResource> {
    for await (const page of this.listByResourceGroupPagingPage(
      resourceGroupName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Lists all data collection endpoints in the specified subscription
   * @param options The options parameters.
   */
  public listBySubscription(
    options?: DataCollectionEndpointsListBySubscriptionOptionalParams,
  ): PagedAsyncIterableIterator<DataCollectionEndpointResource> {
    const iter = this.listBySubscriptionPagingAll(options);
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
        return this.listBySubscriptionPagingPage(options, settings);
      },
    };
  }

  private async *listBySubscriptionPagingPage(
    options?: DataCollectionEndpointsListBySubscriptionOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<DataCollectionEndpointResource[]> {
    let result: DataCollectionEndpointsListBySubscriptionResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listBySubscription(options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listBySubscriptionNext(continuationToken, options);
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listBySubscriptionPagingAll(
    options?: DataCollectionEndpointsListBySubscriptionOptionalParams,
  ): AsyncIterableIterator<DataCollectionEndpointResource> {
    for await (const page of this.listBySubscriptionPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Lists all data collection endpoints in the specified resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  private _listByResourceGroup(
    resourceGroupName: string,
    options?: DataCollectionEndpointsListByResourceGroupOptionalParams,
  ): Promise<DataCollectionEndpointsListByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, options },
      listByResourceGroupOperationSpec,
    );
  }

  /**
   * Lists all data collection endpoints in the specified subscription
   * @param options The options parameters.
   */
  private _listBySubscription(
    options?: DataCollectionEndpointsListBySubscriptionOptionalParams,
  ): Promise<DataCollectionEndpointsListBySubscriptionResponse> {
    return this.client.sendOperationRequest(
      { options },
      listBySubscriptionOperationSpec,
    );
  }

  /**
   * Returns the specified data collection endpoint.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dataCollectionEndpointName The name of the data collection endpoint. The name is case
   *                                   insensitive.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    dataCollectionEndpointName: string,
    options?: DataCollectionEndpointsGetOptionalParams,
  ): Promise<DataCollectionEndpointsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, dataCollectionEndpointName, options },
      getOperationSpec,
    );
  }

  /**
   * Creates or updates a data collection endpoint.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dataCollectionEndpointName The name of the data collection endpoint. The name is case
   *                                   insensitive.
   * @param options The options parameters.
   */
  create(
    resourceGroupName: string,
    dataCollectionEndpointName: string,
    options?: DataCollectionEndpointsCreateOptionalParams,
  ): Promise<DataCollectionEndpointsCreateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, dataCollectionEndpointName, options },
      createOperationSpec,
    );
  }

  /**
   * Updates part of a data collection endpoint.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dataCollectionEndpointName The name of the data collection endpoint. The name is case
   *                                   insensitive.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    dataCollectionEndpointName: string,
    options?: DataCollectionEndpointsUpdateOptionalParams,
  ): Promise<DataCollectionEndpointsUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, dataCollectionEndpointName, options },
      updateOperationSpec,
    );
  }

  /**
   * Deletes a data collection endpoint.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dataCollectionEndpointName The name of the data collection endpoint. The name is case
   *                                   insensitive.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    dataCollectionEndpointName: string,
    options?: DataCollectionEndpointsDeleteOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, dataCollectionEndpointName, options },
      deleteOperationSpec,
    );
  }

  /**
   * ListByResourceGroupNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
   * @param options The options parameters.
   */
  private _listByResourceGroupNext(
    resourceGroupName: string,
    nextLink: string,
    options?: DataCollectionEndpointsListByResourceGroupNextOptionalParams,
  ): Promise<DataCollectionEndpointsListByResourceGroupNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options },
      listByResourceGroupNextOperationSpec,
    );
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  private _listBySubscriptionNext(
    nextLink: string,
    options?: DataCollectionEndpointsListBySubscriptionNextOptionalParams,
  ): Promise<DataCollectionEndpointsListBySubscriptionNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listBySubscriptionNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByResourceGroupOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionEndpoints",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataCollectionEndpointResourceListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponseCommonV2,
    },
  },
  queryParameters: [Parameters.apiVersion14],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listBySubscriptionOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.Insights/dataCollectionEndpoints",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataCollectionEndpointResourceListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponseCommonV2,
    },
  },
  queryParameters: [Parameters.apiVersion14],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionEndpoints/{dataCollectionEndpointName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataCollectionEndpointResource,
    },
    default: {
      bodyMapper: Mappers.ErrorResponseCommonV2,
    },
  },
  queryParameters: [Parameters.apiVersion14],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.dataCollectionEndpointName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionEndpoints/{dataCollectionEndpointName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.DataCollectionEndpointResource,
    },
    201: {
      bodyMapper: Mappers.DataCollectionEndpointResource,
    },
    default: {
      bodyMapper: Mappers.ErrorResponseCommonV2,
    },
  },
  requestBody: Parameters.body1,
  queryParameters: [Parameters.apiVersion14],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.dataCollectionEndpointName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionEndpoints/{dataCollectionEndpointName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.DataCollectionEndpointResource,
    },
    default: {
      bodyMapper: Mappers.ErrorResponseCommonV2,
    },
  },
  requestBody: Parameters.body2,
  queryParameters: [Parameters.apiVersion14],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.dataCollectionEndpointName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionEndpoints/{dataCollectionEndpointName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponseCommonV2,
    },
  },
  queryParameters: [Parameters.apiVersion14],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.dataCollectionEndpointName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByResourceGroupNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataCollectionEndpointResourceListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponseCommonV2,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listBySubscriptionNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataCollectionEndpointResourceListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponseCommonV2,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
