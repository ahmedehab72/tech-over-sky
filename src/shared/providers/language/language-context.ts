import { createContext } from "react";

import type { Locale } from "@/shared/i18n/config";

export type Direction = "ltr" | "rtl";

export type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: Direction;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);
