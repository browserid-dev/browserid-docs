---
outline: deep
---

# Create challenge

Generates a cryptographic challenge, signs it, and returns the challenge string, signature, and GUID.

## Example

:::tabs
== Client-side (Browser)

```typescript
try {
  const { challenge, signature, userId, deviceId, timestamp } =
    await frontend.createChallenge({
      length: 32,
    });
  console.log(`Challenge: ${challenge}`);
  console.log(`Signature: ${signature}`);
  console.log(`GUID: ${userId}`);
  console.log(`Device ID: ${deviceId}`);
  console.log(`Timestamp: ${timestamp}`);
} catch (error) {
  console.error("Failed to create challenge:", error);
}
```

:::

## Syntax

```typescript
async function createChallenge(
  options: CreateChallengeOptions
): Promise<CreateChallengeResponse>;

type CreateChallengeOptions = {
  /** Length of the challenge in bytes. Defaults to 32 */
  length?: number;
};

type CreateChallengeResponse = {
  /** Base64URL-encoded random challenge string */
  challenge: string;
  /** Cryptographic signature of the challenge */
  signature: string;
  /** Identifier of the signing user */
  userId: string;
  /** Identifier of the device */
  deviceId: string;
  /** ISO timestamp of the challenge creation */
  timestamp: string;
};
```

## Parameters

- `options`: CreateChallengeOptions
  - An object containing configuration options:
    - `length` (optional): number
      - The length of the challenge string in bytes. Defaults to 32 if not provided.

## Return Value

Returns a Promise that resolves to an object containing:

- `challenge`: string
  - The base64 URL-encoded challenge string.
- `signature`: string
  - The base64 URL-encoded signature of the challenge string.
- `userId`: string
  - The user ID associated with the signing key.
- `deviceId`: string
  - The device ID associated with the signing key.
- `timestamp`: string
  - The ISO timestamp when the challenge was created.

## Exceptions

Throws a `DeviceNotRegisteredError` if no valid keys are found.
Throws an `Error` if challenge generation or signing fails.

## Description

This function performs the following steps:

1. Generates a random challenge string of the specified length (or 32 bytes if not specified).
2. Encodes the challenge string using base64 URL encoding.
3. Signs the challenge using a secure signing method.
4. Returns the challenge, its signature, the user ID, device ID, and the timestamp associated with the signing key.

The generated challenge and signature can be used in authentication or verification processes to ensure the integrity and authenticity of subsequent operations.
