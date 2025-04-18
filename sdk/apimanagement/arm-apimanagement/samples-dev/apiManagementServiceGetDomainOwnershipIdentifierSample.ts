/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get the custom domain ownership identifier for an API Management service.
 *
 * @summary Get the custom domain ownership identifier for an API Management service.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2022-08-01/examples/ApiManagementServiceGetDomainOwnershipIdentifier.json
 */
async function apiManagementServiceGetDomainOwnershipIdentifier(): Promise<void> {
  const subscriptionId = process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] || "subid";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.getDomainOwnershipIdentifier();
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementServiceGetDomainOwnershipIdentifier();
}

main().catch(console.error);
