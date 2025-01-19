---
outline: deep
---

# Storage

Zeroness uses a combination of secure browser and server-side storage.
- The public key is stored on our servers.
- The user ID is stored in the user's browser.
- The user ID is provided by the user at runtime and never stored.

Using a combination of browser, user ID, and server-side storage allows Zeroness to offer a seamless user experience while also providing a high degree of security.

## Browser Storage

Both the public key and userId are securely stored in the user's browser's [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) indefinitely* or until the user deletes it.

IndexedDB follows the [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy), similar to how secure cookies work, so the private key and nounce are only accessible by the same website/hostname.

Refrences:
- [When is data evicted?](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria#when_is_data_evicted)
- [How is data evicted?](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria#how_is_data_evicted)

### Private Key

When a user's device generates a key pair, the private key is stored in the user's browser's IndexedDB and never leaves the user's browser.

### User ID

The user ID is a value that is provided by the user or your service and is stored in the user's browser's IndexedDB.

## Server Storage

### Public Key

The user's public key is stored within the [user's instance of Zeroness](./scalability) and only accessible by using a combination of a nounce and user ID and a few additional checks.

## References

### What is the same-origin policy?
A security mechanism that limits how documents and scripts from one origin can interact with resources from another origin.

### What is an origin?
An origin is defined by the scheme (protocol), host (domain), and port.

### How does the same-origin policy work with IndexedDB?
Each origin has it's own set of databases, and each database has a unique name within it's origin. For example, an app on https://example.com/app/ can access databases named `app` and `app2` but not `https://another-example.com/app/` databases.

The same-origin policy helps to:
- Isolate data between different origins
- Prevent malicious websites from reading sensitive data from other websites