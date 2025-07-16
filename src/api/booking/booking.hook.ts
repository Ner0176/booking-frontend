import { bookingApi } from "./booking.gateway";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateBookingPayload,
  GetBookingPayload,
  GetUserBookingsParams,
  IBooking,
  IUserBooking,
  IUserBookingStats,
  RecoverBookingPayload,
} from "./bookings.interface";
import { showToast } from "../../components";
import { useTranslation } from "react-i18next";
import { useSearchParamsManager } from "../../hooks";
import { useUser } from "../../stores";
import { useNavigate } from "react-router-dom";

export function useGetBookings(payload: GetBookingPayload) {
  return useQuery<IBooking[]>({
    queryKey: ["getBookings", payload],
    queryFn: () => bookingApi.getBookings(payload),
  });
}

export function useGetBookingsFromUser({
  userId,
  payload,
  enabled,
}: GetUserBookingsParams) {
  return useQuery<IUserBooking[]>({
    enabled: enabled ?? true,
    queryKey: ["getBookingsByUserId", userId, payload],
    queryFn: () => bookingApi.getBookingsByUserId({ userId, payload }),
  });
}

export function useGetUserBookingsStats(userId: number) {
  return useQuery<IUserBookingStats>({
    queryKey: ["getUserBookingsStats", userId],
    queryFn: () => bookingApi.getUserBookingStats(userId),
  });
}

export function useCreateBookings(handleSuccess: () => void) {
  const { t } = useTranslation();
  const basePath = "Classes.CreateClass.CreateBookings";

  return useMutation<any, any, any>({
    mutationFn: (payload: CreateBookingPayload) =>
      bookingApi.createBookings(payload),
    onSuccess() {
      handleSuccess();
      showToast({ text: t(`${basePath}.Success`), type: "success" });
    },
    onError(error) {
      showToast({ text: error.response.data.message, type: "error" });
    },
  });
}

export function useRecoverBooking(handleRefetch: () => void) {
  const user = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { params, setParams } = useSearchParamsManager(["userId"]);

  const userId = params.get("userId");

  return useMutation<any, any, any>({
    mutationFn: (payload: RecoverBookingPayload) =>
      bookingApi.recoverBooking(payload),
    onSuccess() {
      handleRefetch();

      if (!!user?.isAdmin && !!userId) {
        navigate(`/users?userId=${userId}`);
      } else setParams([{ key: "class" }, { key: "booking" }]);

      showToast({
        type: "success",
        text: t("UserBookings.BookClass.Success"),
      });
    },
    onError(error) {
      showToast({ text: error.response.data.message, type: "error" });
    },
  });
}

export function useEditBookings(refetch: () => void) {
  const { t } = useTranslation();
  const basePath = "Classes.ClassDetails.AttendeesList.Edit";
  const { setParams } = useSearchParamsManager([]);

  return useMutation<any, any, any>({
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
    onError(error) {
      showToast({ text: error.response.data.message, type: "error" });
    },
  });
}

export function useCancelBooking(handleSuccess: () => void) {
  const { t } = useTranslation();
  const basePath = "UserBookings.Cancel";

  return useMutation<any, any, any>({
    mutationFn: (payload: { bookingId: number; userId: number }) =>
      bookingApi.cancelBooking(payload.bookingId, payload.userId),
    onSuccess() {
      handleSuccess();
      showToast({ text: t(`${basePath}.Success`), type: "success" });
    },
    onError(error) {
      showToast({ text: error.response.data.message, type: "error" });
    },
  });
}
