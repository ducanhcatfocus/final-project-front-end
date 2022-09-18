import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ContextMenu = ({ top, left, id }) => {
  const navigate = useNavigate();
  console.log(id);
  return (
    <>
      {window.innerWidth < left + 96 ? (
        <div
          style={{
            top: `${top}px`,
            left: `${window.innerWidth - 100}px`,
            position: "absolute",
          }}
        >
          <ul className="bg-gray-700 w-24 rounded text-gray-300 p-1 text-lg shadow-2xl select-none">
            <li className="hover:bg-blue-600 rounded p-1">
              <button onClick={() => navigate(`/profile/${id}`)}>
                Profile
              </button>
            </li>
            <li className="hover:bg-blue-600 rounded p-1">Remove</li>
          </ul>
        </div>
      ) : (
        <div
          style={{
            top: `${top}px`,
            left: `${left}px`,
            position: "absolute",
          }}
        >
          <ul className="bg-gray-700 w-24 rounded text-gray-300 p-1 text-lg shadow-2xl select-none">
            <li className="hover:bg-blue-600 rounded p-1">
              <button onClick={() => navigate(`/profile/${id}`)}>
                Profile
              </button>
            </li>
            <li className="hover:bg-blue-600 rounded p-1">Remove</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default ContextMenu;
