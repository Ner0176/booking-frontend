import { CSSProperties, PropsWithChildren } from "react";
import { StyledButton } from "./button.styled";
import { ButtonType, ColorType } from "./button.interface";
import { LoadingSpinner } from "../loading-spinner";

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
        <LoadingSpinner color={color === "primary" ? "white" : "#D4D4D4FF"} />
      ) : (
        children
      )}
    </StyledButton>
  );
};
