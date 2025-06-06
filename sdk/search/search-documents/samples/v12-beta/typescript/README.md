---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-cognitive-search
  - azure-search
urlFragment: search-documents-typescript-beta
---

# Azure Search Documents client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure Search Documents in some common scenarios.

| **File Name**                                                       | **Description**                                                                                         |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [bufferedSenderAutoFlushSize.ts][bufferedsenderautoflushsize]       | Demonstrates the SearchIndexingBufferedSender with Autoflush based on size.                             |
| [bufferedSenderAutoFlushTimer.ts][bufferedsenderautoflushtimer]     | Demonstrates the SearchIndexingBufferedSender with Autoflush based on timer.                            |
| [bufferedSenderManualFlush.ts][bufferedsendermanualflush]           | Demonstrates the SearchIndexingBufferedSender with Manual Flush.                                        |
| [dataSourceConnectionOperations.ts][datasourceconnectionoperations] | Demonstrates the DataSource Connection Operations.                                                      |
| [indexOperations.ts][indexoperations]                               | Demonstrates the Index Operations.                                                                      |
| [indexerOperations.ts][indexeroperations]                           | Demonstrates the Indexer Operations.                                                                    |
| [searchClientOperations.ts][searchclientoperations]                 | Demonstrates the SearchClient.                                                                          |
| [skillSetOperations.ts][skillsetoperations]                         | Demonstrates the Skillset Operations.                                                                   |
| [stickySession.ts][stickysession]                                   | Demonstrates user sticky sessions, a way to reduce inconsistent behavior by targeting a single replica. |
| [synonymMapOperations.ts][synonymmapoperations]                     | Demonstrates the SynonymMap Operations.                                                                 |
| [vectorSearch.ts][vectorsearch]                                     | Demonstrates vector search                                                                              |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Search Documents instance][createinstance_azuresearchdocumentsinstance]

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/bufferedSenderAutoFlushSize.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env ENDPOINT="<endpoint>" node dist/bufferedSenderAutoFlushSize.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[bufferedsenderautoflushsize]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v12-beta/typescript/src/bufferedSenderAutoFlushSize.ts
[bufferedsenderautoflushtimer]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v12-beta/typescript/src/bufferedSenderAutoFlushTimer.ts
[bufferedsendermanualflush]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v12-beta/typescript/src/bufferedSenderManualFlush.ts
[datasourceconnectionoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v12-beta/typescript/src/dataSourceConnectionOperations.ts
[indexoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v12-beta/typescript/src/indexOperations.ts
[indexeroperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v12-beta/typescript/src/indexerOperations.ts
[searchclientoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v12-beta/typescript/src/searchClientOperations.ts
[skillsetoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v12-beta/typescript/src/skillSetOperations.ts
[stickysession]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v12-beta/typescript/src/stickySession.ts
[synonymmapoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v12-beta/typescript/src/synonymMapOperations.ts
[vectorsearch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v12-beta/typescript/src/vectorSearch.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/search-documents?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[createinstance_azuresearchdocumentsinstance]: https://learn.microsoft.com/azure/search/search-create-service-portal
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/search/search-documents/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
