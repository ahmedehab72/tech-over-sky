import { type PropsWithChildren, useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import i18n from "@/shared/i18n";
import { defaultLocale, isSupportedLocale, type Locale } from "@/shared/i18n/config";
import {
  type Direction,
  LanguageContext,
} from "@/shared/providers/language/language-context";

function getDirection(locale: Locale): Direction {
  return locale === "ar" ? "rtl" : "ltr";
}

export function LanguageProvider({ children }: PropsWithChildren) {
  const { lang } = useParams();
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();

  const locale: Locale = lang && isSupportedLocale(lang) ? lang : defaultLocale;
  const dir = getDirection(locale);

  useEffect(() => {
    void i18n.changeLanguage(locale);
  }, [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [dir, locale]);

  const setLocale = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === locale) {
        return;
      }

      const [, , ...segments] = pathname.split("/");
      const suffix = segments.length > 0 ? `/${segments.join("/")}` : "";

      navigate(`/${nextLocale}${suffix}${search}${hash}`);
    },
    [hash, locale, navigate, pathname, search],
  );

  const value = useMemo(() => ({ locale, setLocale, dir }), [dir, locale, setLocale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
