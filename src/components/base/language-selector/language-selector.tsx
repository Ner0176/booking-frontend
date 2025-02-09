import { useTranslation } from "react-i18next";
import { CustomSelect } from "../select";

export const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  return (
    <CustomSelect
      selectedValue={i18n.language}
      title={t("Base.Language.Title")}
      options={[
        { key: "es", text: t("Base.Language.es") },
        { key: "ca", text: t("Base.Language.ca") },
      ]}
      handleChange={(newLanguage) => {
        i18n.changeLanguage(newLanguage);
        localStorage.setItem("language", newLanguage);
      }}
    />
  );
};
