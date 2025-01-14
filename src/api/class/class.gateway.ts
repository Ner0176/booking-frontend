import { axiosInstance } from "../axios-instance";
import {
  CreateClassPayload,
  DeleteClassPayload,
  EditStatusPayload,
} from "./class.interface";

export const classApi = {
  getAllClasses: async () => {
    const response = await axiosInstance.get("/class/all");
    return response.data;
  },
  createClass: async (payload: CreateClassPayload) => {
    const response = await axiosInstance.post("/class/create", payload);
    return response.data;
  },
  editClassStatus: async ({ id, cancel }: EditStatusPayload) => {
    await axiosInstance.patch(`/class/${id}`, { cancel });
  },
  deleteClass: async ({ id, isRecurrent }: DeleteClassPayload) => {
    const params = new URLSearchParams();

    params.append("isRecurrent", `${isRecurrent}`);

    await axiosInstance.delete(`/class/${id}`, { params });
  },
};
