import { useMutation, useQuery } from "@tanstack/react-query";
import { userApi } from "./user.gateway";
import { IUser } from "./user.interface";
import { showToast } from "../../components";
import { useTranslation } from "react-i18next";

export function useGetAllUsers() {
  return useQuery<IUser[]>({
    queryKey: ["getAllUsers"],
    queryFn: () => userApi.getAllUsers(),
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
