// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { parseKeyVaultSecretIdentifier } from "../../src/identifier.js";
import { describe, it, assert } from "vitest";

describe("Key Vault Secrets Identifier", () => {
  it("It should work with a URI of a secret before it gets a version", async () => {
    const uri = "https://keyvault-name.vault.azure.net/secrets/secret-name/pending";
    const identifier = parseKeyVaultSecretIdentifier(uri);

    assert.deepEqual(identifier, {
      sourceId: "https://keyvault-name.vault.azure.net/secrets/secret-name/pending",
      vaultUrl: "https://keyvault-name.vault.azure.net",
      name: "secret-name",
      version: "pending",
    });
  });

  it("It should work with a URI of a secret with a specific version", async () => {
    const uri = "https://keyvault-name.vault.azure.net/secrets/secret-name/version";
    const identifier = parseKeyVaultSecretIdentifier(uri);

    assert.deepEqual(identifier, {
      sourceId: "https://keyvault-name.vault.azure.net/secrets/secret-name/version",
      vaultUrl: "https://keyvault-name.vault.azure.net",
      name: "secret-name",
      version: "version",
    });
  });

  it("It should work with a deleted secret recovery ID", async () => {
    const uri = "https://keyvault-name.vault.azure.net/deletedsecrets/deleted-secret";
    const identifier = parseKeyVaultSecretIdentifier(uri);

    assert.deepEqual(identifier, {
      sourceId: "https://keyvault-name.vault.azure.net/deletedsecrets/deleted-secret",
      vaultUrl: "https://keyvault-name.vault.azure.net",
      name: "deleted-secret",
      version: undefined,
    });
  });
});
