import { Navigate, Outlet } from "react-router-dom";
import { InvalidRouteContainer } from "./router.styled";
import { useTranslation } from "react-i18next";
import { useUser } from "../stores";

export const InvalidRoute = () => {
  const { t } = useTranslation();
  return (
    <InvalidRouteContainer>
      <div className="text-4xl font-bold">{t("Auth.InvalidRoute.Title")}</div>
      <div className="text-2xl">{t("Auth.InvalidRoute.Description")}</div>
    </InvalidRouteContainer>
  );
};

export const ProtectedRoute = ({
  allowViewTo,
}: Readonly<{ allowViewTo: "user" | "admin" }>) => {
  const user = useUser();

  const allowance =
    (allowViewTo === "user" && !user?.isAdmin) ||
    (allowViewTo === "admin" && !!user?.isAdmin);

  return allowance ? <Outlet /> : <Navigate to="/" replace />;
};
