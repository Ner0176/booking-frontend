import Icon from "@mdi/react";
import { IClass } from "../../api";
import {
  mdiAccountGroupOutline,
  mdiCalendarOutline,
  mdiClockOutline,
} from "@mdi/js";
import { PropsWithChildren, useState } from "react";
import { useClickOutside, useSearchParamsManager } from "../../hooks";
import {
  CalendarItemContainer,
  DeleteClassButtonsWrapper,
  DeleteClassTitle,
  DeleteClassWrapper,
  DeleteRecurrentOption,
  DeleteRecurrentWrapper,
  HeaderButtonContainer,
} from "./calendar.styled";
import { formatDate, getWeekday } from "../../utils";
import { useGetBookings } from "../../api/booking";
import { IButtonHeaderProps, RecurrentOptionType } from "./calendar.interface";
import { Trans, useTranslation } from "react-i18next";
import { CustomButton, Modal } from "../base";

const ItemInfoRow = ({
  icon,
  children,
}: Readonly<PropsWithChildren<{ icon: string }>>) => {
  return (
    <div className="flex flex-row items-center gap-1.5">
      <Icon size="20px" className="mt-1" path={icon} />
      {children}
    </div>
  );
};

export const HeaderButton = ({
  props,
}: Readonly<{ props: IButtonHeaderProps }>) => {
  const { t } = useTranslation();
  const { setParams } = useSearchParamsManager([]);
  const { icon, tPath, color, action } = props;

  return (
    <HeaderButtonContainer
      style={{ color, borderColor: color }}
      onClick={(e) => {
        e.stopPropagation();
        if (action === "close-event") {
          setParams([{ key: "event" }]);
        } else setParams([{ key: "action", value: action }]);
      }}
    >
      <Icon size="14px" className="mt-0.5" path={icon} />
      <span className="text-sm font-semibold">{t(tPath)}</span>
    </HeaderButtonContainer>
  );
};

export const ClassItem = ({ data }: Readonly<{ data: IClass }>) => {
  const { setParams } = useSearchParamsManager([]);

  const { id, endTime, startTime, date, maxAmount, currentCount } = data;

  return (
    <CalendarItemContainer
      className="hover:shadow-lg"
      onClick={() => setParams([{ key: "event", value: `${id}` }])}
    >
      <ItemInfoRow icon={mdiAccountGroupOutline}>
        {currentCount + " / " + maxAmount + " asistentes"}
      </ItemInfoRow>
      <ItemInfoRow icon={mdiClockOutline}>
        {startTime.slice(0, 5) + "h - " + endTime.slice(0, 5) + "h"}
      </ItemInfoRow>
      <ItemInfoRow icon={mdiCalendarOutline}>
        <span>{formatDate(date)}</span>
      </ItemInfoRow>
    </CalendarItemContainer>
  );
};

const DeleteClassModal = ({
  dateTime,
  recurrentId,
  handleClose,
}: Readonly<{
  dateTime: string;
  handleClose(): void;
  recurrentId: string | null;
}>) => {
  const { t } = useTranslation();
  const tPath = "Calendar.ClassDetails.Delete";

  const ref = useClickOutside(handleClose);

  const [selectedOption, setSelectedOption] = useState<RecurrentOptionType>();

  return (
    <Modal>
      <DeleteClassWrapper ref={ref} isRecurrent={!!recurrentId}>
        <div className="flex flex-col gap-3">
          <DeleteClassTitle>
            {t(`${tPath}.${!recurrentId ? "Title" : "Recurrent.Title"}`)}
          </DeleteClassTitle>
          {recurrentId && (
            <>
              <span>
                <Trans
                  values={{ dateTime }}
                  i18nKey={`${tPath}.Recurrent.Description`}
                  components={{
                    strong: <span className="font-bold text-red-500" />,
                  }}
                />
              </span>
              <DeleteRecurrentWrapper>
                <DeleteRecurrentOption
                  className="hover:bg-neutral-50"
                  isSelected={selectedOption === "specific"}
                  onClick={() => setSelectedOption("specific")}
                >
                  {t(`${tPath}.Recurrent.Options.Specific`)}
                </DeleteRecurrentOption>
                <DeleteRecurrentOption
                  className="hover:bg-neutral-50"
                  isSelected={selectedOption === "recurrent"}
                  onClick={() => setSelectedOption("recurrent")}
                >
                  <Trans
                    values={{ dateTime }}
                    components={{ NewLine: <br /> }}
                    i18nKey={`${tPath}.Recurrent.Options.Recurrent`}
                  />
                </DeleteRecurrentOption>
              </DeleteRecurrentWrapper>
            </>
          )}
          <span>
            <Trans
              i18nKey={`${tPath}.Description`}
              components={{
                strong: <span className="font-bold text-red-500" />,
              }}
            />
          </span>
        </div>
        <DeleteClassButtonsWrapper>
          <CustomButton type="error" color="secondary" onClick={handleClose}>
            {t("Base.Buttons.Cancel")}
          </CustomButton>
          <CustomButton type="error" color="primary">
            {t("Base.Buttons.Delete")}
          </CustomButton>
        </DeleteClassButtonsWrapper>
      </DeleteClassWrapper>
    </Modal>
  );
};

export const ClassDetails = ({
  classData,
}: Readonly<{ classData: IClass }>) => {
  const { t } = useTranslation();
  const tPath = "Calendar.ClassDetails";

  const { params, setParams } = useSearchParamsManager(["action"]);
  // const editClassInfo = params.get("action") === "edit-event";
  const showDeleteModal = params.get("action") === "delete-event";

  const { id, date, endTime, startTime, maxAmount, recurrentId } = classData;

  const { data } = useGetBookings({ classId: id });

  return (
    <>
      <div className="grid grid-cols-3 w-full">
        <div className="flex flex-col gap-3">
          <span className="font-bold text-xl underline underline-offset-2">
            {t(`${tPath}.Details`)}
          </span>
          <span>{`${t(`${tPath}.Date`)}: ${formatDate(date)}`}</span>
          <span>{`${t(`${tPath}.Schedule`)}: ${startTime} - ${endTime}`}</span>
          <span>{`${t(`${tPath}.MaxAmount`)}: ${maxAmount}`}</span>
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-bold text-xl underline underline-offset-2">
            {t(`${tPath}.AssistantsList.Title`)}
          </span>
          {data && data.length ? (
            data.map((item) => <div>{item.user.name}</div>)
          ) : (
            <span> {t(`${tPath}.AssistantsList.Empty`)}</span>
          )}
        </div>
      </div>
      {showDeleteModal && (
        <DeleteClassModal
          recurrentId={recurrentId}
          handleClose={() => setParams([{ key: "action" }])}
          dateTime={`${getWeekday(date)}  ${startTime}h - ${endTime}h`}
        />
      )}
    </>
  );
};
