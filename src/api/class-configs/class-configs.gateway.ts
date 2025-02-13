import { axiosInstance } from "../axios-instance";
import { EditClassConfigsPayload } from "./class-configs.interface";

export const classConfigsApi = {
  getClassConfigs: async () => {
    const response = await axiosInstance.get("/class-configs");
    return response.data;
  },
  updateClassConfigs: async (payload: EditClassConfigsPayload) => {
    await axiosInstance.patch("/class-configs", payload);
  },
};
