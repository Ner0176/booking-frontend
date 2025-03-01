import { create } from "zustand";
import { IAccount } from "../api";
import { persist } from "zustand/middleware";

interface UserState {
  logout: () => void;
  user: IAccount | null;
  setUser: (newUser: IAccount) => void;
  updateUser: (key: string, value: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (newUser) => set(() => ({ user: newUser })),
      updateUser: (key, value) => {
        const user = get().user;
        if (user) {
          const updatedUser = { ...user, [key]: value } as IAccount;
          set(() => ({ user: updatedUser }));
        }
      },
      logout: () => set(() => ({ user: null })),
    }),
    { name: "user" }
  )
);

export const useUser = () => useUserStore((state) => state.user);
export const useSetUser = () => useUserStore((state) => state.setUser);
export const useLogoutUser = () => useUserStore((state) => state.logout);
export const useUpdateUser = () => useUserStore((state) => state.updateUser);
