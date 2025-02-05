import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import AllRecipes from "./Components/AllRecipes";
import CreateBlogs from "./Components/CreateBlogs";
import Login from "./Components/Login";
import Favorites from "./Components/Favorites";
import EditRecipe from "./Components/Edit";
import { isLogin } from "./Components/Context";
import SignUpfun from "./Components/SignUp";
import { user_id } from "./Components/Context";
import Logout from "./Components/Logout";

function App() {
  const [login, setLogin] = useState(false);
  const [User_id, setUser_id] = useState("");

  return (
    <>
      <div>
        <BrowserRouter>
          {" "}
          <user_id.Provider value={{ User_id, setUser_id }}>
            <isLogin.Provider value={{ login, setLogin }}>
              <Navbar />
              <Routes>
                <Route element={<Home />} path="/"></Route>
                <Route element={<AllRecipes />} path="/Recipes"></Route>
                <Route element={<CreateBlogs />} path="/Create"></Route>
                <Route element={<Favorites />} path="/favorites"></Route>
                <Route element={<SignUpfun />} path="/user"></Route>
                <Route element={<Login />} path="/login"></Route>
                <Route element={<Logout />} path="/logout"></Route>
                <Route path="/edit/:id" element={<EditRecipe />} />
              </Routes>
            </isLogin.Provider>
          </user_id.Provider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
