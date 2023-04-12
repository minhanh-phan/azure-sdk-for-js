/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Description for Microsoft.CertificateRegistration call to get a detector response from App Lens.
 *
 * @summary Description for Microsoft.CertificateRegistration call to get a detector response from App Lens.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.CertificateRegistration/stable/2022-09-01/examples/Diagnostics_GetAppServiceCertificateOrderDetectorResponse.json
 */
async function getAppServiceCertificateOrderDetectorResponse() {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] || "5700fc96-77b4-4f8d-afce-c353d8c443bd";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "Sample-WestUSResourceGroup";
  const certificateOrderName = "SampleCertificateOrderName";
  const detectorName = "AutoRenewStatus";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result =
    await client.certificateOrdersDiagnostics.getAppServiceCertificateOrderDetectorResponse(
      resourceGroupName,
      certificateOrderName,
      detectorName
    );
  console.log(result);
}

async function main() {
  getAppServiceCertificateOrderDetectorResponse();
}

main().catch(console.error);