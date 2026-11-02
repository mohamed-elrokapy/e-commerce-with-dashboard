import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ModeBanner from "./ModeBanner";
import StoreHeader from "./StoreHeader";
import StoreFooter from "./StoreFooter";

export default function StoreLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:shadow-pop"
      >
        Skip to content
      </a>
      <ModeBanner />
      <StoreHeader />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <StoreFooter />
    </div>
  );
}
