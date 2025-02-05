import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { isLogin } from "./Context";
import { user_id } from "./Context";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const { login, setLogin } = useContext(isLogin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { User_id, setUser_id } = useContext(user_id);
  const navigate = useNavigate();
  const handle_email = (e) => {
    setEmail(e.target.value);
  };
  const handle_password = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    user_login();
  };
  const user_login = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_id: email, password: password }),
      });

      if (response.ok) {
        Swal.fire({
          title: "Login Successful!",
          text: "Now you can write blogs.",
          icon: "success",
          confirmButtonText: "Awesome!",
          buttonsStyling: false, // Disable default styles
          customClass: {
            confirmButton: "custom-green-button", // Add your own class
          },
        });
        const data = await response.json();
        console.log(data);
        setLogin(true);
        setUser_id(data._id);
        console.log(User_id);
        navigate("/create");
      } else if (!response.ok) {
        alert("Login unsuccessful");

        Swal.fire({
          title: "Login Failed",
          text: "Please check your email and password.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={handle_email}
              value={email}
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handle_password}
              value={password}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white font-bold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
          <p className="mt-4 text-center text-sm text-gray-600">
            New User
            <Link
              to="/user"
              className="text-green-500 hover:text-green-700 font-medium"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
