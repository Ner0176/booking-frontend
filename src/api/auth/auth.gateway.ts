import { LoginPayload, SignUpPayload } from "./auth.interface";
import { axiosInstance } from "../axios-instance";

export const authApi = {
  login: async (payload: LoginPayload) => {
    const response = await axiosInstance.post("/auth/login", payload);
    return response.data;
  },
  signUp: async (payload: SignUpPayload) => {
    const response = await axiosInstance.post("/auth/signUp", payload);
    return response.data;
  },
};
