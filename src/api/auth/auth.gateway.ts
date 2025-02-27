import {
  LoginPayload,
  SignUpPayload,
  ChangePasswordPayload,
} from "./auth.interface";
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
  forgotPassword: async (email: string) => {
    await axiosInstance.post("/auth/forgot-password", { email });
  },
  changePassword: async (payload: ChangePasswordPayload) => {
    await axiosInstance.post("/auth/change-password", payload);
  },
};
