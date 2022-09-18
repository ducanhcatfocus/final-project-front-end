import React, { createContext } from "react";
import { useState } from "react";

export const NotificationContext = createContext();

let timeOut;

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState("");
  const [color, setColor] = useState("");
  const updateNotification = (type, value) => {
    if (timeOut) clearTimeout(timeOut);
    switch (type) {
      case "error":
        setColor("border-rose-600");
        break;
      case "success":
        setColor("bg-green-400");
        break;
      case "warning":
        setColor("bg-orange-400");
        break;
      default:
        setColor("bg-green-400");
        break;
    }
    setNotification(value);
    timeOut = setTimeout(() => {
      setNotification("");
    }, 4000);
  };
  return (
    <NotificationContext.Provider
      value={{ updateNotification, color, notification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
