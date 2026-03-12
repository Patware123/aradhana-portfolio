import { useState } from "react";
import { Button } from "./ui/button";

const concernOptions = [
  "Relationship Issues", "Anxiety", "Self Esteem", "Stress", 
  "Emotional Regulation", "Trauma", "Childhood Issues", 
  "Overthinking", "Validation Issues", "Low Motivation", 
  "Sleep Issues", "Other"
];

export default function BookingForm() {
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
        body: JSON.stringify(data),
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
    <section id="booking" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          <div className="w-full md:w-5/12 bg-primary text-white p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-4">Book a Session</h2>
              <p className="text-primary-light text-[#d8c8af] mb-8">
                Take the first step towards healing and understanding. Fill out the form, and I will get back to you to confirm our appointment.
              </p>
            </div>
            
            <div className="space-y-4 text-sm text-[#e6dac3]">
              <p>Sessions are strictly confidential.</p>
              <p>Initial consultations focus on understanding your needs and exploring therapeutic fit.</p>
            </div>
          </div>

          <div className="w-full md:w-7/12 p-10">
            {submitStatus === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-4">✓</div>
                <h3 className="text-2xl font-serif text-primary font-bold">Booking Request Sent</h3>
                <p className="text-gray-600">Thank you for reaching out. I have received your request and will contact you shortly to confirm the appointment.</p>
                <Button variant="outline" onClick={() => setSubmitStatus('idle')} className="mt-4">
                  Book Another Session
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                    <input required type="text" name="name" id="name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="Jane Doe" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                    <input required type="email" name="email" id="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="jane@example.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                    <input required type="tel" name="phone" id="phone" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="+91 98765 43210" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="concern" className="text-sm font-medium text-gray-700">Primary Concern</label>
                    <select required defaultValue="" name="concern" id="concern" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-gray-700 bg-white">
                      <option value="" disabled>Select an area</option>
                      {concernOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-medium text-gray-700">Preferred Date</label>
                    <input required type="date" name="date" id="date" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="time" className="text-sm font-medium text-gray-700">Preferred Time</label>
                    <input required type="time" name="time" id="time" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">Additional Message (Optional)</label>
                  <textarea name="message" id="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none" placeholder="Is there anything specific you'd like me to know beforehand?"></textarea>
                </div>

                {submitStatus === 'error' && (
                  <p className="text-red-500 text-sm">Something went wrong. Please try again or contact me directly via email.</p>
                )}

                <Button type="submit" variant="primary" className="w-full py-4 text-lg" disabled={isSubmitting}>
                  {isSubmitting ? "Sending Request..." : "Request Appointment"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
