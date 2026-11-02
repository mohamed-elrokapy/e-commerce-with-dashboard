import { Link } from "react-router-dom";
import { STORE } from "../../lib/config";
import Brand from "./Brand";

export default function StoreFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-paper-2/60">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Brand />
          <p className="mt-2 max-w-xs text-sm text-ink-soft">
            {STORE.footerText}
          </p>
        </div>
        <nav aria-label="Footer" className="flex gap-10 text-sm">
          <ul className="space-y-2">
            <li><Link className="text-ink-soft hover:text-ink" to="/products">Menu</Link></li>
            <li><Link className="text-ink-soft hover:text-ink" to="/shopingcartpage">Cart</Link></li>
            <li><Link className="text-ink-soft hover:text-ink" to="/contactus">Contact</Link></li>
          </ul>
          <ul className="space-y-2">
            <li><Link className="text-ink-soft hover:text-ink" to="/login">Sign in</Link></li>
            <li><Link className="text-ink-soft hover:text-ink" to="/signup">Create account</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-ink-faint">
        Demo project. Not a real shop: no payments are taken and no orders are fulfilled.
      </div>
    </footer>
  );
}
