import { authApi } from "./auth.gateway";
import { useMutation } from "@tanstack/react-query";
import {
  SignUpPayload,
  LoginPayload,
  ChangePasswordPayload,
  IAuthResponse,
} from "./auth.interface";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { showToast } from "../../components";
import { useSetUser } from "../../stores";

export function useSignUp() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const setUser = useSetUser();

  return useMutation<IAuthResponse, any, SignUpPayload>({
    mutationFn: (payload: SignUpPayload) => authApi.signUp(payload),
    onSuccess(data) {
      const { token, ...userData } = data;
      setUser(userData);
      localStorage.setItem("authToken", `${token}`);
      navigate("/");
    },
    onError(error) {
      const status = error.response.data.statusCode;
      showToast({ text: t(`Auth.SignUp.Error.${status}`), type: "error" });
    },
  });
}

export function useLogin() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const setUser = useSetUser();

  return useMutation<IAuthResponse, any, LoginPayload>({
    mutationFn: (credentials: LoginPayload) => authApi.login(credentials),
    onSuccess(data) {
      const { token, ...userData } = data;
      setUser(userData);
      localStorage.setItem("authToken", `${token}`);
      navigate("/");
    },
    onError(error) {
      const status = error.response.data.statusCode;
      showToast({ text: t(`Auth.Login.Error.${status}`), type: "error" });
    },
  });
}

export function useForgotPassword() {
  const { t } = useTranslation();
  const basePath = "Auth.ForgotPassword";

  return useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(email),
    onSuccess() {
      showToast({
        type: "success",
        text: t(`${basePath}.Success`),
      });
    },
    onError() {
      showToast({
        type: "error",
        text: t(`${basePath}.Success`),
      });
    },
  });
}

export function useChangePassword() {
  const { t } = useTranslation();
  const basePath = "Auth.ChangePassword";

  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) =>
      authApi.changePassword(payload),
    onSuccess() {
      showToast({
        type: "success",
        text: t(`${basePath}.Success`),
      });
    },
    onError() {
      showToast({
        type: "error",
        text: t(`${basePath}.Error`),
      });
    },
  });
}
