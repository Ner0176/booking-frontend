import { useTranslation } from "react-i18next";
import { CardContainer } from "../styled-components";
import { ReactNode } from "react";

export const ActionCard = ({
  tPath,
  children,
}: Readonly<{ tPath: string; children: ReactNode }>) => {
  const { t } = useTranslation();

  return (
    <CardContainer>
      <span className="text-xs font-semibold">{t(`${tPath}.Title`)}</span>
      <span className="text-[10px] text-neutral-500">
        {t(`${tPath}.Description`)}
      </span>
      {children}
    </CardContainer>
  );
};
