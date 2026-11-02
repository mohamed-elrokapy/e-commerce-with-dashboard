import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, PencilSquareIcon, ShieldCheckIcon, TrashIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useApp } from "../../state/hooks";
import { formatDate, initials } from "../../lib/format";
import { filterRows, paginate, sortRows } from "../../lib/tableTools";
import { IconButton } from "../../components/ui/Button";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import DataTable from "../../components/ui/DataTable";
import PageHeader from "../../components/ui/PageHeader";
import Pagination from "../../components/ui/Pagination";
import SearchInput from "../../components/ui/SearchInput";
import { Badge, EmptyState, ErrorState, TableSkeleton } from "../../components/ui/States";
import Button from "../../components/ui/Button";

const PAGE_SIZE = 8;
const KEYS = ["fullName", "email", "phone", "role"];

export default function UsersAdmin() {
  const { user: me, users, loadUsers, updateUser, deleteUser, notify } = useApp();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState({ key: "fullName", dir: "asc" });
  const [page, setPage] = useState(1);
  const [toDelete, setToDelete] = useState(null);
  const [toggle, setToggle] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const onSort = (key) => {
    setSort((s) => (s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
    setPage(1);
  };

  const filtered = useMemo(() => filterRows(users.items, query, KEYS), [users.items, query]);
  const view = useMemo(() => paginate(sortRows(filtered, sort.key, sort.dir), page, PAGE_SIZE), [filtered, sort, page]);

  const run = async (action, success) => {
    setBusy(true);
    try {
      await action();
      notify(success);
      return true;
    } catch (error) {
      notify(error.message, "error");
      return false;
    } finally {
      setBusy(false);
    }
  };

  const columns = [
    {
      key: "fullName",
      label: "User",
      sortable: true,
      render: (u) => (
        <div className="flex items-center gap-3">
          <span className="hidden h-9 w-9 shrink-0 items-center sm:flex justify-center rounded-full bg-paper-3 text-xs font-semibold text-ink-soft" aria-hidden="true">
            {initials(u.fullName || u.email)}
          </span>
          <div className="min-w-0">
            <p className="truncate font-medium">
              {u.fullName || "Unnamed"} {u.id === me.id && <span className="text-xs text-ink-faint">(you)</span>}
            </p>
            <p className="truncate text-[13px] text-ink-soft sm:hidden">{u.email}</p>
            <span className="sm:hidden"><Badge tone={u.role === "admin" ? "accent" : "neutral"}>{u.role}</Badge></span>
          </div>
        </div>
      ),
    },
    { key: "email", label: "Email", sortable: true, hideBelow: "sm", render: (u) => <span className="text-ink-soft">{u.email}</span> },
    { key: "phone", label: "Phone", hideBelow: "lg", render: (u) => <span className="text-ink-soft">{u.phone || "n/a"}</span> },
    { key: "role", label: "Role", sortable: true, hideBelow: "sm", render: (u) => <Badge tone={u.role === "admin" ? "accent" : "neutral"}>{u.role}</Badge> },
    { key: "createdAt", label: "Joined", sortable: true, hideBelow: "lg", className: "whitespace-nowrap", render: (u) => formatDate(u.createdAt) || "n/a" },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (u) => {
        const self = u.id === me.id;
        return (
          <div className="flex justify-end">
            <IconButton label={`View ${u.fullName || u.email}`} onClick={() => navigate(`/admin/userview/${u.id}`)}>
              <EyeIcon className="h-5 w-5" />
            </IconButton>
            <IconButton label={`Edit ${u.fullName || u.email}`} onClick={() => navigate(`/admin/useredit/${u.id}`)}>
              <PencilSquareIcon className="h-5 w-5" />
            </IconButton>
            <IconButton
              label={self ? "You cannot change your own role" : u.role === "admin" ? `Make ${u.fullName || u.email} a user` : `Make ${u.fullName || u.email} an admin`}
              disabled={self}
              onClick={() => setToggle(u)}
            >
              <ShieldCheckIcon className="h-5 w-5" />
            </IconButton>
            <IconButton
              label={self ? "You cannot delete yourself" : `Delete ${u.fullName || u.email}`}
              disabled={self}
              className="hover:text-berry"
              onClick={() => setToDelete(u)}
            >
              <TrashIcon className="h-5 w-5" />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const loading = users.status === "loading" || users.status === "idle";
  const nextRole = toggle?.role === "admin" ? "user" : "admin";

  return (
    <>
      <PageHeader title="Users" description="People with an account. Change roles or remove accounts." />

      <div className="card overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput
            label="Search users"
            placeholder="Search by name, email or role"
            value={query}
            onChange={(v) => {
              setQuery(v);
              setPage(1);
            }}
            className="sm:w-80"
          />
          {users.status === "ready" && (
            <p className="text-sm text-ink-soft" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? "user" : "users"}
            </p>
          )}
        </div>

        {loading ? (
          <TableSkeleton />
        ) : users.status === "error" ? (
          <ErrorState title="Could not load users" error={users.error} onRetry={loadUsers} />
        ) : users.items.length === 0 ? (
          <EmptyState icon={UsersIcon} title="No users yet" description="Accounts show up here after people sign up." />
        ) : view.rows.length === 0 ? (
          <EmptyState title="No matching users" description={`Nothing matches "${query}".`} action={<Button variant="secondary" onClick={() => setQuery("")}>Clear search</Button>} />
        ) : (
          <>
            <DataTable caption="Users" columns={columns} rows={view.rows} sortKey={sort.key} sortDir={sort.dir} onSort={onSort} />
            <Pagination page={view.page} pageCount={view.pageCount} total={filtered.length} pageSize={PAGE_SIZE} onPage={setPage} />
          </>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete this user?"
        message={toDelete ? `${toDelete.fullName || toDelete.email} will lose access. This cannot be undone.` : ""}
        confirmLabel="Delete user"
        busy={busy}
        onCancel={() => setToDelete(null)}
        onConfirm={async () => {
          if (await run(() => deleteUser(toDelete.id), "User deleted.")) setToDelete(null);
        }}
      />
      <ConfirmDialog
        open={Boolean(toggle)}
        title={`Make this user ${nextRole === "admin" ? "an admin" : "a regular user"}?`}
        message={toggle ? `${toggle.fullName || toggle.email} will ${nextRole === "admin" ? "get access to" : "lose access to"} the dashboard.` : ""}
        confirmLabel="Change role"
        tone="primary"
        busy={busy}
        onCancel={() => setToggle(null)}
        onConfirm={async () => {
          if (await run(() => updateUser(toggle.id, { role: nextRole }), "Role updated.")) setToggle(null);
        }}
      />
    </>
  );
}
