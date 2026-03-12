import Image from "next/image";

export default function About() {
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
                About Me
              </span>
              <h2 className="text-4xl font-serif text-foreground font-bold">
                Navigating the Journey Together
              </h2>
            </div>

            <div className="prose prose-lg text-gray-700 max-w-none space-y-4">
              <p>
                Hi, I am <strong>Aradhana Baghare</strong>, a Counselling Psychologist based in Madhya Pradesh, India. I hold an M.A. in Counselling Psychology and specialize in a CBT-informed, integrative therapeutic approach.
              </p>
              <p>
                My practice focuses on providing a safe, empathetic environment where clients can explore their emotions, regulate their experiences, and foster meaningful personal growth. I integrate <em>Cognitive Behaviour Therapy (CBT)</em> alongside expressive arts, play-based, and movement-oriented interventions.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8 p-6 bg-background rounded-2xl border border-secondary/50 shadow-sm">
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-3">Therapeutic Approach</h3>
                  <ul className="space-y-2 text-sm text-foreground/80 list-disc list-inside">
                    <li>Cognitive Behaviour Therapy (CBT)</li>
                    <li>Expressive arts & movement</li>
                    <li>Play-based & sensory interventions</li>
                    <li>Integrative, client-centred</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-3">Experience</h3>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li><strong>TARA Centre</strong> - Associate Psychologist</li>
                    <li><strong>Tairas Mental Health</strong> - CBT Supervised Practice</li>
                    <li><strong>UpLife</strong> - CBT Counselling Intern</li>
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
