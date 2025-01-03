import { axiosInstance } from "../axios-instance";
import { CreateClassPayload, DeleteClassPayload } from "./class.interface";

export const classApi = {
  getAllClasses: async () => {
    const response = await axiosInstance.get("/class/all");
    return response.data;
  },
  createClass: async (payload: CreateClassPayload) => {
    const response = await axiosInstance.post("/class/create", payload);
    return response.data;
  },
  deleteClass: async ({ id, isRecurrent }: DeleteClassPayload) => {
    const params = new URLSearchParams();

    params.append("id", id);
    params.append("isRecurrent", `${isRecurrent}`);

    await axiosInstance.delete("/class/delete", { params });
  },
};
