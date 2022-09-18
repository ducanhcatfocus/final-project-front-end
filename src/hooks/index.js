import { useContext } from "react";
import { authContext } from "../context/AuthProvider";
import { NotificationContext } from "../context/NotificationProvider";
import { ThemeContext } from "../context/ThemeProvider";

export const useTheme = () => useContext(ThemeContext);

export const useNotification = () => useContext(NotificationContext);
export const useAuth = () => useContext(authContext);
