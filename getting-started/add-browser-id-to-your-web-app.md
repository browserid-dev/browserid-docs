---
outline: deep
---

# Add BrowserID to your web app

This guide will instruct you through setting up BrowserID in your application to verify that a user's browser is trusted.

## Prerequisites

- Sign up for a [BrowserID account](https://dash.browserid.dev) (No credit card required)
- Install [Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Create a new Workspace

Navigate to the [BrowserID dashboard](https://dash.browserid.dev) and click on the "Create Workspace" button.

Head over to the "API Keys" tab to get your `projectId` and `apiKey`.

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

Once your user has authenticated with your existing authentication flow client-side and you have verified their identity, you can generate a trust token within your web application.

:::tabs
== Client-side (Browser)

```typescript
import { frontend } from "@browserid/sdk";

// userId is retrieved from your existing authentication flow
const { deviceId, publicKey, userId } = await frontend.generateKeys({
  userId: "user_123",
});
```

:::

## Registering the browser

Grab your `projectId` and `apiKey` from the [BrowserID dashboard](https://dash.browserid.dev) and use them to initiate a new instance of the `Backend` class.

::: warning
It's highly recommended to register the `publicKey` with your backend/server-side API so that you do not expose your api key on the client-side.

Not doing so will expose your api key to the client-side and allow anyone to register a browser for your project.
:::

:::tabs
== Node

```typescript
import { Backend } from "@browserid/sdk";

const backend = new Backend({
  projectId: "YOUR_PROJECT_ID",
  apiKey: "YOUR_API_KEY",
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

To verify that a browser is trusted, you need to create a challenge and verify it with BrowserID.

### Create an API to verify with BrowserID

Create a backend/server-side API that will handle the verification of the browser.

:::tabs
== Node

```typescript
const backend = new Backend({
  projectId: "YOUR_PROJECT_ID",
  apiKey: "YOUR_API_KEY",
});

app.post("/verify", async (req, res) => {
  try {
    const { challenge, signature, userId, deviceId } = req.body;
    const response = await backend.verify({
      challenge,
      signature,
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
import { createChallenge } from "@zeroness/web";

const verify = async () => {
  const { challenge, signature, userId, deviceId } = await createChallenge();

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
