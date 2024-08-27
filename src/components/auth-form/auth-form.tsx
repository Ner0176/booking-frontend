import { mdiEmailOutline, mdiEyeOffOutline, mdiEyeOutline } from "@mdi/js";
import { FormField } from "./auth-form.content";
import { useState } from "react";
import {
  ContentBox,
  FormButton,
  LoginContainer,
  LoginWrapper,
  SeparatorContainer,
  SeparatorLine,
  SwitchFormButton,
} from "./auth-form.styled";
import { useTranslation } from "react-i18next";
import { FormType } from "./auth-form.interface";

export const AuthForm = ({ formType }: Readonly<{ formType: FormType }>) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <LoginContainer>
      <LoginWrapper>
        <span className="font-bold text-3xl">{t("SignUp.Login.Title")}</span>
        <ContentBox>
          <FormField
            value={email}
            onChange={setEmail}
            icon={mdiEmailOutline}
            title={t("SignUp.Fields.Email")}
            placeholder="nombre@ejemplo.com"
          />
          <FormField
            value={password}
            onChange={setPassword}
            showPassword={showPassword}
            title={t("SignUp.Fields.Password")}
            placeholder={t("SignUp.Fields.Password")}
            icon={showPassword ? mdiEyeOutline : mdiEyeOffOutline}
            handlePrivacy={() => setShowPassword((prev) => !prev)}
          />
          <FormButton>{t("SignUp.Login.Title")}</FormButton>
          <div className="relative">
            <SeparatorContainer>
              <SeparatorLine />
            </SeparatorContainer>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {t("SignUp.Login.NoAccount")}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <SwitchFormButton>{t("SignUp.Register.Title")}</SwitchFormButton>
          </div>
        </ContentBox>
      </LoginWrapper>
    </LoginContainer>
  );
};
