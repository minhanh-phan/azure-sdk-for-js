/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Live Migration of storage account to enable Hns
 *
 * @summary Live Migration of storage account to enable Hns
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2024-01-01/examples/StorageAccountHierarchicalNamespaceMigration.json
 */
async function storageAccountHierarchicalNamespaceMigration(): Promise<void> {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res4228";
  const accountName = "sto2434";
  const requestType = "HnsOnValidationRequest";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result =
    await client.storageAccounts.beginHierarchicalNamespaceMigrationAndWait(
      resourceGroupName,
      accountName,
      requestType,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await storageAccountHierarchicalNamespaceMigration();
}

main().catch(console.error);
