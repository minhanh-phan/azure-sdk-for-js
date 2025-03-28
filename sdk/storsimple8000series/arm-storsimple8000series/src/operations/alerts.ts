/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { Alerts } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { StorSimple8000SeriesManagementClient } from "../storSimple8000SeriesManagementClient.js";
import {
  Alert,
  AlertsListByManagerNextOptionalParams,
  AlertsListByManagerOptionalParams,
  AlertsListByManagerResponse,
  ClearAlertRequest,
  AlertsClearOptionalParams,
  SendTestAlertEmailRequest,
  AlertsSendTestEmailOptionalParams,
  AlertsListByManagerNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Alerts operations. */
export class AlertsImpl implements Alerts {
  private readonly client: StorSimple8000SeriesManagementClient;

  /**
   * Initialize a new instance of the class Alerts class.
   * @param client Reference to the service client
   */
  constructor(client: StorSimple8000SeriesManagementClient) {
    this.client = client;
  }

  /**
   * Retrieves all the alerts in a manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  public listByManager(
    resourceGroupName: string,
    managerName: string,
    options?: AlertsListByManagerOptionalParams
  ): PagedAsyncIterableIterator<Alert> {
    const iter = this.listByManagerPagingAll(
      resourceGroupName,
      managerName,
      options
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
        return this.listByManagerPagingPage(
          resourceGroupName,
          managerName,
          options,
          settings
        );
      }
    };
  }

  private async *listByManagerPagingPage(
    resourceGroupName: string,
    managerName: string,
    options?: AlertsListByManagerOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<Alert[]> {
    let result: AlertsListByManagerResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByManager(
        resourceGroupName,
        managerName,
        options
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByManagerNext(
        resourceGroupName,
        managerName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByManagerPagingAll(
    resourceGroupName: string,
    managerName: string,
    options?: AlertsListByManagerOptionalParams
  ): AsyncIterableIterator<Alert> {
    for await (const page of this.listByManagerPagingPage(
      resourceGroupName,
      managerName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Retrieves all the alerts in a manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  private _listByManager(
    resourceGroupName: string,
    managerName: string,
    options?: AlertsListByManagerOptionalParams
  ): Promise<AlertsListByManagerResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options },
      listByManagerOperationSpec
    );
  }

  /**
   * Clear the alerts.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param parameters The clear alert request.
   * @param options The options parameters.
   */
  clear(
    resourceGroupName: string,
    managerName: string,
    parameters: ClearAlertRequest,
    options?: AlertsClearOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, parameters, options },
      clearOperationSpec
    );
  }

  /**
   * Sends a test alert email.
   * @param deviceName The device name
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param parameters The send test alert email request.
   * @param options The options parameters.
   */
  sendTestEmail(
    deviceName: string,
    resourceGroupName: string,
    managerName: string,
    parameters: SendTestAlertEmailRequest,
    options?: AlertsSendTestEmailOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { deviceName, resourceGroupName, managerName, parameters, options },
      sendTestEmailOperationSpec
    );
  }

  /**
   * ListByManagerNext
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param nextLink The nextLink from the previous successful call to the ListByManager method.
   * @param options The options parameters.
   */
  private _listByManagerNext(
    resourceGroupName: string,
    managerName: string,
    nextLink: string,
    options?: AlertsListByManagerNextOptionalParams
  ): Promise<AlertsListByManagerNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, nextLink, options },
      listByManagerNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByManagerOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/alerts",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AlertList
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const clearOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/clearAlerts",
  httpMethod: "POST",
  responses: { 204: {} },
  requestBody: Parameters.parameters4,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const sendTestEmailOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/sendTestAlertEmail",
  httpMethod: "POST",
  responses: { 204: {} },
  requestBody: Parameters.parameters5,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.deviceName
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const listByManagerNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AlertList
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
