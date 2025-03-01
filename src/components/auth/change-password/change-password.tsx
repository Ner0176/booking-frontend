import { useTranslation } from "react-i18next";
import { AuthDashboard } from "../auth";
import { CustomInputField } from "../../base";
import { useState } from "react";
import { FormButton } from "../auth-form/auth-form.styled";
import { mdiEyeOffOutline, mdiEyeOutline } from "@mdi/js";

export const ChangePassword = () => {
  const { t } = useTranslation();
  const basePath = "Auth.ChangePassword";

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <AuthDashboard title={t(`${basePath}.Title`)}>
      <div className="flex flex-col gap-6 px-10">
        <CustomInputField
          value={password}
          title={t("Auth.Fields.Password")}
          placeholder={t("Auth.Fields.Password")}
          handleChange={(value) => setPassword(value)}
          type={showPassword === false ? "password" : "text"}
          icon={{
            handleClick: () => setShowPassword((prev) => !prev),
            name: showPassword ? mdiEyeOutline : mdiEyeOffOutline,
          }}
        />
        <CustomInputField
          value={confirmPassword}
          title={t("Auth.Fields.ConfirmPassword")}
          placeholder={t("Auth.Fields.ConfirmPassword")}
          handleChange={(value) => setConfirmPassword(value)}
          type={showConfirmPassword === false ? "password" : "text"}
          icon={{
            handleClick: () => setShowConfirmPassword((prev) => !prev),
            name: showConfirmPassword ? mdiEyeOutline : mdiEyeOffOutline,
          }}
        />
        <FormButton>{t(`${basePath}.Button`)}</FormButton>
      </div>
    </AuthDashboard>
  );
};
