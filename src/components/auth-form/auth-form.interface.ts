export type FormType = "Login" | "SignUp";

export interface IAuthFields {
  phone: string;
  email: string;
  username: string;
  password: string;
}

export interface IAuthErrors {
  email: boolean;
  phone?: boolean;
  password: boolean;
  username?: boolean;
}

export const emptyAuthFields: IAuthFields = {
  email: "",
  phone: "",
  username: "",
  password: "",
};

export const initAuthErrors: IAuthErrors = {
  email: false,
  password: false,
};
