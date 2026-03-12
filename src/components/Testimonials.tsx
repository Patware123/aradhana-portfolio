import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Therapy with Aradhana has been a turning point for me. Her calm and empathetic approach helped me unravel years of anxiety. I finally feel heard.",
    name: "Client A.",
    tag: "Managed Anxiety & Overthinking"
  },
  {
    quote: "The expressive arts techniques used in our sessions helped me process emotions I didn't even know I was holding onto. Truly a safe space.",
    name: "Client R.",
    tag: "Trauma & Emotional Regulation"
  },
  {
    quote: "I appreciated the structured yet gentle CBT exercises. It gave me practical tools to handle my daily stress and rebuild my self-esteem.",
    name: "Client M.",
    tag: "Stress & Self Esteem"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-2 block">
            Client Experiences
          </span>
          <h2 className="text-4xl font-serif text-foreground font-bold mb-4">
            Words of Reflection
          </h2>
          <p className="text-gray-600">
            Placeholder reviews reflecting the safe and supportive environment cultivated during sessions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <div key={index} className="bg-background rounded-2xl p-8 shadow-sm border border-secondary/20 relative mt-8">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-secondary text-primary rounded-full flex items-center justify-center shadow-md">
                <Quote size={20} fill="currentColor" />
              </div>
              <p className="text-gray-700 italic mb-6 leading-relaxed pt-2">
                "{test.quote}"
              </p>
              <div>
                <p className="font-bold font-serif text-foreground">{test.name}</p>
                <p className="text-xs text-primary-light uppercase tracking-wider mt-1">{test.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
