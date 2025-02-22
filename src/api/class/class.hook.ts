import { classApi } from "./class.gateway";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateClassPayload,
  DeleteClassPayload,
  EditStatusPayload,
  GetClassesPayload,
  IClass,
} from "./class.interface";
import { IClassIds, showToast } from "../../components";
import { useTranslation } from "react-i18next";
import { useSearchParamsManager } from "../../hooks";

export function useGetAllClasses(
  { statusFilter, timeFilter }: GetClassesPayload,
  enabled?: boolean
) {
  return useQuery<IClass[], Error>({
    enabled: enabled === undefined ? true : enabled,
    queryKey: ["getAllClasses", statusFilter, timeFilter],
    queryFn: () => classApi.getAllClasses({ statusFilter, timeFilter }),
  });
}

export function useCreateClass(handleSuccess: (value: IClassIds) => void) {
  const { t } = useTranslation();

  return useMutation<IClass[], Error, CreateClassPayload>({
    mutationFn: (payload: CreateClassPayload) => classApi.createClass(payload),
    onSuccess(data) {
      let classIds = {
        id: "",
        recurrentId: "",
      };

      if (!!data.length) {
        classIds = {
          id: `${data[0].id}`,
          recurrentId: data[0].recurrentId || "",
        };
      }

      handleSuccess(classIds);
      showToast({ text: t("Classes.CreateClass.Success"), type: "success" });
    },
    onError() {
      showToast({ text: t("Classes.CreateClass.Error"), type: "error" });
    },
  });
}

export function useEditClassStatus(handleSuccess: () => void) {
  const { t } = useTranslation();
  const basePath = "Classes.ClassDetails.Status";

  return useMutation({
    mutationFn: (payload: EditStatusPayload) =>
      classApi.editClassStatus(payload),
    onSuccess() {
      handleSuccess();
      showToast({
        type: "success",
        text: t(`${basePath}.Success`),
      });
    },
    onError() {
      showToast({
        type: "error",
        text: t(`${basePath}.Error`),
      });
    },
  });
}

export function useDeleteClass(
  refetchClasses: () => void,
  isRecurrent: boolean
) {
  const { t } = useTranslation();
  const basePath = "Classes.ClassDetails.Delete";
  const { setParams } = useSearchParamsManager([]);

  return useMutation({
    mutationFn: (payload: DeleteClassPayload) => classApi.deleteClass(payload),
    onSuccess() {
      showToast({
        type: "success",
        text: t(
          `${basePath}.Success.${isRecurrent ? "Recurrent" : "Specific"}`
        ),
      });
      setParams([{ key: "class" }, { key: "action" }]);
      refetchClasses();
    },
    onError() {
      showToast({
        type: "error",
        text: t(`${basePath}.Error`),
      });
    },
  });
}
