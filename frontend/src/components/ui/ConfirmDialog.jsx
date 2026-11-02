import { useEffect, useId, useRef } from "react";
import Button from "./Button";

/** Accessible confirm dialog built on the native <dialog> element. */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  tone = "danger",
  busy = false,
  onConfirm,
  onCancel,
}) {
  const ref = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault();
        if (!busy) onCancel();
      }}
      onClick={(e) => {
        if (e.target === ref.current && !busy) onCancel();
      }}
      aria-labelledby={titleId}
      className="w-[min(92vw,26rem)] rounded-lg border border-line bg-white p-0 text-ink shadow-pop backdrop:bg-ink/50"
    >
      <div className="p-6">
        <h2 id={titleId} className="text-xl font-semibold">
          {title}
        </h2>
        <p className="mt-2 text-sm text-ink-soft">{message}</p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
          <Button variant={tone} onClick={onConfirm} loading={busy}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
