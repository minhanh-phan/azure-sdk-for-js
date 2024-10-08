// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * The default time interval to wait before sending the next polling request.
 */
export const POLL_INTERVAL_IN_MS = 2000;
/**
 * The closed set of terminal states.
 */
export const terminalStates = ["succeeded", "canceled", "failed"];
