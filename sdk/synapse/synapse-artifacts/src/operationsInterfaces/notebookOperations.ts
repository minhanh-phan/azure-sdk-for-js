/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { SimplePollerLike, OperationState } from "@azure/core-lro";
import type {
  NotebookResource,
  NotebookGetNotebooksByWorkspaceOptionalParams,
  NotebookGetNotebookSummaryByWorkSpaceOptionalParams,
  NotebookCreateOrUpdateNotebookOptionalParams,
  NotebookCreateOrUpdateNotebookResponse,
  NotebookGetNotebookOptionalParams,
  NotebookGetNotebookResponse,
  NotebookDeleteNotebookOptionalParams,
  ArtifactRenameRequest,
  NotebookRenameNotebookOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a NotebookOperations. */
export interface NotebookOperations {
  /**
   * Lists Notebooks.
   * @param options - The options parameters.
   */
  listNotebooksByWorkspace(
    options?: NotebookGetNotebooksByWorkspaceOptionalParams,
  ): PagedAsyncIterableIterator<NotebookResource>;
  /**
   * Lists a summary of Notebooks.
   * @param options - The options parameters.
   */
  listNotebookSummaryByWorkSpace(
    options?: NotebookGetNotebookSummaryByWorkSpaceOptionalParams,
  ): PagedAsyncIterableIterator<NotebookResource>;
  /**
   * Creates or updates a Note Book.
   * @param notebookName - The notebook name.
   * @param notebook - Note book resource definition.
   * @param options - The options parameters.
   */
  beginCreateOrUpdateNotebook(
    notebookName: string,
    notebook: NotebookResource,
    options?: NotebookCreateOrUpdateNotebookOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<NotebookCreateOrUpdateNotebookResponse>,
      NotebookCreateOrUpdateNotebookResponse
    >
  >;
  /**
   * Creates or updates a Note Book.
   * @param notebookName - The notebook name.
   * @param notebook - Note book resource definition.
   * @param options - The options parameters.
   */
  beginCreateOrUpdateNotebookAndWait(
    notebookName: string,
    notebook: NotebookResource,
    options?: NotebookCreateOrUpdateNotebookOptionalParams,
  ): Promise<NotebookCreateOrUpdateNotebookResponse>;
  /**
   * Gets a Note Book.
   * @param notebookName - The notebook name.
   * @param options - The options parameters.
   */
  getNotebook(
    notebookName: string,
    options?: NotebookGetNotebookOptionalParams,
  ): Promise<NotebookGetNotebookResponse>;
  /**
   * Deletes a Note book.
   * @param notebookName - The notebook name.
   * @param options - The options parameters.
   */
  beginDeleteNotebook(
    notebookName: string,
    options?: NotebookDeleteNotebookOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Deletes a Note book.
   * @param notebookName - The notebook name.
   * @param options - The options parameters.
   */
  beginDeleteNotebookAndWait(
    notebookName: string,
    options?: NotebookDeleteNotebookOptionalParams,
  ): Promise<void>;
  /**
   * Renames a notebook.
   * @param notebookName - The notebook name.
   * @param request - proposed new name.
   * @param options - The options parameters.
   */
  beginRenameNotebook(
    notebookName: string,
    request: ArtifactRenameRequest,
    options?: NotebookRenameNotebookOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Renames a notebook.
   * @param notebookName - The notebook name.
   * @param request - proposed new name.
   * @param options - The options parameters.
   */
  beginRenameNotebookAndWait(
    notebookName: string,
    request: ArtifactRenameRequest,
    options?: NotebookRenameNotebookOptionalParams,
  ): Promise<void>;
}
