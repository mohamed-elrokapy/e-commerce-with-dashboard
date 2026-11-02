import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

export function Skeleton({ className = "" }) {
  return <div className={`skeleton rounded-md bg-paper-3 ${className}`} aria-hidden="true" />;
}

export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      role="status"
      aria-label="Loading products"
    >
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="card overflow-hidden">
          <Skeleton className="aspect-[4/3] rounded-none" />
          <div className="space-y-2 p-4">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-2 p-4" role="status" aria-label="Loading">
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton key={i} className="h-11 w-full" />
      ))}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center">
      {Icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-paper-2 text-ink-soft">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
      )}
      <h2 className="text-xl font-semibold">{title}</h2>
      {description && <p className="mt-1.5 max-w-md text-sm text-ink-soft">{description}</p>}
      {action && <div className="mt-5 flex flex-wrap justify-center gap-2">{action}</div>}
    </div>
  );
}

export function ErrorState({ title = "Something went wrong", error, onRetry, children }) {
  const message = error?.message || "Please try again.";
  return (
    <div role="alert" className="flex flex-col items-center px-6 py-14 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-berry-tint text-berry">
        <ExclamationTriangleIcon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-1.5 max-w-md text-sm text-ink-soft">{message}</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {onRetry && <Button onClick={onRetry}>Try again</Button>}
        {children}
      </div>
    </div>
  );
}

export function Badge({ tone = "neutral", children }) {
  const tones = {
    neutral: "bg-paper-2 text-ink-soft",
    accent: "bg-syrup-tint text-syrup-dark",
    good: "bg-leaf-tint text-leaf",
    warn: "bg-amber-tint text-amber-ink",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function PageSpinner({ label = "Loading" }) {
  return (
    <div role="status" className="flex min-h-[40vh] items-center justify-center text-ink-soft">
      <span
        aria-hidden="true"
        className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-syrup border-t-transparent motion-reduce:animate-none"
      />
      {label}
    </div>
  );
}
