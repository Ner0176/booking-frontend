import { mdiArrowLeft, mdiTrashCanOutline } from "@mdi/js";
import { HeaderButton } from "../base";
import { useSearchParamsManager } from "../../hooks";

export const UserHeaderButtons = () => {
  const { setParams } = useSearchParamsManager([]);

  return (
    <div className="flex flex-row items-center justify-end gap-4 w-full">
      <HeaderButton
        props={{
          icon: mdiArrowLeft,
          tPath: "Base.Buttons.Back",
          onClick: () => setParams([{ key: "userId" }]),
        }}
      />
      <HeaderButton
        props={{
          color: "secondary",
          icon: mdiTrashCanOutline,
          tPath: "Users.UserDetails.Delete",
          onClick: () => setParams([{ key: "action", value: "delete-event" }]),
        }}
      />
    </div>
  );
};
