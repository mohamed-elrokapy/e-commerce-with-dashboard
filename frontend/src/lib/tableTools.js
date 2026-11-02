/** Case-insensitive search over the given keys. */
export function filterRows(rows, query, keys) {
  const q = String(query ?? "").trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((row) =>
    keys.some((key) =>
      String(row[key] ?? "")
        .toLowerCase()
        .includes(q)
    )
  );
}

/** Stable sort by key. Numbers sort numerically, everything else by locale. */
export function sortRows(rows, key, direction = "asc") {
  if (!key) return rows;
  const dir = direction === "desc" ? -1 : 1;
  return rows
    .map((row, index) => ({ row, index }))
    .sort((a, b) => {
      const av = a.row[key];
      const bv = b.row[key];
      let result;
      if (typeof av === "number" && typeof bv === "number") result = av - bv;
      else
        result = String(av ?? "").localeCompare(String(bv ?? ""), undefined, {
          sensitivity: "base",
          numeric: true,
        });
      return result !== 0 ? result * dir : a.index - b.index;
    })
    .map(({ row }) => row);
}

export function paginate(rows, page, pageSize) {
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const current = Math.min(Math.max(1, page), pageCount);
  const start = (current - 1) * pageSize;
  return { rows: rows.slice(start, start + pageSize), page: current, pageCount };
}
