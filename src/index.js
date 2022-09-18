import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/AuthProvider";
import NotificationProvider from "./context/NotificationProvider";
import ThemeProvider from "./context/ThemeProvider";
import "./index.css";
import store from "./store/store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <NotificationProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </NotificationProvider>
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
