---
outline: deep
---

# Generate keys

Generates a cryptographic key pair (ECDSA P-384) for digital signatures, stores the private key securely, and returns the public key along with a user identifier.

## Example

:::tabs
== Client-side (Browser)
```typescript
try {
    const { publicKey, userId } = await generateKeys({ userId: 'user123' });
    console.log(`Public Key: ${publicKey}`);
    console.log(`User ID: ${userId}`);
} catch (error) {
    console.error("Failed to generate keys:", error);
}
```
:::

## Syntax

```typescript
async function generateKeys(options: GenerateKeysOptions): Promise<GenerateKeysResponse>

type GenerateKeysOptions = {
    /** Optional user identifier. If not provided, a random UUID will be generated */
    userId?: string;
}

type GenerateKeysResponse = {
    /** Base64URL-encoded public key string */
    publicKey: string;
    /** The user identifier (either provided or generated) */
    userId: string;
}
```

## Parameters

- `options`: GenerateKeysOptions
  - An object containing configuration options:
    - `userId` (optional): string
      - A custom identifier for the user. If not provided, a random UUID will be generated.

## Return Value

Returns a Promise that resolves to an object containing:

- `publicKey`: string
  - The base64 URL-encoded public key string.
- `userId`: string
  - The user identifier (either the provided userId or a generated UUID).

## Exceptions

Throws an `Error` if key pair generation or storage fails.

## Description

This function performs the following steps:

1. Generates a new ECDSA P-384 key pair using the Web Crypto API.
2. Creates or uses a provided user identifier.
3. Securely stores the private key in IndexedDB with domain binding.
4. Exports and encodes the public key in base64url format.
5. Returns the encoded public key and user identifier.

The generated key pair can be used for digital signatures in authentication and verification processes. The private key is securely stored on the device and bound to the current domain, while the public key can be shared with servers or other parties for signature verification.

