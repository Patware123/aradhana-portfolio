import { Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12 border-b border-primary-light pb-12">

          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-2xl font-serif">Aradhana Baghare</h3>
            <p className="text-[#d8c8af] opacity-90 text-sm">
              Counselling Psychologist & Expressive Arts Facilitator. Providing a safe, integrative approach to mental wellness.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold tracking-wider text-secondary">Quick Links</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <a href="/#about" className="text-gray-300 hover:text-white transition-colors">About Me</a>
              <a href="/#services" className="text-gray-300 hover:text-white transition-colors">Therapy Services</a>
              <a href="/#booking" className="text-gray-300 hover:text-white transition-colors">Book a Session</a>
              <a href="/#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </nav>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold tracking-wider text-secondary">Legal</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link>
              <Link href="/refund-policy" className="text-gray-300 hover:text-white transition-colors">Refund & Cancellation</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold tracking-wider text-secondary">Contact</h4>
            <div className="space-y-3 text-sm">
              <a href="mailto:baghare123@gmail.com" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors break-all">
                <Mail size={16} className="shrink-0" />
                <span>baghare123@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone size={16} className="shrink-0" />
                <span>Madhya Pradesh, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {currentYear} Aradhana Baghare. All rights reserved.</p>
          <p>Therapy & Counselling Portfolio</p>
        </div>
      </div>
    </footer>
  );
}

