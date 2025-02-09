import {
  mdiAccountOutline,
  mdiEmailOutline,
  mdiEyeOffOutline,
  mdiEyeOutline,
  mdiPhoneOutline,
} from "@mdi/js";
import { Fragment, useState } from "react";
import {
  ContentBox,
  FormButton,
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
import { useLogin, useSignUp } from "../../api";
import { CustomInputField, LanguageSelector, MainContainer } from "../base";

const MIN_PSWD_LENGTH = 8;

export const AuthForm = ({ type }: Readonly<{ type: FormType }>) => {
  const { t } = useTranslation();

  const [formType, setFormType] = useState<FormType>(type);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authErrors, setAuthErrors] = useState<IAuthErrors>(initAuthErrors);
  const [authFields, setAuthFields] = useState<IAuthFields>(emptyAuthFields);

  const { mutate: login } = useLogin();
  const { mutate: signUp } = useSignUp();

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

  const handleSubmit = () => {
    if (formType === "SignUp") {
      signUp(authFields);
    } else {
      login({ email: authFields.email, password: authFields.password });
    }
    setAuthFields(emptyAuthFields);
  };

  const handleResetFields = () => {
    setAuthErrors(initAuthErrors);
    setAuthFields(emptyAuthFields);
  };

  return (
    <MainContainer>
      <AuthWrapper>
        <span className="font-bold text-3xl">
          {t(`Auth.${formType}.Title`)}
        </span>
        <ContentBox>
          {formType === "SignUp" && (
            <Fragment>
              <CustomInputField
                value={authFields.name}
                placeholder="María Marcos"
                title={t("Auth.Fields.Name")}
                icon={{ name: mdiAccountOutline }}
                handleBlur={() => {
                  let showError = false;
                  if (!authFields.name.length) showError = true;
                  handleErrors("name", showError);
                }}
                handleChange={(v) => handleAuthFields("name", v)}
                error={authErrors.name ? t("Auth.Errors.Name") : undefined}
              />
              <SignUpFieldsContainer>
                <LanguageSelector />
                <CustomInputField
                  placeholder="976 65 84 34"
                  value={authFields.phone || ""}
                  title={t("Auth.Fields.Phone")}
                  icon={{ name: mdiPhoneOutline }}
                  handleBlur={() => {
                    let showError = false;
                    const phone = authFields.phone ?? "";
                    if (phone.length > 0 && !checkPhone(phone)) {
                      showError = true;
                    }
                    handleErrors("phone", showError);
                  }}
                  handleChange={(v) => handleAuthFields("phone", v)}
                  error={authErrors.phone ? t("Auth.Errors.Phone") : undefined}
                />
              </SignUpFieldsContainer>
            </Fragment>
          )}
          <CustomInputField
            value={authFields.email}
            title={t("Auth.Fields.Email")}
            placeholder="nombre@ejemplo.com"
            icon={{ name: mdiEmailOutline }}
            handleChange={(v) => handleAuthFields("email", v)}
            error={authErrors.email ? t("Auth.Errors.Email") : undefined}
            handleBlur={() => {
              let showError = false;
              if (!EmailValidator.validate(authFields.email)) showError = true;
              handleErrors("email", showError);
            }}
          />
          <CustomInputField
            value={authFields.password}
            title={t("Auth.Fields.Password")}
            placeholder={t("Auth.Fields.Password")}
            type={showPassword === false ? "password" : "text"}
            handleChange={(v) => handleAuthFields("password", v)}
            handleBlur={() => {
              let showError = false;
              if (authFields.password.length < MIN_PSWD_LENGTH) {
                showError = true;
              }
              handleErrors("password", showError);
            }}
            icon={{
              name: showPassword ? mdiEyeOutline : mdiEyeOffOutline,
              handleClick: () => setShowPassword((prev) => !prev),
            }}
            error={
              authErrors.password
                ? t("Auth.Errors.Password", { value: MIN_PSWD_LENGTH })
                : undefined
            }
          />
          <FormButton
            onClick={() => {
              const { email, phone, password, name } = authErrors;
              if (!email && !phone && !password && !name) handleSubmit();
            }}
          >
            {t(`Auth.${formType}.Title`)}
          </FormButton>
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
              onClick={() => {
                handleResetFields();
                setFormType((prev) => (prev === "Login" ? "SignUp" : "Login"));
              }}
            >
              {t(`Auth.${formType === "Login" ? "SignUp" : "Login"}.Title`)}
            </SwitchFormButton>
          </div>
        </ContentBox>
      </AuthWrapper>
    </MainContainer>
  );
};
