'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function LanguageQueryWatcher() {
  const searchParams = useSearchParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    const langParam = searchParams.get('lang');
    if (langParam === 'hi') {
      if (i18n.language !== 'hi') {
        i18n.changeLanguage('hi');
      }
    } else if (langParam === 'en' || (langParam && langParam !== 'hi')) {
      if (i18n.language !== 'en') {
        i18n.changeLanguage('en');
      }
    }
  }, [searchParams, i18n]);

  return null;
}
