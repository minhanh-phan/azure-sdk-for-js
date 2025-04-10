/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to  This operation updates a policy exemption with the given scope and name.
 *
 * @summary  This operation updates a policy exemption with the given scope and name.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/preview/2022-07-01-preview/examples/updatePolicyExemptionWithResourceSelectors.json
 */
async function updateAPolicyExemptionWithResourceSelectors() {
  const scope = "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/resourceGroups/demoCluster";
  const policyExemptionName = "DemoExpensiveVM";
  const parameters = {
    assignmentScopeValidation: "Default",
    resourceSelectors: [
      {
        name: "SDPRegions",
        selectors: [{ in: ["eastus2euap", "centraluseuap"], kind: "resourceLocation" }],
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyExemptions.update(scope, policyExemptionName, parameters);
  console.log(result);
}

async function main() {
  await updateAPolicyExemptionWithResourceSelectors();
}

main().catch(console.error);
