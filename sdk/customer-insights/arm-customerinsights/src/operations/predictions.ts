/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { Predictions } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { CustomerInsightsManagementClient } from "../customerInsightsManagementClient.js";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl.js";
import {
  PredictionResourceFormat,
  PredictionsListByHubNextOptionalParams,
  PredictionsListByHubOptionalParams,
  PredictionsListByHubResponse,
  PredictionsCreateOrUpdateOptionalParams,
  PredictionsCreateOrUpdateResponse,
  PredictionsGetOptionalParams,
  PredictionsGetResponse,
  PredictionsDeleteOptionalParams,
  PredictionsGetTrainingResultsOptionalParams,
  PredictionsGetTrainingResultsResponse,
  PredictionsGetModelStatusOptionalParams,
  PredictionsGetModelStatusResponse,
  PredictionModelStatus,
  PredictionsModelStatusOptionalParams,
  PredictionsListByHubNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Predictions operations. */
export class PredictionsImpl implements Predictions {
  private readonly client: CustomerInsightsManagementClient;

  /**
   * Initialize a new instance of the class Predictions class.
   * @param client Reference to the service client
   */
  constructor(client: CustomerInsightsManagementClient) {
    this.client = client;
  }

  /**
   * Gets all the predictions in the specified hub.
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param options The options parameters.
   */
  public listByHub(
    resourceGroupName: string,
    hubName: string,
    options?: PredictionsListByHubOptionalParams
  ): PagedAsyncIterableIterator<PredictionResourceFormat> {
    const iter = this.listByHubPagingAll(resourceGroupName, hubName, options);
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
        return this.listByHubPagingPage(
          resourceGroupName,
          hubName,
          options,
          settings
        );
      }
    };
  }

  private async *listByHubPagingPage(
    resourceGroupName: string,
    hubName: string,
    options?: PredictionsListByHubOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<PredictionResourceFormat[]> {
    let result: PredictionsListByHubResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByHub(resourceGroupName, hubName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByHubNext(
        resourceGroupName,
        hubName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByHubPagingAll(
    resourceGroupName: string,
    hubName: string,
    options?: PredictionsListByHubOptionalParams
  ): AsyncIterableIterator<PredictionResourceFormat> {
    for await (const page of this.listByHubPagingPage(
      resourceGroupName,
      hubName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Creates a Prediction or updates an existing Prediction in the hub.
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param predictionName The name of the Prediction.
   * @param parameters Parameters supplied to the create/update Prediction operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    hubName: string,
    predictionName: string,
    parameters: PredictionResourceFormat,
    options?: PredictionsCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<PredictionsCreateOrUpdateResponse>,
      PredictionsCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<PredictionsCreateOrUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      { resourceGroupName, hubName, predictionName, parameters, options },
      createOrUpdateOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Creates a Prediction or updates an existing Prediction in the hub.
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param predictionName The name of the Prediction.
   * @param parameters Parameters supplied to the create/update Prediction operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    hubName: string,
    predictionName: string,
    parameters: PredictionResourceFormat,
    options?: PredictionsCreateOrUpdateOptionalParams
  ): Promise<PredictionsCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      hubName,
      predictionName,
      parameters,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Gets a Prediction in the hub.
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param predictionName The name of the Prediction.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    hubName: string,
    predictionName: string,
    options?: PredictionsGetOptionalParams
  ): Promise<PredictionsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, hubName, predictionName, options },
      getOperationSpec
    );
  }

  /**
   * Deletes a Prediction in the hub.
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param predictionName The name of the Prediction.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    hubName: string,
    predictionName: string,
    options?: PredictionsDeleteOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      { resourceGroupName, hubName, predictionName, options },
      deleteOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes a Prediction in the hub.
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param predictionName The name of the Prediction.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    hubName: string,
    predictionName: string,
    options?: PredictionsDeleteOptionalParams
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      hubName,
      predictionName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Gets training results.
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param predictionName The name of the Prediction.
   * @param options The options parameters.
   */
  getTrainingResults(
    resourceGroupName: string,
    hubName: string,
    predictionName: string,
    options?: PredictionsGetTrainingResultsOptionalParams
  ): Promise<PredictionsGetTrainingResultsResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, hubName, predictionName, options },
      getTrainingResultsOperationSpec
    );
  }

  /**
   * Gets model status of the prediction.
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param predictionName The name of the Prediction.
   * @param options The options parameters.
   */
  getModelStatus(
    resourceGroupName: string,
    hubName: string,
    predictionName: string,
    options?: PredictionsGetModelStatusOptionalParams
  ): Promise<PredictionsGetModelStatusResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, hubName, predictionName, options },
      getModelStatusOperationSpec
    );
  }

  /**
   * Creates or updates the model status of prediction.
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param predictionName The name of the Prediction.
   * @param parameters Parameters supplied to the create/update prediction model status operation.
   * @param options The options parameters.
   */
  modelStatus(
    resourceGroupName: string,
    hubName: string,
    predictionName: string,
    parameters: PredictionModelStatus,
    options?: PredictionsModelStatusOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, hubName, predictionName, parameters, options },
      modelStatusOperationSpec
    );
  }

  /**
   * Gets all the predictions in the specified hub.
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param options The options parameters.
   */
  private _listByHub(
    resourceGroupName: string,
    hubName: string,
    options?: PredictionsListByHubOptionalParams
  ): Promise<PredictionsListByHubResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, hubName, options },
      listByHubOperationSpec
    );
  }

  /**
   * ListByHubNext
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param nextLink The nextLink from the previous successful call to the ListByHub method.
   * @param options The options parameters.
   */
  private _listByHubNext(
    resourceGroupName: string,
    hubName: string,
    nextLink: string,
    options?: PredictionsListByHubNextOptionalParams
  ): Promise<PredictionsListByHubNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, hubName, nextLink, options },
      listByHubNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/predictions/{predictionName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.PredictionResourceFormat
    },
    201: {
      bodyMapper: Mappers.PredictionResourceFormat
    },
    202: {
      bodyMapper: Mappers.PredictionResourceFormat
    },
    204: {
      bodyMapper: Mappers.PredictionResourceFormat
    }
  },
  requestBody: Parameters.parameters13,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.hubName1,
    Parameters.predictionName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/predictions/{predictionName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PredictionResourceFormat
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.hubName1,
    Parameters.predictionName1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/predictions/{predictionName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.hubName1,
    Parameters.predictionName1
  ],
  serializer
};
const getTrainingResultsOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/predictions/{predictionName}/getTrainingResults",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.PredictionTrainingResults
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.hubName1,
    Parameters.predictionName1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getModelStatusOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/predictions/{predictionName}/getModelStatus",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.PredictionModelStatus
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.hubName1,
    Parameters.predictionName1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const modelStatusOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/predictions/{predictionName}/modelStatus",
  httpMethod: "POST",
  responses: { 200: {} },
  requestBody: Parameters.parameters14,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.hubName1,
    Parameters.predictionName1
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const listByHubOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/predictions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PredictionListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.hubName1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByHubNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PredictionListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.hubName1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
