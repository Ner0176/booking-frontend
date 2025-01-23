import { useTranslation } from "react-i18next";
import { IBookingClasses, IUser, useGetBookingsFromUser } from "../../../api";
import { SwitchSelector } from "../../base";
import { UserClassItem, UserInfoField } from "./user-details.content";
import { useSearchParamsManager } from "../../../hooks";

const CLASS_KEY_PARAM = "classType";

export const UserDetails = ({ user }: Readonly<{ user: IUser }>) => {
  const { t } = useTranslation();
  const { params } = useSearchParamsManager([CLASS_KEY_PARAM]);
  const selectedOption = params.get(CLASS_KEY_PARAM) ?? "pending";

  const { id, name, phone, email } = user;

  const { data } = useGetBookingsFromUser(id);

  const getSelectorOptions = () => {
    const options = ["cancelled", "completed", "pending"];
    return options.map((option) => ({
      key: option,
      text: t(`Users.Details.SwitchOptions.${option}`),
    }));
  };

  return (
    <div className="grid grid-cols-3 justify-items-center gap-10 w-full">
      <div className="flex flex-col gap-3 w-full">
        <span className="text-2xl font-bold underline underline-offset-2">
          Información del usuario
        </span>
        <div className="flex flex-col gap-4">
          <UserInfoField textKey="Name" value={name} />
          <UserInfoField textKey="Email" value={email} />
          <UserInfoField textKey="Phone" value={phone ?? ""} />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <SwitchSelector
          keyParam={CLASS_KEY_PARAM}
          options={getSelectorOptions()}
        />
        {data && (
          <div className="flex flex-col">
            {data[selectedOption as keyof IBookingClasses].map((item, idx) => (
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
            <span>Clases asistidas: {data?.completed.length}</span>
            <span>Clases canceladas: {data?.cancelled.length}</span>
            <span>Clases pendientes: {data?.pending.length}</span>
            <span>
              Primera clase realizada:{" "}
              {data?.completed.length
                ? new Date(data?.completed[0].class.date).toString()
                : "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
