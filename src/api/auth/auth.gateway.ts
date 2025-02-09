import { LoginPayload, SignUpPayload } from "./auth.interface";
import { axiosInstance } from "../axios-instance";

export const authApi = {
  logout: async () => {
    await axiosInstance.post("/auth/logout");
  },
  login: async (payload: LoginPayload) => {
    const response = await axiosInstance.post("/auth/login", payload);
    return response.data;
  },
  signUp: async (payload: SignUpPayload) => {
    const response = await axiosInstance.post("/auth/signup", payload);
    return response.data;
  },
};
