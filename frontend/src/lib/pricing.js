import { FREE_SHIPPING_OVER, SHIPPING_FLAT, TAX_RATE } from "./config";

const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

/**
 * Totals for a cart. `items` is an array of { product: { price }, qty }.
 * Shipping is waived above FREE_SHIPPING_OVER and for an empty cart.
 */
export function computeTotals(items) {
  const subtotal = round2(
    items.reduce((sum, { product, qty }) => sum + Number(product.price) * qty, 0)
  );
  const shipping =
    items.length === 0 || subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FLAT;
  const tax = round2(subtotal * TAX_RATE);
  const total = round2(subtotal + shipping + tax);
  const remainingForFreeShipping =
    items.length === 0 ? 0 : Math.max(0, round2(FREE_SHIPPING_OVER - subtotal));
  return { subtotal, shipping, tax, total, remainingForFreeShipping };
}
