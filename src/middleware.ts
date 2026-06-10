import { NextRequest, NextResponse } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
import i18nConfig from '../i18nConfig';

export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lang = searchParams.get('lang');

  // If lang query param is present, handle redirection and set locale cookie
  if (lang) {
    const locale = lang === 'hi' ? 'hi' : 'en';
    
    // Check if pathname starts with a locale prefix (/en or /hi)
    const segments = request.nextUrl.pathname.split('/');
    const currentPrefix = segments[1];
    const hasLocalePrefix = currentPrefix === 'en' || currentPrefix === 'hi';

    if (!hasLocalePrefix || currentPrefix !== locale) {
      const redirectUrl = request.nextUrl.clone();
      
      if (hasLocalePrefix) {
        segments[1] = locale;
        redirectUrl.pathname = segments.join('/');
      } else {
        redirectUrl.pathname = `/${locale}${request.nextUrl.pathname}`;
      }
      
      const resRedirect = NextResponse.redirect(redirectUrl);
      resRedirect.cookies.set('NEXT_LOCALE', locale, { path: '/' });
      return resRedirect;
    }

    // Set cookie if we are already on the correct path
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', locale, { path: '/' });
    return response;
  }

  return i18nRouter(request, i18nConfig);
}

// Ignore static files, API routes, and system pages
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)'
};
