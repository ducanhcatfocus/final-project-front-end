import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connectWithSocketServer } from "../socket/socketConnection";
import { getIsAuth, loginUser } from "../api/auth";

export const authContext = createContext();

const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: "",
};

const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await loginUser({ email, password });
    if (error) {
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }
    if (!user.isVerified) {
      navigate("/auth/verification", { state: { user: user }, replace: true });
      return;
    }
    setAuthInfo({
      profile: { ...user },
      isPending: false,
      error: "",
      isLoggedIn: true,
    });

    localStorage.setItem("auth-token", user.token);
    connectWithSocketServer(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setAuthInfo({ ...defaultAuthInfo });
    navigate("/auth/login");
  };

  const isAuth = async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) return navigate("/auth/login");

    setAuthInfo({ ...authInfo, isPending: true });

    const { error, user } = await getIsAuth(token);
    if (error) {
      console.log(error);
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }

    setAuthInfo({
      profile: { ...user },
      isPending: false,
      error: "",
      isLoggedIn: true,
    });
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <authContext.Provider
      value={{ authInfo, handleLogin, isAuth, handleLogout }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
