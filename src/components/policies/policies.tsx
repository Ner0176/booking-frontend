import { DashboardSkeleton } from "../base";
import { IClassConfigs, useGetClassConfigs } from "../../api";
import { Trans, useTranslation } from "react-i18next";

const POLICIES_POINTS = [
  "maxCancellationPerMonth",
  "minHoursBeforeCancellation",
  "maxRecoveryDays",
  "specific",
];
export const PoliciesDashboard = () => {
  const { t } = useTranslation();

  const { data: policies } = useGetClassConfigs();

  return (
    <DashboardSkeleton title={t("Policies.Title")}>
      <div className="flex flex-col gap-8 max-w-[65%]">
        {policies &&
          POLICIES_POINTS.map((item, idx) => {
            return (
              <div key={idx} className="flex flex-col gap-2">
                <span className="font-bold text-lg">
                  {`${t(`Policies.${item}.Title`)}`}
                </span>
                <span className="text-sm">
                  <Trans
                    i18nKey={t(`Policies.${item}.Text`)}
                    values={{ total: policies[item as keyof IClassConfigs] }}
                    components={{
                      strong: <span className="font-semibold" />,
                      strongRed: <span className="font-bold text-red-500" />,
                    }}
                  />
                </span>
              </div>
            );
          })}
      </div>
    </DashboardSkeleton>
  );
};
