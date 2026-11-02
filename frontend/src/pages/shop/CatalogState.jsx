import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useApp } from "../../state/hooks";
import Button from "../../components/ui/Button";
import { EmptyState, ErrorState, ProductGridSkeleton } from "../../components/ui/States";

/**
 * Renders loading / error / empty states for the product catalog, or calls
 * children(products) when there is something to show.
 */
export default function CatalogState({ skeletonCount, children }) {
  const { products, loadProducts, backend, isAdmin, seedCatalog, notify, useDemoData } = useApp();

  if (products.status === "loading" || products.status === "idle") {
    return <ProductGridSkeleton count={skeletonCount} />;
  }

  if (products.status === "error") {
    return (
      <div className="card">
        <ErrorState title="Could not load the menu" error={products.error} onRetry={loadProducts}>
          {backend?.id !== "demo" && (
            <Button variant="secondary" onClick={useDemoData}>
              Use demo data instead
            </Button>
          )}
        </ErrorState>
      </div>
    );
  }

  if (products.items.length === 0) {
    return (
      <div className="card">
        <EmptyState
          icon={ShoppingBagIcon}
          title="The menu is empty"
          description={
            isAdmin
              ? "There are no products yet. Add one from the dashboard, or import the sample products."
              : "There are no products yet. Please check back soon."
          }
          action={
            isAdmin && (
              <>
                <Button to="/admin/addnewproduct">Add a product</Button>
                {backend?.capabilities.seedCatalog && (
                  <Button
                    variant="secondary"
                    onClick={async () => {
                      try {
                        await seedCatalog();
                        notify("Sample products imported.");
                      } catch (e) {
                        notify(e.message, "error");
                      }
                    }}
                  >
                    Import sample products
                  </Button>
                )}
              </>
            )
          }
        />
      </div>
    );
  }

  return children(products.items);
}
