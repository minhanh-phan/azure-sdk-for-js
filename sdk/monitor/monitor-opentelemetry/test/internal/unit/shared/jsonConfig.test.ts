// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert";
import path from "node:path";
import { JsonConfig } from "../../../../src/shared/jsonConfig.js";
import { afterAll, afterEach, beforeEach, describe, it, vi } from "vitest";

describe("Json Config", () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = process.env;
    (JsonConfig["_instance"] as any) = undefined;
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  afterAll(() => {
    (JsonConfig["_instance"] as any) = undefined;
  });

  describe("config path", () => {
    it("Default file path", () => {
      const config = JsonConfig.getInstance();
      const defaultPath = path.join(process.cwd(), "../", "applicationinsights.json");
      assert.deepStrictEqual(config["_tempDir"], defaultPath);
    });

    it("Absolute file path", () => {
      const env = <{ [id: string]: string }>{};
      const customConfigJSONPath = path.resolve(__dirname, "config.json");
      env["APPLICATIONINSIGHTS_CONFIGURATION_FILE"] = customConfigJSONPath;
      process.env = env;
      const config = JsonConfig.getInstance();
      assert.deepStrictEqual(
        config.azureMonitorExporterOptions?.connectionString,
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;IngestionEndpoint=https://centralus-0.in.applicationinsights.azure.com/",
      );
    });

    it("Relative file path", () => {
      const env = <{ [id: string]: string }>{};
      const customConfigJSONPath = "monitor-opentelemetry/test/internal/unit/shared/config.json";
      env["APPLICATIONINSIGHTS_CONFIGURATION_FILE"] = customConfigJSONPath;
      process.env = env;
      const config = JsonConfig.getInstance();
      assert.deepStrictEqual(
        config.azureMonitorExporterOptions?.connectionString,
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;IngestionEndpoint=https://centralus-0.in.applicationinsights.azure.com/",
      );
    });
  });

  describe("configuration values", () => {
    it("Should take configurations from JSON config file", () => {
      const env = <{ [id: string]: string }>{};
      const customConfigJSONPath = path.resolve(__dirname, "config.json");
      env["APPLICATIONINSIGHTS_CONFIGURATION_FILE"] = customConfigJSONPath;
      process.env = env;
      const config = JsonConfig.getInstance();
      assert.deepStrictEqual(
        config.azureMonitorExporterOptions?.connectionString,
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;IngestionEndpoint=https://centralus-0.in.applicationinsights.azure.com/",
      );
      assert.deepStrictEqual(config.azureMonitorExporterOptions?.disableOfflineStorage, true);
      assert.deepStrictEqual(config.azureMonitorExporterOptions?.storageDirectory, "testPath");
      assert.deepStrictEqual(config.samplingRatio, 0.3, "Wrong samplingRatio");
      assert.deepStrictEqual(config.tracesPerSecond, 0.2, "Wrong tracesPerSecond");
      assert.deepStrictEqual(
        config.instrumentationOptions?.azureSdk?.enabled,
        true,
        "Wrong azureSdk",
      );
      assert.deepStrictEqual(
        config.instrumentationOptions?.mongoDb?.enabled,
        true,
        "Wrong mongoDb",
      );
      assert.deepStrictEqual(config.instrumentationOptions?.mySql?.enabled, true, "Wrong mySql");
      assert.deepStrictEqual(
        config.instrumentationOptions?.postgreSql?.enabled,
        true,
        "Wrong postgreSql",
      );
      assert.deepStrictEqual(config.instrumentationOptions?.redis?.enabled, true, "Wrong redis");
      assert.deepStrictEqual(config.instrumentationOptions?.redis4?.enabled, true, "Wrong redis4");
    });

    it("Should take configurations from JSON config file over environment variables if both are configured", () => {
      const env = <{ [id: string]: string }>{};
      const customConfigJSONPath = path.resolve(__dirname, "config.json");
      env["APPLICATIONINSIGHTS_CONFIGURATION_FILE"] = customConfigJSONPath;
      env["APPLICATIONINSIGHTS_CONNECTION_STRING"] = "TestConnectionString";
      process.env = env;
      const config = JsonConfig.getInstance();
      assert.deepStrictEqual(
        config.azureMonitorExporterOptions?.connectionString,
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;IngestionEndpoint=https://centralus-0.in.applicationinsights.azure.com/",
      );
    });

    it("JSON config through env variable", () => {
      const env = <{ [id: string]: string }>{};

      const inputJson = {
        azureMonitorExporterOptions: {
          connectionString: "testConnString",
          storageDirectory: "teststorageDirectory",
          disableOfflineStorage: true,
        },
        samplingRatio: 1,
        tracesPerSecond: 0.8,
        instrumentationOptions: {
          http: { enabled: true },
          azureSdk: { enabled: false },
          mongoDb: { enabled: false },
          mySql: { enabled: false },
          postgreSql: { enabled: false },
          redis: { enabled: false },
          redis4: { enabled: false },
        },
      };
      env["APPLICATIONINSIGHTS_CONFIGURATION_CONTENT"] = JSON.stringify(inputJson);
      process.env = env;
      const config = JsonConfig.getInstance();

      assert.strictEqual(config.samplingRatio, 1);
      assert.strictEqual(config.tracesPerSecond, 0.8);
      assert.strictEqual(config.instrumentationOptions?.http?.enabled, true);
      assert.strictEqual(config.instrumentationOptions?.azureSdk?.enabled, false);
      assert.strictEqual(config.instrumentationOptions?.mongoDb?.enabled, false);
      assert.strictEqual(config.instrumentationOptions?.mySql?.enabled, false);
      assert.strictEqual(config.instrumentationOptions?.postgreSql?.enabled, false);
      assert.strictEqual(config.instrumentationOptions?.redis?.enabled, false);
      assert.strictEqual(config.instrumentationOptions?.redis4?.enabled, false);
      assert.strictEqual(config.azureMonitorExporterOptions?.connectionString, "testConnString");
      assert.strictEqual(
        config.azureMonitorExporterOptions?.storageDirectory,
        "teststorageDirectory",
      );
      assert.strictEqual(config.azureMonitorExporterOptions?.disableOfflineStorage, true);
    });
  });
});
