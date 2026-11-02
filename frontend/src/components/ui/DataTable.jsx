import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

/**
 * Sortable table. Columns: { key, label, sortable, render(row), className,
 * hideBelow: "sm" | "md" | "lg" } . The sort state is owned by the caller.
 */
const hide = { sm: "hidden sm:table-cell", md: "hidden md:table-cell", lg: "hidden lg:table-cell" };

export default function DataTable({ columns, rows, sortKey, sortDir, onSort, rowKey = (r) => r.id, caption }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line bg-paper-2/60 text-xs uppercase tracking-wide text-ink-soft">
            {columns.map((col) => {
              const active = sortKey === col.key;
              const ariaSort = col.sortable
                ? active
                  ? sortDir === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
                : undefined;
              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={ariaSort}
                  className={`px-3 py-3 font-semibold sm:px-4 ${col.hideBelow ? hide[col.hideBelow] : ""} ${col.className ?? ""}`}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => onSort(col.key)}
                      className="inline-flex items-center gap-1 rounded uppercase tracking-wide hover:text-ink"
                    >
                      {col.label}
                      <span className="inline-flex w-4 flex-col" aria-hidden="true">
                        {active ? (
                          sortDir === "asc" ? (
                            <ChevronUpIcon className="h-4 w-4 text-syrup" />
                          ) : (
                            <ChevronDownIcon className="h-4 w-4 text-syrup" />
                          )
                        ) : (
                          <ChevronDownIcon className="h-4 w-4 opacity-30" />
                        )}
                      </span>
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((row) => (
            <tr key={rowKey(row)} className="hover:bg-paper/70">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-3 py-3 align-middle sm:px-4 ${col.hideBelow ? hide[col.hideBelow] : ""} ${col.className ?? ""}`}
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
