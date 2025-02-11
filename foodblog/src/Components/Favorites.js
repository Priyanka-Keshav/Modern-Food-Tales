import React, { useContext, useState, useEffect } from "react";
import Overall from "./Overall";
import { user_id } from "./Context";
import Card from "./Card";
import { Link } from "react-router-dom";

function Favorites() {
  const [result, setResult] = useState([]);
  const [particular, setParticular] = useState(null);
  const { User_id } = useContext(user_id);
  const [empty, setEmpty] = useState(true);

  const view = (recipe) => {
    setParticular(recipe);
    console.log(recipe.title);
  };

  const display = async () => {
    try {
      const response = await fetch(
        `https://food-blogging-website-hjc8.onrender.com/blog/user/${User_id}`
      );
      const array = await response.json();
      setResult(array);
      setEmpty(array.length === 0); // Set empty state based on results
      console.log(array);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    display(); // Fetch data on component mount
  }, []);

  const closeDetailView = () => {
    setParticular(null);
  };

  const delete_recipe = async (recipe) => {
    try {
      const response = await fetch(
        `https://food-blogging-website-hjc8.onrender.com/Blog/delete/${recipe._id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        console.log("deleted successfully");
        // Update result and empty state
        setResult((prevResult) =>
          prevResult.filter((item) => item._id !== recipe._id)
        );
        setEmpty(result.length === 1); // Update empty state dynamically
      } else {
        console.log("not deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Show Empty State if No Results */}
      {empty ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center">
            {/* Icon */}
            <div className="mb-6">
              <svg
                className="w-20 h-20 text-gray-400 mx-auto"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>

            {/* Heading */}
            <h1 className="text-2xl font-semibold text-gray-700 mb-2">
              This Page is Empty
            </h1>

            {/* Subheading */}
            <p className="text-gray-500 mb-6">
              There's nothing to see here right now. Check back later!
            </p>

            {/* Action Button */}
            <Link to="/">
              <button
                onClick={() => console.log("Redirecting...")}
                className="bg-green-500 text-white font-medium py-2 px-6 rounded-md hover:bg-green-600 transition duration-300"
              >
                Go Back Home
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Show Cards if Results Exist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 min-h-screen bg-gray-100">
            {result.map((res, index) => (
              <Card
                key={index}
                title={res.title}
                description={res.description}
                src={res.image}
                view={() => view(res)}
              >
                <button
                  className="bg-green-500 text-white font-bold shadow-md mt-6 py-2 px-4 rounded-full hover:bg-green-700 transition duration-300"
                  onClick={() => delete_recipe(res)}
                >
                  Delete
                </button>

                <Link to={`/edit/${res._id}`}>
                  {" "}
                  <button className="bg-green-500 text-white font-bold shadow-md mt-6 py-2 px-4 rounded-full hover:bg-green-700 transition duration-300">
                    {" "}
                    Edit{" "}
                  </button>{" "}
                </Link>
              </Card>
            ))}
          </div>
          {particular && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 bg-green-500 text-white font-bold shadow-md py-2 px-4 rounded-full hover:bg-green-700 transition duration-300"
                  onClick={closeDetailView}
                >
                  CLOSE
                </button>

                {/* Content */}
                <Overall
                  title={particular.title}
                  ingredients={particular.ingredients}
                  instructions={particular.instructions}
                  image={particular.image}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Favorites;
