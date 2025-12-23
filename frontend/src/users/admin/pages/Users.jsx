import React from "react";
import Userstable from "../componnents/Userstable";
import { motion } from "framer-motion";

const Users = () => {
  return (
    <div className="flex flex-col items-center gap-8 p-8 min-h-screen bg-transparent">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl text-green-600 font-extrabold tracking-widest uppercase drop-shadow-md">
        Users
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full flex justify-center">
        <Userstable className="w-full" />
      </motion.div>
    </div>
  );
};

export default Users;
