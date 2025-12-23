import { axiosInstance } from "../axios-instance";
import { GetAllUsersPayload, UpdateUserPayload } from "./user.interface";

export const userApi = {
  findMe: async () => {
    const response = await axiosInstance.get("/user/findMe");
    return response.data;
  },
  getAllUsers: async ({ page, limit, search }: GetAllUsersPayload) => {
    const params = new URLSearchParams();

    if (!!search) params.append("search", search);

    if (!!limit && !!page) {
      params.append("page", page.toString());
      params.append("limit", limit.toString());
    }

    const response = await axiosInstance.get("/user/all", { params });
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
