// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryClient } from "../../src/index.js";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createRegistryClient, recorderStartOptions } from "../utils/utils.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

const serviceVersion = "2021-07-01";

describe("Anonymous access tests", () => {
  // Declare the client and recorder instances.  We will set them using the
  // beforeEach hook.
  let client: ContainerRegistryClient;
  let recorder: Recorder;
  const repositoryName = "library/hello-world";

  // NOTE: use of "function" and not ES6 arrow-style functions with the
  // beforeEach hook is IMPORTANT due to the use of `this` in the function
  // body.
  beforeEach(async (ctx) => {
    // The recorder has some convenience methods, and we need to store a
    // reference to it so that we can `stop()` the recorder later in the
    // `afterEach` hook.
    recorder = new Recorder(ctx);

    await recorder.start(recorderStartOptions);

    // We'll be able to refer to the instantiated `client` in tests, since we
    // initialize it before each test
    client = createRegistryClient(
      assertEnvironmentVariable("CONTAINER_REGISTRY_ANONYMOUS_ENDPOINT"),
      serviceVersion,
      recorder,
      {
        anonymous: true,
      },
    );
  });

  // After each test, we need to stop the recording.
  afterEach(async () => {
    await recorder.stop();
  });

  it("should list repositories with anonymous access", async () => {
    const iter = client.listRepositoryNames();
    const results: string[] = [];
    for await (const name of iter) {
      results.push(name);
    }
    assert.isTrue(
      results.indexOf(repositoryName) !== -1,
      `Expecting '${repositoryName}' in the list`,
    );
  });

  it("should throw error setting properties with anonymous access", async () => {
    try {
      const repository = client.getRepository(repositoryName);
      await repository.updateProperties({
        canDelete: false,
      });
      assert.fail("should have thrown already");
    } catch (e: any) {
      assert.strictEqual((e as any).statusCode, 401);
      assert.strictEqual((e as any).details.errors[0].code, "UNAUTHORIZED");
    }
  });
});
