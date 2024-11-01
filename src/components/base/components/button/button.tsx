import { CSSProperties, PropsWithChildren } from "react";
import { StyledButton } from "./button.styled";
import { ColorType } from "./button.interface";
import { ClipLoader } from "react-spinners";

export const CustomButton = ({
  styles,
  onClick,
  children,
  isLoading,
  color = "primary",
}: Readonly<
  PropsWithChildren<{
    color?: ColorType;
    isLoading?: boolean;
    onClick?: () => void;
    styles?: CSSProperties;
  }>
>) => {
  return (
    <StyledButton style={styles} color={color} onClick={onClick}>
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
