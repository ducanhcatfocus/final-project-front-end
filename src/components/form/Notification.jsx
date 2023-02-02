import React from "react";

const Notification = ({ color, notification }) => {
  return (
    <div className={color + " border-2 rounded"}>
      <p className="dark:text-white text-red-500 px-4 py-2 font-semibold">
        {notification}
      </p>
    </div>
  );
};

export default Notification;
