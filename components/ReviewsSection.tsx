import React from 'react';
import { CUSTOMER_REVIEWS, COMPANY_INFO } from '@/lib/limdent-data';
import ReviewCard from './ReviewCard';

function SummaryStar({
  fillType,
  id,
}: {
  fillType: 'full' | 'half';
  id: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-4 h-4 shrink-0 block"
      aria-hidden="true"
    >
      {fillType === 'half' && (
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#E2E8F0" />
          </linearGradient>
        </defs>
      )}
      <path
        fill={fillType === 'full' ? '#FBBF24' : `url(#${id})`}
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      />
    </svg>
  );
}

export default function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E3E8EF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Header with Integrated, Non-Overlapping Overall Rating Summary */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-[#C92332]">
              Customer Feedback
            </p>
            <h2
              className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#101C35] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Trusted for Quality Workmanship.
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#475569] leading-relaxed">
              What vehicle owners in Polokwane say about their panel beating and
              spray painting experience with LimDent.
            </p>
          </div>

          {/* Self-Contained Overall Rating Block */}
          <div className="self-start lg:self-end shrink-0 bg-[#F4F6F8] border border-[#E3E8EF] rounded-xl px-4 py-3 flex flex-wrap items-center gap-3">
            <div
              className="inline-flex items-center gap-1 shrink-0"
              aria-label={`Rated ${COMPANY_INFO.ratingSummary.score} out of 5 stars`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <SummaryStar
                  key={i}
                  fillType={i < 4 ? 'full' : 'half'}
                  id={`summary-star-${i}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#475569] whitespace-nowrap">
              <span className="font-bold text-[#101C35] tabular-nums">
                {COMPANY_INFO.ratingSummary.score} / 5.0
              </span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">
                {COMPANY_INFO.ratingSummary.totalReviews} Google reviews
              </span>
            </div>
          </div>
        </div>

        {/* Clean 2x2 Grid showing what people are saying and their ratings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {CUSTOMER_REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
