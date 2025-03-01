import { authApi } from "./auth.gateway";
import { useMutation } from "@tanstack/react-query";
import {
  SignUpPayload,
  LoginPayload,
  IAccount,
  ChangePasswordPayload,
} from "./auth.interface";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { showToast } from "../../components";
import { useLogoutUser, useSetUser } from "../../stores";

export function useSignUp() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const setUser = useSetUser();

  return useMutation<IAccount, any, SignUpPayload>({
    mutationFn: (payload: SignUpPayload) => authApi.signUp(payload),
    onSuccess(data) {
      setUser(data);
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

  return useMutation<IAccount, any, LoginPayload>({
    mutationFn: (credentials: LoginPayload) => authApi.login(credentials),
    onSuccess(data) {
      setUser(data);
      navigate("/");
    },
    onError(error) {
      const status = error.response.data.statusCode;
      showToast({ text: t(`Auth.Login.Error.${status}`), type: "error" });
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const logout = useLogoutUser();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess() {
      logout();
      navigate("/login");
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
