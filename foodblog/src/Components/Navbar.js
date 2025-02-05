import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { user_id } from "./Context";
import { isLogin } from "./Context";
import Swal from "sweetalert2";
function Navbar() {
  const { login, setLogin } = useContext(isLogin);
  const { User_id, setUser_id } = useContext(user_id);
  const navigate = useNavigate();
  const user_logout = () => {
    setLogin(false);
    setUser_id("");
    navigate("/user");
    Swal.fire({
      title: "Logged Out Successful!",
      text: "Now you cannot view your blogs",
      icon: "success",
      confirmButtonText: "Awesome!",
    });
  };
  return (
    <nav className="bg-green-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Modern Food Tales</div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            {login ? (
              <Link to="Recipes" className="text-white hover:text-gray-300">
                All Recipes
              </Link>
            ) : (
              <Link to="user" className="text-white hover:text-gray-300">
                All Recipes
              </Link>
            )}
          </li>
          <li>
            {login ? (
              <Link to="/favorites" className="text-white hover:text-gray-300">
                My Recipes
              </Link>
            ) : (
              <Link to="/user" className="text-white hover:text-gray-300">
                My Recipes
              </Link>
            )}
          </li>
          <li>
            {login ? (
              <Link to="/Create" className="text-white hover:text-gray-300">
                Create Blogs
              </Link>
            ) : (
              <Link to="/user" className="text-white hover:text-gray-300">
                Create Blogs
              </Link>
            )}
          </li>
          <li>
            {login ? (
              <button
                onClick={user_logout}
                className="text-white hover:text-gray-300"
              >
                Logout
              </button>
            ) : (
              <Link to="/user" className="text-white hover:text-gray-300">
                Login/SignUp
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
