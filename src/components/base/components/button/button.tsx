import { CSSProperties, PropsWithChildren } from "react";
import { StyledButton } from "./button.styled";
import { ColorType } from "./button.interface";

export const CustomButton = ({
  styles,
  onClick,
  children,
  color = "primary",
}: Readonly<
  PropsWithChildren<{
    color?: ColorType;
    onClick?: () => void;
    styles?: CSSProperties;
  }>
>) => {
  return (
    <StyledButton style={styles} color={color} onClick={onClick}>
      {children}
    </StyledButton>
  );
};
