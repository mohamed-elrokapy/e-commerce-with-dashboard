import { describe, expect, it } from "vitest";
import { isHttpUrl, validateProduct } from "./validation";

const valid = { title: "Pizza", price: "12.5", description: "Tomato and cheese", image: "" };

describe("validateProduct", () => {
  it("accepts a valid product, with or without an image", () => {
    expect(validateProduct(valid)).toEqual({});
    expect(validateProduct({ ...valid, image: "https://example.com/a.jpg" })).toEqual({});
  });
  it("rejects missing fields", () => {
    expect(Object.keys(validateProduct({ title: "", price: "", description: "" }))).toEqual([
      "title",
      "price",
      "description",
    ]);
  });
  it("rejects zero, negative and non numeric prices", () => {
    for (const price of ["0", "-3", "abc"]) {
      expect(validateProduct({ ...valid, price }).price).toBeTruthy();
    }
  });
  it("rejects non http(s) image URLs", () => {
    expect(validateProduct({ ...valid, image: "javascript:alert(1)" }).image).toBeTruthy();
    expect(isHttpUrl("ftp://x.test/a.png")).toBe(false);
  });
});
