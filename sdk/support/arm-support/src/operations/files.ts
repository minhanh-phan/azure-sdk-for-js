/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { Files } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { MicrosoftSupport } from "../microsoftSupport.js";
import {
  FileDetails,
  FilesListNextOptionalParams,
  FilesListOptionalParams,
  FilesListResponse,
  FilesGetOptionalParams,
  FilesGetResponse,
  FilesCreateOptionalParams,
  FilesCreateResponse,
  UploadFile,
  FilesUploadOptionalParams,
  FilesListNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Files operations. */
export class FilesImpl implements Files {
  private readonly client: MicrosoftSupport;

  /**
   * Initialize a new instance of the class Files class.
   * @param client Reference to the service client
   */
  constructor(client: MicrosoftSupport) {
    this.client = client;
  }

  /**
   * Lists all the Files information under a workspace for an Azure subscription.
   * @param fileWorkspaceName File Workspace Name
   * @param options The options parameters.
   */
  public list(
    fileWorkspaceName: string,
    options?: FilesListOptionalParams,
  ): PagedAsyncIterableIterator<FileDetails> {
    const iter = this.listPagingAll(fileWorkspaceName, options);
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
        return this.listPagingPage(fileWorkspaceName, options, settings);
      },
    };
  }

  private async *listPagingPage(
    fileWorkspaceName: string,
    options?: FilesListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<FileDetails[]> {
    let result: FilesListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(fileWorkspaceName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(
        fileWorkspaceName,
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
    fileWorkspaceName: string,
    options?: FilesListOptionalParams,
  ): AsyncIterableIterator<FileDetails> {
    for await (const page of this.listPagingPage(fileWorkspaceName, options)) {
      yield* page;
    }
  }

  /**
   * Lists all the Files information under a workspace for an Azure subscription.
   * @param fileWorkspaceName File Workspace Name
   * @param options The options parameters.
   */
  private _list(
    fileWorkspaceName: string,
    options?: FilesListOptionalParams,
  ): Promise<FilesListResponse> {
    return this.client.sendOperationRequest(
      { fileWorkspaceName, options },
      listOperationSpec,
    );
  }

  /**
   * Returns details of a specific file in a work space.
   * @param fileWorkspaceName File Workspace Name
   * @param fileName File Name
   * @param options The options parameters.
   */
  get(
    fileWorkspaceName: string,
    fileName: string,
    options?: FilesGetOptionalParams,
  ): Promise<FilesGetResponse> {
    return this.client.sendOperationRequest(
      { fileWorkspaceName, fileName, options },
      getOperationSpec,
    );
  }

  /**
   * Creates a new file under a workspace for the specified subscription.
   * @param fileWorkspaceName File workspace name.
   * @param fileName File name.
   * @param createFileParameters Create file object
   * @param options The options parameters.
   */
  create(
    fileWorkspaceName: string,
    fileName: string,
    createFileParameters: FileDetails,
    options?: FilesCreateOptionalParams,
  ): Promise<FilesCreateResponse> {
    return this.client.sendOperationRequest(
      { fileWorkspaceName, fileName, createFileParameters, options },
      createOperationSpec,
    );
  }

  /**
   * This API allows you to upload content to a file
   * @param fileWorkspaceName File WorkspaceName
   * @param fileName File Name
   * @param uploadFile UploadFile object
   * @param options The options parameters.
   */
  upload(
    fileWorkspaceName: string,
    fileName: string,
    uploadFile: UploadFile,
    options?: FilesUploadOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { fileWorkspaceName, fileName, uploadFile, options },
      uploadOperationSpec,
    );
  }

  /**
   * ListNext
   * @param fileWorkspaceName File Workspace Name
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    fileWorkspaceName: string,
    nextLink: string,
    options?: FilesListNextOptionalParams,
  ): Promise<FilesListNextResponse> {
    return this.client.sendOperationRequest(
      { fileWorkspaceName, nextLink, options },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}/files",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.FilesListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.fileWorkspaceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}/files/{fileName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.FileDetails,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.fileWorkspaceName,
    Parameters.fileName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}/files/{fileName}",
  httpMethod: "PUT",
  responses: {
    201: {
      bodyMapper: Mappers.FileDetails,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.createFileParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.fileWorkspaceName1,
    Parameters.fileName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const uploadOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}/files/{fileName}/upload",
  httpMethod: "POST",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.uploadFile,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.fileWorkspaceName,
    Parameters.fileName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.FilesListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.fileWorkspaceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
