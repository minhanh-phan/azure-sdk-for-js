/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets a job with id in a backup vault
 *
 * @summary Gets a job with id in a backup vault
 * x-ms-original-file: specification/dataprotection/resource-manager/Microsoft.DataProtection/stable/2024-04-01/examples/JobCRUD/GetJob.json
 */
async function getJob(): Promise<void> {
  const subscriptionId =
    process.env["DATAPROTECTION_SUBSCRIPTION_ID"] || "62b829ee-7936-40c9-a1c9-47a93f9f3965";
  const resourceGroupName = process.env["DATAPROTECTION_RESOURCE_GROUP"] || "BugBash1";
  const vaultName = "BugBashVaultForCCYv11";
  const jobId = "3c60cb49-63e8-4b21-b9bd-26277b3fdfae";
  const credential = new DefaultAzureCredential();
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.jobs.get(resourceGroupName, vaultName, jobId);
  console.log(result);
}

async function main(): Promise<void> {
  await getJob();
}

main().catch(console.error);
