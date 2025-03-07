/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { Tasks } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { EasmMgmtClient } from "../easmMgmtClient.js";
import {
  TasksGetByWorkspaceOptionalParams,
  TasksGetByWorkspaceResponse
} from "../models/index.js";

/** Class containing Tasks operations. */
export class TasksImpl implements Tasks {
  private readonly client: EasmMgmtClient;

  /**
   * Initialize a new instance of the class Tasks class.
   * @param client Reference to the service client
   */
  constructor(client: EasmMgmtClient) {
    this.client = client;
  }

  /**
   * Returns a task in the given workspace.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the Workspace.
   * @param taskId The id of the Task.
   * @param options The options parameters.
   */
  getByWorkspace(
    resourceGroupName: string,
    workspaceName: string,
    taskId: string,
    options?: TasksGetByWorkspaceOptionalParams
  ): Promise<TasksGetByWorkspaceResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, workspaceName, taskId, options },
      getByWorkspaceOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getByWorkspaceOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Easm/workspaces/{workspaceName}/tasks/{taskId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TaskResource
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName,
    Parameters.taskId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
