/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete the baseboard management controller key set of the provided cluster.
 *
 * @summary Delete the baseboard management controller key set of the provided cluster.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/stable/2025-02-01/examples/BmcKeySets_Delete.json
 */
async function deleteBaseboardManagementControllerKeySetOfCluster(): Promise<void> {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] ||
    "123e4567-e89b-12d3-a456-426655440000";
  const resourceGroupName =
    process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const clusterName = "clusterName";
  const bmcKeySetName = "bmcKeySetName";
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.bmcKeySets.beginDeleteAndWait(
    resourceGroupName,
    clusterName,
    bmcKeySetName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteBaseboardManagementControllerKeySetOfCluster();
}

main().catch(console.error);
