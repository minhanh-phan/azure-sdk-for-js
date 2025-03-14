// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  SubscriptionNetworkManagerConnectionsDeleteParameters,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete specified connection created by this subscription.
 *
 * @summary Delete specified connection created by this subscription.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkManagerConnectionSubscriptionDelete.json
 */
async function deleteSubscriptionNetworkManagerConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const networkManagerConnectionName = "TestNMConnection";
  const options: SubscriptionNetworkManagerConnectionsDeleteParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Network/networkManagerConnections/{networkManagerConnectionName}",
      subscriptionId,
      networkManagerConnectionName,
    )
    .delete(options);
  console.log(result);
}

deleteSubscriptionNetworkManagerConnection().catch(console.error);
