import { describe, expect, it } from "vitest";
import { filterRows, paginate, sortRows } from "./tableTools";

const rows = [
  { id: 1, title: "Pizza", price: 12.99, note: "cheese" },
  { id: 2, title: "burger", price: 10.5, note: "Beef" },
  { id: 3, title: "Falafel", price: 6.5, note: "" },
  { id: 4, title: "Koshari", price: 6.5, note: null },
];

describe("filterRows", () => {
  it("matches case-insensitively across the given keys", () => {
    expect(filterRows(rows, "BEEF", ["title", "note"]).map((r) => r.id)).toEqual([2]);
  });
  it("returns everything for an empty query and tolerates null fields", () => {
    expect(filterRows(rows, "  ", ["note"])).toHaveLength(4);
    expect(filterRows(rows, "null", ["note"])).toHaveLength(0);
  });
});

describe("sortRows", () => {
  it("sorts numbers numerically, both directions", () => {
    expect(sortRows(rows, "price", "asc").map((r) => r.id)).toEqual([3, 4, 2, 1]);
    expect(sortRows(rows, "price", "desc").map((r) => r.id)).toEqual([1, 2, 3, 4]);
  });
  it("is stable for equal keys and ignores letter case for text", () => {
    expect(sortRows(rows, "title", "asc").map((r) => r.title)).toEqual([
      "burger",
      "Falafel",
      "Koshari",
      "Pizza",
    ]);
  });
  it("does not mutate the input", () => {
    const copy = [...rows];
    sortRows(rows, "price", "asc");
    expect(rows).toEqual(copy);
  });
});

describe("paginate", () => {
  it("clamps the page into range", () => {
    expect(paginate(rows, 99, 3)).toMatchObject({ page: 2, pageCount: 2 });
    expect(paginate(rows, 99, 3).rows).toHaveLength(1);
    expect(paginate([], 1, 5)).toMatchObject({ page: 1, pageCount: 1, rows: [] });
  });
});
