// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig } from "vitest/config";
import browserMap from "@azure-tools/vite-plugin-browser-test-map";
import { AzureSDKReporter } from "./vitest.shared.config.js";

export default defineConfig({
  define: {
    "process.env": process.env,
  },
  test: {
    typecheck: {
      enabled: true,
    },
    testTimeout: 18000,
    reporters: [new AzureSDKReporter(), "junit"],
    outputFile: {
      junit: "test-results.browser.xml",
    },
    browser: {
      instances: [
        {
          browser: "chromium",
          launch: {
            args: ["--disable-web-security"],
          },
        },
      ],
      enabled: true,
      headless: true,
      provider: "playwright",
    },
    fakeTimers: {
      toFake: ["setTimeout", "Date"],
    },
    watch: false,
    coverage: {
      include: ["dist-test/browser/**/*.js"],
      exclude: [
        "dist-test/browser/**/*./*-browser.mjs",
        "dist-test/browser/**/*./*-react-native.mjs",
      ],
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage-browser",
    },
  },
});
