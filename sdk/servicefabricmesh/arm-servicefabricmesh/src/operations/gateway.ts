/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { Gateway } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { ServiceFabricMeshManagementClient } from "../serviceFabricMeshManagementClient.js";
import {
  GatewayResourceDescription,
  GatewayListByResourceGroupNextOptionalParams,
  GatewayListByResourceGroupOptionalParams,
  GatewayListByResourceGroupResponse,
  GatewayListBySubscriptionNextOptionalParams,
  GatewayListBySubscriptionOptionalParams,
  GatewayListBySubscriptionResponse,
  GatewayCreateOptionalParams,
  GatewayCreateResponse,
  GatewayGetOptionalParams,
  GatewayGetResponse,
  GatewayDeleteOptionalParams,
  GatewayListByResourceGroupNextResponse,
  GatewayListBySubscriptionNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Gateway operations. */
export class GatewayImpl implements Gateway {
  private readonly client: ServiceFabricMeshManagementClient;

  /**
   * Initialize a new instance of the class Gateway class.
   * @param client Reference to the service client
   */
  constructor(client: ServiceFabricMeshManagementClient) {
    this.client = client;
  }

  /**
   * Gets the information about all gateway resources in a given resource group. The information include
   * the description and other properties of the Gateway.
   * @param resourceGroupName Azure resource group name
   * @param options The options parameters.
   */
  public listByResourceGroup(
    resourceGroupName: string,
    options?: GatewayListByResourceGroupOptionalParams
  ): PagedAsyncIterableIterator<GatewayResourceDescription> {
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
          settings
        );
      }
    };
  }

  private async *listByResourceGroupPagingPage(
    resourceGroupName: string,
    options?: GatewayListByResourceGroupOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<GatewayResourceDescription[]> {
    let result: GatewayListByResourceGroupResponse;
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
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByResourceGroupPagingAll(
    resourceGroupName: string,
    options?: GatewayListByResourceGroupOptionalParams
  ): AsyncIterableIterator<GatewayResourceDescription> {
    for await (const page of this.listByResourceGroupPagingPage(
      resourceGroupName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Gets the information about all gateway resources in a given resource group. The information include
   * the description and other properties of the gateway.
   * @param options The options parameters.
   */
  public listBySubscription(
    options?: GatewayListBySubscriptionOptionalParams
  ): PagedAsyncIterableIterator<GatewayResourceDescription> {
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
    options?: GatewayListBySubscriptionOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<GatewayResourceDescription[]> {
    let result: GatewayListBySubscriptionResponse;
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
    options?: GatewayListBySubscriptionOptionalParams
  ): AsyncIterableIterator<GatewayResourceDescription> {
    for await (const page of this.listBySubscriptionPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Creates a gateway resource with the specified name, description and properties. If a gateway
   * resource with the same name exists, then it is updated with the specified description and
   * properties. Use gateway resources to create a gateway for public connectivity for services within
   * your application.
   * @param resourceGroupName Azure resource group name
   * @param gatewayResourceName The identity of the gateway.
   * @param gatewayResourceDescription Description for creating a Gateway resource.
   * @param options The options parameters.
   */
  create(
    resourceGroupName: string,
    gatewayResourceName: string,
    gatewayResourceDescription: GatewayResourceDescription,
    options?: GatewayCreateOptionalParams
  ): Promise<GatewayCreateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        gatewayResourceName,
        gatewayResourceDescription,
        options
      },
      createOperationSpec
    );
  }

  /**
   * Gets the information about the gateway resource with the given name. The information include the
   * description and other properties of the gateway.
   * @param resourceGroupName Azure resource group name
   * @param gatewayResourceName The identity of the gateway.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    gatewayResourceName: string,
    options?: GatewayGetOptionalParams
  ): Promise<GatewayGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, gatewayResourceName, options },
      getOperationSpec
    );
  }

  /**
   * Deletes the gateway resource identified by the name.
   * @param resourceGroupName Azure resource group name
   * @param gatewayResourceName The identity of the gateway.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    gatewayResourceName: string,
    options?: GatewayDeleteOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, gatewayResourceName, options },
      deleteOperationSpec
    );
  }

  /**
   * Gets the information about all gateway resources in a given resource group. The information include
   * the description and other properties of the Gateway.
   * @param resourceGroupName Azure resource group name
   * @param options The options parameters.
   */
  private _listByResourceGroup(
    resourceGroupName: string,
    options?: GatewayListByResourceGroupOptionalParams
  ): Promise<GatewayListByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, options },
      listByResourceGroupOperationSpec
    );
  }

  /**
   * Gets the information about all gateway resources in a given resource group. The information include
   * the description and other properties of the gateway.
   * @param options The options parameters.
   */
  private _listBySubscription(
    options?: GatewayListBySubscriptionOptionalParams
  ): Promise<GatewayListBySubscriptionResponse> {
    return this.client.sendOperationRequest(
      { options },
      listBySubscriptionOperationSpec
    );
  }

  /**
   * ListByResourceGroupNext
   * @param resourceGroupName Azure resource group name
   * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
   * @param options The options parameters.
   */
  private _listByResourceGroupNext(
    resourceGroupName: string,
    nextLink: string,
    options?: GatewayListByResourceGroupNextOptionalParams
  ): Promise<GatewayListByResourceGroupNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options },
      listByResourceGroupNextOperationSpec
    );
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  private _listBySubscriptionNext(
    nextLink: string,
    options?: GatewayListBySubscriptionNextOptionalParams
  ): Promise<GatewayListBySubscriptionNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listBySubscriptionNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const createOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabricMesh/gateways/{gatewayResourceName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.GatewayResourceDescription
    },
    201: {
      bodyMapper: Mappers.GatewayResourceDescription
    },
    202: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.gatewayResourceDescription,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.gatewayResourceName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabricMesh/gateways/{gatewayResourceName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GatewayResourceDescription
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.gatewayResourceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabricMesh/gateways/{gatewayResourceName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.gatewayResourceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByResourceGroupOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabricMesh/gateways",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GatewayResourceDescriptionList
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listBySubscriptionOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabricMesh/gateways",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GatewayResourceDescriptionList
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listByResourceGroupNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GatewayResourceDescriptionList
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listBySubscriptionNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GatewayResourceDescriptionList
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
