import { TypeOptions } from "react-toastify/dist/types";
import { Slide, toast, ToastPosition } from "react-toastify";

export const showToast = ({
  text,
  type,
  position,
  autoClose,
}: Readonly<{
  text: string;
  type: TypeOptions;
  autoClose?: number;
  position?: ToastPosition;
}>) => {
  toast(text, {
    type,
    theme: "colored",
    transition: Slide,
    pauseOnHover: true,
    hideProgressBar: true,
    autoClose: autoClose ?? 5000,
    position: position ?? "bottom-right",
  });
};
