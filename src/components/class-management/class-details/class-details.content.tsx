import { Trans, useTranslation } from "react-i18next";
import { Dispatch, SetStateAction, useState } from "react";
import { RecurrentOptionType } from "./class-details.interface";
import { IUser, useDeleteClass } from "../../../api";
import { DeleteModal, ErrorStrongContainer, showToast } from "../../base";
import {
  DeleteRecurrentOption,
  DeleteRecurrentWrapper,
  ListItemContainer,
  SwIconContainer,
  SwListContainer,
  SwListTitle,
  SwListWrapper,
} from "./class-details.styled";
import Icon from "@mdi/react";
import { mdiArrowLeftRight } from "@mdi/js";

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

export const SwitchList = ({
  maxAmount,
  usersList,
  setUsersList,
  attendeesList,
  listMaxHeight,
  setAttendeesList,
}: Readonly<{
  maxAmount: number;
  usersList: IUser[];
  attendeesList: IUser[];
  listMaxHeight?: number;
  setUsersList: Dispatch<SetStateAction<IUser[]>>;
  setAttendeesList: Dispatch<SetStateAction<IUser[]>>;
}>) => {
  const { t } = useTranslation();
  const basePath = "Classes.ClassDetails.AttendeesList";

  return (
    <div className="flex flex-row items-center gap-3 pt-3">
      <SwListContainer>
        <SwListTitle>
          {t(`${basePath}.UsersTitle`, { value: usersList.length })}
        </SwListTitle>
        <SwListWrapper style={{ maxHeight: listMaxHeight }}>
          {usersList.map((user) => (
            <ListItemContainer
              onClick={() => {
                setUsersList((prev) => {
                  return prev.filter(({ id }) => user.id !== id);
                });
                setAttendeesList((prev) => [...prev, user]);
              }}
            >
              {user.name}
            </ListItemContainer>
          ))}
        </SwListWrapper>
      </SwListContainer>
      <SwIconContainer>
        <Icon
          size="16px"
          path={mdiArrowLeftRight}
          className="text-neutral-400"
        />
      </SwIconContainer>
      <SwListContainer>
        <SwListTitle>
          {t(`${basePath}.LongTitle`, {
            maxAmount,
            currentCount: attendeesList.length,
          })}
        </SwListTitle>
        <SwListWrapper>
          {attendeesList.map((item) => (
            <ListItemContainer
              onClick={() => {
                setAttendeesList((prev) => {
                  return prev.filter(({ id }) => item.id !== id);
                });
                setUsersList((prev) => [...prev, item]);
              }}
            >
              {item.name}
            </ListItemContainer>
          ))}
        </SwListWrapper>
      </SwListContainer>
    </div>
  );
};
