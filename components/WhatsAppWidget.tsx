'use client';

import React from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/limdent-data';

interface WhatsAppWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function WhatsAppWidget({
  isOpen,
  onToggle,
  onClose,
}: WhatsAppWidgetProps) {
  const defaultWhatsAppUrl = `https://wa.me/${
    COMPANY_INFO.whatsappNumber
  }?text=${encodeURIComponent(
    'Hi LimDent Auto Body Technologies, I would like to request a quote for my vehicle.'
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div
          role="dialog"
          aria-label="LimDent WhatsApp Quick Chat"
          className="w-72 sm:w-80 bg-white rounded-xl shadow-xl border border-[#E3E8EF] overflow-hidden"
        >
          <div className="bg-[#101C35] text-white px-4 py-3.5 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold">{COMPANY_INFO.name}</p>
              <p className="text-xs text-slate-300">
                Panel Beating &amp; Paint Quotations
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close WhatsApp dialog"
              className="p-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3 text-xs sm:text-sm text-[#475569]">
            <p className="bg-[#F4F6F8] p-3 rounded-lg border border-[#E3E8EF] leading-relaxed text-[#101C35]">
              Need a quick estimate for dents, spray painting, or accident
              repairs in Polokwane? Send us a WhatsApp message or call{' '}
              <strong className="tabular-nums">
                {COMPANY_INFO.phoneDisplay}
              </strong>
              .
            </p>

            <a
              href={defaultWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Open WhatsApp Chat</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="#quote"
                onClick={onClose}
                className="inline-flex items-center justify-center border border-[#E3E8EF] hover:border-[#101C35]/40 text-[#101C35] font-semibold py-2 px-3 rounded-lg text-xs transition-colors"
              >
                Online Quote Form
              </a>
              <a
                href={`tel:${COMPANY_INFO.phoneTel}`}
                className="inline-flex items-center justify-center gap-1 border border-[#E3E8EF] hover:border-[#101C35]/40 text-[#101C35] font-semibold py-2 px-3 rounded-lg text-xs transition-colors tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 text-[#C92332]" />
                <span>{COMPANY_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? 'Close WhatsApp quick chat' : 'Open WhatsApp quick chat'}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-lg flex items-center justify-center transition-transform duration-150 hover:scale-105 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#101C35]"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
