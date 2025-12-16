import {
  mdiAccountOutline,
  mdiEmailOutline,
  mdiEyeOffOutline,
  mdiEyeOutline,
  mdiPhoneOutline,
} from "@mdi/js";
import { useState } from "react";
import {
  FormButton,
  SeparatorContainer,
  SeparatorLine,
  SwitchFormButton,
  SignUpFieldsContainer,
  ForgotPasswordText,
} from "./auth-form.styled";
import { useTranslation } from "react-i18next";
import * as EmailValidator from "email-validator";
import {
  emptyAuthFields,
  FormType,
  IAuthErrors,
  IAuthFields,
  initAuthErrors,
  UserRoleType,
} from "./auth-form.interface";
import { useLogin, useSignUp } from "../../../api";
import {
  CustomInputField,
  CustomSelect,
  LanguageSelector,
  LoadingSpinner,
} from "../../base";
import { checkPhone } from "../../../utils";
import { useUser } from "../../../stores";
import { useNavigate } from "react-router-dom";
import { AuthDashboard } from "../auth";

const MIN_PSWD_LENGTH = 8;

export const AuthForm = ({ type }: Readonly<{ type: FormType }>) => {
  const user = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const showRoleSelect = process.env.NODE_ENV !== "production";
  console.log(process.env.NODE_ENV);

  const [formType, setFormType] = useState<FormType>(type);
  const [userRole, setUserRole] = useState<UserRoleType>("admin");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authErrors, setAuthErrors] = useState<IAuthErrors>(initAuthErrors);
  const [authFields, setAuthFields] = useState<IAuthFields>(emptyAuthFields);

  const { mutate: login, isPending: isLoadingLogin } = useLogin();
  const { mutate: signUp, isPending: isLoadingSignUp } = useSignUp();
  const isLoading = isLoadingLogin || isLoadingSignUp;

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
      signUp({
        ...authFields,
        language: user?.language || "es",
        isAdmin: showRoleSelect && userRole === "admin",
      });
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
    <AuthDashboard title={t(`Auth.${formType}.Title`)}>
      {formType === "SignUp" && (
        <>
          <SignUpFieldsContainer
            style={{
              gridTemplateColumns: `repeat(${
                showRoleSelect ? 2 : 1
              }, minmax(0, 1fr))`,
            }}
          >
            <CustomInputField
              value={authFields.name}
              icon={{ name: mdiAccountOutline }}
              title={t("Auth.Fields.Name.Title")}
              placeholder={t("Auth.Fields.Name.Placeholder")}
              handleBlur={() => {
                let showError = false;
                if (!authFields.name.trim().length) showError = true;
                handleErrors("name", showError);
              }}
              handleChange={(v) => handleAuthFields("name", v)}
              error={authErrors.name ? t("Auth.Errors.Name") : undefined}
            />
            {showRoleSelect && (
              <CustomSelect
                fullWidth
                selectedValue={userRole}
                title={t("Auth.SignUp.Roles.Title")}
                handleChange={(role) => setUserRole(role as UserRoleType)}
                options={[
                  { key: "admin", text: t("Auth.SignUp.Roles.admin") },
                  { key: "attendee", text: t("Auth.SignUp.Roles.attendee") },
                ]}
              />
            )}
          </SignUpFieldsContainer>
          <SignUpFieldsContainer>
            <CustomInputField
              placeholder="-"
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
              handleChange={(v) => handleAuthFields("phone", v.trim())}
              error={authErrors.phone ? t("Auth.Errors.Phone") : undefined}
            />
            <LanguageSelector />
          </SignUpFieldsContainer>
        </>
      )}
      <CustomInputField
        value={authFields.email}
        title={t("Auth.Fields.Email")}
        placeholder="nombre@ejemplo.com"
        icon={{ name: mdiEmailOutline }}
        error={authErrors.email ? t("Auth.Errors.Email") : undefined}
        handleChange={(v) => handleAuthFields("email", v.trim().toLowerCase())}
        handleBlur={() => {
          let showError = false;
          if (!EmailValidator.validate(authFields.email)) showError = true;
          handleErrors("email", showError);
        }}
      />
      <div className="flex flex-col gap-2">
        <CustomInputField
          value={authFields.password}
          title={t("Auth.Fields.Password.Title")}
          placeholder={t("Auth.Fields.Password.Placeholder")}
          type={showPassword === false ? "password" : "text"}
          handleChange={(v) => handleAuthFields("password", v)}
          handleBlur={() => {
            const showError = authFields.password.length < MIN_PSWD_LENGTH;
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
        <ForgotPasswordText onClick={() => navigate("/forgot-password")}>
          {t("Auth.Login.ForgotPassword")}
        </ForgotPasswordText>
      </div>
      <FormButton
        onClick={() => {
          const { email, phone, password, name } = authErrors;
          if (!isLoading && !email && !phone && !password && !name) {
            handleSubmit();
          }
        }}
      >
        {isLoading ? <LoadingSpinner /> : t(`Auth.${formType}.Title`)}
      </FormButton>
      <div className="relative">
        <SeparatorContainer>
          <SeparatorLine />
        </SeparatorContainer>
        <div className="relative flex justify-center text-sm">
          <span className="text-xs sm:text-sm px-2 bg-white text-neutral-500">
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
    </AuthDashboard>
  );
};
