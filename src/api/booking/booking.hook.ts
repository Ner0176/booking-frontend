import { bookingApi } from "./booking.gateway";
import { useQuery } from "@tanstack/react-query";
import { BookingPayload, IBooking } from "./bookings.interface";

export function useGetBookings(payload: BookingPayload) {
  return useQuery<IBooking[]>({
    queryKey: ["getBookings", payload],
    queryFn: () => bookingApi.getBookings(payload),
  });
}
