export interface IUpdateUserFields {
  name: string;
  phone?: string;
}

export interface IUserFieldErrors {
  name: boolean;
  phone: boolean;
}

export const initUserFieldErrors: IUserFieldErrors = {
  name: false,
  phone: false,
};
