'use client';

import React, { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Languages, ChevronDown } from 'lucide-react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // Determine current active locale from URL structure or search query
  const currentLocale = pathname.startsWith('/hi') || searchParams.get('lang') === 'hi' ? 'hi' : 'en';

  const handleLanguageChange = (newLocale: string) => {
    setIsOpen(false);
    if (newLocale === currentLocale) return;

    // Set cookie NEXT_LOCALE for next-i18n-router middleware compatibility
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    // Construct search params with target language
    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', newLocale);

    // Segment replacement logic for URL pathnames
    const segments = pathname.split('/');
    const currentPrefix = segments[1];
    const isLocaleSegment = currentPrefix === 'en' || currentPrefix === 'hi';

    if (isLocaleSegment) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }

    const newPathname = segments.join('/') || '/';

    // Reactively transition paths without full page refresh
    router.push(`${newPathname}?${params.toString()}`);
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी (Hindi)' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="relative">
        {/* Uncomment to enable floating selector button if desired */}
        {/* <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-secondary/50 text-primary hover:text-primary-light px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-sm outline-none cursor-pointer"
        >
          <Languages size={18} className="text-[#6d5b4b]" />
          <span>{currentLocale === 'hi' ? 'हिन्दी' : 'English'}</span>
          <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button> */}

        {isOpen && (
          <ul className="absolute bottom-full right-0 mb-2 w-40 bg-white/95 backdrop-blur-md border border-secondary/30 rounded-2xl shadow-xl overflow-hidden py-1 animate-in fade-in slide-in-from-bottom-2 duration-200 list-none m-0">
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer hover:bg-secondary/20 border-0 bg-transparent ${
                    currentLocale === lang.code ? 'text-primary font-bold bg-secondary/10' : 'text-gray-700'
                  }`}
                >
                  {lang.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
