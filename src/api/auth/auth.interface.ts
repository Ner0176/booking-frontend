export interface SignUpPayload {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  sub: number;
  email: string;
  isAdmin?: boolean;
}
