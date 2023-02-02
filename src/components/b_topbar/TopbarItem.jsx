import React from "react";
import { Link, useLocation } from "react-router-dom";

const TopbarItem = ({ to, icon, label, friendRequests }) => {
  const location = useLocation();

  return (
    <Link
      to={to}
      className={
        location.pathname.includes(to)
          ? "border-b-2 border-dark-primary dark:border-white"
          : null
      }
    >
      <button className="flex items-center gap-1 dark:hover:bg-slate-500 hover:bg-slate-400 rounded-lg p-1">
        {icon}
        <p>{label}</p>
        {friendRequests ? (
          <div className="bg-blue-500 h-5 w-5 rounded-full text-sm">
            {friendRequests}
          </div>
        ) : null}
        {to === "/room" ? (
          <div className="bg-red-600 h-2 w-2 rounded-full"></div>
        ) : null}
      </button>
    </Link>
  );
};

export default TopbarItem;
