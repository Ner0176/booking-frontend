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
  cancellationReasons,
  emptyCancelationSettings,
  ICancelationSettings,
} from "./settings.interface";
import { useGetClassConfigs, useUpdateClassConfigs } from "../../api";
import Skeleton from "react-loading-skeleton";
import { SettingsContainer, SettingsEditContainer } from "./settings.styled";

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
    <SettingsContainer>
      <div className="flex flex-row items-center justify-between">
        <span className="font-bold text-base sm:text-lg">{title}</span>
        {!isEditing && (
          <SettingsEditContainer onClick={() => setIsEditing((prev) => !prev)}>
            <Icon path={mdiPencilOutline} className="size-3 sm:size-4" />
            <span className="text-xs sm:text-sm">{t("Base.Buttons.Edit")}</span>
          </SettingsEditContainer>
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
    </SettingsContainer>
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
        maxAdvanceTime: settings.maxAdvanceTime || 15,
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
      {Object.entries(cancellationReasons).map(([key, value]) => {
        return (
          <CustomInputField
            key={key}
            type="number"
            isDisabled={!isEditing}
            title={t(`${basePath}.${key}`)}
            value={`${settings[value] ?? ""}`}
            handleChange={(newFieldValue) =>
              handleUpdateField(value, newFieldValue)
            }
          />
        );
      })}
    </SettingsBox>
  );
};
