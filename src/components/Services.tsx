'use client';

import { useTranslation } from 'react-i18next';
import { 
  Heart, BrainCircuit, ShieldAlert, Sparkles, 
  Wind, Activity, Compass, Lightbulb, MessageSquareQuote, 
  BatteryCharging, Moon, UserMinus, HelpCircle, Baby
} from "lucide-react";
import { useBooking } from "@/context/BookingContext";

const services = [
  { icon: Heart, key: "relationship" },
  { icon: Sparkles, key: "anxiety" },
  { icon: ShieldAlert, key: "selfEsteem" },
  { icon: Wind, key: "stress" },
  { icon: Activity, key: "regulation" },
  { icon: BrainCircuit, key: "trauma" },
  { icon: Compass, key: "exploration" },
  { icon: Lightbulb, key: "overthinking" },
  { icon: MessageSquareQuote, key: "validation" },
  { icon: BatteryCharging, key: "motivation" },
  { icon: Moon, key: "sleep" },
  { icon: UserMinus, key: "loneliness" },
  { icon: Baby, key: "childhood" },
  { icon: HelpCircle, key: "other" },
];

export default function Services() {
  const { openBooking } = useBooking();
  const { t } = useTranslation(['home']);

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block">
            {t('services.subtitle')}
          </span>
          <h2 className="text-4xl font-serif text-foreground font-bold mb-4">
            {t('services.title')}
          </h2>
          <p className="text-gray-600 mb-12">
            {t('services.desc')}
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left items-stretch">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-secondary/50 relative overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                {t('services.plans.basic.title')}
              </h3>
              <div className="text-4xl font-bold text-primary mb-2">
                {t('services.plans.basic.price')}
              </div>
              <div className="text-gray-500 mb-6 font-medium text-sm">
                {t('services.plans.basic.duration')}
              </div>
              <p className="text-gray-600 mb-8 flex-grow">
                {t('services.plans.basic.desc')}
              </p>
              <div className="mt-auto">
                <button 
                  onClick={() => openBooking(`Basic Session (${t('services.plans.basic.price')})`)} 
                  className="block text-center w-full py-4 px-6 rounded-full bg-secondary/20 text-primary font-semibold hover:bg-secondary/40 transition-colors duration-300 cursor-pointer"
                >
                  {t('services.plans.basic.btn')}
                </button>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-primary relative overflow-hidden group hover:shadow-xl transition-all duration-300 md:-translate-y-2 flex flex-col">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-bl-lg">
                {t('services.plans.standard.tag')}
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                {t('services.plans.standard.title')}
              </h3>
              <div className="text-4xl font-bold text-primary mb-2">
                {t('services.plans.standard.price')}
              </div>
              <div className="text-gray-500 mb-6 font-medium text-sm">
                {t('services.plans.standard.duration')}
              </div>
              <p className="text-gray-600 mb-8 flex-grow">
                {t('services.plans.standard.desc')}
              </p>
              <div className="mt-auto">
                <button 
                  onClick={() => openBooking(`Standard Session (${t('services.plans.standard.price')})`)} 
                  className="block text-center w-full py-4 px-6 rounded-full bg-primary text-white font-semibold hover:bg-primary-light transition-colors duration-300 shadow-md cursor-pointer"
                >
                  {t('services.plans.standard.btn')}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-16 mt-24">
          <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block">
            {t('services.focusSubtitle')}
          </span>
          <h2 className="text-3xl font-serif text-foreground font-bold mb-4">
            {t('services.focusTitle')}
          </h2>
          <p className="text-gray-600">
            {t('services.focusDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-secondary/30 group"
            >
              <div className="w-12 h-12 bg-[#f7f3ec] rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                <service.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold font-serif text-foreground mb-2">
                {t(`services.items.${service.key}.title` as any)}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t(`services.items.${service.key}.desc` as any)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
