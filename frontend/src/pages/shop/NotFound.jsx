import Button from "../../components/ui/Button";

export default function NotFound({ admin = false }) {
  return (
    <div className="container-page py-20 text-center">
      <p className="font-display text-7xl font-semibold text-syrup">404</p>
      <h1 className="mt-4 text-3xl font-semibold">That page is not here</h1>
      <p className="mx-auto mt-2 max-w-md text-ink-soft">
        The link may be broken or the page may have moved.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Button to={admin ? "/admin/dashboard" : "/"}>{admin ? "Back to the dashboard" : "Back to the shop"}</Button>
        {!admin && (
          <Button variant="secondary" to="/products">
            Browse the menu
          </Button>
        )}
      </div>
    </div>
  );
}
