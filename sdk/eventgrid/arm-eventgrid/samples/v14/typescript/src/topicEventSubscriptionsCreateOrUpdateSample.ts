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
  EventSubscription,
  EventGridManagementClient
} from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Asynchronously creates a new event subscription or updates an existing event subscription.
 *
 * @summary Asynchronously creates a new event subscription or updates an existing event subscription.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/stable/2022-06-15/examples/TopicEventSubscriptions_CreateOrUpdate.json
 */
async function topicEventSubscriptionsCreateOrUpdate() {
  const subscriptionId =
    process.env["EVENTGRID_SUBSCRIPTION_ID"] ||
    "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const resourceGroupName =
    process.env["EVENTGRID_RESOURCE_GROUP"] || "examplerg";
  const topicName = "exampleTopic1";
  const eventSubscriptionName = "exampleEventSubscriptionName1";
  const eventSubscriptionInfo: EventSubscription = {
    destination: {
      endpointType: "WebHook",
      endpointUrl: "https://requestb.in/15ksip71"
    },
    filter: {
      isSubjectCaseSensitive: false,
      subjectBeginsWith: "ExamplePrefix",
      subjectEndsWith: "ExampleSuffix"
    }
  };
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.topicEventSubscriptions.beginCreateOrUpdateAndWait(
    resourceGroupName,
    topicName,
    eventSubscriptionName,
    eventSubscriptionInfo
  );
  console.log(result);
}

async function main() {
  topicEventSubscriptionsCreateOrUpdate();
}

main().catch(console.error);