import { useEffect, useRef } from "react";

export function useClickOutside(handleClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickListener = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) handleClose();
    };

    document.addEventListener("click", onClickListener);

    return () => {
      document.removeEventListener("click", onClickListener);
    };
  }, [handleClose]);

  return ref;
}
