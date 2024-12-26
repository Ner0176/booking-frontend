import { classApi } from "./class.gateway";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateClassPayload, IClass } from "./class.interface";
import { showToast } from "../../components";
import { useTranslation } from "react-i18next";

export function useGetAllClasses() {
  return useQuery<IClass[], Error>({
    queryKey: ["getAllClasses"],
    queryFn: () => classApi.getAllClasses(),
  });
}

export function useCreateClass(handleClose: () => void) {
  const { t } = useTranslation();

  return useMutation<any, Error, CreateClassPayload>({
    mutationFn: (payload: CreateClassPayload) => classApi.createClass(payload),
    onSuccess() {
      handleClose();
    },
    onError() {
      showToast({ text: t("Calendar.Event.Error"), type: "error" });
    },
  });
}
