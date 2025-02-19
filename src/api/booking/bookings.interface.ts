import { IClass } from "../class";
import { IUser } from "../user";

export interface GetBookingPayload {
  userId?: number;
  classId?: number;
}

export interface CreateBookingPayload {
  classId: string;
  userIds: number[];
  isRecurrent: boolean;
}

export interface GetUserBookingsPayload {
  endDate?: Date;
  startDate?: Date;
  status?: BookingType;
}

export type BookingType = "pending" | "cancelled" | "completed";
export interface IBooking {
  id: number;
  user: IUser;
  classId: number;
  status: BookingType;
}

export interface IUserBooking {
  id: number;
  class: IClass | null;
  cancelledAt: Date | null;
  originalClass: IClass | null;
}
