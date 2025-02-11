import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function EditRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch the recipe data using the id from the URL
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `https://food-blogging-website-backend.onrender.com/Blog/${id}`
        );
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://food-blogging-website-backend.onrender.com/Blog/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipe),
        }
      );

      if (response.ok) {
        alert("Recipe updated successfully");
      } else {
        alert("Failed to update recipe");
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("Error occurred while updating recipe");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  if (!recipe) {
    return <div className="text-center text-green-600">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-green-700 mb-6">
        Edit Recipe
      </h1>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg text-green-600">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg text-green-600">
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={recipe.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="ingredients" className="block text-lg text-green-600">
            Ingredients:
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="4"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="instructions"
            className="block text-lg text-green-600"
          >
            Instructions:
          </label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="4"
          ></textarea>
        </div>

        <div>
          <label htmlFor="image" className="block text-lg text-green-600">
            Image URL:
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={recipe.image}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Update Recipe
        </button>
      </form>
      <Link to="/">
        <button
          onClick={() => console.log("Redirecting...")}
          className="bg-green-500 text-white font-medium py-2 px-6 rounded-md hover:bg-green-600 transition duration-300 mt-4"
        >
          Go Back Home
        </button>
      </Link>
    </div>
  );
}

export default EditRecipe;
