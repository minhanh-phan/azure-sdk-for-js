/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  CodePackageGetContainerLogsOptionalParams,
  CodePackageGetContainerLogsResponse
} from "../models/index.js";

/** Interface representing a CodePackage. */
export interface CodePackage {
  /**
   * Gets the logs for the container of the specified code package of the service replica.
   * @param resourceGroupName Azure resource group name
   * @param applicationResourceName The identity of the application.
   * @param serviceResourceName The identity of the service.
   * @param replicaName Service Fabric replica name.
   * @param codePackageName The name of code package of the service.
   * @param options The options parameters.
   */
  getContainerLogs(
    resourceGroupName: string,
    applicationResourceName: string,
    serviceResourceName: string,
    replicaName: string,
    codePackageName: string,
    options?: CodePackageGetContainerLogsOptionalParams
  ): Promise<CodePackageGetContainerLogsResponse>;
}
