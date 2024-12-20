import { ErrorMessage } from "../base";
import { FieldContainer, FieldIcon, StyledInput } from "./auth-form.styled";

export const FormField = ({
  icon,
  title,
  value,
  error,
  onBlur,
  onChange,
  placeholder,
  showPassword,
  handlePrivacy,
}: Readonly<{
  icon: string;
  value: string;
  title: string;
  error?: string;
  onBlur: () => void;
  placeholder?: string;
  showPassword?: boolean;
  handlePrivacy?: () => void;
  onChange: (v: string) => void;
}>) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="font-bold">{title}</span>
      <FieldContainer>
        <FieldIcon
          fill="currentColor"
          viewBox="0 0 24 24"
          onClick={handlePrivacy}
          style={{ cursor: !!handlePrivacy ? "pointer" : "auto" }}
        >
          <path d={icon} />
        </FieldIcon>
        <StyledInput
          value={value}
          onBlur={onBlur}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          type={showPassword === false ? "password" : "text"}
        />
      </FieldContainer>
      {!!error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};
