---
outline: deep
---

# Scalability

Zeroness is built on top of   [Cloudflare Durable Objects](https://www.cloudflare.com/developer-platform/durable-objects/), which can scale to hundreds of millions of users on demand. Each user initiates a unique instance of Zeroness with its own persisted storage. Only this instance has access to the specific user's public key. Based on the user's location, the instance is hosted in the closest region to the user for performance.

This architecture allows Zeroness to handle almost an infinite number of users efficiently while maintaining a high level of security and performance. In the highly unlikely event that one user's instance is compromised, it only affects the specific user and not other users.
