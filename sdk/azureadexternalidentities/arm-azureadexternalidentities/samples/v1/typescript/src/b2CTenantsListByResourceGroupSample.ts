/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { ExternalIdentitiesConfigurationClient } from "@azure/arm-azureadexternalidentities";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Get all the Azure AD B2C tenant resources in a resource group.
 *
 * @summary Get all the Azure AD B2C tenant resources in a resource group.
 * x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/listTenantsByResourceGroup.json
 */
async function b2CTenantsListByResourceGroup() {
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = "contosoResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new ExternalIdentitiesConfigurationClient(
    credential,
    subscriptionId
  );
  const resArray = new Array();
  for await (let item of client.b2CTenants.listByResourceGroup(
    resourceGroupName
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

b2CTenantsListByResourceGroup().catch(console.error);
