import React from 'react';
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TranslationsProvider from "@/components/TranslationsProvider";
import { initTranslations } from "@/lib/i18n";

export const metadata = {
  title: "Privacy Policy | Aradhana Baghare",
};

interface PrivacyPolicyProps {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyPolicy({ params }: PrivacyPolicyProps) {
  const { locale } = await params;
  const namespaces = ['policies', 'common'];
  const { t, resources } = await initTranslations(locale, namespaces);

  return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
      <div className="min-h-screen bg-white">
        <div className="bg-secondary/30 py-12">
          <div className="container mx-auto px-6 max-w-4xl">
            <Link href={`/${locale}`} className="inline-flex items-center text-primary hover:text-primary-light font-medium mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> {t('backToHome', { ns: 'policies' })}
            </Link>
            <h1 className="text-4xl font-serif font-bold text-foreground">{t('privacy.title', { ns: 'policies' })}</h1>
            <p className="text-gray-600 mt-2">{t('lastUpdated', { ns: 'policies' })}</p>
          </div>
        </div>

        <div className="container mx-auto px-6 max-w-4xl py-12">
          <div className="prose prose-lg text-gray-700 max-w-none space-y-6">
            <p>
              {t('privacy.p1', { ns: 'policies' })}
            </p>

            <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">{t('privacy.section1Title', { ns: 'policies' })}</h2>
            <p>
              {t('privacy.section1Text', { ns: 'policies' })}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('privacy.section1Item1', { ns: 'policies' })}</li>
              <li>{t('privacy.section1Item2', { ns: 'policies' })}</li>
              <li>{t('privacy.section1Item3', { ns: 'policies' })}</li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">{t('privacy.section2Title', { ns: 'policies' })}</h2>
            <p>
              {t('privacy.section2Text', { ns: 'policies' })}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('privacy.section2Item1', { ns: 'policies' })}</li>
              <li>{t('privacy.section2Item2', { ns: 'policies' })}</li>
              <li>{t('privacy.section2Item3', { ns: 'policies' })}</li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">{t('privacy.section3Title', { ns: 'policies' })}</h2>
            <p>
              {t('privacy.section3Text', { ns: 'policies' })}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('privacy.section3Item1', { ns: 'policies' })}</li>
              <li>{t('privacy.section3Item2', { ns: 'policies' })}</li>
              <li>{t('privacy.section3Item3', { ns: 'policies' })}</li>
              <li>{t('privacy.section3Item4', { ns: 'policies' })}</li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">{t('privacy.section4Title', { ns: 'policies' })}</h2>
            <p>
              {t('privacy.section4Text', { ns: 'policies' })}
            </p>

            <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">{t('privacy.section5Title', { ns: 'policies' })}</h2>
            <p>
              {t('privacy.section5Text', { ns: 'policies' })}
            </p>
          </div>
        </div>
      </div>
    </TranslationsProvider>
  );
}
