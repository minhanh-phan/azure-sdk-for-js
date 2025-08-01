# Release History

## 1.10.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.10.0 (2025-07-10)

### Other Changes

- Update `engines` to `"node": ">=20.0.0"`. Please refer to our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more information on our supported Node.js versions.

## 1.9.4 (2025-05-01)

### Other Changes

- Bump dependency `@azure/core-rest-pipeline` to `^1.20.0`. [PR #34151](https://github.com/Azure/azure-sdk-for-js/pull/34151)

## 1.9.3 (2025-03-06)

### Other Changes

- Correctly set the code and message fields in `RestError` in a corner case [PR #33151](https://github.com/Azure/azure-sdk-for-js/pull/33151)

## 1.9.2 (2024-04-09)

### Bugs Fixed

- Address two issues related to Azure Disk Storage. [PR #29087](https://github.com/Azure/azure-sdk-for-js/pull/29087)

### Other Changes

- Revert TypeScript output target to ES2017.

## 1.9.1 (2024-03-20)

### Bugs Fixed

- Addressed an issue with `authorizeRequestOnTenantChallenge` not correctly parsing challenges. [PR #28967](https://github.com/Azure/azure-sdk-for-js/pull/28967)

### Other Changes

- Add top-level `browser` field to `package.json` as fallback for legacy bundlers that do not support the `exports` field.

## 1.9.0 (2024-03-12)

### Other Changes

- Migrated the codebase to ESM. This change is internal and should not affect customers.
- Migrated unit tests to vitest.

## 1.8.0 (2024-02-01)

### Bugs Fixed

- Fix an error when serializing browser ReadableStream [PR #27052](https://github.com/Azure/azure-sdk-for-js/pull/27052)

### Other Changes

- Upgrade dependency `@azure/abort-controller` version to `^2.0.0`.

## 1.7.3 (2023-06-01)

### Other Changes

- remove the validation that credential scopes must be a valid URL [Issue #25881](https://github.com/Azure/azure-sdk-for-js/issues/25881)

## 1.7.2 (2023-02-23)

### Bugs Fixed

- Fix a deserializer issue where setting null value when it's necessary.

## 1.7.1 (2023-02-02)

### Other Changes

- Only deserialize headers that are mapped in OperationSpec when using a header mapper. Previously core-client would include all header values when deserializing, leading to result objects having unintended extra metadata.

## 1.7.0 (2023-01-05)

### Features Added

- Ported support for `xmlIsMsText` from `@azure/core-http`.

### Bugs Fixed

- Fix a serializer issue where resettable streams were not being accepted.
- Fix an issue where XML options are not propagated during deserialization.

## 1.6.1 (2022-08-04)

### Bugs Fixed

- Fix serializer to find the correct discriminator index. Please refer to [#22523](https://github.com/Azure/azure-sdk-for-js/pull/22523) for further details.

### Other Changes

- Removed the constraints check during serialization. Please refer [#21839](https://github.com/Azure/azure-sdk-for-js/issues/21839) for further details.

## 1.6.0 (2022-05-05)

### Features Added

- Added a new property endpoint in ServiceClientOptions and mark the baseUri as deprecated to encourage people to use endpoint. See issue link [here](https://github.com/Azure/autorest.typescript/issues/1337)
- Upgraded our `@azure/core-tracing` dependency to version 1.0
- Add callbacks to support Storage challenge authentication [PR#21678](https://github.com/Azure/azure-sdk-for-js/pull/21678)

## 1.5.0 (2022-02-03)

### Features Added

- Added new `CommonClientOptions` member `additionalPolicies` to allow passing custom pipeline policies to client constructors. [PR #19920](https://github.com/Azure/azure-sdk-for-js/pull/19920)

### Bugs Fixed

- Addressed an issue where the `onResponse` callback wouldn't be called in certain cases where an unexpected response was received from the service. [PR #19702](https://github.com/Azure/azure-sdk-for-js/pull/19702)

## 1.4.0 (2022-01-06)

### Features Added

- Added a new function `authorizeRequestOnClaimChallenge`, that can be used with the `@azure/core-rest-pipeline`'s `bearerTokenAuthenticationPolicy` to support [Continuous Access Evaluation (CAE) challenges](https://learn.microsoft.com/azure/active-directory/conditional-access/concept-continuous-access-evaluation).
- Call the `bearerTokenAuthenticationPolicy` with the following options: `bearerTokenAuthenticationPolicy({ authorizeRequestOnChallenge: authorizeRequestOnClaimChallenge })`. Once provided, the `bearerTokenAuthenticationPolicy` policy will internally handle Continuous Access Evaluation (CAE) challenges. When it can't complete a challenge it will return the 401 (unauthorized) response from ARM.

### Bugs Fixed

- Fixed a serializer issue with nested polymorphics. [PR #19455](https://github.com/Azure/azure-sdk-for-js/pull/19455)

## 1.3.3 (2021-12-02)

### Bugs Fixed

- Added a check to handle undefined value during the parsing of query parameters. Please refer to [PR #18621](https://github.com/Azure/azure-sdk-for-js/pull/18621) for further details.

## 1.3.2 (2021-10-25)

### Bugs Fixed

- Skip query parameter replacement for absolute URLs. [PR #18310](https://github.com/Azure/azure-sdk-for-js/pull/18310)

## 1.3.1 (2021-09-30)

### Other Changes

- Updates package to work with the react native bundler. Browser APIs may still need to be pollyfilled for this package to run in react native. [PR #17783](https://github.com/Azure/azure-sdk-for-js/pull/17783)

## 1.3.0 (2021-08-04)

### Features Added

- Updated to use version 1.0.0-preview.13 of `@azure/core-tracing`.

### Key Bugs Fixed

- Fixed an issue where APIs that accepted a Blob didn't work with File objects. See [#16754](https://github.com/Azure/azure-sdk-for-js/issues/16754) for more details.

## 1.2.2 (2021-07-13)

### Key Bugs Fixed

- Fixed the return value during the flattening the response for `HEAD` HTTP Requests. This will ensure that the return value will indicate the presence/absence of the resource. Please refer [#1037](https://github.com/Azure/autorest.typescript/issues/1037) for more details.

## 1.2.1 (2021-06-30)

### Features Added

- Moved `allowInsecureConnection` from `ServiceClientOptions` to `CommonClientOptions` [issue 15938](https://github.com/azure/azure-sdk-for-js/issues/15938)

## 1.1.3 (2021-06-17)

### Key Bugs Fixed

- Fix an issue of lost properties when flattening array in deserialization [issue 15653](https://github.com/azure/azure-sdk-for-js/issues/15653)
- Fix an issue with appending query parameters while constructing the url. Please refer [Issue #1035](https://github.com/Azure/autorest.typescript/issues/1035) for more details.

## 1.1.2 (2021-05-20)

### Fixed

- Fixed an issue to check for the mandatory parameter in the header and query values. [PR 15278](https://github.com/Azure/azure-sdk-for-js/pull/15278)

## 1.1.1 (2021-05-06)

### Features Added

- Expose `allowInsecureConnection` in `ServiceClientOptions` and `OperationRequestOptions` to allow operation requests to HTTP endpoints

### Fixed

- Consider more mapper types as primitive thus requires wrapping

## 1.1.0 (2021-03-30)

### Breaking Changes

- If the response body is empty and the mapper for it says it is nullable, then a null is returned.
- Updated @azure/core-tracing to version `1.0.0-preview.11`. See [@azure/core-tracing CHANGELOG](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-tracing/CHANGELOG.md) for details about breaking changes with tracing.

## 1.0.0 (2021-03-15)

GA release of this package.

## 1.0.0-beta.2 (2021-03-10)

- [Breaking] Removed `createSpanFunction` and `SpanConfig`. These have been moved into
  `@azure/core-tracing`.

## 1.0.0-beta.1 (2021-02-04)

- First release of package, see README.md for details.
- Changes from related functionality in `core-http`:
  - Replace URLBuilder with runtime-supported URL primitive.
  - Rewrite `ServiceClient` on top of `core-rest-pipeline` and remove unused codepaths.
  - Remove `_response` on operation results and replace with `onResponse` callback.
