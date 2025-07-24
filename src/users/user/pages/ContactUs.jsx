import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <motion.input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className="w-full p-3 border rounded-md"
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <motion.input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 border rounded-md"
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700">
              Message
            </label>
            <motion.textarea
              id="message"
              {...register("message", { required: "Message is required" })}
              className="w-full p-3 border rounded-md"
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            />
            {errors.message && (
              <span className="text-red-500 text-sm">
                {errors.message.message}
              </span>
            )}
          </div>

          <motion.button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}>
            Submit
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default ContactUs;
