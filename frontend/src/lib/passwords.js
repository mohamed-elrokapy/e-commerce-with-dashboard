// Salted PBKDF2 hashing via WebCrypto. Used only by the browser-side demo
// backend so that demo accounts are never stored or compared as plain text.
// A real backend (Firebase Auth, Strapi) hashes passwords on the server.

const ITERATIONS = 100_000;
const enc = new TextEncoder();

const toHex = (buf) =>
  Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");

const fromHex = (hex) =>
  new Uint8Array(hex.match(/.{2}/g).map((byte) => parseInt(byte, 16)));

async function derive(password, saltBytes) {
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) {
    throw new Error(
      "Demo sign-in needs a secure context (https:// or http://localhost)."
    );
  }
  const key = await subtle.importKey("raw", enc.encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: saltBytes, iterations: ITERATIONS },
    key,
    256
  );
  return toHex(bits);
}

export async function hashPassword(password) {
  const saltBytes = globalThis.crypto.getRandomValues(new Uint8Array(16));
  return { salt: toHex(saltBytes), hash: await derive(password, saltBytes) };
}

export async function verifyPassword(password, { salt, hash }) {
  if (!salt || !hash) return false;
  return (await derive(password, fromHex(salt))) === hash;
}
