import { useTranslation } from "react-i18next";
import {
  BookingType,
  IUserBookings,
  IUser,
  useGetBookingsFromUser,
} from "../../../api";
import { SwitchSelector } from "../../base";
import {
  DeleteUserModal,
  EditUserInformation,
  UserClassItem,
  UserInfoField,
} from "./user-details.content";
import { useSearchParamsManager } from "../../../hooks";
import { format } from "date-fns";
import { useEffect } from "react";
import {
  mdiAccountOutline,
  mdiEarth,
  mdiEmailOutline,
  mdiPhoneOutline,
} from "@mdi/js";

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

  const { name, phone, email, language } = user;

  const { data } = useGetBookingsFromUser(user.id);

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
            {isCurrentUser && actionType === "edit-user" ? (
              <EditUserInformation user={user} refetch={refetch} />
            ) : (
              <>
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
                {isCurrentUser && (
                  <UserInfoField
                    icon={mdiEarth}
                    textKey="Language"
                    value={t(`Base.Languages.${language}`)}
                  />
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full">
          <SwitchSelector
            keyParam={CLASS_KEY_PARAM}
            options={getSelectorOptions()}
          />
          {!!data && !!selectedOption && (
            <div className="flex flex-col">
              {data[selectedOption as keyof IUserBookings].map((item, idx) => (
                <UserClassItem key={idx} classInstance={item.class} />
              ))}
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
      {actionType === "delete-event" && !isCurrentUser && (
        <DeleteUserModal
          user={user}
          refetch={refetch}
          handleClose={() => setParams([{ key: "action" }])}
        />
      )}
    </>
  );
};
