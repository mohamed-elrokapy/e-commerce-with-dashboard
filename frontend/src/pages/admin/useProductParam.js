import { useParams } from "react-router-dom";
import { useApp } from "../../state/hooks";

export function useProductParam() {
  const { id } = useParams();
  const { products, loadProducts } = useApp();
  const loading = products.status === "loading" || products.status === "idle";
  return {
    id,
    loading,
    error: products.status === "error" ? products.error : null,
    retry: loadProducts,
    product: id ? products.items.find((p) => p.id === id) : undefined,
  };
}
