'use client';

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Mail, Phone, ShieldCheck } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { t } = useTranslation(['contact']);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, isContactMessage: true }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block">
            {t('subtitle')}
          </span>
          <h2 className="text-4xl font-serif text-foreground font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-600">
            {t('desc')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-[#f7f3ec] p-8 rounded-3xl border border-[#d8c8af] space-y-6">
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">{t('detailsTitle')}</h3>
              
              <div className="flex items-center gap-4 text-gray-700">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">{t('emailLabel')}</p>
                  <a href="mailto:baghare123@gmail.com" className="text-lg font-medium hover:text-primary transition-colors">
                    baghare123@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-700">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">{t('phoneLabel')}</p>
                  <p className="text-lg font-medium">{t('phoneValue')}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-primary/20 flex items-start gap-4 shadow-sm">
              <ShieldCheck className="text-primary shrink-0" size={32} />
              <div>
                <h4 className="font-bold text-foreground mb-1">{t('securityTitle')}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t('securityDesc')}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-serif font-bold text-foreground mb-6">{t('formTitle')}</h3>
            
            {submitStatus === 'success' ? (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-4">✓</div>
                <h3 className="text-xl font-serif text-primary font-bold">{t('form.successTitle')}</h3>
                <p className="text-gray-600">{t('form.successDesc')}</p>
                <Button variant="outline" onClick={() => setSubmitStatus('idle')} className="mt-4 cursor-pointer">
                  {t('form.btnSendAnother')}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-sm font-medium text-gray-700">{t('form.nameLabel')} <span className="text-red-500">*</span></label>
                  <input required minLength={2} type="text" name="name" id="contact-name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-gray-50/50" placeholder={t('form.nameLabel')} />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-sm font-medium text-gray-700">{t('form.emailLabel')} <span className="text-red-500">*</span></label>
                  <input required type="email" name="email" id="contact-email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-gray-50/50" placeholder={t('form.emailLabel')} />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="contact-phone" className="text-sm font-medium text-gray-700">{t('form.phoneLabel')}</label>
                  <input type="tel" name="phone" id="contact-phone" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-gray-50/50" placeholder={t('form.phoneLabel')} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-sm font-medium text-gray-700">{t('form.messageLabel')} <span className="text-red-500">*</span></label>
                  <textarea required name="message" id="contact-message" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none bg-gray-50/50" placeholder={t('form.messageLabel')}></textarea>
                </div>

                {submitStatus === 'error' && (
                  <p className="text-red-500 text-sm">{t('form.errorMsg')}</p>
                )}

                <Button type="submit" variant="primary" className="w-full py-4 cursor-pointer" disabled={isSubmitting}>
                  {isSubmitting ? t('form.btnSending') : t('form.btnSend')}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
