import { classApi } from "./class.gateway";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateClassPayload,
  DeleteClassPayload,
  EditClassPayload,
  GetClassesPayload,
  IClass,
} from "./class.interface";
import { IClassIds, showToast } from "../../components";
import { useTranslation } from "react-i18next";
import { useSearchParamsManager } from "../../hooks";

export function useGetAllClasses(payload: GetClassesPayload) {
  const { enabled, ...filters } = payload;

  return useQuery<IClass[], Error>({
    queryKey: ["getAllClasses", filters],
    queryFn: () => classApi.getAllClasses(filters),
    enabled: enabled === undefined ? true : enabled,
  });
}

export function useCreateClass(handleSuccess: (value: IClassIds) => void) {
  const { t } = useTranslation();

  return useMutation<IClass[], any, CreateClassPayload>({
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
    onError(error) {
      showToast({ text: error.response.data.message, type: "error" });
    },
  });
}

export function useEditClass(handleSuccess: () => void) {
  const { t } = useTranslation();
  const basePath = "Classes.ClassDetails.Status";

  return useMutation<any, any, any>({
    mutationFn: (payload: EditClassPayload) => classApi.editClass(payload),
    onSuccess() {
      handleSuccess();
      showToast({
        type: "success",
        text: t(`${basePath}.Success`),
      });
    },
    onError(error) {
      showToast({ text: error.response.data.message, type: "error" });
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
