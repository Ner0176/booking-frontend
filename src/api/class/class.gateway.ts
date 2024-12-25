import { axiosInstance } from "../axios-instance";
import { CreateClassPayload } from "./class.interface";

export const classApi = {
  getAllClasses: async () => {
    const response = await axiosInstance.get("/class/all");
    return response.data;
  },
  createClass: async (payload: CreateClassPayload) => {
    const response = await axiosInstance.post("/class/create", payload);
    return response.data;
  },
};
