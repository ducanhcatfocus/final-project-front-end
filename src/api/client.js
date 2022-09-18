import axios from "axios";

const baseURL =
  process.env.REACT_APP_NOT_SECRET_CODE === "production"
    ? window.location.hostname + "/api"
    : "http://localhost:5000/api";

const client = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
  },
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default client;
