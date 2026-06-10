'use client';

import React, { ReactNode, useRef, Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createInstance, i18n as I18nInstance } from 'i18next';
import { initTranslations } from '@/lib/i18n';
import LanguageQueryWatcher from './LanguageQueryWatcher';

interface TranslationsProviderProps {
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources?: any;
}

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: TranslationsProviderProps) {
  const i18nRef = useRef<I18nInstance | null>(null);

  if (!i18nRef.current) {
    const instance = createInstance();
    i18nRef.current = instance;
    initTranslations(locale, namespaces, instance, resources);
  }

  const i18n = i18nRef.current;

  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={null}>
        <LanguageQueryWatcher />
      </Suspense>
      {children}
    </I18nextProvider>
  );
}
