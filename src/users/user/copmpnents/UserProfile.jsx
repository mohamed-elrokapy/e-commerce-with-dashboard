import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import appcontext from "../../context/appcontext";

const FIREBASE_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL;

const UserProfile = () => {
  const { logeduserinfo, fetchLoggedUser } = useContext(appcontext);
  const [showedit, setshowedit] = useState(false);
  const [updteduser, setupdateduser] = useState({});
  const navigate = useNavigate();
  console.log("logeduserinfo", logeduserinfo);

  useEffect(() => {
    if (logeduserinfo) {
      setupdateduser(logeduserinfo);
    }
  }, [logeduserinfo]);

  const toggleEdit = () => setshowedit(!showedit);

  const handlingvalidation = async (e) => {
    e.preventDefault();

    if (validation()) {
      try {
        await axios.patch(
          `${FIREBASE_URL}/users/${logeduserinfo.id}.json`,
          updteduser
        );
        await fetchLoggedUser(logeduserinfo.id);
        navigate("/");
      } catch (error) {
        console.log("Updating error due to server issue", error);
      }
    }
  };

  const validation = () => {
    const { email, phone, password, fullname } = updteduser;
    return (
      fullname &&
      email &&
      email.includes("@") &&
      phone &&
      phone.length >= 11 &&
      password &&
      password.length >= 8
    );
  };

  const handleChange = (e) => {
    setupdateduser({ ...updteduser, [e.target.name]: e.target.value });
  };

  if (!logeduserinfo) return <div>Loading...</div>;

  return (
    <div className="relative bg-blue-800 h-[100vh] flex flex-col items-center ">
      <div className=" flex flex-col max-w-xl mx-auto p-4 border absolute h-[80%] w-[50%] top-20 rounded-lg shadow-md ">
        <h2 className="text-2xl font-bold mb-4">الملف الشخصي</h2>

        {showedit ? (
          <form
            onSubmit={handlingvalidation}
            className="space-y-4 flex flex-col ">
            <input
              typ
              e="text"
              name="username"
              value={updteduser.fullname}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Username"
              disabled
            />
            <input
              type="email"
              name="email"
              value={updteduser.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Email"
            />
            <input
              type="text"
              name="phone"
              value={updteduser.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Phone"
            />
            <input
              type="text"
              name="password"
              value={updteduser.password}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Address"
            />
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded">
                save changes
              </button>
              <button
                type="button"
                onClick={toggleEdit}
                className="bg-gray-300 text-black px-4 py-2 rounded">
                cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-2 flex flex-col items-baseline justify-center gap-10">
            <p>
              <strong>user name:</strong> {logeduserinfo.fullname}
            </p>
            <p>
              <strong>user email:</strong> {logeduserinfo.email}
            </p>
            <p>
              <strong>user phone:</strong> {logeduserinfo.phone}
            </p>
            <p>
              <strong>user password:</strong> {logeduserinfo.password}
            </p>
            <button
              onClick={toggleEdit}
              className="mt-4 bg-yellow-500 text-black font-bold px-4 py-2 rounded">
              change data{" "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
