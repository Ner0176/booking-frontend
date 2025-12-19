import { Locale } from "date-fns";
import { es } from "date-fns/locale/es";
import { ca } from "date-fns/locale/ca";
import { enGB } from "date-fns/locale/en-GB";

const LNG_RELATION: Record<string, Locale> = {
  es: es,
  ca: ca,
  en: enGB,
};

export const LONG_LNG_NAME: Record<string, string> = {
  es: "es-ES",
  ca: "ca-ES",
  en: "en-GB",
};

export function getLocaleLng(lng?: string) {
  return LNG_RELATION[lng ?? "es"];
}

export function getLongLngName(lng?: string) {
  return LONG_LNG_NAME[lng ?? "es"];
}
