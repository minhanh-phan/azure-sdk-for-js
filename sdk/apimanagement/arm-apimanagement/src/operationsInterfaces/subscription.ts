/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  SubscriptionContract,
  SubscriptionListOptionalParams,
  SubscriptionGetEntityTagOptionalParams,
  SubscriptionGetEntityTagResponse,
  SubscriptionGetOptionalParams,
  SubscriptionGetResponse,
  SubscriptionCreateParameters,
  SubscriptionCreateOrUpdateOptionalParams,
  SubscriptionCreateOrUpdateResponse,
  SubscriptionUpdateParameters,
  SubscriptionUpdateOptionalParams,
  SubscriptionUpdateResponse,
  SubscriptionDeleteOptionalParams,
  SubscriptionRegeneratePrimaryKeyOptionalParams,
  SubscriptionRegenerateSecondaryKeyOptionalParams,
  SubscriptionListSecretsOptionalParams,
  SubscriptionListSecretsResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Subscription. */
export interface Subscription {
  /**
   * Lists all subscriptions of the API Management service instance.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    serviceName: string,
    options?: SubscriptionListOptionalParams,
  ): PagedAsyncIterableIterator<SubscriptionContract>;
  /**
   * Gets the entity state (Etag) version of the apimanagement subscription specified by its identifier.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param sid Subscription entity Identifier. The entity represents the association between a user and
   *            a product in API Management.
   * @param options The options parameters.
   */
  getEntityTag(
    resourceGroupName: string,
    serviceName: string,
    sid: string,
    options?: SubscriptionGetEntityTagOptionalParams,
  ): Promise<SubscriptionGetEntityTagResponse>;
  /**
   * Gets the specified Subscription entity.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param sid Subscription entity Identifier. The entity represents the association between a user and
   *            a product in API Management.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serviceName: string,
    sid: string,
    options?: SubscriptionGetOptionalParams,
  ): Promise<SubscriptionGetResponse>;
  /**
   * Creates or updates the subscription of specified user to the specified product.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param sid Subscription entity Identifier. The entity represents the association between a user and
   *            a product in API Management.
   * @param parameters Create parameters.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    serviceName: string,
    sid: string,
    parameters: SubscriptionCreateParameters,
    options?: SubscriptionCreateOrUpdateOptionalParams,
  ): Promise<SubscriptionCreateOrUpdateResponse>;
  /**
   * Updates the details of a subscription specified by its identifier.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param sid Subscription entity Identifier. The entity represents the association between a user and
   *            a product in API Management.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param parameters Update parameters.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    serviceName: string,
    sid: string,
    ifMatch: string,
    parameters: SubscriptionUpdateParameters,
    options?: SubscriptionUpdateOptionalParams,
  ): Promise<SubscriptionUpdateResponse>;
  /**
   * Deletes the specified subscription.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param sid Subscription entity Identifier. The entity represents the association between a user and
   *            a product in API Management.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    serviceName: string,
    sid: string,
    ifMatch: string,
    options?: SubscriptionDeleteOptionalParams,
  ): Promise<void>;
  /**
   * Regenerates primary key of existing subscription of the API Management service instance.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param sid Subscription entity Identifier. The entity represents the association between a user and
   *            a product in API Management.
   * @param options The options parameters.
   */
  regeneratePrimaryKey(
    resourceGroupName: string,
    serviceName: string,
    sid: string,
    options?: SubscriptionRegeneratePrimaryKeyOptionalParams,
  ): Promise<void>;
  /**
   * Regenerates secondary key of existing subscription of the API Management service instance.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param sid Subscription entity Identifier. The entity represents the association between a user and
   *            a product in API Management.
   * @param options The options parameters.
   */
  regenerateSecondaryKey(
    resourceGroupName: string,
    serviceName: string,
    sid: string,
    options?: SubscriptionRegenerateSecondaryKeyOptionalParams,
  ): Promise<void>;
  /**
   * Gets the specified Subscription keys.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param sid Subscription entity Identifier. The entity represents the association between a user and
   *            a product in API Management.
   * @param options The options parameters.
   */
  listSecrets(
    resourceGroupName: string,
    serviceName: string,
    sid: string,
    options?: SubscriptionListSecretsOptionalParams,
  ): Promise<SubscriptionListSecretsResponse>;
}
