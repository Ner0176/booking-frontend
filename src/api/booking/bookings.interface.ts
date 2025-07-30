import { IClass } from "../class";
import { IUser } from "../user";

export interface GetBookingPayload {
  classId?: number;
}

export interface CreateBookingPayload {
  classId: string;
  userIds: number[];
  isRecurrent: boolean;
}

export interface GetUserBookingsParams {
  userId: number;
  enabled?: boolean;
  payload: { endDate?: Date; startDate?: Date; status?: BookingStatus };
}

export interface RecoverBookingPayload {
  userId: number;
  classId: number;
  bookingId: number;
}

export type BookingStatus = "pending" | "cancelled" | "completed";

export interface IClassBookingsUsers {
  recoveryBookings: IUser[];
  cancelledBookings: IUser[];
  recurrentBookings: IUser[];
}

export interface IUserBooking {
  id: number;
  class: IClass | null;
  cancelledAt: Date | null;
  originalClass: IClass | null;
}

export interface IUserBookingStats {
  pending: number;
  firstDay: string;
  cancelled: number;
  completed: number;
}
