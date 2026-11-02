import { useNavigate } from "react-router-dom";
import { useApp } from "../../state/hooks";
import PageHeader from "../../components/ui/PageHeader";
import { ErrorState, Skeleton } from "../../components/ui/States";
import ProductForm from "./ProductForm";
import ProductMissing from "./ProductMissing";
import { useProductParam } from "./useProductParam";

export default function ProductEdit() {
  const { updateProduct, notify } = useApp();
  const navigate = useNavigate();
  const { id, product, loading, error, retry } = useProductParam();

  if (loading) return <Skeleton className="h-96 w-full" />;
  if (error) return <div className="card"><ErrorState error={error} onRetry={retry} /></div>;
  if (!product) return <ProductMissing id={id} />;

  return (
    <>
      <PageHeader title="Edit product" description={product.title} />
      <ProductForm
        key={product.id}
        initial={product}
        submitLabel="Save changes"
        onCancel={() => navigate("/admin/products")}
        onSubmit={async (values) => {
          try {
            await updateProduct(product.id, values);
            notify(`${values.title} was updated.`);
            navigate("/admin/products");
          } catch (e) {
            notify(e.message, "error");
          }
        }}
      />
    </>
  );
}
