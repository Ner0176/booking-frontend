import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8000/",
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
