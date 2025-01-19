---
outline: deep
---

# Longevity

As the private key and user ID are used to [initiate a Zeroness instance](./scalability.md), they are required when accessing the user's public key within their unique instance. If the user regenerates their key pair, a new instance is initiated with isolated storage. The old instance, along with the previous public key will hibernate and eventually be evicted from Zeroness.

The user or your service can rotate their key pair as often as they like.
