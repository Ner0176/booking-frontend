import Icon from "@mdi/react";
import { IClass, useUpdateColor } from "../../../../api";
import { mdiPencilOutline } from "@mdi/js";
import { CardContainer, ColorsPalette, CustomButton } from "../../../base";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import { ClassDetailsCard } from "./class-data.content";
import { ClassDetailsWrapper } from "../class-details.styled";
import { useEffect, useState } from "react";

export const ClassDetailsData = ({
  classData,
  editClassData,
  refetchClasses,
  isClassCompleted,
}: Readonly<{
  classData: IClass;
  editClassData(): void;
  refetchClasses(): void;
  isClassCompleted: boolean;
}>) => {
  const { t } = useTranslation();

  const [hasEdited, setHasEdited] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  const { mutate: updateColor, isPending: isUpdatingColor } = useUpdateColor(
    () => {
      setHasEdited(false);
      refetchClasses();
    }
  );

  useEffect(() => {
    setSelectedColor(!classData.color ? "#FFFFFF" : classData.color);
  }, [classData]);

  return (
    <ClassDetailsWrapper>
      <div className="flex justify-center w-full px-4 sm:px-6 xl:px-10">
        <CardContainer mainCard>
          <div className="flex flex-row items-center gap-1.5">
            <span className="text-sm sm:text-base font-bold">
              {t(`Classes.ClassDetails.Details`)}
            </span>
            {!isMobile && (
              <div onClick={editClassData}>
                <Icon
                  path={mdiPencilOutline}
                  className="mt-0.5 size-4 sm:size-5 cursor-pointer text-neutral-500"
                />
              </div>
            )}
          </div>
          <ClassDetailsCard type="schedule" classData={classData} />
          <ClassDetailsCard type="amount" classData={classData} />
          {!!classData.recurrentId && (
            <CardContainer style={{ gap: 20 }}>
              <div className="flex flex-row items-center gap-3">
                <span className="text-xs sm:text-sm font-semibold">Color:</span>
                <div
                  style={{ backgroundColor: selectedColor }}
                  className="w-full h-5 rounded-md border border-neutral-200"
                />
              </div>
              <ColorsPalette
                setColor={(color) => {
                  setSelectedColor(color);
                  setHasEdited(true);
                }}
                selectedColor={selectedColor}
              />
              {hasEdited && (
                <div className="flex flex-row justify-end items-center gap-3 w-full">
                  <CustomButton
                    color="secondary"
                    onClick={() => {
                      setHasEdited(false);
                      setSelectedColor(classData.color ?? "white");
                    }}
                  >
                    {t("Base.Buttons.Cancel")}
                  </CustomButton>
                  <CustomButton
                    isLoading={isUpdatingColor}
                    onClick={() =>
                      updateColor({
                        color: selectedColor,
                        recurrentId: classData.recurrentId,
                      })
                    }
                  >
                    {t("Base.Buttons.Save")}
                  </CustomButton>
                </div>
              )}
            </CardContainer>
          )}
        </CardContainer>
      </div>
    </ClassDetailsWrapper>
  );
};
