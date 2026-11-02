import { CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useApp } from "../../state/hooks";

const tones = {
  success: { icon: CheckCircleIcon, cls: "border-leaf/30 bg-leaf-tint text-leaf" },
  error: { icon: ExclamationTriangleIcon, cls: "border-berry/30 bg-berry-tint text-berry" },
  info: { icon: CheckCircleIcon, cls: "border-line-strong bg-white text-ink" },
};

export default function ToastHost() {
  const { toasts, dismissToast } = useApp();
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4"
    >
      {toasts.map((t) => {
        const tone = tones[t.type] ?? tones.info;
        const Icon = tone.icon;
        return (
          <div
            key={t.id}
            className={`fade-in pointer-events-auto flex w-full max-w-sm items-start gap-2 rounded-md border px-3 py-2.5 text-sm shadow-card ${tone.cls}`}
          >
            <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p className="flex-1 text-ink">{t.message}</p>
            <button
              type="button"
              onClick={() => dismissToast(t.id)}
              aria-label="Dismiss notification"
              className="rounded p-0.5 text-ink-soft hover:text-ink"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
