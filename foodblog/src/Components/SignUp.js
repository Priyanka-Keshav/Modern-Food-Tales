import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function SignUpfun() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signUp = async () => {
    try {
      const response = await fetch(
        "https://food-blogging-website-hjc8.onrender.com/user/create/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email_id: email, password: password }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        Swal.fire({
          title: "Successful!",
          text: "Now you can Login.",
          icon: "success",
          confirmButtonText: "Explore!",
        });
        navigate("/login");
      } else {
        Swal.fire({
          title: "User already exists",
          text: "Try to Login",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "  SignUp Failed",
        text: "Please check your email and password.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      alert("An error occurred. Please try again.");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    // Do not log password in production
    signUp();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
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
              name="email"
              value={email}
              onChange={handleEmailChange}
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
              value={password}
              onChange={handlePasswordChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white font-bold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="text-green-500 hover:text-green-700 font-medium"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpfun;
