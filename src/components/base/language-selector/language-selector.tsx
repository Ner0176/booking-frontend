import { useTranslation } from "react-i18next";
import { CustomSelect } from "../select";
import { useUser } from "../../../hooks";

const CURRENT_LANGUAGES = ["es", "ca"];
export const LanguageSelector = ({
  handleChange,
  selectedValue,
}: Readonly<{
  selectedValue?: string;
  handleChange?: (newLanguage: string) => void;
}>) => {
  const { updateUser } = useUser();
  const { t, i18n } = useTranslation();

  const getOptions = () => {
    return CURRENT_LANGUAGES.map((lang) => ({
      key: lang,
      text: t(`Base.Languages.${lang}`),
    }));
  };

  return (
    <CustomSelect
      fullWidth
      options={getOptions()}
      title={t("Auth.Fields.Language")}
      selectedValue={selectedValue ?? i18n.language}
      handleChange={(newLanguage) => {
        if (!!handleChange) handleChange(newLanguage);
        else {
          i18n.changeLanguage(newLanguage);
          updateUser("language", newLanguage);
        }
      }}
    />
  );
};
