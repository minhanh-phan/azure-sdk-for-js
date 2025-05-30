/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreClient from "@azure/core-client";
import {
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import {
  DigitalTwinModelsImpl,
  QueryImpl,
  DigitalTwinsImpl,
  EventRoutesImpl,
  ImportJobsImpl,
  DeleteJobsImpl,
} from "./operations/index.js";
import {
  DigitalTwinModels,
  Query,
  DigitalTwins,
  EventRoutes,
  ImportJobs,
  DeleteJobs,
} from "./operationsInterfaces/index.js";
import { AzureDigitalTwinsAPIOptionalParams } from "./models/index.js";

export class AzureDigitalTwinsAPI extends coreClient.ServiceClient {
  $host: string;
  apiVersion: string;
  operationId?: string;
  timeoutInMinutes?: number;

  /**
   * Initializes a new instance of the AzureDigitalTwinsAPI class.
   * @param options The parameter options
   */
  constructor(options?: AzureDigitalTwinsAPIOptionalParams) {
    // Initializing default values for options
    if (!options) {
      options = {};
    }
    const defaults: AzureDigitalTwinsAPIOptionalParams = {
      requestContentType: "application/json; charset=utf-8",
    };

    const packageDetails = `azsdk-js-digital-twins-core/2.0.0`;
    const userAgentPrefix =
      options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;

    const optionsWithDefaults = {
      ...defaults,
      ...options,
      userAgentOptions: {
        userAgentPrefix,
      },
      endpoint:
        options.endpoint ?? options.baseUri ?? "https://digitaltwins-hostname",
    };
    super(optionsWithDefaults);

    // Assigning values to Constant parameters
    this.$host = options.$host || "https://digitaltwins-hostname";
    this.apiVersion = options.apiVersion || "2023-10-31";
    this.digitalTwinModels = new DigitalTwinModelsImpl(this);
    this.query = new QueryImpl(this);
    this.digitalTwins = new DigitalTwinsImpl(this);
    this.eventRoutes = new EventRoutesImpl(this);
    this.importJobs = new ImportJobsImpl(this);
    this.deleteJobs = new DeleteJobsImpl(this);
    this.addCustomApiVersionPolicy(options.apiVersion);
  }

  /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
  private addCustomApiVersionPolicy(apiVersion?: string) {
    if (!apiVersion) {
      return;
    }
    const apiVersionPolicy = {
      name: "CustomApiVersionPolicy",
      async sendRequest(
        request: PipelineRequest,
        next: SendRequest,
      ): Promise<PipelineResponse> {
        const param = request.url.split("?");
        if (param.length > 1) {
          const newParams = param[1].split("&").map((item) => {
            if (item.indexOf("api-version") > -1) {
              return "api-version=" + apiVersion;
            } else {
              return item;
            }
          });
          request.url = param[0] + "?" + newParams.join("&");
        }
        return next(request);
      },
    };
    this.pipeline.addPolicy(apiVersionPolicy);
  }

  digitalTwinModels: DigitalTwinModels;
  query: Query;
  digitalTwins: DigitalTwins;
  eventRoutes: EventRoutes;
  importJobs: ImportJobs;
  deleteJobs: DeleteJobs;
}
