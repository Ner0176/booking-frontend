import { Trans, useTranslation } from "react-i18next";
import { Fragment, useState } from "react";
import { RecurrentOptionType } from "./class-details.interface";
import {
  ClassesWithOverflow,
  IClass,
  useDeleteClass,
  useEditClass,
} from "../../../api";
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
import { format } from "date-fns";

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
  recurrentId?: number;
  refetchClasses(): void;
}>) => {
  const { t } = useTranslation();
  const basePath = "Classes.ClassDetails.Delete";

  const [selectedOption, setSelectedOption] = useState<RecurrentOptionType>();

  const { mutate: deleteClass, isPending: isLoading } = useDeleteClass(
    refetchClasses,
    selectedOption
  );

  const handleDelete = () => {
    const isRecurrent = !!recurrentId && selectedOption === "recurrent";
    deleteClass({
      isRecurrent,
      id: isRecurrent ? recurrentId : id,
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
  currentVisual,
  handleEditClass,
  isClassCompleted,
  setCurrentVisual,
  handleDeleteClass,
}: Readonly<{
  classId: string;
  refetch(): void;
  handleClose(): void;
  isCancelled: boolean;
  currentVisual: string;
  handleEditClass(): void;
  isClassCompleted: boolean;
  handleDeleteClass(): void;
  setCurrentVisual: (v: string) => void;
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
    action: "Cancel" | "Enable" | "Delete" | "Edit";
  }>) => {
    return (
      <ActionCard tPath={`${basePath}.${action}`}>
        <CustomButton
          color="secondary"
          onClick={handleClick}
          isLoading={isLoading}
          styles={{ fontSize: 12, paddingBottom: 6, paddingTop: 6 }}
          type={action === "Enable" || action === "Edit" ? "default" : "error"}
        >
          {t(`${basePath}.${action}.Button`)}
        </CustomButton>
      </ActionCard>
    );
  };

  console.log(currentVisual);

  return (
    <Modal title={t(`${basePath}.Title`)} handleClose={handleClose}>
      <div className="flex flex-col gap-3">
        <SwitchSelector
          value={currentVisual}
          handleChange={(value) => setCurrentVisual(value)}
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
          {isClassCompleted && (
            <Fragment>
              <CustomActionCard
                action="Edit"
                isLoading={isLoading}
                handleClick={handleEditClass}
              />
              <CustomActionCard
                isLoading={isLoading}
                handleClick={handleChangeStatus}
                action={isCancelled ? "Enable" : "Cancel"}
              />
            </Fragment>
          )}
          <CustomActionCard action="Delete" handleClick={handleDeleteClass} />
        </CardContainer>
      </div>
    </Modal>
  );
};

const CLASS_DATA = ["currentCount", "maxAmount"];
export const OverflowClassesModal = ({
  data,
  handleClose,
}: Readonly<{ data: ClassesWithOverflow[]; handleClose(): void }>) => {
  const { t } = useTranslation();
  const basePath = "Classes.OverflowModal";

  return (
    <Modal handleClose={handleClose} title={t(`${basePath}.Title`)}>
      <div className="flex flex-col gap-6 sm:gap-8 pb-6 h-full overflow-y-auto">
        <p className="text-xs sm:text-sm text-justify">
          {t(`${basePath}.Message`)}
        </p>
        <ul className="flex flex-col gap-5">
          {data.map(({ class: classInstance, users }) => {
            const { id, date, startTime, endTime, recurrent } = classInstance;
            return (
              <div
                key={id}
                style={{ backgroundColor: recurrent?.color ?? undefined }}
                className="rounded-2xl border border-neutral-200 p-4 shadow-sm"
              >
                <span className="text-base sm:text-lg font-bold">
                  {t(`${basePath}.Class`, {
                    date: format(new Date(date), "dd/MM/yyyy"),
                    time: `${startTime}h - ${endTime}h`,
                  })}
                </span>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div className="flex flex-col text-xs sm:text-sm gap-1">
                    {CLASS_DATA.map((value) => (
                      <span key={value}>
                        <Trans
                          i18nKey={`${basePath}.${value}`}
                          values={{
                            value: classInstance[value as keyof IClass],
                          }}
                          components={{
                            strong: <span className="font-semibold" />,
                          }}
                        />
                      </span>
                    ))}
                    <span>
                      <Trans
                        i18nKey={`${basePath}.duration`}
                        values={{
                          startTime,
                          endTime,
                        }}
                        components={{
                          strong: <span className="font-semibold" />,
                        }}
                      />
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm">
                    <span className="font-semibold">
                      {t(`${basePath}.Users`)}
                    </span>
                    <ul className="mt-1 list-disc list-inside">
                      {users.map((item) => (
                        <li key={item.id}>{item.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </Modal>
  );
};
