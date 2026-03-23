import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 -right-20 w-80 h-80 bg-[#e0d6c8] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-40 w-80 h-80 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-6 block">
          Counselling Psychologist
        </span>

        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight max-w-4xl mx-auto">
          Aradhana Baghare
        </h1>

        <p className="text-xl md:text-2xl text-primary-light mb-10 max-w-2xl mx-auto font-light">
          A safe, non-judgmental space to understand yourself, process your emotions, and start feeling lighter - one step closer to self. <br />
          Click "Book a Session" to begin.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a href="https://forms.gle/CQuhR5HLTfNNkf2aA" target='_blank'>
            <Button variant="primary" className="w-full sm:w-auto text-lg px-8 py-4">
              Book a Session
            </Button>
          </a>
          <a href="#about">
            <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-4">
              Learn More
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
