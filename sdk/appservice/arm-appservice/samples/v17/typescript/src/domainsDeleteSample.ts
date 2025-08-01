/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  DomainsDeleteOptionalParams,
  WebSiteManagementClient,
} from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Delete a domain.
 *
 * @summary Description for Delete a domain.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.DomainRegistration/stable/2024-11-01/examples/DeleteAppServiceDomain.json
 */
async function deleteAppServiceDomain(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const domainName = "example.com";
  const forceHardDeleteDomain = true;
  const options: DomainsDeleteOptionalParams = { forceHardDeleteDomain };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.domains.delete(
    resourceGroupName,
    domainName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAppServiceDomain();
}

main().catch(console.error);
