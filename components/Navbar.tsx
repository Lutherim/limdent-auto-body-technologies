'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Menu, X, Phone } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/limdent-data';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#work' },
  { label: 'Workshop', href: '#workshop' },
  { label: 'Contact', href: '#quote' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E3E8EF]">
      {/* Subtle 3px dual-tone brand top bar inspired by the LimDent logo */}
      <div
        className="h-1 w-full"
        style={{
          background:
            'linear-gradient(90deg, #C92332 0%, #C92332 35%, #101C35 35%, #101C35 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16 sm:h-20">
          {/* Zone 1: Brand Logo */}
          <a
            href="#home"
            aria-label="LimDent Auto Body Technologies Home"
            className="flex items-center whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#101C35] rounded-md"
          >
            <div className="relative h-11 sm:h-12 w-44 sm:w-52">
              <Image
                src={COMPANY_INFO.assets.logo}
                alt="LimDent Auto Body Technologies"
                fill
                priority
                sizes="(max-width: 640px) 176px, 208px"
                referrerPolicy="no-referrer"
                className="object-contain object-left"
              />
            </div>
          </a>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#475569]"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-1 text-[#101C35]/85 hover:text-[#C92332] transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action on desktop, hamburger on mobile */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#quote"
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#C92332] hover:bg-[#a81c29] active:bg-[#8f1722] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C92332]"
            >
              Request a Quote
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#101C35] hover:bg-[#F4F6F8] transition-colors focus-visible:outline-2 focus-visible:outline-[#101C35]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="md:hidden bg-white border-t border-[#E3E8EF] px-4 pt-3 pb-6 shadow-lg"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-3 rounded-lg text-base font-semibold text-[#101C35] hover:bg-[#F4F6F8] hover:text-[#C92332] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-[#E3E8EF] flex flex-col gap-2.5">
            <a
              href="#quote"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center py-3 px-4 rounded-lg bg-[#C92332] hover:bg-[#a81c29] text-white font-semibold text-sm transition-colors"
            >
              Request a Quote
            </a>
            <a
              href={`tel:${COMPANY_INFO.phoneTel}`}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-[#E3E8EF] bg-[#F4F6F8] text-[#101C35] font-semibold text-sm hover:border-[#101C35]/30 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#C92332]" />
              Call {COMPANY_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
