import React from "react";
import Footer from "./Footer";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { isLogin } from "./Context";

function Home() {
  const { login, setLogin } = useContext(isLogin);
  return (
    <>
      <div className="flex flex-row">
        {" "}
        <p className="mx-auto p-6 bg-white rounded-lg shadow-md text-l mt-3">
          Welcome to Modern Food Tales, where the art of cooking meets the joy
          of sharing. Our food blog is a vibrant celebration of flavors,
          ingredients, and culinary creativity. Whether you're a seasoned chef
          or a home cook looking for inspiration, we offer a variety of recipes,
          cooking tips, and food stories designed to elevate your kitchen
          experience. From delectable appetizers to indulgent desserts, each
          recipe is thoughtfully crafted with the finest ingredients and clear
          instructions, making gourmet cooking accessible to all. Join us on a
          culinary journey and explore the diverse world of food with exciting
          new dishes, seasonal favorites, and behind-the-scenes glimpses into
          the world of cooking. With Modern Food Tales, every meal is an
          opportunity to explore, savor, and enjoy.
        </p>
        <img
          src="https://tocanvas.net/wp-content/uploads/2022/02/brooke-lark-HlNcigvUi4Q-unsplash.jpg"
          style={{
            height: "230px",
            width: "350px",
            marginTop: "20px",
            borderRadius: "5px",
            marginLeft: "2px",
            shadow: "md",
          }}
          alt=""
        ></img>
      </div>
      <div className="flex justify-center mt-6">
        {login ? (
          <Link to="/Create">
            {" "}
            <button className="bg-green-500 text-white font-bold shadow-md mt-6 py-2 px-4 rounded-full hover:bg-green-700 transition duration-300">
              Share Your Recipe
            </button>
          </Link>
        ) : (
          <Link to="/user">
            {" "}
            <button className="bg-green-500 text-white font-bold shadow-md mt-6 py-2 px-4 rounded-full hover:bg-green-700 transition duration-300">
              Share Your Recipe
            </button>
          </Link>
        )}
      </div>
      <div className="flex justify-center mt-6">
        <Footer></Footer>
      </div>
    </>
  );
}
export default Home;
