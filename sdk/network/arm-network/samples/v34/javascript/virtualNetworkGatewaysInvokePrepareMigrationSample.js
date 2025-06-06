/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Trigger prepare migration for the virtual network gateway.
 *
 * @summary Trigger prepare migration for the virtual network gateway.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/VirtualNetworkGatewayPrepareMigration.json
 */
async function virtualNetworkGatewayPrepareMigration() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayName = "vpngw";
  const migrationParams = {
    migrationType: "UpgradeDeploymentToStandardIP",
    resourceUrl: "testUrl",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.beginInvokePrepareMigrationAndWait(
    resourceGroupName,
    virtualNetworkGatewayName,
    migrationParams,
  );
  console.log(result);
}

async function main() {
  await virtualNetworkGatewayPrepareMigration();
}

main().catch(console.error);
