// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeserializeOptions, JsonSchemaSerializer } from "../../src/index.js";
import type { SchemaRegistry } from "@azure/schema-registry";
import { createTestRegistry } from "./utils/mockedRegistryClient.js";
import { createTestSerializer } from "./utils/mockedSerializer.js";
import { createContentType, encoder, testGroup } from "./utils/dummies.js";
import { Recorder } from "@azure-tools/test-recorder";
import { assertError } from "./utils/assertError.js";
import Ajv from "ajv";
import { describe, it, assert, beforeEach } from "vitest";

describe("Deserialize Validation", () => {
  let serializer: JsonSchemaSerializer;
  let registry: SchemaRegistry;
  let recorder: Recorder;
  let skipValidationOption: DeserializeOptions;
  let validateWithAjvOption: DeserializeOptions;
  let id: string;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    registry = createTestRegistry({ recorder });
    serializer = await createTestSerializer({
      registry,
      serializerOptions: {
        groupName: testGroup,
      },
      recorder,
    });
    skipValidationOption = {
      validateCallback(message, schema) {
        return schema && message ? true : false;
      },
    };
    validateWithAjvOption = {
      validateCallback(message, schema) {
        const ajv = new Ajv.default();
        const validator = ajv.compile(JSON.parse(schema));
        const valid = validator(message);
        if (!valid) {
          throw new Error(JSON.stringify(validator.errors));
        }
      },
    };
    ({ id } = await registry.registerSchema({
      definition: JSON.stringify({
        $id: "id",
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The name of the student",
          },
          favoriteNumber: {
            type: "integer",
            description: "The favorite number of the student",
          },
        },
        required: ["name"],
      }),
      format: "json",
      groupName: testGroup,
      name: "test",
    }));
  });

  describe("Value validation", () => {
    it("succeeds with incompatible data", async () => {
      const data = {
        favoriteNumber: "four",
      };
      const deserialedData = await serializer.deserialize(
        {
          data: encoder.encode(JSON.stringify(data)),
          contentType: createContentType(id),
        },
        skipValidationOption,
      );
      assert.deepEqual(data, deserialedData);
    });

    it("succeeds with validation", async () => {
      const data = {
        name: "Alice",
      };
      assert.deepEqual(
        await serializer.deserialize(
          {
            data: encoder.encode(JSON.stringify(data)),
            contentType: createContentType(id),
          },
          validateWithAjvOption,
        ),
        data,
      );
    });

    it("validation fails with missing property", async () => {
      const data = {
        favoriteNumber: 4,
      };
      await assertError(
        serializer.deserialize(
          {
            data: encoder.encode(JSON.stringify(data)),
            contentType: createContentType(id),
          },
          validateWithAjvOption,
        ),
        {
          message: /Json validation failed/,
          causeMessage: /must have required property 'name'/,
        },
      );
    });

    it("validation fails with incompatible data", async () => {
      const data = {
        name: "Alice",
        favoriteNumber: "four",
      };
      await assertError(
        serializer.deserialize(
          {
            data: encoder.encode(JSON.stringify(data)),
            contentType: createContentType(id),
          },
          validateWithAjvOption,
        ),
        {
          message: /Json validation failed/,
          causeMessage: /must be integer/,
        },
      );
    });
  });
});

describe("Validation Error", () => {
  let serializer: JsonSchemaSerializer;
  let registry: SchemaRegistry;
  let recorder: Recorder;
  let validateWithAjvOption: DeserializeOptions;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    registry = createTestRegistry({ recorder });
    serializer = await createTestSerializer({
      registry,
      serializerOptions: {
        groupName: testGroup,
      },
      recorder,
    });
    validateWithAjvOption = {
      validateCallback(message, schema) {
        const ajv = new Ajv.default();
        const validator = ajv.compile(JSON.parse(schema));
        const valid = validator(message);
        if (!valid) {
          throw new Error(JSON.stringify(validator.errors));
        }
      },
    };
  });

  describe("Error validation", () => {
    it("boolean", async () => {
      const testData = "x";
      const { id } = await registry.registerSchema({
        definition: JSON.stringify({
          $id: "boolean",
          type: "boolean",
        }),
        format: "json",
        groupName: testGroup,
        name: "boolean",
      });
      await assertError(
        serializer.deserialize(
          {
            data: encoder.encode(JSON.stringify(testData)),
            contentType: createContentType(id),
          },
          validateWithAjvOption,
        ),
        {
          message: /Json validation failed/,
          causeMessage: /must be boolean/,
        },
      );
    });

    it("string", async () => {
      const testData = 1;
      const { id } = await registry.registerSchema({
        definition: JSON.stringify({
          $id: "string",
          type: "string",
        }),
        format: "json",
        groupName: testGroup,
        name: "string",
      });
      await assertError(
        serializer.deserialize(
          {
            data: encoder.encode(JSON.stringify(testData)),
            contentType: createContentType(id),
          },
          validateWithAjvOption,
        ),
        {
          message: /Json validation failed/,
          causeMessage: /must be string/,
        },
      );
    });

    it("integer", async () => {
      const testData = "x";
      const { id } = await registry.registerSchema({
        definition: JSON.stringify({
          $id: "integer",
          type: "integer",
        }),
        format: "json",
        groupName: testGroup,
        name: "integer",
      });
      await assertError(
        serializer.deserialize(
          {
            data: encoder.encode(JSON.stringify(testData)),
            contentType: createContentType(id),
          },
          validateWithAjvOption,
        ),
        {
          message: /Json validation failed/,
          causeMessage: /must be integer/,
        },
      );
    });

    it("null", async () => {
      const testData = "x";
      const { id } = await registry.registerSchema({
        definition: JSON.stringify({
          $id: "null",
          type: "null",
        }),
        format: "json",
        groupName: testGroup,
        name: "null",
      });
      await assertError(
        serializer.deserialize(
          {
            data: encoder.encode(JSON.stringify(testData)),
            contentType: createContentType(id),
          },
          validateWithAjvOption,
        ),
        {
          message: /Json validation failed/,
          causeMessage: /must be null/,
        },
      );
    });

    it("number", async () => {
      const testData = "x";
      const { id } = await registry.registerSchema({
        definition: JSON.stringify({
          $id: "number",
          type: "number",
        }),
        format: "json",
        groupName: testGroup,
        name: "number",
      });
      await assertError(
        serializer.deserialize(
          {
            data: encoder.encode(JSON.stringify(testData)),
            contentType: createContentType(id),
          },
          validateWithAjvOption,
        ),
        {
          message: /Json validation failed/,
          causeMessage: /must be number/,
        },
      );
    });

    it("array", async () => {
      const testData = "x";
      const { id } = await registry.registerSchema({
        definition: JSON.stringify({
          $id: "array",
          type: "array",
        }),
        format: "json",
        groupName: testGroup,
        name: "array",
      });
      await assertError(
        serializer.deserialize(
          {
            data: encoder.encode(JSON.stringify(testData)),
            contentType: createContentType(id),
          },
          validateWithAjvOption,
        ),
        {
          message: /Json validation failed/,
          causeMessage: /must be array/,
        },
      );
    });

    it("object", async () => {
      const testData = "x";
      const { id } = await registry.registerSchema({
        definition: JSON.stringify({
          $id: "object",
          type: "object",
          properties: {
            field: {
              type: "string",
            },
          },
        }),
        format: "json",
        groupName: testGroup,
        name: "object",
      });
      await assertError(
        serializer.deserialize(
          {
            data: encoder.encode(JSON.stringify(testData)),
            contentType: createContentType(id),
          },
          validateWithAjvOption,
        ),
        {
          message: /Json validation failed/,
          causeMessage: /must be object/,
        },
      );
    });
  });
});
