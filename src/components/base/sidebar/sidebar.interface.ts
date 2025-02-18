export interface ISidebarItem {
  icon: string;
  text: string;
  onClick?: () => void;
  view?: "user" | "admin";
}
