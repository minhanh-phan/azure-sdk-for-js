/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { Services } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { MobileNetworkManagementClient } from "../mobileNetworkManagementClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  Service,
  ServicesListByMobileNetworkNextOptionalParams,
  ServicesListByMobileNetworkOptionalParams,
  ServicesListByMobileNetworkResponse,
  ServicesDeleteOptionalParams,
  ServicesGetOptionalParams,
  ServicesGetResponse,
  ServicesCreateOrUpdateOptionalParams,
  ServicesCreateOrUpdateResponse,
  TagsObject,
  ServicesUpdateTagsOptionalParams,
  ServicesUpdateTagsResponse,
  ServicesListByMobileNetworkNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Services operations. */
export class ServicesImpl implements Services {
  private readonly client: MobileNetworkManagementClient;

  /**
   * Initialize a new instance of the class Services class.
   * @param client Reference to the service client
   */
  constructor(client: MobileNetworkManagementClient) {
    this.client = client;
  }

  /**
   * Gets all the services in a mobile network.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param mobileNetworkName The name of the mobile network.
   * @param options The options parameters.
   */
  public listByMobileNetwork(
    resourceGroupName: string,
    mobileNetworkName: string,
    options?: ServicesListByMobileNetworkOptionalParams,
  ): PagedAsyncIterableIterator<Service> {
    const iter = this.listByMobileNetworkPagingAll(
      resourceGroupName,
      mobileNetworkName,
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
        return this.listByMobileNetworkPagingPage(
          resourceGroupName,
          mobileNetworkName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByMobileNetworkPagingPage(
    resourceGroupName: string,
    mobileNetworkName: string,
    options?: ServicesListByMobileNetworkOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<Service[]> {
    let result: ServicesListByMobileNetworkResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByMobileNetwork(
        resourceGroupName,
        mobileNetworkName,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByMobileNetworkNext(
        resourceGroupName,
        mobileNetworkName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByMobileNetworkPagingAll(
    resourceGroupName: string,
    mobileNetworkName: string,
    options?: ServicesListByMobileNetworkOptionalParams,
  ): AsyncIterableIterator<Service> {
    for await (const page of this.listByMobileNetworkPagingPage(
      resourceGroupName,
      mobileNetworkName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Deletes the specified service.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param mobileNetworkName The name of the mobile network.
   * @param serviceName The name of the service. You must not use any of the following reserved strings -
   *                    `default`, `requested` or `service`
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    mobileNetworkName: string,
    serviceName: string,
    options?: ServicesDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, mobileNetworkName, serviceName, options },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes the specified service.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param mobileNetworkName The name of the mobile network.
   * @param serviceName The name of the service. You must not use any of the following reserved strings -
   *                    `default`, `requested` or `service`
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    mobileNetworkName: string,
    serviceName: string,
    options?: ServicesDeleteOptionalParams,
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      mobileNetworkName,
      serviceName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Gets information about the specified service.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param mobileNetworkName The name of the mobile network.
   * @param serviceName The name of the service. You must not use any of the following reserved strings -
   *                    `default`, `requested` or `service`
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    mobileNetworkName: string,
    serviceName: string,
    options?: ServicesGetOptionalParams,
  ): Promise<ServicesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, mobileNetworkName, serviceName, options },
      getOperationSpec,
    );
  }

  /**
   * Creates or updates a service. Must be created in the same location as its parent mobile network.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param mobileNetworkName The name of the mobile network.
   * @param serviceName The name of the service. You must not use any of the following reserved strings -
   *                    `default`, `requested` or `service`
   * @param parameters Parameters supplied to the create or update service operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    mobileNetworkName: string,
    serviceName: string,
    parameters: Service,
    options?: ServicesCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<ServicesCreateOrUpdateResponse>,
      ServicesCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<ServicesCreateOrUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: {
        resourceGroupName,
        mobileNetworkName,
        serviceName,
        parameters,
        options,
      },
      spec: createOrUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      ServicesCreateOrUpdateResponse,
      OperationState<ServicesCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Creates or updates a service. Must be created in the same location as its parent mobile network.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param mobileNetworkName The name of the mobile network.
   * @param serviceName The name of the service. You must not use any of the following reserved strings -
   *                    `default`, `requested` or `service`
   * @param parameters Parameters supplied to the create or update service operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    mobileNetworkName: string,
    serviceName: string,
    parameters: Service,
    options?: ServicesCreateOrUpdateOptionalParams,
  ): Promise<ServicesCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      mobileNetworkName,
      serviceName,
      parameters,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Updates service tags.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param mobileNetworkName The name of the mobile network.
   * @param serviceName The name of the service. You must not use any of the following reserved strings -
   *                    `default`, `requested` or `service`
   * @param parameters Parameters supplied to update service tags.
   * @param options The options parameters.
   */
  updateTags(
    resourceGroupName: string,
    mobileNetworkName: string,
    serviceName: string,
    parameters: TagsObject,
    options?: ServicesUpdateTagsOptionalParams,
  ): Promise<ServicesUpdateTagsResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        mobileNetworkName,
        serviceName,
        parameters,
        options,
      },
      updateTagsOperationSpec,
    );
  }

  /**
   * Gets all the services in a mobile network.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param mobileNetworkName The name of the mobile network.
   * @param options The options parameters.
   */
  private _listByMobileNetwork(
    resourceGroupName: string,
    mobileNetworkName: string,
    options?: ServicesListByMobileNetworkOptionalParams,
  ): Promise<ServicesListByMobileNetworkResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, mobileNetworkName, options },
      listByMobileNetworkOperationSpec,
    );
  }

  /**
   * ListByMobileNetworkNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param mobileNetworkName The name of the mobile network.
   * @param nextLink The nextLink from the previous successful call to the ListByMobileNetwork method.
   * @param options The options parameters.
   */
  private _listByMobileNetworkNext(
    resourceGroupName: string,
    mobileNetworkName: string,
    nextLink: string,
    options?: ServicesListByMobileNetworkNextOptionalParams,
  ): Promise<ServicesListByMobileNetworkNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, mobileNetworkName, nextLink, options },
      listByMobileNetworkNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MobileNetwork/mobileNetworks/{mobileNetworkName}/services/{serviceName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.mobileNetworkName,
    Parameters.serviceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MobileNetwork/mobileNetworks/{mobileNetworkName}/services/{serviceName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Service,
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
    Parameters.mobileNetworkName,
    Parameters.serviceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MobileNetwork/mobileNetworks/{mobileNetworkName}/services/{serviceName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.Service,
    },
    201: {
      bodyMapper: Mappers.Service,
    },
    202: {
      bodyMapper: Mappers.Service,
    },
    204: {
      bodyMapper: Mappers.Service,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.parameters9,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.mobileNetworkName,
    Parameters.serviceName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const updateTagsOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MobileNetwork/mobileNetworks/{mobileNetworkName}/services/{serviceName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.Service,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.parameters1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.mobileNetworkName,
    Parameters.serviceName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const listByMobileNetworkOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MobileNetwork/mobileNetworks/{mobileNetworkName}/services",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ServiceListResult,
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
    Parameters.mobileNetworkName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByMobileNetworkNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ServiceListResult,
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
    Parameters.mobileNetworkName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
