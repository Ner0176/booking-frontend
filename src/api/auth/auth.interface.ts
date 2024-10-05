export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  sub: number;
  email: string;
  isAdmin: boolean;
}
