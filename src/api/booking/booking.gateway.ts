import { axiosInstance } from "../axios-instance";

export const bookingApi = {
  getBookings: async () => {
    const response = await axiosInstance.get("/booking/find");
    return response.data;
  },
};
