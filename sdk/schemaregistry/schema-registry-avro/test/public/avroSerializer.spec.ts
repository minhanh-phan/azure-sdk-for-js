// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CreateTestSerializerOptions } from "./utils/mockedSerializer.js";
import { createTestSerializer, registerTestSchema } from "./utils/mockedSerializer.js";
import { testAvroType, testGroup, testSchema, testValue, testSchemaName } from "./utils/dummies.js";
import type { MessageContent } from "../../src/index.js";
import { AvroSerializer } from "../../src/index.js";
import {
  createPipelineWithCredential,
  createTestRegistry,
  removeSchemas,
} from "./utils/mockedRegistryClient.js";
import { Recorder, isLiveMode } from "@azure-tools/test-recorder";
import type { SchemaRegistry } from "@azure/schema-registry";
import type { HttpClient, Pipeline } from "@azure/core-rest-pipeline";
import { createDefaultHttpClient } from "@azure/core-rest-pipeline";
import { describe, it, assert, beforeEach, afterEach, expect } from "vitest";
import { randomUUID } from "@azure/core-util";

describe("AvroSerializer", async function () {
  let noAutoRegisterOptions: CreateTestSerializerOptions<any>;
  let recorder: Recorder;
  let registry: SchemaRegistry;
  const schemaNamesList: string[] = [];
  let client: HttpClient;
  let pipeline: Pipeline;

  beforeEach(async (ctx) => {
    client = createDefaultHttpClient();
    pipeline = createPipelineWithCredential();
    recorder = new Recorder(ctx);
    registry = createTestRegistry({ recorder });
    noAutoRegisterOptions = {
      serializerOptions: { autoRegisterSchemas: false, groupName: testGroup },
      recorder,
    };

    schemaNamesList.push(testSchemaName);
  });

  afterEach(async () => {
    await removeSchemas(schemaNamesList, pipeline, client);
  });

  it("serializes to the expected format", async () => {
    const schemaId = await registerTestSchema(registry);
    const serializer = await createTestSerializer<MessageContent>({
      ...noAutoRegisterOptions,
      registry,
    });
    const { contentType, data } = await serializer.serialize(testValue, testSchema);
    assert.isUndefined((data as Buffer).readBigInt64BE);
    const buffer = Buffer.from(data);
    assert.strictEqual(`avro/binary+${schemaId}`, contentType);
    assert.deepStrictEqual(testAvroType.fromBuffer(buffer), testValue);
    assert.equal(serializer["cacheById"].size, 1);
    assert.equal(
      serializer["cacheById"].peek(schemaId)?.name,
      "com.azure.schemaregistry.samples.AvroUser",
    );
    assert.equal(serializer["cacheBySchemaDefinition"].size, 1);
    assert.equal(serializer["cacheBySchemaDefinition"].peek(testSchema)?.id, schemaId);
  });

  it("deserializes from the expected format", async () => {
    const schemaId = await registerTestSchema(registry);
    const serializer = await createTestSerializer<MessageContent>({
      ...noAutoRegisterOptions,
      registry,
    });
    const data = testAvroType.toBuffer(testValue);
    assert.deepStrictEqual(
      await serializer.deserialize({
        data,
        contentType: `avro/binary+${schemaId}`,
      }),
      testValue,
    );
  });

  // TODO: Fix the test. Content type value returned is different
  it.skip("serializes and deserializes in round trip", async () => {
    let serializer = await createTestSerializer({ recorder });
    let message = await serializer.serialize(testValue, testSchema);
    assert.deepStrictEqual(await serializer.deserialize(message), testValue);

    // again for cache hit coverage on serialize
    message = await serializer.serialize(testValue, testSchema);
    assert.deepStrictEqual(await serializer.deserialize(message), testValue);

    // throw away serializer for cache miss coverage on deserialize
    serializer = await createTestSerializer(noAutoRegisterOptions);
    assert.deepStrictEqual(await serializer.deserialize(message), testValue);

    // throw away serializer again and cover getSchemaProperties instead of registerSchema
    serializer = await createTestSerializer(noAutoRegisterOptions);
    assert.deepStrictEqual(await serializer.serialize(testValue, testSchema), message);
  });

  it("serializes and deserializes logical type for timestamp-millis", async () => {
    const serializer = new AvroSerializer(registry as any, {
      autoRegisterSchemas: true,
      groupName: testGroup,
    });
    const testTransaction = {
      amount: 32,
      time: new Date("Thu Nov 05 2015 11:38:05 GMT-0800 (PST)"),
    };
    const message = await serializer.serialize(
      testTransaction,
      JSON.stringify({
        type: "record",
        name: "AvroUser",
        namespace: "com.azure.schemaregistry.samples",
        fields: [
          { name: "amount", type: "int" },
          { name: "time", type: { type: "long", logicalType: "timestamp-millis" } },
        ],
      }),
    );
    assert.isDefined(message);
    assert.deepStrictEqual(await serializer.deserialize(message), testTransaction);
  });

  it("works with trivial example in README", async () => {
    const serializer = await createTestSerializer({ recorder });

    // Example Avro schema
    const schema = {
      type: "record",
      name: "Rating",
      namespace: "my.example",
      fields: [{ name: "score", type: "int" }],
    };

    // Example value that matches the Avro schema above
    const value = { score: 42 };

    // serialize value to a message
    const message = await serializer.serialize(value, JSON.stringify(schema));

    // Deserialize message to value
    const deserializedValue = await serializer.deserialize(message);

    assert.deepStrictEqual(deserializedValue, value);
    schemaNamesList.push(`${schema.namespace}.${schema.name}`);
  });

  it("deserializes from a compatible reader schema", async () => {
    const serializer = await createTestSerializer({ recorder });
    const message = await serializer.serialize(testValue, testSchema);
    const deserializedValue: any = await serializer.deserialize(message, {
      /**
       * This schema is missing the favoriteNumber field that exists in the writer schema
       * and adds an "age" field with a default value.
       */
      schema: JSON.stringify({
        type: "record",
        name: "AvroUser",
        namespace: "com.azure.schemaregistry.samples",
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "age",
            type: "int",
            default: 30,
          },
        ],
      }),
    });
    assert.isUndefined(deserializedValue.favoriteNumber);
    assert.equal(deserializedValue.name, testValue.name);
    assert.equal(deserializedValue.age, 30);
  });

  it("ignores the old format", async () => {
    const schemaId = await registerTestSchema(registry);
    const serializer = await createTestSerializer<MessageContent>({
      ...noAutoRegisterOptions,
      registry,
    });
    const payload = testAvroType.toBuffer(testValue);
    const data = Buffer.alloc(36 + payload.length);

    data.write(schemaId, 4, 32, "utf-8");
    payload.copy(data, 36);
    await expect(
      serializer.deserialize({
        data,
        contentType: `avro/binary+${randomUUID()}`,
      }),
    ).rejects.toThrow(/Schema id .* does not exist/);
  });

  /** TODO: unskip when we can access internal cache */
  it.skip("cache size growth is bounded", async function ({ skip }) {
    /**
     * This test is very expensive to run in live because it registers too many
     * schemas but the standard-tier resource allows for up to 25 schemas only
     */
    if (isLiveMode()) {
      skip();
    }
    function makeRndStr(length: number): string {
      let result = "";
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    }

    const serializer = await createTestSerializer({ registry, recorder });
    /**
     * The standard tier resource supports registering up to 25 schemas per a schema group.
     */
    const maxSchemaCount = 25;
    const maxCacheEntriesCount = Math.floor(maxSchemaCount / 2);
    (serializer["cacheById"] as any).max = maxCacheEntriesCount;
    (serializer["cacheBySchemaDefinition"] as any).max = maxCacheEntriesCount;
    const itersCount = 2 * maxCacheEntriesCount;
    assert.isAtLeast(itersCount, maxCacheEntriesCount + 1);
    let i = 0;
    for (; i < itersCount; ++i) {
      const field1 = makeRndStr(10);
      const field2 = makeRndStr(10);
      const valueToBeSerialized = JSON.parse(`{ "${field1}": "Nick", "${field2}": 42 }`);
      const schemaToSerializeWith = JSON.stringify({
        type: "record",
        name: makeRndStr(8),
        namespace: "com.azure.schemaregistry.samples",
        fields: [
          {
            name: field1,
            type: "string",
          },
          {
            name: field2,
            type: "int",
          },
        ],
      });
      await serializer.serialize(valueToBeSerialized, schemaToSerializeWith);
      if (i < maxCacheEntriesCount) {
        assert.equal(serializer["cacheById"].size, i + 1);
        assert.equal(serializer["cacheBySchemaDefinition"].size, i + 1);
      } else {
        assert.equal(serializer["cacheById"].size, maxCacheEntriesCount);
        assert.equal(serializer["cacheBySchemaDefinition"].size, maxCacheEntriesCount);
      }
    }
  });
});
