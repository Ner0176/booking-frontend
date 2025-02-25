import { useTranslation } from "react-i18next";
import { CustomInputField } from "../../base";
import { AuthDashboard } from "../auth";
import { FormButton } from "../auth-form/auth-form.styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const basePath = "Auth.ForgotPassword";

  const [email, setEmail] = useState("");

  return (
    <AuthDashboard title={t(`${basePath}.Title`)}>
      <div className="flex flex-col gap-6 px-10">
        <span className="text-sm sm:text-base text-center text-neutral-500">
          {t(`${basePath}.Description`)}
        </span>
        <CustomInputField
          value={email}
          title={t("Auth.Fields.Email")}
          placeholder="nombre@ejemplo.com"
          handleChange={(value) => setEmail(value)}
        />
        <div className="flex flex-col gap-2 items-center">
          <FormButton>{t("Base.Buttons.Continue")}</FormButton>
          <span
            onClick={() => navigate("/login")}
            className="text-xs sm:text-sm cursor-pointer text-neutral-500"
          >
            {t(`${basePath}.BackToLogin`)}
          </span>
        </div>
      </div>
    </AuthDashboard>
  );
};
