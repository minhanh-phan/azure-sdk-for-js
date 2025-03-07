// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfOptionDictionary } from "@azure-tools/test-perf";
import { ContainerRegistryTest, ContainerRegistryTestOptions } from "./client.spec.js";

export class RepositoryListTest extends ContainerRegistryTest<ContainerRegistryTestOptions> {
  public options: PerfOptionDictionary<ContainerRegistryTestOptions> = {};
  constructor() {
    super();
  }

  async run(): Promise<void> {
    const listIterator = this.client.listRepositoryNames();

    // eslint-disable-next-line no-empty
    for await (const _repositoryName of listIterator) {
    }
  }
}
