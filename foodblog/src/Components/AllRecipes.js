import React, { useEffect, useState } from "react";
import Card from "./Card";
import Overall from "./Overall";
import { useContext } from "react";
import { fav } from "./Context";

function AllRecipes() {
  const [result, setResult] = useState([]);
  const [particular, setParticular] = useState(null);

  const view = (recipe) => {
    setParticular(recipe);
  };

  const display = async () => {
    try {
      const response = await fetch("http://localhost:5000/blog/all/");
      const array = await response.json();
      setResult(array);
      console.log(array);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    display();
  }, []);

  const closeDetailView = () => {
    setParticular(null);
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 min-h-screen bg-gray-100">
        {result.map((res, index) => (
          <Card
            key={index}
            title={res.title}
            description={res.description}
            src={res.image}
            view={() => view(res)}
          />
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
  );
}

export default AllRecipes;
