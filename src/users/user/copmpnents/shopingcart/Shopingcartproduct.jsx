import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";

const Shopingcartproduct = ({ item, plus, minus, productdelete }) => {
  const [oneproducttotal, setoneproducttotal] = useState("");
  const producttotal = (+item.price * +item.count).toFixed(2);

  useEffect(() => {
    setoneproducttotal(producttotal);
  }, [item.count]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-gray-500 rounded-xl shadow-md p-4 flex flex-col  md:flex-row items-center justify-between gap-4 mb-4">
      {/* Product Info */}
      <div className="flex items-center justify-center  gap-4 w-full md:w-1/3">
        <img
          className="rounded-lg w-16 h-16 object-cover"
          src={item.img}
          alt="product"
        />
        <h2 className="text-gray-800 font-bold text-[1.2em]">
          {item.productDescription}
        </h2>
      </div>

      {/* Price */}
      <div className="text-center w-full md:w-1/6">
        <h3 className="text-white text-md font-bold">Price</h3>
        <p className="text-gray-800 font-semibold">${item.price}</p>
      </div>

      {/* Quantity */}
      <div className="w-full md:w-1/6 text-center">
        <h3 className="text-white text-md font-bold ">Quantity</h3>
        <div className="flex items-center justify-center gap-2">
          <Button
            onClick={() => minus(item.id)}
            size="sm"
            className="rounded-full bg-red-400 text-white"
            disabled={item.count === 1}>
            -
          </Button>
          <span className="font-medium">{item.count}</span>
          <Button
            onClick={() => plus(item.id)}
            size="sm"
            className="rounded-full bg-green-500 text-white">
            +
          </Button>
        </div>
      </div>

      <div className="text-center w-full md:w-1/6">
        <h3 className="text-white text-md font-bold">Total</h3>
        <p className="text-gray-800 font-semibold">${oneproducttotal}</p>
      </div>

      <div className="text-center w-full md:w-auto">
        <Button
          variant="text"
          className="text-red-500 hover:text-red-700 text-[2.5em]"
          onClick={() => productdelete(item.id)}>
          <AiFillDelete />
        </Button>
      </div>
    </motion.div>
  );
};

export default Shopingcartproduct;
