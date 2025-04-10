// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import type {
  GetChatCompletions200Response,
  GetChatCompletionsDefaultResponse,
  GetEmbeddings200Response,
  GetEmbeddingsDefaultResponse,
  GetImageEmbeddings200Response,
  GetImageEmbeddingsDefaultResponse,
  GetModelInfo200Response,
  GetModelInfoDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "POST /chat/completions": ["200"],
  "GET /info": ["200"],
  "POST /embeddings": ["200"],
  "POST /images/embeddings": ["200"],
};

export function isUnexpected(
  response: GetChatCompletions200Response | GetChatCompletionsDefaultResponse,
): response is GetChatCompletionsDefaultResponse;
export function isUnexpected(
  response: GetModelInfo200Response | GetModelInfoDefaultResponse,
): response is GetModelInfoDefaultResponse;
export function isUnexpected(
  response: GetEmbeddings200Response | GetEmbeddingsDefaultResponse,
): response is GetEmbeddingsDefaultResponse;
export function isUnexpected(
  response: GetImageEmbeddings200Response | GetImageEmbeddingsDefaultResponse,
): response is GetImageEmbeddingsDefaultResponse;
export function isUnexpected(
  response:
    | GetChatCompletions200Response
    | GetChatCompletionsDefaultResponse
    | GetModelInfo200Response
    | GetModelInfoDefaultResponse
    | GetEmbeddings200Response
    | GetEmbeddingsDefaultResponse
    | GetImageEmbeddings200Response
    | GetImageEmbeddingsDefaultResponse,
): response is
  | GetChatCompletionsDefaultResponse
  | GetModelInfoDefaultResponse
  | GetEmbeddingsDefaultResponse
  | GetImageEmbeddingsDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = getParametrizedPathSuccess(method, url.pathname);
  }

  return !pathDetails.includes(response.status);
}

function getParametrizedPathSuccess(method: string, path: string): string[] {
  const pathParts = path.split("/");
  let matchedLen = -1,
    matchedValue: string[] = [];
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // track if we have found a match to return the values found.
    let found = true;
    for (let i = candidateParts.length - 1, j = pathParts.length - 1; i >= 1 && j >= 1; i--, j--) {
      if (candidateParts[i]?.startsWith("{") && candidateParts[i]?.indexOf("}") !== -1) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(`${candidateParts[i]?.slice(start, end)}`).test(
          pathParts[j] || "",
        );

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
