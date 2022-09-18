import React from "react";

const Notification = ({ color, notification }) => {
  return (
    <div className={color + " border-2 rounded"}>
      <p className="text-white px-4 py-2 font-semibold">{notification}</p>
    </div>
  );
};

export default Notification;
