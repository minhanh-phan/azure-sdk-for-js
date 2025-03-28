/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Operation to delete a SenderUsernames resource.
 *
 * @summary Operation to delete a SenderUsernames resource.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/senderUsernames/delete.json
 */
async function deleteSenderUsernamesResource(): Promise<void> {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] || "11112222-3333-4444-5555-666677778888";
  const resourceGroupName = process.env["COMMUNICATION_RESOURCE_GROUP"] || "MyResourceGroup";
  const emailServiceName = "MyEmailServiceResource";
  const domainName = "mydomain.com";
  const senderUsername = "contosoNewsAlerts";
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.senderUsernames.delete(
    resourceGroupName,
    emailServiceName,
    domainName,
    senderUsername,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteSenderUsernamesResource();
}

main().catch(console.error);
