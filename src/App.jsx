import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import UserLayOut from "./users/user/UserLayOut";
import appcontext from "./users/context/appcontext";
import axios from "axios";
import AdminLayOut from "./users/admin/AdminLayOut";

const FIREBASE_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL;
const App = () => {
  const [shoppinglist, setshoppinglist] = useState(() => {
    const savedList = localStorage.getItem("shoppinglist");
    return savedList ? JSON.parse(savedList) : [];
  });

  const [products, setproducts] = useState([]);
  const [targeteduser, settargeteduser] = useState({});
  const [targetedproduct, settargetedproduct] = useState(null);
  const [refresh, setrefresh] = useState(false);
  const [addtocartcount, setaddtocartcount] = useState("");
  const [isloggedin, setisloggedin] = useState(
    localStorage.getItem("userId") ? true : false
  );
  const [logeduserinfo, setlogeduserinfo] = useState([]);
  const [allusers, setallusers] = useState([]);

  const fetchLoggedUser = (userId) => {
    if (isloggedin) {
      axios
        .get(`${FIREBASE_URL}/users/${userId}.json`)
        .then((response) => setlogeduserinfo({ id: userId, ...response.data }))
        .catch((err) => console.error("Error fetching user:", err));
    }
  };

  const fetchproducts = () => {
    axios
      .get(`${FIREBASE_URL}/products.json`)
      .then((res) => {
        const data = res.data || {};
        console.log("Fetched products:", data);
        const formatted = Object.entries(data)
          .filter(([id, product]) => product !== null)
          .map(([id, product]) => ({
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
        const formatted = Object.entries(data)
          .filter(([id, user]) => user !== null)
          .map(([id, user]) => ({
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
    console.log("userISSSSSSddddd:", localStorage.getItem("userId"));
    const localStorageuserId = localStorage.getItem("userId");

    if (localStorageuserId) {
      fetchLoggedUser(localStorage.getItem("userId"));
    } else {
      fetchLoggedUser(sessionStorage.getItem("userId"));
    }
  }, [isloggedin]);

  return (
    <appcontext.Provider
      value={{
        isloggedin,
        setisloggedin,
        logeduserinfo,
        setlogeduserinfo,
        products,
        setproducts,
        addtocartcount,
        setaddtocartcount,
        targeteduser,
        settargeteduser,
        shoppinglist,
        setshoppinglist,
        allusers,
        fetchproducts,
        fetchUsers,
        fetchLoggedUser,
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
