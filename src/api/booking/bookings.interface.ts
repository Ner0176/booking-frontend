export interface GetBookingPayload {
  userId?: number;
  classId?: number;
}

export interface CreateBookingPayload {
  classId: number;
  userIds: number[];
}

export interface IBooking {
  id: number;
  classId: number;
  user: { id: number; name: string };
  status: "pending" | "canceled" | "completed";
}
