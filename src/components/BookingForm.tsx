"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { CalendarHeart, X } from "lucide-react";

const concernOptions = [
  "Relationship Issues", "Anxiety", "Self Esteem", "Stress",
  "Emotional Regulation", "Trauma", "Self Exploration", "Childhood Issues",
  "Overthinking", "Validation Issues", "Low Motivation",
  "Sleep Issues", "Loneliness", "Other Issues"
];

export default function BookingForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#booking')) {
        setIsOpen(true);
        if (hash === '#booking-basic') setSelectedPlan('Basic Session (₹500)');
        else if (hash === '#booking-standard') setSelectedPlan('Standard Session (₹800)');
        else setSelectedPlan('');
        document.body.style.overflow = 'hidden';
      } else {
        setIsOpen(false);
        document.body.style.overflow = 'unset';
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const closeModal = () => {
    window.history.pushState(null, '', window.location.pathname);
    setIsOpen(false);
    document.body.style.overflow = 'unset';
    setTimeout(() => setSubmitStatus('idle'), 300);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.concern = formData.getAll('concern').join(', '); // Join multiple selected concerns

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal}></div>

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto overflow-x-hidden flex flex-col md:flex-row z-10 animate-in fade-in zoom-in-95 duration-300">

        <button onClick={closeModal} className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/10 transition-colors text-gray-700">
          <X size={20} />
        </button>

        <div className="w-full md:w-5/12 bg-primary text-white p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-serif font-bold mb-4">Book a Session</h2>
            <p className="text-[#e6dac3] mb-8">
              Take the first step towards healing and understanding. Fill out the form, and I will get back to you to confirm our appointment.
            </p>
          </div>

          <div className="flex-1 flex items-center justify-center py-8 opacity-80 relative z-10">
            <CalendarHeart size={100} strokeWidth={1} className="text-[#e6dac3]" />
          </div>

          <div className="space-y-4 text-sm text-[#e6dac3] relative z-10">
            <p>Sessions are strictly confidential.</p>
            <p>Initial consultations focus on understanding your needs and exploring therapeutic fit.</p>
          </div>
        </div>

        <div className="w-full md:w-7/12 p-8 sm:p-10 relative">
          {submitStatus === 'success' ? (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-4 animate-in zoom-in">✓</div>
              <h3 className="text-3xl font-serif text-primary font-bold">Booking Request Sent</h3>
              <p className="text-gray-600 max-w-sm">Thank you for reaching out. I have received your request and will contact you shortly to confirm the appointment.</p>
              <Button variant="outline" onClick={closeModal} className="mt-8">
                Close Window
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="plan" className="text-sm font-medium text-gray-700">Selected Session Plan</label>
                <select required value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} name="plan" id="plan" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-primary font-medium bg-secondary/10">
                  <option value="" disabled>Select a plan</option>
                  <option value="Basic Session (₹500)">Basic Session (₹500) - 45 mins</option>
                  <option value="Standard Session (₹800)">Standard Session (₹800) - 60 mins</option>
                  <option value="Not sure yet">Not sure yet / General Inquiry</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                  <input required minLength={2} maxLength={50} type="text" name="name" id="name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="Your Name" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                  <input required type="email" name="email" id="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="your@email.com" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                  <input required minLength={10} maxLength={15} pattern="[0-9+\-\s()]+" title="Please enter a valid phone number" type="tel" name="phone" id="phone" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="+91 98765 43210" />
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2 space-y-1.5">
                    <label htmlFor="date" className="text-sm font-medium text-gray-700">Preferred Date</label>
                    <input required type="date" name="date" id="date" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm" />
                  </div>
                  <div className="w-1/2 space-y-1.5">
                    <label htmlFor="time" className="text-sm font-medium text-gray-700">Preferred Time</label>
                    <input required type="time" name="time" id="time" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <label className="text-sm font-medium text-gray-700 block">Primary Concern(s) <span className="text-gray-400 font-normal ml-1">Select up to 3</span></label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {concernOptions.map(opt => (
                    <label key={opt} className="flex items-start space-x-2 text-xs text-gray-700 bg-gray-50 border border-gray-100 p-2 rounded-lg cursor-pointer hover:bg-secondary/10 hover:border-secondary/30 transition-colors">
                      <input type="checkbox" name="concern" value={opt} className="rounded text-primary focus:ring-primary w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <span className="leading-snug">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">Additional Message (Optional)</label>
                <textarea name="message" id="message" rows={2} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none text-sm" placeholder="Is there anything specific you'd like me to know beforehand?"></textarea>
              </div>

              <div className="bg-[#f7f3ec] p-4 rounded-xl border border-[#d8c8af] space-y-1 mt-4">
                <h4 className="font-serif font-bold text-primary flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  Payment Information
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  We use secure payment gateway integration to ensure safe and reliable transactions. Payment is required to confirm your session booking.
                </p>
              </div>

              {submitStatus === 'error' && (
                <p className="text-red-500 text-sm">Something went wrong. Please try again or contact me directly via email.</p>
              )}

              <div className="space-y-2 pt-2">
                <Button type="submit" variant="primary" className="w-full py-4 text-lg shadow-lg hover:shadow-xl" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Proceed to Payment"}
                </Button>
                <p className="text-center text-xs text-gray-500 font-medium tracking-wide">
                  Your booking will be confirmed after successful payment.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
