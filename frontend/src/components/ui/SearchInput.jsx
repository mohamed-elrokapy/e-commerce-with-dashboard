import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function SearchInput({ value, onChange, label, placeholder, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <label className="sr-only" htmlFor={`search-${label}`}>
        {label}
      </label>
      <MagnifyingGlassIcon
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
        aria-hidden="true"
      />
      <input
        id={`search-${label}`}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input pl-9"
      />
    </div>
  );
}
