export interface IButtonHeaderProps {
  icon: string;
  tPath: string;
  action: string;
  color?: "primary" | "secondary";
}

export type ClassStatusType = "cancelled" | "pending" | "done";
