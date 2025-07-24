import React, { useContext, useEffect, useState } from "react";
import appcontext from "../../context/appcontext";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import Swal from "sweetalert2";

const FIREBASE_URL = import.meta.env.REACT_APP_FIREBASE_DATABASE_URL;
export default function Usereditcard() {
  const { targeteduser, setrefresh, refresh } = useContext(appcontext);
  const [updateduser, setupdateduser] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
  });
  const [editable, setEditable] = useState(false);
  const [valid, setvalid] = useState({});
  const [error, seterror] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (targeteduser) {
      setupdateduser({
        fullname: targeteduser.fullname || "",
        email: targeteduser.email || "",
        password: targeteduser.password || "",
        phone: targeteduser.phone || "",
      });
    }
  }, [targeteduser]);

  const validation = () => {
    const newerrors = {};
    const newvalidators = {};
    const emailvalidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonevalidation = /^\+?[0-9]{10,15}$/;

    // Fullname
    const trimmedName = updateduser.fullname.trim();
    if (!trimmedName) {
      newerrors.fullname = "Please enter your full name";
    } else if (!/^[\p{L}\s]+$/u.test(trimmedName)) {
      newerrors.fullname = "Name must contain only letters and spaces";
    } else {
      newvalidators.fullname = "Valid name";
    }

    // Email
    const trimmedEmail = updateduser.email.trim();
    if (!trimmedEmail) {
      newerrors.email = "Please enter your email";
    } else if (!emailvalidation.test(trimmedEmail)) {
      newerrors.email = "Invalid email format";
    } else {
      newvalidators.email = "Valid email format";
    }

    // Password
    const trimmedPass = updateduser.password.trim();
    if (!trimmedPass) {
      newerrors.password = "Please enter a password";
    } else if (trimmedPass.length < 6) {
      newerrors.password = "Password must be at least 6 characters";
    } else {
      newvalidators.password = "Valid password";
    }

    // Phone
    const trimmedPhone = updateduser.phone.trim();
    if (!trimmedPhone) {
      newerrors.phone = "Please enter your phone";
    } else if (!phonevalidation.test(trimmedPhone)) {
      newerrors.phone = "Invalid phone format";
    } else {
      newvalidators.phone = "Valid phone format";
    }

    seterror(newerrors);
    setvalid(newvalidators);
    return Object.keys(newerrors).length === 0;
  };

  const handlingformsubmiting = async (e) => {
    e.preventDefault();
    if (!validation()) return;

    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save the changes?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    });

    if (!confirmation.isConfirmed) return;

    try {
      await axios.patch(
        `${FIREBASE_URL}/users/${targeteduser.id}.json`,
        updateduser
      );

      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User updated successfully.",
        confirmButtonColor: "#3085d6",
      });

      setrefresh(!refresh);
      navigate("/admin/users");
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire("Error", "Could not update user.", "error");
    }
  };

  return (
    <div className="flex items-center justify-center my-8">
      <Card
        className={`${
          editable ? "bg-white" : "bg-gray-600"
        } w-[80%] md:w-[40%]`}>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-1 grid h-10 place-items-center p-10">
          <Typography variant="h5" color="white">
            Updating User Information
          </Typography>
        </CardHeader>

        <form onSubmit={handlingformsubmiting}>
          <CardBody className="flex flex-col gap-2">
            {/* Full Name */}
            <Input
              label="User Full Name"
              size="lg"
              color="black"
              value={updateduser.fullname}
              onChange={(e) =>
                setupdateduser({ ...updateduser, fullname: e.target.value })
              }
              readOnly={!editable}
            />
            <Typography variant="small" className="mt-1 text-center">
              {error.fullname && (
                <span className="text-red-500">{error.fullname}</span>
              )}
              {valid.fullname && (
                <span className="text-green-500">{valid.fullname}</span>
              )}
            </Typography>

            {/* Email */}
            <Input
              label="Email"
              size="lg"
              color="black"
              value={updateduser.email}
              onChange={(e) =>
                setupdateduser({ ...updateduser, email: e.target.value })
              }
              readOnly={!editable}
            />
            <Typography variant="small" className="mt-1 text-center">
              {error.email && (
                <span className="text-red-500">{error.email}</span>
              )}
              {valid.email && (
                <span className="text-green-500">{valid.email}</span>
              )}
            </Typography>

            {/* Phone */}
            <Input
              label="Phone"
              size="lg"
              color="black"
              value={updateduser.phone}
              onChange={(e) =>
                setupdateduser({ ...updateduser, phone: e.target.value })
              }
              readOnly={!editable}
            />
            <Typography variant="small" className="mt-1 text-center">
              {error.phone && (
                <span className="text-red-500">{error.phone}</span>
              )}
              {valid.phone && (
                <span className="text-green-500">{valid.phone}</span>
              )}
            </Typography>

            {/* Password */}
            <Input
              label="Password"
              size="lg"
              color="black"
              value={updateduser.password}
              onChange={(e) =>
                setupdateduser({ ...updateduser, password: e.target.value })
              }
              readOnly={!editable}
            />
            <Typography variant="small" className="mt-1 text-center">
              {error.password && (
                <span className="text-red-500">{error.password}</span>
              )}
              {valid.password && (
                <span className="text-green-500">{valid.password}</span>
              )}
            </Typography>
          </CardBody>

          <CardFooter className="pt-0 flex justify-between items-center gap-2">
            <Button
              variant="outlined"
              className="w-[50%] p-3"
              onClick={() => setEditable(true)}>
              Edit
            </Button>
            <Button
              type="submit"
              variant="gradient"
              className="w-[50%] p-3"
              disabled={!editable}>
              Confirm Editing
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
