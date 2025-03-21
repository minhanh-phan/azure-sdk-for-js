/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  BookmarkExpandParameters,
  BookmarkExpandOptionalParams,
  BookmarkExpandOperationResponse
} from "../models/index.js";

/** Interface representing a BookmarkOperations. */
export interface BookmarkOperations {
  /**
   * Expand an bookmark
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param bookmarkId Bookmark ID
   * @param parameters The parameters required to execute an expand operation on the given bookmark.
   * @param options The options parameters.
   */
  expand(
    resourceGroupName: string,
    workspaceName: string,
    bookmarkId: string,
    parameters: BookmarkExpandParameters,
    options?: BookmarkExpandOptionalParams
  ): Promise<BookmarkExpandOperationResponse>;
}
