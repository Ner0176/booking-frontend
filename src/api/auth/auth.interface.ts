export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  sub: number;
  email: string;
  isAdmin: boolean;
}
