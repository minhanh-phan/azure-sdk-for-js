/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
/**
 * This sample demonstrates how to Generates the specified map.
 *
 * @summary Generates the specified map.
 * x-ms-original-file: specification/service-map/resource-manager/Microsoft.OperationalInsights/preview/2015-11-01-preview/examples/Maps/SMMapsGenerateMachineListDependencyPost.json
 */
import type { MachineListMapRequest } from "@azure/arm-servicemap";
import { ServiceMap } from "@azure/arm-servicemap";
import { DefaultAzureCredential } from "@azure/identity";

async function smMapsGenerateMachineListDependencyPost(): Promise<void> {
  const subscriptionId = "63BE4E24-FDF0-4E9C-9342-6A5D5A359722";
  const resourceGroupName = "rg-sm";
  const workspaceName = "D6F79F14-E563-469B-84B5-9286D2803B2F";
  const request: MachineListMapRequest = {
    endTime: new Date("2018-01-08T20:08:04.78Z"),
    filterProcesses: false,
    kind: "map:machine-list-dependency",
    machineIds: [
      "/subscriptions/63BE4E24-FDF0-4E9C-9342-6A5D5A359722/resourceGroups/rg-sm/providers/Microsoft.OperationalInsights/workspaces/D6F79F14-E563-469B-84B5-9286D2803B2F/machines/m-d60cf4c2-047a-408e-a5ff-cf3d77928c9f",
      "/subscriptions/63BE4E24-FDF0-4E9C-9342-6A5D5A359722/resourceGroups/rg-sm/providers/Microsoft.OperationalInsights/workspaces/D6F79F14-E563-469B-84B5-9286D2803B2F/machines/m-52d4f2f9-e684-4003-a774-9cf99898861b",
    ],
    startTime: new Date("2018-01-08T20:07:49.78Z"),
  };
  const credential = new DefaultAzureCredential();
  const client = new ServiceMap(credential, subscriptionId);
  const result = await client.maps.generate(resourceGroupName, workspaceName, request);
  console.log(result);
}

smMapsGenerateMachineListDependencyPost().catch(console.error);
