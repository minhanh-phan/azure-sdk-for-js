/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists the role definitions for a billing account. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement, Microsoft Customer Agreement or Enterprise Agreement.
 *
 * @summary Lists the role definitions for a billing account. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement, Microsoft Customer Agreement or Enterprise Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingRoleDefinitionListByBillingAccount.json
 */
async function billingRoleDefinitionListByBillingAccount() {
  const billingAccountName =
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (let item of client.billingRoleDefinitionOperations.listByBillingAccount(
    billingAccountName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  billingRoleDefinitionListByBillingAccount();
}

main().catch(console.error);
