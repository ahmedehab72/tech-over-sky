import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import {
  defaultLocale,
  isSupportedLocale,
  supportedLocales,
  type Locale,
} from "@/shared/i18n/config";
import ar from "@/shared/i18n/messages/ar.json";
import en from "@/shared/i18n/messages/en.json";

function getInitialLocale(): Locale {
  const firstSegment = window.location.pathname.split("/")[1];

  return firstSegment !== undefined && isSupportedLocale(firstSegment)
    ? firstSegment
    : defaultLocale;
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: getInitialLocale(),
  fallbackLng: defaultLocale,
  supportedLngs: [...supportedLocales],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
