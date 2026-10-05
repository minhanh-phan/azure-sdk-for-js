# Azure Arc managed identity test results

<!-- cspell:words SAMI UAMI appid -->

## Test build

| Field     | Value                                      |
| --------- | ------------------------------------------ |
| Package   | `@azure/identity`                          |
| Version   | `4.13.3` GA                                |
| Git tag   | `@azure/identity_4.13.3`                   |
| Commit    | `b9b7a5d28863f235d0115b8c57c45c08c4964c90` |
| Test date | 2026-09-16                                 |
| Result    | All supported configurations passed        |

The package was built and packed directly from the GA tag:

```bash
pnpm turbo build --filter=@azure/identity... --token 1
pnpm --dir sdk/identity/identity pack --pack-destination <artifact-directory>
```

## Test resource structure

```text
Resource group
|
+-- Arc machine A
|   +-- Backing VM
|   +-- System-assigned managed identity
|   +-- Used for the SAMI-only matrix
|
+-- TPM-backed Arc machine B
|   +-- Backing VM
|   +-- System-assigned managed identity
|   +-- Attached user-assigned managed identity
|   +-- Used for the combined SAMI and UAMI matrix
|
+-- Attached UAMI
|   +-- Used for successful client ID, resource ID, and object ID selectors
|
+-- Unattached UAMI
|   +-- Used to verify identity_not_found
|
+-- Key Vault
    +-- Contains a marker secret readable by the attached UAMI
```

The test blocked the backing VMs' native IMDS endpoints so tokens could only come from the Azure
Arc managed identity endpoint.

Temporary package storage used Microsoft Entra RBAC and read-only user-delegation SAS URLs.
Shared-key/local authentication and public blob access were disabled. The account was HTTPS-only
with TLS 1.2 minimum and was deleted after the run.

## SAMI-only result

| Test                          | JWT validation               | Result |
| ----------------------------- | ---------------------------- | ------ |
| `ManagedIdentityCredential()` | SAMI `oid` and `appid`/`azp` | Passed |
| `DefaultAzureCredential()`    | SAMI `oid` and `appid`/`azp` | Passed |

```text
PASS SAMI-only ManagedIdentityCredential SAMI: oid and client ID claims match
PASS SAMI-only DefaultAzureCredential SAMI: oid and client ID claims match
PASS SAMI-only matrix
```

## Combined SAMI and UAMI result

| Test                                                    | JWT validation               | Result |
| ------------------------------------------------------- | ---------------------------- | ------ |
| `ManagedIdentityCredential()`                           | SAMI `oid` and `appid`/`azp` | Passed |
| `DefaultAzureCredential()`                              | SAMI `oid` and `appid`/`azp` | Passed |
| `ManagedIdentityCredential({ clientId })`               | UAMI `oid` and `appid`/`azp` | Passed |
| `ManagedIdentityCredential({ resourceId })`             | UAMI `oid` and `appid`/`azp` | Passed |
| `ManagedIdentityCredential({ objectId })`               | UAMI `oid` and `appid`/`azp` | Passed |
| `DefaultAzureCredential({ managedIdentityClientId })`   | UAMI `oid` and `appid`/`azp` | Passed |
| `DefaultAzureCredential({ managedIdentityResourceId })` | UAMI `oid` and `appid`/`azp` | Passed |

```text
PASS SAMI+UAMI ManagedIdentityCredential SAMI: oid and client ID claims match
PASS SAMI+UAMI DefaultAzureCredential SAMI: oid and client ID claims match
PASS SAMI+UAMI ManagedIdentityCredential UAMI clientId: oid and client ID claims match
PASS SAMI+UAMI ManagedIdentityCredential UAMI resourceId: oid and client ID claims match
PASS SAMI+UAMI ManagedIdentityCredential UAMI objectId: oid and client ID claims match
PASS SAMI+UAMI DefaultAzureCredential UAMI clientId: oid and client ID claims match
PASS SAMI+UAMI DefaultAzureCredential UAMI resourceId: oid and client ID claims match
PASS SAMI+UAMI matrix
```

## Full UAMI selector and authorization result

The original `index.ts` manual integration application also passed:

- Attached UAMI selection by client ID, resource ID, and object ID.
- `DefaultAzureCredential` selection by managed identity client ID and resource ID.
- Key Vault marker-secret read using the attached UAMI.
- `identity_not_found` for every selector using an unattached UAMI.

The original application validates the UAMI `oid`. The matrix application in `matrix.ts`
strengthens the token check by validating both `oid` and the `appid` or `azp` client-ID claim.

## UAMI-only configuration

A literal Arc resource with its system-assigned identity removed was not tested. Azure Arc uses
the system-assigned identity for connected-machine operation, so removing it could disconnect or
invalidate the fixture.

The UAMI-only authentication path was tested on the combined fixture. Every UAMI test explicitly
selected the UAMI and verified from the JWT that the requested UAMI, rather than the active SAMI,
issued the token.

## Test files

- `index.ts`: attached and unattached UAMI selector tests plus Key Vault authorization.
- `matrix.ts`: SAMI-only and combined SAMI/UAMI tests with `oid` and client-ID validation.
- `run-matrix.sh`: Arc host runner with native IMDS isolation.
- `INSTRUCTIONS.md`: resource setup, package staging, execution, and cleanup instructions.

## Cleanup result

| Resource                  | Final state |
| ------------------------- | ----------- |
| Temporary package storage | Deleted     |
| Temporary Run Commands    | Deleted     |
| Temporary host files      | Deleted     |
| Test reservation tags     | Removed     |
| Backing VMs               | Deallocated |
| Arc machines              | Retained    |
| User-assigned identities  | Retained    |
| Key Vault                 | Retained    |
