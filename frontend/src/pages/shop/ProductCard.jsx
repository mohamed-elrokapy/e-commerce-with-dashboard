import { Link } from "react-router-dom";
import { formatPrice } from "../../lib/format";
import { useApp } from "../../state/hooks";
import Button from "../../components/ui/Button";
import ProductImage from "../../components/ui/ProductImage";

export default function ProductCard({ product }) {
  const { cart, notify } = useApp();
  const inCart = cart.items.find((l) => l.product.id === product.id)?.qty ?? 0;

  return (
    <article className="card group relative flex flex-col overflow-hidden transition-shadow hover:shadow-pop">
      <ProductImage
        src={product.image}
        title={product.title}
        className="transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 dir="auto" className="font-display text-lg font-semibold leading-snug">
            <Link
              to={`/products/${product.id}`}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:after:rounded-lg"
            >
              {product.title}
            </Link>
          </h3>
          <p className="shrink-0 font-semibold tabular-nums text-syrup-dark">
            {formatPrice(product.price)}
          </p>
        </div>
        <p dir="auto" className="mt-1.5 line-clamp-2 text-sm text-ink-soft">{product.description}</p>
        <div className="relative z-10 mt-4 flex items-center justify-between pt-1">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              cart.add(product.id);
              notify(`${product.title} added to your cart.`);
            }}
            aria-label={`Add ${product.title} to cart`}
          >
            Add to cart
          </Button>
          {inCart > 0 && <span className="text-xs font-medium text-leaf">{inCart} in cart</span>}
        </div>
      </div>
    </article>
  );
}
