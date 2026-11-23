'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import {
  COMPANY_INFO,
  SERVICES_LIST,
  OPERATING_HOURS,
} from '@/lib/limdent-data';

interface FooterProps {
  onSelectService: (formValue: string) => void;
}

export default function Footer({ onSelectService }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1428] text-slate-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1 (4 cols): Brand & Description */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-block bg-white rounded-lg px-3.5 py-2">
              <div className="relative h-10 w-44">
                <Image
                  src={COMPANY_INFO.assets.logo}
                  alt="LimDent Auto Body Technologies Logo"
                  fill
                  sizes="176px"
                  referrerPolicy="no-referrer"
                  className="object-contain object-left"
                />
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              SAMBRA-approved panel beating, spray painting, auto body repairs,
              and commercial vehicle refurbishment in Polokwane.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-slate-400">
              <span>{COMPANY_INFO.accreditation}</span>
              <span aria-hidden="true">·</span>
              <span>Futura, Polokwane</span>
            </div>
          </div>

          {/* Column 2 (2 cols): Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#home"
                  className="hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#work"
                  className="hover:text-white transition-colors"
                >
                  Our Work
                </a>
              </li>
              <li>
                <a
                  href="#workshop"
                  className="hover:text-white transition-colors"
                >
                  Workshop
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  className="hover:text-white transition-colors"
                >
                  Customer Reviews
                </a>
              </li>
              <li>
                <a
                  href="#quote"
                  className="hover:text-white transition-colors"
                >
                  Request a Quote
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 (3 cols): Services */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Our Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICES_LIST.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onSelectService(service.formValue)}
                    className="text-left hover:text-white transition-colors cursor-pointer"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 (3 cols): Contact & Business Hours */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Workshop &amp; Contact
            </h3>

            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C92332] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY_INFO.phoneTel}`}
                  className="flex items-center gap-2.5 hover:text-white transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#C92332] shrink-0" />
                  <span>{COMPANY_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#C92332] shrink-0" />
                  <span>{COMPANY_INFO.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                    'Hi LimDent Auto Body Technologies, I would like to request a quote for my vehicle.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>WhatsApp Quote Line</span>
                </a>
              </li>
            </ul>

            <div className="pt-2 border-t border-white/10 space-y-1 text-xs text-slate-400">
              {OPERATING_HOURS.map((row) => (
                <div
                  key={row.days}
                  className="flex items-center justify-between gap-2"
                >
                  <span>{row.days}</span>
                  <span className="text-slate-300 tabular-nums">
                    {row.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <p>{COMPANY_INFO.address}</p>
        </div>
      </div>
    </footer>
  );
}
