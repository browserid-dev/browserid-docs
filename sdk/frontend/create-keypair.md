---
outline: deep
---

# Create keypair

Generates a cryptographic key pair (ECDSA P-384) for digital signatures, stores the private key securely, and returns the public key along with a user identifier and device identifier.

## Example

:::tabs
== Client-side (Browser)

```typescript
try {
  const { publicKey, userId, deviceId } = await frontend.createKeypair({
    userId: "user123",
  });
  console.log(`Public Key: ${publicKey}`);
  console.log(`User ID: ${userId}`);
  console.log(`Device ID: ${deviceId}`);
} catch (error) {
  console.error("Failed to generate keys:", error);
}
```

:::

## Syntax

```typescript
async function createKeypair(options: {
  userId: string;
}): Promise<GenerateKeysResponse>;

type GenerateKeysResponse = {
  /** Base64URL-encoded public key string */
  publicKey: string;
  /** The user identifier */
  userId: string;
  /** The device identifier */
  deviceId: string;
};
```

## Parameters

- `options`: Object
  - An object containing configuration options:
    - `userId`: string
      - A required identifier for the user.

## Return Value

Returns a Promise that resolves to an object containing:

- `publicKey`: string
  - The base64 URL-encoded public key string.
- `userId`: string
  - The user identifier.
- `deviceId`: string
  - The device identifier.

## Exceptions

Throws a `GoodConditionsError` if key pair generation, storage, or export fails, with specific error codes for each failure type.

## Description

This function performs the following steps:

1. Generates a new ECDSA P-384 key pair using the Web Crypto API.
2. Uses a provided user identifier.
3. Securely stores the private key on the device with domain binding.
4. Exports and encodes the public key in base64url format.
5. Returns the encoded public key, user identifier, and device identifier.

The generated key pair can be used for digital signatures in authentication and verification processes. The private key is securely stored on the device and bound to the current domain, while the public key can be shared with servers or other parties for signature verification.
