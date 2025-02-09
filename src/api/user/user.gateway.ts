import { axiosInstance } from "../axios-instance";

export const userApi = {
  findMe: async () => {
    const response = await axiosInstance.get("/user/findMe");
    return response.data;
  },
  getAllUsers: async () => {
    const response = await axiosInstance.get("/user/all");
    return response.data;
  },
  deleteUser: async (id: number) => {
    await axiosInstance.delete(`/user/${id}`);
  },
};
