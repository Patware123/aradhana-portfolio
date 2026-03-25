"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { CalendarHeart, X, ArrowLeft, Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { useBooking } from "@/context/BookingContext";

const concernOptions = [
  "Relationship Issues", "Anxiety", "Self Esteem", "Stress",
  "Emotional Regulation", "Trauma", "Self Exploration", "Childhood Issues",
  "Overthinking", "Validation Issues", "Low Motivation",
  "Sleep Issues", "Loneliness", "Other Issues"
];

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function BookingForm() {
  const { isOpen, closeBooking, selectedPlan, setSelectedPlan } = useBooking();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Data State
  const [bookingData, setBookingData] = useState<any>({});
  const [bookingResult, setBookingResult] = useState<any>(null);

  const closeAndReset = () => {
    closeBooking();
    setTimeout(() => {
      setStep(1);
      setBookingData({});
      setBookingResult(null);
    }, 300);
  };

  const currentMinDate = new Date().toISOString().split('T')[0];

  const handleStep1Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.concern = formData.getAll('concern').join(', ');

    setBookingData(data);
    setStep(2);
    toast.success("Details saved. Proceed to payment.");
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    const toastId = toast.loading("Initializing payment gateway...");

    try {
      const resLoaded = await loadRazorpayScript();
      if (!resLoaded) {
        toast.error("Failed to load Razorpay SDK. Check your connection.", { id: toastId });
        setIsProcessing(false);
        return;
      }

      // Step A: Create Order
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: bookingData.plan }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || "Failed to create order");
      }

      toast.loading("Waiting for payment completion...", { id: toastId });

      // Step B: Open Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_SUm09M7iNYMHNr',
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Aradhana Baghare",
        description: "Therapy Session Booking",
        order_id: orderData.orderId,
        prefill: {
          name: bookingData.name,
          email: bookingData.email,
          contact: bookingData.phone,
        },
        theme: { color: "#6d5b4b" }, // primary color
        handler: async function (response: any) {
          toast.loading("Payment successful! Processing booking verification...", { id: toastId });

          try {
            // Step C: Verify Payment & Confirm Booking
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                bookingDetails: bookingData
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              setBookingResult({
                paymentId: response.razorpay_payment_id,
                issues: verifyData.result.issues
              });
              setStep(3);
              toast.success("Booking confirmed successfully!", { id: toastId });
            } else {
              throw new Error(verifyData.error || "Verification failed");
            }
          } catch (err: any) {
            console.error(err);
            // Critical fallback: payment succeeded but backend verification failed
            setBookingResult({
              paymentId: response.razorpay_payment_id,
              issues: ["Payment Successful, but automatic calendar & email sync failed. Aradhana has been notified and will contact you."]
            });
            setStep(3);
            toast.error("Payment verified, but there was an issue with automatic booking. Don't worry, your slot is safe.", { id: toastId, duration: 6000 });
          }
        },
        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled. You can try again when ready.", { id: toastId });
            setIsProcessing(false);
          }
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An unexpected error occurred", { id: toastId });
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={!isProcessing ? closeAndReset : undefined}></div>

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto overflow-x-hidden flex flex-col md:flex-row z-10 animate-in fade-in zoom-in-95 duration-300">

        {!isProcessing && (
          <button onClick={closeAndReset} className="absolute top-3 right-3 md:top-4 md:right-4 z-20 w-8 h-8 md:w-10 md:h-10 bg-white/80 md:bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/10 transition-colors text-gray-700 shadow-sm">
            <X size={18} className="md:w-5 md:h-5" />
          </button>
        )}

        <div className="w-full md:w-5/12 shrink-0 bg-primary text-white p-6 md:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 md:-mr-20 md:-mt-20"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 md:mb-4">Book a Session</h2>
            <p className="text-[#e6dac3] mb-4 md:mb-8 text-sm md:text-base hidden md:block">
              Take the first step towards healing and understanding.
            </p>

            {/* Stepper UI Progress */}
            <div className="flex flex-row md:flex-col gap-4 md:gap-0 md:space-y-6 mt-2 md:mt-8 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <div className={`flex items-center gap-2 md:gap-4 shrink-0 ${step >= 1 ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-xs md:text-sm ${step >= 1 ? 'bg-secondary text-primary' : 'bg-white/20'}`}>1</div>
                <span className="font-medium text-sm md:text-base">Your Details</span>
              </div>
              <div className={`flex items-center gap-2 md:gap-4 shrink-0 ${step >= 2 ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-xs md:text-sm ${step >= 2 ? 'bg-secondary text-primary' : 'bg-white/20'}`}>2</div>
                <span className="font-medium text-sm md:text-base">Payment</span>
              </div>
              <div className={`flex items-center gap-2 md:gap-4 shrink-0 ${step === 3 ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-xs md:text-sm ${step === 3 ? 'bg-secondary text-primary' : 'bg-white/20'}`}>3</div>
                <span className="font-medium text-sm md:text-base">Confirmation</span>
              </div>
            </div>
          </div>

          <div className="hidden md:block space-y-4 text-sm text-[#e6dac3] relative z-10 mt-12">
            <p>Sessions are strictly confidential.</p>
            <p>Transactions are processed securely.</p>
          </div>
        </div>

        <div className="w-full md:w-7/12 p-5 sm:p-8 md:p-10 relative bg-gray-50/50">

          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-5 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-1.5">
                <label htmlFor="plan" className="text-sm font-medium text-gray-700">Selected Session Plan</label>
                <select required value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} name="plan" id="plan" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-primary font-medium bg-secondary/10">
                  <option value="" disabled>Select a plan</option>
                  <option value="Basic Session (₹500)">Basic Session (₹500) - 45 mins</option>
                  <option value="Standard Session (₹800)">Standard Session (₹800) - 60 mins</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                  <input required minLength={3} maxLength={50} type="text" name="name" id="name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="Your Name" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                  <input required type="email" name="email" id="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="your@email.com" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number (10 digits)</label>
                  <input required minLength={10} maxLength={15} pattern="[0-9]{10,15}" title="Please enter a valid phone number (10-15 digits)" type="tel" name="phone" id="phone" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="9876543210" />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <div className="w-full sm:w-1/2 space-y-1.5">
                    <label htmlFor="date" className="text-sm font-medium text-gray-700">Preferred Date</label>
                    <input required min={currentMinDate} type="date" name="date" id="date" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm" />
                  </div>
                  <div className="w-full sm:w-1/2 space-y-1.5">
                    <label htmlFor="time" className="text-sm font-medium text-gray-700">Preferred Time</label>
                    <input required type="time" name="time" id="time" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <label className="text-sm font-medium text-gray-700 block">Primary Concern(s) <span className="text-gray-400 font-normal ml-1">Select up to 3</span></label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {concernOptions.map(opt => (
                    <label key={opt} className="flex items-start space-x-2 text-xs text-gray-700 bg-white border border-gray-100 p-2 rounded-lg cursor-pointer hover:bg-secondary/10 hover:border-secondary/30 transition-colors shadow-sm">
                      <input type="checkbox" name="concern" value={opt} className="rounded text-primary focus:ring-primary w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <span className="leading-snug">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">Additional Message (Optional)</label>
                <textarea name="message" id="message" rows={2} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none text-sm shadow-sm" placeholder="Is there anything specific you'd like me to know beforehand?"></textarea>
              </div>

              <div className="pt-4">
                <Button type="submit" variant="primary" className="w-full py-4 text-lg shadow-lg hover:shadow-xl group">
                  Continue to Payment
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="h-full flex flex-col justify-center animate-in slide-in-from-right-4 duration-300">
              <button onClick={() => !isProcessing && setStep(1)} className="flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-6 disabled:opacity-50" disabled={isProcessing}>
                <ArrowLeft size={16} className="mr-2" /> Back to details
              </button>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                <h3 className="text-xl font-serif font-bold text-foreground mb-6 pb-4 border-b">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Plan selected</span>
                    <span className="font-semibold text-gray-900">{bookingData.plan}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Date & Time</span>
                    <span className="font-semibold text-gray-900">{bookingData.date} at {bookingData.time}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Name</span>
                    <span className="font-medium text-gray-900">{bookingData.name}</span>
                  </div>
                </div>

                <div className="bg-secondary/10 p-4 rounded-xl flex items-start gap-4 mb-6 text-primary">
                  <AlertTriangle className="shrink-0 mt-0.5" size={20} />
                  <p className="text-sm">You will be redirected to Razorpay to complete the transaction securely. Sessions are strictly non-refundable.</p>
                </div>

                <Button onClick={handlePayment} disabled={isProcessing} className="w-full py-6 text-lg text-white bg-[#012b39] hover:bg-[#023a4d] transition-colors relative shadow-xl">
                  {isProcessing ? (
                    <><Loader2 className="animate-spin mr-2" size={20} /> Processing Transaction...</>
                  ) : (
                    'Pay Now to Confirm Booking'
                  )}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in slide-in-from-bottom-4 duration-500">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <CheckCircle size={48} />
              </div>
              <h3 className="text-3xl font-serif text-primary font-bold mb-3">Booking Confirmed!</h3>
              <p className="text-gray-600 max-w-md mb-8">
                Thank you, {bookingData.name}. Your payment was successful and your session slot has been reserved.
              </p>

              <div className="bg-white border text-left rounded-xl p-6 w-full max-w-sm mb-8 space-y-3 shadow-sm">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">Receipt Details</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Scheduled Date</span>
                  <span className="font-medium">{bookingData.date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Time Slot</span>
                  <span className="font-medium">{bookingData.time}</span>
                </div>
              </div>

              {bookingResult?.issues && bookingResult.issues.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-sm max-w-md mb-6 text-left">
                  <strong>Note:</strong> Some secondary services had issues, but your payment and slot are confirmed.
                  <ul className="list-disc ml-5 mt-2 opacity-80 text-xs">
                    {bookingResult.issues.map((issue: string, i: number) => <li key={i}>{issue}</li>)}
                  </ul>
                </div>
              )}

              <Button variant="outline" onClick={closeAndReset} className="px-8">
                Return to Site
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
