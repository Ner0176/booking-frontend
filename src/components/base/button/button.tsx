import { CSSProperties, PropsWithChildren } from "react";
import { StyledButton } from "./button.styled";
import { ButtonType, ColorType } from "./button.interface";
import { ClipLoader } from "react-spinners";
import { isMobile } from "react-device-detect";

export const CustomButton = ({
  styles,
  onClick,
  children,
  isLoading,
  type = "default",
  color = "primary",
}: Readonly<
  PropsWithChildren<{
    type?: ButtonType;
    color?: ColorType;
    isLoading?: boolean;
    onClick?: () => void;
    styles?: CSSProperties;
  }>
>) => {
  return (
    <StyledButton
      type={type}
      color={color}
      style={styles}
      onClick={(e) => {
        e.stopPropagation();
        if (!isLoading && onClick) onClick();
      }}
    >
      {!!isLoading ? (
        <ClipLoader
          color="white"
          loading={true}
          data-testid="loader"
          size={isMobile ? 16 : 20}
          aria-label="Loading Spinner"
        />
      ) : (
        children
      )}
    </StyledButton>
  );
};
