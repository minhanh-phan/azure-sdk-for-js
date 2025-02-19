/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { GalleryImage, GalleryImagesListOptionalParams } from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a GalleryImages. */
export interface GalleryImages {
  /**
   * List gallery images in a given lab.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    labName: string,
    options?: GalleryImagesListOptionalParams
  ): PagedAsyncIterableIterator<GalleryImage>;
}
