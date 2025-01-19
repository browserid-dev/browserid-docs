---
outline: deep
---

# Rate Limiting

The goal of rate limiting is to prevent abuse and ensure fair usage of resources. By controlling the number of requests a user or system can make to an API, we maintain optimal performance and security.

Our API employs a rate limiting strategy to balance accessibility with protection against misuse. Below are the specifics of our rate limiting policy:

## Rate Limit:
- `api.zeroness.dev`: 100 requests per second
- `lite.zeroness.dev`: 5 requests per second
