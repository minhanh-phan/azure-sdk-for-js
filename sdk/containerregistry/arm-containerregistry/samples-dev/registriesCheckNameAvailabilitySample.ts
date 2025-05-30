/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  RegistryNameCheckRequest,
  ContainerRegistryManagementClient,
} from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Checks whether the container registry name is available for use. The name must contain only alphanumeric characters, be globally unique, and between 5 and 50 characters in length.
 *
 * @summary Checks whether the container registry name is available for use. The name must contain only alphanumeric characters, be globally unique, and between 5 and 50 characters in length.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/preview/2025-03-01-preview/examples/RegistryCheckNameAvailable.json
 */
async function registryCheckNameAvailable(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const registryNameCheckRequest: RegistryNameCheckRequest = {
    name: "myRegistry",
    type: "Microsoft.ContainerRegistry/registries",
    autoGeneratedDomainNameLabelScope: "ResourceGroupReuse",
    resourceGroupName: "myResourceGroup",
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.registries.checkNameAvailability(
    registryNameCheckRequest,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Checks whether the container registry name is available for use. The name must contain only alphanumeric characters, be globally unique, and between 5 and 50 characters in length.
 *
 * @summary Checks whether the container registry name is available for use. The name must contain only alphanumeric characters, be globally unique, and between 5 and 50 characters in length.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/preview/2025-03-01-preview/examples/RegistryCheckNameNotAvailable.json
 */
async function registryCheckNameNotAvailable(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const registryNameCheckRequest: RegistryNameCheckRequest = {
    name: "myRegistry",
    type: "Microsoft.ContainerRegistry/registries",
    autoGeneratedDomainNameLabelScope: "ResourceGroupReuse",
    resourceGroupName: "myResourceGroup",
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.registries.checkNameAvailability(
    registryNameCheckRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await registryCheckNameAvailable();
  await registryCheckNameNotAvailable();
}

main().catch(console.error);
