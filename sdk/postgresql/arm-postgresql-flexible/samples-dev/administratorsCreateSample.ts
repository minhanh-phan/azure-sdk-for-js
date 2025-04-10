/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { ActiveDirectoryAdministratorAdd } from "@azure/arm-postgresql-flexible";
import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a new server.
 *
 * @summary Creates a new server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2024-08-01/examples/AdministratorAdd.json
 */
async function addsAnActiveDIrectoryAdministratorForTheServer(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "testrg";
  const serverName = "testserver";
  const objectId = "oooooooo-oooo-oooo-oooo-oooooooooooo";
  const parameters: ActiveDirectoryAdministratorAdd = {
    principalName: "testuser1@microsoft.com",
    principalType: "User",
    tenantId: "tttttttt-tttt-tttt-tttt-tttttttttttt",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.administrators.beginCreateAndWait(
    resourceGroupName,
    serverName,
    objectId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await addsAnActiveDIrectoryAdministratorForTheServer();
}

main().catch(console.error);
