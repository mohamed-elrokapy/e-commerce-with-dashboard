import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import { RequireAdmin, RequireAuth } from "./components/layout/Guards";
import StoreLayout from "./components/layout/StoreLayout";
import ToastHost from "./components/ui/ToastHost";
import Dashboard from "./pages/admin/Dashboard";
import ProductAdd from "./pages/admin/ProductAdd";
import ProductEdit from "./pages/admin/ProductEdit";
import ProductsAdmin from "./pages/admin/ProductsAdmin";
import ProductView from "./pages/admin/ProductView";
import UserEdit from "./pages/admin/UserEdit";
import UsersAdmin from "./pages/admin/UsersAdmin";
import UserView from "./pages/admin/UserView";
import Login from "./pages/auth/Login";
import Profile from "./pages/auth/Profile";
import Signup from "./pages/auth/Signup";
import Cart from "./pages/shop/Cart";
import Checkout from "./pages/shop/Checkout";
import Contact from "./pages/shop/Contact";
import Home from "./pages/shop/Home";
import NotFound from "./pages/shop/NotFound";
import ProductDetail from "./pages/shop/ProductDetail";
import Products from "./pages/shop/Products";
import BootError from "./components/layout/BootError";

export default function App() {
  return (
    <>
      <BootError />
      <Routes>
        <Route element={<StoreLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="shopingcartpage" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="userprofile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="contactus" element={<Contact />} />
          <Route path="checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductsAdmin />} />
          <Route path="users" element={<UsersAdmin />} />
          <Route path="userview/:id?" element={<UserView />} />
          <Route path="useredit/:id?" element={<UserEdit />} />
          <Route path="productview/:id?" element={<ProductView />} />
          <Route path="productedit/:id?" element={<ProductEdit />} />
          <Route path="addnewproduct" element={<ProductAdd />} />
          <Route path="*" element={<NotFound admin />} />
        </Route>
      </Routes>
      <ToastHost />
    </>
  );
}
