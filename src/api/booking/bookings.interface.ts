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
  classId: number;
  bookingId: number;
}

export type BookingStatus = "pending" | "cancelled" | "completed";
export interface IBooking {
  id: number;
  user: IUser;
  classId: number;
  status: BookingStatus;
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
