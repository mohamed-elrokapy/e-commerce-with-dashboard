import Productcard from "../Productcard";
import appcontext from "../../../context/appcontext";
import { useContext } from "react";
import { motion } from "framer-motion";
const Homeproducts = () => {
  const { products } = useContext(appcontext);

  return (
    <div className="bg-gray-800   py-5">
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        whileInView={{
          opacity: 1,
          x: 0,

          transition: {
            duration: 1.5,
          },
        }}
        className="text-white text-center mb-6 py-5 text-[2em] md:text-[3em]">
        Handpicked Products Just for You
      </motion.div>

      <div className="flex gap-[1em] items-center justify-center flex-wrap">
        {products?.slice(0, 6).map((product) => (
          <Productcard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Homeproducts;
