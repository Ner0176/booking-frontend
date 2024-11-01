import { axiosInstance } from "../axios-instance";
import { CreateClassPayload } from "./class.interface";

export const classApi = {
  createClass: async (payload: CreateClassPayload) => {
    const response = await axiosInstance.post("/class/create", payload);
    return response.data;
  },
};
