import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useApp } from "../../state/hooks";
import Brand from "./Brand";
import AccountMenu from "./AccountMenu";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/products", label: "Menu" },
  { to: "/contactus", label: "Contact" },
];

const navCls = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? "bg-paper-2 text-ink" : "text-ink-soft hover:bg-paper-2 hover:text-ink"
  }`;

export default function StoreHeader() {
  const [open, setOpen] = useState(false);
  const { user, cart } = useApp();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Brand />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={navCls}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/shopingcartpage"
            aria-label={`Cart, ${cart.count} ${cart.count === 1 ? "item" : "items"}`}
            className="relative flex h-9 w-9 items-center justify-center rounded-md text-ink hover:bg-paper-2"
          >
            <ShoppingBagIcon className="h-6 w-6" />
            {cart.count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-syrup px-1 text-[11px] font-bold text-white">
                {cart.count}
              </span>
            )}
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <AccountMenu />
            ) : (
              <>
                <Link to="/login" className="btn-ghost btn-sm">
                  Sign in
                </Link>
                <Link to="/signup" className="btn-primary btn-sm">
                  Create account
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-paper-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-paper md:hidden">
          <nav aria-label="Mobile" className="container-page flex flex-col gap-1 py-3">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={navCls} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 flex items-center gap-2 border-t border-line pt-3">
              {user ? (
                <>
                  <Link to="/userprofile" className="btn-secondary btn-sm" onClick={() => setOpen(false)}>
                    Profile
                  </Link>
                  {user.role === "admin" && (
                    <Link to="/admin/dashboard" className="btn-secondary btn-sm" onClick={() => setOpen(false)}>
                      Admin
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-secondary btn-sm" onClick={() => setOpen(false)}>
                    Sign in
                  </Link>
                  <Link to="/signup" className="btn-primary btn-sm" onClick={() => setOpen(false)}>
                    Create account
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
