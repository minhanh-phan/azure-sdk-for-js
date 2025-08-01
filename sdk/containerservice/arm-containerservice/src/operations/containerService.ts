/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import type { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import type { ContainerService } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import type { ContainerServiceClient } from "../containerServiceClient.js";
import type {
  NodeImageVersion,
  ContainerServiceListNodeImageVersionsNextOptionalParams,
  ContainerServiceListNodeImageVersionsOptionalParams,
  ContainerServiceListNodeImageVersionsResponse,
  ContainerServiceListNodeImageVersionsNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing ContainerService operations. */
export class ContainerServiceImpl implements ContainerService {
  private readonly client: ContainerServiceClient;

  /**
   * Initialize a new instance of the class ContainerService class.
   * @param client Reference to the service client
   */
  constructor(client: ContainerServiceClient) {
    this.client = client;
  }

  /**
   * Only returns the latest version of each node image. For example there may be an
   * AKSUbuntu-1804gen2containerd-2024.01.26, but only AKSUbuntu-1804gen2containerd-2024.02.02 is visible
   * in this list.
   * @param location The name of the Azure region.
   * @param options The options parameters.
   */
  public listNodeImageVersions(
    location: string,
    options?: ContainerServiceListNodeImageVersionsOptionalParams,
  ): PagedAsyncIterableIterator<NodeImageVersion> {
    const iter = this.listNodeImageVersionsPagingAll(location, options);
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
        return this.listNodeImageVersionsPagingPage(location, options, settings);
      },
    };
  }

  private async *listNodeImageVersionsPagingPage(
    location: string,
    options?: ContainerServiceListNodeImageVersionsOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<NodeImageVersion[]> {
    let result: ContainerServiceListNodeImageVersionsResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listNodeImageVersions(location, options);
      const page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNodeImageVersionsNext(location, continuationToken, options);
      continuationToken = result.nextLink;
      const page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listNodeImageVersionsPagingAll(
    location: string,
    options?: ContainerServiceListNodeImageVersionsOptionalParams,
  ): AsyncIterableIterator<NodeImageVersion> {
    for await (const page of this.listNodeImageVersionsPagingPage(location, options)) {
      yield* page;
    }
  }

  /**
   * Only returns the latest version of each node image. For example there may be an
   * AKSUbuntu-1804gen2containerd-2024.01.26, but only AKSUbuntu-1804gen2containerd-2024.02.02 is visible
   * in this list.
   * @param location The name of the Azure region.
   * @param options The options parameters.
   */
  private _listNodeImageVersions(
    location: string,
    options?: ContainerServiceListNodeImageVersionsOptionalParams,
  ): Promise<ContainerServiceListNodeImageVersionsResponse> {
    return this.client.sendOperationRequest(
      { location, options },
      listNodeImageVersionsOperationSpec,
    );
  }

  /**
   * ListNodeImageVersionsNext
   * @param location The name of the Azure region.
   * @param nextLink The nextLink from the previous successful call to the ListNodeImageVersions method.
   * @param options The options parameters.
   */
  private _listNodeImageVersionsNext(
    location: string,
    nextLink: string,
    options?: ContainerServiceListNodeImageVersionsNextOptionalParams,
  ): Promise<ContainerServiceListNodeImageVersionsNextResponse> {
    return this.client.sendOperationRequest(
      { location, nextLink, options },
      listNodeImageVersionsNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listNodeImageVersionsOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/locations/{location}/nodeImageVersions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NodeImageVersionsListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId, Parameters.location],
  headerParameters: [Parameters.accept],
  serializer,
};
const listNodeImageVersionsNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NodeImageVersionsListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location,
    Parameters.nextLink,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
