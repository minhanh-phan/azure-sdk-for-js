# KeyVault Admin Swagger Configuration

> see https://aka.ms/autorest

```yaml
package-name: "@azure/keyvault-admin"
azure-arm: false
disable-async-iterators: true
api-version-parameter: choice
generate-metadata: false
add-credentials: false
license-header: MICROSOFT_MIT_NO_VERSION
input-file:
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/7452e1cc7db72fbc6cd9539b390d8b8e5c2a1864/specification/keyvault/data-plane/Microsoft.KeyVault/stable/7.5/rbac.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/7452e1cc7db72fbc6cd9539b390d8b8e5c2a1864/specification/keyvault/data-plane/Microsoft.KeyVault/stable/7.5/backuprestore.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/7452e1cc7db72fbc6cd9539b390d8b8e5c2a1864/specification/keyvault/data-plane/Microsoft.KeyVault/stable/7.5/settings.json
output-folder: ../
source-code-folder-path: ./src/generated
package-version: 4.6.1
use-extension:
  "@autorest/typescript": "6.0.34"
module-kind: esm
```

### Hide LROs

```yaml
directive:
  - from: swagger-document
    where: $["paths"]
    transform: >
      for (var path in $) {
          for (var op of Object.values($[path])) {
              if (op["x-ms-long-running-operation"]) {
                  delete op["x-ms-long-running-operation"];
              }
          }
      }
```

### Ignore 404s for DELETE operations

Treat HTTP 404 responses for DELETE operations for RBAC as non-errors.

```yaml
directive:
  - where-operation: RoleAssignments_Delete
    transform: >
      $.responses["404"] = {
          "description": "The resource to delete does not exist.",
          "x-ms-error-response": false
      };
  - where-operation: RoleDefinitions_Delete
    transform: >
      $.responses["404"] = {
          "description": "The resource to delete does not exist.",
          "x-ms-error-response": false
      };
```

### Return void for DELETE operations

Do not parse response bodies unnecessarily.

```yaml
directive:
  - where-operation: RoleAssignments_Delete
    transform: >
      delete $.responses["200"].schema;
  - where-operation: RoleDefinitions_Delete
    transform: >
      delete $.responses["200"].schema;
```

### Operation renames for Settings API

```yaml
directive:
  - rename-operation:
      from: GetSettingValue
      to: GetSetting
```
