---
outline: deep
---

# Register

Registers a public key with BrowserID for later verification.

:::tabs
== cURL

```curl
curl -X POST "https://api.browserid.dev/v1/workspaces/${WORKSPACE_ID}/register" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${API_KEY}" \
-d '{"userId": "123", "publicKey": "yourPublicKeyHere", "deviceId": "123"}'
```

== Cloudflare Worker

```javascript
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const { userId, publicKey, deviceId } = await request.json();

  const response = await fetch(
    `https://api.browserid.dev/v1/workspaces/${WORKSPACE_ID}/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ userId, publicKey, deviceId }),
    }
  );

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
```

== Node.js

```javascript
const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {
  const { userId, publicKey, deviceId } = req.body;

  try {
    const response = await axios.post(
      `https://api.browserid.dev/v1/workspaces/${process.env.WORKSPACE_ID}/register`,
      {
        userId,
        publicKey,
        deviceId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while registering" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

:::
