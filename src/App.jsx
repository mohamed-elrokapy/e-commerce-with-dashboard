import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import UserLayOut from "./users/user/UserLayOut";
import appcontext from "./users/context/appcontext";
import axios from "axios";
import AdminLayOut from "./users/admin/AdminLayOut";

const FIREBASE_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL;
const App = () => {
  const [shoppinglist, setshoppinglist] = useState([]);
  const [products, setproducts] = useState([]);
  const [targeteduser, settargeteduser] = useState({});
  const [targetedproduct, settargetedproduct] = useState(null);
  const [refresh, setrefresh] = useState(false);
  const [addtocartcount, setaddtocartcount] = useState("");
  const [isloggedin, setisloggedin] = useState(
    localStorage.getItem("postuserid") ? true : false
  );
  const [logeduserinfo, setlogeduserinfo] = useState([]);
  const [allusers, setallusers] = useState([]);

  const fetchLoggedUser = (id) => {
    if (isloggedin && id) {
      axios
        .get(`${FIREBASE_URL}/users/${id}.json`)
        .then((response) => setlogeduserinfo({ id, ...response.data }))
        .catch((err) => console.error("Error fetching user:", err));
    }
  };

  const fetchproducts = () => {
    axios
      .get(`${FIREBASE_URL}/products.json`)
      .then((res) => {
        const data = res.data || {};
        console.log("Fetched products:", data);
        const formatted = Object.entries(data).map(([id, product]) => ({
          id,
          ...product,
        }));
        setproducts(formatted);
      })
      .catch((err) => console.error("Error fetching products:", err));
  };

  const fetchUsers = () => {
    axios
      .get(`${FIREBASE_URL}/users.json`)
      .then((res) => {
        const data = res.data || {};
        console.log("Fetched products:", data);
        const formatted = Object.entries(data).map(([id, user]) => ({
          id,
          ...user,
        }));
        setallusers(formatted);
      })
      .catch((err) => console.error("Error fetching users:", err));
  };

  useEffect(() => {
    fetchproducts();
    fetchUsers();
  }, [refresh]);

  useEffect(() => {
    fetchLoggedUser(localStorage.getItem("postuserid"));
  }, [isloggedin]);

  return (
    <appcontext.Provider
      value={{
        isloggedin,
        setisloggedin,
        logeduserinfo,
        setlogeduserinfo,
        products,
        addtocartcount,
        setaddtocartcount,
        targeteduser,
        settargeteduser,
        shoppinglist,
        setshoppinglist,
        allusers,
        fetchproducts,
        fetchUsers,
        refresh,
        setrefresh,
        targetedproduct,
        settargetedproduct,
      }}>
      <Routes>
        <Route path="/*" element={<UserLayOut />} />
        <Route path="/admin/*" element={<AdminLayOut />} />
      </Routes>
    </appcontext.Provider>
  );
};

export default App;
