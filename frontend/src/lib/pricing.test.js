import { describe, expect, it } from "vitest";
import { computeTotals } from "./pricing";
import { FREE_SHIPPING_OVER, SHIPPING_FLAT, TAX_RATE } from "./config";

const line = (price, qty) => ({ product: { price }, qty });

describe("computeTotals", () => {
  it("returns zeros for an empty cart", () => {
    expect(computeTotals([])).toEqual({
      subtotal: 0,
      shipping: 0,
      tax: 0,
      total: 0,
      remainingForFreeShipping: 0,
    });
  });

  it("adds flat shipping and tax below the free shipping threshold", () => {
    const t = computeTotals([line(10, 2), line(5.5, 1)]);
    expect(t.subtotal).toBe(25.5);
    expect(t.shipping).toBe(SHIPPING_FLAT);
    expect(t.tax).toBe(Math.round(25.5 * TAX_RATE * 100) / 100);
    expect(t.total).toBeCloseTo(t.subtotal + t.shipping + t.tax, 2);
    expect(t.remainingForFreeShipping).toBeCloseTo(FREE_SHIPPING_OVER - 25.5, 2);
  });

  it("waives shipping at or above the threshold", () => {
    const t = computeTotals([line(FREE_SHIPPING_OVER, 1)]);
    expect(t.shipping).toBe(0);
    expect(t.remainingForFreeShipping).toBe(0);
  });

  it("avoids floating point drift", () => {
    expect(computeTotals([line(0.1, 3)]).subtotal).toBe(0.3);
  });
});
