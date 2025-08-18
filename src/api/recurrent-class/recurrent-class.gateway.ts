import { axiosInstance } from "../axios-instance";
import { UpdateClassColor } from "./recurrent-class.interface";

export const recurrentClassApi = {
  getRecurrentUsers: async (recurrentId: number) => {
    const response = await axiosInstance.get(
      `/recurrent-class/get-users/${recurrentId}`
    );
    return response.data;
  },
  updateColor: async ({ color, recurrentId }: UpdateClassColor) => {
    await axiosInstance.patch(`/recurrent-class/color/${recurrentId}`, {
      color,
    });
  },
  deleteRecurrentClasses: async (recurrentId: number) => {
    await axiosInstance.delete(`/recurrent-class/${recurrentId}`);
  },
};
