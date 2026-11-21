import { type MiddlewareFunction, redirect } from "react-router-dom";

import { defaultLocale, isSupportedLocale } from "@/shared/i18n/config";

export const localeMiddleware: MiddlewareFunction = ({ params, request }, next) => {
  const { lang } = params;

  if (lang && !isSupportedLocale(lang)) {
    const { pathname, search, hash } = new URL(request.url);
    const [, , ...segments] = pathname.split("/");
    const suffix = segments.length > 0 ? `/${segments.join("/")}` : "";

    return redirect(`/${defaultLocale}${suffix}${search}${hash}`);
  }

  return next();
};
