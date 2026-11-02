import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, PencilSquareIcon, PlusIcon, ShoppingBagIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useApp } from "../../state/hooks";
import { formatDate, formatPrice } from "../../lib/format";
import { filterRows, paginate, sortRows } from "../../lib/tableTools";
import Button, { IconButton } from "../../components/ui/Button";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import DataTable from "../../components/ui/DataTable";
import PageHeader from "../../components/ui/PageHeader";
import Pagination from "../../components/ui/Pagination";
import ProductImage from "../../components/ui/ProductImage";
import SearchInput from "../../components/ui/SearchInput";
import { EmptyState, ErrorState, TableSkeleton } from "../../components/ui/States";

const PAGE_SIZE = 8;

export default function ProductsAdmin() {
  const { products, loadProducts, deleteProduct, notify, backend, seedCatalog } = useApp();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState({ key: "createdAt", dir: "asc" });
  const [page, setPage] = useState(1);
  const [toDelete, setToDelete] = useState(null);
  const [busy, setBusy] = useState(false);

  const onSort = (key) => {
    setSort((s) => (s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
    setPage(1);
  };

  const view = useMemo(() => {
    const filtered = filterRows(products.items, query, ["title", "description"]);
    return paginate(sortRows(filtered, sort.key, sort.dir), page, PAGE_SIZE);
  }, [products.items, query, sort, page]);

  const total = filterRows(products.items, query, ["title", "description"]).length;

  const columns = [
    {
      key: "title",
      label: "Product",
      sortable: true,
      render: (p) => (
        <div className="flex items-center gap-3">
          <ProductImage src={p.image} title={p.title} ratio="1 / 1" className="h-11 w-11 shrink-0 rounded-md" />
          <div className="min-w-0">
            <p dir="auto" className="truncate font-medium">{p.title}</p>
            <p className="text-[13px] tabular-nums text-ink-soft sm:hidden">{formatPrice(p.price)}</p>
          </div>
        </div>
      ),
    },
    { key: "description", label: "Description", hideBelow: "md", render: (p) => <p dir="auto" className="line-clamp-2 max-w-sm text-ink-soft">{p.description}</p> },
    { key: "price", label: "Price", sortable: true, hideBelow: "sm", className: "tabular-nums", render: (p) => formatPrice(p.price) },
    { key: "createdAt", label: "Added", sortable: true, hideBelow: "lg", className: "whitespace-nowrap", render: (p) => formatDate(p.createdAt) || "n/a" },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (p) => (
        <div className="flex justify-end">
          <IconButton label={`View ${p.title}`} onClick={() => navigate(`/admin/productview/${p.id}`)}>
            <EyeIcon className="h-5 w-5" />
          </IconButton>
          <IconButton label={`Edit ${p.title}`} onClick={() => navigate(`/admin/productedit/${p.id}`)}>
            <PencilSquareIcon className="h-5 w-5" />
          </IconButton>
          <IconButton label={`Delete ${p.title}`} className="hover:text-berry" onClick={() => setToDelete(p)}>
            <TrashIcon className="h-5 w-5" />
          </IconButton>
        </div>
      ),
    },
  ];

  const confirmDelete = async () => {
    setBusy(true);
    try {
      await deleteProduct(toDelete.id);
      notify(`${toDelete.title} was deleted.`);
      setToDelete(null);
    } catch (error) {
      notify(error.message, "error");
    } finally {
      setBusy(false);
    }
  };

  const loading = products.status === "loading" || products.status === "idle";

  return (
    <>
      <PageHeader
        title="Products"
        description="Add, edit and remove what the shop sells."
        actions={
          <Button to="/admin/addnewproduct">
            <PlusIcon className="h-4 w-4" /> Add product
          </Button>
        }
      />

      <div className="card overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput
            label="Search products"
            placeholder="Search by title or description"
            value={query}
            onChange={(v) => {
              setQuery(v);
              setPage(1);
            }}
            className="sm:w-80"
          />
          {!loading && products.status === "ready" && (
            <p className="text-sm text-ink-soft" aria-live="polite">
              {total} {total === 1 ? "product" : "products"}
            </p>
          )}
        </div>

        {loading ? (
          <TableSkeleton />
        ) : products.status === "error" ? (
          <ErrorState title="Could not load products" error={products.error} onRetry={loadProducts} />
        ) : products.items.length === 0 ? (
          <EmptyState
            icon={ShoppingBagIcon}
            title="No products yet"
            description="Add your first product to put it on the menu."
            action={
              <>
                <Button to="/admin/addnewproduct">Add product</Button>
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
            }
          />
        ) : view.rows.length === 0 ? (
          <EmptyState title="No matching products" description={`Nothing matches "${query}".`} action={<Button variant="secondary" onClick={() => setQuery("")}>Clear search</Button>} />
        ) : (
          <>
            <DataTable
              caption="Products"
              columns={columns}
              rows={view.rows}
              sortKey={sort.key}
              sortDir={sort.dir}
              onSort={onSort}
            />
            <Pagination page={view.page} pageCount={view.pageCount} total={total} pageSize={PAGE_SIZE} onPage={setPage} />
          </>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete this product?"
        message={toDelete ? `"${toDelete.title}" will be removed from the menu. This cannot be undone.` : ""}
        confirmLabel="Delete product"
        busy={busy}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
}
