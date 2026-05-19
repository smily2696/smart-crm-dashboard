import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  FiMail,
  FiLock
} from "react-icons/fi";

import { toast }
from "react-toastify";

import { useAuth }
from "../../context/AuthContext";

import API
from "../../api/axios";


const Login = () => {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        setLoading(true);

        const { data } =
          await API.post(
            "/auth/login",
            {
              email,
              password
            }
          );


        console.log(data);


        // SAVE LOGIN
       login(
  data.data.token,
  data.data.user
);


        toast.success(
          "Login successful"
        );


        // REDIRECT
        navigate("/dashboard");

      } catch (error: any) {

        console.log(error);

        toast.error(
          error?.response?.data?.message ||
          "Login failed"
        );

      } finally {

        setLoading(false);
      }
    };


  return (

    <div
      className="
        min-h-screen flex
        items-center justify-center
        bg-gradient-to-br
        from-blue-600
        via-indigo-600
        to-purple-700
        p-4
      "
    >

      <div
        className="
          w-full max-w-md
          bg-white
          rounded-3xl
          shadow-2xl
          p-8
        "
      >

        <div className="text-center mb-8">

          <h1
            className="
              text-4xl font-bold
              text-gray-800
            "
          >
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to Smart CRM
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* EMAIL */}
          <div className="relative">

            <FiMail
              className="
                absolute top-4 left-4
                text-gray-400
              "
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                pl-12 pr-4 py-3
                border rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
              required
            />

          </div>


          {/* PASSWORD */}
          <div className="relative">

            <FiLock
              className="
                absolute top-4 left-4
                text-gray-400
              "
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                pl-12 pr-4 py-3
                border rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
              required
            />

          </div>


          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3 rounded-xl
              font-semibold
              transition duration-300
            "
          >

            {
              loading
                ? "Logging in..."
                : "Login"
            }

          </button>

        </form>


        <p
          className="
            text-center mt-6
            text-gray-600
          "
        >

          Don’t have an account?

          <Link
            to="/register"
            className="
              text-blue-600
              font-semibold
              ml-2
            "
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;