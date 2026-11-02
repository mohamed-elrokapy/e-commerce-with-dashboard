import { Link, useNavigate } from "react-router-dom";
import { ShoppingBagIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useApp } from "../../state/hooks";
import { formatPrice } from "../../lib/format";
import { FREE_SHIPPING_OVER } from "../../lib/config";
import Button, { IconButton } from "../../components/ui/Button";
import ProductImage from "../../components/ui/ProductImage";
import QtyStepper from "../../components/ui/QtyStepper";
import { EmptyState, ErrorState, Skeleton } from "../../components/ui/States";

export function OrderSummary({ totals, children }) {
  return (
    <div className="card p-5">
      <h2 className="text-xl font-semibold">Order summary</h2>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-ink-soft">Subtotal</dt>
          <dd className="tabular-nums">{formatPrice(totals.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-soft">Shipping</dt>
          <dd className="tabular-nums">{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-soft">Tax (demo rate)</dt>
          <dd className="tabular-nums">{formatPrice(totals.tax)}</dd>
        </div>
        <div className="flex justify-between border-t border-line pt-3 text-base font-semibold">
          <dt>Total</dt>
          <dd className="tabular-nums">{formatPrice(totals.total)}</dd>
        </div>
      </dl>
      {children}
    </div>
  );
}

export default function Cart() {
  const { cart, products, loadProducts, user } = useApp();
  const navigate = useNavigate();
  const { totals } = cart;

  if (cart.loading) {
    return (
      <div className="container-page space-y-3 py-10" role="status" aria-label="Loading your cart">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (products.status === "error" && cart.count > 0) {
    return (
      <div className="container-page py-12">
        <div className="card">
          <ErrorState title="Could not load your cart items" error={products.error} onRetry={loadProducts} />
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="container-page py-12">
        <h1 className="sr-only">Your cart</h1>
        <div className="card mx-auto max-w-2xl">
          <EmptyState
            icon={ShoppingBagIcon}
            title="Your cart is empty"
            description="Add a few things from the menu and they will show up here."
            action={<Button to="/products">Browse the menu</Button>}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="text-4xl font-semibold">Your cart</h1>
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_22rem]">
        <ul className="card divide-y divide-line">
          {cart.items.map(({ product, qty }) => (
            <li key={product.id} className="flex gap-4 p-4">
              <Link to={`/products/${product.id}`} className="w-20 shrink-0 sm:w-28">
                <ProductImage
                  src={product.image}
                  title={product.title}
                  ratio="1 / 1"
                  className="rounded-md"
                />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <Link
                    dir="auto"
                    to={`/products/${product.id}`}
                    className="font-display text-lg font-semibold hover:text-syrup"
                  >
                    {product.title}
                  </Link>
                  <p className="text-sm text-ink-soft">{formatPrice(product.price)} each</p>
                </div>
                <div className="flex items-center gap-3">
                  <QtyStepper
                    value={qty}
                    label={`Quantity of ${product.title}`}
                    onChange={(n) => cart.setQty(product.id, n)}
                  />
                  <p className="w-20 text-right font-semibold tabular-nums">
                    {formatPrice(product.price * qty)}
                  </p>
                  <IconButton label={`Remove ${product.title}`} onClick={() => cart.remove(product.id)}>
                    <TrashIcon className="h-5 w-5" />
                  </IconButton>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <OrderSummary totals={totals}>
          {totals.remainingForFreeShipping > 0 ? (
            <p className="mt-4 rounded-md bg-amber-tint px-3 py-2 text-[13px] text-amber-ink">
              Add {formatPrice(totals.remainingForFreeShipping)} more for free shipping (over{" "}
              {formatPrice(FREE_SHIPPING_OVER)}).
            </p>
          ) : (
            <p className="mt-4 rounded-md bg-leaf-tint px-3 py-2 text-[13px] text-leaf">
              Your order ships free.
            </p>
          )}
          <Button
            className="mt-5 w-full"
            onClick={() => navigate(user ? "/checkout" : "/login", { state: { from: "/checkout" } })}
          >
            {user ? "Go to checkout" : "Sign in to check out"}
          </Button>
          <Button variant="ghost" size="sm" to="/products" className="mt-2 w-full">
            Keep browsing
          </Button>
        </OrderSummary>
      </div>
    </div>
  );
}
