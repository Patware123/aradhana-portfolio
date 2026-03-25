import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { BookingProvider } from "@/context/BookingContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aradhana Baghare - Counselling Psychologist",
  description: "A safe space to understand yourself and heal. Professional counseling and therapy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground selection:bg-primary-light selection:text-white`}
      >
        <BookingProvider>
          {children}
          <Toaster position="bottom-center" toastOptions={{ duration: 4000 }} />
        </BookingProvider>
      </body>
    </html>
  );
}
