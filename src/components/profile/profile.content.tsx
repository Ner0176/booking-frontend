import { IUser, useUpdateUser } from "../../api";
import { useSearchParamsManager, useUser } from "../../hooks";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
  initUserFieldErrors,
  IUpdateUserFields,
  IUserFieldErrors,
} from "./profile.interface";
import { CustomButton, CustomInputField, LanguageSelector } from "../base";
import { mdiAccountOutline, mdiEmailOutline, mdiPhoneOutline } from "@mdi/js";
import { checkPhone } from "../../utils";
import { UserInfoField } from "../users";

export const EditProfileInformation = ({
  user,
  refetch,
}: Readonly<{ user: IUser; refetch(): void }>) => {
  const { updateUser: updateUserLocally } = useUser();
  const { t, i18n } = useTranslation();
  const { setParams } = useSearchParamsManager([]);

  const { name, email, phone, language } = user;

  const [fields, setFields] = useState<IUpdateUserFields>({
    name,
    language,
  });
  const [errors, setErrors] = useState<IUserFieldErrors>(initUserFieldErrors);

  const handleSuccess = () => {
    refetch();
    setParams([{ key: "action" }]);
    i18n.changeLanguage(fields.language);
    updateUserLocally("language", fields.language);
  };

  const { mutate: updateUser, isPending: isLoading } =
    useUpdateUser(handleSuccess);

  useEffect(() => {
    setFields({ name, language, phone: phone ?? "" });
  }, [name, phone, language]);

  const handleUpdateField = (field: string, value: string) => {
    setFields((prev) => {
      return { ...prev, [field]: value };
    });
  };

  const handleErrors = (field: string, value: boolean) => {
    setErrors((prev) => {
      return { ...prev, [field]: value };
    });
  };

  const handleSubmit = () => {
    if (!errors.name && !errors.phone) {
      updateUser({
        name: fields.name,
        phone: fields.phone,
        language: fields.language,
      });
    }
  };

  return (
    <>
      <CustomInputField
        placeholder={name}
        value={fields.name}
        title={t("Auth.Fields.Name")}
        icon={{ name: mdiAccountOutline }}
        handleBlur={() => {
          let showError = false;
          if (!fields.name.length) showError = true;
          handleErrors("name", showError);
        }}
        handleChange={(v) => handleUpdateField("name", v)}
        error={errors.name ? t("Auth.Errors.Name") : undefined}
      />
      <UserInfoField icon={mdiEmailOutline} textKey="Email" value={email} />
      <CustomInputField
        placeholder="976 65 84 34"
        value={fields.phone || ""}
        title={t("Auth.Fields.Phone")}
        icon={{ name: mdiPhoneOutline }}
        handleBlur={() => {
          let showError = false;
          const phone = fields.phone ?? "";
          if (phone.length > 0 && !checkPhone(phone)) {
            showError = true;
          }
          handleErrors("phone", showError);
        }}
        handleChange={(v) => handleUpdateField("phone", v)}
        error={errors.phone ? t("Auth.Errors.Phone") : undefined}
      />
      <LanguageSelector
        selectedValue={fields.language}
        handleChange={(newLanguage) =>
          handleUpdateField("language", newLanguage)
        }
      />
      <div className="flex flex-row items-center justify-end gap-3">
        <CustomButton
          color="secondary"
          onClick={() => setParams([{ key: "action" }])}
        >
          {t("Base.Buttons.Cancel")}
        </CustomButton>
        <CustomButton isLoading={isLoading} onClick={handleSubmit}>
          {t("Base.Buttons.Save")}
        </CustomButton>
      </div>
    </>
  );
};
