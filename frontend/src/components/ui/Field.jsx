import { forwardRef, useId } from "react";

/** Label + control + error message, wired up with the right aria attributes. */
const Field = forwardRef(function Field(
  { label, error, hint, as = "input", className = "", children, ...props },
  ref
) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const Control = as;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <Control
        ref={ref}
        id={id}
        className="input"
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
        {...props}
      >
        {children}
      </Control>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1 text-[13px] text-berry">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1 text-[13px] text-ink-faint">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

export default Field;
