/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { StreamingJobsGetOptionalParams } from "@azure/arm-streamanalytics";
import { StreamAnalyticsManagementClient } from "@azure/arm-streamanalytics";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets details about the specified streaming job.
 *
 * @summary Gets details about the specified streaming job.
 * x-ms-original-file: specification/streamanalytics/resource-manager/Microsoft.StreamAnalytics/preview/2021-10-01-preview/examples/StreamingJob_Get_NoExpand.json
 */
async function getAStreamingJobAndDoNotUseTheExpandODataQueryParameter(): Promise<void> {
  const subscriptionId =
    process.env["STREAMANALYTICS_SUBSCRIPTION_ID"] || "56b5e0a9-b645-407d-99b0-c64f86013e3d";
  const resourceGroupName = process.env["STREAMANALYTICS_RESOURCE_GROUP"] || "sjrg6936";
  const jobName = "sj59";
  const credential = new DefaultAzureCredential();
  const client = new StreamAnalyticsManagementClient(credential, subscriptionId);
  const result = await client.streamingJobs.get(resourceGroupName, jobName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets details about the specified streaming job.
 *
 * @summary Gets details about the specified streaming job.
 * x-ms-original-file: specification/streamanalytics/resource-manager/Microsoft.StreamAnalytics/preview/2021-10-01-preview/examples/StreamingJob_Get_Expand.json
 */
async function getAStreamingJobAndUseTheExpandODataQueryParameterToExpandInputsOutputsTransformationAndFunctions(): Promise<void> {
  const subscriptionId =
    process.env["STREAMANALYTICS_SUBSCRIPTION_ID"] || "56b5e0a9-b645-407d-99b0-c64f86013e3d";
  const expand = "inputs,outputs,transformation,functions";
  const resourceGroupName = process.env["STREAMANALYTICS_RESOURCE_GROUP"] || "sjrg3276";
  const jobName = "sj7804";
  const options: StreamingJobsGetOptionalParams = { expand };
  const credential = new DefaultAzureCredential();
  const client = new StreamAnalyticsManagementClient(credential, subscriptionId);
  const result = await client.streamingJobs.get(resourceGroupName, jobName, options);
  console.log(result);
}

async function main(): Promise<void> {
  await getAStreamingJobAndDoNotUseTheExpandODataQueryParameter();
  await getAStreamingJobAndUseTheExpandODataQueryParameterToExpandInputsOutputsTransformationAndFunctions();
}

main().catch(console.error);
