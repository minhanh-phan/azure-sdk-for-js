/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  Certificate,
  CertificatesListByCatalogOptionalParams,
  CertificatesGetOptionalParams,
  CertificatesGetResponse,
  CertificatesRetrieveCertChainOptionalParams,
  CertificatesRetrieveCertChainResponse,
  ProofOfPossessionNonceRequest,
  CertificatesRetrieveProofOfPossessionNonceOptionalParams,
  CertificatesRetrieveProofOfPossessionNonceResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Certificates. */
export interface Certificates {
  /**
   * List Certificate resources by Catalog
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param catalogName Name of catalog
   * @param options The options parameters.
   */
  listByCatalog(
    resourceGroupName: string,
    catalogName: string,
    options?: CertificatesListByCatalogOptionalParams,
  ): PagedAsyncIterableIterator<Certificate>;
  /**
   * Get a Certificate
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param catalogName Name of catalog
   * @param serialNumber Serial number of the certificate. Use '.default' to get current active
   *                     certificate.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    catalogName: string,
    serialNumber: string,
    options?: CertificatesGetOptionalParams,
  ): Promise<CertificatesGetResponse>;
  /**
   * Retrieves cert chain.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param catalogName Name of catalog
   * @param serialNumber Serial number of the certificate. Use '.default' to get current active
   *                     certificate.
   * @param options The options parameters.
   */
  retrieveCertChain(
    resourceGroupName: string,
    catalogName: string,
    serialNumber: string,
    options?: CertificatesRetrieveCertChainOptionalParams,
  ): Promise<CertificatesRetrieveCertChainResponse>;
  /**
   * Gets the proof of possession nonce.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param catalogName Name of catalog
   * @param serialNumber Serial number of the certificate. Use '.default' to get current active
   *                     certificate.
   * @param proofOfPossessionNonceRequest Proof of possession nonce request body
   * @param options The options parameters.
   */
  retrieveProofOfPossessionNonce(
    resourceGroupName: string,
    catalogName: string,
    serialNumber: string,
    proofOfPossessionNonceRequest: ProofOfPossessionNonceRequest,
    options?: CertificatesRetrieveProofOfPossessionNonceOptionalParams,
  ): Promise<CertificatesRetrieveProofOfPossessionNonceResponse>;
}
