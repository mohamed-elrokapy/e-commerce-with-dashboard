import React from "react";
import { Button } from "@material-tailwind/react";
import Productstable from "../componnents/Productstable";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
const Products = () => {
  return (
    <div className="flex flex-col items-center gap-8 p-8 pb-16 bg-transparent min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl text-green-600 font-extrabold tracking-widest uppercase drop-shadow-md">
        Products
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}>
        <Link to={"/admin/addnewproduct"}>
          <Button className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg shadow-lg text-sm md:text-base">
            <FaPlus /> Add New Product
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full flex justify-center">
        <Productstable />
      </motion.div>
    </div>
  );
};

export default Products;
