import { useState } from "react";
import { Button } from "./ui/button";
import { Mail, Phone, ShieldCheck } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
            Get In Touch
          </span>
          <h2 className="text-4xl font-serif text-foreground font-bold mb-4">
            Contact Me
          </h2>
          <p className="text-gray-600">
            Have questions about sessions or need more information? I'm here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-[#f7f3ec] p-8 rounded-3xl border border-[#d8c8af] space-y-6">
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">Contact Details</h3>
              
              <div className="flex items-center gap-4 text-gray-700">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Email Address</p>
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
                  <p className="text-sm text-gray-500 font-medium">Phone Number</p>
                  <p className="text-lg font-medium">Available upon request</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-primary/20 flex items-start gap-4 shadow-sm">
              <ShieldCheck className="text-primary shrink-0" size={32} />
              <div>
                <h4 className="font-bold text-foreground mb-1">100% Secure & Confidential</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  All correspondence and session details are strictly confidential. We use trusted and secure payment gateways (Razorpay) for all transactions to ensure your information is safe.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Send a Message</h3>
            
            {submitStatus === 'success' ? (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-4">✓</div>
                <h3 className="text-xl font-serif text-primary font-bold">Message Sent</h3>
                <p className="text-gray-600">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                <Button variant="outline" onClick={() => setSubmitStatus('idle')} className="mt-4">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
                  <input required minLength={2} type="text" name="name" id="contact-name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-gray-50/50" placeholder="Your Name" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                  <input required type="email" name="email" id="contact-email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-gray-50/50" placeholder="your@email.com" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="contact-phone" className="text-sm font-medium text-gray-700">Phone Number (Optional)</label>
                  <input type="tel" name="phone" id="contact-phone" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-gray-50/50" placeholder="Your phone number" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-sm font-medium text-gray-700">Message <span className="text-red-500">*</span></label>
                  <textarea required name="message" id="contact-message" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none bg-gray-50/50" placeholder="How can I help you?"></textarea>
                </div>

                {submitStatus === 'error' && (
                  <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
                )}

                <Button type="submit" variant="primary" className="w-full py-4" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
