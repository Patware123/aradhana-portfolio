import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Aradhana Baghare",
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-secondary/30 py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary-light font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          <h1 className="text-4xl font-serif font-bold text-foreground">Terms & Conditions</h1>
          <p className="text-gray-600 mt-2">Last Updated: March 2026</p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl py-12">
        <div className="prose prose-lg text-gray-700 max-w-none">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4">1. Agreement to Terms</h2>
          <p>
            These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Aradhana Baghare ("we," "us" or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto. By accessing the site and booking our services, you agree that you have read, understood, and agreed to be bound by all of these Terms and Conditions.
          </p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">2. Services and Booking</h2>
          <p>
            We offer online counselling and therapy services. When booking a session through our website:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must provide accurate, current, and complete information during the booking process.</li>
            <li>Your booking is strictly subject to availability.</li>
            <li><strong>A booking is only confirmed after successful payment</strong> has been processed through our secure payment gateway.</li>
            <li>You will receive a confirmation email with session details once payment is verified.</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">3. Payment Terms</h2>
          <p>
            We accept payments through Razorpay integration. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the site. By submitting payment information, you grant us the right to provide such information to third parties (Razorpay) for purposes of facilitating the completion of the transaction.
          </p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">4. Rescheduling and Therapist Rights</h2>
          <p>
            While we strive to adhere strictly to all booked times:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The therapist reserves the right to reschedule a session in case of an unavoidable emergency or technical failure on our end. In such cases, you will be notified at the earliest possible time, and a mutually agreeable alternative slot will be provided.</li>
            <li>Clients may request to reschedule according to our Refund & Cancellation Policy.</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">5. Code of Conduct</h2>
          <p>
            Therapy is a safe space. Any form of abuse, harassment, or inappropriate behaviour towards the therapist will result in immediate termination of the session without a refund, and future services will be denied.
          </p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">6. Contact Information</h2>
          <p>
            For any questions or concerns regarding these terms, please contact us at:
            <br />
            Email: <strong>baghare123@gmail.com</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
