// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates listing multiple configuration settings using a filter for a key or label.
 * @azsdk-weight 50
 */
import { AppConfigurationClient } from "@azure/app-configuration";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log(`Running listConfigurationSettings sample`);

  // Set the following environment variable or edit the value on the following line.
  const connectionString = process.env["APPCONFIG_CONNECTION_STRING"] || "<connection string>";
  const client = new AppConfigurationClient(connectionString);

  await client.addConfigurationSetting({
    key: "sample key",
    value: "sample value",
    label: "production",
  });

  await client.setConfigurationSetting({
    key: "sample key",
    value: "sample value",
    label: "developmentA",
  });

  await client.setConfigurationSetting({
    key: "key only for development",
    value: "value",
    label: "developmentB",
  });
  
  const collectedEtags = [];
  let iterator = client.listConfigurationSettings().byPage();
  for await (const response of iterator) {
    const etag = response._response.headers.get("Etag") as string;
    collectedEtags.push(etag);
    
  }

  let isSettingsOutdated = true;
  const pagedResponse = client.listConfigurationSettings({ matchConditions: collectedEtags }).byPage();
  for await (const response of pagedResponse) {
    const statusCode = response._response.status;
    if (statusCode === 304) {
      console.log("Settings are up-to-date");
      isSettingsOutdated = false;
    } else if (statusCode === 200) {
      console.log("Settings are outdated");
      isSettingsOutdated = true;
    } else if (statusCode === 412) {
      throw new Error("Precondition Failed");
    }
  }
}

main().catch((err) => {
  console.error("Failed to run sample:", err);
  process.exit(1);
});
