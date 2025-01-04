import { useQuery } from "@tanstack/react-query";
import { userApi } from "./user.gateway";
import { IUser } from "./user.interface";

export function useGetAllUsers() {
  return useQuery<IUser[]>({
    queryKey: ["getAllUsers"],
    queryFn: () => userApi.getAllUsers(),
  });
}
