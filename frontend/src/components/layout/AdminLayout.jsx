import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  ArrowLeftStartOnRectangleIcon,
  BuildingStorefrontIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useApp } from "../../state/hooks";
import Brand from "./Brand";
import ModeBanner from "./ModeBanner";

const nav = [
  { to: "/admin/dashboard", label: "Dashboard", icon: Squares2X2Icon },
  { to: "/admin/products", label: "Products", icon: ShoppingBagIcon },
  { to: "/admin/users", label: "Users", icon: UsersIcon },
];

const linkCls = ({ isActive }) =>
  `flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? "bg-paper/15 text-white" : "text-paper/70 hover:bg-paper/10 hover:text-white"
  }`;

export default function AdminLayout() {
  const { user, logout, notify } = useApp();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    notify("You have been signed out.", "info");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside className="bg-ink text-paper lg:sticky lg:top-0 lg:h-screen lg:w-60 lg:shrink-0">
        <div className="flex items-center justify-between px-4 py-3 lg:flex-col lg:items-stretch lg:gap-6 lg:p-5">
          <div className="flex items-baseline gap-2">
            <Brand to="/admin/dashboard" light />
            <span className="rounded bg-paper/15 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide">
              Admin
            </span>
          </div>
          <nav aria-label="Admin" className="hidden lg:flex lg:flex-col lg:gap-1">
            {nav.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={linkCls}>
                <Icon className="h-5 w-5" aria-hidden="true" /> {label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-1 lg:hidden">
            <NavLink to="/" className="rounded-md p-2 text-paper/80 hover:bg-paper/10" aria-label="View store">
              <BuildingStorefrontIcon className="h-5 w-5" />
            </NavLink>
            <button type="button" onClick={signOut} className="rounded-md p-2 text-paper/80 hover:bg-paper/10" aria-label="Sign out">
              <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <nav aria-label="Admin sections" className="flex gap-1 overflow-x-auto border-t border-paper/10 px-3 py-2 lg:hidden">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={linkCls}>
              <Icon className="h-5 w-5" aria-hidden="true" /> {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden border-t border-paper/10 p-4 lg:absolute lg:inset-x-0 lg:bottom-0 lg:block">
          <p className="truncate text-sm font-semibold">{user?.fullName}</p>
          <p className="truncate text-xs text-paper/60">{user?.email}</p>
          <div className="mt-3 flex flex-col gap-1">
            <NavLink to="/" className={linkCls}>
              <BuildingStorefrontIcon className="h-5 w-5" aria-hidden="true" /> View store
            </NavLink>
            <button type="button" onClick={signOut} className={linkCls({ isActive: false }) + " w-full text-left"}>
              <ArrowLeftStartOnRectangleIcon className="h-5 w-5" aria-hidden="true" /> Sign out
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <ModeBanner />
        <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
