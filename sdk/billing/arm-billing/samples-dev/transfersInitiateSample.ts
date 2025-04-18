/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { InitiateTransferRequest } from "@azure/arm-billing";
import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Sends a request to a user in another billing account to transfer billing ownership of their subscriptions. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 *
 * @summary Sends a request to a user in another billing account to transfer billing ownership of their subscriptions. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/transfersInitiate.json
 */
async function initiateTransfer(): Promise<void> {
  const billingAccountName =
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const billingProfileName = "xxxx-xxxx-xxx-xxx";
  const invoiceSectionName = "yyyy-yyyy-yyy-yyy";
  const transferName = "aabb123";
  const parameters: InitiateTransferRequest = {
    recipientEmailId: "user@contoso.com",
  };
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.transfers.initiate(
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    transferName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await initiateTransfer();
}

main().catch(console.error);
