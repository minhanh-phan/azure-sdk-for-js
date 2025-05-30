/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { BillingProperty } from "@azure/arm-billing";
import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates the billing property of a subscription. Currently, cost center can be updated for billing accounts with agreement type Microsoft Customer Agreement and subscription service usage address can be updated for billing accounts with agreement type Microsoft Online Service Program.
 *
 * @summary Updates the billing property of a subscription. Currently, cost center can be updated for billing accounts with agreement type Microsoft Customer Agreement and subscription service usage address can be updated for billing accounts with agreement type Microsoft Online Service Program.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingPropertyPatchCostCenter.json
 */
async function billingPropertyPatchCostCenter(): Promise<void> {
  const subscriptionId =
    process.env["BILLING_SUBSCRIPTION_ID"] || "11111111-1111-1111-1111-111111111111";
  const parameters: BillingProperty = { properties: { costCenter: "1010" } };
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential, subscriptionId);
  const result = await client.billingPropertyOperations.update(parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to Updates the billing property of a subscription. Currently, cost center can be updated for billing accounts with agreement type Microsoft Customer Agreement and subscription service usage address can be updated for billing accounts with agreement type Microsoft Online Service Program.
 *
 * @summary Updates the billing property of a subscription. Currently, cost center can be updated for billing accounts with agreement type Microsoft Customer Agreement and subscription service usage address can be updated for billing accounts with agreement type Microsoft Online Service Program.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingPropertyPatchSubscriptionServiceUsageAddress.json
 */
async function billingPropertyPatchSubscriptionServiceUsageAddress(): Promise<void> {
  const subscriptionId =
    process.env["BILLING_SUBSCRIPTION_ID"] || "11111111-1111-1111-1111-111111111111";
  const parameters: BillingProperty = {
    properties: {
      subscriptionServiceUsageAddress: {
        addressLine1: "Address line 1",
        addressLine2: "Address line 2",
        city: "City",
        country: "US",
        firstName: "Jenny",
        lastName: "Doe",
        middleName: "Ann",
        postalCode: "12345",
        region: "State",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential, subscriptionId);
  const result = await client.billingPropertyOperations.update(parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await billingPropertyPatchCostCenter();
  await billingPropertyPatchSubscriptionServiceUsageAddress();
}

main().catch(console.error);
