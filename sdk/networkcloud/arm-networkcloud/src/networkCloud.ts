/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreClient from "@azure/core-client";
import * as coreRestPipeline from "@azure/core-rest-pipeline";
import {
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import * as coreAuth from "@azure/core-auth";
import {
  OperationsImpl,
  BareMetalMachinesImpl,
  CloudServicesNetworksImpl,
  ClusterManagersImpl,
  ClustersImpl,
  KubernetesClustersImpl,
  L2NetworksImpl,
  L3NetworksImpl,
  RackSkusImpl,
  RacksImpl,
  StorageAppliancesImpl,
  TrunkedNetworksImpl,
  VirtualMachinesImpl,
  VolumesImpl,
  BareMetalMachineKeySetsImpl,
  BmcKeySetsImpl,
  MetricsConfigurationsImpl,
  AgentPoolsImpl,
  KubernetesClusterFeaturesImpl,
  ConsolesImpl,
} from "./operations/index.js";
import {
  Operations,
  BareMetalMachines,
  CloudServicesNetworks,
  ClusterManagers,
  Clusters,
  KubernetesClusters,
  L2Networks,
  L3Networks,
  RackSkus,
  Racks,
  StorageAppliances,
  TrunkedNetworks,
  VirtualMachines,
  Volumes,
  BareMetalMachineKeySets,
  BmcKeySets,
  MetricsConfigurations,
  AgentPools,
  KubernetesClusterFeatures,
  Consoles,
} from "./operationsInterfaces/index.js";
import { NetworkCloudOptionalParams } from "./models/index.js";

export class NetworkCloud extends coreClient.ServiceClient {
  $host: string;
  apiVersion: string;
  subscriptionId: string;

  /**
   * Initializes a new instance of the NetworkCloud class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId The ID of the target subscription. The value must be an UUID.
   * @param options The parameter options
   */
  constructor(
    credentials: coreAuth.TokenCredential,
    subscriptionId: string,
    options?: NetworkCloudOptionalParams,
  ) {
    if (credentials === undefined) {
      throw new Error("'credentials' cannot be null");
    }
    if (subscriptionId === undefined) {
      throw new Error("'subscriptionId' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }
    const defaults: NetworkCloudOptionalParams = {
      requestContentType: "application/json; charset=utf-8",
      credential: credentials,
    };

    const packageDetails = `azsdk-js-arm-networkcloud/1.2.0`;
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
        options.endpoint ?? options.baseUri ?? "https://management.azure.com",
    };
    super(optionsWithDefaults);

    let bearerTokenAuthenticationPolicyFound: boolean = false;
    if (options?.pipeline && options.pipeline.getOrderedPolicies().length > 0) {
      const pipelinePolicies: coreRestPipeline.PipelinePolicy[] =
        options.pipeline.getOrderedPolicies();
      bearerTokenAuthenticationPolicyFound = pipelinePolicies.some(
        (pipelinePolicy) =>
          pipelinePolicy.name ===
          coreRestPipeline.bearerTokenAuthenticationPolicyName,
      );
    }
    if (
      !options ||
      !options.pipeline ||
      options.pipeline.getOrderedPolicies().length == 0 ||
      !bearerTokenAuthenticationPolicyFound
    ) {
      this.pipeline.removePolicy({
        name: coreRestPipeline.bearerTokenAuthenticationPolicyName,
      });
      this.pipeline.addPolicy(
        coreRestPipeline.bearerTokenAuthenticationPolicy({
          credential: credentials,
          scopes:
            optionsWithDefaults.credentialScopes ??
            `${optionsWithDefaults.endpoint}/.default`,
          challengeCallbacks: {
            authorizeRequestOnChallenge:
              coreClient.authorizeRequestOnClaimChallenge,
          },
        }),
      );
    }
    // Parameter assignments
    this.subscriptionId = subscriptionId;

    // Assigning values to Constant parameters
    this.$host = options.$host || "https://management.azure.com";
    this.apiVersion = options.apiVersion || "2025-02-01";
    this.operations = new OperationsImpl(this);
    this.bareMetalMachines = new BareMetalMachinesImpl(this);
    this.cloudServicesNetworks = new CloudServicesNetworksImpl(this);
    this.clusterManagers = new ClusterManagersImpl(this);
    this.clusters = new ClustersImpl(this);
    this.kubernetesClusters = new KubernetesClustersImpl(this);
    this.l2Networks = new L2NetworksImpl(this);
    this.l3Networks = new L3NetworksImpl(this);
    this.rackSkus = new RackSkusImpl(this);
    this.racks = new RacksImpl(this);
    this.storageAppliances = new StorageAppliancesImpl(this);
    this.trunkedNetworks = new TrunkedNetworksImpl(this);
    this.virtualMachines = new VirtualMachinesImpl(this);
    this.volumes = new VolumesImpl(this);
    this.bareMetalMachineKeySets = new BareMetalMachineKeySetsImpl(this);
    this.bmcKeySets = new BmcKeySetsImpl(this);
    this.metricsConfigurations = new MetricsConfigurationsImpl(this);
    this.agentPools = new AgentPoolsImpl(this);
    this.kubernetesClusterFeatures = new KubernetesClusterFeaturesImpl(this);
    this.consoles = new ConsolesImpl(this);
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

  operations: Operations;
  bareMetalMachines: BareMetalMachines;
  cloudServicesNetworks: CloudServicesNetworks;
  clusterManagers: ClusterManagers;
  clusters: Clusters;
  kubernetesClusters: KubernetesClusters;
  l2Networks: L2Networks;
  l3Networks: L3Networks;
  rackSkus: RackSkus;
  racks: Racks;
  storageAppliances: StorageAppliances;
  trunkedNetworks: TrunkedNetworks;
  virtualMachines: VirtualMachines;
  volumes: Volumes;
  bareMetalMachineKeySets: BareMetalMachineKeySets;
  bmcKeySets: BmcKeySets;
  metricsConfigurations: MetricsConfigurations;
  agentPools: AgentPools;
  kubernetesClusterFeatures: KubernetesClusterFeatures;
  consoles: Consoles;
}
