import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../state/hooks";
import { initials } from "../../lib/format";

export default function AccountMenu() {
  const { user, isAdmin, logout, notify } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const itemCls =
    "block w-full rounded-md px-3 py-2 text-left text-sm text-ink hover:bg-paper-2";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`Account menu for ${user.fullName || user.email}`}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-xs font-semibold text-paper hover:bg-ink-soft"
      >
        {initials(user.fullName || user.email)}
      </button>
      {open && (
        <div className="card absolute right-0 z-30 mt-2 w-60 p-1.5 shadow-pop">
          <div className="border-b border-line px-3 py-2">
            <p className="truncate text-sm font-semibold">{user.fullName || "Account"}</p>
            <p className="truncate text-xs text-ink-soft">{user.email}</p>
          </div>
          <div className="pt-1.5">
            <Link to="/userprofile" className={itemCls} onClick={() => setOpen(false)}>
              Profile
            </Link>
            {isAdmin && (
              <Link to="/admin/dashboard" className={itemCls} onClick={() => setOpen(false)}>
                Admin dashboard
              </Link>
            )}
            <button
              type="button"
              className={itemCls}
              onClick={async () => {
                setOpen(false);
                await logout();
                notify("You have been signed out.", "info");
                navigate("/");
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
