/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieve the job stream identified by job stream id.
 *
 * @summary Retrieve the job stream identified by job stream id.
 * x-ms-original-file: specification/automation/resource-manager/Microsoft.Automation/preview/2020-01-13-preview/examples/compilationJobStreamByJobStreamId.json
 */
async function getADscCompilationJobStreamByJobStreamId(): Promise<void> {
  const subscriptionId = process.env["AUTOMATION_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["AUTOMATION_RESOURCE_GROUP"] || "rg";
  const automationAccountName = "myAutomationAccount33";
  const jobId = "836d4e06-2d88-46b4-8500-7febd4906838";
  const jobStreamId =
    "836d4e06-2d88-46b4-8500-7febd4906838_00636481062421684835_00000000000000000008";
  const credential = new DefaultAzureCredential();
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.dscCompilationJobOperations.getStream(
    resourceGroupName,
    automationAccountName,
    jobId,
    jobStreamId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getADscCompilationJobStreamByJobStreamId();
}

main().catch(console.error);
