import { authApi } from "./auth.gateway";
import { useMutation } from "@tanstack/react-query";
import { SignUpPayload, LoginPayload, AuthResponse } from "./auth.interface";

export function useSignUp() {
  return useMutation<AuthResponse, unknown, SignUpPayload>({
    mutationFn: (payload: SignUpPayload) => authApi.signUp(payload),
    onSuccess() {},
    onError() {},
  });
}

export function useLogin() {
  return useMutation<AuthResponse, unknown, LoginPayload>({
    mutationFn: (credentials: LoginPayload) => authApi.login(credentials),
    onSuccess(data) {
      alert(data);
    },
    onError(error) {
      alert(error);
      // showToast({ text: "Credenciales inválidas", type: "error" });
    },
  });
}
