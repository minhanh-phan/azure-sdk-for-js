@minLength(4)
param baseName string
param testApplicationOid string
param enableVersioning bool = false
param storageEndpointSuffix string = environment().suffixes.storage
param baseTime string = utcNow('u')

var storageApiVersion = '2023-05-01'
var location = resourceGroup().location
var accountName = baseName
var datalakeAccountName = 'dl${baseName}'
var datalakeSoftDeleteAccountName = 'dls${baseName}'
var fullAccountName = 'f${baseName}'
var premiumFileAccountName = 'pf${baseName}'
var accountSasProperties = {
  signedServices: 'bfqt'
  signedPermission: 'rwdlacup'
  signedResourceTypes: 'sco'
  keyToSign: 'key2'
  signedExpiry: dateTimeAdd(baseTime, 'PT2H')
}
var blobDataContributorRoleId = 'ba92f5b4-2d11-453d-a403-e96b0029c9fe'
var blobDataOwnerRoleId = 'b7e6dc6d-f1e8-4753-8033-0f276bb0955b'
var fileDataPrivilegedContributorRoleId = '69566ab7-960f-475b-8e7c-b3118f30c6bd'
var fileDataContributorRoleId = '0c867c2a-1d8c-454a-a3db-ab2ea1bdc8bb'
var encryption = {
  services: {
    file: {
      enabled: true
    }
    blob: {
      enabled: true
    }
  }
  keySource: 'Microsoft.Storage'
}
var networkAcls = {
  bypass: 'AzureServices'
  virtualNetworkRules: []
  ipRules: []
  defaultAction: 'Allow'
}

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: accountName
  location: location
  sku: {
    name: 'Standard_RAGRS'
  }
  kind: 'StorageV2'
  properties: {
    networkAcls: networkAcls
    supportsHttpsTrafficOnly: true
    encryption: encryption
    accessTier: 'Hot'
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: true
  }
}

resource storageAccountBlobService 'Microsoft.Storage/storageAccounts/blobServices@2023-05-01' = {
  parent: storageAccount
  name: 'default'
  properties: {
    isVersioningEnabled: enableVersioning
    cors: {
      corsRules: [
        {
          allowedOrigins: ['*']
          allowedMethods: ['DELETE', 'GET', 'HEAD', 'MERGE', 'POST', 'OPTIONS', 'PUT', 'PATCH']
          maxAgeInSeconds: 86400
          exposedHeaders: ['*']
          allowedHeaders: ['*']
        }
      ]
    }
    lastAccessTimeTrackingPolicy: {
      enable: true
      name: 'AccessTimeTracking'
      trackingGranularityInDays: 1
      blobType: ['blockBlob']
    }
  }
}
resource storageAccountFileService 'Microsoft.Storage/storageAccounts/fileServices@2023-05-01' = {
  parent: storageAccount
  name: 'default'
  properties: {
    cors: {
      corsRules: [
        {
          allowedOrigins: ['*']
          allowedMethods: ['DELETE', 'GET', 'HEAD', 'MERGE', 'POST', 'OPTIONS', 'PUT']
          maxAgeInSeconds: 86400
          exposedHeaders: ['*']
          allowedHeaders: ['*']
        }
      ]
    }
  }
}

resource datalakeAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: datalakeAccountName
  location: location
  sku: {
    name: 'Standard_RAGRS'
  }
  kind: 'StorageV2'
  properties: {
    isHnsEnabled: true
    networkAcls: networkAcls
    supportsHttpsTrafficOnly: true
    encryption: encryption
    accessTier: 'Hot'
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: true
  }
}

resource datalakeSoftDeleteAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: datalakeSoftDeleteAccountName
  location: location
  sku: {
    name: 'Standard_RAGRS'
  }
  kind: 'StorageV2'
  properties: {
    isHnsEnabled: true
    networkAcls: networkAcls
    supportsHttpsTrafficOnly: true
    encryption: encryption
    accessTier: 'Hot'
    minimumTlsVersion: 'TLS1_2'
  }
}

resource datalakeSoftDeleteAccountBlobService 'Microsoft.Storage/storageAccounts/blobServices@2023-05-01' = {
  parent: datalakeSoftDeleteAccount
  name: 'default'
  properties: {
    containerDeleteRetentionPolicy: {
      enabled: true
      days: 7
    }
    cors: {
      corsRules: [
        {
          allowedOrigins: ['*']
          allowedMethods: ['DELETE', 'GET', 'HEAD', 'MERGE', 'POST', 'OPTIONS', 'PUT', 'PATCH']
          maxAgeInSeconds: 86400
          exposedHeaders: ['*']
          allowedHeaders: ['*']
        }
      ]
    }
  }
}

resource fullStorageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: fullAccountName
  location: location
  sku: {
    name: 'Standard_RAGRS'
  }
  kind: 'StorageV2'
  properties: {
    networkAcls: networkAcls
    supportsHttpsTrafficOnly: true
    encryption: encryption
    accessTier: 'Hot'
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: true
  }
}

resource fullStorageAccountBlobService 'Microsoft.Storage/storageAccounts/blobServices@2023-05-01' = {
  parent: fullStorageAccount
  name: 'default'
  properties: {
    restorePolicy: {
      enabled: true
      days: 6
    }
    deleteRetentionPolicy: {
      enabled: true
      days: 7
    }
    containerDeleteRetentionPolicy: {
      enabled: true
      days: 7
    }
    changeFeed: {
      enabled: true
    }
    isVersioningEnabled: true
    cors: {
      corsRules: [
        {
          allowedOrigins: ['*']
          allowedMethods: ['DELETE', 'GET', 'HEAD', 'MERGE', 'POST', 'OPTIONS', 'PUT', 'PATCH']
          maxAgeInSeconds: 86400
          exposedHeaders: ['*']
          allowedHeaders: ['*']
        }
      ]
    }
  }
}
resource fullStorageAccountFileService 'Microsoft.Storage/storageAccounts/fileServices@2023-05-01' = {
  parent: fullStorageAccount
  name: 'default'
  properties: {
    shareDeleteRetentionPolicy: {
      enabled: true
      days: 7
    }
    cors: {
      corsRules: [
        {
          allowedOrigins: ['*']
          allowedMethods: ['DELETE', 'GET', 'HEAD', 'MERGE', 'POST', 'OPTIONS', 'PUT']
          maxAgeInSeconds: 86400
          exposedHeaders: ['*']
          allowedHeaders: ['*']
        }
      ]
    }
  }
}

resource premiumFileAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: premiumFileAccountName
  location: location
  sku: {
    name: 'Premium_LRS'
  }
  kind: 'FileStorage'
  properties: {
    networkAcls: networkAcls
    supportsHttpsTrafficOnly: true
    encryption: encryption
    accessTier: 'Hot'
    minimumTlsVersion: 'TLS1_2'
  }
}

resource premiumFileAccountFileService 'Microsoft.Storage/storageAccounts/fileServices@2023-05-01' = {
  parent: premiumFileAccount
  name: 'default'
  properties: {
    cors: {
      corsRules: [
        {
          allowedOrigins: ['*']
          allowedMethods: ['DELETE', 'GET', 'HEAD', 'MERGE', 'POST', 'OPTIONS', 'PUT']
          maxAgeInSeconds: 86400
          exposedHeaders: ['*']
          allowedHeaders: ['*']
        }
      ]
    }
  }
}
resource blobDataContributorRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('blobDataContributorRoleId', accountName)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', blobDataContributorRoleId)
    principalId: testApplicationOid
  }
}

resource blobDataOwnerRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('blobDataOwnerRoleId', accountName)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', blobDataOwnerRoleId)
    principalId: testApplicationOid
  }
}

resource fileDataPrivilegedContributorRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('fileDataPrivilegedContributorRoleId', accountName)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', fileDataPrivilegedContributorRoleId)
    principalId: testApplicationOid
  }
}

resource fileDataContributorRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('fileDataContributorRoleId', accountName)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', fileDataContributorRoleId)
    principalId: testApplicationOid
  }
}

output ACCOUNT_NAME string = accountName
output ACCOUNT_KEY string = storageAccount.listKeys(storageApiVersion).keys[0].value
output ACCOUNT_SAS string = '?${storageAccount.listAccountSas(storageApiVersion, accountSasProperties).accountSasToken}'
output STORAGE_CONNECTION_STRING string = 'DefaultEndpointsProtocol=https;AccountName=${accountName};AccountKey=${storageAccount.listKeys(storageApiVersion).keys[0].value};EndpointSuffix=${storageEndpointSuffix}'

output DFS_ACCOUNT_NAME string = datalakeAccountName
output DFS_ACCOUNT_KEY string = datalakeAccount.listKeys(storageApiVersion).keys[0].value
output DFS_ACCOUNT_SAS string = '?${datalakeAccount.listAccountSas(storageApiVersion, accountSasProperties).accountSasToken}'
output DFS_STORAGE_CONNECTION_STRING string = 'DefaultEndpointsProtocol=https;AccountName=${datalakeAccountName};AccountKey=${datalakeAccount.listKeys(storageApiVersion).keys[0].value};EndpointSuffix=${storageEndpointSuffix}'

output DFS_SOFT_DELETE_ACCOUNT_NAME string = datalakeSoftDeleteAccountName
output DFS_SOFT_DELETE_ACCOUNT_KEY string = datalakeSoftDeleteAccount.listKeys(storageApiVersion).keys[0].value
output DFS_SOFT_DELETE_ACCOUNT_SAS string = '?${datalakeSoftDeleteAccount.listAccountSas(storageApiVersion, accountSasProperties).accountSasToken}'

output FULL_ACCOUNT_NAME string = fullAccountName
output FULL_ACCOUNT_KEY string = fullStorageAccount.listKeys(storageApiVersion).keys[0].value
output FULL_ACCOUNT_SAS string = '?${fullStorageAccount.listAccountSas(storageApiVersion, accountSasProperties).accountSasToken}'
output FULL_STORAGE_CONNECTION_STRING string = 'DefaultEndpointsProtocol=https;AccountName=${fullAccountName};AccountKey=${fullStorageAccount.listKeys(storageApiVersion).keys[0].value};EndpointSuffix=${storageEndpointSuffix}'

output SOFT_DELETE_ACCOUNT_NAME string = fullAccountName
output SOFT_DELETE_ACCOUNT_KEY string = fullStorageAccount.listKeys(storageApiVersion).keys[0].value
output SOFT_DELETE_ACCOUNT_SAS string = '?${fullStorageAccount.listAccountSas(storageApiVersion, accountSasProperties).accountSasToken}'
output SOFT_DELETE_STORAGE_CONNECTION_STRING string = 'DefaultEndpointsProtocol=https;AccountName=${fullAccountName};AccountKey=${fullStorageAccount.listKeys(storageApiVersion).keys[0].value};EndpointSuffix=${storageEndpointSuffix}'

output PREMIUM_FILE_ACCOUNT_NAME string = premiumFileAccountName
output PREMIUM_FILE_ACCOUNT_KEY string = premiumFileAccount.listKeys(storageApiVersion).keys[0].value
output PREMIUM_FILE_ACCOUNT_SAS string = '?${premiumFileAccount.listAccountSas(storageApiVersion, accountSasProperties).accountSasToken}'
output PREMIUM_FILE_STORAGE_CONNECTION_STRING string = 'DefaultEndpointsProtocol=https;AccountName=${premiumFileAccountName};AccountKey=${premiumFileAccount.listKeys(storageApiVersion).keys[0].value};EndpointSuffix=${storageEndpointSuffix}'
