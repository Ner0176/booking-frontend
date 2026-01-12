import { mdiEarth, mdiEyeOutline, mdiLockOutline } from "@mdi/js";

export const PRIVACY_ICONS: Record<string, string> = {
  public: mdiEarth,
  private: mdiLockOutline,
  unlisted: mdiEyeOutline,
};
