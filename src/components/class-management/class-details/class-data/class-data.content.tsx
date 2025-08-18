import { useTranslation } from "react-i18next";
import { IClass, useEditClass } from "../../../../api";
import { capitalize, formatTime, formatToLongDate } from "../../../../utils";
import { useUser } from "../../../../stores";
import { useEffect, useMemo, useState } from "react";
import { IClassDetailsCard } from "./class-data.interface";
import {
  mdiAccountArrowUp,
  mdiAccountGroupOutline,
  mdiCalendarOutline,
  mdiCalendarSyncOutline,
  mdiClockOutline,
} from "@mdi/js";
import { es } from "date-fns/locale/es";
import { ca } from "date-fns/locale/ca";
import { CardContainer, CustomButton, Modal } from "../../../base";
import Icon from "@mdi/react";
import { format } from "date-fns";
import {
  emptyClassFields,
  IClassFields,
  OneTimeFields,
} from "../../create-class";

export const ClassDetailsCard = ({
  type,
  classData,
}: Readonly<{ type: "schedule" | "amount"; classData: IClass }>) => {
  const { t } = useTranslation();
  const basePath = `Classes.ClassDetails.Cards.${capitalize(type)}`;

  const user = useUser();
  const { date, startTime, endTime, maxAmount, currentCount, recurrent } =
    classData;

  const cardDetails = useMemo(() => {
    let details: IClassDetailsCard[] = [];
    if (type === "amount") {
      details = [
        {
          icon: mdiAccountGroupOutline,
          text: t(`${basePath}.CurrentCount`, { currentCount }),
        },
        {
          icon: mdiAccountArrowUp,
          text: t(`${basePath}.MaxAmount`, { maxAmount }),
        },
      ];
    } else {
      details = [
        {
          icon: mdiClockOutline,
          text: t(`${basePath}.Schedule`, {
            schedule: formatTime(startTime, endTime),
          }),
        },
        {
          icon: mdiCalendarOutline,
          text: t(`${basePath}.Date`, {
            date: formatToLongDate(date, user?.language),
          }),
        },
      ];

      if (!!recurrent) {
        details.push({
          icon: mdiCalendarSyncOutline,
          text: t(`${basePath}.Recurrency`, {
            recurrency: capitalize(
              format(new Date(date), "EEEE", {
                locale: user?.language === "es" ? es : ca,
              })
            ),
          }),
        });
      }
    }

    return details;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, user?.language, basePath, type, classData]);

  return (
    <CardContainer>
      <span className="text-xs sm:text-sm font-semibold">
        {t(`${basePath}.Title`)}
      </span>
      {cardDetails.map(({ icon, text }, idx) => (
        <div key={idx} className="flex flex-row items-center gap-1.5">
          <Icon className="size-3.5 sm:size-4 mt-1" path={icon} />
          <span className="text-xs sm:text-sm">{text}</span>
        </div>
      ))}
    </CardContainer>
  );
};

export const EditClassDetailsModal = ({
  classData,
  handleClose,
  handleSuccess,
}: Readonly<{
  classData: IClass;
  handleClose(): void;
  handleSuccess(): void;
}>) => {
  const { t } = useTranslation();
  const basePath = "Classes.ClassDetails";

  const [hasEdited, setHasEdited] = useState(false);
  const [fields, setFields] = useState<IClassFields>(emptyClassFields);

  const { mutate: editClass, isPending: isLoading } =
    useEditClass(handleSuccess);

  useEffect(() => {
    const { date, endTime, startTime, maxAmount } = classData;

    setFields({
      endTime: { value: endTime },
      recurrencyLimit: { value: "" },
      startTime: { value: startTime },
      maxAmount: { value: maxAmount },
      date: { value: format(new Date(date), "yyyy-MM-dd") },
    });
  }, [classData]);

  const handleSubmit = () => {
    editClass({
      id: `${classData.id}`,
      endTime: fields.endTime.value,
      startTime: fields.startTime.value,
      date: new Date(fields.date.value),
      maxAmount: +fields.maxAmount.value,
    });
  };

  return (
    <Modal
      footer={
        <div className="flex flex-row justify-end items-center gap-3 w-full">
          <CustomButton color="secondary" onClick={handleClose}>
            {t("Base.Buttons.Cancel")}
          </CustomButton>
          <CustomButton
            isLoading={isLoading}
            onClick={handleSubmit}
            isDisabled={!hasEdited}
          >
            {t("Base.Buttons.Save")}
          </CustomButton>
        </div>
      }
      handleClose={handleClose}
      title={t(`${basePath}.Details`)}
    >
      <div className="flex flex-col gap-2 sm:gap-4 sm:pb-3 overflow-y-auto max-h-[375px] sm:max-h-none">
        <OneTimeFields
          fields={fields}
          setFields={(newValues) => {
            setHasEdited(true);
            setFields(newValues);
          }}
        />
      </div>
    </Modal>
  );
};
