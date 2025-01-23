---
outline: deep
---

# Verify Method

The `verify` method validates cryptographic challenges using the backend API.

## Syntax

```typescript
async verify(options: CreateChallengeResponse): Promise<ApiResponse>
```

## Parameters

- `options`: CreateChallengeResponse
  - An object containing:
    - `challenge`: string
      - The challenge string to be verified
    - `signature`: string
      - The cryptographic signature of the challenge
    - `userId`: string
      - The ID of the user performing the verification
    - `deviceId`: string
      - The ID of the device used for verification

## Return Value

Returns a Promise that resolves to an `ApiResponse` object containing the verification status and any relevant data.

## Example

```typescript
import { Backend } from "@browserid/sdk";
import { CreateChallengeResponse } from "../types";

const backend = new Backend({
  workspaceId: "your-workspace-id",
  apiKey: "your-api-key",
});

try {
  const verifyResponse = await backend.verify({
    challenge: "challenge-string",
    signature: "signature-string",
    userId: "user-123",
    deviceId: "device-456",
  });
  console.log("Verification successful:", verifyResponse);
} catch (error) {
  console.error("Verification failed:", error);
}
```

## Exceptions

- Throws an `Error` if the network request fails
- Throws an `Error` if the API returns an error response
- Throws an `Error` if the challenge verification fails
- Throws an `Error` if required parameters are missing or invalid

## Description

The `verify` method is used to validate cryptographic challenges. The verification process:

1. Takes a challenge string and its corresponding signature
2. Verifies the signature using the stored public key associated with the user
3. Confirms the device ID matches the registered device
4. Returns the verification result

This method is crucial for:

- Authenticating user actions
- Validating cryptographic operations
- Ensuring secure communication between client and server

## See Also

- [Backend Class](./backend-class)
- [Register Method](./register)
