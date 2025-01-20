import { axiosInstance } from "../axios-instance";
import {
  CreateClassPayload,
  DeleteClassPayload,
  EditStatusPayload,
  GetClassesPayload,
} from "./class.interface";

export const classApi = {
  getAllClasses: async ({ statusFilter, timeFilter }: GetClassesPayload) => {
    const params = new URLSearchParams();

    if (!!statusFilter) {
      params.append("status", statusFilter);
    }

    if (!!timeFilter) {
      const { endDate, startDate } = timeFilter;
      if (!!endDate && !!startDate) {
        params.append("startDate", startDate.toDateString());
        params.append("endDate", endDate.toDateString());
      }
    }

    const response = await axiosInstance.get("/class/all", { params });
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
