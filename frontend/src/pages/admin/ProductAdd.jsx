import { useNavigate } from "react-router-dom";
import { useApp } from "../../state/hooks";
import PageHeader from "../../components/ui/PageHeader";
import ProductForm from "./ProductForm";

export default function ProductAdd() {
  const { createProduct, notify } = useApp();
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="Add product" description="New products appear on the menu straight away." />
      <ProductForm
        submitLabel="Create product"
        onCancel={() => navigate("/admin/products")}
        onSubmit={async (values) => {
          try {
            const created = await createProduct(values);
            notify(`${created.title} was added.`);
            navigate("/admin/products");
          } catch (error) {
            notify(error.message, "error");
          }
        }}
      />
    </>
  );
}
