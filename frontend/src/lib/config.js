// Central place for environment-driven settings and demo store rules.

const env = import.meta.env;

// Copy that differs between deployments of this storefront.
export const STORE = {
  name: "Eldopal",
  eyebrow: "Pancakes, waffles, sweet things",
  heroTitle: "Breakfast you order once and think about twice.",
  heroText:
    "Browse the menu, build a cart and check out. This is a demo storefront, so there is no real kitchen behind it, but every screen works.",
  footerText: "A demo storefront with a cart, checkout and an admin dashboard.",
  description:
    "Eldopal is a demo online shop with a storefront, cart, checkout and an admin dashboard, built with React, Vite, Tailwind CSS and Strapi.",
};
export const STORE_NAME = STORE.name;

// Demo store rules used by the cart and checkout. Not real business logic.
export const TAX_RATE = 0.05;
export const SHIPPING_FLAT = 5;
export const FREE_SHIPPING_OVER = 50;

const FORCE_DEMO_KEY = "shopdemo.forceDemo";

export function isDemoForced() {
  try {
    return (
      env.VITE_BACKEND === "demo" || localStorage.getItem(FORCE_DEMO_KEY) === "1"
    );
  } catch {
    return env.VITE_BACKEND === "demo";
  }
}

export function setDemoForced(value) {
  try {
    if (value) localStorage.setItem(FORCE_DEMO_KEY, "1");
    else localStorage.removeItem(FORCE_DEMO_KEY);
  } catch {
    /* storage unavailable */
  }
}

/**
 * Strapi REST base URL from VITE_STRAPI_API_END_POINT. Accepts the server root
 * (http://localhost:1337) or the API root (http://localhost:1337/api).
 */
export function getStrapiUrl() {
  const raw = String(env.VITE_STRAPI_API_END_POINT ?? "").trim().replace(/\/+$/, "");
  if (!raw) return null;
  return raw.endsWith("/api") ? raw : `${raw}/api`;
}
