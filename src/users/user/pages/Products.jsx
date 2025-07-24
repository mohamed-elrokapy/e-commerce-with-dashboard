import React from "react";
import appcontext from "../../context/appcontext";
import { useContext } from "react";
import Productcard from "../copmpnents/Productcard";
import { motion } from "framer-motion";
const Products = () => {
  const { products } = useContext(appcontext);
  const text = "our products made with love";
  const divVariants = {
    hidden: { opacity: 0, x: -1000 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 2,
        staggerChildren: 0.1,
      },
    },
  };

  const spanVariants = {
    hidden: { opacity: 0, x: -1000 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 5,
      },
    },
  };

  return (
    <div className=" bg-gray-800 pt-[4em] pb-4 ">
      <motion.div
        variants={divVariants}
        initial={"hidden"}
        animate={"visible"}
        className="  text-white   text-center text-[2em] py-4">
        {[...text].map((char, index) => (
          <motion.span variants={spanVariants} key={index}>
            {char}
          </motion.span>
        ))}
      </motion.div>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {products?.map((product) => {
          return <Productcard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Products;
