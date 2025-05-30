/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import {
  RoleAssignmentScheduleRequest,
  AuthorizationManagementClient
} from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a role assignment schedule request.
 *
 * @summary Creates a role assignment schedule request.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2022-04-01-preview/examples/PutRoleAssignmentScheduleRequest.json
 */
async function putRoleAssignmentScheduleRequest() {
  const scope =
    "providers/Microsoft.Subscription/subscriptions/dfa2a084-766f-4003-8ae1-c4aeb893a99f";
  const roleAssignmentScheduleRequestName =
    "fea7a502-9a96-4806-a26f-eee560e52045";
  const parameters: RoleAssignmentScheduleRequest = {
    condition:
      "@Resource[Microsoft.Storage/storageAccounts/blobServices/containers:ContainerName] StringEqualsIgnoreCase 'foo_storage_container'",
    conditionVersion: "1.0",
    linkedRoleEligibilityScheduleId: "b1477448-2cc6-4ceb-93b4-54a202a89413",
    principalId: "a3bb8764-cb92-4276-9d2a-ca1e895e55ea",
    requestType: "SelfActivate",
    roleDefinitionId:
      "/subscriptions/dfa2a084-766f-4003-8ae1-c4aeb893a99f/providers/Microsoft.Authorization/roleDefinitions/c8d4ff99-41c3-41a8-9f60-21dfdad59608",
    scheduleInfo: {
      expiration: {
        type: "AfterDuration",
        duration: "PT8H",
        endDateTime: undefined
      },
      startDateTime: new Date("2020-09-09T21:35:27.91Z")
    }
  };
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleAssignmentScheduleRequests.create(
    scope,
    roleAssignmentScheduleRequestName,
    parameters
  );
  console.log(result);
}

async function main() {
  putRoleAssignmentScheduleRequest();
}

main().catch(console.error);
