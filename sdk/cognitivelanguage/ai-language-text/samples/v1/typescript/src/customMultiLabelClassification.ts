// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample program demonstrates how to classify documents using custom
 * multi-label models built using Azure Language Studio.
 *
 * @summary multi-label classification of pieces of text
 */

import type { AnalyzeBatchAction } from "@azure/ai-language-text";
import { TextAnalysisClient } from "@azure/ai-language-text";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import "dotenv/config";

// You will need to set these environment variables or edit the following values
const endpoint = process.env["LANGUAGE_ENDPOINT"] || "<cognitive language service endpoint>";
const deploymentName = process.env["MULTI_LABEL_CLASSIFY_DEPLOYMENT_NAME"] || "deployment name";
const projectName = process.env["MULTI_LABEL_CLASSIFY_PROJECT_NAME"] || "deployment name";

const documents = [
  "The plot begins with a large group of characters where everyone thinks that the two main ones should be together but foolish things keep them apart. Misunderstandings, miscommunication, and confusion cause a series of humorous situations.",
];

export async function main(): Promise<void> {
  console.log("== Custom Entity Recognition Sample ==");

  const client = new TextAnalysisClient(endpoint, new DefaultAzureCredential());
  const actions: AnalyzeBatchAction[] = [
    {
      kind: "CustomMultiLabelClassification",
      deploymentName,
      projectName,
    },
  ];
  const poller = await client.beginAnalyzeBatch(actions, documents, "en");
  const results = await poller.pollUntilDone();

  for await (const actionResult of results) {
    if (actionResult.kind !== "CustomMultiLabelClassification") {
      throw new Error(
        `Expected a CustomMultiLabelClassification results but got: ${actionResult.kind}`,
      );
    }
    if (actionResult.error) {
      const { code, message } = actionResult.error;
      throw new Error(`Unexpected error (${code}): ${message}`);
    }
    for (const result of actionResult.results) {
      console.log(`- Document ${result.id}`);
      if (result.error) {
        const { code, message } = result.error;
        throw new Error(`Unexpected error (${code}): ${message}`);
      }
      console.log(`\tClassification:`);
      for (const classification of result.classifications) {
        console.log(`\t\t-category: ${classification.category}`);
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
