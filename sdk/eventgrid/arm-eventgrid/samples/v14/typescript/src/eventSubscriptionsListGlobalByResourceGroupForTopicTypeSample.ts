/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List all global event subscriptions under a resource group for a specific topic type.
 *
 * @summary List all global event subscriptions under a resource group for a specific topic type.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/stable/2025-02-15/examples/EventSubscriptions_ListGlobalByResourceGroupForTopicType.json
 */
async function eventSubscriptionsListGlobalByResourceGroupForTopicType(): Promise<void> {
  const subscriptionId =
    process.env["EVENTGRID_SUBSCRIPTION_ID"] ||
    "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const resourceGroupName =
    process.env["EVENTGRID_RESOURCE_GROUP"] || "examplerg";
  const topicTypeName = "Microsoft.Resources.ResourceGroups";
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.eventSubscriptions.listGlobalByResourceGroupForTopicType(
    resourceGroupName,
    topicTypeName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await eventSubscriptionsListGlobalByResourceGroupForTopicType();
}

main().catch(console.error);
