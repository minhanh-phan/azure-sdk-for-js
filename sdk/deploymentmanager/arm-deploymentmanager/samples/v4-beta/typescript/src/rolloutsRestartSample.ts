/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import {
  RolloutsRestartOptionalParams,
  AzureDeploymentManager
} from "@azure/arm-deploymentmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Only failed rollouts can be restarted.
 *
 * @summary Only failed rollouts can be restarted.
 * x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/rollout_post_restart.json
 */
async function restartRollout(): Promise<void> {
  const subscriptionId = "caac1590-e859-444f-a9e0-62091c0f5929";
  const resourceGroupName = "myResourceGroup";
  const rolloutName = "myRollout";
  const skipSucceeded = true;
  const options: RolloutsRestartOptionalParams = { skipSucceeded };
  const credential = new DefaultAzureCredential();
  const client = new AzureDeploymentManager(credential, subscriptionId);
  const result = await client.rollouts.restart(
    resourceGroupName,
    rolloutName,
    options
  );
  console.log(result);
}

restartRollout().catch(console.error);
