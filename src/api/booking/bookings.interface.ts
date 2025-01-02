export interface BookingPayload {
  userId?: number;
  classId?: number;
}

export interface IBooking {
  id: number;
  classId: number;
  user: { id: number; name: string };
  status: "pending" | "canceled" | "completed";
}
