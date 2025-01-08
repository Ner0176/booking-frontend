import { Trans, useTranslation } from "react-i18next";
import { useClickOutside } from "../../../hooks";
import { Dispatch, SetStateAction, useState } from "react";
import { RecurrentOptionType } from "./class-details.interface";
import { IUser, useDeleteClass } from "../../../api";
import { CustomButton, Modal } from "../../base";
import {
  DeleteClassButtonsWrapper,
  DeleteClassTitle,
  DeleteClassWrapper,
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
  const basePath = "Calendar.ClassDetails.Delete";

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
            {t(`${basePath}.${!recurrentId ? "Title" : "Recurrent.Title"}`)}
          </DeleteClassTitle>
          {!!recurrentId && (
            <>
              <span>
                <Trans
                  values={{ dateTime }}
                  i18nKey={`${basePath}.Recurrent.Description`}
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

export const SwitchList = ({
  maxAmount,
  usersList,
  setUsersList,
  assistantsList,
  setAssistantsList,
}: Readonly<{
  maxAmount: number;
  usersList: IUser[];
  assistantsList: IUser[];
  setUsersList: Dispatch<SetStateAction<IUser[]>>;
  setAssistantsList: Dispatch<SetStateAction<IUser[]>>;
}>) => {
  const { t } = useTranslation();
  const basePath = "Calendar.ClassDetails.AssistantsList";

  return (
    <div className="flex flex-row items-center gap-3">
      <SwListContainer>
        <SwListTitle>
          {t(`${basePath}.UsersTitle`, { value: usersList.length })}
        </SwListTitle>
        <SwListWrapper>
          {usersList.map((user) => (
            <ListItemContainer
              onClick={() => {
                setUsersList((prev) => {
                  return prev.filter(({ id }) => user.id !== id);
                });
                setAssistantsList((prev) => [...prev, user]);
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
            currentCount: assistantsList.length,
          })}
        </SwListTitle>
        <SwListWrapper>
          {assistantsList.map((item) => (
            <ListItemContainer
              onClick={() => {
                setAssistantsList((prev) => {
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
