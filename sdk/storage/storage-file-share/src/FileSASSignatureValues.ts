// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageSharedKeyCredential } from "@azure/storage-common";
import { FileSASPermissions } from "./FileSASPermissions.js";
import type { SasIPRange } from "./SasIPRange.js";
import { ipRangeToString } from "./SasIPRange.js";
import type { SASProtocol } from "./SASQueryParameters.js";
import { SASQueryParameters } from "./SASQueryParameters.js";
import { ShareSASPermissions } from "./ShareSASPermissions.js";
import { SERVICE_VERSION } from "./utils/constants.js";
import { truncatedISO8061Date } from "./utils/utils.common.js";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * FileSASSignatureValues is used to help generating File service SAS tokens for shares or files.
 */

export interface FileSASSignatureValues {
  /**
   * The version of the service this SAS will target. If not specified, it will default to the version targeted by the
   * library.
   */
  version?: string;

  /**
   * Optional. SAS protocols, HTTPS only or HTTPSandHTTP
   */
  protocol?: SASProtocol;

  /**
   * Optional. When the SAS will take effect.
   */
  startsOn?: Date;

  /**
   * Optional only when identifier is provided. The time after which the SAS will no longer work.
   */
  expiresOn?: Date;

  /**
   * Optional only when identifier is provided.
   * Please refer to either {@link ShareSASPermissions} or {@link FileSASPermissions} depending on the resource
   * being accessed for help constructing the permissions string.
   */
  permissions?: FileSASPermissions | ShareSASPermissions;

  /**
   * Optional. IP ranges allowed in this SAS.
   */
  ipRange?: SasIPRange;

  /**
   * The name of the share the SAS user may access.
   */
  shareName: string;

  /**
   * Optional. The path of the file like, "directory/FileName" or "FileName".
   */
  filePath?: string;

  /**
   * Optional. The name of the access policy on the share this SAS references if any.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/establishing-a-stored-access-policy
   */
  identifier?: string;

  /**
   * Optional. The cache-control header for the SAS.
   */
  cacheControl?: string;

  /**
   * Optional. The content-disposition header for the SAS.
   */
  contentDisposition?: string;

  /**
   * Optional. The content-encoding header for the SAS.
   */
  contentEncoding?: string;

  /**
   * Optional. The content-language header for the SAS.
   */
  contentLanguage?: string;

  /**
   * Optional. The content-type header for the SAS.
   */
  contentType?: string;
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Creates an instance of SASQueryParameters.
 *
 * Only accepts required settings needed to create a SAS. For optional settings please
 * set corresponding properties directly, such as permissions, startsOn and identifier.
 *
 * WARNING: When identifier is not provided, permissions and expiresOn are required.
 * You MUST assign value to identifier or expiresOn & permissions manually if you initial with
 * this constructor.
 *
 * @param fileSASSignatureValues -
 * @param sharedKeyCredential -
 */
export function generateFileSASQueryParameters(
  fileSASSignatureValues: FileSASSignatureValues,
  sharedKeyCredential: StorageSharedKeyCredential,
): SASQueryParameters {
  return generateFileSASQueryParametersInternal(fileSASSignatureValues, sharedKeyCredential)
    .sasQueryParameters;
}

export function generateFileSASQueryParametersInternal(
  fileSASSignatureValues: FileSASSignatureValues,
  sharedKeyCredential: StorageSharedKeyCredential,
): { sasQueryParameters: SASQueryParameters; stringToSign: string } {
  if (
    !fileSASSignatureValues.identifier &&
    !(fileSASSignatureValues.permissions && fileSASSignatureValues.expiresOn)
  ) {
    throw new RangeError(
      "Must provide 'permissions' and 'expiresOn' for File SAS generation when 'identifier' is not provided.",
    );
  }

  const version = fileSASSignatureValues.version ? fileSASSignatureValues.version : SERVICE_VERSION;
  let resource: string = "s";
  if (fileSASSignatureValues.filePath) {
    resource = "f";
  }

  let verifiedPermissions: string | undefined;
  // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
  if (fileSASSignatureValues.permissions) {
    if (fileSASSignatureValues.filePath) {
      verifiedPermissions = FileSASPermissions.parse(
        fileSASSignatureValues.permissions.toString(),
      ).toString();
    } else {
      verifiedPermissions = ShareSASPermissions.parse(
        fileSASSignatureValues.permissions.toString(),
      ).toString();
    }
  }

  // Signature is generated on the un-url-encoded values.
  const stringToSign = [
    verifiedPermissions,
    fileSASSignatureValues.startsOn
      ? truncatedISO8061Date(fileSASSignatureValues.startsOn, false)
      : "",
    fileSASSignatureValues.expiresOn
      ? truncatedISO8061Date(fileSASSignatureValues.expiresOn, false)
      : "",
    getCanonicalName(
      sharedKeyCredential.accountName,
      fileSASSignatureValues.shareName,
      fileSASSignatureValues.filePath,
    ),
    fileSASSignatureValues.identifier,
    fileSASSignatureValues.ipRange ? ipRangeToString(fileSASSignatureValues.ipRange) : "",
    fileSASSignatureValues.protocol,
    version,
    fileSASSignatureValues.cacheControl,
    fileSASSignatureValues.contentDisposition,
    fileSASSignatureValues.contentEncoding,
    fileSASSignatureValues.contentLanguage,
    fileSASSignatureValues.contentType,
  ].join("\n");

  const signature = sharedKeyCredential.computeHMACSHA256(stringToSign);

  return {
    sasQueryParameters: new SASQueryParameters(
      version,
      signature,
      verifiedPermissions,
      undefined,
      undefined,
      fileSASSignatureValues.protocol,
      fileSASSignatureValues.startsOn,
      fileSASSignatureValues.expiresOn,
      fileSASSignatureValues.ipRange,
      fileSASSignatureValues.identifier,
      resource,
      fileSASSignatureValues.cacheControl,
      fileSASSignatureValues.contentDisposition,
      fileSASSignatureValues.contentEncoding,
      fileSASSignatureValues.contentLanguage,
      fileSASSignatureValues.contentType,
    ),
    stringToSign: stringToSign,
  };
}

function getCanonicalName(accountName: string, shareName: string, filePath?: string): string {
  // Share: "/file/account/sharename"
  // File:  "/file/account/sharename/filename"
  // File:  "/file/account/sharename/directoryname/filename"
  const elements: string[] = [`/file/${accountName}/${shareName}`];
  if (filePath) {
    elements.push(`/${filePath}`);
  }
  return elements.join("");
}
