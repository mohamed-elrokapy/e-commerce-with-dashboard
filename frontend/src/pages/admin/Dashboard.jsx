import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../state/hooks";
import { formatDate, formatPrice } from "../../lib/format";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import ProductImage from "../../components/ui/ProductImage";
import { Badge, ErrorState, Skeleton } from "../../components/ui/States";

function StatCard({ label, value, hint, loading }) {
  return (
    <div className="card p-5">
      <p className="text-sm font-medium text-ink-soft">{label}</p>
      {loading ? (
        <Skeleton className="mt-2 h-9 w-20" />
      ) : (
        <p className="mt-1 font-display text-4xl font-semibold tabular-nums">{value}</p>
      )}
      <p className="mt-1 truncate text-[13px] text-ink-faint">{hint}</p>
    </div>
  );
}

function Panel({ title, action, children }) {
  return (
    <section className="card">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <h2 className="text-lg font-semibold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export default function Dashboard() {
  const { products, users, loadUsers, loadProducts, resetDemo, backend, notify } = useApp();

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const pLoading = products.status === "loading" || products.status === "idle";
  const uLoading = users.status === "loading" || users.status === "idle";

  const items = products.items;
  const avg = items.length ? items.reduce((s, p) => s + p.price, 0) / items.length : 0;
  const max = Math.max(0, ...items.map((p) => p.price));
  const latestProducts = [...items].reverse().slice(0, 5);
  const latestUsers = [...users.items]
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
    .slice(0, 5);
  const admins = users.items.filter((u) => u.role === "admin").length;

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="A snapshot of the catalog and the people using the shop."
        actions={
          <>
            {backend?.capabilities.resetDemo && (
              <Button
                variant="secondary"
                onClick={async () => {
                  await resetDemo();
                  notify("Demo data reset. Sign in again to continue.", "info");
                }}
              >
                Reset demo data
              </Button>
            )}
            <Button to="/admin/addnewproduct">Add product</Button>
          </>
        }
      />

      {products.status === "error" ? (
        <div className="card">
          <ErrorState title="Could not load products" error={products.error} onRetry={loadProducts} />
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Products" value={items.length} hint="Items on the menu" loading={pLoading} />
            <StatCard
              label="Average price"
              value={formatPrice(avg)}
              hint={items.length ? `Highest ${formatPrice(max)}` : "No products yet"}
              loading={pLoading}
            />
            <StatCard
              label="Users"
              value={users.status === "error" ? "n/a" : users.items.length}
              hint={users.status === "error" ? "Could not load users" : "Registered accounts"}
              loading={uLoading}
            />
            <StatCard
              label="Admins"
              value={users.status === "error" ? "n/a" : admins}
              hint="With dashboard access"
              loading={uLoading}
            />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <Panel
              title="Price by product"
              action={<Link to="/admin/products" className="text-sm font-semibold text-syrup hover:text-syrup-dark">Manage</Link>}
            >
              {pLoading ? (
                <div className="space-y-3 p-5">{Array.from({ length: 5 }, (_, i) => <Skeleton key={i} className="h-6" />)}</div>
              ) : items.length === 0 ? (
                <p className="p-5 text-sm text-ink-soft">No products yet.</p>
              ) : (
                <ul className="space-y-3 p-5">
                  {items.slice(0, 8).map((p) => (
                    <li key={p.id} className="grid grid-cols-[minmax(0,9rem)_1fr_4rem] items-center gap-3 text-sm">
                      <span dir="auto" className="truncate">{p.title}</span>
                      <span className="h-2.5 overflow-hidden rounded-full bg-paper-2" aria-hidden="true">
                        <span
                          className="block h-full rounded-full bg-syrup"
                          style={{ width: `${max ? (p.price / max) * 100 : 0}%` }}
                        />
                      </span>
                      <span className="text-right font-medium tabular-nums">{formatPrice(p.price)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>

            <Panel
              title="Latest products"
              action={<Link to="/admin/products" className="text-sm font-semibold text-syrup hover:text-syrup-dark">View all</Link>}
            >
              {pLoading ? (
                <div className="space-y-3 p-5">{Array.from({ length: 4 }, (_, i) => <Skeleton key={i} className="h-10" />)}</div>
              ) : latestProducts.length === 0 ? (
                <p className="p-5 text-sm text-ink-soft">Nothing here yet.</p>
              ) : (
                <ul className="divide-y divide-line">
                  {latestProducts.map((p) => (
                    <li key={p.id} className="flex items-center gap-3 px-5 py-3">
                      <ProductImage src={p.image} title={p.title} ratio="1 / 1" className="h-10 w-10 shrink-0 rounded-md" />
                      <Link dir="auto" to={`/admin/productview/${p.id}`} className="min-w-0 flex-1 truncate text-sm font-medium hover:text-syrup">
                        {p.title}
                      </Link>
                      <span className="text-sm tabular-nums text-ink-soft">{formatPrice(p.price)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>

            <Panel
              title="Newest users"
              action={<Link to="/admin/users" className="text-sm font-semibold text-syrup hover:text-syrup-dark">View all</Link>}
            >
              {uLoading ? (
                <div className="space-y-3 p-5">{Array.from({ length: 4 }, (_, i) => <Skeleton key={i} className="h-10" />)}</div>
              ) : users.status === "error" ? (
                <ErrorState title="Could not load users" error={users.error} onRetry={loadUsers} />
              ) : latestUsers.length === 0 ? (
                <p className="p-5 text-sm text-ink-soft">No users yet.</p>
              ) : (
                <ul className="divide-y divide-line">
                  {latestUsers.map((u) => (
                    <li key={u.id} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
                      <div className="min-w-0">
                        <p className="truncate font-medium">{u.fullName || u.email}</p>
                        <p className="truncate text-[13px] text-ink-soft">{u.email}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <Badge tone={u.role === "admin" ? "accent" : "neutral"}>{u.role}</Badge>
                        <span className="hidden text-[13px] text-ink-faint sm:inline">{formatDate(u.createdAt)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          </div>
        </>
      )}
    </>
  );
}
