import Icon from "@mdi/react";
import { IClass, IUser, useDeleteClass, useGetAllUsers } from "../../api";
import {
  mdiAccountGroupOutline,
  mdiArrowLeftRight,
  mdiCalendarOutline,
  mdiClockOutline,
} from "@mdi/js";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
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
          setParams([{ key: "event" }, { key: "action" }]);
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
  id,
  dateTime,
  recurrentId,
  handleClose,
  refetchClasses,
}: Readonly<{
  id: number;
  dateTime: string;
  handleClose(): void;
  refetchClasses(): void;
  recurrentId: string | null;
}>) => {
  const { t } = useTranslation();
  const tPath = "Calendar.ClassDetails.Delete";

  const ref = useClickOutside(handleClose);

  const [selectedOption, setSelectedOption] = useState<RecurrentOptionType>();

  const { mutate: deleteClass, isPending: isLoading } = useDeleteClass(
    refetchClasses,
    selectedOption === "recurrent"
  );

  return (
    <Modal>
      <DeleteClassWrapper ref={ref} isRecurrent={!!recurrentId}>
        <div className="flex flex-col gap-3">
          <DeleteClassTitle>
            {t(`${tPath}.${!recurrentId ? "Title" : "Recurrent.Title"}`)}
          </DeleteClassTitle>
          {!!recurrentId && (
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
          <CustomButton
            type="error"
            color="primary"
            isLoading={isLoading}
            onClick={() => {
              const isRecurrent =
                !!recurrentId && selectedOption === "recurrent";
              deleteClass({
                isRecurrent,
                id: isRecurrent ? recurrentId : id.toString(),
              });
            }}
          >
            {t("Base.Buttons.Delete")}
          </CustomButton>
        </DeleteClassButtonsWrapper>
      </DeleteClassWrapper>
    </Modal>
  );
};

const SwitchList = ({
  usersList,
  setUsersList,
  assistantsList,
  setAssistantsList,
}: Readonly<{
  usersList: IUser[];
  assistantsList: IUser[];
  setUsersList: Dispatch<SetStateAction<IUser[]>>;
  setAssistantsList: Dispatch<SetStateAction<IUser[]>>;
}>) => {
  return (
    <div className="flex flex-row items-center gap-3 rounded-2xl border boder-neutral-200 p-3 overflow-y-auto h-max-[400px]">
      <div className="flex flex-1 flex-col gap-3">
        {usersList.map((user) => (
          <div
            onClick={() => {
              setUsersList((prev) => {
                return prev.filter(({ id }) => user.id !== id);
              });
              setAssistantsList((prev) => [...prev, user]);
            }}
            className="cursor-pointer rounded-lg border border-neutral-200 px-4 py-2 text-center"
          >
            {user.name}
          </div>
        ))}
      </div>
      <div className="border border-neutral-200 bg-neutral-50 rounded-full p-2.5 h-min">
        <Icon
          size="16px"
          className="text-neutral-400"
          path={mdiArrowLeftRight}
        />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        {assistantsList.map((item) => (
          <div
            onClick={() => {
              setAssistantsList((prev) => {
                return prev.filter(({ id }) => item.id !== id);
              });
              setUsersList((prev) => [...prev, item]);
            }}
            className="cursor-pointer rounded-lg border border-neutral-200 px-4 py-2 text-center"
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ClassDetails = ({
  refetchClasses,
  classData,
}: Readonly<{ classData: IClass; refetchClasses(): void }>) => {
  const { t } = useTranslation();
  const tPath = "Calendar.ClassDetails";

  const { params, setParams } = useSearchParamsManager(["action"]);
  const showEditView = params.get("action") === "edit-event";
  const showDeleteModal = params.get("action") === "delete-event";

  const { id, date, endTime, startTime, maxAmount, recurrentId } = classData;

  const [usersList, setUsersList] = useState<IUser[]>([]);
  const [assistantsList, setAssistantsList] = useState<IUser[]>([]);

  const { data: users } = useGetAllUsers();
  const { data: bookings } = useGetBookings({ classId: id });

  useEffect(() => {
    if (users) setUsersList(users);
    if (bookings) {
      const bookingsUsers = bookings.map(({ user }) => ({
        phone: "",
        email: "",
        id: user.id,
        name: user.name,
      }));
      setAssistantsList(bookingsUsers);
    }
  }, [users, bookings]);

  return (
    <>
      <div className="flex flex-col gap-3 justify-between w-full">
        <div className="grid grid-cols-2 w-full h-full">
          <div className="flex flex-col gap-3">
            <span className="font-bold text-xl underline underline-offset-2">
              {t(`${tPath}.Details`)}
            </span>
            <span>{`${t(`${tPath}.Date`)}: ${formatDate(date)}`}</span>
            <span>{`${t(
              `${tPath}.Schedule`
            )}: ${startTime} - ${endTime}`}</span>
            <span>{`${t(`${tPath}.MaxAmount`)}: ${maxAmount}`}</span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-bold text-xl underline underline-offset-2">
              {showEditView ? (
                <div className="flex flex-row items-center justify-between gap-2">
                  <span>{"Lista usuarios"}</span>
                  <span>{t(`${tPath}.AssistantsList.Title`)}</span>
                </div>
              ) : (
                t(`${tPath}.AssistantsList.Title`)
              )}
            </span>
            {showEditView ? (
              <SwitchList
                usersList={usersList}
                setUsersList={setUsersList}
                assistantsList={assistantsList}
                setAssistantsList={setAssistantsList}
              />
            ) : assistantsList.length ? (
              assistantsList.map(({ name }) => <div>{name}</div>)
            ) : (
              <span> {t(`${tPath}.AssistantsList.Empty`)}</span>
            )}
          </div>
        </div>
        {showEditView && (
          <div className="flex flex-row items-center justify-end gap-3 w-full">
            <CustomButton
              color="secondary"
              onClick={() => setParams([{ key: "action" }])}
            >
              {t("Base.Buttons.Discard")}
            </CustomButton>
            <CustomButton>{t("Base.Buttons.Save")}</CustomButton>
          </div>
        )}
      </div>
      {showDeleteModal && (
        <DeleteClassModal
          id={id}
          recurrentId={recurrentId}
          refetchClasses={refetchClasses}
          handleClose={() => setParams([{ key: "action" }])}
          dateTime={`${getWeekday(date)}  ${startTime}h - ${endTime}h`}
        />
      )}
    </>
  );
};
