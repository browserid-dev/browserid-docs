---
outline: deep
---

# Verify

Verifies a challenge signature with Zeroness.

:::tabs
== cURL

```curl
curl -X POST "https://api.browserid.dev/v1/workspaces/${WORKSPACE_ID}/verify" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${API_KEY}" \
-d '{"challenge": "yourChallengeHere", "signature": "yourSignatureHere", "userId": "yourUserIdHere"}'
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

  const { challenge, signature, userId } = await request.json();

  const response = await fetch(
    `https://api.browserid.dev/v1/workspaces/${WORKSPACE_ID}/verify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ challenge, signature, userId }),
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

app.post("/verify", async (req, res) => {
  const { challenge, signature, userId } = req.body;

  try {
    const response = await axios.post(
      `https://api.browserid.dev/v1/workspaces/${process.env.WORKSPACE_ID}/verify`,
      {
        challenge,
        signature,
        userId,
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
    res.status(500).json({ error: "An error occurred while verifying" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

:::
