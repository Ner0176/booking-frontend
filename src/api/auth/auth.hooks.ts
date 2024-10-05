import { authApi } from "./auth.gateway";
import { useMutation } from "@tanstack/react-query";
import { LoginPayload, LoginResponse } from "./auth.interface";

export function useLogin() {
  return useMutation<LoginResponse, unknown, LoginPayload>({
    mutationFn: (credentials: LoginPayload) => authApi.login(credentials),
    onSuccess(data) {
      alert(data);
    },
    onError() {
      // showToast({ text: "Credenciales inválidas", type: "error" });
    },
  });
}
