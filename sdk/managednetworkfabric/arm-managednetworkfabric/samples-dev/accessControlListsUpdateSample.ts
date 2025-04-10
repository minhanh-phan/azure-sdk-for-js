/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { AccessControlListPatch } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to API to update certain properties of the Access Control List resource.
 *
 * @summary API to update certain properties of the Access Control List resource.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/AccessControlLists_Update_MaximumSet_Gen.json
 */
async function accessControlListsUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const accessControlListName = "example-acl";
  const body: AccessControlListPatch = {
    aclsUrl: "https://microsoft.com/a",
    annotation: "annotation",
    configurationType: "File",
    dynamicMatchConfigurations: [
      {
        ipGroups: [
          {
            name: "example-ipGroup",
            ipAddressType: "IPv4",
            ipPrefixes: ["10.20.3.1/20"],
          },
        ],
        portGroups: [{ name: "example-portGroup", ports: ["100-200"] }],
        vlanGroups: [{ name: "example-vlanGroup", vlans: ["20-30"] }],
      },
    ],
    matchConfigurations: [
      {
        actions: [{ type: "Count", counterName: "example-counter" }],
        ipAddressType: "IPv4",
        matchConditions: [
          {
            dscpMarkings: ["32"],
            etherTypes: ["0x1"],
            fragments: ["0xff00-0xffff"],
            ipCondition: {
              type: "SourceIP",
              ipGroupNames: ["example-ipGroup"],
              ipPrefixValues: ["10.20.20.20/12"],
              prefixType: "Prefix",
            },
            ipLengths: ["4094-9214"],
            portCondition: {
              flags: ["established"],
              layer4Protocol: "TCP",
              portGroupNames: ["example-portGroup"],
              portType: "SourcePort",
              ports: ["1-20"],
            },
            protocolTypes: ["TCP"],
            ttlValues: ["23"],
            vlanMatchCondition: {
              innerVlans: ["30"],
              vlanGroupNames: ["example-vlanGroup"],
              vlans: ["20-30"],
            },
          },
        ],
        matchConfigurationName: "example-match",
        sequenceNumber: 123,
      },
    ],
    tags: { keyID: "KeyValue" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.accessControlLists.beginUpdateAndWait(
    resourceGroupName,
    accessControlListName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await accessControlListsUpdateMaximumSetGen();
}

main().catch(console.error);
