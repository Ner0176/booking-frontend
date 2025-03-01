export interface SignUpPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  language: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ChangePasswordPayload {
  token: string;
  password: string;
}

export interface IAccount {
  id: string;
  language: string;
  isAdmin: boolean;
}
