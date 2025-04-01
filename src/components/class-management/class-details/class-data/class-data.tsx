import { mdiPencilOutline } from "@mdi/js";
import { CardContainer } from "../../../base";
import { ClassDetailsWrapper } from "../class-details.styled";
import { ClassDetailsCard } from "./class-data.content";
import { useTranslation } from "react-i18next";
import Icon from "@mdi/react";
import { IClass } from "../../../../api";

export const ClassDetailsData = ({
  classData,
  editClassData,
}: Readonly<{ classData: IClass; editClassData(): void }>) => {
  const { t } = useTranslation();

  return (
    <ClassDetailsWrapper>
      <div className="flex justify-center w-full px-4 sm:px-10">
        <CardContainer mainCard>
          <div className="flex flex-row items-center gap-1.5">
            <span className="text-sm sm:text-base font-bold">
              {t(`Classes.ClassDetails.Details`)}
            </span>
            <div onClick={editClassData}>
              <Icon
                path={mdiPencilOutline}
                className="mt-0.5 size-4 sm:size-5 cursor-pointer text-neutral-500"
              />
            </div>
          </div>
          <ClassDetailsCard type="schedule" classData={classData} />
          <ClassDetailsCard type="amount" classData={classData} />
        </CardContainer>
      </div>
    </ClassDetailsWrapper>
  );
};
