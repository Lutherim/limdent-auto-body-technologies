'use client';

import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { SERVICES_LIST, COMPANY_INFO } from '@/lib/limdent-data';
import ServiceCard from './ServiceCard';

interface ServicesSectionProps {
  onSelectService: (formValue: string) => void;
  onOpenWhatsApp: () => void;
}

export default function ServicesSection({
  onSelectService,
  onOpenWhatsApp,
}: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="py-16 sm:py-20 lg:py-24 bg-[#F4F6F8] border-b border-[#E3E8EF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#C92332]">
            <span>Core Capabilities</span>
            <span aria-hidden="true" className="text-slate-400">
              ·
            </span>
            <span className="text-[#475569] font-medium">
              Polokwane Auto Body Workshop
            </span>
          </div>

          <h2
            className="mt-2.5 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#101C35] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Complete Vehicle Body Repair &amp; Refinishing Services
          </h2>

          <p className="mt-3.5 text-base text-[#475569] leading-relaxed">
            We are a fully equipped panel beater for passenger vehicles,
            bakkies, and commercial fleets in Polokwane. Select any service
            below to pre-fill your quotation request.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelectService={onSelectService}
            />
          ))}

          {/* 6th Card: Direct Estimate & Assessment Card */}
          <div className="bg-[#101C35] text-white rounded-xl p-6 sm:p-7 flex flex-col justify-between border border-[#101C35]">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300 mb-5">
                <span className="font-mono font-semibold text-white">06</span>
                <span aria-hidden="true">·</span>
                <span>Direct Assessment</span>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">
                Need a Fast Repair Estimate?
              </h3>

              <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                Send us your vehicle details and a clear photograph of the dent,
                scratch, or collision damage. Our team at{' '}
                {COMPANY_INFO.address} provides competitive rates for both
                private repairs and insurance claims.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/15 space-y-2.5">
              <a
                href="#quote"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#C92332] hover:bg-[#a81c29] text-white font-semibold text-sm transition-colors"
              >
                <span>Open Online Quote Form</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenWhatsApp}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Chat via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
