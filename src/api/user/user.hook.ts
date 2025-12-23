import { useMutation, useQuery } from "@tanstack/react-query";
import { userApi } from "./user.gateway";
import {
  GetAllUsersPayload,
  IPaginatedUsers,
  IUser,
  UpdateUserPayload,
} from "./user.interface";
import { showToast } from "../../components";
import { useTranslation } from "react-i18next";

export function useFindMe() {
  return useQuery<IUser>({
    queryKey: ["findMe"],
    queryFn: () => userApi.findMe(),
  });
}

export function useGetAllUsers(payload: GetAllUsersPayload) {
  return useQuery<IPaginatedUsers>({
    queryKey: ["getAllUsers", payload],
    queryFn: () => userApi.getAllUsers(payload),
  });
}

export function useHasAvailableCancellations() {
  return useQuery<boolean>({
    queryKey: ["hasAvailableCancellations"],
    queryFn: () => userApi.hasAvailableCancellations(),
  });
}

export function useUpdateUserApi(handleSuccess: () => void) {
  const { t } = useTranslation();

  return useMutation<any, any, any>({
    mutationFn: (payload: UpdateUserPayload) => userApi.updateUser(payload),
    onSuccess() {
      handleSuccess();
      showToast({ type: "success", text: t("Profile.Edit.Success") });
    },
    onError(error) {
      showToast({ type: "error", text: error.response.data.message });
    },
  });
}

export function useDeleteUser(handleSuccess: () => void) {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (id: number) => userApi.deleteUser(id),
    onSuccess() {
      handleSuccess();
      showToast({ type: "success", text: t("Users.Details.Delete.Success") });
    },
    onError() {
      showToast({
        type: "error",
        text: t("Users.Details.Delete.Error"),
      });
    },
  });
}
