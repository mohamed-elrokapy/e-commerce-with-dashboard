import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export default function Notfound() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gray-900 text-white">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient bg-[length:400%_400%] z-0" />

      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-20 text-center px-4 max-w-xl">
        <Typography
          variant="h1"
          className="text-7xl font-extrabold text-white mb-4">
          404
        </Typography>
        <Typography variant="h4" className="mb-2">
          page not found
        </Typography>
        <Typography color="gray" className="mb-6 text-gray-300">
          the page you are looking for doesn't exist or has been removed.
        </Typography>
        <Button
          size="lg"
          className="bg-white text-gray-900 font-bold hover:bg-gray-200 transition"
          onClick={() => navigate("/")}>
          go to homepage
        </Button>
      </motion.div>
    </div>
  );
}
