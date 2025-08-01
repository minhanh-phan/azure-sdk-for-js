// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientContext } from "../../ClientContext.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import {
  Constants,
  copyObject,
  createDocumentUri,
  getIdFromLink,
  getPathFromLink,
  isItemResourceValid,
  ResourceType,
  StatusCodes,
} from "../../common/index.js";
import type { PartitionKey, PartitionKeyInternal } from "../../documents/index.js";
import { convertToInternalPartitionKey } from "../../documents/index.js";
import type { RequestOptions, Response } from "../../request/index.js";
import { ErrorResponse } from "../../request/index.js";
import type { PatchRequestBody } from "../../utils/patch.js";
import { PatchOperationType } from "../../utils/patch.js";
import type { Container } from "../Container/index.js";
import type { Resource } from "../Resource.js";
import type { ItemDefinition } from "./ItemDefinition.js";
import { ItemResponse } from "./ItemResponse.js";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics.js";
import { setPartitionKeyIfUndefined } from "../../extractPartitionKey.js";
import { computePartitionKeyRangeId } from "../ClientUtils.js";

/**
 * Used to perform operations on a specific item.
 *
 * @see {@link Items} for operations on all items; see `container.items`.
 */
export class Item {
  private partitionKey: PartitionKeyInternal;
  /**
   * Returns a reference URL to the resource. Used for linking in Permissions.
   */
  public get url(): string {
    return createDocumentUri(this.container.database.id, this.container.id, this.id);
  }

  /**
   * @hidden
   * @param container - The parent {@link Container}.
   * @param id - The id of the given {@link Item}.
   * @param partitionKey - The primary key of the given {@link Item} (only for partitioned containers).
   */
  constructor(
    public readonly container: Container,
    public readonly id: string,
    private readonly clientContext: ClientContext,
    partitionKey?: PartitionKey,
  ) {
    this.partitionKey =
      partitionKey === undefined ? undefined : convertToInternalPartitionKey(partitionKey);
  }

  /**
   * Read the item's definition.
   *
   * Any provided type, T, is not necessarily enforced by the SDK.
   * You may get more or less properties and it's up to your logic to enforce it.
   * If the type, T, is a class, it won't pass `typeof` comparisons, because it won't have a match prototype.
   * It's recommended to only use interfaces.
   *
   * There is no set schema for JSON items. They may contain any number of custom properties.
   *
   * @param options - Additional options for the request
   *
   * @example Using custom type for response
   * ```ts snippet:ItemRead
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   *
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   *
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * interface TodoItem {
   *   title: string;
   *   done: boolean;
   *   id: string;
   * }
   *
   * const { resource: item } = await container.item("id", "<pkValue>").read<TodoItem>();
   * ```
   */
  public async read<T extends ItemDefinition = any>(
    options: RequestOptions = {},
  ): Promise<ItemResponse<T>> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      this.partitionKey = await setPartitionKeyIfUndefined(
        diagnosticNode,
        this.container,
        this.partitionKey,
      );
      let url = this.url;
      let partitionKey = this.partitionKey;
      let response: Response<T & Resource>;
      try {
        if (this.clientContext.enableEncryption) {
          await this.container.checkAndInitializeEncryption();
          options.containerRid = this.container._rid;
          let count = 0;
          diagnosticNode.beginEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsEncryptOperation,
          );
          const { partitionKeyList: encryptedPartitionKey, encryptedCount } =
            await this.container.encryptionProcessor.getEncryptedPartitionKeyValue(
              this.partitionKey,
            );
          partitionKey = encryptedPartitionKey;
          count += encryptedCount;
          if (await this.container.encryptionProcessor.isPathEncrypted("/id")) {
            url = await this.container.encryptionProcessor.getEncryptedUrl(this.url);
            count++;
          }
          diagnosticNode.endEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsEncryptOperation,
            count,
          );
        }
        const path = getPathFromLink(url);
        const id = getIdFromLink(url);

        const isPartitionLevelFailOverEnabled =
          this.clientContext.isPartitionLevelFailOverEnabled();
        const partitionKeyRangeId = await computePartitionKeyRangeId(
          diagnosticNode,
          partitionKey,
          this.clientContext.partitionKeyRangeCache,
          isPartitionLevelFailOverEnabled,
          this.container,
        );

        response = await this.clientContext.read<T>({
          path,
          resourceType: ResourceType.item,
          resourceId: id,
          options,
          partitionKey: partitionKey,
          diagnosticNode,
          partitionKeyRangeId,
        });
      } catch (error: any) {
        if (this.clientContext.enableEncryption) {
          await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
        }
        if (error.code !== StatusCodes.NotFound) {
          throw error;
        }
        response = error;
      }
      if (this.clientContext.enableEncryption) {
        diagnosticNode.beginEncryptionDiagnostics(Constants.Encryption.DiagnosticsDecryptOperation);
        const { body, propertiesDecryptedCount } = await this.container.encryptionProcessor.decrypt(
          response.result,
        );
        diagnosticNode.endEncryptionDiagnostics(
          Constants.Encryption.DiagnosticsDecryptOperation,
          propertiesDecryptedCount,
        );
        response.result = body;
      }
      return new ItemResponse(
        response.result,
        response.headers,
        response.code,
        response.substatus,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }

  /**
   * Replace the item's definition.
   *
   * There is no set schema for JSON items. They may contain any number of custom properties.
   *
   * @param body - The definition to replace the existing {@link Item}'s definition with.
   * @param options - Additional options for the request
   * @example
   * ```ts snippet:ItemReplaceItemDefinition
   * import { CosmosClient, ItemDefinition } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * const item: ItemDefinition = {
   *   id: "id",
   *   title: "new_title",
   * };
   *
   * const { resource: replacedItem } = await container.item("id").replace(item);
   * ```
   */

  public replace(
    body: ItemDefinition,
    options?: RequestOptions,
  ): Promise<ItemResponse<ItemDefinition>>;
  /**
   * Replace the item's definition.
   *
   * Any provided type, T, is not necessarily enforced by the SDK.
   * You may get more or less properties and it's up to your logic to enforce it.
   *
   * There is no set schema for JSON items. They may contain any number of custom properties.
   *
   * @param body - The definition to replace the existing {@link Item}'s definition with.
   * @param options - Additional options for the request
   * @example
   * ```ts snippet:ItemReplace
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   *
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   *
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * interface TodoItem {
   *   title: string;
   *   done: boolean;
   *   id: string;
   * }
   *
   * const { resource: item } = await container.item("id", "<pkValue>").read<TodoItem>();
   *
   * item.done = true;
   * const { resource: replacedItem } = await container.item("id").replace<TodoItem>(item);
   * ```
   */
  public replace<T extends ItemDefinition>(
    body: T,
    options?: RequestOptions,
  ): Promise<ItemResponse<T>>;
  public async replace<T extends ItemDefinition>(
    body: T,
    options: RequestOptions = {},
  ): Promise<ItemResponse<T>> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      this.partitionKey = await setPartitionKeyIfUndefined(
        diagnosticNode,
        this.container,
        this.partitionKey,
      );
      let partitionKey = this.partitionKey;
      const err = {};
      if (!isItemResourceValid(body, err)) {
        throw err;
      }
      let url = this.url;

      let response: Response<T & Resource>;
      try {
        if (this.clientContext.enableEncryption) {
          // returns copy to avoid encryption of original body passed
          body = copyObject(body);
          options = options || {};
          await this.container.checkAndInitializeEncryption();
          options.containerRid = this.container._rid;
          let count = 0;
          diagnosticNode.beginEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsEncryptOperation,
          );
          const { body: encryptedBody, propertiesEncryptedCount } =
            await this.container.encryptionProcessor.encrypt(body);
          body = encryptedBody;
          count += propertiesEncryptedCount;
          const { partitionKeyList: encryptedPartitionKeyList, encryptedCount } =
            await this.container.encryptionProcessor.getEncryptedPartitionKeyValue(
              this.partitionKey,
            );
          partitionKey = encryptedPartitionKeyList;
          count += encryptedCount;
          if (await this.container.encryptionProcessor.isPathEncrypted("/id")) {
            url = await this.container.encryptionProcessor.getEncryptedUrl(this.url);
            count++;
          }
          diagnosticNode.endEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsEncryptOperation,
            count,
          );
        }
        const path = getPathFromLink(url);
        const id = getIdFromLink(url);

        const isPartitionLevelFailOverEnabled =
          this.clientContext.isPartitionLevelFailOverEnabled();
        const partitionKeyRangeId = await computePartitionKeyRangeId(
          diagnosticNode,
          partitionKey,
          this.clientContext.partitionKeyRangeCache,
          isPartitionLevelFailOverEnabled,
          this.container,
        );

        response = await this.clientContext.replace<T>({
          body,
          path,
          resourceType: ResourceType.item,
          resourceId: id,
          options,
          partitionKey: partitionKey,
          diagnosticNode,
          partitionKeyRangeId,
        });
      } catch (error: any) {
        if (this.clientContext.enableEncryption) {
          await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
        }
        throw error;
      }
      if (this.clientContext.enableEncryption) {
        try {
          // try block for decrypting response. This is done so that we can throw special error message in case of decryption failure
          diagnosticNode.beginEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsDecryptOperation,
          );
          const { body: result, propertiesDecryptedCount } =
            await this.container.encryptionProcessor.decrypt(response.result);
          response.result = result;
          diagnosticNode.endEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsDecryptOperation,
            propertiesDecryptedCount,
          );
        } catch (error) {
          const decryptionError = new ErrorResponse(
            `Item replace operation was successful but response decryption failed: + ${error.message}`,
          );
          decryptionError.code = StatusCodes.ServiceUnavailable;
          throw decryptionError;
        }
      }
      return new ItemResponse(
        response.result,
        response.headers,
        response.code,
        response.substatus,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }

  /**
   * Delete the item.
   *
   * Any provided type, T, is not necessarily enforced by the SDK.
   * You may get more or less properties and it's up to your logic to enforce it.
   *
   * @param options - Additional options for the request
   * @example
   * ```ts snippet:ItemDelete
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   *
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   *
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * interface TodoItem {
   *   title: string;
   *   done: boolean;
   *   id: string;
   * }
   *
   * const { resource: item } = await container.item("id", "<pkValue>").read<TodoItem>();
   *
   * await container.item("id").delete<TodoItem>();
   * ```
   */
  public async delete<T extends ItemDefinition = any>(
    options: RequestOptions = {},
  ): Promise<ItemResponse<T>> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      this.partitionKey = await setPartitionKeyIfUndefined(
        diagnosticNode,
        this.container,
        this.partitionKey,
      );
      let partitionKey = this.partitionKey;
      let url = this.url;
      let response: Response<T & Resource>;
      try {
        if (this.clientContext.enableEncryption) {
          await this.container.checkAndInitializeEncryption();
          options.containerRid = this.container._rid;
          let count = 0;
          diagnosticNode.beginEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsEncryptOperation,
          );
          const { partitionKeyList, encryptedCount } =
            await this.container.encryptionProcessor.getEncryptedPartitionKeyValue(
              this.partitionKey,
            );
          partitionKey = partitionKeyList;
          count += encryptedCount;
          if (await this.container.encryptionProcessor.isPathEncrypted("/id")) {
            url = await this.container.encryptionProcessor.getEncryptedUrl(this.url);
            count++;
          }
          diagnosticNode.endEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsEncryptOperation,
            count,
          );
        }
        const path = getPathFromLink(url);
        const id = getIdFromLink(url);

        const isPartitionLevelFailOverEnabled =
          this.clientContext.isPartitionLevelFailOverEnabled();
        const partitionKeyRangeId = await computePartitionKeyRangeId(
          diagnosticNode,
          partitionKey,
          this.clientContext.partitionKeyRangeCache,
          isPartitionLevelFailOverEnabled,
          this.container,
        );

        response = await this.clientContext.delete<T>({
          path,
          resourceType: ResourceType.item,
          resourceId: id,
          options,
          partitionKey: partitionKey,
          diagnosticNode,
          partitionKeyRangeId,
        });
      } catch (error: any) {
        if (this.clientContext.enableEncryption) {
          await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
        }
        throw error;
      }

      return new ItemResponse(
        response.result,
        response.headers,
        response.code,
        response.substatus,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }

  /**
   * Perform a JSONPatch on the item.
   *
   * Any provided type, T, is not necessarily enforced by the SDK.
   * You may get more or less properties and it's up to your logic to enforce it.
   *
   * @param options - Additional options for the request
   * @example
   * ```ts snippet:ItemPatch
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   *
   * interface TodoItem {
   *   title: string;
   *   done: boolean;
   *   id: string;
   * }
   *
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   *
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * const { resource: item } = await container.item("id", "<pkValue>").read<TodoItem>();
   *
   * const { resource: patchedItem } = await container.item("id").patch<TodoItem>([
   *   {
   *     op: "replace", // Operation type (can be replace, add, remove, set, incr)
   *     path: "/title", // The path to the property to update
   *     value: "new-title", // New value for the property
   *   },
   *   {
   *     op: "remove",
   *     path: "/done",
   *   },
   * ]);
   * ```
   */
  public async patch<T extends ItemDefinition = any>(
    body: PatchRequestBody,
    options: RequestOptions = {},
  ): Promise<ItemResponse<T>> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      this.partitionKey = await setPartitionKeyIfUndefined(
        diagnosticNode,
        this.container,
        this.partitionKey,
      );
      let url = this.url;
      let partitionKey = this.partitionKey;
      let response: Response<T & Resource>;
      try {
        if (this.clientContext.enableEncryption) {
          await this.container.checkAndInitializeEncryption();
          options.containerRid = this.container._rid;
          // returns copy to avoid encryption of original body passed
          body = copyObject(body);
          const operations = Array.isArray(body) ? body : body.operations;
          diagnosticNode.beginEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsEncryptOperation,
          );
          let propertiesEncryptedCount = 0;
          for (const operation of operations) {
            if (operation.op === PatchOperationType.remove) {
              continue;
            }
            const isPathEncrypted = await this.container.encryptionProcessor.isPathEncrypted(
              operation.path,
            );
            if (!isPathEncrypted) {
              continue;
            }
            if (operation.op === PatchOperationType.incr) {
              throw new ErrorResponse(
                `Increment patch operation is not allowed for encrypted path '${operation.path}'`,
              );
            }
            if ("value" in operation) {
              operation.value = await this.container.encryptionProcessor.encryptProperty(
                operation.path,
                operation.value,
              );
            }
            propertiesEncryptedCount++;
          }
          const { partitionKeyList, encryptedCount } =
            await this.container.encryptionProcessor.getEncryptedPartitionKeyValue(partitionKey);
          partitionKey = partitionKeyList;
          propertiesEncryptedCount += encryptedCount;
          if (await this.container.encryptionProcessor.isPathEncrypted("/id")) {
            url = await this.container.encryptionProcessor.getEncryptedUrl(this.url);
            propertiesEncryptedCount++;
          }
          diagnosticNode.endEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsEncryptOperation,
            propertiesEncryptedCount,
          );
        }
        const path = getPathFromLink(url);
        const id = getIdFromLink(url);

        const isPartitionLevelFailOverEnabled =
          this.clientContext.isPartitionLevelFailOverEnabled();
        const partitionKeyRangeId = await computePartitionKeyRangeId(
          diagnosticNode,
          partitionKey,
          this.clientContext.partitionKeyRangeCache,
          isPartitionLevelFailOverEnabled,
          this.container,
        );

        response = await this.clientContext.patch<T>({
          body,
          path,
          resourceType: ResourceType.item,
          resourceId: id,
          options,
          partitionKey: partitionKey,
          diagnosticNode,
          partitionKeyRangeId,
        });
      } catch (error: any) {
        if (this.clientContext.enableEncryption) {
          await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
        }
        throw error;
      }
      if (this.clientContext.enableEncryption) {
        try {
          diagnosticNode.beginEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsDecryptOperation,
          );
          const { body: result, propertiesDecryptedCount } =
            await this.container.encryptionProcessor.decrypt(response.result);
          response.result = result;
          diagnosticNode.endEncryptionDiagnostics(
            Constants.Encryption.DiagnosticsDecryptOperation,
            propertiesDecryptedCount,
          );
        } catch (error) {
          const decryptionError = new ErrorResponse(
            `Item patch operation was successful but response decryption failed: + ${error.message}`,
          );
          decryptionError.code = StatusCodes.ServiceUnavailable;
          throw decryptionError;
        }
      }

      return new ItemResponse(
        response.result,
        response.headers,
        response.code,
        response.substatus,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }
}
