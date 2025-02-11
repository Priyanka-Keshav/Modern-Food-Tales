import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { user_id } from "./Context";
import Swal from "sweetalert2";
function CreateBlogs() {
  const navigate = useNavigate();
  const { User_id } = useContext(user_id);

  const [create_data, setCreate] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    image: "",
    userId: User_id,
  });

  const submit = (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    create_Blog();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreate({ ...create_data, [name]: value });
  };

  const create_Blog = async () => {
    try {
      const response = await fetch(
        "https://food-blogging-website-hjc8.onrender.com/Blog/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(create_data),
        }
      );

      if (response.ok) {
        setCreate({
          title: "",
          description: "",
          ingredients: "",
          instructions: "",
          image: "",
          userId: User_id,
        });
        Swal.fire({
          title: "Successful!",
          text: "Now you can view your blogs",
          icon: "success",
          confirmButtonText: "Explore our site!",
        });
        navigate("/");
      } else {
        Swal.fire({
          title: "Oops Unable to add your blog",
          text: "Check all the content properly",
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={submit}
        className="max-w-md w-full bg-white p-8 rounded-lg shadow-md"
      >
        <label
          htmlFor="title"
          className="block text-gray-700 font-semibold mb-2"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={create_data.title}
          placeholder="Enter your Dish's name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <label
          htmlFor="description"
          className="block text-gray-700 font-semibold mb-2"
        >
          Description
        </label>
        <textarea
          placeholder="Enter Description"
          name="description"
          onChange={handleChange}
          value={create_data.description}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <label
          htmlFor="ingredients"
          className="block text-gray-700 font-semibold mb-2"
        >
          Ingredients
        </label>
        <input
          placeholder="Enter Ingredients"
          name="ingredients"
          onChange={handleChange}
          value={create_data.ingredients}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <label
          htmlFor="instructions"
          className="block text-gray-700 font-semibold mb-2"
        >
          Instructions
        </label>
        <textarea
          onChange={handleChange}
          placeholder="Enter instructions"
          name="instructions"
          value={create_data.instructions}
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        ></textarea>

        <label
          htmlFor="image"
          className="block text-gray-700 font-semibold mb-2"
        >
          Add Image Link in png or jpg format
        </label>
        <input
          placeholder="Enter Image Link"
          name="image"
          onChange={handleChange}
          value={create_data.image}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <button
          type="submit"
          className="bg-green-500 text-white font-bold shadow-md mt-6 py-2 px-4 rounded-full hover:bg-green-700 transition duration-300"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateBlogs;
