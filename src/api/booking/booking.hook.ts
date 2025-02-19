import { bookingApi } from "./booking.gateway";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateBookingPayload,
  GetBookingPayload,
  GetUserBookingsPayload,
  IBooking,
  IUserBooking,
} from "./bookings.interface";
import { showToast } from "../../components";
import { useTranslation } from "react-i18next";
import { useSearchParamsManager } from "../../hooks";

export function useGetBookings(payload: GetBookingPayload) {
  return useQuery<IBooking[]>({
    queryKey: ["getBookings", payload],
    queryFn: () => bookingApi.getBookings(payload),
  });
}

export function useGetBookingsFromUser(
  userId: number,
  payload: GetUserBookingsPayload,
  enabled?: boolean
) {
  return useQuery<IUserBooking[]>({
    enabled: enabled ?? true,
    queryKey: ["getBookingsByUserId", userId, payload],
    queryFn: () => bookingApi.getBookingsByUserId(userId, payload),
  });
}

export function useCreateBookings(handleSuccess: () => void) {
  const { t } = useTranslation();
  const basePath = "Classes.Event.CreateBookings";

  return useMutation({
    mutationFn: (payload: CreateBookingPayload) =>
      bookingApi.createBookings(payload),
    onSuccess() {
      handleSuccess();
      showToast({ text: t(`${basePath}.Success`), type: "success" });
    },
    onError() {
      showToast({ text: t(`${basePath}.Error`), type: "error" });
    },
  });
}

export function useEditBookings(refetch: () => void) {
  const { t } = useTranslation();
  const basePath = "Classes.ClassDetails.AttendeesList";
  const { setParams } = useSearchParamsManager([]);

  return useMutation({
    mutationFn: (payload: CreateBookingPayload) =>
      bookingApi.editBookings(payload),
    onSuccess() {
      refetch();
      setParams([{ key: "action" }]);
      showToast({
        type: "success",
        text: t(`${basePath}.Success`),
      });
    },
    onError() {
      showToast({
        type: "error",
        text: t(`${basePath}.Error`),
      });
    },
  });
}

export function useCancelBooking(handleSuccess: () => void) {
  const { t } = useTranslation();
  const basePath = "UserBookings.Cancel";

  return useMutation({
    mutationFn: (bookingId: number) => bookingApi.cancelBooking(bookingId),
    onSuccess() {
      handleSuccess();
      showToast({ text: t(`${basePath}.Success`), type: "success" });
    },
    onError() {
      showToast({ text: t(`${basePath}.Error`), type: "error" });
    },
  });
}
