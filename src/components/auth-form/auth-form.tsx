import {
  mdiAccountOutline,
  mdiEmailOutline,
  mdiEyeOffOutline,
  mdiEyeOutline,
  mdiPhoneOutline,
} from "@mdi/js";
import { FormField } from "./auth-form.content";
import { useState } from "react";
import {
  ContentBox,
  FormButton,
  AuthContainer,
  AuthWrapper,
  SeparatorContainer,
  SeparatorLine,
  SwitchFormButton,
  SignUpFieldsContainer,
} from "./auth-form.styled";
import { useTranslation } from "react-i18next";
import { emptyAuthFields, FormType, IAuthFields } from "./auth-form.interface";

export const AuthForm = ({ type }: Readonly<{ type: FormType }>) => {
  const { t } = useTranslation();

  const [formType, setFormType] = useState<FormType>(type);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authFields, setAuthFields] = useState<IAuthFields>(emptyAuthFields);

  const handleAuthFields = (field: string, value: string) => {
    setAuthFields((prev) => {
      return { ...prev, [field]: value };
    });
  };

  return (
    <AuthContainer>
      <AuthWrapper>
        <span className="font-bold text-3xl">
          {t(`Auth.${formType}.Title`)}
        </span>
        <ContentBox>
          {formType === "SignUp" && (
            <SignUpFieldsContainer>
              <FormField
                icon={mdiAccountOutline}
                placeholder="María Marcos"
                value={authFields.username}
                title={t("Auth.Fields.Name")}
                onChange={(v) => handleAuthFields("username", v)}
              />
              <FormField
                icon={mdiPhoneOutline}
                value={authFields.phone}
                placeholder="976 65 84 34"
                title={t("Auth.Fields.Phone")}
                onChange={(v) => handleAuthFields("phone", v)}
              />
            </SignUpFieldsContainer>
          )}
          <FormField
            icon={mdiEmailOutline}
            value={authFields.email}
            title={t("Auth.Fields.Email")}
            placeholder="nombre@ejemplo.com"
            onChange={(v) => handleAuthFields("email", v)}
          />
          <FormField
            value={authFields.password}
            showPassword={showPassword}
            title={t("Auth.Fields.Password")}
            placeholder={t("Auth.Fields.Password")}
            onChange={(v) => handleAuthFields("password", v)}
            icon={showPassword ? mdiEyeOutline : mdiEyeOffOutline}
            handlePrivacy={() => setShowPassword((prev) => !prev)}
          />
          <FormButton>{t(`Auth.${formType}.Title`)}</FormButton>
          <div className="relative">
            <SeparatorContainer>
              <SeparatorLine />
            </SeparatorContainer>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {t(`Auth.${formType}.NoAccount`)}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <SwitchFormButton
              onClick={() =>
                setFormType((prev) => (prev === "Login" ? "SignUp" : "Login"))
              }
            >
              {t(`Auth.${formType === "Login" ? "SignUp" : "Login"}.Title`)}
            </SwitchFormButton>
          </div>
        </ContentBox>
      </AuthWrapper>
    </AuthContainer>
  );
};
