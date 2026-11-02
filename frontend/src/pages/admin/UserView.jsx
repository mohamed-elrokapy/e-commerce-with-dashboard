import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { formatDate, initials } from "../../lib/format";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import { Badge, EmptyState, ErrorState, Skeleton } from "../../components/ui/States";
import UserMissing from "./UserMissing";
import { useUserParam } from "./useUserParam";

export default function UserView() {
  const { id, user, loading, error, retry } = useUserParam();
  if (loading) return <Skeleton className="h-72 w-full" />;
  if (error) return <div className="card"><ErrorState error={error} onRetry={retry} /></div>;
  if (!user) return <UserMissing id={id} />;

  return (
    <>
      <PageHeader
        title={user.fullName || user.email}
        description="User details"
        actions={
          <>
            <Button variant="secondary" to="/admin/users">Back</Button>
            <Button to={`/admin/useredit/${user.id}`}><PencilSquareIcon className="h-4 w-4" /> Edit</Button>
          </>
        }
      />
      <div className="card max-w-2xl p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper-3 font-display text-xl font-semibold text-ink-soft" aria-hidden="true">
            {initials(user.fullName || user.email)}
          </span>
          <Badge tone={user.role === "admin" ? "accent" : "neutral"}>{user.role}</Badge>
        </div>
        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
          <div><dt className="text-ink-soft">Full name</dt><dd className="mt-0.5 font-medium">{user.fullName || "n/a"}</dd></div>
          <div><dt className="text-ink-soft">Email</dt><dd className="mt-0.5 break-all font-medium">{user.email}</dd></div>
          <div><dt className="text-ink-soft">Phone</dt><dd className="mt-0.5 font-medium">{user.phone || "n/a"}</dd></div>
          <div><dt className="text-ink-soft">Joined</dt><dd className="mt-0.5 font-medium">{formatDate(user.createdAt) || "n/a"}</dd></div>
        </dl>
      </div>
    </>
  );
}
