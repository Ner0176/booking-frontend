import { axiosInstance } from "../axios-instance";
import {
  CreateClassPayload,
  DeleteClassPayload,
  EditClassPayload,
  GetClassesPayload,
} from "./class.interface";

export const classApi = {
  getAllClasses: async ({
    timeFilter,
    statusFilter,
    excludeUserBookings,
  }: GetClassesPayload) => {
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

    if (!!excludeUserBookings) {
      params.append("excludeUserBookings", `${excludeUserBookings}`);
    }

    const response = await axiosInstance.get("/class/all", { params });
    return response.data;
  },
  createClass: async (payload: CreateClassPayload) => {
    const response = await axiosInstance.post("/class/create", payload);
    return response.data;
  },
  editClass: async ({ id, ...payload }: EditClassPayload) => {
    await axiosInstance.patch(`/class/${id}`, payload);
  },
  deleteClass: async ({ id, isRecurrent }: DeleteClassPayload) => {
    const params = new URLSearchParams();

    params.append("isRecurrent", `${isRecurrent}`);

    await axiosInstance.delete(`/class/${id}`, { params });
  },
};
