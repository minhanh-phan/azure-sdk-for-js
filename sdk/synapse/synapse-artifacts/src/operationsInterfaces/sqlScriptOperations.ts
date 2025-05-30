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
  SqlScriptResource,
  SqlScriptGetSqlScriptsByWorkspaceOptionalParams,
  SqlScriptCreateOrUpdateSqlScriptOptionalParams,
  SqlScriptCreateOrUpdateSqlScriptResponse,
  SqlScriptGetSqlScriptOptionalParams,
  SqlScriptGetSqlScriptResponse,
  SqlScriptDeleteSqlScriptOptionalParams,
  ArtifactRenameRequest,
  SqlScriptRenameSqlScriptOptionalParams,
} from "../models/index.js";

/** Interface representing a SqlScriptOperations. */
export interface SqlScriptOperations {
  /**
   * Lists sql scripts.
   * @param options - The options parameters.
   */
  listSqlScriptsByWorkspace(
    options?: SqlScriptGetSqlScriptsByWorkspaceOptionalParams,
  ): PagedAsyncIterableIterator<SqlScriptResource>;
  /**
   * Creates or updates a Sql Script.
   * @param sqlScriptName - The sql script name.
   * @param sqlScript - Sql Script resource definition.
   * @param options - The options parameters.
   */
  beginCreateOrUpdateSqlScript(
    sqlScriptName: string,
    sqlScript: SqlScriptResource,
    options?: SqlScriptCreateOrUpdateSqlScriptOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<SqlScriptCreateOrUpdateSqlScriptResponse>,
      SqlScriptCreateOrUpdateSqlScriptResponse
    >
  >;
  /**
   * Creates or updates a Sql Script.
   * @param sqlScriptName - The sql script name.
   * @param sqlScript - Sql Script resource definition.
   * @param options - The options parameters.
   */
  beginCreateOrUpdateSqlScriptAndWait(
    sqlScriptName: string,
    sqlScript: SqlScriptResource,
    options?: SqlScriptCreateOrUpdateSqlScriptOptionalParams,
  ): Promise<SqlScriptCreateOrUpdateSqlScriptResponse>;
  /**
   * Gets a sql script.
   * @param sqlScriptName - The sql script name.
   * @param options - The options parameters.
   */
  getSqlScript(
    sqlScriptName: string,
    options?: SqlScriptGetSqlScriptOptionalParams,
  ): Promise<SqlScriptGetSqlScriptResponse>;
  /**
   * Deletes a Sql Script.
   * @param sqlScriptName - The sql script name.
   * @param options - The options parameters.
   */
  beginDeleteSqlScript(
    sqlScriptName: string,
    options?: SqlScriptDeleteSqlScriptOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Deletes a Sql Script.
   * @param sqlScriptName - The sql script name.
   * @param options - The options parameters.
   */
  beginDeleteSqlScriptAndWait(
    sqlScriptName: string,
    options?: SqlScriptDeleteSqlScriptOptionalParams,
  ): Promise<void>;
  /**
   * Renames a sqlScript.
   * @param sqlScriptName - The sql script name.
   * @param request - proposed new name.
   * @param options - The options parameters.
   */
  beginRenameSqlScript(
    sqlScriptName: string,
    request: ArtifactRenameRequest,
    options?: SqlScriptRenameSqlScriptOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Renames a sqlScript.
   * @param sqlScriptName - The sql script name.
   * @param request - proposed new name.
   * @param options - The options parameters.
   */
  beginRenameSqlScriptAndWait(
    sqlScriptName: string,
    request: ArtifactRenameRequest,
    options?: SqlScriptRenameSqlScriptOptionalParams,
  ): Promise<void>;
}
