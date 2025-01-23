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

export type BookingType = "pending" | "cancelled" | "completed";
export interface IBooking {
  id: number;
  user: IUser;
  classId: number;
  status: BookingType;
}

interface BookingClasses {
  id: number;
  class: IClass;
  status: BookingType;
}
export interface IBookingClasses {
  pending: BookingClasses[];
  completed: BookingClasses[];
  cancelled: BookingClasses[];
}
