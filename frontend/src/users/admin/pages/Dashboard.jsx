import React from "react";
import Dashboardcard from "../componnents/Dashboardcard";
import appcontext from "../../context/appcontext";
import { useContext } from "react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { allusers, products } = useContext(appcontext);
  console.log(allusers);

  const userscount = allusers.length;
  const lastuserregisteredname = allusers[allusers.length - 1]?.fullname;

  const productcoun = products.length;
  const lastproduct = products[products.length - 1]?.title;
  console.log(productcoun, lastproduct);

  const alldata = [
    {
      title: "users",
      count: userscount,
      numberlabel: "number of users",
      lastaded: lastuserregisteredname,
      lastaddedlabel: "last user registered",
    },
    {
      title: "products",
      count: productcoun,
      numberlabel: "number of products",
      lastaded: lastproduct,
      lastaddedlabel: "last added product",
    },
  ];

  return (
    <div>
      <div className="flex flex-col items-center md:flex-row md:justify-evenly">
        {alldata.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}>
            <Dashboardcard
              numberlabel={item.numberlabel}
              count={item.count}
              title={item.title}
              lastaded={item.lastaded}
              lastaddedlabel={item.lastaddedlabel}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
