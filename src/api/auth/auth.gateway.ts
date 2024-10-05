import { LoginPayload } from "./auth.interface";
import { axiosInstance } from "../axios-instance";

export const authApi = {
  login: async (credentials: LoginPayload) => {
    const payload = {
      email: credentials.email,
      password: credentials.password,
    };
    const response = await axiosInstance.post("/auth/login", payload);
    return response.data;
  },
};
