// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthDataAIServicesClient } from "@azure/arm-healthdataaiservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a DeidService
 *
 * @summary create a DeidService
 * x-ms-original-file: 2024-09-20/DeidServices_Create_MaximumSet_Gen.json
 */
async function deidServicesCreateGeneratedByMaximumSetRuleStable(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F21BB31B-C214-42C0-ACF0-DACCA05D3011";
  const client = new HealthDataAIServicesClient(credential, subscriptionId);
  const result = await client.deidServices.create("rgopenapi", "deidTest", {
    properties: { publicNetworkAccess: "Enabled" },
    identity: { type: "None", userAssignedIdentities: {} },
    tags: {},
    location: "qwyhvdwcsjulggagdqxlmazcl",
  });
  console.log(result);
}

async function main(): Promise<void> {
  deidServicesCreateGeneratedByMaximumSetRuleStable();
}

main().catch(console.error);
