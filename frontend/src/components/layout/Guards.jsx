import { Navigate, useLocation } from "react-router-dom";
import { useApp } from "../../state/hooks";
import Button from "../ui/Button";
import { EmptyState, PageSpinner } from "../ui/States";
import { LockClosedIcon } from "@heroicons/react/24/outline";

/** Both guards wait for the stored session to be restored before deciding. */
export function RequireAuth({ children }) {
  const { user, authReady } = useApp();
  const location = useLocation();
  if (!authReady) return <PageSpinner />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return children;
}

export function RequireAdmin({ children }) {
  const { user, isAdmin, authReady } = useApp();
  const location = useLocation();
  if (!authReady) return <PageSpinner />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (!isAdmin) {
    return (
      <div className="container-page py-16">
        <div className="card mx-auto max-w-lg">
          <EmptyState
            icon={LockClosedIcon}
            title="Admins only"
            description="Your account does not have access to the dashboard."
            action={<Button to="/">Back to the shop</Button>}
          />
        </div>
      </div>
    );
  }
  return children;
}
