export interface GetBookingPayload {
  userId?: number;
  classId?: number;
}

export interface CreateBookingPayload {
  classId: string;
  userIds: number[];
  isRecurrent: boolean;
}

export interface IBooking {
  id: number;
  classId: number;
  user: { id: number; name: string };
  status: "pending" | "canceled" | "completed";
}
