// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { ChangeFeed } from "./ChangeFeed.js";
import type { ChangeFeedCursor } from "./models/ChangeFeedCursor.js";
import { CHANGE_FEED_CONTAINER_NAME, CHANGE_FEED_META_SEGMENT_PATH } from "./utils/constants.js";
import {
  ceilToNearestHour,
  floorToNearestHour,
  getYearsPaths,
  getSegmentsInYear,
  minDate,
  getHost,
  parseDateFromSegmentPath,
} from "./utils/utils.common.js";
import { bodyToString } from "./utils/utils.node.js";
import { SegmentFactory } from "./SegmentFactory.js";
import { ShardFactory } from "./ShardFactory.js";
import { ChunkFactory } from "./ChunkFactory.js";
import { AvroReaderFactory } from "./AvroReaderFactory.js";
import type { Segment } from "./Segment.js";
import type { BlobChangeFeedListChangesOptions } from "./models/models.js";
import { tracingClient } from "./utils/tracing.js";
import { LazyLoadingBlobStreamFactory } from "./LazyLoadingBlobStreamFactory.js";

interface MetaSegments {
  version?: number;
  lastConsumable: string;
}

function isSegmentFactory(
  segmentFactoryOrMaxTransferSize: SegmentFactory | number,
): segmentFactoryOrMaxTransferSize is SegmentFactory {
  return (segmentFactoryOrMaxTransferSize as SegmentFactory).create !== undefined;
}

export class ChangeFeedFactory {
  private readonly segmentFactory: SegmentFactory;
  private readonly maxTransferSize?: number;

  constructor(maxTransferSize?: number);
  constructor(segmentFactory: SegmentFactory);
  constructor(segmentFactoryOrMaxTransferSize?: SegmentFactory | number) {
    let segmentFactory: SegmentFactory | undefined;
    if (segmentFactoryOrMaxTransferSize) {
      if (Number.isFinite(segmentFactoryOrMaxTransferSize)) {
        this.maxTransferSize = segmentFactoryOrMaxTransferSize as number;
      } else if (isSegmentFactory(segmentFactoryOrMaxTransferSize)) {
        segmentFactory = segmentFactoryOrMaxTransferSize as SegmentFactory;
      }
    }

    if (segmentFactory) {
      this.segmentFactory = segmentFactory;
    } else {
      this.segmentFactory = new SegmentFactory(
        new ShardFactory(
          new ChunkFactory(
            new AvroReaderFactory(),
            new LazyLoadingBlobStreamFactory(),
            this.maxTransferSize,
          ),
        ),
      );
    }
  }

  private static validateCursor(containerClient: ContainerClient, cursor: ChangeFeedCursor): void {
    if (getHost(containerClient.url) !== cursor.UrlHost) {
      throw new Error("Cursor URL host does not match container URL host.");
    }
    if (cursor.CursorVersion !== 1) {
      throw new Error("Unsupported cursor version.");
    }
  }

  public async create(
    blobServiceClient: BlobServiceClient,
    continuationToken?: string,
    options: BlobChangeFeedListChangesOptions = {},
  ): Promise<ChangeFeed> {
    return tracingClient.withSpan("ChangeFeedFactory-create", options, async (updatedOptions) => {
      const containerClient = blobServiceClient.getContainerClient(CHANGE_FEED_CONTAINER_NAME);
      let cursor: ChangeFeedCursor | undefined = undefined;
      // Create cursor.
      if (continuationToken) {
        cursor = JSON.parse(continuationToken);
        ChangeFeedFactory.validateCursor(containerClient, cursor!);
        options.start = parseDateFromSegmentPath(cursor!.CurrentSegmentCursor.SegmentPath!);
        options.end = new Date(cursor!.EndTime!);
      }
      // Round start and end time if we are not using the cursor.
      else {
        options.start = floorToNearestHour(options.start);
        options.end = ceilToNearestHour(options.end);
      }

      // Check if Change Feed has been enabled for this account.
      const changeFeedContainerExists = await containerClient.exists({
        abortSignal: options.abortSignal,
        tracingOptions: updatedOptions.tracingOptions,
      });
      if (!changeFeedContainerExists) {
        throw new Error(
          "Change Feed hasn't been enabled on this account, or is currently being enabled.",
        );
      }

      if (options.start && options.end && options.start >= options.end) {
        return new ChangeFeed();
      }

      // Get last consumable.
      const blobClient = containerClient.getBlobClient(CHANGE_FEED_META_SEGMENT_PATH);
      let blobDownloadRes;
      try {
        blobDownloadRes = await blobClient.download(undefined, undefined, {
          abortSignal: options.abortSignal,
          tracingOptions: updatedOptions.tracingOptions,
        });
      } catch (err: any) {
        if (err.statusCode === 404) {
          return new ChangeFeed();
        } else {
          throw err;
        }
      }
      const lastConsumable = new Date(
        (JSON.parse(await bodyToString(blobDownloadRes)) as MetaSegments).lastConsumable,
      );

      // Get year paths
      const years: number[] = await getYearsPaths(containerClient, {
        abortSignal: options.abortSignal,
        tracingOptions: updatedOptions.tracingOptions,
      });

      // Dequeue any years that occur before start time.
      if (options.start) {
        const startYear = options.start.getUTCFullYear();
        while (years.length > 0 && years[0] < startYear) {
          years.shift();
        }
      }
      if (years.length === 0) {
        return new ChangeFeed();
      }

      let segments: string[] = [];
      while (segments.length === 0 && years.length !== 0) {
        segments = await getSegmentsInYear(
          containerClient,
          years.shift()!,
          options.start,
          minDate(lastConsumable, options.end),
          {
            abortSignal: options.abortSignal,
            tracingOptions: updatedOptions.tracingOptions,
          },
        );
      }
      if (segments.length === 0) {
        return new ChangeFeed();
      }
      const currentSegment: Segment = await this.segmentFactory.create(
        containerClient,
        segments.shift()!,
        cursor?.CurrentSegmentCursor,
        {
          abortSignal: options.abortSignal,
          tracingOptions: updatedOptions.tracingOptions,
        },
      );

      return new ChangeFeed(
        containerClient,
        this.segmentFactory,
        years,
        segments,
        currentSegment,
        lastConsumable,
        options.start,
        options.end,
      );
    });
  }
}
