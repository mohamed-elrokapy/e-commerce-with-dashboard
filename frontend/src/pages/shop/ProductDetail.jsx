import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useApp } from "../../state/hooks";
import { formatPrice } from "../../lib/format";
import Button from "../../components/ui/Button";
import ProductImage from "../../components/ui/ProductImage";
import QtyStepper from "../../components/ui/QtyStepper";
import { EmptyState, ErrorState, Skeleton } from "../../components/ui/States";
import ProductCard from "./ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const { products, loadProducts, cart, notify } = useApp();
  const [qty, setQty] = useState(1);

  const loading = products.status === "loading" || products.status === "idle";
  const product = products.items.find((p) => p.id === id);

  if (loading) {
    return (
      <div className="container-page grid gap-10 py-10 md:grid-cols-2">
        <Skeleton className="aspect-[4/3] w-full" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  if (products.status === "error") {
    return (
      <div className="container-page py-12">
        <div className="card">
          <ErrorState title="Could not load this product" error={products.error} onRetry={loadProducts} />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-page py-12">
        <div className="card">
          <EmptyState
            title="That product is not on the menu"
            description="It may have been removed, or the link is wrong."
            action={<Button to="/products">Back to the menu</Button>}
          />
        </div>
      </div>
    );
  }

  const related = products.items.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="container-page py-8 sm:py-12">
      <Link
        to="/products"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink"
      >
        <ArrowLeftIcon className="h-4 w-4" /> Back to the menu
      </Link>

      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="card overflow-hidden">
          <ProductImage src={product.image} title={product.title} ratio="1 / 1" />
        </div>
        <div className="flex flex-col">
          <p className="eyebrow">Menu item</p>
          <h1 dir="auto" className="mt-1 text-3xl font-semibold sm:text-4xl">{product.title}</h1>
          <p className="mt-3 text-2xl font-semibold tabular-nums text-syrup-dark">
            {formatPrice(product.price)}
          </p>
          <p dir="auto" className="mt-5 text-base leading-relaxed text-ink-soft">{product.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-6">
            <QtyStepper value={qty} onChange={setQty} label={`Quantity of ${product.title}`} />
            <Button
              onClick={() => {
                cart.add(product.id, qty);
                notify(`${qty} x ${product.title} added to your cart.`);
                setQty(1);
              }}
            >
              Add to cart, {formatPrice(product.price * qty)}
            </Button>
            <Button variant="ghost" to="/shopingcartpage">
              View cart
            </Button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16" aria-labelledby="related-title">
          <h2 id="related-title" className="mb-5 text-2xl font-semibold">
            More from the menu
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
