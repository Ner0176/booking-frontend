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

export const useUpdateClassConfigs = () => {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (payload: EditClassConfigsPayload) =>
      classConfigsApi.updateClassConfigs(payload),
    onError() {
      showToast({ type: "error", text: t("Policies.Error") });
    },
  });
};
