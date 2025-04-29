import { isMobile } from "react-device-detect";
import { ClipLoader } from "react-spinners";

export const LoadingSpinner = ({ color }: Readonly<{ color?: string }>) => {
  return (
    <ClipLoader
      loading={true}
      data-testid="loader"
      color={color ?? "white"}
      size={isMobile ? 16 : 20}
      aria-label="Loading Spinner"
    />
  );
};
