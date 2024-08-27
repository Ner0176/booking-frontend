export type FormType = "Login" | "SignUp";

export interface IAuthFields {
  phone: string;
  email: string;
  username: string;
  password: string;
}

export const emptyAuthFields: IAuthFields = {
  email: "",
  phone: "",
  username: "",
  password: "",
};
