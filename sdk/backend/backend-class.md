---
outline: deep
---

# Backend Class

The `Backend` class provides methods to interact with the backend API for user registration and challenge verification.

## Syntax

```typescript
class Backend {
  constructor(options: { workspaceId: string; apiKey: string });
}
```

## Constructor Parameters

- `options`: Object
  - `workspaceId`: string
    - The ID of your workspace. This is used to identify your application.
  - `apiKey`: string
    - The API key for authentication with the backend services.

## Example

```typescript
import { Backend } from "@browserid/sdk";

const backend = new Backend({
  workspaceId: "your-workspace-id",
  apiKey: "your-api-key",
});
```

## Description

The `Backend` class is the main entry point for interacting with the backend API. It provides methods for:

- User registration via the `register()` method
- Challenge verification via the `verify()` method

Each instance of the Backend class maintains its own configuration and state, allowing you to work with multiple workspaces if needed.

## See Also

- [Register Method](./register)
- [Verify Method](./verify)
