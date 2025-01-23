import { bookingApi } from "./booking.gateway";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateBookingPayload,
  GetBookingPayload,
  IBooking,
  IBookingClasses,
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

export function useGetBookingsFromUser(userId: number) {
  return useQuery<IBookingClasses>({
    queryKey: ["getBookingsByUserId", userId],
    queryFn: () => bookingApi.getBookingsByUserId(userId),
  });
}

export function useCreateBookings(handleSuccess: () => void) {
  const { t } = useTranslation();
  const basePath = "Calendar.Event.CreateBookings";

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
  const basePath = "Calendar.ClassDetails.AttendeesList";
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
