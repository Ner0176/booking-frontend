import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  CLASS_STATUS,
  CLASS_TIME_FILTERS,
  ClassDatesFilter,
  ClassStatusType,
  ClassTimeFilterType,
} from "../class-management.interface";
import { useTranslation } from "react-i18next";
import { getDatesFromTimeFilter } from "../class-management.utils";
import {
  ActionCard,
  CardContainer,
  CustomButton,
  CustomSelect,
  Modal,
} from "../../base";
import { DateRangeInput } from "./class-management-filters.content";
import { isMobile } from "react-device-detect";
import { useSearchParamsManager } from "../../../hooks";

export const ClassesListFilters = ({
  datesFilter,
  statusFilter,
  setDatesFilter,
  setStatusFilter,
}: Readonly<{
  datesFilter: ClassDatesFilter;
  statusFilter: ClassStatusType;
  setDatesFilter: Dispatch<SetStateAction<ClassDatesFilter>>;
  setStatusFilter: Dispatch<SetStateAction<ClassStatusType>>;
}>) => {
  const { t } = useTranslation();
  const basePath = "Classes.Filters";

  const { params, setParams } = useSearchParamsManager(["modal"]);

  const [timeFilter, setTimeFilter] = useState<ClassTimeFilterType>("all");

  useEffect(() => {
    const addFilter = timeFilter !== "custom" && timeFilter !== "all";
    setDatesFilter(addFilter ? getDatesFromTimeFilter(timeFilter) : {});
  }, [timeFilter, setDatesFilter]);

  const getSelectOptions = (type: "Status" | "Time") => {
    const optionsList = type === "Time" ? CLASS_TIME_FILTERS : CLASS_STATUS;
    return optionsList.map((option) => ({
      key: option,
      text: t(`Classes.Filters.${type}.Options.${option}`),
    }));
  };

  const CustomDates = () => {
    return timeFilter === "custom" ? (
      <div className="flex flex-row items-center gap-3">
        <DateRangeInput
          type="startDate"
          setDateValue={setDatesFilter}
          dateValue={datesFilter.startDate}
        />
        <DateRangeInput
          type="endDate"
          setDateValue={setDatesFilter}
          dateValue={datesFilter.endDate}
        />
      </div>
    ) : null;
  };

  return !isMobile ? (
    <div className="flex justify-end w-full">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <CustomSelect
          selectedValue={statusFilter}
          options={getSelectOptions("Status")}
          title={t(`${basePath}.Status.Title`)}
          handleChange={(v) => setStatusFilter(v as ClassStatusType)}
        />
        <CustomSelect
          selectedValue={timeFilter}
          options={getSelectOptions("Time")}
          title={t(`${basePath}.Time.Title`)}
          handleChange={(v) => setTimeFilter(v as ClassTimeFilterType)}
        />
        <CustomDates />
      </div>
    </div>
  ) : params.get("modal") === "filters" ? (
    <Modal
      title={t(`Base.Buttons.Options`)}
      handleClose={() => setParams([{ key: "modal" }])}
    >
      <div className="flex flex-col gap-3 h-full overflow-y-auto">
        <CardContainer mainCard>
          <span className="text-[13px] font-bold">
            {t(`${basePath}.Modal.Actions.Title`)}
          </span>
          <ActionCard tPath={`${basePath}.Modal.Actions.CreateClass`}>
            <CustomButton
              onClick={() =>
                setParams([
                  { key: "modal" },
                  { key: "action", value: "create-class" },
                  { key: "type", value: "recurrent" },
                ])
              }
            >
              {t("Base.Buttons.CreateClass")}
            </CustomButton>
          </ActionCard>
        </CardContainer>
        <CardContainer mainCard>
          <span className="text-[13px] font-bold">
            {t(`${basePath}.Modal.Filters.Title`)}
          </span>
          <ActionCard tPath={`${basePath}.Modal.Filters.Status`}>
            <CustomSelect
              fullWidth
              selectedValue={statusFilter}
              options={getSelectOptions("Status")}
              handleChange={(v) => setStatusFilter(v as ClassStatusType)}
            />
          </ActionCard>
          <ActionCard tPath={`${basePath}.Modal.Filters.Time`}>
            <div className="flex flex-col items-center gap-3">
              <CustomSelect
                fullWidth
                selectedValue={timeFilter}
                options={getSelectOptions("Time")}
                title={t(`${basePath}.Time.Title`)}
                handleChange={(v) => setTimeFilter(v as ClassTimeFilterType)}
              />
              <CustomDates />
            </div>
          </ActionCard>
        </CardContainer>
      </div>
    </Modal>
  ) : null;
};
