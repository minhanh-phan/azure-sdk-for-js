// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { DataLakeServiceClient, getDataLakeServiceAccountAudience } from "../../src/index.js";
import {
  recorderEnvSetup,
  getConnectionStringFromEnvironment,
  getDataLakeServiceClient,
  configureStorageClient,
  SimpleTokenCredential,
} from "../utils/index.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("DataLakeServiceClient", () => {
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("DataLakeServiceClient default audience should work", async () => {
    const serviceClient = getDataLakeServiceClient(recorder);
    const datalakeServiceClientWithOAuthToken = new DataLakeServiceClient(
      serviceClient.url,
      createTestCredential(),
    );
    configureStorageClient(recorder, datalakeServiceClientWithOAuthToken);
    await datalakeServiceClientWithOAuthToken.getProperties();
  });

  it("DataLakeServiceClient customized audience should work", async () => {
    const serviceClient = getDataLakeServiceClient(recorder);
    const datalakeServiceClientWithOAuthToken = new DataLakeServiceClient(
      serviceClient.url,
      createTestCredential(),
      { audience: getDataLakeServiceAccountAudience(serviceClient.accountName) },
    );
    configureStorageClient(recorder, datalakeServiceClientWithOAuthToken);
    await datalakeServiceClientWithOAuthToken.getProperties();
  });

  it("DataLakeServiceClient bearer token challenge should work", async () => {
    const serviceClient = getDataLakeServiceClient(recorder);

    // Validate that bad audience should fail first.
    const authToken = await createTestCredential().getToken(
      "https://badaudience.blob.core.windows.net/.default",
    );

    assert.isNotNull(authToken);
    const datalakeServiceClientWithPlainOAuthToken = new DataLakeServiceClient(
      serviceClient.url,
      new SimpleTokenCredential(authToken!.token),
    );
    configureStorageClient(recorder, datalakeServiceClientWithPlainOAuthToken);

    try {
      await datalakeServiceClientWithPlainOAuthToken.getProperties();
      assert.fail("Should fail with 401");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 401);
    }

    const datalakeServiceClientWithOAuthToken = new DataLakeServiceClient(
      serviceClient.url,
      createTestCredential(),
      { audience: "https://badaudience.dfs.core.windows.net/.default" },
    );
    configureStorageClient(recorder, datalakeServiceClientWithOAuthToken);
    await datalakeServiceClientWithOAuthToken.getProperties();
  });

  it("can be created from AccountConnString", async () => {
    const newClient = DataLakeServiceClient.fromConnectionString(
      getConnectionStringFromEnvironment(),
      {
        retryOptions: {
          maxTries: 1,
        },
      },
    );
    configureStorageClient(recorder, newClient);

    const listIter = newClient.listFileSystems();
    await listIter.next();
    assert.ok(newClient.url.includes("dfs"));
  });
});
