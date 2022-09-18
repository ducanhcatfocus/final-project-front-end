import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const OnlineContext = createContext();

const OnlineProvider = ({ children }) => {
  const [onlineUser, setOnlineUser] = useState(null);

  const updateOnline = (users) => {
    setOnlineUser(users);
  };

  useEffect(() => {}, []);

  return (
    <OnlineContext.Provider value={{ updateOnline }}>
      {children}
    </OnlineContext.Provider>
  );
};

export default OnlineProvider;
