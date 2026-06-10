'use client';

import React from 'react';
import { useTranslation } from "react-i18next";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, i18n } = useTranslation(['common']);

  // Determine current active locale from i18n instance language state
  const locale = i18n.language || 'en';
  const localePrefix = `/${locale}`;

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12 border-b border-primary-light pb-12">

          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-2xl font-serif">{t('brand')}</h3>
            <p className="text-[#d8c8af] opacity-90 text-sm">
              {t('footer.desc')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold tracking-wider text-secondary">{t('footer.quickLinks')}</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <a href={`${localePrefix}/#about`} className="text-gray-300 hover:text-white transition-colors">{t('nav.about')}</a>
              <a href={`${localePrefix}/#services`} className="text-gray-300 hover:text-white transition-colors">{t('nav.services')}</a>
              <a href={`${localePrefix}/#services`} className="text-gray-300 hover:text-white transition-colors">{t('nav.booking')}</a>
              <a href={`${localePrefix}/#contact`} className="text-gray-300 hover:text-white transition-colors">{t('nav.contact')}</a>
            </nav>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold tracking-wider text-secondary">{t('footer.legal')}</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href={`${localePrefix}/privacy-policy`} className="text-gray-300 hover:text-white transition-colors">{t('nav.privacy')}</Link>
              <Link href={`${localePrefix}/terms-and-conditions`} className="text-gray-300 hover:text-white transition-colors">{t('nav.terms')}</Link>
              <Link href={`${localePrefix}/refund-policy`} className="text-gray-300 hover:text-white transition-colors">{t('nav.refund')}</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold tracking-wider text-secondary">{t('footer.contact')}</h4>
            <div className="space-y-3 text-sm">
              <a href="mailto:baghare123@gmail.com" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors break-all">
                <Mail size={16} className="shrink-0" />
                <span>baghare123@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone size={16} className="shrink-0" />
                <span>{t('footer.location')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>{t('footer.rights', { year: currentYear })}</p>
          <p>{t('footer.sub')}</p>
        </div>
      </div>
    </footer>
  );
}
