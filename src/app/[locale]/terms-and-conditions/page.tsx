import React from 'react';
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TranslationsProvider from "@/components/TranslationsProvider";
import { initTranslations } from "@/lib/i18n";

export const metadata = {
  title: "Terms & Conditions | Aradhana Baghare",
};

interface TermsAndConditionsProps {
  params: Promise<{ locale: string }>;
}

export default async function TermsAndConditions({ params }: TermsAndConditionsProps) {
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
            <h1 className="text-4xl font-serif font-bold text-foreground">{t('terms.title', { ns: 'policies' })}</h1>
            <p className="text-gray-600 mt-2">{t('lastUpdated', { ns: 'policies' })}</p>
          </div>
        </div>

        <div className="container mx-auto px-6 max-w-4xl py-12">
          <div className="prose prose-lg text-gray-700 max-w-none space-y-6">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">{t('terms.section1Title', { ns: 'policies' })}</h2>
            <p>
              {t('terms.section1Text', { ns: 'policies' })}
            </p>

            <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">{t('terms.section2Title', { ns: 'policies' })}</h2>
            <p>
              {t('terms.section2Text', { ns: 'policies' })}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('terms.section2Item1', { ns: 'policies' })}</li>
              <li>{t('terms.section2Item2', { ns: 'policies' })}</li>
              <li>{t('terms.section2Item3', { ns: 'policies' })}</li>
              <li>{t('terms.section2Item4', { ns: 'policies' })}</li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">{t('terms.section3Title', { ns: 'policies' })}</h2>
            <p>
              {t('terms.section3Text', { ns: 'policies' })}
            </p>

            <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">{t('terms.section4Title', { ns: 'policies' })}</h2>
            <p>
              {t('terms.section4Text', { ns: 'policies' })}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('terms.section4Item1', { ns: 'policies' })}</li>
              <li>{t('terms.section4Item2', { ns: 'policies' })}</li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">{t('terms.section5Title', { ns: 'policies' })}</h2>
            <p>
              {t('terms.section5Text', { ns: 'policies' })}
            </p>

            <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">{t('terms.section6Title', { ns: 'policies' })}</h2>
            <p>
              {t('terms.section6Text', { ns: 'policies' })}
            </p>
          </div>
        </div>
      </div>
    </TranslationsProvider>
  );
}
