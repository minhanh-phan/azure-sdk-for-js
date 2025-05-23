/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  TimeZone,
  TimeZonesListByLocationOptionalParams,
  TimeZonesGetOptionalParams,
  TimeZonesGetResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a TimeZones. */
export interface TimeZones {
  /**
   * Gets a list of managed instance time zones by location.
   * @param locationName
   * @param options The options parameters.
   */
  listByLocation(
    locationName: string,
    options?: TimeZonesListByLocationOptionalParams,
  ): PagedAsyncIterableIterator<TimeZone>;
  /**
   * Gets a managed instance time zone.
   * @param locationName
   * @param timeZoneId
   * @param options The options parameters.
   */
  get(
    locationName: string,
    timeZoneId: string,
    options?: TimeZonesGetOptionalParams,
  ): Promise<TimeZonesGetResponse>;
}
