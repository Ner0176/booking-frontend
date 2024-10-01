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
import * as EmailValidator from "email-validator";
import {
  emptyAuthFields,
  FormType,
  IAuthErrors,
  IAuthFields,
  initAuthErrors,
} from "./auth-form.interface";
import { checkPhone } from "./auth-form.utils";

const MIN_PSWD_LENGTH = 8;

export const AuthForm = ({ type }: Readonly<{ type: FormType }>) => {
  const { t } = useTranslation();

  const [formType, setFormType] = useState<FormType>(type);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authErrors, setAuthErrors] = useState<IAuthErrors>(initAuthErrors);
  const [authFields, setAuthFields] = useState<IAuthFields>(emptyAuthFields);

  const handleAuthFields = (field: string, value: string) => {
    setAuthFields((prev) => {
      return { ...prev, [field]: value };
    });
  };

  const handleErrors = (field: string, value: boolean) => {
    setAuthErrors((prev) => {
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
                onBlur={() => {
                  let showError = false;
                  if (!authFields.username.length) showError = true;
                  handleErrors("username", showError);
                }}
                onChange={(v) => handleAuthFields("username", v)}
                error={authErrors.username ? t("Auth.Errors.Name") : undefined}
              />
              <FormField
                icon={mdiPhoneOutline}
                value={authFields.phone}
                placeholder="976 65 84 34"
                title={t("Auth.Fields.Phone")}
                onBlur={() => {
                  let showError = false;
                  const phone = authFields.phone;
                  if (phone.length > 0 && !checkPhone(phone)) showError = true;
                  handleErrors("phone", showError);
                }}
                onChange={(v) => handleAuthFields("phone", v)}
                error={authErrors.phone ? t("Auth.Errors.Phone") : undefined}
              />
            </SignUpFieldsContainer>
          )}
          <FormField
            icon={mdiEmailOutline}
            value={authFields.email}
            title={t("Auth.Fields.Email")}
            placeholder="nombre@ejemplo.com"
            onChange={(v) => handleAuthFields("email", v)}
            onBlur={() => {
              let showError = false;
              if (!EmailValidator.validate(authFields.email)) showError = true;
              handleErrors("email", showError);
            }}
            error={authErrors.email ? t("Auth.Errors.Email") : undefined}
          />
          <FormField
            value={authFields.password}
            showPassword={showPassword}
            title={t("Auth.Fields.Password")}
            onBlur={() => {
              let showError = false;
              if (authFields.password.length < MIN_PSWD_LENGTH) {
                showError = true;
              }
              handleErrors("password", showError);
            }}
            placeholder={t("Auth.Fields.Password")}
            onChange={(v) => handleAuthFields("password", v)}
            icon={showPassword ? mdiEyeOutline : mdiEyeOffOutline}
            handlePrivacy={() => setShowPassword((prev) => !prev)}
            error={authErrors.password ? t("Auth.Errors.Password") : undefined}
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
