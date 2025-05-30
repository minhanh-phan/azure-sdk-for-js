﻿// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientContext } from "../../../src/ClientContext.js";
import {
  PartitionKeyRangeCache,
  QueryRange,
  SmartRoutingMapProvider,
} from "../../../src/routing/index.js";
import { MockedClientContext } from "../../public/common/MockClientContext.js";
import { createDummyDiagnosticNode } from "../../public/common/TestHelpers.js";
import { describe, it, assert } from "vitest";

describe("Smart Routing Map Provider OverlappingRanges", () => {
  const containerLink = "dbs/7JZZAA==/colls/7JZZAOS-JQA=/";

  const partitionKeyRanges = [
    { id: "0", minInclusive: "", maxExclusive: "05C1C9CD673398" },
    {
      id: "1",
      minInclusive: "05C1C9CD673398",
      maxExclusive: "05C1D9CD673398",
    },
    {
      id: "2",
      minInclusive: "05C1D9CD673398",
      maxExclusive: "05C1E399CD6732",
    },
    {
      id: "3",
      minInclusive: "05C1E399CD6732",
      maxExclusive: "05C1E9CD673398",
    },
    { id: "4", minInclusive: "05C1E9CD673398", maxExclusive: "FF" },
  ];

  const mockedClientContext: ClientContext = new MockedClientContext(partitionKeyRanges) as any;
  const smartRoutingMapProvider = new SmartRoutingMapProvider(mockedClientContext);
  const partitionKeyRangeCache = new PartitionKeyRangeCache(mockedClientContext);

  // Validates the results
  // smartRoutingMapProvider.getOverlappingRanges()
  // partitionKeyRangeCache.getOverlappingRanges() is equal
  const assertBothProvidersResultsEqual = async (queryRanges: any): Promise<void> => {
    let results1: any;
    let results2: any;
    let err1: any;
    let err2: any;
    results1 = results2 = null;
    err1 = err2 = null;
    try {
      results1 = await smartRoutingMapProvider.getOverlappingRanges(
        containerLink,
        queryRanges,
        createDummyDiagnosticNode(),
      );
    } catch (err: any) {
      err1 = err;
    }
    try {
      results2 = await partitionKeyRangeCache.getOverlappingRanges(
        containerLink,
        queryRanges,
        createDummyDiagnosticNode(),
      );
    } catch (err: any) {
      err2 = err;
    }
    assert.equal(err1, err2);
    assert.deepEqual(results1, results2);
  };

  // Validates the results
  // provider.getOverlappingRanges() is as expected
  const validateProviderOverlappingRanges = async function (
    provider: SmartRoutingMapProvider,
    queryRanges: any,
    expectedResults: any,
    errorExpected?: any,
  ): Promise<void> {
    const fixedErrorExpected = errorExpected || false;
    try {
      const results = await provider.getOverlappingRanges(
        containerLink,
        queryRanges,
        createDummyDiagnosticNode(),
      );
      assert.deepEqual(results, expectedResults);
    } catch (err: any) {
      if (fixedErrorExpected) {
        assert.notEqual(err, undefined);
        return;
      } else {
        throw err;
      }
    }
  };

  // validates that the results of
  // smartRoutingMapProvider.getOverlappingRanges() is as expected
  const validateSmartOverlappingRanges = async function (
    queryRanges: any,
    expectedResults: any,
    errorExpected: any,
  ): Promise<void> {
    await validateProviderOverlappingRanges(
      smartRoutingMapProvider,
      queryRanges,
      expectedResults,
      errorExpected,
    );
  };

  // validates that the results of
  // partitionKeyRangeCache.getOverlappingRanges() is as expected
  const validatePartitionKeyRangeCacheOverlappingRanges = async function (
    queryRanges: any,
    expectedResults: any,
    errorExpected: any,
  ): Promise<void> {
    await validateProviderOverlappingRanges(
      partitionKeyRangeCache as any,
      queryRanges,
      expectedResults,
      errorExpected,
    );
  };

  // Validates the results
  // smartRoutingMapProvider.getOverlappingRanges()
  // partitionKeyRangeCache.getOverlappingRanges() is as expected
  const validateOverlappingRanges = async function (
    queryRanges: any,
    expectedResults: any,
    errorExpected?: any,
  ): Promise<void> {
    const fixedErrorExpected = errorExpected || false;
    await validateSmartOverlappingRanges(queryRanges, expectedResults, errorExpected);
    await validatePartitionKeyRangeCacheOverlappingRanges(
      queryRanges,
      expectedResults,
      fixedErrorExpected,
    );
  };

  // Validates the results
  // provider.getOverlappingRanges() is the same on both queryRanges1, queryRanges2
  const assertProviderOverlappingRangesAreEqual = async function (
    provider: SmartRoutingMapProvider,
    queryRanges1: any,
    queryRanges2: any,
  ): Promise<void> {
    let results1: any;
    let results2: any;
    let err1: any;
    let err2: any;
    try {
      results1 = await provider.getOverlappingRanges(
        containerLink,
        queryRanges1,
        createDummyDiagnosticNode(),
      );
    } catch (err: any) {
      err1 = err;
    }
    try {
      results2 = await provider.getOverlappingRanges(
        containerLink,
        queryRanges2,
        createDummyDiagnosticNode(),
      );
    } catch (err: any) {
      err2 = err;
    }
    assert.equal(err1, err2);
    assert.deepEqual(results1, results2);
  };

  // Validates the results of both
  // smartRoutingMapProvider.getOverlappingRanges()
  // partitionKeyRangeCache.getOverlappingRanges() is the same for both queryRanges1, queryRanges2
  const assertOverlappingRangesAreEqual = async function (
    queryRanges1: any,
    queryRanges2: any,
  ): Promise<void> {
    await assertProviderOverlappingRangesAreEqual(
      smartRoutingMapProvider,
      queryRanges1,
      queryRanges2,
    );
    await assertProviderOverlappingRangesAreEqual(
      partitionKeyRangeCache as any,
      queryRanges1,
      queryRanges2,
    );
    await assertBothProvidersResultsEqual(queryRanges1);
  };

  describe("Test Full Range", () => {
    it('query ranges: ["", ""FF)', () => {
      // query range is the whole partition key range
      const pkRange = new QueryRange("", "FF", true, false);
      return validateOverlappingRanges([pkRange], partitionKeyRanges);
    });

    it('query ranges: ("", ""FF)', () => {
      // query range is the whole partition key range
      const pkRange = new QueryRange("", "FF", false, false);
      return validateOverlappingRanges([pkRange], partitionKeyRanges);
    });
  });

  describe("Test Empty Range", () => {
    it("empty query range list", async () => {
      // query range list is empty
      await validateOverlappingRanges([], []);
    });

    it('query ranges: ("", ""]', async () => {
      // validate the overlaping partition key ranges results for empty ranges is empty
      await validateOverlappingRanges([new QueryRange("", "", false, true)], []);
    });

    it('query ranges: ("", "")', async () => {
      // validate the overlaping partition key ranges results for empty ranges is empty
      await validateOverlappingRanges([new QueryRange("", "", false, false)], []);
    });

    it('query ranges: ["", "")', async () => {
      // validate the overlaping partition key ranges results for empty ranges is empty
      await validateOverlappingRanges([new QueryRange("", "", true, false)], []);
    });
  });

  describe("Error Handling: Bad Overlapping Query Range", () => {
    it("overlapping query ranges (in a point)", async () => {
      const r1 = new QueryRange("", "AA", true, true);
      const r2 = new QueryRange("AA", "FF", true, false);
      await validateSmartOverlappingRanges([r1, r2], undefined, true);
    });

    it("overlapping query ranges (in a range)", async () => {
      const r1 = new QueryRange("", "AB", true, false);
      const r2 = new QueryRange("AA", "FA", true, false);
      await validateSmartOverlappingRanges([r1, r2], undefined, true);
    });

    it("not sorted query ranges", async () => {
      const r1 = new QueryRange("AB", "AC", true, false);
      const r2 = new QueryRange("AA", "AB", true, false);
      await validateSmartOverlappingRanges([r1, r2], undefined, true);
    });
  });

  it("Empty Ranges are thrown away", async () => {
    const e1 = new QueryRange("", "", true, false);
    const r1 = new QueryRange("", "AB", true, false);
    const e2 = new QueryRange("AB", "AB", true, false);
    const r2 = new QueryRange("AB", "AC", true, false);
    const e3 = new QueryRange("AC", "AC", true, false);
    const e4 = new QueryRange("AD", "AD", true, false);
    await assertOverlappingRangesAreEqual([e1, r1, e2, r2, e3, e4], [r1, r2]);
  });

  it("Single Query Range", async () => {
    const r = new QueryRange("AB", "AC", true, false);
    await assertBothProvidersResultsEqual([r]);
  });

  it("Multiple Query Ranges", async () => {
    const ranges = [
      new QueryRange("0000000040", "0000000045", true, false),
      new QueryRange("0000000045", "0000000046", true, false),
      new QueryRange("0000000046", "0000000050", true, false),
    ];
    await assertBothProvidersResultsEqual(ranges);
  });

  it("Single Boundary Case Query Range", async () => {
    const ranges = [new QueryRange("05C1C9CD673398", "05C1D9CD673398", true, false)];
    await validateOverlappingRanges(ranges, partitionKeyRanges.slice(1, 2));
  });

  it("Two Adjacent Boundary Case Query Ranges", async () => {
    const ranges = [
      // partitionKeyRanges[1]
      new QueryRange("05C1C9CD673398", "05C1D9CD673398", true, false),
      // partitionKeyRanges[2]
      new QueryRange("05C1D9CD673398", "05C1D9CD673399", true, false),
    ];
    await validateOverlappingRanges(ranges, partitionKeyRanges.slice(1, 3));
  });

  it("Two Ranges in one partition key range", async () => {
    const ranges = [
      // two ranges fall in the same partition key range
      new QueryRange("05C1C9CD673400", "05C1C9CD673401", true, false),
      new QueryRange("05C1C9CD673402", "05C1C9CD673403", true, false),
    ];
    await validateOverlappingRanges(ranges, partitionKeyRanges.slice(1, 2));
  });

  it("Complex", async () => {
    const ranges = [
      // all are covered by partitionKeyRanges[1]
      new QueryRange("05C1C9CD673398", "05C1D9CD673391", true, false),
      new QueryRange("05C1D9CD673391", "05C1D9CD673392", true, false),
      new QueryRange("05C1D9CD673393", "05C1D9CD673395", true, false),
      new QueryRange("05C1D9CD673395", "05C1D9CD673395", true, false),
      // all are covered by partitionKeyRanges[4]]
      new QueryRange("05C1E9CD673398", "05C1E9CD673401", true, false),
      new QueryRange("05C1E9CD673402", "05C1E9CD673403", true, false),
      // empty range
      new QueryRange("FF", "FF", true, false),
    ];
    await validateOverlappingRanges(ranges, [partitionKeyRanges[1], partitionKeyRanges[4]]);
  });
});
