---
outline: deep
---

# Unlink browser

Removes all authentication data from the browser's secure storage, effectively logging out the user from the current device.

## Example

:::tabs
== Client-side (Browser)

```typescript
try {
  await frontend.unlinkBrowser();
  console.log("Browser successfully unlinked");
} catch (error) {
  console.error("Failed to unlink browser:", error);
}
```

:::

## Syntax

```typescript
async function unlinkBrowser(): Promise<void>;
```

## Parameters

None

## Return Value

Returns a Promise that resolves when all authentication data has been successfully removed.

## Exceptions

Throws a `GoodConditionsError` if:

- The database transaction fails
- Any removal operation fails
- The database cannot be opened

## Description

This function performs the following steps:

1. Opens the IndexedDB database connection
2. Creates a transaction to remove the following data:
   - Private key
   - User ID
   - Device ID
   - Hostname
3. Completes the transaction and confirms the removal

This operation is typically used when:

- Logging out a user
- Removing device authentication
- Clearing sensitive data from the browser

Once completed, the browser will no longer have access to the authentication credentials, and the user will need to generate new keys to authenticate again.
