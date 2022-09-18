import React from "react";
import { Link } from "react-router-dom";

const SideBarItem = ({ to, icon, label }) => {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center p-2  font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 text-xs lg:text-lg dark:focus:bg-dark-third"
      >
        {icon}
        <span className="flex-1 ml-1 whitespace-nowrap">{label}</span>
        {/* <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
          3
        </span> */}
      </Link>
    </li>
  );
};

export default SideBarItem;
