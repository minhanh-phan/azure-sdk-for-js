/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import type {
  NetworkVirtualAppliance} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates the specified Network Virtual Appliance.
 *
 * @summary Creates or updates the specified Network Virtual Appliance.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/NetworkVirtualAppliancePut.json
 */
async function createNetworkVirtualAppliance(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkVirtualApplianceName = "nva";
  const parameters: NetworkVirtualAppliance = {
    additionalNics: [{ name: "exrsdwan", hasPublicIp: true }],
    bootStrapConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrbootstrapconfig",
    ],
    cloudInitConfigurationBlobs: [
      "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrcloudinitconfig",
    ],
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/subid/resourcegroups/rg1/providers/MicrosoftManagedIdentity/userAssignedIdentities/identity1":
          {},
      },
    },
    internetIngressPublicIps: [
      {
        id: "/subscriptions/{{subscriptionId}}/resourceGroups/{{rg}}/providers/Microsoft.Network/publicIPAddresses/slbip",
      },
    ],
    location: "West US",
    networkProfile: {
      networkInterfaceConfigurations: [
        {
          nicType: "PublicNic",
          properties: {
            ipConfigurations: [
              { name: "publicnicipconfig", properties: { primary: true } },
              { name: "publicnicipconfig-2", properties: { primary: false } },
            ],
          },
        },
        {
          nicType: "PrivateNic",
          properties: {
            ipConfigurations: [
              { name: "privatenicipconfig", properties: { primary: true } },
              { name: "privatenicipconfig-2", properties: { primary: false } },
            ],
          },
        },
      ],
    },
    nvaSku: {
      bundledScaleUnit: "1",
      marketPlaceVersion: "12.1",
      vendor: "Cisco SDWAN",
    },
    tags: { key1: "value1" },
    virtualApplianceAsn: 10000,
    virtualHub: {
      id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/hub1",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.networkVirtualAppliances.beginCreateOrUpdateAndWait(
      resourceGroupName,
      networkVirtualApplianceName,
      parameters,
    );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates the specified Network Virtual Appliance.
 *
 * @summary Creates or updates the specified Network Virtual Appliance.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/NetworkVirtualApplianceSaaSPut.json
 */
async function createSaaSNetworkVirtualAppliance(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkVirtualApplianceName = "nva";
  const parameters: NetworkVirtualAppliance = {
    delegation: { serviceName: "PaloAltoNetworks.Cloudngfw/firewalls" },
    location: "West US",
    tags: { key1: "value1" },
    virtualHub: {
      id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/hub1",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.networkVirtualAppliances.beginCreateOrUpdateAndWait(
      resourceGroupName,
      networkVirtualApplianceName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await createNetworkVirtualAppliance();
  await createSaaSNetworkVirtualAppliance();
}

main().catch(console.error);
