import { CSSProperties, PropsWithChildren } from "react";
import { StyledButton } from "./button.styled";
import { ColorType } from "./button.interface";
import { ClipLoader } from "react-spinners";

export const CustomButton = ({
  styles,
  onClick,
  children,
  isLoading,
  size = 16,
  color = "primary",
}: Readonly<
  PropsWithChildren<{
    size?: number;
    color?: ColorType;
    isLoading?: boolean;
    onClick?: () => void;
    styles?: CSSProperties;
  }>
>) => {
  return (
    <StyledButton
      color={color}
      onClick={onClick}
      style={{ fontSize: size, ...styles }}
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
