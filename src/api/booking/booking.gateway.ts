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
  createBookings: async (payload: CreateBookingPayload) => {
    await axiosInstance.post("/booking/create", payload);
  },
  editBookings: async (payload: CreateBookingPayload) => {
    await axiosInstance.patch("/booking/edit", payload);
  },
};
