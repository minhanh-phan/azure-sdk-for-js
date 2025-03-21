/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { AuthorizationLoginRequestContract } from "@azure/arm-apimanagement";
import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets authorization login links.
 *
 * @summary Gets authorization login links.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2022-08-01/examples/ApiManagementGetAuthorizationLoginRequest.json
 */
async function apiManagementGetAuthorizationLoginRequest(): Promise<void> {
  const subscriptionId = process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const authorizationProviderId = "aadwithauthcode";
  const authorizationId = "authz1";
  const parameters: AuthorizationLoginRequestContract = {
    postLoginRedirectUrl: "https://www.bing.com/",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorizationLoginLinks.post(
    resourceGroupName,
    serviceName,
    authorizationProviderId,
    authorizationId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetAuthorizationLoginRequest();
}

main().catch(console.error);
