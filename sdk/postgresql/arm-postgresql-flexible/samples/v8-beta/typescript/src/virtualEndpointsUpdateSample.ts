/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  VirtualEndpointResourceForPatch,
  PostgreSQLManagementFlexibleServerClient,
} from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates an existing virtual endpoint. The request body can contain one to many of the properties present in the normal virtual endpoint definition.
 *
 * @summary Updates an existing virtual endpoint. The request body can contain one to many of the properties present in the normal virtual endpoint definition.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/VirtualEndpointUpdate.json
 */
async function updateAVirtualEndpointForAServerToUpdateThe(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "testrg";
  const serverName = "pgtestsvc4";
  const virtualEndpointName = "pgVirtualEndpoint1";
  const parameters: VirtualEndpointResourceForPatch = {
    endpointType: "ReadWrite",
    members: ["testReplica1"],
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.virtualEndpoints.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    virtualEndpointName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAVirtualEndpointForAServerToUpdateThe();
}

main().catch(console.error);
