import Button from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/States";

export default function ProductMissing({ id }) {
  return (
    <div className="card">
      <EmptyState
        title={id ? "Product not found" : "Choose a product first"}
        description={id ? "It may have been deleted." : "Open a product from the products list."}
        action={<Button to="/admin/products">Back to products</Button>}
      />
    </div>
  );
}
