import { useTranslation } from "react-i18next";
import {
  BookingStatus,
  IClass,
  IUser,
  useGetBookingsFromUser,
} from "../../../api";
import { EmptyData, SwitchSelector } from "../../base";
import {
  DeleteUserModal,
  UserClassItem,
  UserInfoField,
  UserStats,
} from "./user-details.content";
import { useSearchParamsManager } from "../../../hooks";
import { useEffect } from "react";
import emptyHistory from "../../../assets/images/noData/void.svg";
import { mdiAccountOutline, mdiEmailOutline, mdiPhoneOutline } from "@mdi/js";

const CLASS_KEY_PARAM = "classType";
const CLASS_OPTIONS = ["pending", "completed", "cancelled"];

export const UserDetails = ({
  user,
  refetch,
}: Readonly<{ user: IUser; refetch(): void }>) => {
  const { t } = useTranslation();
  const { params, setParams } = useSearchParamsManager([
    CLASS_KEY_PARAM,
    "action",
  ]);
  const actionType = params.get("action");
  const selectedOption = params.get(CLASS_KEY_PARAM);

  const { name, phone, email } = user;

  const { data: userBookings } = useGetBookingsFromUser(user.id, {
    status: selectedOption ? (selectedOption as BookingStatus) : undefined,
  });

  useEffect(() => {
    if (!selectedOption) {
      setParams([{ key: CLASS_KEY_PARAM, value: "pending" }]);
    }
  }, [setParams, selectedOption]);

  const getSelectorOptions = () => {
    return CLASS_OPTIONS.map((option) => ({
      key: option,
      text: t(`Users.Details.SwitchOptions.${option}`),
    }));
  };

  return (
    <>
      <div className="flex flex-col gap-6 sm:grid sm:grid-cols-3 sm:justify-items-center sm:gap-10 w-full">
        <div className="flex flex-col gap-3 w-full">
          <span className="text-2xl font-bold underline underline-offset-2">
            {t("Users.Details.Information")}
          </span>
          <div className="flex flex-col gap-4">
            <UserInfoField
              value={name}
              textKey="Name"
              icon={mdiAccountOutline}
            />
            <UserInfoField
              value={email}
              textKey="Email"
              icon={mdiEmailOutline}
            />
            <UserInfoField
              textKey="Phone"
              icon={mdiPhoneOutline}
              value={phone ? phone : "-"}
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <SwitchSelector
            keyParam={CLASS_KEY_PARAM}
            options={getSelectorOptions()}
          />
          {!!selectedOption && (
            <div className="flex flex-col">
              {!!userBookings && userBookings.length > 0 ? (
                userBookings.map(
                  ({ class: classInstance, originalClass }, idx) =>
                    (!!classInstance || !!originalClass) && (
                      <UserClassItem
                        key={idx}
                        classInstance={
                          (classInstance ?? originalClass) as IClass
                        }
                      />
                    )
                )
              ) : (
                <div className="mt-10">
                  <EmptyData
                    image={emptyHistory}
                    title={t(`Users.Details.Empty.${selectedOption}`)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <UserStats userId={user.id} />
      </div>
      {actionType === "delete-class" && (
        <DeleteUserModal
          user={user}
          refetch={refetch}
          handleClose={() => setParams([{ key: "action" }])}
        />
      )}
    </>
  );
};
