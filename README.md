# @sandsoftwaresolutions/webhooks

[![CI](https://github.com/SandSoftwareSolutions/ss-webhooks/actions/workflows/ci.yml/badge.svg)](https://github.com/SandSoftwareSolutions/ss-webhooks/actions/workflows/ci.yml)

Web Crypto HMAC-SHA256 helpers for signing outbound webhooks and verifying incoming webhooks. Compatible with Node.js 18+, workers and modern browsers.

## Install

```bash
npm install @sandsoftwaresolutions/webhooks
```

## Verify an incoming webhook

```js
import { verify } from "@sandsoftwaresolutions/webhooks";

const rawBody = await request.text(); // Do not JSON.parse before verification
const valid = await verify(rawBody, request.headers.get("x-signature"), process.env.WEBHOOK_SECRET);
if (!valid) return new Response("Invalid signature", { status: 401 });
```

## Sign an outgoing webhook

```js
import { sign } from "@sandsoftwaresolutions/webhooks";

const body = JSON.stringify({ event: "invoice.paid", data: invoice });
const signature = await sign(body, process.env.WEBHOOK_SECRET);
```

`sign(payload, secret)` returns `sha256=<hex>`. `verify(payload, signature, secret)` returns a boolean and compares signatures safely. Use a long secret, preserve the exact raw request body, and add timestamp/replay protection in your webhook protocol.
