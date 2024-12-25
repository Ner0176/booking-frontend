/* eslint-disable @typescript-eslint/no-unused-vars */
import { classApi } from "./class.gateway";
import { useSearchParams } from "react-router-dom";
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

export function useCreateClass() {
  const { t } = useTranslation();
  const [_, setSearchParams] = useSearchParams();

  return useMutation<any, Error, CreateClassPayload>({
    mutationFn: (payload: CreateClassPayload) => classApi.createClass(payload),
    onSuccess() {
      setSearchParams((sParams) => {
        sParams.delete("type");
        return sParams;
      });
    },
    onError() {
      showToast({ text: t("Calendar.Event.Error"), type: "error" });
    },
  });
}
