import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useApp } from "../../state/hooks";
import { formatPrice } from "../../lib/format";
import { emailRule, nameRule, phoneRule } from "../../lib/validation";
import Button from "../../components/ui/Button";
import Field from "../../components/ui/Field";
import { EmptyState } from "../../components/ui/States";
import { OrderSummary } from "./Cart";

function orderReference() {
  return `EL-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

export default function Checkout() {
  const { cart, user, notify } = useApp();
  const [placed, setPlaced] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: user?.fullName ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      address: "",
      city: "",
      postalCode: "",
      notes: "",
    },
  });

  if (placed) {
    return (
      <div className="container-page py-14">
        <div className="card mx-auto max-w-xl">
          <EmptyState
            icon={CheckCircleIcon}
            title="Order placed"
            description={`Reference ${placed.reference}. Total ${formatPrice(placed.total)}. This is a demo: no payment was taken and nothing was sent to a kitchen.`}
            action={<Button to="/products">Keep browsing</Button>}
          />
        </div>
      </div>
    );
  }

  if (cart.loading) return null;

  if (cart.items.length === 0) {
    return (
      <div className="container-page py-14">
        <div className="card mx-auto max-w-xl">
          <EmptyState
            title="Nothing to check out"
            description="Your cart is empty."
            action={<Button to="/products">Browse the menu</Button>}
          />
        </div>
      </div>
    );
  }

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 400));
    setPlaced({ reference: orderReference(), total: cart.totals.total });
    cart.clear();
    notify("Order placed. This was a demo checkout.");
  };

  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="text-4xl font-semibold">Checkout</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Demo checkout. No payment details are collected and nothing is stored.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_22rem]"
      >
        <div className="space-y-6">
          <fieldset className="card grid gap-4 p-5 sm:grid-cols-2">
            <legend className="sr-only">Contact</legend>
            <h2 className="text-xl font-semibold sm:col-span-2">Contact</h2>
            <Field label="Full name" autoComplete="name" error={errors.fullName?.message} {...register("fullName", nameRule)} />
            <Field label="Phone" type="tel" autoComplete="tel" error={errors.phone?.message} {...register("phone", phoneRule)} />
            <Field className="sm:col-span-2" label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email", emailRule)} />
          </fieldset>

          <fieldset className="card grid gap-4 p-5 sm:grid-cols-2">
            <legend className="sr-only">Delivery address</legend>
            <h2 className="text-xl font-semibold sm:col-span-2">Delivery address</h2>
            <Field className="sm:col-span-2" label="Street address" autoComplete="street-address" error={errors.address?.message} {...register("address", { required: "Address is required" })} />
            <Field label="City" autoComplete="address-level2" error={errors.city?.message} {...register("city", { required: "City is required" })} />
            <Field label="Postal code" autoComplete="postal-code" error={errors.postalCode?.message} {...register("postalCode", { required: "Postal code is required" })} />
            <Field className="sm:col-span-2" as="textarea" rows={3} label="Delivery notes (optional)" {...register("notes")} />
          </fieldset>

          <div className="card p-5">
            <h2 className="text-xl font-semibold">Payment</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Pay on delivery (demo). A real integration would hand off to a payment provider here.
            </p>
          </div>
        </div>

        <OrderSummary totals={cart.totals}>
          <ul className="mt-4 space-y-1 border-t border-line pt-4 text-sm text-ink-soft">
            {cart.items.map(({ product, qty }) => (
              <li key={product.id} className="flex justify-between gap-3">
                <span className="flex min-w-0 gap-1"><span>{qty} x</span> <span dir="auto" className="truncate">{product.title}</span></span>
                <span className="tabular-nums">{formatPrice(product.price * qty)}</span>
              </li>
            ))}
          </ul>
          <Button type="submit" className="mt-5 w-full" loading={isSubmitting}>
            Place order, {formatPrice(cart.totals.total)}
          </Button>
          <Link to="/shopingcartpage" className="mt-3 block text-center text-sm text-ink-soft hover:text-ink">
            Back to cart
          </Link>
        </OrderSummary>
      </form>
    </div>
  );
}
