import { forwardRef, useId, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const PasswordField = forwardRef(function PasswordField(
  { label = "Password", error, hint, className = "", ...props },
  ref
) {
  const id = useId();
  const [shown, setShown] = useState(false);
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          ref={ref}
          id={id}
          type={shown ? "text" : "password"}
          className="input pr-10"
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShown((v) => !v)}
          aria-label={shown ? "Hide password" : "Show password"}
          aria-pressed={shown}
          className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded text-ink-soft hover:text-ink"
        >
          {shown ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1 text-[13px] text-berry">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1 text-[13px] text-ink-faint">{hint}</p>
      ) : null}
    </div>
  );
});

export default PasswordField;
