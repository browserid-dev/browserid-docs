---
outline: deep
---

# Set up BrowserID

This guide will instruct you through setting up BrowserID in your application and verify that browsers are trusted.

## Prerequisites

- Sign up for a [BrowserID account](https://dash.browserid.dev) (No credit card required)
- Install [Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Create a new Workspace

Navigate to the [BrowserID dashboard](https://dash.browserid.dev) and click on the "Create Workspace" button if you don't have one already.

Head over to the "API Keys" tab on the workspace and grab your `projectId` and `apiKey`.

## Install the SDK

Add the `@browserid/sdk` SDK to your application by running the following commands:

:::tabs
== npm

```shell
npm add @browserid/sdk
```

== pnpm

```shell
pnpm add @browserid/sdk
```

== yarn

```shell
yarn add @browserid/sdk
```

== bun

```shell
bun add @browserid/sdk
```

:::

::: tip
If your backend is seperately written in TypeScript, you can also go ahead and install the `@browserid/sdk` package there.
:::

## Let's generate a trust token

Once your user has authenticated with your existing authentication flow client-side and you have verified their identity (e.g. username, password + 2FA, etc.), generate a trust token within your web application.

:::tabs
== Client-side (Browser)

```typescript
import { frontend } from "@browserid/sdk";

// ... existing authentication flow ...

// userId is retrieved from your existing authentication flow
const { deviceId, publicKey, userId } = await frontend.generateKeys({
  userId: "user_123",
});
```

:::

<sub>Learn more about the `generateKeys` function [here](/sdk/frontend/create-keypair).</sub>

## Registering the browser

In order to register the browser in a secure way, you need to create an API that will handle the registration of the browser. Once you have your API ready, you can create a _challenge_ via the SDK and verify the browser from client-side.

### Create an API to register the browser with BrowserID

Grab your `projectId` and `apiKey` from the [BrowserID dashboard](https://dash.browserid.dev) and use them to initiate a new instance of the `Backend` class.

::: warning
It's highly recommended to register the `publicKey` with your backend/server-side API so that you do not expose your api key on the client-side.

Not doing so will expose your api key to the client-side and allow anyone to register a browser for your workspace.
:::

:::tabs
== Node

```typescript
import { Backend } from "@browserid/sdk";

const backend = new Backend({
  workspaceId: "WORKSPACE_ID",
  apiKey: "API_KEY",
});

app.post("/register", async (req, res) => {
  try {
    const { userId, publicKey, deviceId } = req.body;
    const response = await backend.register({ userId, publicKey, deviceId });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});
```

== Curl

```curl
curl -X POST "https://api.browserid.dev/v1/workspaces/${WORKSPACE_ID}/register" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${API_KEY}" \
-d '{"userId": "123", "publicKey": "yourPublicKeyHere", "deviceId": "yourDeviceIdHere"}'
```

:::

#### Hookup your client-side to your backend

Once your API from the above step is ready and you have the `userId`, `publicKey`, and `deviceId` from the [Let's generate a trust token](#let-s-generate-a-trust-token) step, you can register the browser from the client-side.

:::tabs
== Client-side (Browser)

```typescript
const registerBrowser = async (
  publicKey: string,
  userId: string,
  deviceId: string
) => {
  const req = await fetch("/your-api-endpoint/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      publicKey,
      deviceId,
      userId,
    }),
  });
  const response = await req.json();
  console.log("response", response);
};
```

:::

## Let's verify the browser

To verify that a browser is trusted, you need to create a _challenge_ and verify it with BrowserID.

### Create an API to verify with BrowserID

Create a backend/server-side API that will handle the verification of the browser.

:::tabs
== Node

```typescript
// Reuse the same instance of the Backend class from the "Register the browser" step or create a new one
const backend = new Backend({
  workspaceId: "WORKSPACE_ID",
  apiKey: "API_KEY",
});

app.post("/verify", async (req, res) => {
  try {
    const { challenge, signature, userId, deviceId } = req.body;
    const response = await backend.verify({
      challenge,
      signature,
      // the userId can be retrieved from your existing authentication flow or from @browserid/sdk
      // You can also compare the userId with the userId from your existing authentication flow for additional security
      userId,
      deviceId,
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Verification failed" });
  }
});
```

== Curl

```curl
curl -X POST "https://api.browserid.dev/v1/workspaces/${WORKSPACE_ID}/verify" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${API_KEY}" \
-d '{"challenge": "yourChallengeHere", "signature": "yourSignatureHere", "userId": "yourUserIdHere", "deviceId": "yourDeviceIdHere"}'
```

:::

### Create a challenge

With your API from the previous step, you can now create a challenge and verify the browser.

:::tabs
== Client-side (Browser)

```typescript
import { frontend } from "@browserid/sdk";

const verify = async () => {
  const { challenge, signature, userId, deviceId } =
    await frontend.createChallenge();

  const req = await fetch("/your-api-endpoint/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      challenge,
      signature,
      userId,
      deviceId,
    }),
  });

  const response = await req.json();
  console.log("response", response);
};
```

:::

## Blocking untrusted browsers

Within your API from the [Create an API to verify with BrowserID](#create-an-api-to-verify-with-browserid) step, you can now block untrusted browsers with the status of the `verify` response. An example of how you can do this is below.

:::tabs
== Node

```typescript
if (response.status === false) {
  // block the deviceID/userID on your existing authentication flow
}
```

:::

::: tip
You can also verify the `verify` response client-side to block untrusted browsers but this is not recommended.
:::
