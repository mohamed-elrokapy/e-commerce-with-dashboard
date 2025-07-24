import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Input, Button, Checkbox } from "@material-tailwind/react";
import appcontext from "../context/appcontext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setisloggedin } = useContext(appcontext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();

      if (remember) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }
      setisloggedin(true);
      navigate("/"); // redirect to private route
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      localStorage.setItem("token", token);
      setisloggedin(true);
      navigate("/");
    } catch (err) {
      setError("Google sign-in failed");
      console.error(err);
    }
  };

  return (
    <div className="relative h-[80vh]">
      <div className="absolute  max-w-md mx-auto  mb-10  p-6 shadow-lg border rounded-xl top-20 left-[13%] md:left-[25%]  lg:left-[35%] ">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4 w-96">
          <Input
            type="email"
            placeholder="Email"
            required
            autocomplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center gap-2">
            <Checkbox
              checked={remember}
              onChange={() => setRemember(!remember)}
              id="rememberMe"
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p>or</p>
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="mt-2 w-full">
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
