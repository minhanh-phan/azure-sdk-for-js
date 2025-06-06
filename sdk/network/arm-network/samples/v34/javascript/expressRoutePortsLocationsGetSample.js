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
 * This sample demonstrates how to Retrieves a single ExpressRoutePort peering location, including the list of available bandwidths available at said peering location.
 *
 * @summary Retrieves a single ExpressRoutePort peering location, including the list of available bandwidths available at said peering location.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/ExpressRoutePortsLocationGet.json
 */
async function expressRoutePortsLocationGet() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const locationName = "locationName";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRoutePortsLocations.get(locationName);
  console.log(result);
}

async function main() {
  await expressRoutePortsLocationGet();
}

main().catch(console.error);
