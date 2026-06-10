import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "../globals.css";
import React, { Suspense } from "react";
import { BookingProvider } from "@/context/BookingContext";
import TranslationsProvider from "@/components/TranslationsProvider";
import Header from "@/components/Header";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { initTranslations } from "@/lib/i18n";
import i18nConfig from "../../../i18nConfig";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aradhana Baghare - Counselling Psychologist",
  description: "A safe space to understand yourself and heal. Professional counseling and therapy.",
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, ['common']);

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground selection:bg-primary-light selection:text-white`}
      >
        <TranslationsProvider locale={locale} namespaces={['common']} resources={resources}>
          <BookingProvider>
            <Suspense fallback={null}>
              <Header />
            </Suspense>
            <div className="pt-20">
              {children}
            </div>
            <Suspense fallback={null}>
              <LanguageSwitcher />
            </Suspense>
            <Toaster position="bottom-center" toastOptions={{ duration: 4000 }} />
          </BookingProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}
