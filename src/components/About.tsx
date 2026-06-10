'use client';

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation(['home']);

  const approachList = t('about.approachList', { returnObjects: true }) as string[];
  const experienceList = t('about.experienceList', { returnObjects: true }) as string[];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Image Side */}
          <div className="w-full md:w-5/12">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/profile.jpeg"
                alt="Aradhana Baghare - Psychologist"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full md:w-7/12 space-y-8">
            <div>
              <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block">
                {t('about.subtitle')}
              </span>
              <h2 className="text-4xl font-serif text-foreground font-bold">
                {t('about.title')}
              </h2>
            </div>

            <div className="prose prose-lg text-gray-700 max-w-none space-y-4">
              <p dangerouslySetInnerHTML={{ __html: t('about.bio1') }} />
              <p dangerouslySetInnerHTML={{ __html: t('about.bio2') }} />

              <div className="grid md:grid-cols-2 gap-6 mt-8 p-6 bg-background rounded-2xl border border-secondary/50 shadow-sm">
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-3">
                    {t('about.approachTitle')}
                  </h3>
                  <ul className="space-y-2 text-sm text-foreground/80 list-disc list-inside">
                    {Array.isArray(approachList) && approachList.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-3">
                    {t('about.experienceTitle')}
                  </h3>
                  <ul className="space-y-2 text-sm text-foreground/80 list-none pl-0">
                    {Array.isArray(experienceList) && experienceList.map((item, index) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
