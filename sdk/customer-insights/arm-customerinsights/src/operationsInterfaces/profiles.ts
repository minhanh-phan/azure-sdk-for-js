/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  ProfileResourceFormat,
  ProfilesListByHubOptionalParams,
  ProfilesCreateOrUpdateOptionalParams,
  ProfilesCreateOrUpdateResponse,
  ProfilesGetOptionalParams,
  ProfilesGetResponse,
  ProfilesDeleteOptionalParams,
  ProfilesGetEnrichingKpisOptionalParams,
  ProfilesGetEnrichingKpisResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Profiles. */
export interface Profiles {
  /**
   * Gets all profile in the hub.
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param options The options parameters.
   */
  listByHub(
    resourceGroupName: string,
    hubName: string,
    options?: ProfilesListByHubOptionalParams
  ): PagedAsyncIterableIterator<ProfileResourceFormat>;
  /**
   * Creates a profile within a Hub, or updates an existing profile.
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param profileName The name of the profile.
   * @param parameters Parameters supplied to the create/delete Profile type operation
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    hubName: string,
    profileName: string,
    parameters: ProfileResourceFormat,
    options?: ProfilesCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<ProfilesCreateOrUpdateResponse>,
      ProfilesCreateOrUpdateResponse
    >
  >;
  /**
   * Creates a profile within a Hub, or updates an existing profile.
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param profileName The name of the profile.
   * @param parameters Parameters supplied to the create/delete Profile type operation
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    hubName: string,
    profileName: string,
    parameters: ProfileResourceFormat,
    options?: ProfilesCreateOrUpdateOptionalParams
  ): Promise<ProfilesCreateOrUpdateResponse>;
  /**
   * Gets information about the specified profile.
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param profileName The name of the profile.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    hubName: string,
    profileName: string,
    options?: ProfilesGetOptionalParams
  ): Promise<ProfilesGetResponse>;
  /**
   * Deletes a profile within a hub
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param profileName The name of the profile.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    hubName: string,
    profileName: string,
    options?: ProfilesDeleteOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Deletes a profile within a hub
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param profileName The name of the profile.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    hubName: string,
    profileName: string,
    options?: ProfilesDeleteOptionalParams
  ): Promise<void>;
  /**
   * Gets the KPIs that enrich the profile Type identified by the supplied name. Enrichment happens
   * through participants of the Interaction on an Interaction KPI and through Relationships for Profile
   * KPIs.
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param profileName The name of the profile.
   * @param options The options parameters.
   */
  getEnrichingKpis(
    resourceGroupName: string,
    hubName: string,
    profileName: string,
    options?: ProfilesGetEnrichingKpisOptionalParams
  ): Promise<ProfilesGetEnrichingKpisResponse>;
}
