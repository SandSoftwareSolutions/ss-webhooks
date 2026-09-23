import assert from "node:assert/strict";
import test from "node:test";
import { sign, verify } from "./src/index.js";
test("signs and verifies a payload", async () => {
  const signature = await sign('{"event":"invoice.paid"}', "test-secret");
  assert.match(signature, /^sha256=[a-f0-9]{64}$/);
  assert.equal(await verify('{"event":"invoice.paid"}', signature, "test-secret"), true);
});
test("rejects a changed payload", async () => assert.equal(await verify("other", await sign("original", "test-secret"), "test-secret"), false));
