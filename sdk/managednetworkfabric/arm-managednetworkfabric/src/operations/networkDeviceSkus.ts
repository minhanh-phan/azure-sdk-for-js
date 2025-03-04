/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { NetworkDeviceSkus } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { AzureNetworkFabricManagementServiceAPI } from "../azureNetworkFabricManagementServiceAPI.js";
import {
  NetworkDeviceSku,
  NetworkDeviceSkusListBySubscriptionNextOptionalParams,
  NetworkDeviceSkusListBySubscriptionOptionalParams,
  NetworkDeviceSkusListBySubscriptionResponse,
  NetworkDeviceSkusGetOptionalParams,
  NetworkDeviceSkusGetResponse,
  NetworkDeviceSkusListBySubscriptionNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing NetworkDeviceSkus operations. */
export class NetworkDeviceSkusImpl implements NetworkDeviceSkus {
  private readonly client: AzureNetworkFabricManagementServiceAPI;

  /**
   * Initialize a new instance of the class NetworkDeviceSkus class.
   * @param client Reference to the service client
   */
  constructor(client: AzureNetworkFabricManagementServiceAPI) {
    this.client = client;
  }

  /**
   * List Network Device SKUs for the given subscription.
   * @param options The options parameters.
   */
  public listBySubscription(
    options?: NetworkDeviceSkusListBySubscriptionOptionalParams
  ): PagedAsyncIterableIterator<NetworkDeviceSku> {
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
      }
    };
  }

  private async *listBySubscriptionPagingPage(
    options?: NetworkDeviceSkusListBySubscriptionOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<NetworkDeviceSku[]> {
    let result: NetworkDeviceSkusListBySubscriptionResponse;
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
    options?: NetworkDeviceSkusListBySubscriptionOptionalParams
  ): AsyncIterableIterator<NetworkDeviceSku> {
    for await (const page of this.listBySubscriptionPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Get a Network Device SKU details.
   * @param networkDeviceSkuName Name of the Network Device SKU.
   * @param options The options parameters.
   */
  get(
    networkDeviceSkuName: string,
    options?: NetworkDeviceSkusGetOptionalParams
  ): Promise<NetworkDeviceSkusGetResponse> {
    return this.client.sendOperationRequest(
      { networkDeviceSkuName, options },
      getOperationSpec
    );
  }

  /**
   * List Network Device SKUs for the given subscription.
   * @param options The options parameters.
   */
  private _listBySubscription(
    options?: NetworkDeviceSkusListBySubscriptionOptionalParams
  ): Promise<NetworkDeviceSkusListBySubscriptionResponse> {
    return this.client.sendOperationRequest(
      { options },
      listBySubscriptionOperationSpec
    );
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  private _listBySubscriptionNext(
    nextLink: string,
    options?: NetworkDeviceSkusListBySubscriptionNextOptionalParams
  ): Promise<NetworkDeviceSkusListBySubscriptionNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listBySubscriptionNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/networkDeviceSkus/{networkDeviceSkuName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NetworkDeviceSku
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.networkDeviceSkuName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listBySubscriptionOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/networkDeviceSkus",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NetworkDeviceSkusListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listBySubscriptionNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NetworkDeviceSkusListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
