import React from 'react';
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TranslationsProvider from "@/components/TranslationsProvider";
import { initTranslations } from "@/lib/i18n";

export const metadata = {
  title: "Refund & Cancellation Policy | Aradhana Baghare",
};

interface RefundPolicyProps {
  params: Promise<{ locale: string }>;
}

export default async function RefundPolicy({ params }: RefundPolicyProps) {
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
            <h1 className="text-4xl font-serif font-bold text-foreground">{t('refund.title', { ns: 'policies' })}</h1>
            <p className="text-gray-600 mt-2">{t('lastUpdated', { ns: 'policies' })}</p>
          </div>
        </div>

        <div className="container mx-auto px-6 max-w-4xl py-12">
          <div className="prose prose-lg text-gray-700 max-w-none space-y-6">
            <p>
              {t('refund.p1', { ns: 'policies' })}
            </p>

            <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">{t('refund.section1Title', { ns: 'policies' })}</h2>
            <p>
              {t('refund.section1Text', { ns: 'policies' })}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('refund.section1Item1', { ns: 'policies' })}</li>
              <li>{t('refund.section1Item2', { ns: 'policies' })}</li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">{t('refund.section2Title', { ns: 'policies' })}</h2>
            <p>
              {t('refund.section2Text', { ns: 'policies' })}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('refund.section2Item1', { ns: 'policies' })}</li>
              <li>{t('refund.section2Item2', { ns: 'policies' })}</li>
              <li>{t('refund.section2Item3', { ns: 'policies' })}</li>
              <li>{t('refund.section2Item4', { ns: 'policies' })}</li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">{t('refund.section3Title', { ns: 'policies' })}</h2>
            <p>
              {t('refund.section3Text', { ns: 'policies' })}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('refund.section3Item1', { ns: 'policies' })}</li>
              <li>{t('refund.section3Item2', { ns: 'policies' })}</li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">{t('refund.section4Title', { ns: 'policies' })}</h2>
            <p>
              {t('refund.section4Text', { ns: 'policies' })}
            </p>

            <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">{t('refund.section5Title', { ns: 'policies' })}</h2>
            <p>
              {t('refund.section5Text', { ns: 'policies' })}
            </p>
          </div>
        </div>
      </div>
    </TranslationsProvider>
  );
}
