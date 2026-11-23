'use client';

import React from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
} from 'lucide-react';
import { COMPANY_INFO, CUSTOMER_REVIEWS } from '@/lib/limdent-data';

interface HeroProps {
  onOpenWhatsApp: () => void;
}

function HeroStar({
  fillType,
  gradientId,
}: {
  fillType: 'full' | 'half' | 'empty';
  gradientId: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5 shrink-0 block"
      aria-hidden="true"
    >
      {fillType === 'half' && (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#475569" />
          </linearGradient>
        </defs>
      )}
      <path
        fill={
          fillType === 'full'
            ? '#FBBF24'
            : fillType === 'half'
            ? `url(#${gradientId})`
            : '#475569'
        }
        stroke={fillType === 'empty' ? '#64748B' : '#F59E0B'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      />
    </svg>
  );
}

export default function Hero({ onOpenWhatsApp }: HeroProps) {
  return (
    <section
      id="home"
      className="relative w-full bg-[#0B1428] text-white border-b border-white/10 overflow-hidden"
    >
      {/* Full-Width Background Image of the Workshop with Semi-Transparent Dark Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <Image
          src={COMPANY_INFO.assets.companyBackground}
          alt="LimDent Auto Body Technologies workshop premises at 45 Emerald St, Futura, Polokwane"
          fill
          priority
          sizes="100vw"
          referrerPolicy="no-referrer"
          className="object-cover object-center"
        />
        {/* Semi-transparent dark overlay ensuring strong contrast and full workshop visibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(11, 20, 40, 0.78) 0%, rgba(11, 20, 40, 0.72) 45%, rgba(11, 20, 40, 0.90) 100%)',
          }}
        />
      </div>

      {/* Main Hero Container in normal document flow */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-14 sm:pt-20 sm:pb-18 lg:pt-24 lg:pb-20 flex flex-col gap-12">
        {/* Top Block: Headline, Value Proposition & Primary CTA Buttons */}
        <div className="max-w-3xl space-y-6">
          {/* Unboxed Accreditation & Location Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-slate-200 tracking-wide">
            <span className="text-white font-semibold">
              {COMPANY_INFO.accreditation} Repairer
            </span>
            <span aria-hidden="true" className="text-slate-400">
              ·
            </span>
            <span>45 Emerald St, Futura, Polokwane</span>
            <span aria-hidden="true" className="text-slate-400">
              ·
            </span>
            <span>Passenger &amp; Commercial Vehicles</span>
          </div>

          <h1
            className="font-bold tracking-tight text-white leading-[1.12]"
            style={{
              fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)',
              textWrap: 'balance',
            }}
          >
            Expert Vehicle Body Repairs. Quality You Can Trust.
          </h1>

          <p className="text-base sm:text-lg text-slate-100 leading-relaxed max-w-2xl">
            LimDent Auto Body Technologies is a fully equipped, SAMBRA-approved
            panel beating and spray painting workshop in Polokwane. From minor
            dents and precision colour matching to structural collision and
            commercial fleet repairs, we restore your vehicle cleanly and
            reliably.
          </p>

          {/* Primary & Secondary CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <a
              href="#quote"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#C92332] hover:bg-[#a81c29] active:bg-[#8f1722] text-white font-semibold text-sm sm:text-base shadow-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#services"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg border border-white/35 bg-[#0B1428]/60 hover:bg-[#0B1428]/80 backdrop-blur-xs text-white font-semibold text-sm sm:text-base transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore Our Services
            </a>

            <button
              type="button"
              onClick={onOpenWhatsApp}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg border border-white/25 bg-[#0B1428]/60 hover:bg-[#0B1428]/80 backdrop-blur-xs text-white font-semibold text-sm sm:text-base transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Quote</span>
            </button>
          </div>

          {/* Direct Workshop Contact & Hours Strip */}
          <div className="pt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-200">
            <a
              href={`tel:${COMPANY_INFO.phoneTel}`}
              className="inline-flex items-center gap-2 font-semibold text-white hover:text-slate-200 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#C92332] shrink-0" />
              <span className="tabular-nums">{COMPANY_INFO.phoneDisplay}</span>
            </a>

            <span className="inline-flex items-center gap-1.5 text-slate-200">
              <Clock className="w-4 h-4 text-slate-300 shrink-0" />
              <span className="tabular-nums">
                Mon–Thu 7:30 am – 4:45 pm · Fri 7:30 am – 4:15 pm
              </span>
            </span>

            <a
              href={COMPANY_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-white underline underline-offset-4 transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#C92332] shrink-0" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>

        {/* Bottom Block: Non-Overlapping Row of Rating Testimonials Beneath the Primary CTAs */}
        <div
          id="reviews"
          className="w-full pt-8 border-t border-white/20 space-y-4"
        >
          {/* Row Header: Overall Rating & What People Are Saying */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white">
              <span>What Customers Are Saying</span>
              <span aria-hidden="true" className="text-slate-400">
                ·
              </span>
              <span className="text-slate-300 font-normal">
                Verified Google Reviews
              </span>
            </div>

            <div className="inline-flex items-center gap-2.5">
              <div
                className="inline-flex items-center gap-1 shrink-0"
                aria-label={`Rated ${COMPANY_INFO.ratingSummary.score} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <HeroStar
                    key={i}
                    fillType={i < 4 ? 'full' : 'half'}
                    gradientId={`hero-summary-star-${i}`}
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-bold text-white tabular-nums whitespace-nowrap">
                {COMPANY_INFO.ratingSummary.score} / 5.0
              </span>
              <span aria-hidden="true" className="text-slate-400">
                ·
              </span>
              <span className="text-xs sm:text-sm text-slate-200 tabular-nums whitespace-nowrap">
                {COMPANY_INFO.ratingSummary.totalReviews} reviews
              </span>
            </div>
          </div>

          {/* 4-Column Non-Overlapping Testimonial Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
            {CUSTOMER_REVIEWS.map((review) => (
              <article
                key={review.id}
                className="relative isolate h-full w-full min-w-0 rounded-xl bg-[#0B1428]/85 backdrop-blur-sm border border-white/15 p-4 sm:p-5 flex flex-col justify-between gap-3.5 overflow-hidden"
              >
                <div className="space-y-2.5">
                  {/* Star Rating Row */}
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className="inline-flex items-center gap-1 shrink-0"
                      aria-label={`Rated ${review.rating} out of 5 stars`}
                    >
                      {Array.from({ length: 5 }).map((_, idx) => {
                        const isFull = idx + 1 <= Math.floor(review.rating);
                        const isHalf = !isFull && idx < review.rating;
                        const fillType = isFull
                          ? 'full'
                          : isHalf
                          ? 'half'
                          : 'empty';

                        return (
                          <HeroStar
                            key={idx}
                            fillType={fillType}
                            gradientId={`hero-rev-star-${review.id}-${idx}`}
                          />
                        );
                      })}
                    </div>

                    <span className="text-xs font-bold text-amber-400 tabular-nums whitespace-nowrap">
                      {review.rating.toFixed(1)}
                    </span>
                  </div>

                  {/* Customer Testimonial Text */}
                  <blockquote className="text-xs sm:text-sm text-slate-100 leading-relaxed break-words">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Reviewer Name Footer */}
                <footer className="pt-2.5 mt-auto border-t border-white/10 flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-bold text-white truncate">
                    {review.author}
                  </span>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
