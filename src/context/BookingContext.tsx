'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type BookingContextType = {
  isOpen: boolean;
  selectedPlan: string;
  openBooking: (plan: string) => void;
  closeBooking: () => void;
  setSelectedPlan: (plan: string) => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const openBooking = (plan: string) => {
    setSelectedPlan(plan);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeBooking = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <BookingContext.Provider
      value={{ isOpen, selectedPlan, openBooking, closeBooking, setSelectedPlan }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
