import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  FiUser,
  FiMail,
  FiLock
} from "react-icons/fi";

import { toast } from "react-toastify";

import API from "../../api/axios";


const Register = () => {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

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

        await API.post(
          "/auth/register",
          {
            name,
            email,
            password
          }
        );

        toast.success(
          "Registration successful"
        );

        navigate("/login");

      } catch (error: any) {

        toast.error(
          error?.response?.data?.message ||
          "Registration failed"
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
        from-purple-700
        via-indigo-600
        to-blue-600
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
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Register for Smart CRM
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* NAME */}
          <div className="relative">

            <FiUser
              className="
                absolute top-4 left-4
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="
                w-full
                pl-12 pr-4 py-3
                border rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-purple-500
              "
              required
            />

          </div>


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
                focus:ring-purple-500
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
                focus:ring-purple-500
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
              bg-purple-600
              hover:bg-purple-700
              text-white
              py-3
              rounded-xl
              font-semibold
              transition duration-300
              disabled:opacity-50
            "
          >

            {
              loading
                ? "Registering..."
                : "Register"
            }

          </button>

        </form>


        <p
          className="
            text-center mt-6
            text-gray-600
          "
        >

          Already have an account?

          <Link
            to="/login"
            className="
              text-purple-600
              font-semibold
              ml-2
            "
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;