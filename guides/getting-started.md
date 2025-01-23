---
outline: deep
---

# Getting started

This guide will instruct you through setting up BrowserID in your application.

## Installation

:::tabs
== npm

```shell
npm add @zeroness/web
```

== pnpm

```shell
pnpm add @zeroness/web
```

== yarn

```shell
yarn add @zeroness/web
```

== bun

```shell
bun add @zeroness/web
```

:::

## Trusting the device

When a user logs in to your website, you can:

- Automatically trust their device
- Ask/prompt the user to trust their device

Then run the `trustBrowser` function. This will return a `publicKey`, while also securely storing a `privateKey` and `userId` on the user's device.

The `privateKey` never leaves the user's device, and can be used to verify future logins.

:::tabs
== Client-side (Browser)

```typescript
import { trustDevice } from "@zeroness/web";

const { publicKey } = await trustDevice();
```

:::

## Registering the public key

To register the public key with BrowserID, you will need to use your project's `projectId` and `apiKey`.

You can find these in the [BrowserID dashboard](https://dash.zeroness.dev).

### Server-side

Create a backend/server-side API that will handle the registration of new devices and the verification of existing ones.

:::tabs
== Server

```curl
curl -X POST "https://api.zeroness.dev/projects/${ZERONNESS_PROJECT_ID}/register" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${ZERONNESS_API_KEY}" \
-d '{"userId": "123", "publicKey": "yourPublicKeyHere"}'
```

:::

### Client-side

Once your API is ready, you can initialize the device registration process on the client-side.

:::tabs
== Client-side (Device)

```typescript
const initialize = async () => {
  const { publicKey, userId } = await trustDevice();

  const req = await fetch("/your-api-endpoint/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      publicKey,
      // It is recommended to retrieve the userId from your service/provider
      userId,
    }),
  });
  const data = await req.json();
  console.log("data", data);
};

initialize();
```

:::

## Verifying the device

To verify that a user's device is trusted, you can call the `verifyDevice` function. This will return a boolean `true` or `false` indicating whether the device has been verified.

```typescript
import { createChallenge } from "@zeroness/web";

const verify = async () => {
  const { challenge, signature } = await createChallenge();
  // Get your userId from your service/provider
  const userId = "MY_USER_ID";

  const req = await fetch("/your-api-endpoint/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      challenge,
      signature,
      userId,
    }),
  });

  const data = await req.json();
  console.log("data", data);
};

verify();
```

:::tabs
== Server

```curl
curl -X POST "https://api.zeroness.dev/projects/${ZERONNESS_PROJECT_ID}/verify" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${ZERONNESS_API_KEY}" \
-d '{"challenge": "yourChallengeHere", "signature": "yourSignatureHere", "userId": "yourUserIdHere"}'
```

:::
