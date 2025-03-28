/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { MarketplaceAgreements } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { MicrosoftDatadogClient } from "../microsoftDatadogClient.js";
import {
  DatadogAgreementResource,
  MarketplaceAgreementsListNextOptionalParams,
  MarketplaceAgreementsListOptionalParams,
  MarketplaceAgreementsListResponse,
  MarketplaceAgreementsCreateOrUpdateOptionalParams,
  MarketplaceAgreementsCreateOrUpdateResponse,
  MarketplaceAgreementsListNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing MarketplaceAgreements operations. */
export class MarketplaceAgreementsImpl implements MarketplaceAgreements {
  private readonly client: MicrosoftDatadogClient;

  /**
   * Initialize a new instance of the class MarketplaceAgreements class.
   * @param client Reference to the service client
   */
  constructor(client: MicrosoftDatadogClient) {
    this.client = client;
  }

  /**
   * List Datadog marketplace agreements in the subscription.
   * @param options The options parameters.
   */
  public list(
    options?: MarketplaceAgreementsListOptionalParams
  ): PagedAsyncIterableIterator<DatadogAgreementResource> {
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
      }
    };
  }

  private async *listPagingPage(
    options?: MarketplaceAgreementsListOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<DatadogAgreementResource[]> {
    let result: MarketplaceAgreementsListResponse;
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
    options?: MarketplaceAgreementsListOptionalParams
  ): AsyncIterableIterator<DatadogAgreementResource> {
    for await (const page of this.listPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * List Datadog marketplace agreements in the subscription.
   * @param options The options parameters.
   */
  private _list(
    options?: MarketplaceAgreementsListOptionalParams
  ): Promise<MarketplaceAgreementsListResponse> {
    return this.client.sendOperationRequest({ options }, listOperationSpec);
  }

  /**
   * Create Datadog marketplace agreement in the subscription.
   * @param options The options parameters.
   */
  createOrUpdate(
    options?: MarketplaceAgreementsCreateOrUpdateOptionalParams
  ): Promise<MarketplaceAgreementsCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      { options },
      createOrUpdateOperationSpec
    );
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    nextLink: string,
    options?: MarketplaceAgreementsListNextOptionalParams
  ): Promise<MarketplaceAgreementsListNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Datadog/agreements",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DatadogAgreementResourceListResponse
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
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Datadog/agreements/default",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.DatadogAgreementResource
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.body,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DatadogAgreementResourceListResponse
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
