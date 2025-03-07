/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { ServicePrincipals } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { AutomanageClient } from "../automanageClient.js";
import {
  ServicePrincipal,
  ServicePrincipalsListBySubscriptionOptionalParams,
  ServicePrincipalsListBySubscriptionResponse,
  ServicePrincipalsGetOptionalParams,
  ServicePrincipalsGetResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing ServicePrincipals operations. */
export class ServicePrincipalsImpl implements ServicePrincipals {
  private readonly client: AutomanageClient;

  /**
   * Initialize a new instance of the class ServicePrincipals class.
   * @param client Reference to the service client
   */
  constructor(client: AutomanageClient) {
    this.client = client;
  }

  /**
   * Get the Automanage AAD first party Application Service Principal details for the subscription id.
   * @param options The options parameters.
   */
  public listBySubscription(
    options?: ServicePrincipalsListBySubscriptionOptionalParams
  ): PagedAsyncIterableIterator<ServicePrincipal> {
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
    options?: ServicePrincipalsListBySubscriptionOptionalParams,
    _settings?: PageSettings
  ): AsyncIterableIterator<ServicePrincipal[]> {
    let result: ServicePrincipalsListBySubscriptionResponse;
    result = await this._listBySubscription(options);
    yield result.value || [];
  }

  private async *listBySubscriptionPagingAll(
    options?: ServicePrincipalsListBySubscriptionOptionalParams
  ): AsyncIterableIterator<ServicePrincipal> {
    for await (const page of this.listBySubscriptionPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Get the Automanage AAD first party Application Service Principal details for the subscription id.
   * @param options The options parameters.
   */
  private _listBySubscription(
    options?: ServicePrincipalsListBySubscriptionOptionalParams
  ): Promise<ServicePrincipalsListBySubscriptionResponse> {
    return this.client.sendOperationRequest(
      { options },
      listBySubscriptionOperationSpec
    );
  }

  /**
   * Get the Automanage AAD first party Application Service Principal details for the subscription id.
   * @param options The options parameters.
   */
  get(
    options?: ServicePrincipalsGetOptionalParams
  ): Promise<ServicePrincipalsGetResponse> {
    return this.client.sendOperationRequest({ options }, getOperationSpec);
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listBySubscriptionOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Automanage/servicePrincipals",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ServicePrincipalListResult
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
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Automanage/servicePrincipals/default",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ServicePrincipal
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
