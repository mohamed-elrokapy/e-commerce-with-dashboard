import React from "react";
import { Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import { Adminheader } from "./componnents/Adminheader";
import Welcometodashboard from "./pages/Welcometodashboard";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Userviewcard from "./componnents/Userviewcard";
import Usereditcard from "./componnents/Usereditcard";
import Viewproduct from "./componnents/productsoperations/Viewproduct";
import Editproduct from "./componnents/productsoperations/Editproduct";
import Addnewproduct from "./componnents/productsoperations/Addnewproduct";
import Notfound from "../authentication/Notfound";

const AdminLayOut = () => {
  return (
    <div className="bg-[url('/img/pexels-goumbik-349609.jpg')] bg-cover min-h-screen">
      <Adminheader />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}>
        <Routes>
          <Route index element={<Welcometodashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="userview" element={<Userviewcard />} />
          <Route path="useredit" element={<Usereditcard />} />
          <Route path="productview" element={<Viewproduct />} />
          <Route path="productedit" element={<Editproduct />} />
          <Route path="addnewproduct" element={<Addnewproduct />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </motion.div>
    </div>
  );
};

export default AdminLayOut;
