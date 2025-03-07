// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RsaEncryptionAlgorithm } from "@azure/keyvault-keys";
import { randomBytes } from "node:crypto";
import { CryptographyTest } from "./cryptography.spec.js";

export class DecryptTest extends CryptographyTest {
  private cipherText?: Uint8Array;
  private algorithm: RsaEncryptionAlgorithm = "RSA-OAEP-256";

  async setup(): Promise<void> {
    const encryptResult = await CryptographyTest.cryptoClient!.encrypt({
      algorithm: this.algorithm,
      plaintext: randomBytes(32),
    });
    this.cipherText = encryptResult.result!;
  }

  async run(): Promise<void> {
    await CryptographyTest.cryptoClient!.decrypt({
      algorithm: this.algorithm,
      ciphertext: this.cipherText!,
    });
  }
}
