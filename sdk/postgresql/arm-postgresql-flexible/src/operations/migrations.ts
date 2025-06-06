/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import type { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import type { Migrations } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import type { PostgreSQLManagementFlexibleServerClient } from "../postgreSQLManagementFlexibleServerClient.js";
import type {
  MigrationResource,
  MigrationsListByTargetServerNextOptionalParams,
  MigrationsListByTargetServerOptionalParams,
  MigrationsListByTargetServerResponse,
  MigrationsCreateOptionalParams,
  MigrationsCreateResponse,
  MigrationsGetOptionalParams,
  MigrationsGetResponse,
  MigrationResourceForPatch,
  MigrationsUpdateOptionalParams,
  MigrationsUpdateResponse,
  MigrationsDeleteOptionalParams,
  MigrationsListByTargetServerNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Migrations operations. */
export class MigrationsImpl implements Migrations {
  private readonly client: PostgreSQLManagementFlexibleServerClient;

  /**
   * Initialize a new instance of the class Migrations class.
   * @param client Reference to the service client
   */
  constructor(client: PostgreSQLManagementFlexibleServerClient) {
    this.client = client;
  }

  /**
   * List all the migrations on a given target server.
   * @param subscriptionId The subscription ID of the target database server.
   * @param resourceGroupName The resource group name of the target database server.
   * @param targetDbServerName The name of the target database server.
   * @param options The options parameters.
   */
  public listByTargetServer(
    subscriptionId: string,
    resourceGroupName: string,
    targetDbServerName: string,
    options?: MigrationsListByTargetServerOptionalParams,
  ): PagedAsyncIterableIterator<MigrationResource> {
    const iter = this.listByTargetServerPagingAll(
      subscriptionId,
      resourceGroupName,
      targetDbServerName,
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
        return this.listByTargetServerPagingPage(
          subscriptionId,
          resourceGroupName,
          targetDbServerName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByTargetServerPagingPage(
    subscriptionId: string,
    resourceGroupName: string,
    targetDbServerName: string,
    options?: MigrationsListByTargetServerOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<MigrationResource[]> {
    let result: MigrationsListByTargetServerResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByTargetServer(
        subscriptionId,
        resourceGroupName,
        targetDbServerName,
        options,
      );
      const page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByTargetServerNext(
        subscriptionId,
        resourceGroupName,
        targetDbServerName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      const page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByTargetServerPagingAll(
    subscriptionId: string,
    resourceGroupName: string,
    targetDbServerName: string,
    options?: MigrationsListByTargetServerOptionalParams,
  ): AsyncIterableIterator<MigrationResource> {
    for await (const page of this.listByTargetServerPagingPage(
      subscriptionId,
      resourceGroupName,
      targetDbServerName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Creates a new migration.
   * @param subscriptionId The subscription ID of the target database server.
   * @param resourceGroupName The resource group name of the target database server.
   * @param targetDbServerName The name of the target database server.
   * @param migrationName The name of the migration.
   * @param parameters The required parameters for creating a migration.
   * @param options The options parameters.
   */
  create(
    subscriptionId: string,
    resourceGroupName: string,
    targetDbServerName: string,
    migrationName: string,
    parameters: MigrationResource,
    options?: MigrationsCreateOptionalParams,
  ): Promise<MigrationsCreateResponse> {
    return this.client.sendOperationRequest(
      {
        subscriptionId,
        resourceGroupName,
        targetDbServerName,
        migrationName,
        parameters,
        options,
      },
      createOperationSpec,
    );
  }

  /**
   * Gets details of a migration.
   * @param subscriptionId The subscription ID of the target database server.
   * @param resourceGroupName The resource group name of the target database server.
   * @param targetDbServerName The name of the target database server.
   * @param migrationName The name of the migration.
   * @param options The options parameters.
   */
  get(
    subscriptionId: string,
    resourceGroupName: string,
    targetDbServerName: string,
    migrationName: string,
    options?: MigrationsGetOptionalParams,
  ): Promise<MigrationsGetResponse> {
    return this.client.sendOperationRequest(
      {
        subscriptionId,
        resourceGroupName,
        targetDbServerName,
        migrationName,
        options,
      },
      getOperationSpec,
    );
  }

  /**
   * Updates an existing migration. The request body can contain one to many of the mutable properties
   * present in the migration definition. Certain property updates initiate migration state transitions.
   * @param subscriptionId The subscription ID of the target database server.
   * @param resourceGroupName The resource group name of the target database server.
   * @param targetDbServerName The name of the target database server.
   * @param migrationName The name of the migration.
   * @param parameters The required parameters for updating a migration.
   * @param options The options parameters.
   */
  update(
    subscriptionId: string,
    resourceGroupName: string,
    targetDbServerName: string,
    migrationName: string,
    parameters: MigrationResourceForPatch,
    options?: MigrationsUpdateOptionalParams,
  ): Promise<MigrationsUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        subscriptionId,
        resourceGroupName,
        targetDbServerName,
        migrationName,
        parameters,
        options,
      },
      updateOperationSpec,
    );
  }

  /**
   * Deletes a migration.
   * @param subscriptionId The subscription ID of the target database server.
   * @param resourceGroupName The resource group name of the target database server.
   * @param targetDbServerName The name of the target database server.
   * @param migrationName The name of the migration.
   * @param options The options parameters.
   */
  delete(
    subscriptionId: string,
    resourceGroupName: string,
    targetDbServerName: string,
    migrationName: string,
    options?: MigrationsDeleteOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      {
        subscriptionId,
        resourceGroupName,
        targetDbServerName,
        migrationName,
        options,
      },
      deleteOperationSpec,
    );
  }

  /**
   * List all the migrations on a given target server.
   * @param subscriptionId The subscription ID of the target database server.
   * @param resourceGroupName The resource group name of the target database server.
   * @param targetDbServerName The name of the target database server.
   * @param options The options parameters.
   */
  private _listByTargetServer(
    subscriptionId: string,
    resourceGroupName: string,
    targetDbServerName: string,
    options?: MigrationsListByTargetServerOptionalParams,
  ): Promise<MigrationsListByTargetServerResponse> {
    return this.client.sendOperationRequest(
      { subscriptionId, resourceGroupName, targetDbServerName, options },
      listByTargetServerOperationSpec,
    );
  }

  /**
   * ListByTargetServerNext
   * @param subscriptionId The subscription ID of the target database server.
   * @param resourceGroupName The resource group name of the target database server.
   * @param targetDbServerName The name of the target database server.
   * @param nextLink The nextLink from the previous successful call to the ListByTargetServer method.
   * @param options The options parameters.
   */
  private _listByTargetServerNext(
    subscriptionId: string,
    resourceGroupName: string,
    targetDbServerName: string,
    nextLink: string,
    options?: MigrationsListByTargetServerNextOptionalParams,
  ): Promise<MigrationsListByTargetServerNextResponse> {
    return this.client.sendOperationRequest(
      {
        subscriptionId,
        resourceGroupName,
        targetDbServerName,
        nextLink,
        options,
      },
      listByTargetServerNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const createOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{targetDbServerName}/migrations/{migrationName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.MigrationResource,
    },
    201: {
      bodyMapper: Mappers.MigrationResource,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.parameters10,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId1,
    Parameters.resourceGroupName1,
    Parameters.targetDbServerName,
    Parameters.migrationName,
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{targetDbServerName}/migrations/{migrationName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MigrationResource,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId1,
    Parameters.resourceGroupName1,
    Parameters.targetDbServerName,
    Parameters.migrationName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{targetDbServerName}/migrations/{migrationName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.MigrationResource,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.parameters11,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId1,
    Parameters.resourceGroupName1,
    Parameters.targetDbServerName,
    Parameters.migrationName,
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{targetDbServerName}/migrations/{migrationName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId1,
    Parameters.resourceGroupName1,
    Parameters.targetDbServerName,
    Parameters.migrationName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByTargetServerOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{targetDbServerName}/migrations",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MigrationResourceListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion, Parameters.migrationListFilter],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId1,
    Parameters.resourceGroupName1,
    Parameters.targetDbServerName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByTargetServerNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MigrationResourceListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId1,
    Parameters.resourceGroupName1,
    Parameters.targetDbServerName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
