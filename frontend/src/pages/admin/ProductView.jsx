import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { formatDate, formatPrice } from "../../lib/format";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import ProductImage from "../../components/ui/ProductImage";
import { ErrorState, Skeleton } from "../../components/ui/States";
import ProductMissing from "./ProductMissing";
import { useProductParam } from "./useProductParam";

export default function ProductView() {
  const { id, product, loading, error, retry } = useProductParam();

  if (loading) return <Skeleton className="h-96 w-full" />;
  if (error) return <div className="card"><ErrorState error={error} onRetry={retry} /></div>;
  if (!product) return <ProductMissing id={id} />;

  return (
    <>
      <PageHeader
        title={product.title}
        description="Product details"
        actions={
          <>
            <Button variant="secondary" to="/admin/products">Back</Button>
            <Button to={`/admin/productedit/${product.id}`}><PencilSquareIcon className="h-4 w-4" /> Edit</Button>
          </>
        }
      />
      <div className="card grid gap-6 p-5 sm:p-6 md:grid-cols-[16rem_1fr]">
        <div className="overflow-hidden rounded-md border border-line">
          <ProductImage src={product.image} title={product.title} ratio="1 / 1" />
        </div>
        <dl className="space-y-4 text-sm">
          <div><dt className="text-ink-soft">Price</dt><dd className="mt-0.5 text-lg font-semibold">{formatPrice(product.price)}</dd></div>
          <div><dt className="text-ink-soft">Description</dt><dd dir="auto" className="mt-0.5">{product.description}</dd></div>
          <div><dt className="text-ink-soft">Added</dt><dd className="mt-0.5">{formatDate(product.createdAt) || "n/a"}</dd></div>
          <div><dt className="text-ink-soft">Image URL</dt><dd className="mt-0.5 break-all">{product.image || "None"}</dd></div>
        </dl>
      </div>
    </>
  );
}
