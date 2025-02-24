import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { CustomButton, CustomInputField } from "../base";
import { useTranslation } from "react-i18next";
import { mdiPencilOutline } from "@mdi/js";
import Icon from "@mdi/react";
import {
  emptyCancelationSettings,
  ICancelationSettings,
} from "./settings.interface";
import { useGetClassConfigs, useUpdateClassConfigs } from "../../api";
import Skeleton from "react-loading-skeleton";

export const SettingsBox = ({
  title,
  children,
  isEditing,
  handleSave,
  isSubmiting,
  setIsEditing,
  isLoading = false,
}: Readonly<
  PropsWithChildren<{
    title: string;
    isEditing: boolean;
    isLoading?: boolean;
    isSubmiting: boolean;
    handleSave: () => void;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
  }>
>) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 border border-neutral-200 rounded-3xl w-full sm:max-w-[75%] p-6 pt-4">
      <div className="flex flex-row items-center justify-between">
        <span className="font-bold text-lg">{title}</span>
        {!isEditing && (
          <div
            onClick={() => setIsEditing((prev) => !prev)}
            className="flex flex-row items-center gap-1 text-neutral-500 cursor-pointer hover:text-violet-600 font-semibold"
          >
            <Icon path={mdiPencilOutline} className="size-4" />
            <span className="text-sm">{t("Base.Buttons.Edit")}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {isLoading
          ? [...Array(3)].map((_, idx) => (
              <Skeleton key={idx} className="h-8 w-3/4" />
            ))
          : children}
      </div>
      {isEditing && (
        <div className="flex flex-row items-center justify-end gap-3 w-full">
          <CustomButton color="secondary" onClick={() => setIsEditing(false)}>
            {t("Base.Buttons.Cancel")}
          </CustomButton>
          <CustomButton isLoading={isSubmiting} onClick={handleSave}>
            {t("Base.Buttons.Save")}
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export const SettingsCancelation = () => {
  const { t } = useTranslation();
  const basePath = "Settings.Cancelation";

  const [isEditing, setIsEditing] = useState(false);
  const [settings, setSettings] = useState<ICancelationSettings>(
    emptyCancelationSettings
  );

  const { data: configs, isLoading } = useGetClassConfigs();
  const { mutate: updateConfigs, isPending: isUpdating } =
    useUpdateClassConfigs(() => setIsEditing(false));

  useEffect(() => {
    if (configs) setSettings(configs);
  }, [configs]);

  const handleUpdateField = (
    field: keyof ICancelationSettings,
    value: string
  ) => {
    setSettings((prev) => {
      return {
        ...prev,
        [field]: +value,
      };
    });
  };

  const handleSubmit = () => {
    if (settings) {
      updateConfigs({
        maxRecoveryDays: settings.maxRecoveryDays || 60,
        maxCancellationPerMonth: settings.maxCancellationPerMonth || 2,
        minHoursBeforeCancellation: settings.minHoursBeforeCancellation || 2,
      });
    }
  };

  return (
    <SettingsBox
      isLoading={isLoading}
      isEditing={isEditing}
      isSubmiting={isUpdating}
      handleSave={handleSubmit}
      setIsEditing={setIsEditing}
      title={t(`${basePath}.Title`)}
    >
      <CustomInputField
        isDisabled={!isEditing}
        title={t(`${basePath}.MaxCancelations`)}
        value={`${settings?.maxCancellationPerMonth || 2}`}
        handleChange={(value) =>
          handleUpdateField("maxCancellationPerMonth", value)
        }
      />
      <CustomInputField
        isDisabled={!isEditing}
        title={t(`${basePath}.Anticipation`)}
        value={`${settings?.minHoursBeforeCancellation || 2}`}
        handleChange={(value) =>
          handleUpdateField("minHoursBeforeCancellation", value)
        }
      />
      <CustomInputField
        isDisabled={!isEditing}
        title={t(`${basePath}.MaxRecovery`)}
        value={`${settings?.maxRecoveryDays || 60}`}
        handleChange={(value) => handleUpdateField("maxRecoveryDays", value)}
      />
    </SettingsBox>
  );
};
