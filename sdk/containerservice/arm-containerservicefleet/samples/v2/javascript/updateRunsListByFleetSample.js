// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list UpdateRun resources by Fleet
 *
 * @summary list UpdateRun resources by Fleet
 * x-ms-original-file: 2025-03-01/UpdateRuns_ListByFleet.json
 */
async function listsTheUpdateRunResourcesByFleet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.updateRuns.listByFleet("rg1", "fleet1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list UpdateRun resources by Fleet
 *
 * @summary list UpdateRun resources by Fleet
 * x-ms-original-file: 2025-03-01/UpdateRuns_ListByFleet_MaximumSet_Gen.json
 */
async function listsTheUpdateRunResourcesByFleetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.updateRuns.listByFleet("rgfleets", "fleet1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsTheUpdateRunResourcesByFleet();
  await listsTheUpdateRunResourcesByFleetGeneratedByMaximumSetRule();
}

main().catch(console.error);
