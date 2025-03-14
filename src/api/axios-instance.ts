import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : "https://mioreset-app-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
