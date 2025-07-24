import React from "react";
import { Header } from "./copmpnents/Header";
import { Globalfooter } from "./copmpnents/Globalfooter";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "../authentication/Login";
import Signup from "../authentication/Signup";
import UserProfile from "./copmpnents/UserProfile";
import Products from "./pages/Products";
import Shopingcart from "./pages/Shopingcart";
import Checkout from "./copmpnents/shopingcart/Checkout";
import ContactUs from "./pages/ContactUs";
import Notfound from "../authentication/Notfound";
// import PrivateRoute from "../../PrivateRoute";
const UserLayOut = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="transition-all duration-500 ease-in-out">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/shopingcartpage" element={<Shopingcart />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/contactus" element={<ContactUs />} />

          <Route path="/checkout" element={<Checkout />} />
          <Route path="/*" element={<Notfound />} />
        </Routes>
      </main>
      <Globalfooter />
    </div>
  );
};

export default UserLayOut;
