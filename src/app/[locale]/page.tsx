import React from 'react';
import TranslationsProvider from '@/components/TranslationsProvider';
import { initTranslations } from '@/lib/i18n';
import HomeClient from '@/components/HomeClient';

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const namespaces = ['home', 'booking', 'contact', 'common'];
  const { resources } = await initTranslations(locale, namespaces);

  return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
      <HomeClient />
    </TranslationsProvider>
  );
}
