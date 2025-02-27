/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  FeatureValidationRequestBaseUnion,
  DataProtectionCheckFeatureSupportOptionalParams,
  DataProtectionCheckFeatureSupportResponse,
} from "../models/index.js";

/** Interface representing a DataProtection. */
export interface DataProtection {
  /**
   * Validates if a feature is supported
   * @param location
   * @param parameters Feature support request object
   * @param options The options parameters.
   */
  checkFeatureSupport(
    location: string,
    parameters: FeatureValidationRequestBaseUnion,
    options?: DataProtectionCheckFeatureSupportOptionalParams,
  ): Promise<DataProtectionCheckFeatureSupportResponse>;
}
