import { Trans, useTranslation } from "react-i18next";
import { useState } from "react";
import { RecurrentOptionType } from "./class-details.interface";
import { useDeleteClass, useEditClass } from "../../../api";
import {
  ActionCard,
  CardContainer,
  CustomButton,
  DeleteModal,
  ErrorStrongContainer,
  Modal,
  showToast,
  SwitchSelector,
} from "../../base";
import {
  DeleteModalText,
  DeleteRecurrentOption,
  DeleteRecurrentWrapper,
} from "./class-details.styled";
import { isMobile } from "react-device-detect";

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
      checkValidations={handleCheckValidations}
      isButtonDisabled={!!recurrentId && !selectedOption}
      width={isMobile ? "100%" : !!recurrentId ? "50%" : "40%"}
      title={t(`${basePath}.${!recurrentId ? "Title" : "Recurrent.Title"}`)}
    >
      {!!recurrentId && (
        <>
          <DeleteModalText>
            <Trans
              values={{ dateTime }}
              i18nKey={`${basePath}.Recurrent.Description`}
              components={{
                strong: <ErrorStrongContainer />,
              }}
            />
          </DeleteModalText>
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
      <DeleteModalText>
        <Trans
          i18nKey={`${basePath}.Description`}
          components={{
            strong: <ErrorStrongContainer />,
          }}
        />
      </DeleteModalText>
    </DeleteModal>
  );
};

export const ClassSettingsMobile = ({
  classId,
  refetch,
  isCancelled,
  handleClose,
  showCancelAction,
  handleDeleteClass,
}: Readonly<{
  classId: string;
  refetch(): void;
  handleClose(): void;
  isCancelled: boolean;
  showCancelAction: boolean;
  handleDeleteClass(): void;
}>) => {
  const { t } = useTranslation();
  const basePath = "Classes.ClassDetails.Filters";

  const { mutate, isPending: isLoading } = useEditClass(refetch);

  const handleChangeStatus = () => {
    if (!!classId && !isLoading) {
      mutate({ id: classId, cancel: !isCancelled });
    }
  };

  const CustomActionCard = ({
    action,
    isLoading,
    handleClick,
  }: Readonly<{
    isLoading?: boolean;
    handleClick?(): void;
    action: "Cancel" | "Enable" | "Delete";
  }>) => {
    return (
      <ActionCard
        title={t(`${basePath}.${action}.Title`)}
        description={t(`${basePath}.${action}.Description`)}
      >
        <CustomButton
          color="secondary"
          onClick={handleClick}
          isLoading={isLoading}
          type={action === "Enable" ? "default" : "error"}
          styles={{ fontSize: 12, paddingBottom: 6, paddingTop: 6 }}
        >
          {t(`${basePath}.${action}.Button`)}
        </CustomButton>
      </ActionCard>
    );
  };

  return (
    <Modal title={t(`${basePath}.Title`)} handleClose={handleClose}>
      <div className="flex flex-col gap-3">
        <SwitchSelector
          keyParam="visual"
          customStyles={{ paddingTop: 12, paddingBottom: 12 }}
          options={[
            { key: "attendees", text: t(`${basePath}.Switch.Attendees`) },
            { key: "details", text: t(`${basePath}.Switch.Details`) },
          ]}
        />
        <CardContainer mainCard>
          <span className="text-[13px] font-bold">
            {t(`${basePath}.Actions`)}
          </span>
          {showCancelAction && (
            <CustomActionCard
              isLoading={isLoading}
              handleClick={handleChangeStatus}
              action={isCancelled ? "Enable" : "Cancel"}
            />
          )}
          <CustomActionCard action="Delete" handleClick={handleDeleteClass} />
        </CardContainer>
      </div>
    </Modal>
  );
};
