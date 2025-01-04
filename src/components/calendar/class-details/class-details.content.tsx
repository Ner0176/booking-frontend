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

export const SwitchList = ({
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
          path={mdiArrowLeftRight}
          className="text-neutral-400"
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
