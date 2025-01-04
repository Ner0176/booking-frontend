import { axiosInstance } from "../axios-instance";

export const userApi = {
  getAllUsers: async () => {
    const response = await axiosInstance.get("user/all");
    return response.data;
  },
};
