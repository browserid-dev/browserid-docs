---
outline: deep
---

# Register Method

The `register` method allows you to register a new user with their public key and device ID in the backend system.

## Syntax

```typescript
async register(options: GenerateKeysResponse): Promise<ApiResponse>
```

## Parameters

- `options`: GenerateKeysResponse
  - An object containing:
    - `userId`: string
      - A unique identifier for the user
    - `publicKey`: string
      - The user's public key for cryptographic operations
    - `deviceId`: string
      - A unique identifier for the user's device

## Return Value

Returns a Promise that resolves to an `ApiResponse` object containing the registration status and any relevant data.

## Example

```typescript
import { Backend } from "@browserid/sdk";
import { GenerateKeysResponse } from "../types";

const backend = new Backend({
  workspaceId: "your-workspace-id",
  apiKey: "your-api-key",
});

try {
  const registerResponse = await backend.register({
    userId: "user-123",
    publicKey: "public-key-string",
    deviceId: "device-456",
  });
  console.log("Registration successful:", registerResponse);
} catch (error) {
  console.error("Registration failed:", error);
}
```

## Exceptions

- Throws an `Error` if the network request fails
- Throws an `Error` if the API returns an error response
- Throws an `Error` if required parameters are missing or invalid

## Description

The `register` method is used to register a new user in the system. During registration:

1. The user's public key is stored securely in the backend
2. The device ID is associated with the user's account
3. The user ID is linked to both the public key and device ID

This registration process is essential for subsequent cryptographic operations and challenge verifications.

## See Also

- [Backend Class](./backend-class)
- [Verify Method](./verify)
