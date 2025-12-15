export type FormType = "Login" | "SignUp";
export type UserRoleType = "attendee" | "admin";

export interface IAuthFields {
  name: string;
  email: string;
  phone: string;
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
