// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how the updateRegistration() method can be used to update a device registration using
 * Notification Hubs. This sample shows using the getRegistrationById() method to retrieve an existing registration.
 *
 * See https://learn.microsoft.com/azure/notification-hubs/notification-hubs-push-notification-registration-management
 * to learn about registrations.
 *
 *
 * @summary Demonstrates how to update an installation using Azure Notification Hubs
 */

require("dotenv/config");
const {
  createClientContext,
  getRegistration,
  updateRegistration,
} = require("@azure/notification-hubs/api");

// Define connection string and hub name
const connectionString = process.env.NOTIFICATIONHUBS_CONNECTION_STRING || "<connection string>";
const hubName = process.env.NOTIFICATION_HUB_NAME || "<hub name>";

// Define an existing Registration ID.
const registrationId = process.env.REGISTRATION_ID || "<registrationId>";

async function main() {
  const context = createClientContext(connectionString, hubName);

  const registration = await getRegistration(context, registrationId);

  // Add some tags
  if (!registration.tags) {
    registration.tags = [];
  }

  await registration.tags.push("likes_sports");

  const registrationResponse = await updateRegistration(context, registration);

  console.log(`Registration ID: ${registrationResponse.registrationId}`);
}

main().catch((err) => {
  console.log("updateRegistration Sample: Error occurred: ", err);
  process.exit(1);
});
