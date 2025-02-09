import { InvalidRouteContainer } from "./router.styled";
import { useTranslation } from "react-i18next";

export const InvalidRoute = () => {
  const { t } = useTranslation();
  return (
    <InvalidRouteContainer>
      <div className="text-4xl font-bold">{t("Auth.InvalidRoute.Title")}</div>
      <div className="text-2xl">{t("Auth.InvalidRoute.Description")}</div>
    </InvalidRouteContainer>
  );
};
