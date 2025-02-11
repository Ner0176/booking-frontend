import { useTranslation } from "react-i18next";
import { CustomSelect } from "../select";
import { useUser } from "../../../hooks";

export const LanguageSelector = () => {
  const { updateUser } = useUser();
  const { t, i18n } = useTranslation();

  return (
    <CustomSelect
      selectedValue={i18n.language}
      title={t("Auth.Fields.Language")}
      options={[
        { key: "es", text: t("Base.Languages.es") },
        { key: "ca", text: t("Base.Languages.ca") },
      ]}
      handleChange={(newLanguage) => {
        i18n.changeLanguage(newLanguage);
        updateUser("language", newLanguage);
      }}
    />
  );
};
