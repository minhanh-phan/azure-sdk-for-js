/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { VirtualMachineInstance } from "@azure/arm-scvmm";
import { ScVmm } from "@azure/arm-scvmm";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to The operation to create or update a virtual machine instance. Please note some properties can be set only during virtual machine instance creation.
 *
 * @summary The operation to create or update a virtual machine instance. Please note some properties can be set only during virtual machine instance creation.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/stable/2023-10-07/examples/VirtualMachineInstances_CreateOrUpdate_MaximumSet_Gen.json
 */
async function virtualMachineInstancesCreateOrUpdateMaximumSet(): Promise<void> {
  const resourceUri = "gtgclehcbsyave";
  const resource: VirtualMachineInstance = {
    extendedLocation: {
      name: "/subscriptions/12345678-1234-1234-1234-12345678abc/resourceGroups/exampleResourceGroup/providers/Microsoft.ExtendedLocation/customLocations/customLocationName",
      type: "customLocation",
    },
    properties: {
      availabilitySets: [
        {
          name: "lwbhaseo",
          id: "/subscriptions/12345678-1234-1234-1234-12345678abc/resourceGroups/exampleResourceGroup/providers/Microsoft.ScVmm/availabilitySets/availabilitySetResourceName",
        },
      ],
      hardwareProfile: {
        cpuCount: 22,
        dynamicMemoryEnabled: "true",
        dynamicMemoryMaxMB: 2,
        dynamicMemoryMinMB: 30,
        isHighlyAvailable: "true",
        limitCpuForMigration: "true",
        memoryMB: 5,
      },
      infrastructureProfile: {
        biosGuid: "xixivxifyql",
        checkpointType: "jkbpzjxpeegackhsvikrnlnwqz",
        cloudId:
          "/subscriptions/12345678-1234-1234-1234-12345678abc/resourceGroups/exampleResourceGroup/providers/Microsoft.ScVmm/clouds/cloudResourceName",
        generation: 28,
        inventoryItemId: "ihkkqmg",
        lastRestoredVmCheckpoint: {
          name: "keqn",
          description: "qurzfrgyflrh",
          checkpointId: "wsqmrje",
          parentCheckpointId: "hqhhzikoxunuqguouw",
        },
        templateId:
          "/subscriptions/12345678-1234-1234-1234-12345678abc/resourceGroups/exampleResourceGroup/providers/Microsoft.ScVmm/virtualMachineTemplates/virtualMachineTemplateName",
        uuid: "hrpw",
        vmName: "qovpayfydhcvfrhe",
        vmmServerId:
          "/subscriptions/12345678-1234-1234-1234-12345678abc/resourceGroups/exampleResourceGroup/providers/Microsoft.ScVmm/vmmServers/vmmServerName",
      },
      networkProfile: {
        networkInterfaces: [
          {
            name: "kvofzqulbjlbtt",
            ipv4AddressType: "Dynamic",
            ipv6AddressType: "Dynamic",
            macAddress: "oaeqqegt",
            macAddressType: "Dynamic",
            nicId: "roxpsvlo",
            virtualNetworkId:
              "/subscriptions/12345678-1234-1234-1234-12345678abc/resourceGroups/exampleResourceGroup/providers/Microsoft.ScVmm/virtualNetworks/virtualNetworkName",
          },
        ],
      },
      osProfile: {
        adminPassword: "vavtppmmhlspydtkzxda",
        computerName: "uuxpcxuxcufllc",
        osType: "Windows",
      },
      storageProfile: {
        disks: [
          {
            name: "fgnckfymwdsqnfxkdvexuaobe",
            bus: 8,
            busType: "zu",
            createDiffDisk: "true",
            diskId: "ltdrwcfjklpsimhzqyh",
            diskSizeGB: 30,
            lun: 10,
            storageQosPolicy: { name: "ceiyfrflu", id: "o" },
            templateDiskId: "lcdwrokpyvekqccclf",
            vhdType: "cnbeeeylrvopigdynvgpkfp",
          },
        ],
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ScVmm(credential);
  const result = await client.virtualMachineInstances.beginCreateOrUpdateAndWait(
    resourceUri,
    resource,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to The operation to create or update a virtual machine instance. Please note some properties can be set only during virtual machine instance creation.
 *
 * @summary The operation to create or update a virtual machine instance. Please note some properties can be set only during virtual machine instance creation.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/stable/2023-10-07/examples/VirtualMachineInstances_CreateOrUpdate_MinimumSet_Gen.json
 */
async function virtualMachineInstancesCreateOrUpdateMinimumSet(): Promise<void> {
  const resourceUri = "gtgclehcbsyave";
  const resource: VirtualMachineInstance = { extendedLocation: {} };
  const credential = new DefaultAzureCredential();
  const client = new ScVmm(credential);
  const result = await client.virtualMachineInstances.beginCreateOrUpdateAndWait(
    resourceUri,
    resource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineInstancesCreateOrUpdateMaximumSet();
  await virtualMachineInstancesCreateOrUpdateMinimumSet();
}

main().catch(console.error);
