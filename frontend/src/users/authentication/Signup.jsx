import { useForm } from "react-hook-form";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



const Register = () => {
  const FIREBASE_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL;
  const navigate = useNavigate();

  const [generalError, setGeneralError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const id = uuidv4();

    const userData = {
      ...data,
      id,
      role: "user",
    };

    try {
      await axios.put(`${FIREBASE_URL}/users/${id}.json`, userData);

      reset();
      navigate("/login");
    } catch (err) {
      setGeneralError("❌ Error adding user: " + err.message);
    }
  };

  return (
    <div className="relative bg-blue-800 h-[100vh] flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-evenly w-full absolute max-w-md h-[80vh] mx-auto mb-10 p-6 shadow-lg border rounded-xl top-20 border-gray-300 bg-white">
        <label className="bg-blue-500 text-center text-[2em] text-white">
          Sign Up
        </label>

        {generalError && <p>{generalError}</p>}
        <input
          type="text"
          placeholder="Full Name"
          {...register("fullname", { required: "Full name is required" })}
          className="w-full border p-2"
        />
        {errors.fullname && (
          <p className="text-red-500">{errors.fullname.message}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
          className="w-full border p-2"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="text"
          placeholder="Phone"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^01[0125][0-9]{8}$/,
              message: "Invalid Egyptian phone number",
            },
          })}
          className="w-full border p-2"
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
              message:
                "Must include uppercase, number, and special character (!@#$%^&*)",
            },
          })}
          className="w-full border p-2"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
