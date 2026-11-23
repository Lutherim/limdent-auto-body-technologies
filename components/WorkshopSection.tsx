'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { COMPANY_INFO, OPERATING_HOURS } from '@/lib/limdent-data';

export default function WorkshopSection() {
  const [openStatus, setOpenStatus] = useState<{
    isOpen: boolean;
    label: string;
  } | null>(null);

  useEffect(() => {
    const checkSastHours = () => {
      const now = new Date();
      const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
      const sast = new Date(utcMs + 2 * 3600000); // South Africa Standard Time (UTC+2)
      const day = sast.getDay(); // 0=Sun, 1=Mon..5=Fri, 6=Sat
      const minutes = sast.getHours() * 60 + sast.getMinutes();

      const isMonThuOpen =
        day >= 1 && day <= 4 && minutes >= 450 && minutes < 1005; // 07:30 - 16:45
      const isFriOpen = day === 5 && minutes >= 450 && minutes < 975; // 07:30 - 16:15

      if (isMonThuOpen || isFriOpen) {
        setOpenStatus({
          isOpen: true,
          label: 'Open Now (Polokwane Time)',
        });
      } else {
        setOpenStatus({
          isOpen: false,
          label: 'Currently Closed',
        });
      }
    };

    checkSastHours();
  }, []);

  return (
    <section
      id="workshop"
      className="py-16 sm:py-24 bg-[#F4F6F8] border-b border-[#E3E8EF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#C92332]">
            <span>About Our Workshop</span>
            <span aria-hidden="true" className="text-slate-400">
              ·
            </span>
            <span className="text-[#475569] font-medium">
              45 Emerald St, Futura, Polokwane
            </span>
          </div>

          <h2
            className="mt-2.5 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#101C35] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            A Fully Equipped Panel Beating &amp; Spray Painting Facility in
            Polokwane
          </h2>

          <p className="mt-3.5 text-base text-[#475569] leading-relaxed">
            LimDent Auto Body Technologies (Lim Dent Panelbeaters) operates from
            our dedicated workshop in the Futura industrial area of Polokwane.
            As a SAMBRA-approved motor body repairer, we handle everything from
            everyday bumper scratches and bakkie dents to full commercial vehicle
            and accident restorations at competitive rates.
          </p>
        </div>

        {/* Main Image-First Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column (7 cols): Authentic Workshop Exterior Photograph & Facility Standards */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-[#E3E8EF] overflow-hidden flex flex-col justify-between">
            {/* Large Panoramic Company Premises Image */}
            <div className="relative w-full bg-[#0B1428] border-b border-[#E3E8EF]">
              <Image
                src={COMPANY_INFO.assets.companyBackground}
                alt="LimDent Auto Body Technologies workshop premises at 45 Emerald St, Futura, Polokwane"
                width={905}
                height={171}
                sizes="(max-width: 1024px) 100vw, 58vw"
                referrerPolicy="no-referrer"
                className="w-full h-48 sm:h-64 object-cover object-left"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0B1428]/80 via-transparent to-transparent"
              />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-white">
                <div>
                  <p className="text-xs font-medium text-slate-300">
                    Futura Industrial Area, Polokwane
                  </p>
                  <p className="text-sm sm:text-base font-bold">
                    {COMPANY_INFO.name} — {COMPANY_INFO.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Workshop Approach & Capabilities */}
            <div className="p-6 sm:p-7 space-y-5 flex-1 flex flex-col justify-between">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C92332] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-[#101C35]">
                      SAMBRA Approved Standards
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#475569] leading-relaxed">
                      Accredited panel beating and spray painting equipment for
                      reliable structural and cosmetic repairs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C92332] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-[#101C35]">
                      Clear Communication
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#475569] leading-relaxed">
                      Step-by-step updates from initial damage assessment and
                      quotation right through to vehicle handover.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E3E8EF] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#475569]">
                  <MapPin className="w-4 h-4 text-[#C92332] shrink-0" />
                  <span className="font-medium text-[#101C35]">
                    {COMPANY_INFO.address}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={COMPANY_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#E3E8EF] bg-[#F4F6F8] hover:border-[#101C35]/40 text-xs sm:text-sm font-semibold text-[#101C35] transition-colors"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href="#quote"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#101C35] hover:bg-[#0B1428] text-xs sm:text-sm font-semibold text-white transition-colors"
                  >
                    <span>Contact Workshop</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Operating Hours & Direct Workshop Details */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-[#E3E8EF] p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E3E8EF]">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#101C35] shrink-0" />
                  <h3 className="text-lg font-bold text-[#101C35]">
                    Workshop Hours
                  </h3>
                </div>
                {openStatus && (
                  <span
                    className={`text-xs font-semibold ${
                      openStatus.isOpen ? 'text-emerald-700' : 'text-[#C92332]'
                    }`}
                  >
                    {openStatus.label}
                  </span>
                )}
              </div>

              <dl className="mt-4 divide-y divide-[#E3E8EF]">
                {OPERATING_HOURS.map((row) => (
                  <div
                    key={row.days}
                    className="py-3 flex items-center justify-between gap-2 text-sm"
                  >
                    <dt className="font-medium text-[#475569]">{row.days}</dt>
                    <dd
                      className={`font-semibold tabular-nums whitespace-nowrap ${
                        row.isClosed ? 'text-[#C92332]' : 'text-[#101C35]'
                      }`}
                    >
                      {row.hours}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Direct Workshop Contact Details */}
            <div className="mt-6 pt-5 border-t border-[#E3E8EF] space-y-3.5">
              <p className="text-xs font-semibold text-[#475569]">
                Direct Workshop Contact
              </p>

              <a
                href={`tel:${COMPANY_INFO.phoneTel}`}
                className="flex items-center justify-between p-3 rounded-lg bg-[#F4F6F8] hover:bg-[#E3E8EF]/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#C92332] shrink-0" />
                  <div>
                    <p className="text-xs text-[#475569]">Workshop Telephone</p>
                    <p className="text-sm font-bold text-[#101C35] tabular-nums">
                      {COMPANY_INFO.phoneDisplay}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#101C35] whitespace-nowrap">
                  Call Now
                </span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center justify-between p-3 rounded-lg bg-[#F4F6F8] hover:bg-[#E3E8EF]/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#101C35] shrink-0" />
                  <div>
                    <p className="text-xs text-[#475569]">Email Quotations</p>
                    <p className="text-sm font-bold text-[#101C35]">
                      {COMPANY_INFO.email}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#101C35] whitespace-nowrap">
                  Send Email
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
