export interface IUser {
  id: number;
  name: string;
  email: string;
  language: string;
  phone: string | null;
}

export interface IMetadata {
  page?: number;
  limit?: number;
  totalItems: number;
  totalPages?: number;
}

export interface IPaginatedUsers {
  data: IUser[];
  metadata: IMetadata;
}

export interface UpdateUserPayload {
  name?: string;
  phone?: string;
  language?: string;
}

export interface GetAllUsersPayload {
  page?: number;
  limit?: number;
  search?: string;
}
