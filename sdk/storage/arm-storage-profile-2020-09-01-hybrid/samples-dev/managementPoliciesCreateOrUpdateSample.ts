/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { ManagementPolicy } from "@azure/arm-storage-profile-2020-09-01-hybrid";
import { StorageManagementClient } from "@azure/arm-storage-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Sets the managementpolicy to the specified storage account.
 *
 * @summary Sets the managementpolicy to the specified storage account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2019-06-01/examples/StorageAccountSetManagementPolicy.json
 */
async function storageAccountSetManagementPolicies(): Promise<void> {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res7687";
  const accountName = "sto9699";
  const managementPolicyName = "default";
  const properties: ManagementPolicy = {
    policy: {
      rules: [
        {
          name: "olcmtest1",
          type: "Lifecycle",
          definition: {
            actions: {
              baseBlob: {
                delete: { daysAfterModificationGreaterThan: 1000 },
                tierToArchive: { daysAfterModificationGreaterThan: 90 },
                tierToCool: { daysAfterModificationGreaterThan: 30 },
              },
              snapshot: { delete: { daysAfterCreationGreaterThan: 30 } },
            },
            filters: {
              blobTypes: ["blockBlob"],
              prefixMatch: ["olcmtestcontainer1"],
            },
          },
          enabled: true,
        },
        {
          name: "olcmtest2",
          type: "Lifecycle",
          definition: {
            actions: {
              baseBlob: {
                delete: { daysAfterModificationGreaterThan: 1000 },
                tierToArchive: { daysAfterModificationGreaterThan: 90 },
                tierToCool: { daysAfterModificationGreaterThan: 30 },
              },
            },
            filters: {
              blobIndexMatch: [
                { name: "tag1", op: "==", value: "val1" },
                { name: "tag2", op: "==", value: "val2" },
              ],
              blobTypes: ["blockBlob"],
              prefixMatch: ["olcmtestcontainer2"],
            },
          },
          enabled: true,
        },
      ],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.managementPolicies.createOrUpdate(
    resourceGroupName,
    accountName,
    managementPolicyName,
    properties,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Sets the managementpolicy to the specified storage account.
 *
 * @summary Sets the managementpolicy to the specified storage account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2019-06-01/examples/StorageAccountSetManagementPolicyForBlockAndAppendBlobs.json
 */
async function storageAccountSetManagementPolicyForBlockAndAppendBlobs(): Promise<void> {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res7687";
  const accountName = "sto9699";
  const managementPolicyName = "default";
  const properties: ManagementPolicy = {
    policy: {
      rules: [
        {
          name: "olcmtest1",
          type: "Lifecycle",
          definition: {
            actions: {
              baseBlob: { delete: { daysAfterModificationGreaterThan: 90 } },
              snapshot: { delete: { daysAfterCreationGreaterThan: 90 } },
              version: { delete: { daysAfterCreationGreaterThan: 90 } },
            },
            filters: {
              blobTypes: ["blockBlob", "appendBlob"],
              prefixMatch: ["olcmtestcontainer1"],
            },
          },
          enabled: true,
        },
      ],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.managementPolicies.createOrUpdate(
    resourceGroupName,
    accountName,
    managementPolicyName,
    properties,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Sets the managementpolicy to the specified storage account.
 *
 * @summary Sets the managementpolicy to the specified storage account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2019-06-01/examples/StorageAccountSetManagementPolicyWithSnapshotAndVersion.json
 */
async function storageAccountSetManagementPolicyWithSnapshotAndVersion(): Promise<void> {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res7687";
  const accountName = "sto9699";
  const managementPolicyName = "default";
  const properties: ManagementPolicy = {
    policy: {
      rules: [
        {
          name: "olcmtest1",
          type: "Lifecycle",
          definition: {
            actions: {
              baseBlob: {
                delete: { daysAfterModificationGreaterThan: 1000 },
                tierToArchive: { daysAfterModificationGreaterThan: 90 },
                tierToCool: { daysAfterModificationGreaterThan: 30 },
              },
              snapshot: {
                delete: { daysAfterCreationGreaterThan: 1000 },
                tierToArchive: { daysAfterCreationGreaterThan: 90 },
                tierToCool: { daysAfterCreationGreaterThan: 30 },
              },
              version: {
                delete: { daysAfterCreationGreaterThan: 1000 },
                tierToArchive: { daysAfterCreationGreaterThan: 90 },
                tierToCool: { daysAfterCreationGreaterThan: 30 },
              },
            },
            filters: {
              blobTypes: ["blockBlob"],
              prefixMatch: ["olcmtestcontainer1"],
            },
          },
          enabled: true,
        },
      ],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.managementPolicies.createOrUpdate(
    resourceGroupName,
    accountName,
    managementPolicyName,
    properties,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Sets the managementpolicy to the specified storage account.
 *
 * @summary Sets the managementpolicy to the specified storage account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2019-06-01/examples/StorageAccountSetManagementPolicy_LastAccessTimeBasedBlobActions.json
 */
async function storageAccountSetManagementPolicyLastAccessTimeBasedBlobActions(): Promise<void> {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res7687";
  const accountName = "sto9699";
  const managementPolicyName = "default";
  const properties: ManagementPolicy = {
    policy: {
      rules: [
        {
          name: "olcmtest",
          type: "Lifecycle",
          definition: {
            actions: {
              baseBlob: {
                delete: { daysAfterLastAccessTimeGreaterThan: 1000 },
                enableAutoTierToHotFromCool: true,
                tierToArchive: { daysAfterLastAccessTimeGreaterThan: 90 },
                tierToCool: { daysAfterLastAccessTimeGreaterThan: 30 },
              },
              snapshot: { delete: { daysAfterCreationGreaterThan: 30 } },
            },
            filters: {
              blobTypes: ["blockBlob"],
              prefixMatch: ["olcmtestcontainer"],
            },
          },
          enabled: true,
        },
      ],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.managementPolicies.createOrUpdate(
    resourceGroupName,
    accountName,
    managementPolicyName,
    properties,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storageAccountSetManagementPolicies();
  await storageAccountSetManagementPolicyForBlockAndAppendBlobs();
  await storageAccountSetManagementPolicyWithSnapshotAndVersion();
  await storageAccountSetManagementPolicyLastAccessTimeBasedBlobActions();
}

main().catch(console.error);
