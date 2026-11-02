import { getStrapiUrl, isDemoForced } from "../lib/config";
import { createDemoBackend } from "./demoBackend";
import { createStrapiBackend } from "./strapiBackend";

/**
 * Picks the backend once at startup.
 * - Strapi when VITE_STRAPI_API_END_POINT is set (and demo is not forced).
 * - Otherwise the browser-only demo backend.
 */
export async function createBackend() {
  const url = getStrapiUrl();
  if (url && !isDemoForced()) return createStrapiBackend(url);
  return createDemoBackend();
}
