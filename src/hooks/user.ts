import { useState } from "react";
import { IAccount } from "../api";

export const useUser = () => {
  const [user, setUser] = useState<IAccount | null>(() => {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  });

  const handleSetUser = (data: IAccount) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const updateUser = (key: string, value: string) => {
    if (user) {
      setUser((prev) => {
        const updatedUser = { ...prev, [key]: value } as IAccount;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      });
    }
  };

  return {
    user,
    updateUser,
    handleSetUser,
    isAdmin: Boolean(user?.isAdmin),
  };
};
