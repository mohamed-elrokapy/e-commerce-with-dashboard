import React, { useContext, Fragment, useEffect } from "react";
import appcontext from "../../context/appcontext";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const Productstable = () => {
  const FIREBASE_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL;
  const { setproducts, products, settargetedproduct } = useContext(appcontext);
  const navigate = useNavigate();

  const navigateToView = (id) => {
    const product = products.find((p) => p.id === id);
    settargetedproduct(product);
    navigate("/admin/productview");
  };

  const navigateToEdit = (id) => {
    const product = products.find((p) => p.id === id);
    settargetedproduct(product);
    navigate("/admin/productedit");
  };

  const deleteProduct = async (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${FIREBASE_URL}/products/${product.id}.json`);
        console.log("Product deleted:", products);

        await Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Product deleted successfully.",
          confirmButtonColor: "#3085d6",
        });
        setproducts((prev) =>
          prev.filter((product) => product && product.id !== id)
        );
      } catch (err) {
        console.error("Error deleting product:", err);
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Something went wrong while deleting.",
        });
      }
    }
  };

  return (
    <div className="w-full p-4">
      <div className="w-[95%] mx-auto text-gray-300 bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg rounded-lg overflow-hidden">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-700 text-white text-sm">
              <th className="p-4 border-b border-gray-600">Product</th>
              <th className="p-4 border-b border-gray-600">Price</th>
              <th className="p-4 border-b border-gray-600">Operations</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <Fragment key={product.id}>
                <motion.tr
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition-all">
                  <td className="p-4">
                    <p className="text-sm font-medium text-white truncate max-w-xs">
                      {product.productDescription}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-gray-300">{product.price} $</p>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() => navigateToView(product.id)}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 p-2 text-white">
                        <FaEye /> View
                      </Button>
                      <Button
                        onClick={() => navigateToEdit(product.id)}
                        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 p-2 text-white">
                        <FaEdit /> Edit
                      </Button>
                      <Button
                        onClick={() => deleteProduct(product.id)}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 p-2 text-white">
                        <FaTrash /> Delete
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Productstable;
