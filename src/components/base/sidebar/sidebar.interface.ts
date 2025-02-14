export interface ISidebarItem {
  icon: string;
  text: string;
  adminView?: boolean;
  onClick?: () => void;
}
