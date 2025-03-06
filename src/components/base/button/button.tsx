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
  isDisabled,
  type = "default",
  color = "primary",
}: Readonly<
  PropsWithChildren<{
    type?: ButtonType;
    color?: ColorType;
    isLoading?: boolean;
    isDisabled?: boolean;
    onClick?: () => void;
    styles?: CSSProperties;
  }>
>) => {
  return (
    <StyledButton
      type={type}
      color={color}
      style={styles}
      isDisabled={isDisabled}
      onClick={() => {
        if (!isLoading && !isDisabled && !!onClick) onClick();
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
