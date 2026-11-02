import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { computeTotals } from "../lib/pricing";
import { setDemoForced } from "../lib/config";
import { createBackend } from "../services";
import { AppContext } from "./context";

const CART_KEY = "shopdemo.cart.v1";

function readCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY) ?? "[]");
    return Array.isArray(parsed)
      ? parsed.filter((l) => l && typeof l.id === "string" && l.qty > 0)
      : [];
  } catch {
    return [];
  }
}

const idle = { items: [], status: "idle", error: null };

export default function AppProvider({ children }) {
  const backendRef = useRef(null);
  const [boot, setBoot] = useState({ status: "booting", error: null });
  const [backendInfo, setBackendInfo] = useState(null);
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [products, setProducts] = useState({ ...idle, status: "loading" });
  const [users, setUsers] = useState(idle);
  const [cartLines, setCartLines] = useState(readCart);
  const [toasts, setToasts] = useState([]);

  // ---- toasts -------------------------------------------------------------
  const dismissToast = useCallback(
    (id) => setToasts((list) => list.filter((t) => t.id !== id)),
    []
  );
  const notify = useCallback(
    (message, type = "success") => {
      const id = Math.random().toString(36).slice(2);
      setToasts((list) => [...list.slice(-2), { id, message, type }]);
      setTimeout(() => dismissToast(id), 4500);
    },
    [dismissToast]
  );

  // ---- data loading -------------------------------------------------------
  const loadProducts = useCallback(async () => {
    const backend = backendRef.current;
    if (!backend) return;
    setProducts((p) => ({ ...p, status: "loading", error: null }));
    try {
      const items = await backend.listProducts();
      setProducts({ items, status: "ready", error: null });
    } catch (error) {
      setProducts({ items: [], status: "error", error });
    }
  }, []);

  const loadUsers = useCallback(async () => {
    const backend = backendRef.current;
    if (!backend) return;
    setUsers((u) => ({ ...u, status: "loading", error: null }));
    try {
      const items = await backend.listUsers();
      setUsers({ items, status: "ready", error: null });
    } catch (error) {
      setUsers({ items: [], status: "error", error });
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const backend = await createBackend();
        if (cancelled) return;
        backendRef.current = backend;
        setBackendInfo({
          id: backend.id,
          label: backend.label,
          description: backend.description,
          capabilities: backend.capabilities,
        });
        setBoot({ status: "ready", error: null });
        loadProducts();
        try {
          const restored = await backend.restoreSession();
          if (!cancelled) setUser(restored);
        } catch {
          if (!cancelled) setUser(null);
        }
        if (!cancelled) setAuthReady(true);
      } catch (error) {
        if (!cancelled) {
          setBoot({ status: "error", error });
          setAuthReady(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loadProducts]);

  // ---- auth ---------------------------------------------------------------
  const login = useCallback(async (credentials) => {
    const next = await backendRef.current.login(credentials);
    setUser(next);
    return next;
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const next = await backendRef.current.loginWithGoogle();
    setUser(next);
    return next;
  }, []);

  const register = useCallback(async (values) => {
    const created = await backendRef.current.register(values);
    return created;
  }, []);

  const logout = useCallback(async () => {
    await backendRef.current.logout();
    setUser(null);
    setUsers(idle);
  }, []);

  const updateProfile = useCallback(async (patch) => {
    const updated = await backendRef.current.updateUser(user.id, patch);
    setUser(updated);
    return updated;
  }, [user]);

  // ---- admin: products ----------------------------------------------------
  const createProduct = useCallback(async (values) => {
    const created = await backendRef.current.createProduct(values);
    setProducts((p) => ({ ...p, items: [...p.items, created] }));
    return created;
  }, []);

  const updateProduct = useCallback(async (id, values) => {
    const updated = await backendRef.current.updateProduct(id, values);
    setProducts((p) => ({
      ...p,
      items: p.items.map((item) => (item.id === id ? updated : item)),
    }));
    return updated;
  }, []);

  const deleteProduct = useCallback(async (id) => {
    await backendRef.current.deleteProduct(id);
    setProducts((p) => ({ ...p, items: p.items.filter((item) => item.id !== id) }));
    setCartLines((lines) => lines.filter((l) => l.id !== id));
  }, []);

  const seedCatalog = useCallback(async () => {
    await backendRef.current.seedCatalog();
    await loadProducts();
  }, [loadProducts]);

  // ---- admin: users -------------------------------------------------------
  const updateUser = useCallback(async (id, patch) => {
    const updated = await backendRef.current.updateUser(id, patch);
    setUsers((u) => ({
      ...u,
      items: u.items.map((item) => (item.id === id ? updated : item)),
    }));
    setUser((current) => (current?.id === id ? updated : current));
    return updated;
  }, []);

  const deleteUser = useCallback(async (id) => {
    await backendRef.current.deleteUser(id);
    setUsers((u) => ({ ...u, items: u.items.filter((item) => item.id !== id) }));
  }, []);

  const resetDemo = useCallback(async () => {
    await backendRef.current.resetDemo();
    await backendRef.current.logout();
    setUser(null);
    setCartLines([]);
    setUsers(idle);
    await loadProducts();
  }, [loadProducts]);

  const useDemoData = useCallback(() => {
    setDemoForced(true);
    window.location.reload();
  }, []);

  // ---- cart ---------------------------------------------------------------
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cartLines));
    } catch {
      /* storage unavailable: cart still works for this session */
    }
  }, [cartLines]);

  const addToCart = useCallback((id, qty = 1) => {
    setCartLines((lines) => {
      const existing = lines.find((l) => l.id === id);
      if (existing)
        return lines.map((l) =>
          l.id === id ? { ...l, qty: Math.min(99, l.qty + qty) } : l
        );
      return [...lines, { id, qty }];
    });
  }, []);

  const setCartQty = useCallback((id, qty) => {
    setCartLines((lines) =>
      qty <= 0
        ? lines.filter((l) => l.id !== id)
        : lines.map((l) => (l.id === id ? { ...l, qty: Math.min(99, qty) } : l))
    );
  }, []);

  const removeFromCart = useCallback(
    (id) => setCartLines((lines) => lines.filter((l) => l.id !== id)),
    []
  );

  const clearCart = useCallback(() => setCartLines([]), []);

  const cart = useMemo(() => {
    const byId = new Map(products.items.map((p) => [p.id, p]));
    const items = cartLines
      .map((l) => ({ product: byId.get(l.id), qty: l.qty }))
      .filter((l) => l.product);
    return {
      items,
      count: cartLines.reduce((n, l) => n + l.qty, 0),
      totals: computeTotals(items),
      loading: products.status === "loading" || products.status === "idle",
      add: addToCart,
      setQty: setCartQty,
      remove: removeFromCart,
      clear: clearCart,
    };
  }, [cartLines, products, addToCart, setCartQty, removeFromCart, clearCart]);

  const value = useMemo(
    () => ({
      boot,
      backend: backendInfo,
      user,
      authReady,
      isAdmin: user?.role === "admin",
      login,
      loginWithGoogle,
      register,
      logout,
      updateProfile,
      products,
      loadProducts,
      createProduct,
      updateProduct,
      deleteProduct,
      seedCatalog,
      users,
      loadUsers,
      updateUser,
      deleteUser,
      resetDemo,
      useDemoData,
      cart,
      toasts,
      notify,
      dismissToast,
    }),
    [
      boot, backendInfo, user, authReady, login, loginWithGoogle, register, logout, updateProfile,
      products, loadProducts, createProduct, updateProduct, deleteProduct, seedCatalog,
      users, loadUsers, updateUser, deleteUser, resetDemo, useDemoData, cart, toasts,
      notify, dismissToast,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
