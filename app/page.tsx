'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import WorkshopSection from '@/components/WorkshopSection';
import QuoteSection from '@/components/QuoteSection';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';

export default function HomePage() {
  const [selectedService, setSelectedService] = useState<string>('Panel Beating');
  const [whatsAppOpen, setWhatsAppOpen] = useState<boolean>(false);

  const handleSelectService = (formValue: string) => {
    setSelectedService(formValue);
    const quoteEl = document.getElementById('quote');
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#475569]">
      <Navbar />

      <main className="flex-1">
        <Hero onOpenWhatsApp={() => setWhatsAppOpen(true)} />

        <ServicesSection
          onSelectService={handleSelectService}
          onOpenWhatsApp={() => setWhatsAppOpen(true)}
        />

        <BeforeAfterSlider onSelectService={handleSelectService} />

        <WorkshopSection />

        <QuoteSection
          selectedService={selectedService}
          onServiceChange={setSelectedService}
        />
      </main>

      <Footer onSelectService={handleSelectService} />

      <WhatsAppWidget
        isOpen={whatsAppOpen}
        onToggle={() => setWhatsAppOpen((prev) => !prev)}
        onClose={() => setWhatsAppOpen(false)}
      />
    </div>
  );
}
