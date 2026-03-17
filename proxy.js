import { NextResponse } from "next/server";

const locales = ["en", "hu", "es", "de"];
const defaultLocale = "hu";
const LOCALE_COOKIE = "NEXT_LOCALE";

function getPreferredLocale(request) {
  // 1) Cookie-ból először (user választás)
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2) Böngésző nyelvéből
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  const preferred = acceptLanguage
    .split(",")
    .map((lang) => lang.split(";")[0].trim().substring(0, 2).toLowerCase())
    .find((lang) => locales.includes(lang));

  return preferred || "en";
}

export function proxy(request) {
  const url = new URL(request.url);
  const { pathname } = url;

  if (pathname.includes(".")) return NextResponse.next();

  const first = pathname.split("/")[1];
  
  // Ha már lokalizált útvonal → cookie frissítése
  if (locales.includes(first)) {
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, first, { 
      maxAge: 60 * 60 * 24 * 365, // 1 év
      path: "/" 
    });
    return response;
  }

  const locale = getPreferredLocale(request);

  if (pathname === "/") {
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  url.pathname = `/${locale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next).*)"],
};