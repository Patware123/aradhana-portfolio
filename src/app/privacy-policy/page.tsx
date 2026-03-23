import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Aradhana Baghare",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-secondary/30 py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary-light font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          <h1 className="text-4xl font-serif font-bold text-foreground">Privacy Policy</h1>
          <p className="text-gray-600 mt-2">Last Updated: March 2026</p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl py-12">
        <div className="prose prose-lg text-gray-700 max-w-none">
          <p>
            At Aradhana Baghare Counselling & Therapy ("we," "our," or "us"), we are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us at baghare123@gmail.com.
          </p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our services, or when you contact us. The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use.
          </p>
          <p>The personal information we collect may include the following:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Name:</strong> To identify you and address you appropriately during communication.</li>
            <li><strong>Email Address and Phone Number:</strong> To contact you regarding your session bookings, send confirmation emails, provide updates, and respond to your inquiries.</li>
            <li><strong>Reason for Booking / Primary Concern:</strong> To better prepare for your consultation. This information is treated with strict confidentiality.</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </p>
          <p>We use the information we collect or receive:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>To facilitate session bookings and payment processing.</strong></li>
            <li><strong>To respond to user inquiries and offer support to users.</strong></li>
            <li><strong>To send administrative information to you.</strong> We may use your personal information to send you booking confirmations, session reminders, service updates, and changes to our terms, conditions, and policies.</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">3. Will Your Information Be Shared With Anyone?</h2>
          <p>
            We do not share, sell, rent, or trade your personal information with third parties for their promotional purposes. Your information is <strong>strictly confidential</strong>.
          </p>
          <p>
            We may only process or share your data that we hold based on the following legal basis:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information for a specific purpose.</li>
            <li><strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
            <li><strong>Performance of a Contract:</strong> Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
            <li><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">4. Payment Processing</h2>
          <p>
            We use Razorpay as a secure third-party payment gateway to process all session payments. We do not store or retain your financial information, such as credit card numbers, on our servers. All such data is handled directly by Razorpay in compliance with industry-standard security regulations.
          </p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">5. Contact Us</h2>
          <p>
            If you have questions or comments about this notice, you may email us at <strong>baghare123@gmail.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
