import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useApp } from "../../state/hooks";
import { STORE } from "../../lib/config";
import { formatPrice } from "../../lib/format";
import Button from "../../components/ui/Button";
import { Skeleton } from "../../components/ui/States";
import ProductCard from "./ProductCard";
import CatalogState from "./CatalogState";

function MenuPreview() {
  const { products } = useApp();
  const items = products.items.slice(0, 4);
  return (
    <aside
      aria-label="A preview of the menu"
      className="relative rounded-xl border border-line bg-white p-6 shadow-card sm:p-8"
    >
      <p className="eyebrow">On the menu</p>
      <ul className="mt-4 divide-y divide-dashed divide-line-strong">
        {products.status === "ready" && items.length > 0
          ? items.map((p) => (
              <li key={p.id} className="flex items-baseline justify-between gap-4 py-3">
                <Link
                  dir="auto"
                  to={`/products/${p.id}`}
                  className="font-display text-lg font-medium hover:text-syrup"
                >
                  {p.title}
                </Link>
                <span className="shrink-0 font-semibold tabular-nums text-syrup-dark">
                  {formatPrice(p.price)}
                </span>
              </li>
            ))
          : Array.from({ length: 4 }, (_, i) => (
              <li key={i} className="py-3.5">
                <Skeleton className="h-5 w-full" />
              </li>
            ))}
      </ul>
      <Link
        to="/products"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-syrup hover:text-syrup-dark"
      >
        See the full menu <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </aside>
  );
}

export default function Home() {
  return (
    <>
      <section className="border-b border-line bg-paper-2/50">
        <div className="container-page grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr]">
          <div className="fade-in">
            <p className="eyebrow">{STORE.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
              {STORE.heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-base text-ink-soft sm:text-lg">{STORE.heroText}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/products">Browse the menu</Button>
              <Button to="/signup" variant="secondary">
                Create an account
              </Button>
            </div>
          </div>
          <MenuPreview />
        </div>
      </section>

      <section className="container-page pt-14" aria-labelledby="featured-title">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Featured</p>
            <h2 id="featured-title" className="mt-1 text-3xl font-semibold">
              Start with these
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden items-center gap-1.5 text-sm font-semibold text-syrup hover:text-syrup-dark sm:inline-flex"
          >
            View all <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <CatalogState skeletonCount={3}>
          {(items) => (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.slice(0, 6).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </CatalogState>
      </section>
    </>
  );
}
