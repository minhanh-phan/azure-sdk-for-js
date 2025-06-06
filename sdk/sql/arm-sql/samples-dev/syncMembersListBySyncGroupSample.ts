/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists sync members in the given sync group.
 *
 * @summary Lists sync members in the given sync group.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/SyncMemberListBySyncGroup.json
 */
async function listSyncMembersUnderASyncGroup(): Promise<void> {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "syncgroupcrud-65440";
  const serverName = "syncgroupcrud-8475";
  const databaseName = "syncgroupcrud-4328";
  const syncGroupName = "syncgroupcrud-3187";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.syncMembers.listBySyncGroup(
    resourceGroupName,
    serverName,
    databaseName,
    syncGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listSyncMembersUnderASyncGroup();
}

main().catch(console.error);
