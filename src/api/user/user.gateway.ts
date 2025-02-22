import { axiosInstance } from "../axios-instance";
import { UpdateUserPayload } from "./user.interface";

export const userApi = {
  findMe: async () => {
    const response = await axiosInstance.get("/user/findMe");
    return response.data;
  },
  getAllUsers: async () => {
    const response = await axiosInstance.get("/user/all");
    return response.data;
  },
  hasAvailableCancellations: async () => {
    const response = await axiosInstance.get("/user/hasCancellations");
    return response.data;
  },
  updateUser: async (payload: UpdateUserPayload) => {
    await axiosInstance.patch("/user/update", payload);
  },
  deleteUser: async (id: number) => {
    await axiosInstance.delete(`/user/${id}`);
  },
};
