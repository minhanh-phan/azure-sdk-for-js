/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { DnsResolverDomainLists } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { DnsResolverManagementClient } from "../dnsResolverManagementClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  DnsResolverDomainList,
  DnsResolverDomainListsListByResourceGroupNextOptionalParams,
  DnsResolverDomainListsListByResourceGroupOptionalParams,
  DnsResolverDomainListsListByResourceGroupResponse,
  DnsResolverDomainListsListNextOptionalParams,
  DnsResolverDomainListsListOptionalParams,
  DnsResolverDomainListsListResponse,
  DnsResolverDomainListsCreateOrUpdateOptionalParams,
  DnsResolverDomainListsCreateOrUpdateResponse,
  DnsResolverDomainListPatch,
  DnsResolverDomainListsUpdateOptionalParams,
  DnsResolverDomainListsUpdateResponse,
  DnsResolverDomainListsDeleteOptionalParams,
  DnsResolverDomainListsDeleteResponse,
  DnsResolverDomainListsGetOptionalParams,
  DnsResolverDomainListsGetResponse,
  DnsResolverDomainListBulk,
  DnsResolverDomainListsBulkOptionalParams,
  DnsResolverDomainListsBulkResponse,
  DnsResolverDomainListsListByResourceGroupNextResponse,
  DnsResolverDomainListsListNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing DnsResolverDomainLists operations. */
export class DnsResolverDomainListsImpl implements DnsResolverDomainLists {
  private readonly client: DnsResolverManagementClient;

  /**
   * Initialize a new instance of the class DnsResolverDomainLists class.
   * @param client Reference to the service client
   */
  constructor(client: DnsResolverManagementClient) {
    this.client = client;
  }

  /**
   * Lists DNS resolver domain lists within a resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  public listByResourceGroup(
    resourceGroupName: string,
    options?: DnsResolverDomainListsListByResourceGroupOptionalParams,
  ): PagedAsyncIterableIterator<DnsResolverDomainList> {
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
    options?: DnsResolverDomainListsListByResourceGroupOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<DnsResolverDomainList[]> {
    let result: DnsResolverDomainListsListByResourceGroupResponse;
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
    options?: DnsResolverDomainListsListByResourceGroupOptionalParams,
  ): AsyncIterableIterator<DnsResolverDomainList> {
    for await (const page of this.listByResourceGroupPagingPage(
      resourceGroupName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Lists DNS resolver domain lists in all resource groups of a subscription.
   * @param options The options parameters.
   */
  public list(
    options?: DnsResolverDomainListsListOptionalParams,
  ): PagedAsyncIterableIterator<DnsResolverDomainList> {
    const iter = this.listPagingAll(options);
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
        return this.listPagingPage(options, settings);
      },
    };
  }

  private async *listPagingPage(
    options?: DnsResolverDomainListsListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<DnsResolverDomainList[]> {
    let result: DnsResolverDomainListsListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(continuationToken, options);
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listPagingAll(
    options?: DnsResolverDomainListsListOptionalParams,
  ): AsyncIterableIterator<DnsResolverDomainList> {
    for await (const page of this.listPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Creates or updates a DNS resolver domain list.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverDomainListName The name of the DNS resolver domain list.
   * @param parameters Parameters supplied to the CreateOrUpdate operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    parameters: DnsResolverDomainList,
    options?: DnsResolverDomainListsCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<DnsResolverDomainListsCreateOrUpdateResponse>,
      DnsResolverDomainListsCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<DnsResolverDomainListsCreateOrUpdateResponse> => {
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
        dnsResolverDomainListName,
        parameters,
        options,
      },
      spec: createOrUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      DnsResolverDomainListsCreateOrUpdateResponse,
      OperationState<DnsResolverDomainListsCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Creates or updates a DNS resolver domain list.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverDomainListName The name of the DNS resolver domain list.
   * @param parameters Parameters supplied to the CreateOrUpdate operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    parameters: DnsResolverDomainList,
    options?: DnsResolverDomainListsCreateOrUpdateOptionalParams,
  ): Promise<DnsResolverDomainListsCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      dnsResolverDomainListName,
      parameters,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Updates a DNS resolver domain list.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverDomainListName The name of the DNS resolver domain list.
   * @param parameters Parameters supplied to the Update operation.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    parameters: DnsResolverDomainListPatch,
    options?: DnsResolverDomainListsUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<DnsResolverDomainListsUpdateResponse>,
      DnsResolverDomainListsUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<DnsResolverDomainListsUpdateResponse> => {
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
        dnsResolverDomainListName,
        parameters,
        options,
      },
      spec: updateOperationSpec,
    });
    const poller = await createHttpPoller<
      DnsResolverDomainListsUpdateResponse,
      OperationState<DnsResolverDomainListsUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Updates a DNS resolver domain list.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverDomainListName The name of the DNS resolver domain list.
   * @param parameters Parameters supplied to the Update operation.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    parameters: DnsResolverDomainListPatch,
    options?: DnsResolverDomainListsUpdateOptionalParams,
  ): Promise<DnsResolverDomainListsUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      dnsResolverDomainListName,
      parameters,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Deletes a DNS resolver domain list. WARNING: This operation cannot be undone.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverDomainListName The name of the DNS resolver domain list.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    options?: DnsResolverDomainListsDeleteOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<DnsResolverDomainListsDeleteResponse>,
      DnsResolverDomainListsDeleteResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<DnsResolverDomainListsDeleteResponse> => {
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
      args: { resourceGroupName, dnsResolverDomainListName, options },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<
      DnsResolverDomainListsDeleteResponse,
      OperationState<DnsResolverDomainListsDeleteResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes a DNS resolver domain list. WARNING: This operation cannot be undone.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverDomainListName The name of the DNS resolver domain list.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    options?: DnsResolverDomainListsDeleteOptionalParams,
  ): Promise<DnsResolverDomainListsDeleteResponse> {
    const poller = await this.beginDelete(
      resourceGroupName,
      dnsResolverDomainListName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Gets properties of a DNS resolver domain list.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverDomainListName The name of the DNS resolver domain list.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    options?: DnsResolverDomainListsGetOptionalParams,
  ): Promise<DnsResolverDomainListsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, dnsResolverDomainListName, options },
      getOperationSpec,
    );
  }

  /**
   * Lists DNS resolver domain lists within a resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  private _listByResourceGroup(
    resourceGroupName: string,
    options?: DnsResolverDomainListsListByResourceGroupOptionalParams,
  ): Promise<DnsResolverDomainListsListByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, options },
      listByResourceGroupOperationSpec,
    );
  }

  /**
   * Lists DNS resolver domain lists in all resource groups of a subscription.
   * @param options The options parameters.
   */
  private _list(
    options?: DnsResolverDomainListsListOptionalParams,
  ): Promise<DnsResolverDomainListsListResponse> {
    return this.client.sendOperationRequest({ options }, listOperationSpec);
  }

  /**
   * Uploads or downloads the list of domains for a DNS Resolver Domain List from a storage link.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverDomainListName The name of the DNS resolver domain list.
   * @param parameters Parameters supplied to the bulk domain list operation.
   * @param options The options parameters.
   */
  async beginBulk(
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    parameters: DnsResolverDomainListBulk,
    options?: DnsResolverDomainListsBulkOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<DnsResolverDomainListsBulkResponse>,
      DnsResolverDomainListsBulkResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<DnsResolverDomainListsBulkResponse> => {
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
        dnsResolverDomainListName,
        parameters,
        options,
      },
      spec: bulkOperationSpec,
    });
    const poller = await createHttpPoller<
      DnsResolverDomainListsBulkResponse,
      OperationState<DnsResolverDomainListsBulkResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Uploads or downloads the list of domains for a DNS Resolver Domain List from a storage link.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverDomainListName The name of the DNS resolver domain list.
   * @param parameters Parameters supplied to the bulk domain list operation.
   * @param options The options parameters.
   */
  async beginBulkAndWait(
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    parameters: DnsResolverDomainListBulk,
    options?: DnsResolverDomainListsBulkOptionalParams,
  ): Promise<DnsResolverDomainListsBulkResponse> {
    const poller = await this.beginBulk(
      resourceGroupName,
      dnsResolverDomainListName,
      parameters,
      options,
    );
    return poller.pollUntilDone();
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
    options?: DnsResolverDomainListsListByResourceGroupNextOptionalParams,
  ): Promise<DnsResolverDomainListsListByResourceGroupNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options },
      listByResourceGroupNextOperationSpec,
    );
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    nextLink: string,
    options?: DnsResolverDomainListsListNextOptionalParams,
  ): Promise<DnsResolverDomainListsListNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverDomainLists/{dnsResolverDomainListName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.DnsResolverDomainList,
    },
    201: {
      bodyMapper: Mappers.DnsResolverDomainList,
    },
    202: {
      bodyMapper: Mappers.DnsResolverDomainList,
    },
    204: {
      bodyMapper: Mappers.DnsResolverDomainList,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.parameters18,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.dnsResolverDomainListName,
  ],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
  ],
  mediaType: "json",
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverDomainLists/{dnsResolverDomainListName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.DnsResolverDomainList,
    },
    201: {
      bodyMapper: Mappers.DnsResolverDomainList,
    },
    202: {
      bodyMapper: Mappers.DnsResolverDomainList,
    },
    204: {
      bodyMapper: Mappers.DnsResolverDomainList,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.parameters19,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.dnsResolverDomainListName,
  ],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept,
    Parameters.ifMatch,
  ],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverDomainLists/{dnsResolverDomainListName}",
  httpMethod: "DELETE",
  responses: {
    200: {
      headersMapper: Mappers.DnsResolverDomainListsDeleteHeaders,
    },
    201: {
      headersMapper: Mappers.DnsResolverDomainListsDeleteHeaders,
    },
    202: {
      headersMapper: Mappers.DnsResolverDomainListsDeleteHeaders,
    },
    204: {
      headersMapper: Mappers.DnsResolverDomainListsDeleteHeaders,
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
    Parameters.dnsResolverDomainListName,
  ],
  headerParameters: [Parameters.accept, Parameters.ifMatch],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverDomainLists/{dnsResolverDomainListName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DnsResolverDomainList,
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
    Parameters.dnsResolverDomainListName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByResourceGroupOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverDomainLists",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DnsResolverDomainListResult,
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
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.Network/dnsResolverDomainLists",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DnsResolverDomainListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion, Parameters.top],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer,
};
const bulkOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverDomainLists/{dnsResolverDomainListName}/bulk",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.DnsResolverDomainList,
    },
    201: {
      bodyMapper: Mappers.DnsResolverDomainList,
    },
    202: {
      bodyMapper: Mappers.DnsResolverDomainList,
    },
    204: {
      bodyMapper: Mappers.DnsResolverDomainList,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.parameters20,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.dnsResolverDomainListName,
  ],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
  ],
  mediaType: "json",
  serializer,
};
const listByResourceGroupNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DnsResolverDomainListResult,
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
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DnsResolverDomainListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
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
