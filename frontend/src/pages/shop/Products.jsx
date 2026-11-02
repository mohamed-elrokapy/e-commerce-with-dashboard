import { useSearchParams } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { filterRows, sortRows } from "../../lib/tableTools";
import Button from "../../components/ui/Button";
import SearchInput from "../../components/ui/SearchInput";
import { EmptyState } from "../../components/ui/States";
import ProductCard from "./ProductCard";
import CatalogState from "./CatalogState";

const SORTS = {
  featured: { label: "Featured", key: null },
  "price-asc": { label: "Price, low to high", key: "price", dir: "asc" },
  "price-desc": { label: "Price, high to low", key: "price", dir: "desc" },
  name: { label: "Name, A to Z", key: "title", dir: "asc" },
};

export default function Products() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const sort = SORTS[params.get("sort")] ? params.get("sort") : "featured";

  const update = (patch) => {
    const next = new URLSearchParams(params);
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    setParams(next, { replace: true });
  };

  return (
    <div className="container-page py-10 sm:py-14">
      <header className="mb-8 max-w-2xl">
        <p className="eyebrow">The menu</p>
        <h1 className="mt-1 text-4xl font-semibold">Everything we make</h1>
      </header>

      <CatalogState>
        {(items) => {
          const spec = SORTS[sort];
          const visible = sortRows(filterRows(items, q, ["title", "description"]), spec.key, spec.dir);
          return (
            <>
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <SearchInput
                  label="Search menu"
                  placeholder="Search the menu"
                  value={q}
                  onChange={(v) => update({ q: v })}
                  className="sm:w-80"
                />
                <div className="flex items-center gap-3">
                  <p className="text-sm text-ink-soft" aria-live="polite">
                    {visible.length} {visible.length === 1 ? "item" : "items"}
                  </p>
                  <label className="sr-only" htmlFor="sort">Sort by</label>
                  <select
                    id="sort"
                    className="input w-auto"
                    value={sort}
                    onChange={(e) => update({ sort: e.target.value === "featured" ? "" : e.target.value })}
                  >
                    {Object.entries(SORTS).map(([value, s]) => (
                      <option key={value} value={value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {visible.length === 0 ? (
                <div className="card">
                  <EmptyState
                    icon={MagnifyingGlassIcon}
                    title="Nothing matches that search"
                    description={`No menu item matches "${q}". Try a shorter word.`}
                    action={<Button variant="secondary" onClick={() => update({ q: "" })}>Clear search</Button>}
                  />
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {visible.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </>
          );
        }}
      </CatalogState>
    </div>
  );
}
