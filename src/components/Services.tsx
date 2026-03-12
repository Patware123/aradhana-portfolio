import { 
  Heart, BrainCircuit, ShieldAlert, Sparkles, 
  Wind, Activity, Baby, Lightbulb, MessageSquareQuote, 
  BatteryCharging, Moon
} from "lucide-react";

const services = [
  { icon: Heart, title: "Relationship Issues", desc: "Navigate conflicts and build healthier connections." },
  { icon: Sparkles, title: "Anxiety", desc: "Learn to manage worry and find your calm." },
  { icon: ShieldAlert, title: "Self Esteem", desc: "Build confidence and embrace your self-worth." },
  { icon: Wind, title: "Stress", desc: "Develop healthy coping mechanisms for daily pressures." },
  { icon: Activity, title: "Emotional Regulation", desc: "Understand and manage intense emotions safely." },
  { icon: BrainCircuit, title: "Trauma", desc: "Process past experiences in a supportive environment." },
  { icon: Baby, title: "Childhood Issues", desc: "Heal early wounds affecting your present life." },
  { icon: Lightbulb, title: "Overthinking", desc: "Break cycles of rumination and find mental clarity." },
  { icon: MessageSquareQuote, title: "Validation Issues", desc: "Learn to validate your own experiences and feelings." },
  { icon: BatteryCharging, title: "Low Motivation", desc: "Rediscover your drive and sense of purpose." },
  { icon: Moon, title: "Sleep Issues", desc: "Address the psychological factors affecting your rest." },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block">
            Areas of Focus
          </span>
          <h2 className="text-4xl font-serif text-foreground font-bold mb-4">
            Therapy Services
          </h2>
          <p className="text-gray-600">
            Providing a supportive space to explore, understand, and navigate life's challenges.
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
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
