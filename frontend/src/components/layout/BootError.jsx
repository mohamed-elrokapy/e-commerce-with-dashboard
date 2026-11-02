import { useApp } from "../../state/hooks";
import Button from "../ui/Button";
import { ErrorState } from "../ui/States";

/** Shown when the configured backend cannot even be initialised. */
export default function BootError() {
  const { boot, useDemoData } = useApp();
  if (boot.status !== "error") return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-paper p-4">
      <div className="card max-w-lg">
        <ErrorState title="The shop could not start" error={boot.error}>
          <Button onClick={useDemoData}>Continue with demo data</Button>
        </ErrorState>
      </div>
    </div>
  );
}
