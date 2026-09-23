# @sandsoftwaresolutions/webhooks

Small Web Crypto HMAC-SHA256 helpers for webhook consumers and senders.

```js
import { sign, verify } from "@sandsoftwaresolutions/webhooks";

const signature = await sign(requestBody, process.env.WEBHOOK_SECRET);
const authentic = await verify(requestBody, signature, process.env.WEBHOOK_SECRET);
```

Signatures use the conventional `sha256=<hex>` format. Requires Node.js 18+ or a browser/worker with Web Crypto.
