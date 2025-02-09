import { authApi } from "./auth.gateway";
import { useMutation } from "@tanstack/react-query";
import { SignUpPayload, LoginPayload, IAccount } from "./auth.interface";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { showToast } from "../../components";

export function useSignUp() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return useMutation<IAccount, any, SignUpPayload>({
    mutationFn: (payload: SignUpPayload) => authApi.signUp(payload),
    onSuccess() {
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

  return useMutation<IAccount, any, LoginPayload>({
    mutationFn: (credentials: LoginPayload) => authApi.login(credentials),
    onSuccess(data) {
      localStorage.setItem("language", data.language);
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

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess() {
      localStorage.clear();
      navigate("/login");
    },
  });
}
