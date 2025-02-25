export interface IButtonHeaderProps {
  icon: string;
  tPath: string;
  onClick(): void;
  color?: "primary" | "secondary";
}

export interface IGoBack {
  path: string;
  showButton: boolean;
}
