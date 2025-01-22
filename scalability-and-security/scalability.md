---
outline: deep
---

# Scalability

BrowserID is built on top of [Cloudflare Durable Objects](https://www.cloudflare.com/developer-platform/durable-objects/), which can scale to hundreds of millions of users/registrations on demand. Each user initiates a unique instance of BrowserID with its own persisted storage. Only this instance has access to the specific user's public key. Based on the user's location, the instance is hosted in the closest region to the user for optimal performance.

This architecture allows BrowserID to handle almost an infinite number of registrations and verifications efficiently while maintaining a high level of security and performance.
