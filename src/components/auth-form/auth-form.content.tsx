import { FieldContainer, FieldIcon, StyledInput } from "./auth-form.styled";

export const FormField = ({
  icon,
  title,
  value,
  onChange,
  placeholder,
  showPassword,
  handlePrivacy,
}: Readonly<{
  icon: string;
  value: string;
  title: string;
  placeholder?: string;
  showPassword?: boolean;
  handlePrivacy?: () => void;
  onChange: (v: string) => void;
}>) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold">{title}</span>
      <FieldContainer>
        <FieldIcon
          fill="currentColor"
          viewBox="0 0 24 24"
          onClick={handlePrivacy}
          showCursor={!!handlePrivacy}
        >
          <path d={icon} />
        </FieldIcon>
        <StyledInput
          value={value}
          placeholder={placeholder}
          type={showPassword ? "password" : "text"}
          onChange={(e) => onChange(e.target.value)}
        />
      </FieldContainer>
    </div>
  );
};
