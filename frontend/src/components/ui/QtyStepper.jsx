import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function QtyStepper({ value, onChange, label, min = 1, max = 99 }) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center rounded-md border border-line-strong bg-white"
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="flex h-9 w-9 items-center justify-center rounded-l-md text-ink-soft hover:bg-paper-2 disabled:opacity-40"
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      <output aria-live="polite" className="min-w-[2.25rem] text-center text-sm font-semibold tabular-nums">
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="flex h-9 w-9 items-center justify-center rounded-r-md text-ink-soft hover:bg-paper-2 disabled:opacity-40"
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
