# Azure AI Vision Image Analysis client library for JavaScript

The Image Analysis service provides AI algorithms for processing images and returning information about their content. In a single service call, you can extract one or more visual features from the image simultaneously, including getting a caption for the image, extracting text shown in the image (OCR) and detecting objects. For more information on the service and the supported visual features, see [Image Analysis overview][image_analysis_overview], and the [Concepts][image_analysis_concepts] page.

Use the Image Analysis client library to:

- Authenticate against the service
- Set what features you would like to extract
- Upload an image for analysis, or send an image URL
- Get the analysis result

[Product documentation][image_analysis_overview]
| [Samples](https://aka.ms/azsdk/image-analysis/samples/js)
| [Vision Studio][vision_studio]
| [API reference documentation](https://aka.ms/azsdk/image-analysis/ref-docs/js)
| [Package (npm)](https://aka.ms/azsdk/image-analysis/package/npm)
| [SDK source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/vision/ai-vision-image-analysis-rest/src)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free).
- A [Computer Vision resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision) in your Azure subscription.
  - You will need the key and endpoint from this resource to authenticate against the service.
  - You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.
  - Note that in order to run Image Analysis with the `Caption` or `Dense Captions` features, the Azure resource needs to be from one of the following GPU-supported regions: `East US`, `France Central`, `Korea Central`, `North Europe`, `Southeast Asia`, `West Europe`, or `West US`.

### Install the `@azure-rest/ai-vision-image-analysis` package

Install the Image Analysis client library for JavaScript with `npm`:

```bash
npm install @azure-rest/ai-vision-image-analysis
```

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first, you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

Once you've initialized an `ImageAnalysisClient`, you need to select one or more visual features to analyze. The options are specified by the enum class `VisualFeatures`. The following features are supported:

1. `VisualFeatures.Caption`: ([Examples](#analyze-an-image-from-url) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/vision/ai-vision-image-analysis-rest/samples)) Generate a human-readable sentence that describes the content of an image.
1. `VisualFeatures.Read`: ([Examples](#extract-text-from-an-image-url) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/vision/ai-vision-image-analysis-rest/samples)) Also known as Optical Character Recognition (OCR). Extract printed or handwritten text from images.
1. `VisualFeatures.DenseCaptions`: Dense Captions provides more details by generating one-sentence captions for up to 10 different regions in the image, including one for the whole image.
1. `VisualFeatures.Tags`: Extract content tags for thousands of recognizable objects, living beings, scenery, and actions that appear in images.
1. `VisualFeatures.Objects`: Object detection. This is similar to tagging, but focused on detecting physical objects in the image and returning their location.
1. `VisualFeatures.SmartCrops`: Used to find a representative sub-region of the image for thumbnail generation, with priority given to include faces.
1. `VisualFeatures.People`: Locate people in the image and return their location.

For more information about these features, see [Image Analysis overview][image_analysis_overview], and the [Concepts][image_analysis_concepts] page.

### Supported image formats

Image Analysis works on images that meet the following requirements:

- The image must be presented in JPEG, PNG, GIF, BMP, WEBP, ICO, TIFF, or MPO format
- The file size of the image must be less than 20 megabytes (MB)
- The dimensions of the image must be greater than 50 x 50 pixels and less than 16,000 x 16,000 pixels

### ImageAnalysisClient

The `ImageAnalysisClient` is the primary interface for developers interacting with the Image Analysis service. It serves as the gateway from which all interaction with the library will occur.

## Examples

### Authenticate the client

Here's an example of how to create an `ImageAnalysisClient` instance using a key-based authentication.

```ts snippet:ReadmeSampleCreateClient_KeyCredential
import { AzureKeyCredential } from "@azure/core-auth";
import ImageAnalysisClient from "@azure-rest/ai-vision-image-analysis";

const endpoint = "<your_endpoint>";
const key = "<your_key>";
const credential = new AzureKeyCredential(key);
const client = ImageAnalysisClient(endpoint, credential);
```

#### Create ImageAnalysisClient with a Microsoft Entra ID Credential

**Prerequisites for Entra ID Authentication**:

- The role `Cognitive Services User` assigned to you. Role assignment can be done via the "Access Control (IAM)" tab of your Computer Vision resource in the Azure portal.
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) installed.
- You are logged into your Azure account by running `az login`.

Also note that if you have multiple Azure subscriptions, the subscription that contains your Computer Vision resource must be your default subscription. Run `az account list --output table` to list all your subscriptions and see which one is the default. Run `az account set --subscription "Your Subscription ID or Name"` to change your default subscription.

Client subscription key authentication is used in most of the examples in this getting started guide, but you can also authenticate with Microsoft Entra ID (formerly Azure Active Directory) using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][azure_identity_dac] provider shown below, or other credential providers provided with the Azure SDK, please install the @azure/identity package:

```
npm install @azure/identity
```

```ts snippet:ReadmeSampleCreateClient_DefaultAzureCredential
import { DefaultAzureCredential } from "@azure/identity";
import ImageAnalysisClient from "@azure-rest/ai-vision-image-analysis";

const endpoint = "<your_endpoint>";
const credential = new DefaultAzureCredential();
const client = ImageAnalysisClient(endpoint, credential);
```

### Analyze an image from URL

The following example demonstrates how to analyze an image using the Image Analysis client library for JavaScript.

```ts snippet:ReadmeSampleAnalyzeImageFromUrl
import { DefaultAzureCredential } from "@azure/identity";
import ImageAnalysisClient, { isUnexpected } from "@azure-rest/ai-vision-image-analysis";

const endpoint = "<your_endpoint>";
const credential = new DefaultAzureCredential();
const client = ImageAnalysisClient(endpoint, credential);

const imageUrl = "https://example.com/image.jpg";
const features = ["Caption", "DenseCaptions", "Objects", "People", "Read", "SmartCrops", "Tags"];

const result = await client.path("/imageanalysis:analyze").post({
  body: {
    url: imageUrl,
  },
  queryParameters: {
    features: features,
    "smartCrops-aspect-ratios": [0.9, 1.33],
  },
  contentType: "application/json",
});
if (isUnexpected(result)) {
  throw result.body.error;
}

console.log(`Model Version: ${result.body.modelVersion}`);
console.log(`Image Metadata: ${JSON.stringify(result.body.metadata)}`);

if (result.body.captionResult) {
  console.log(
    `Caption: ${result.body.captionResult.text} (confidence: ${result.body.captionResult.confidence})`,
  );
}

if (result.body.denseCaptionsResult) {
  for (const denseCaption of result.body.denseCaptionsResult.values) {
    console.log(`Dense Caption: ${JSON.stringify(denseCaption)}`);
  }
}

if (result.body.objectsResult) {
  for (const object of result.body.objectsResult.values) {
    console.log(`Object: ${JSON.stringify(object)}`);
  }
}

if (result.body.peopleResult) {
  for (const person of result.body.peopleResult.values) {
    console.log(`Person: ${JSON.stringify(person)}`);
  }
}

if (result.body.readResult) {
  for (const block of result.body.readResult.blocks) {
    console.log(`Text Block: ${JSON.stringify(block)}`);
  }
}

if (result.body.smartCropsResult) {
  for (const smartCrop of result.body.smartCropsResult.values) {
    console.log(`Smart Crop: ${JSON.stringify(smartCrop)}`);
  }
}

if (result.body.tagsResult) {
  for (const tag of result.body.tagsResult.values) {
    console.log(`Tag: ${JSON.stringify(tag)}`);
  }
}
```

### Analyze an image from a local file

In this example, we will analyze an image from a local file using the Image Analysis client library for JavaScript.

```ts snippet:ReadmeSampleAnalyzeImageFromFile
import { DefaultAzureCredential } from "@azure/identity";
import ImageAnalysisClient, { isUnexpected } from "@azure-rest/ai-vision-image-analysis";
import { readFileSync } from "node:fs";

const endpoint = "<your_endpoint>";
const credential = new DefaultAzureCredential();
const client = ImageAnalysisClient(endpoint, credential);

const imagePath = "./path/to/your/image.jpg";
const features = ["Caption", "DenseCaptions", "Objects", "People", "Read", "SmartCrops", "Tags"];

const imageBuffer = readFileSync(imagePath);

const result = await client.path("/imageanalysis:analyze").post({
  body: imageBuffer,
  queryParameters: {
    features: features,
    "smartCrops-aspect-ratios": [0.9, 1.33],
  },
  contentType: "application/octet-stream",
});
if (isUnexpected(result)) {
  throw result.body.error;
}

console.log(`Model Version: ${result.body.modelVersion}`);
console.log(`Image Metadata: ${JSON.stringify(result.body.metadata)}`);

if (result.body.captionResult) {
  console.log(
    `Caption: ${result.body.captionResult.text} (confidence: ${result.body.captionResult.confidence})`,
  );
}

if (result.body.denseCaptionsResult) {
  for (const denseCaption of result.body.denseCaptionsResult.values) {
    console.log(`Dense Caption: ${JSON.stringify(denseCaption)}`);
  }
}

if (result.body.objectsResult) {
  for (const object of result.body.objectsResult.values) {
    console.log(`Object: ${JSON.stringify(object)}`);
  }
}

if (result.body.peopleResult) {
  for (const person of result.body.peopleResult.values) {
    console.log(`Person: ${JSON.stringify(person)}`);
  }
}

if (result.body.readResult) {
  for (const block of result.body.readResult.blocks) {
    console.log(`Text Block: ${JSON.stringify(block)}`);
  }
}

if (result.body.smartCropsResult) {
  for (const smartCrop of result.body.smartCropsResult.values) {
    console.log(`Smart Crop: ${JSON.stringify(smartCrop)}`);
  }
}

if (result.body.tagsResult) {
  for (const tag of result.body.tagsResult.values) {
    console.log(`Tag: ${JSON.stringify(tag)}`);
  }
}
```

### Extract text from an image Url

This example demonstrates how to extract printed or hand-written text for the image file [sample.jpg](https://aka.ms/azsdk/image-analysis/sample.jpg) using the ImageAnalysisClient. The method call returns an ImageAnalysisResult object. The ReadResult property on the returned object includes a list of text lines and a bounding polygon surrounding each text line. For each line, it also returns a list of words in the text line and a bounding polygon surrounding each word.

```ts snippet:ReadmeSampleExtractTextFromImageUrl
import { DefaultAzureCredential } from "@azure/identity";
import ImageAnalysisClient, { isUnexpected } from "@azure-rest/ai-vision-image-analysis";

const endpoint = "<your_endpoint>";
const credential = new DefaultAzureCredential();
const client = ImageAnalysisClient(endpoint, credential);

const features: string[] = ["Read"];
const imageUrl: string = "https://aka.ms/azsdk/image-analysis/sample.jpg";

const result = await client.path("/imageanalysis:analyze").post({
  body: { url: imageUrl },
  queryParameters: { features: features },
  contentType: "application/json",
});
if (isUnexpected(result)) {
  throw result.body.error;
}

// Process the response
const imageAnalysisResult = result.body;
if (imageAnalysisResult.readResult && imageAnalysisResult.readResult.blocks.length > 0) {
  for (const block of imageAnalysisResult.readResult.blocks) {
    console.log(`Detected text block: ${JSON.stringify(block)}`);
  }
} else {
  console.log("No text blocks detected.");
}
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/vision/ai-vision-image-analysis-rest/samples) directory for detailed examples that demonstrate how to use the client libraries.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

[image_analysis_overview]: https://learn.microsoft.com/azure/ai-services/computer-vision/overview-image-analysis?tabs=4-0
[image_analysis_concepts]: https://learn.microsoft.com/azure/ai-services/computer-vision/concept-tag-images-40
[vision_studio]: https://aka.ms/vision-studio/image-analysis
[azure_identity]: https://learn.microsoft.com/javascript/api/overview/azure/identity-readme
[azure_identity_dac]: https://learn.microsoft.com/javascript/api/@azure/identity/defaultazurecredential
