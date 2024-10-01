import { Navigate, Outlet } from "react-router-dom";
import { InvalidRouteContainer } from "./router.styled";
import { useTranslation } from "react-i18next";

export const ProtectedRoute = () => {
  const token = sessionStorage.getItem("token");
  return !token ? <Navigate to={"/login"} /> : <Outlet />;
};

export const InvalidRoute = () => {
  const { t } = useTranslation();
  return (
    <InvalidRouteContainer>
      <div className="text-4xl font-bold">{t("Auth.InvalidRoute.Title")}</div>
      <div className="text-2xl">{t("Auth.InvalidRoute.Description")}</div>
    </InvalidRouteContainer>
  );
};
