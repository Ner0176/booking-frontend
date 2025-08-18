import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { recurrentClassApi } from "./recurrent-class.gateway";
import {
  IGetRecurrentUsers,
  UpdateClassColor,
} from "./recurrent-class.interface";
import { showToast } from "../../components";
import { IUser } from "../user";

export function useGetRecurrentUsers({
  enabled,
  recurrentId,
}: IGetRecurrentUsers) {
  return useQuery<IUser[], Error>({
    enabled,
    queryKey: ["getRecurrentUsers", recurrentId],
    queryFn: () => recurrentClassApi.getRecurrentUsers(recurrentId),
  });
}

export function useUpdateColor(handleSuccess: () => void) {
  const { t } = useTranslation();
  const basePath = "Classes.ClassDetails.UpdateColor";

  return useMutation<any, any, any>({
    mutationFn: (payload: UpdateClassColor) =>
      recurrentClassApi.updateColor(payload),
    onSuccess() {
      handleSuccess();
      showToast({
        type: "success",
        text: t(`${basePath}.Success`),
      });
    },
    onError(error) {
      showToast({
        type: "error",
        text: error.response.data.message ?? t(`${basePath}.Error`),
      });
    },
  });
}
