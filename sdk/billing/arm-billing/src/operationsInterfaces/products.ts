/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import {
  Product,
  ProductsListByInvoiceSectionOptionalParams,
  ProductsListByBillingProfileOptionalParams,
  ProductsListByCustomerOptionalParams,
  ProductsListByBillingAccountOptionalParams,
  MoveProductRequest,
  ProductsMoveOptionalParams,
  ProductsMoveResponse,
  ProductsValidateMoveEligibilityOptionalParams,
  ProductsValidateMoveEligibilityResponse,
  ProductsGetOptionalParams,
  ProductsGetResponse,
  ProductPatch,
  ProductsUpdateOptionalParams,
  ProductsUpdateResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Products. */
export interface Products {
  /**
   * Lists the products for an invoice section. These don't include products billed based on usage. The
   * operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
   * @param billingAccountName The ID that uniquely identifies a billing account.
   * @param billingProfileName The ID that uniquely identifies a billing profile.
   * @param invoiceSectionName The ID that uniquely identifies an invoice section.
   * @param options The options parameters.
   */
  listByInvoiceSection(
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    options?: ProductsListByInvoiceSectionOptionalParams,
  ): PagedAsyncIterableIterator<Product>;
  /**
   * Lists the products for a billing profile. These don't include products billed based on usage. The
   * operation is supported for billing accounts with agreement type Microsoft Customer Agreement or
   * Microsoft Partner Agreement.
   * @param billingAccountName The ID that uniquely identifies a billing account.
   * @param billingProfileName The ID that uniquely identifies a billing profile.
   * @param options The options parameters.
   */
  listByBillingProfile(
    billingAccountName: string,
    billingProfileName: string,
    options?: ProductsListByBillingProfileOptionalParams,
  ): PagedAsyncIterableIterator<Product>;
  /**
   * Lists the products for a customer. These don't include products billed based on usage.The operation
   * is supported only for billing accounts with agreement type Microsoft Partner Agreement.
   * @param billingAccountName The ID that uniquely identifies a billing account.
   * @param customerName The ID that uniquely identifies a customer.
   * @param options The options parameters.
   */
  listByCustomer(
    billingAccountName: string,
    customerName: string,
    options?: ProductsListByCustomerOptionalParams,
  ): PagedAsyncIterableIterator<Product>;
  /**
   * Lists the products for a billing account. These don't include products billed based on usage. The
   * operation is supported for billing accounts with agreement type Microsoft Customer Agreement or
   * Microsoft Partner Agreement.
   * @param billingAccountName The ID that uniquely identifies a billing account.
   * @param options The options parameters.
   */
  listByBillingAccount(
    billingAccountName: string,
    options?: ProductsListByBillingAccountOptionalParams,
  ): PagedAsyncIterableIterator<Product>;
  /**
   * Moves a product's charges to a new invoice section. The new invoice section must belong to the same
   * billing profile as the existing invoice section. This operation is supported only for products that
   * are purchased with a recurring charge and for billing accounts with agreement type Microsoft
   * Customer Agreement.
   * @param billingAccountName The ID that uniquely identifies a billing account.
   * @param productName The ID that uniquely identifies a product.
   * @param parameters The properties of the product to initiate a transfer.
   * @param options The options parameters.
   */
  beginMove(
    billingAccountName: string,
    productName: string,
    parameters: MoveProductRequest,
    options?: ProductsMoveOptionalParams,
  ): Promise<
    SimplePollerLike<OperationState<ProductsMoveResponse>, ProductsMoveResponse>
  >;
  /**
   * Moves a product's charges to a new invoice section. The new invoice section must belong to the same
   * billing profile as the existing invoice section. This operation is supported only for products that
   * are purchased with a recurring charge and for billing accounts with agreement type Microsoft
   * Customer Agreement.
   * @param billingAccountName The ID that uniquely identifies a billing account.
   * @param productName The ID that uniquely identifies a product.
   * @param parameters The properties of the product to initiate a transfer.
   * @param options The options parameters.
   */
  beginMoveAndWait(
    billingAccountName: string,
    productName: string,
    parameters: MoveProductRequest,
    options?: ProductsMoveOptionalParams,
  ): Promise<ProductsMoveResponse>;
  /**
   * Validates if a product's charges can be moved to a new invoice section. This operation is supported
   * only for products that are purchased with a recurring charge and for billing accounts with agreement
   * type Microsoft Customer Agreement.
   * @param billingAccountName The ID that uniquely identifies a billing account.
   * @param productName The ID that uniquely identifies a product.
   * @param parameters The properties of the product to initiate a transfer.
   * @param options The options parameters.
   */
  validateMoveEligibility(
    billingAccountName: string,
    productName: string,
    parameters: MoveProductRequest,
    options?: ProductsValidateMoveEligibilityOptionalParams,
  ): Promise<ProductsValidateMoveEligibilityResponse>;
  /**
   * Gets a product by ID. The operation is supported only for billing accounts with agreement type
   * Microsoft Customer Agreement.
   * @param billingAccountName The ID that uniquely identifies a billing account.
   * @param productName The ID that uniquely identifies a product.
   * @param options The options parameters.
   */
  get(
    billingAccountName: string,
    productName: string,
    options?: ProductsGetOptionalParams,
  ): Promise<ProductsGetResponse>;
  /**
   * Updates the properties of a Product. Currently, auto renew can be updated. The operation is
   * supported only for billing accounts with agreement type Microsoft Customer Agreement.
   * @param billingAccountName The ID that uniquely identifies a billing account.
   * @param productName The ID that uniquely identifies a product.
   * @param parameters A product.
   * @param options The options parameters.
   */
  update(
    billingAccountName: string,
    productName: string,
    parameters: ProductPatch,
    options?: ProductsUpdateOptionalParams,
  ): Promise<ProductsUpdateResponse>;
}
