import { useEffect, useRef } from "react";

export function useClickOutside(handleClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickListener = (e: MouseEvent) => {
      const current = ref.current;
      if (current && !current.contains(e.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", onClickListener);

    return () => {
      document.removeEventListener("mousedown", onClickListener);
    };
  }, [handleClose]);

  return ref;
}
