// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from "node:fs";
import { AvroReadableFromStream, AvroReader } from "../../src/internal-avro/index.js";
import { Readable } from "node:stream";
import { arraysEqual } from "../../src/internal-avro/utils/utils.common.js";
import { describe, it, assert } from "vitest";

type Action = (o: Record<string, any> | null) => void;
class TestCase {
  public path: string;
  public predict: Action;
  constructor(path: string, action: Action) {
    this.path = path;
    this.predict = action;
  }
}

describe("AvroReader", () => {
  it("test with local avro files", async () => {
    const testCases: TestCase[] = [
      new TestCase("test_null_0.avro", (o) => assert.strictEqual(null, o)), // null
      new TestCase("test_null_1.avro", (o) => assert.strictEqual(true, o as any)), // boolean
      new TestCase("test_null_2.avro", (o) =>
        assert.strictEqual("adsfasdf09809dsf-=adsf", o as any),
      ), // string
      new TestCase("test_null_3.avro", (o) =>
        assert.ok(arraysEqual(new TextEncoder().encode("12345abcd"), o as Uint8Array)),
      ), // byte[]
      new TestCase("test_null_4.avro", (o) => assert.strictEqual(1234, o as any)), // int
      new TestCase("test_null_5.avro", (o) => assert.strictEqual(1234, o as any)), // long
      new TestCase("test_null_6.avro", (o) => assert.strictEqual(1234.0, o as any)), // float
      new TestCase("test_null_7.avro", (o) => assert.strictEqual(1234.0, o as any)), // double
      // Not supported today.
      // new TestCase("test_null_8.avro", o => assert.ok(arraysEqual(new TextEncoder().encode("B"), o as Uint8Array))), // fixed
      new TestCase("test_null_9.avro", (o) => assert.strictEqual("B", o as any)), // enum
      // Not supported today.
      // new TestCase("test_null_10.avro", o => assert.deepStrictEqual([1, 2, 3], o)), // array
      new TestCase("test_null_11.avro", (o) => assert.deepStrictEqual({ a: 1, b: 3, c: 2 }, o)), // map
      new TestCase("test_null_12.avro", (o) => assert.strictEqual(null, o)), // union
      new TestCase("test_null_13.avro", (o) => {
        const expected = { $schema: "Test", f: 5 };
        const expectedEntries = Object.entries(expected);
        const actualEntries = Object.entries(o!);
        const actualMap = new Map(actualEntries);
        assert.strictEqual(expectedEntries.length, actualEntries.length);
        for (const [key, value] of expectedEntries) {
          assert.deepStrictEqual(actualMap.get(key), value);
        }
      }), // record
    ];

    for (const testcase of testCases) {
      const rs = fs.createReadStream(`./test/resources/${testcase.path}`);
      const rfs = new AvroReadableFromStream(rs);

      const avroReader = new AvroReader(rfs);
      const iter = avroReader.parseObjects();
      for await (const o of iter) {
        testcase.predict(o);
      }
    }
  });

  it("aborter", async () => {
    const delayedReadable = new Readable({ read() {} });
    const rfs = new AvroReadableFromStream(delayedReadable);
    const avroReader = new AvroReader(rfs);

    const timeoutSignal = AbortSignal.timeout(1);

    const iter = avroReader.parseObjects({ abortSignal: timeoutSignal });
    let AbortErrorCaught = false;
    try {
      await iter.next();
    } catch (err: any) {
      if (err.name === "AbortError") {
        AbortErrorCaught = true;
      }
    }
    assert.ok(AbortErrorCaught);
  });
});
