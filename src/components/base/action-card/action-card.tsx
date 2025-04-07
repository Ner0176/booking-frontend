import { CardContainer } from "../styled-components";
import { ReactNode } from "react";

export const ActionCard = ({
  title,
  children,
  description,
}: Readonly<{ title: string; description: string; children: ReactNode }>) => {
  return (
    <CardContainer>
      <span className="text-xs font-semibold">{title}</span>
      <span className="text-[10px] text-neutral-500">{description}</span>
      {children}
    </CardContainer>
  );
};
