import { CSSProperties, PropsWithChildren } from "react";
import { StyledButton } from "./button.styled";
import { ButtonType, ColorType } from "./button.interface";
import { ClipLoader } from "react-spinners";

export const CustomButton = ({
  styles,
  onClick,
  children,
  isLoading,
  size = 16,
  type = "default",
  color = "primary",
}: Readonly<
  PropsWithChildren<{
    size?: number;
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
      style={{ fontSize: size, ...styles }}
      onClick={() => {
        if (!isLoading && onClick) onClick();
      }}
    >
      {!!isLoading ? (
        <ClipLoader
          size={20}
          color="white"
          loading={true}
          data-testid="loader"
          aria-label="Loading Spinner"
        />
      ) : (
        children
      )}
    </StyledButton>
  );
};
