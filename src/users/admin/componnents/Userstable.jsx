import React, { useContext, Fragment } from "react";
import appcontext from "../../context/appcontext";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const FIREBASE_URL = import.meta.env.REACT_APP_FIREBASE_DATABASE_URL;
const Userstable = () => {
  const { refresh, setrefresh, allusers, settargeteduser } =
    useContext(appcontext);
  const navigate = useNavigate();

  const navigattouserview = (id) => {
    const user = allusers.find((user) => user.id === id);
    if (user) {
      settargeteduser(user);
      navigate("/admin/userview");
    }
  };

  const navigattouseredit = (id) => {
    const user = allusers.find((user) => user.id === id);
    if (user) {
      settargeteduser(user);
      navigate("/admin/useredit");
    }
  };

  const deleteuser = async (id) => {
    const user = allusers.find((user) => user.id === id);
    if (!user) return;

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          await axios.delete(`${FIREBASE_URL}/users/${user.id}.json`);
          setrefresh(!refresh);
          Swal.fire("Deleted!", "User deleted successfully.", "success");
        } catch (error) {
          console.error("Server error:", error);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  const changerole = async (id) => {
    const user = allusers.find((user) => user.id === id);
    if (!user) return;

    const newRole = user.role === "admin" ? "user" : "admin";

    try {
      await axios.patch(`${FIREBASE_URL}/users/${user.id}.json`, {
        role: newRole,
      });
      setrefresh(!refresh);
      Swal.fire("Role Updated", `Role changed to ${newRole}`, "success");
    } catch (error) {
      console.error("Error changing role:", error);
      Swal.fire("Error!", "Could not update role.", "error");
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex flex-col w-[95%] h-full mx-auto text-gray-300 bg-gray-800 shadow-md rounded-lg bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-gray-600 bg-gray-700">
                <p className="text-sm font-normal leading-none text-gray-300">
                  User Name
                </p>
              </th>
              <th className="p-4 border-b border-gray-600 bg-gray-700">
                <p className="text-sm font-normal leading-none text-gray-300">
                  Role
                </p>
              </th>
              <th className="p-4 border-b border-gray-600 bg-gray-700">
                <p className="text-sm font-normal leading-none text-gray-300">
                  Operations
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {allusers.map((user) => (
              <Fragment key={user.id}>
                <tr className="border-b hover:bg-gray-700">
                  <td className="p-4 border-gray-700">
                    <p className="text-sm text-gray-100 font-semibold">
                      {user.fullname}
                    </p>
                  </td>
                  <td className="p-4 border-gray-700">
                    <p className="text-sm text-gray-300">{user.role}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() => navigattouserview(user.id)}
                        className="p-2 w-24"
                        color="blue">
                        View
                      </Button>
                      <Button
                        onClick={() => navigattouseredit(user.id)}
                        className="p-2 w-24"
                        color="green">
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteuser(user.id)}
                        className="p-2 w-24"
                        color="red">
                        Delete
                      </Button>
                      <Button
                        onClick={() => changerole(user.id)}
                        className="p-2 w-32"
                        color="purple">
                        {user.role === "admin" ? "Set to User" : "Set to Admin"}
                      </Button>
                    </div>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Userstable;
