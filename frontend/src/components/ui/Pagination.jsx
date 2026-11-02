import Button from "./Button";

export default function Pagination({ page, pageCount, total, pageSize, onPage }) {
  if (total <= pageSize) return null;
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 text-sm text-ink-soft"
    >
      <p>
        {from} to {to} of {total}
      </p>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => onPage(page - 1)}>
          Previous
        </Button>
        <Button variant="secondary" size="sm" disabled={page >= pageCount} onClick={() => onPage(page + 1)}>
          Next
        </Button>
      </div>
    </nav>
  );
}
