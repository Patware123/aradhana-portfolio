'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function Header() {
  const { t } = useTranslation(['common']);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Determine active locale
  const currentLocale = pathname.startsWith('/hi') || searchParams.get('lang') === 'hi' ? 'hi' : 'en';

  const handleToggleLanguage = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    // Set cookie for middleware routing
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', newLocale);

    const segments = pathname.split('/');
    const currentPrefix = segments[1];
    const isLocaleSegment = currentPrefix === 'en' || currentPrefix === 'hi';

    if (isLocaleSegment) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }

    const newPathname = segments.join('/') || '/';

    router.push(`${newPathname}?${params.toString()}`);
  };

  const localePrefix = `/${currentLocale}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-md border-b border-secondary/20 transition-all duration-300">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href={`${localePrefix}/`} className="font-serif text-lg md:text-xl font-bold text-primary tracking-wide cursor-pointer no-underline">
          {t('brand')}
        </a>

        {/* Section Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
          <a href={`${localePrefix}/#about`} className="hover:text-primary transition-colors no-underline cursor-pointer">
            {t('nav.about')}
          </a>
          <a href={`${localePrefix}/#services`} className="hover:text-primary transition-colors no-underline cursor-pointer">
            {t('nav.services')}
          </a>
          <a href={`${localePrefix}/#contact`} className="hover:text-primary transition-colors no-underline cursor-pointer">
            {t('nav.contact')}
          </a>
          
          <button 
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} 
            className="bg-primary text-white text-xs px-5 py-2.5 rounded-full hover:bg-primary-light transition-all shadow-sm cursor-pointer border-0"
          >
            {t('nav.booking')}
          </button>
        </nav>

        {/* Direct Language Switcher Toggle Control */}
        <div className="flex items-center gap-1.5 bg-[#f7f3ec] border border-secondary/40 p-1 rounded-full text-xs font-bold text-gray-700 shadow-inner">
          <button
            onClick={() => handleToggleLanguage('en')}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer border-0 bg-transparent ${
              currentLocale === 'en'
                ? 'bg-primary text-white shadow-sm'
                : 'hover:text-primary text-gray-600'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => handleToggleLanguage('hi')}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer border-0 bg-transparent ${
              currentLocale === 'hi'
                ? 'bg-primary text-white shadow-sm'
                : 'hover:text-primary text-gray-600'
            }`}
          >
            HI
          </button>
        </div>
      </div>
    </header>
  );
}
