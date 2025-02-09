import { useTranslation } from "react-i18next";
import {
  BookingType,
  IBookingClasses,
  IUser,
  useGetBookingsFromUser,
} from "../../../api";
import { LanguageSelector, SwitchSelector } from "../../base";
import {
  DeleteUserModal,
  UserClassItem,
  UserInfoField,
} from "./user-details.content";
import { useSearchParamsManager } from "../../../hooks";
import { format } from "date-fns";
import { useEffect } from "react";

const CLASS_KEY_PARAM = "classType";
const CLASS_OPTIONS = ["pending", "completed", "cancelled"];

export const UserDetails = ({
  user,
  refetch,
  isCurrentUser = false,
}: Readonly<{ user: IUser; refetch(): void; isCurrentUser?: boolean }>) => {
  const { t } = useTranslation();
  const { params, setParams } = useSearchParamsManager([
    CLASS_KEY_PARAM,
    "action",
  ]);
  const actionType = params.get("action");
  const selectedOption = params.get(CLASS_KEY_PARAM);

  const { id, name, phone, email } = user;

  const { data } = useGetBookingsFromUser(id);

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

  const getStats = () => {
    let stats: string[] = [];
    const basePath = "Users.Details.Stats";

    if (data) {
      stats = CLASS_OPTIONS.map((option) =>
        t(`${basePath}.${option}`, {
          amount: data[option as BookingType].length,
        })
      );

      let date: Date | undefined;
      if (data.completed.length > 0) {
        date = new Date(data.completed[0].class.date);
      }
      stats.push(
        t(`${basePath}.firstClass`, {
          amount: date ? format(date, "dd/MM/yyyy") : "-",
        })
      );
    }

    return stats;
  };

  return (
    <>
      <div className="grid grid-cols-3 justify-items-center gap-10 w-full">
        <div className="flex flex-col gap-3 w-full">
          <span className="text-2xl font-bold underline underline-offset-2">
            {t("Users.Details.Information")}
          </span>
          <div className="flex flex-col gap-4">
            <UserInfoField textKey="Name" value={name} />
            <UserInfoField textKey="Email" value={email} />
            <UserInfoField textKey="Phone" value={phone ?? ""} />
            {isCurrentUser && <LanguageSelector />}
          </div>
        </div>
        <div className="flex flex-col w-full">
          <SwitchSelector
            keyParam={CLASS_KEY_PARAM}
            options={getSelectorOptions()}
          />
          {data && (
            <div className="flex flex-col">
              {data[selectedOption as keyof IBookingClasses].map(
                (item, idx) => (
                  <UserClassItem key={idx} classInstance={item.class} />
                )
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-3">
            <span className="text-2xl font-bold underline underline-offset-2">
              {t("Users.Details.Stats.Title")}
            </span>
            <div className="flex flex-col gap-4">
              {getStats().map((item, idx) => (
                <span key={idx}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {actionType === "delete-event" && (
        <DeleteUserModal
          user={user}
          refetch={refetch}
          handleClose={() => setParams([{ key: "action" }])}
        />
      )}
    </>
  );
};
