import React from "react";

function Overall({ title, ingredients, instructions, image }) {
  return (
    <div className="max-w-md rounded-lg overflow-hidden shadow-lg bg-white">
      {/* Image */}
      <img
        src={image}
        alt="Recipe"
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
        {/* Ingredients */}
        <h3 className="text-lg font-medium text-gray-700">Ingredients:</h3>
        <h3 className="list-disc list-inside text-gray-600 ml-4 mb-4">
          {ingredients}
        </h3>
        {/* Instructions */}
        <h3 className="text-lg font-medium text-gray-700">Instructions:</h3>
        <p className="text-gray-600">{instructions}</p>
      </div>
    </div>
  );
}

export default Overall;
