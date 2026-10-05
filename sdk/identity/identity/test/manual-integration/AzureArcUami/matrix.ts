// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// cspell:words SAMI UAMI appid

import { DefaultAzureCredential, ManagedIdentityCredential } from "@azure/identity";

const tokenScope = "https://management.azure.com/.default";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name} environment variable.`);
  }
  return value;
}

function decodeClaims(token: string): { oid?: string; appid?: string; azp?: string } {
  const payload = token.split(".")[1];
  if (!payload) {
    throw new Error("The access token is not a JWT.");
  }

  return JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
    oid?: string;
    appid?: string;
    azp?: string;
  };
}

async function assertIdentity(
  label: string,
  credential: ManagedIdentityCredential | DefaultAzureCredential,
  expectedObjectId: string,
  expectedClientId: string,
): Promise<void> {
  const token = await credential.getToken(tokenScope, {
    abortSignal: AbortSignal.timeout(60_000),
  });
  if (!token?.token) {
    throw new Error(`${label} returned an empty token.`);
  }

  const claims = decodeClaims(token.token);
  const actualClientId = claims.appid ?? claims.azp;
  if (claims.oid !== expectedObjectId) {
    throw new Error(`${label} returned a token for an unexpected object ID.`);
  }
  if (actualClientId !== expectedClientId) {
    throw new Error(`${label} returned a token for an unexpected client ID.`);
  }

  console.log(`Passed: ${label}; oid and client ID claims match`);
}

async function main(): Promise<void> {
  const mode = getRequiredEnv("IDENTITY_ARC_MODE");
  const samiObjectId = getRequiredEnv("IDENTITY_ARC_SAMI_OBJECT_ID");
  const samiClientId = getRequiredEnv("IDENTITY_ARC_SAMI_CLIENT_ID");

  process.env.AZURE_TOKEN_CREDENTIALS = "ManagedIdentityCredential";

  await assertIdentity(
    `${mode} ManagedIdentityCredential SAMI`,
    new ManagedIdentityCredential(),
    samiObjectId,
    samiClientId,
  );
  await assertIdentity(
    `${mode} DefaultAzureCredential SAMI`,
    new DefaultAzureCredential(),
    samiObjectId,
    samiClientId,
  );

  if (mode === "SAMI+UAMI") {
    const uamiObjectId = getRequiredEnv("IDENTITY_ARC_UAMI_OBJECT_ID");
    const uamiClientId = getRequiredEnv("IDENTITY_ARC_UAMI_CLIENT_ID");
    const uamiResourceId = getRequiredEnv("IDENTITY_ARC_UAMI_RESOURCE_ID");

    await assertIdentity(
      `${mode} ManagedIdentityCredential UAMI clientId`,
      new ManagedIdentityCredential({ clientId: uamiClientId }),
      uamiObjectId,
      uamiClientId,
    );
    await assertIdentity(
      `${mode} ManagedIdentityCredential UAMI resourceId`,
      new ManagedIdentityCredential({ resourceId: uamiResourceId }),
      uamiObjectId,
      uamiClientId,
    );
    await assertIdentity(
      `${mode} ManagedIdentityCredential UAMI objectId`,
      new ManagedIdentityCredential({ objectId: uamiObjectId }),
      uamiObjectId,
      uamiClientId,
    );
    await assertIdentity(
      `${mode} DefaultAzureCredential UAMI clientId`,
      new DefaultAzureCredential({ managedIdentityClientId: uamiClientId }),
      uamiObjectId,
      uamiClientId,
    );
    await assertIdentity(
      `${mode} DefaultAzureCredential UAMI resourceId`,
      new DefaultAzureCredential({ managedIdentityResourceId: uamiResourceId }),
      uamiObjectId,
      uamiClientId,
    );
  }

  console.log(`Passed: ${mode} matrix`);
}

await main();
