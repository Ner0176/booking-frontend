import { classApi } from "./class.gateway";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateClassPayload,
  DeleteClassPayload,
  IClass,
} from "./class.interface";
import { showToast } from "../../components";
import { useTranslation } from "react-i18next";
import { useSearchParamsManager } from "../../hooks";

export function useGetAllClasses() {
  return useQuery<IClass[], Error>({
    queryKey: ["getAllClasses"],
    queryFn: () => classApi.getAllClasses(),
  });
}

export function useCreateClass(
  refetchClasses: () => void,
  handleClose: () => void
) {
  const { t } = useTranslation();

  return useMutation<any, Error, CreateClassPayload>({
    mutationFn: (payload: CreateClassPayload) => classApi.createClass(payload),
    onSuccess() {
      handleClose();
      refetchClasses();
    },
    onError() {
      showToast({ text: t("Calendar.Event.Error"), type: "error" });
    },
  });
}

export function useDeleteClass(
  refetchClasses: () => void,
  isRecurrent: boolean
) {
  const { t } = useTranslation();
  const tPath = "Calendar.ClassDetails.Delete";
  const { setParams } = useSearchParamsManager([]);

  return useMutation({
    mutationFn: (payload: DeleteClassPayload) => classApi.deleteClass(payload),
    onSuccess() {
      showToast({
        type: "success",
        text: t(`${tPath}.Success.${isRecurrent ? "Recurrent" : "Specific"}`),
      });
      setParams([{ key: "event" }, { key: "action" }]);
      refetchClasses();
    },
    onError() {
      showToast({
        type: "error",
        text: t(`${tPath}.Error`),
      });
    },
  });
}
