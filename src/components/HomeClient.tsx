'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import BookingForm from '@/components/BookingForm';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

function Section({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function HomeClient() {
  return (
    <main className="min-h-screen bg-background relative">
      <Section>
        <Hero />
      </Section>
      <Section>
        <About />
      </Section>
      <Section>
        <Services />
      </Section>
      <BookingForm />
      <Section>
        <Contact />
      </Section>
      <Footer />
    </main>
  );
}
