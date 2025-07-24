import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import appcontext from "../../context/appcontext";

const FIREBASE_URL = import.meta.env.REACT_APP_FIREBASE_DATABASE_URL;

const UserProfile = () => {
  const { logeduserinfo, fetchLoggedUser } = useContext(appcontext);
  const [showedit, setshowedit] = useState(false);
  const [updteduser, setupdateduser] = useState({});
  const navigate = useNavigate();

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
        await fetchLoggedUser(); // تحديث البيانات في السياق بعد التعديل
        navigate("/");
      } catch (error) {
        console.log("Updating error due to server issue", error);
      }
    }
  };

  const validation = () => {
    const { email, phone, address } = updteduser;
    return (
      email &&
      email.includes("@") &&
      phone &&
      phone.length >= 10 &&
      address &&
      address.length >= 5
    );
  };

  const handleChange = (e) => {
    setupdateduser({ ...updteduser, [e.target.name]: e.target.value });
  };

  if (!logeduserinfo) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">الملف الشخصي</h2>

      {showedit ? (
        <form onSubmit={handlingvalidation} className="space-y-4">
          <input
            type="text"
            name="username"
            value={updteduser.username}
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
            name="address"
            value={updteduser.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Address"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded">
              حفظ التعديلات
            </button>
            <button
              type="button"
              onClick={toggleEdit}
              className="bg-gray-300 text-black px-4 py-2 rounded">
              إلغاء
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-2">
          <p>
            <strong>اسم المستخدم:</strong> {logeduserinfo.username}
          </p>
          <p>
            <strong>البريد الإلكتروني:</strong> {logeduserinfo.email}
          </p>
          <p>
            <strong>رقم الهاتف:</strong> {logeduserinfo.phone}
          </p>
          <p>
            <strong>العنوان:</strong> {logeduserinfo.address}
          </p>
          <button
            onClick={toggleEdit}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded">
            تعديل البيانات
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
