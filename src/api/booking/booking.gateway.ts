import { axiosInstance } from "../axios-instance";
import { BookingPayload } from "./bookings.interface";

export const bookingApi = {
  getBookings: async ({ userId, classId }: BookingPayload) => {
    const params = new URLSearchParams();

    if (userId) params.append("userId", userId.toString());
    if (classId) params.append("classId", classId.toString());

    const response = await axiosInstance.get(`/booking/find`, { params });
    return response.data;
  },
};
