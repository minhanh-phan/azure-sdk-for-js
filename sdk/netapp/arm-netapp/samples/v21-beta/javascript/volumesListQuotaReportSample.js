/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Returns report of quotas for the volume
 *
 * @summary Returns report of quotas for the volume
 * x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/preview/2025-01-01-preview/examples/Volumes_ListQuotaReport.json
 */
async function listQuotaReport() {
  const subscriptionId =
    process.env["NETAPP_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETAPP_RESOURCE_GROUP"] || "myRG";
  const accountName = "account1";
  const poolName = "pool1";
  const volumeName = "volume1";
  const credential = new DefaultAzureCredential();
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.volumes.beginListQuotaReportAndWait(
    resourceGroupName,
    accountName,
    poolName,
    volumeName,
  );
  console.log(result);
}

async function main() {
  await listQuotaReport();
}

main().catch(console.error);
