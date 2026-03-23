import { 
  Heart, BrainCircuit, ShieldAlert, Sparkles, 
  Wind, Activity, Compass, Lightbulb, MessageSquareQuote, 
  BatteryCharging, Moon, UserMinus, HelpCircle, Baby
} from "lucide-react";

const services = [
  { icon: Heart, title: "Relationship Issues", desc: "Navigate conflicts and build healthier connections." },
  { icon: Sparkles, title: "Anxiety", desc: "Learn to manage worry and find your calm." },
  { icon: ShieldAlert, title: "Self Esteem", desc: "Build confidence and embrace your self-worth." },
  { icon: Wind, title: "Stress", desc: "Develop healthy coping mechanisms for daily pressures." },
  { icon: Activity, title: "Emotional Regulation", desc: "Understand and manage intense emotions safely." },
  { icon: BrainCircuit, title: "Trauma", desc: "Process past experiences in a supportive environment." },
  { icon: Compass, title: "Self Exploration", desc: "Discover your true self and understand your needs deeply." },
  { icon: Lightbulb, title: "Overthinking", desc: "Break cycles of rumination and find mental clarity." },
  { icon: MessageSquareQuote, title: "Validation Issues", desc: "Learn to validate your own experiences and feelings." },
  { icon: BatteryCharging, title: "Low Motivation", desc: "Rediscover your drive and sense of purpose." },
  { icon: Moon, title: "Sleep Issues", desc: "Address the psychological factors affecting your rest." },
  { icon: UserMinus, title: "Loneliness", desc: "Work through feelings of isolation and build meaningful connections." },
  { icon: Baby, title: "Childhood Issues", desc: "Heal early wounds affecting your present life." },
  { icon: HelpCircle, title: "Other Issues", desc: "A safe space for any other emotional or psychological challenges." },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block">
            Investment in Yourself
          </span>
          <h2 className="text-4xl font-serif text-foreground font-bold mb-4">
            Session Plans
          </h2>
          <p className="text-gray-600 mb-12">
            Transparent pricing for your mental wellness journey. Secure your session today.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left items-stretch">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-secondary/50 relative overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Basic Session</h3>
              <div className="text-4xl font-bold text-primary mb-2">₹500</div>
              <div className="text-gray-500 mb-6 font-medium text-sm">45 mins</div>
              <p className="text-gray-600 mb-8 flex-grow">Brief consultation. Ideal for initial assessment, general counseling, and exploring therapeutic fit.</p>
              <div className="mt-auto">
                <a href="#booking-basic" className="block text-center w-full py-4 px-6 rounded-full bg-secondary/20 text-primary font-semibold hover:bg-secondary/40 transition-colors duration-300">Book Basic</a>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-primary relative overflow-hidden group hover:shadow-xl transition-all duration-300 md:-translate-y-2 flex flex-col">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-bl-lg">RECOMMENDED</div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Standard Session</h3>
              <div className="text-4xl font-bold text-primary mb-2">₹800</div>
              <div className="text-gray-500 mb-6 font-medium text-sm">60 mins</div>
              <p className="text-gray-600 mb-8 flex-grow">Deep dive session. Focused on emotional processing, cognitive shifts, therapies, and customized interventions.</p>
              <div className="mt-auto">
                <a href="#booking-standard" className="block text-center w-full py-4 px-6 rounded-full bg-primary text-white font-semibold hover:bg-primary-light transition-colors duration-300 shadow-md">Book Standard</a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-16 mt-24">
          <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block">
            Areas of Focus
          </span>
          <h2 className="text-3xl font-serif text-foreground font-bold mb-4">
            How I Can Help
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
