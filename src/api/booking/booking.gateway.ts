import { axiosInstance } from "../axios-instance";
import {
  CreateBookingPayload,
  GetBookingPayload,
  GetUserBookingsParams,
  RecoverBookingPayload,
} from "./bookings.interface";

export const bookingApi = {
  getBookings: async ({ classId }: GetBookingPayload) => {
    const params = new URLSearchParams();

    if (classId) params.append("classId", classId.toString());

    const response = await axiosInstance.get(`/booking/find`, { params });
    return response.data;
  },
  getUserBookingStats: async (userId: number) => {
    const response = await axiosInstance.get(`/booking/user-stats/${userId}`);
    return response.data;
  },
  getBookingsByUserId: async ({ userId, payload }: GetUserBookingsParams) => {
    const params = new URLSearchParams();

    Object.entries(payload).forEach(([key, value]) =>
      params.append(key, value.toString())
    );

    const response = await axiosInstance.get(`/booking/user/${userId}`, {
      params,
    });
    return response.data;
  },
  recoverBooking: async ({ classId, bookingId }: RecoverBookingPayload) => {
    await axiosInstance.post(`/booking/recover-booking/${bookingId}`, {
      classId,
    });
  },
  createBookings: async (payload: CreateBookingPayload) => {
    await axiosInstance.post("/booking/create", payload);
  },
  editBookings: async (payload: CreateBookingPayload) => {
    await axiosInstance.patch("/booking/edit", payload);
  },
  cancelBooking: async (bookingId: number, userId: number) => {
    await axiosInstance.patch(`/booking/${bookingId}`, { userId });
  },
};
