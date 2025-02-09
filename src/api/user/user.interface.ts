export interface IUser {
  id: number;
  name: string;
  email: string;
  language: string;
  phone: string | null;
}

export interface UpdateUserPayload {
  name?: string;
  phone?: string;
  language?: string;
}
