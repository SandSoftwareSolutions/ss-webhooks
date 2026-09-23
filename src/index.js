const encoder = new TextEncoder();
const toHex = (bytes) => Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");

async function key(secret) {
  if (typeof secret !== "string" || !secret) throw new TypeError("secret must be a non-empty string");
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

export async function sign(payload, secret) {
  if (typeof payload !== "string") throw new TypeError("payload must be a string");
  const signature = await crypto.subtle.sign("HMAC", await key(secret), encoder.encode(payload));
  return `sha256=${toHex(new Uint8Array(signature))}`;
}

export async function verify(payload, signature, secret) {
  if (typeof signature !== "string" || !signature.startsWith("sha256=")) return false;
  const expected = await sign(payload, secret);
  if (signature.length !== expected.length) return false;
  let mismatch = 0;
  for (let index = 0; index < expected.length; index += 1) mismatch |= expected.charCodeAt(index) ^ signature.charCodeAt(index);
  return mismatch === 0;
}
