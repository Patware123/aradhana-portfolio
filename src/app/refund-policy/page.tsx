import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Refund & Cancellation Policy | Aradhana Baghare",
};

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-secondary/30 py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary-light font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          <h1 className="text-4xl font-serif font-bold text-foreground">Refund & Cancellation Policy</h1>
          <p className="text-gray-600 mt-2">Last Updated: March 2026</p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl py-12">
        <div className="prose prose-lg text-gray-700 max-w-none">
          <p>
            Thank you for choosing Aradhana Baghare Counselling & Therapy. We value your commitment to your mental health journey. Please read our refund and cancellation policy carefully before booking a session.
          </p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">1. Cancellations & No-Shows</h2>
          <p>
            Once a session is booked and payment is made, the slot is reserved exclusively for you. Therefore:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Sessions are non-refundable.</strong> We do not offer refunds for cancelled sessions.</li>
            <li>If you fail to join the online consultation at the scheduled time ("no-show"), the session will be considered completed, and no refund or rescheduling will be offered.</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">2. Rescheduling</h2>
          <p>
            We understand that emergencies and unforeseen circumstances can arise. We offer the flexibility to reschedule your session under the following conditions:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Prior Notice Required:</strong> You must request a reschedule at least <strong>24 hours</strong> prior to your scheduled session time.</li>
            <li>Requests made within 24 hours of the session time cannot be accommodated, and the session will be treated as a cancellation (non-refundable).</li>
            <li>A maximum of one (1) reschedule is permitted per booked session.</li>
            <li>To request a reschedule, please email us directly at <strong>baghare123@gmail.com</strong> with your booking details.</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">3. Therapist Cancellations</h2>
          <p>
            In the rare event that the therapist needs to cancel or reschedule a session due to an emergency, illness, or technical failure on our end:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You will be notified immediately via the contact information provided during booking.</li>
            <li>You will be offered the choice to either reschedule to the next available and mutually convenient slot, or receive a full 100% refund for that specific session.</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">4. Process for Approved Refunds</h2>
          <p>
            If a refund is approved (e.g., in the case of a therapist cancellation without reschedule), the refund will be processed back to the original method of payment via Razorpay. Please allow 5-7 business days for the funds to reflect in your account, depending on your bank's processing times.
          </p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions concerning our refund policy, please contact us at:
            <br />
            Email: <strong>baghare123@gmail.com</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
