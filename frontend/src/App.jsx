import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import UserLayOut from "./users/user/UserLayOut";
import appcontext from "./users/context/appcontext";
import axios from "axios";
import AdminLayOut from "./users/admin/AdminLayOut";

const STRAPI_URL = import.meta.env.VITE_STRAPI_API_END_POINT; // http://localhost:1337/api

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

  // جلب اليوزر المسجل دخول (من /api/users/me)
  const fetchLoggedUser = (token) => {
    if (!token) return;

    axios
      .get(`${STRAPI_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setlogeduserinfo(response.data);
        setisloggedin(true);
      })
      .catch((err) => {
        console.error("Error fetching logged user:", err);
        setisloggedin(false);
      });
  };

  const fetchproducts = () => {
    axios
      .get(`${STRAPI_URL}/products`, { cache: "force-cache" })
      .then((res) => {
        console.log("Raw response:", res.data.data);

        setproducts(res.data.data || []);
      })
      .catch((err) => {
        console.error("Error:", err.response?.data || err.message);
      });
  };

  // جلب كل اليوزرز (للـ Admin فقط - يحتاج JWT token)
  const fetchUsers = () => {
    const token = localStorage.getItem("jwtToken"); // افترض إنك حفظته بعد login

    if (!token) {
      console.log("No JWT token, cannot fetch all users");
      return;
    }

    axios
      .get(`${STRAPI_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setallusers(res.data); // array مباشر
        console.log("All users:", res.data);
      })
      .catch((err) => {
        console.error(
          "Error fetching all users:",
          err.response?.data || err.message
        );
      });
  };

  useEffect(() => {
    fetchproducts();
    // fetchUsers(); // فعلها بس لما يكون في token (مثل في Admin panel)
  }, [refresh]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      fetchLoggedUser(token);
    }
  }, []);

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
        setallusers,
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
