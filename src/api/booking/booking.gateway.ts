import { axiosInstance } from "../axios-instance";
import { CreateBookingPayload, GetBookingPayload } from "./bookings.interface";

export const bookingApi = {
  getBookings: async ({ userId, classId }: GetBookingPayload) => {
    const params = new URLSearchParams();

    if (userId) params.append("userId", userId.toString());
    if (classId) params.append("classId", classId.toString());

    const response = await axiosInstance.get(`/booking/find`, { params });
    return response.data;
  },
  editBookings: async (payload: CreateBookingPayload) => {
    const response = await axiosInstance.patch("/booking/edit", payload);
    return response.data;
  },
};
