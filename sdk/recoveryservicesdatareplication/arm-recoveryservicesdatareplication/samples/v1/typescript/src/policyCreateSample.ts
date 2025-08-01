// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates the policy.
 *
 * @summary creates the policy.
 * x-ms-original-file: 2024-09-01/Policy_Create.json
 */
async function putsThePolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.policy.create("rgrecoveryservicesdatareplication", "4", "fafqwc", {
    properties: {
      customProperties: {
        instanceType: "PolicyModelCustomProperties",
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putsThePolicy();
}

main().catch(console.error);
