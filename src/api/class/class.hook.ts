import { useMutation } from "@tanstack/react-query";
import { CreateClassPayload } from "./class.interface";
import { classApi } from "./class.gateway";

export function useCreateClass() {
  return useMutation<any, any, CreateClassPayload>({
    mutationFn: (payload: CreateClassPayload) => classApi.createClass(payload),
    onError() {},
  });
}
