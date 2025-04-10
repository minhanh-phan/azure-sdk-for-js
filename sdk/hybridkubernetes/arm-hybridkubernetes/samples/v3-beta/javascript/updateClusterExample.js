/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
/**
 * This sample demonstrates how to API to update certain properties of the connected cluster resource
 *
 * @summary API to update certain properties of the connected cluster resource
 * x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/UpdateClusterExample.json
 */
const { ConnectedKubernetesClient } = require("@azure/arm-hybridkubernetes");
const { DefaultAzureCredential } = require("@azure/identity");

async function updateClusterExample() {
  const subscriptionId = "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const resourceGroupName = "k8sc-rg";
  const clusterName = "testCluster";
  const connectedClusterPatch = {
    tags: { tag1: "value1", tag2: "value2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ConnectedKubernetesClient(credential, subscriptionId);
  const result = await client.connectedClusterOperations.update(
    resourceGroupName,
    clusterName,
    connectedClusterPatch,
  );
  console.log(result);
}

updateClusterExample().catch(console.error);
