/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { BackupPolicies } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { DataProtectionClient } from "../dataProtectionClient.js";
import {
  BaseBackupPolicyResource,
  BackupPoliciesListNextOptionalParams,
  BackupPoliciesListOptionalParams,
  BackupPoliciesListResponse,
  BackupPoliciesGetOptionalParams,
  BackupPoliciesGetResponse,
  BackupPoliciesCreateOrUpdateOptionalParams,
  BackupPoliciesCreateOrUpdateResponse,
  BackupPoliciesDeleteOptionalParams,
  BackupPoliciesListNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing BackupPolicies operations. */
export class BackupPoliciesImpl implements BackupPolicies {
  private readonly client: DataProtectionClient;

  /**
   * Initialize a new instance of the class BackupPolicies class.
   * @param client Reference to the service client
   */
  constructor(client: DataProtectionClient) {
    this.client = client;
  }

  /**
   * Returns list of backup policies belonging to a backup vault
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param vaultName The name of the backup vault.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    vaultName: string,
    options?: BackupPoliciesListOptionalParams,
  ): PagedAsyncIterableIterator<BaseBackupPolicyResource> {
    const iter = this.listPagingAll(resourceGroupName, vaultName, options);
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
        return this.listPagingPage(
          resourceGroupName,
          vaultName,
          options,
          settings,
        );
      },
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    vaultName: string,
    options?: BackupPoliciesListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<BaseBackupPolicyResource[]> {
    let result: BackupPoliciesListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(resourceGroupName, vaultName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        vaultName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    vaultName: string,
    options?: BackupPoliciesListOptionalParams,
  ): AsyncIterableIterator<BaseBackupPolicyResource> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      vaultName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Returns list of backup policies belonging to a backup vault
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param vaultName The name of the backup vault.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    vaultName: string,
    options?: BackupPoliciesListOptionalParams,
  ): Promise<BackupPoliciesListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, vaultName, options },
      listOperationSpec,
    );
  }

  /**
   * Gets a backup policy belonging to a backup vault
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param vaultName The name of the backup vault.
   * @param backupPolicyName
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    vaultName: string,
    backupPolicyName: string,
    options?: BackupPoliciesGetOptionalParams,
  ): Promise<BackupPoliciesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, vaultName, backupPolicyName, options },
      getOperationSpec,
    );
  }

  /**
   * Creates or Updates a backup policy belonging to a backup vault
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param vaultName The name of the backup vault.
   * @param backupPolicyName Name of the policy
   * @param parameters Request body for operation
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    vaultName: string,
    backupPolicyName: string,
    parameters: BaseBackupPolicyResource,
    options?: BackupPoliciesCreateOrUpdateOptionalParams,
  ): Promise<BackupPoliciesCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, vaultName, backupPolicyName, parameters, options },
      createOrUpdateOperationSpec,
    );
  }

  /**
   * Deletes a backup policy belonging to a backup vault
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param vaultName The name of the backup vault.
   * @param backupPolicyName
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    vaultName: string,
    backupPolicyName: string,
    options?: BackupPoliciesDeleteOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, vaultName, backupPolicyName, options },
      deleteOperationSpec,
    );
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param vaultName The name of the backup vault.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    vaultName: string,
    nextLink: string,
    options?: BackupPoliciesListNextOptionalParams,
  ): Promise<BackupPoliciesListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, vaultName, nextLink, options },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupPolicies",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BaseBackupPolicyResourceList,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.vaultName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupPolicies/{backupPolicyName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BaseBackupPolicyResource,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.vaultName,
    Parameters.backupPolicyName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupPolicies/{backupPolicyName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.BaseBackupPolicyResource,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  requestBody: Parameters.parameters4,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.vaultName,
    Parameters.backupPolicyName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupPolicies/{backupPolicyName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.vaultName,
    Parameters.backupPolicyName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BaseBackupPolicyResourceList,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.vaultName,
    Parameters.nextLink,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
