import { useTranslation } from "react-i18next";
import { DashboardSkeleton } from "../base";
import { SettingsCancelation } from "./settings.content";

//TODO: Implement notifications + users privacy
// const SETTINGS_TYPE = ["cancelations", "notifications", "privacy"];
export const SettingsDashboard = () => {
  const { t } = useTranslation();

  return (
    <DashboardSkeleton title={t("Settings.Title")}>
      <SettingsCancelation />
    </DashboardSkeleton>
  );
};
