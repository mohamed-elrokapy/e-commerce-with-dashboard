import { useApp } from "../../state/hooks";

/** Slim notice so nobody mistakes the demo backend for a live shop. */
export default function ModeBanner() {
  const { backend } = useApp();
  if (!backend || backend.id !== "demo") return null;
  return (
    <div className="bg-ink px-4 py-1.5 text-center text-xs text-paper/90">
      <strong className="font-semibold text-paper">{backend.label}.</strong>{" "}
      {backend.description} No payments are processed.
    </div>
  );
}
