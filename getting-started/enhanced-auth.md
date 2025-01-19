---
outline: deep
---

# Getting started with enhanced authentication
This guide will instruct you through setting up Zeroness's enhanced authentication in your web application to verify that a user's browser is known and trusted for returning visits.

[[toc]]

## Install the Zeroness SDK

Add the `@zeroness/web` SDK to your web project by running one of the following commands:

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

## Trust the browser

### Generate a trust token

Once your user has authenticated with your existing authentication flow and you have verified their identity, you can generate a trust token within your web application.

:::tabs
== Client-side (Browser)
```typescript
import { generateKeys } from "@zeroness/web";

// userId is retrieved from your existing authentication flow
const generateTrustToken = async (userId: string) => {
  const { publicKey, userId } = await generateKeys({
    userId
  });
  return { publicKey, userId };
}
```
:::

### Register the `publicKey` with Zeroness

With the `publicKey` from the previous step, register it with Zeroness for future verification.

You will need your `projectId` and `apiKey`. You can find these in the [Zeroness dashboard](https://dash.zeroness.dev).

#### Server-side API

Create a backend/server-side API that will handle the registration of new browsers.

:::tabs
== Server
```curl
curl -X POST "https://api.zeroness.dev/projects/${ZERONNESS_PROJECT_ID}/register" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${ZERONNESS_API_KEY}" \
-d '{"userId": "123", "publicKey": "yourPublicKeyHere"}'
```
:::

#### Client-side

Once your API is ready, you can initialize the browser registration process on the client-side.

:::tabs
== Client-side (Browser)
```typescript
const initialize = async (publicKey: string, userId: string) => {

  const req = await fetch("/your-api-endpoint/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      publicKey,
      // It is recommended to retrieve the userId within your jwt, cookie, etc.
      userId
    })
  });
  const response = await req.json();
  console.log("response", response);
}
```
:::

## Verifying the browser
To verify that a user's browser is trusted, you can call the `verifyBrowser` function. This will return a boolean `true` or `false` indicating whether the browser has been verified.

### Create a challenge

:::tabs
== Client-side (Browser)
```typescript
import { createChallenge } from "@zeroness/web";

const verify = async () => {

  const { challenge, signature, userId } = await createChallenge();
  // Get your userId from your service/provider
  const existingUserId = "MY_USER_ID";

  const req = await fetch("/your-api-endpoint/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      challenge,
      signature,
      existingUserId
    })
  });

  const response = await req.json();
  console.log("response", response);
}
```
:::

### Verify with Zeroness

With the `challenge`, `signature`, and `userId` from the previous step, verify the browser with Zeroness.

Create a backend/server-side API that will handle the verification of the browser.

:::tabs
== Server
```curl
curl -X POST "https://api.zeroness.dev/projects/${ZERONNESS_PROJECT_ID}/verify" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${ZERONNESS_API_KEY}" \
-d '{"challenge": "yourChallengeHere", "signature": "yourSignatureHere", "userId": "yourUserIdHere"}'
```
:::