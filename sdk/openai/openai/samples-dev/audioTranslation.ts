// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to translate the content of an audio file.
 *
 * @summary audio translation.
 * @azsdk-weight 100
 */

import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { createReadStream } from "node:fs";

// Set AZURE_OPENAI_ENDPOINT to the endpoint of your
// OpenAI resource. You can find this in the Azure portal.
// Load the .env file if it exists
import "dotenv/config";

// You will need to set these environment variables or edit the following values
const audioFilePath = process.env["AUDIO_FILE_PATH"] || "<audio file path>";

export async function main(): Promise<void> {
  console.log("== Translate Audio Sample ==");

  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const deployment = "whisper-deployment";
  const apiVersion = "2025-04-01-preview";
  const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });
  const result = await client.audio.translations.create({
    model: "",
    file: createReadStream(audioFilePath),
  });

  console.log(`Translation: ${result.text}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
