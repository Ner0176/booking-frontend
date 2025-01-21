export interface IButtonHeaderProps {
  icon: string;
  tPath: string;
  onClick(): void;
  color?: "primary" | "secondary";
}
