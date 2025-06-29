import { useTranslation } from "react-i18next";
import { AuthDashboard } from "../auth";
import { CustomInputField, LoadingSpinner, showToast } from "../../base";
import { useState } from "react";
import { FormButton } from "../auth-form/auth-form.styled";
import { mdiEyeOffOutline, mdiEyeOutline } from "@mdi/js";
import { useChangePassword } from "../../../api";

export const ChangePassword = () => {
  const { t } = useTranslation();
  const basePath = "Auth.ChangePassword";

  const url = new URLSearchParams(window.location.search);
  const token = url.get("token");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: changePassword, isPending: isLoading } = useChangePassword();

  const handleSubmit = () => {
    if (isLoading) return;

    if (!password || password !== confirmPassword) {
      showToast({ type: "error", text: t(`${basePath}.EmptyPassword`) });
      return;
    }

    if (token) {
      changePassword({ token, password });
    }
  };

  return (
    <AuthDashboard title={t(`${basePath}.Title`)}>
      <div className="flex flex-col gap-6 sm:px-10">
        <CustomInputField
          value={password}
          title={t("Auth.Fields.Password.Title")}
          handleChange={(value) => setPassword(value)}
          placeholder={t("Auth.Fields.Password.Placeholder")}
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
        <FormButton onClick={handleSubmit}>
          {isLoading ? <LoadingSpinner /> : t(`${basePath}.Button`)}
        </FormButton>
      </div>
    </AuthDashboard>
  );
};
