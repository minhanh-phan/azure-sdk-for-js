/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import type { RecorderStartOptions } from "@azure-tools/test-recorder";
import { env, Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { FrontDoorManagementClient } from "../src/frontDoorManagementClient.js";
import { describe, it, beforeEach, afterEach } from "vitest";

const replaceableVariables: Record<string, string> = {
  SUBSCRIPTION_ID: "azure_subscription_id",
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
    "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
  ],
};

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("FrontDoor test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: FrontDoorManagementClient;
  let resourcename: string;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderOptions);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new FrontDoorManagementClient(
      credential,
      subscriptionId,
      recorder.configureClientOptions({}),
    );
    resourcename = "resourcetest";
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("frontDoorNameAvailability check test", async () => {
    await client.frontDoorNameAvailability.check({
      name: resourcename,
      type: "Microsoft.Network/frontDoors",
    });
  });
});
