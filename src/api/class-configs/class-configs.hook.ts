import { useMutation, useQuery } from "@tanstack/react-query";
import { classConfigsApi } from "./class-configs.gateway";
import {
  IClassConfigs,
  EditClassConfigsPayload,
} from "./class-configs.interface";
import { useTranslation } from "react-i18next";
import { showToast } from "../../components";

export const useGetClassConfigs = () => {
  return useQuery<IClassConfigs>({
    queryKey: ["classConfigs"],
    queryFn: async () => classConfigsApi.getClassConfigs(),
  });
};

export const useUpdateClassConfigs = (handleOnSuccess: () => void) => {
  const { t } = useTranslation();
  const basePath = "Settings.Cancelation";

  return useMutation({
    mutationFn: async (payload: EditClassConfigsPayload) =>
      classConfigsApi.updateClassConfigs(payload),
    onSuccess() {
      handleOnSuccess();
      showToast({ type: "success", text: t(`${basePath}.Success`) });
    },
    onError() {
      showToast({ type: "error", text: t(`${basePath}.Error`) });
    },
  });
};
