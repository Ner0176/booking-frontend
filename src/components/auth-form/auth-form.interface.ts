export type FormType = "Login" | "SignUp";

export interface IAuthFields {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface IAuthErrors {
  email: boolean;
  name?: boolean;
  phone?: boolean;
  password: boolean;
}

export const emptyAuthFields: IAuthFields = {
  name: "",
  email: "",
  phone: "",
  password: "",
};

export const initAuthErrors: IAuthErrors = {
  email: false,
  password: false,
};
