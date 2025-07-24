import React from "react";
import { motion } from "framer-motion";

const Welcometodashboard = () => {
  return (
    <div className="flex justify-center items-center h-[70vh] bg-blue-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto w-[90%] md:w-[70%] text-white text-left text-lg md:text-xl leading-relaxed space-y-4 bg-blue-gray-800 p-6 rounded-xl shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">
          Welcome Admin,
        </h2>
        <p>Here is where you can manage the system via the top navigation:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <span className="font-bold text-green-300">Dashboard</span> –
            General information about users and products.
          </li>
          <li>
            <span className="font-bold text-green-300">Products</span> – View,
            edit, or remove products.
          </li>
          <li>
            <span className="font-bold text-green-300">Users</span> – Manage and
            monitor registered users.
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Welcometodashboard;
