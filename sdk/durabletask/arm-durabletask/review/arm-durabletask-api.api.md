## API Report File for "@azure/arm-durabletask"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { Client } from '@azure-rest/core-client';
import { ClientOptions } from '@azure-rest/core-client';
import { TokenCredential } from '@azure/core-auth';

// @public (undocumented)
export function createDurableTask(credential: TokenCredential, subscriptionId: string, options?: DurableTaskClientOptionalParams): DurableTaskContext;

// @public
export interface DurableTaskClientOptionalParams extends ClientOptions {
    apiVersion?: string;
}

// @public (undocumented)
export interface DurableTaskContext extends Client {
    apiVersion: string;
    subscriptionId: string;
}

// (No @packageDocumentation comment for this package)

```
