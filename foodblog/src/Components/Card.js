import React from "react";

function Card({ title, description, src, view, children }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-sm transition duration-300 transform hover:scale-105">
      <img
        className="w-full h-40 object-cover"
        src={src}
        alt={`Card image`}
      ></img>
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        <p className="text-gray-700 text-base">{description}</p>

        <button
          className="bg-green-500 text-white font-bold shadow-md mt-6 py-2 px-4 rounded-full hover:bg-green-700 transition duration-300"
          onClick={view}
        >
          View Recipe
        </button>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

export default Card;
