import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAllNotifications } from "../../api/notification";
import { socket } from "../../socket/socketConnection";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getAllNotifications();
      setNotifications(data.notifications);
    })();
  }, []);

  return (
    <div className="absolute h-96 w-80 bg-dark-third right-10 top-12 overflow-y-auto rounded-b-lg p-1 ">
      <p className="text-lg">Notification</p>
      <div className="flex gap-3">
        <button>All</button>
        <button>Unread</button>
      </div>
      <div className="h-18 p-1 hover:bg-slate-500 flex gap-2 w-full rounded-lg cursor-pointer">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKr5wT7rfkjkGvNeqgXjBmarC5ZNoZs-H2uMpML8O7Q4F9W-IlUQibBT6IPqyvX45NOgw&usqp=CAU"
          alt=""
          className="rounded-full h-14 w-14"
        />
        <div>
          <p className="text-sm font-semibold">Nguyen Duc Anh</p>
          <p className="text-xs   text-gray-400">
            {"<"} anhnd277gmail.com {">"}
          </p>
          <p className="">sent you a friend request</p>
          <p className="text-xs">11 hours ago</p>
        </div>
        <div className="text-blue-500 font-semibold">New</div>
      </div>
      <div className="h-18 p-1 hover:bg-slate-500 flex gap-2 w-full text-gray-400 cursor-pointer ">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKr5wT7rfkjkGvNeqgXjBmarC5ZNoZs-H2uMpML8O7Q4F9W-IlUQibBT6IPqyvX45NOgw&usqp=CAU"
          alt=""
          className="rounded-full h-14 w-14"
        />
        <div>
          <p className="text-sm font-semibold">Nguyen Duc Anh</p>
          <p className="text-xs   text-gray-400">
            {"<"} anhnd277gmail.com {">"}
          </p>
          <p className="">sent you a friend request</p>
          <p className="text-xs">11 hours ago</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
