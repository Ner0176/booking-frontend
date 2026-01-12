import { isMobile } from "react-device-detect";
import { ClipLoader } from "react-spinners";

export const LoadingSpinner = ({
  color,
  size = isMobile ? 16 : 20,
}: Readonly<{ size?: number; color?: string }>) => {
  return (
    <ClipLoader
      size={size}
      loading={true}
      data-testid="loader"
      color={color ?? "white"}
      aria-label="Loading Spinner"
    />
  );
};
