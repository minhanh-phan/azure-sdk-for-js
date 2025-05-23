/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { AzureQuotaExtensionAPI } from "@azure/arm-quota";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates the GroupQuotas with the subscription to add to the subscriptions list. The subscriptions will be validated if additionalAttributes are defined in the GroupQuota. The request's TenantId is validated against the subscription's TenantId.
 *
 * @summary Updates the GroupQuotas with the subscription to add to the subscriptions list. The subscriptions will be validated if additionalAttributes are defined in the GroupQuota. The request's TenantId is validated against the subscription's TenantId.
 * x-ms-original-file: specification/quota/resource-manager/Microsoft.Quota/stable/2025-03-01/examples/GroupQuotasSubscriptions/PatchGroupQuotasSubscription.json
 */
async function groupQuotaSubscriptionsPatchSubscriptions(): Promise<void> {
  const subscriptionId =
    process.env["QUOTA_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const managementGroupId = "E7EC67B3-7657-4966-BFFC-41EFD36BAA09";
  const groupQuotaName = "groupquota1";
  const credential = new DefaultAzureCredential();
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const result = await client.groupQuotaSubscriptions.beginUpdateAndWait(
    managementGroupId,
    groupQuotaName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await groupQuotaSubscriptionsPatchSubscriptions();
}

main().catch(console.error);
