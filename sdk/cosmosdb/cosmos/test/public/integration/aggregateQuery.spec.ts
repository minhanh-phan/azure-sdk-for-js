// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Container, ContainerDefinition } from "../../../src/index.js";
import { IndexingMode } from "../../../src/index.js";
import { DataType, IndexKind } from "../../../src/index.js";
import type { QueryIterator } from "../../../src/index.js";
import type { SqlQuerySpec } from "../../../src/index.js";
import type { FeedOptions } from "../../../src/index.js";
import { TestData } from "../common/TestData.js";
import { bulkInsertItems, getTestContainer, removeAllDatabases } from "../common/TestHelpers.js";
import { describe, it, assert, beforeAll } from "vitest";

describe("Aggregate Query", { timeout: 20000 }, () => {
  const partitionKey = "key";
  const uniquePartitionKey = "uniquePartitionKey";
  const testdata = new TestData(partitionKey, uniquePartitionKey);
  const average = testdata.sum / testdata.numberOfDocumentsWithNumbericId;
  const documentDefinitions = testdata.docs;
  const samePartitionSum =
    (testdata.numberOfDocsWithSamePartitionKey * (testdata.numberOfDocsWithSamePartitionKey + 1)) /
    2.0;
  let container: Container;

  const containerDefinition: ContainerDefinition = {
    id: "sample container",
    indexingPolicy: {
      includedPaths: [
        {
          path: "/",
          indexes: [
            {
              kind: IndexKind.Range,
              dataType: DataType.String,
            },
            {
              kind: IndexKind.Range,
              dataType: DataType.Number,
            },
          ],
        },
      ],
    },
    partitionKey: {
      paths: ["/" + partitionKey],
    },
  };

  const containerOptions = { offerThroughput: 10100 };

  beforeAll(async () => {
    await removeAllDatabases();
    container = await getTestContainer(
      "Validate Aggregate Document Query",
      undefined,
      containerDefinition,
      containerOptions,
    );
    await bulkInsertItems(container, documentDefinitions);
  });

  const validateFetchAll = async function (
    queryIterator: QueryIterator<any>,
    expectedResults: any,
  ): Promise<number> {
    const { resources: results, requestCharge } = await queryIterator.fetchAll();
    assert(requestCharge > 0, "request charge was not greater than zero");
    assert.equal(results.length, expectedResults.length, "invalid number of results");
    assert.equal(queryIterator.hasMoreResults(), false, "hasMoreResults: no more results is left");
    return requestCharge;
  };

  const validateExecuteNextAndHasMoreResults = async function (
    queryIterator: QueryIterator<any>,
    options: any,
    expectedResults: any[],
    fetchAllRequestCharge: number,
  ): Promise<void> {
    const pageSize = options["maxItemCount"];

    let totalFetchedResults: any[] = [];
    let totalExecuteNextRequestCharge = 0;

    while (totalFetchedResults.length <= expectedResults.length) {
      const { resources: results, requestCharge } = await queryIterator.fetchNext();

      if (results && results.length > 0) {
        totalFetchedResults = totalFetchedResults.concat(results);
      }
      totalExecuteNextRequestCharge += requestCharge;

      if (
        !queryIterator.hasMoreResults() ||
        totalFetchedResults.length === expectedResults.length
      ) {
        break;
      }

      if (totalFetchedResults.length < expectedResults.length) {
        // there are more results
        if (results) {
          assert(results.length <= pageSize, "executeNext: invalid fetch block size");
        }
        assert(queryIterator.hasMoreResults(), "hasMoreResults expects to return true");
      } else {
        // no more results
        assert.equal(
          expectedResults.length,
          totalFetchedResults.length,
          "executeNext: didn't fetch all the results",
        );
        assert(
          results.length <= pageSize,
          "executeNext: actual fetch size is more than the requested page size",
        );
      }
    }

    // no more results
    assert.deepStrictEqual(totalFetchedResults, expectedResults);
    assert.equal(queryIterator.hasMoreResults(), false, "hasMoreResults: no more results is left");

    assert(totalExecuteNextRequestCharge > 0);
    const percentDifference =
      Math.abs(fetchAllRequestCharge - totalExecuteNextRequestCharge) /
      totalExecuteNextRequestCharge;
    assert(
      percentDifference <= 0.01,
      "difference between fetchAll request charge and executeNext request charge should be less than 1%",
    );
  };

  const validateExecuteNextAndHasMoreResultsWithEnableQueryControl = async function (
    queryIterator: QueryIterator<any>,
    options: any,
    expectedResults: any[],
  ): Promise<void> {
    const pageSize = options["maxItemCount"];
    let totalFetchedResults: any[] = [];
    let totalExecuteNextRequestCharge = 0;

    while (totalFetchedResults.length <= expectedResults.length) {
      const { resources: results, requestCharge } = await queryIterator.fetchNext();

      if (results && results.length > 0) {
        totalFetchedResults = totalFetchedResults.concat(results);
      }
      totalExecuteNextRequestCharge += requestCharge;

      if (
        !queryIterator.hasMoreResults() ||
        totalFetchedResults.length === expectedResults.length
      ) {
        break;
      }

      if (totalFetchedResults.length < expectedResults.length) {
        // there are more results
        assert(queryIterator.hasMoreResults(), "hasMoreResults expects to return true");
      } else {
        // no more results
        assert.equal(
          expectedResults.length,
          totalFetchedResults.length,
          "executeNext: didn't fetch all the results",
        );
        assert(
          results.length <= pageSize,
          "executeNext: actual fetch size is more than the requested page size",
        );
      }
    }
    // no more results
    assert.deepStrictEqual(totalFetchedResults, expectedResults);
    assert.equal(queryIterator.hasMoreResults(), false, "hasMoreResults: no more results is left");
  };

  const ValidateAsyncIterator = async function (
    queryIterator: QueryIterator<any>,
    expectedResults: any[],
  ): Promise<void> {
    const results: any[] = [];
    let completed = false;
    // forEach uses callbacks still, so just wrap in a promise
    for await (const { resources: items } of queryIterator.getAsyncIterator()) {
      // if the previous invocation returned false, forEach must avoid invoking the callback again!
      assert.equal(completed, false, "forEach called callback after the first false returned");
      results.push(...items);
      if (results.length === expectedResults.length) {
        completed = true;
      }
    }
    assert.equal(completed, true, "AsyncIterator should fetch expected number of results");
    assert.deepStrictEqual(results, expectedResults);
  };

  const executeQueryAndValidateResults = async function (
    query: string | SqlQuerySpec,
    expectedResults: any[],
  ): Promise<void> {
    const options: FeedOptions = {
      maxDegreeOfParallelism: 2,
      maxItemCount: 1,
    };

    const queryIterator = container.items.query(query, options);
    const fetchAllRequestCharge = await validateFetchAll(queryIterator, expectedResults);
    queryIterator.reset();
    await validateExecuteNextAndHasMoreResults(
      queryIterator,
      options,
      expectedResults,
      fetchAllRequestCharge,
    );
    queryIterator.reset();
    await ValidateAsyncIterator(queryIterator, expectedResults);

    // Adding these to test the new flag enableQueryControl in FeedOptions
    options.enableQueryControl = true;
    const queryIteratorWithEnableQueryControl = container.items.query(query, options);
    await validateFetchAll(queryIteratorWithEnableQueryControl, expectedResults);

    queryIteratorWithEnableQueryControl.reset();
    await validateExecuteNextAndHasMoreResultsWithEnableQueryControl(
      queryIteratorWithEnableQueryControl,
      options,
      expectedResults,
    );
  };

  it("SELECT VALUE AVG", async () => {
    await executeQueryAndValidateResults("SELECT VALUE AVG(r.key) FROM r WHERE IS_NUMBER(r.key)", [
      average,
    ]);
  });

  it("SELECT VALUE AVG with ORDER BY", async () => {
    await executeQueryAndValidateResults(
      "SELECT VALUE AVG(r.key) FROM r WHERE IS_NUMBER(r.key) ORDER BY r.key, r.field",
      [average],
    );
  });

  it("SELECT VALUE COUNT", async () => {
    await executeQueryAndValidateResults("SELECT VALUE COUNT(r.key) FROM r", [
      testdata.numberOfDocuments,
    ]);
  });

  it("SELECT VALUE COUNT with ORDER BY", async () => {
    await executeQueryAndValidateResults("SELECT VALUE COUNT(r.key) FROM r ORDER BY r.key", [
      testdata.numberOfDocuments,
    ]);
  });

  it("SELECT VALUE MAX", async () => {
    await executeQueryAndValidateResults("SELECT VALUE MAX(r.key) FROM r", ["xyz"]);
  });

  it("SELECT VALUE MAX with ORDER BY", async () => {
    await executeQueryAndValidateResults("SELECT VALUE MAX(r.key) FROM r ORDER BY r.key", ["xyz"]);
  });

  it("SELECT VALUE MIN", async () => {
    await executeQueryAndValidateResults("SELECT VALUE MIN(r.key) FROM r", [null]);
  });

  it("SELECT VALUE MIN with ORDER BY", async () => {
    await executeQueryAndValidateResults("SELECT VALUE MIN(r.key) FROM r ORDER BY r.key", [null]);
  });

  it("SELECT VALUE SUM", async () => {
    await executeQueryAndValidateResults("SELECT VALUE SUM(r.key) FROM r WHERE IS_NUMBER(r.key)", [
      testdata.sum,
    ]);
  });

  it("SELECT VALUE SUM with ORDER BY", async () => {
    await executeQueryAndValidateResults(
      "SELECT VALUE SUM(r.key) FROM r WHERE IS_NUMBER(r.key) ORDER BY r.key",
      [testdata.sum],
    );
  });

  it("SELECT VALUE AVG for single partiton", async () => {
    await executeQueryAndValidateResults(
      "SELECT VALUE AVG(r.field) FROM r WHERE r.key = 'uniquePartitionKey'",
      [samePartitionSum / testdata.numberOfDocsWithSamePartitionKey],
    );
  });

  it("SELECT VALUE COUNT for single partiton", async () => {
    await executeQueryAndValidateResults(
      "SELECT VALUE COUNT(r.field) FROM r WHERE r.key = 'uniquePartitionKey'",
      [testdata.numberOfDocsWithSamePartitionKey],
    );
  });

  it("SELECT VALUE MAX for single partiton", async () => {
    await executeQueryAndValidateResults(
      "SELECT VALUE MAX(r.field) FROM r WHERE r.key = 'uniquePartitionKey'",
      [testdata.numberOfDocsWithSamePartitionKey],
    );
  });

  it("SELECT VALUE MIN for single partiton", async () => {
    await executeQueryAndValidateResults(
      "SELECT VALUE MIN(r.field) FROM r WHERE r.key = 'uniquePartitionKey'",
      [1],
    );
  });

  it("SELECT VALUE SUM for single partiton", async () => {
    await executeQueryAndValidateResults(
      "SELECT VALUE SUM(r.field) FROM r WHERE r.key = 'uniquePartitionKey'",
      [samePartitionSum],
    );
  });

  it("Non VALUE aggregate", async () => {
    await executeQueryAndValidateResults("SELECT AVG(r.key) FROM r WHERE IS_NUMBER(r.key)", [
      { $1: average },
    ]);
  });

  it("Multiple Aggregates", async () => {
    await executeQueryAndValidateResults("SELECT COUNT(1), MAX(r.key) FROM r", [
      { $1: testdata.numberOfDocuments, $2: "xyz" },
    ]);
  });

  it("should not error for MAX queries on with empty results", async () => {
    const queryIterator = container.items.query("SELECT VALUE MAX(r.missing) from r", {
      maxItemCount: 2,
    });
    const response = await queryIterator.fetchAll();
    assert(response.resources.length === 0);
  });

  it("should not error for MIN queries on with empty filter", async () => {
    const queryIterator = container.items.query("SELECT VALUE MIN(r.key) from r WHERE false", {
      maxItemCount: 2,
    });
    const response = await queryIterator.fetchAll();
    assert(response.resources.length === 0);
  });

  it("should execute ORDER BY query with order on multiple fields when composite Index defined", async () => {
    const containerDefinitionWithCompositeIndex: ContainerDefinition = {
      id: "containerWithCompositeIndexingPolicy",
      indexingPolicy: {
        automatic: true,
        indexingMode: IndexingMode.consistent,
        includedPaths: [
          {
            path: "/*",
          },
        ],
        excludedPaths: [
          {
            path: '/"systemMetadata"/*',
          },
        ],
        compositeIndexes: [
          [
            { path: "/key", order: "ascending" },
            { path: "/field", order: "ascending" },
          ],
        ],
      },
    };

    const containerWithCompositeIndexDef = await getTestContainer(
      "Validate multiple fields order by query",
      undefined,
      containerDefinitionWithCompositeIndex,
    );

    await containerWithCompositeIndexDef.items.create({ id: "1", pk: "1", key: "1", field: "4" });
    await containerWithCompositeIndexDef.items.create({ id: "2", pk: "1", key: "2", field: "3" });
    await containerWithCompositeIndexDef.items.create({ id: "3", pk: "1", key: "3", field: "2" });
    await containerWithCompositeIndexDef.items.create({ id: "4", pk: "1", key: "4", field: "1" });
    const queryIterator1 = containerWithCompositeIndexDef.items.query(
      "SELECT * FROM r ORDER BY r.key, r.field",
    );
    const response = await queryIterator1.fetchAll();
    assert(response.resources.length === 4);
    try {
      const queryIterator2 = containerWithCompositeIndexDef.items.query(
        "SELECT * FROM r ORDER BY r.key DESC, r.field ASC",
      );
      await queryIterator2.fetchAll();
      // If the fetch succeeds unexpectedly, fail the test
      assert.fail("Expected composite index not found error, but the fetch succeeded");
    } catch (error) {
      const stringifiedError = JSON.stringify(error);
      if (
        error instanceof Error &&
        stringifiedError.includes("does not have a corresponding composite index")
      ) {
        // If the fetch fails as expected, pass the test
      } else {
        assert.fail(`Unexpected error: ${error.message}`);
      }
    }
  });
});
