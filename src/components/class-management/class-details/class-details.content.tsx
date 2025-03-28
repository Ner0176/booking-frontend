import { Trans, useTranslation } from "react-i18next";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import {
  IClassDetailsCard,
  RecurrentOptionType,
} from "./class-details.interface";
import { IClass, IUser, useDeleteClass, useEditBookings } from "../../../api";
import {
  CustomButton,
  CustomInputField,
  DeleteModal,
  ErrorStrongContainer,
  Modal,
  showToast,
  SwitchSelector,
  UsersTransferList,
} from "../../base";
import {
  ClassCardContainer,
  DeleteRecurrentOption,
  DeleteRecurrentWrapper,
} from "./class-details.styled";
import {
  mdiAccountArrowUp,
  mdiAccountGroupOutline,
  mdiCalendarOutline,
  mdiClockOutline,
  mdiMagnify,
} from "@mdi/js";
import {
  capitalize,
  formatTime,
  formatToLongDate,
  stringIncludes,
} from "../../../utils";
import { useSearchParamsManager } from "../../../hooks";
import Icon from "@mdi/react";
import { es } from "date-fns/locale/es";
import { ca } from "date-fns/locale/ca";
import { useUser } from "../../../stores";
import { format } from "date-fns";
import { emptyClassFields, IClassFields, OneTimeFields } from "../create-class";

export const DeleteClassModal = ({
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
  const basePath = "Classes.ClassDetails.Delete";

  const [selectedOption, setSelectedOption] = useState<RecurrentOptionType>();

  const { mutate: deleteClass, isPending: isLoading } = useDeleteClass(
    refetchClasses,
    selectedOption === "recurrent"
  );

  const handleDelete = () => {
    const isRecurrent = !!recurrentId && selectedOption === "recurrent";
    deleteClass({
      isRecurrent,
      id: isRecurrent ? recurrentId : id.toString(),
    });
  };

  const handleCheckValidations = () => {
    if (!recurrentId) return true;

    if (!selectedOption) {
      showToast({
        type: "error",
        text: t("Classes.ClassDetails.Delete.Validation"),
      });
    }
    return !!selectedOption;
  };

  return (
    <DeleteModal
      isDeleting={isLoading}
      handleClose={handleClose}
      handleDelete={handleDelete}
      width={!!recurrentId ? "50%" : "40%"}
      checkValidations={handleCheckValidations}
      isButtonDisabled={!!recurrentId && !selectedOption}
      title={t(`${basePath}.${!recurrentId ? "Title" : "Recurrent.Title"}`)}
    >
      {!!recurrentId && (
        <>
          <span>
            <Trans
              values={{ dateTime }}
              i18nKey={`${basePath}.Recurrent.Description`}
              components={{
                strong: <ErrorStrongContainer />,
              }}
            />
          </span>
          <DeleteRecurrentWrapper>
            <DeleteRecurrentOption
              className="hover:bg-neutral-50"
              isSelected={selectedOption === "specific"}
              onClick={() => setSelectedOption("specific")}
            >
              {t(`${basePath}.Recurrent.Options.Specific`)}
            </DeleteRecurrentOption>
            <DeleteRecurrentOption
              className="hover:bg-neutral-50"
              isSelected={selectedOption === "recurrent"}
              onClick={() => setSelectedOption("recurrent")}
            >
              <Trans
                values={{ dateTime }}
                components={{ NewLine: <br /> }}
                i18nKey={`${basePath}.Recurrent.Options.Recurrent`}
              />
            </DeleteRecurrentOption>
          </DeleteRecurrentWrapper>
        </>
      )}
      <span>
        <Trans
          i18nKey={`${basePath}.Description`}
          components={{
            strong: <ErrorStrongContainer />,
          }}
        />
      </span>
    </DeleteModal>
  );
};

export const EditListModal = ({
  refetch,
  classData,
  usersList,
  handleClose,
  setUsersList,
  attendeesList,
  setAttendeesList,
}: Readonly<{
  refetch(): void;
  classData: IClass;
  usersList: IUser[];
  handleClose(): void;
  attendeesList: IUser[];
  setUsersList: Dispatch<SetStateAction<IUser[]>>;
  setAttendeesList: Dispatch<SetStateAction<IUser[]>>;
}>) => {
  const { t } = useTranslation();
  const basePath = "Classes.ClassDetails.AttendeesList.Edit";

  const { params, setParams } = useSearchParamsManager(["type"]);

  const { id, maxAmount, recurrentId } = classData;

  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  const { mutate: editBookings, isPending: isLoading } =
    useEditBookings(refetch);

  useEffect(() => {
    if (!search) setFilteredUsers(usersList);
    else {
      setFilteredUsers(
        usersList.filter((user) => stringIncludes(user.name, search))
      );
    }
  }, [search, usersList]);

  useEffect(() => {
    if (!params.get("type") && !!recurrentId) {
      setParams([{ key: "type", value: "recurrent" }]);
    }
  }, [params, recurrentId, setParams]);

  const handleEditBooking = () => {
    if (attendeesList.length > maxAmount) {
      showToast({
        type: "error",
        text: t(`${basePath}.MaxAmountError`),
      });
      return;
    }

    const editRecurrently = params.get("type") === "recurrent";

    editBookings({
      isRecurrent: editRecurrently,
      userIds: attendeesList.map(({ id }) => id),
      classId: `${editRecurrently ? recurrentId : id}`,
    });
  };

  return (
    <Modal
      handleClose={handleClose}
      title={t(`${basePath}.Title`)}
      footer={
        <div className="flex flex-row items-center justify-end gap-4 w-full">
          <CustomButton color="secondary" onClick={handleClose}>
            {t("Base.Buttons.Discard")}
          </CustomButton>
          <CustomButton isLoading={isLoading} onClick={handleEditBooking}>
            {t("Base.Buttons.Save")}
          </CustomButton>
        </div>
      }
    >
      <div className="flex flex-col gap-8 h-[350px]">
        <div className="flex flex-row items-center gap-5 w-full">
          <CustomInputField
            value={search}
            icon={{ name: mdiMagnify }}
            placeholder={t(`Base.SearchUser`)}
            handleChange={(value) => setSearch(value)}
          />
          {recurrentId && (
            <div style={{ width: "100%" }}>
              <SwitchSelector
                keyParam="type"
                customStyles={{ fontSize: 14 }}
                options={[
                  {
                    key: "recurrent",
                    text: t(`${basePath}.Options.Recurrent`),
                  },
                  { key: "oneTime", text: t(`${basePath}.Options.OneTime`) },
                ]}
              />
            </div>
          )}
        </div>
        <UsersTransferList
          assignedUsers={attendeesList}
          availableUsers={filteredUsers}
          setAvailableUsers={setUsersList}
          setAssignedUsers={setAttendeesList}
        />
      </div>
    </Modal>
  );
};

export const EditClassDetailsModal = ({
  classData,
  handleClose,
}: Readonly<{ classData: IClass; handleClose(): void }>) => {
  const { t } = useTranslation();
  const basePath = "Classes.ClassDetails";

  const { date, endTime, startTime, maxAmount } = classData;

  const [hasEdited, setHasEdited] = useState(false);
  const [fields, setFields] = useState<IClassFields>(emptyClassFields);

  useEffect(() => {
    setFields({
      endTime: { value: endTime },
      recurrencyLimit: { value: "" },
      startTime: { value: startTime },
      maxAmount: { value: maxAmount },
      date: { value: format(new Date(date), "yyyy-MM-dd") },
    });
  }, [date, endTime, startTime, maxAmount]);

  return (
    <Modal
      footer={
        <div className="flex flex-row justify-end items-center gap-3 w-full">
          <CustomButton color="secondary" onClick={handleClose}>
            {t("Base.Buttons.Cancel")}
          </CustomButton>
          <CustomButton isDisabled={!hasEdited} onClick={() => {}}>
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

export const ClassDetailsCard = ({
  type,
  classData,
}: Readonly<{ type: "schedule" | "amount"; classData: IClass }>) => {
  const { t } = useTranslation();
  const basePath = `Classes.ClassDetails.Cards.${capitalize(type)}`;

  const user = useUser();
  const { date, startTime, endTime, maxAmount, currentCount, recurrentId } =
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
            date: formatToLongDate(date),
          }),
        },
      ];

      if (!!recurrentId) {
        details.push({
          icon: mdiClockOutline,
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
    <ClassCardContainer>
      <span className="text-sm font-semibold">{t(`${basePath}.Title`)}</span>
      {cardDetails.map(({ icon, text }, idx) => (
        <div key={idx} className="flex flex-row items-center gap-1.5">
          <Icon className="size-4 mt-1" path={icon} />
          <span className="text-sm">{text}</span>
        </div>
      ))}
    </ClassCardContainer>
  );
};
