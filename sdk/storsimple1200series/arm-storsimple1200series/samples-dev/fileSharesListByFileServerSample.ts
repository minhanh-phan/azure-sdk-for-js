/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { StorSimpleManagementClient } from "@azure/arm-storsimple1200series";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Retrieves all the file shares in a file server.
 *
 * @summary Retrieves all the file shares in a file server.
 * x-ms-original-file: specification/storsimple1200series/resource-manager/Microsoft.StorSimple/stable/2016-10-01/examples/FileSharesListByFileServer.json
 */
async function fileSharesListByFileServer(): Promise<void> {
  const subscriptionId = "9eb689cd-7243-43b4-b6f6-5c65cb296641";
  const deviceName = "HSDK-ARCSX4MVKZ";
  const fileServerName = "HSDK-ARCSX4MVKZ";
  const resourceGroupName = "ResourceGroupForSDKTest";
  const managerName = "hAzureSDKOperations";
  const credential = new DefaultAzureCredential();
  const client = new StorSimpleManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileShares.listByFileServer(
    deviceName,
    fileServerName,
    resourceGroupName,
    managerName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

fileSharesListByFileServer().catch(console.error);
