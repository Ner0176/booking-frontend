import i18n from "i18next";
import es from "../src/assets/locales/es.json";
import ca from "../src/assets/locales/ca.json";
import en from "../src/assets/locales/en.json";
import { initReactI18next } from "react-i18next";
import { useUserStore } from "./stores";

const user = useUserStore.getState().user;
const savedLanguage = !!user ? user.language : "es";

i18n.use(initReactI18next).init({
  lng: savedLanguage,
  fallbackLng: "es",
  supportedLngs: ["es", "ca", "en"],
  interpolation: {
    escapeValue: false,
  },
  resources: {
    es: { translation: es },
    ca: { translation: ca },
    en: { translation: en },
  },
});

export default i18n;
