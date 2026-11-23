import React from 'react';
import { CustomerReview } from '@/lib/limdent-data';

interface ReviewCardProps {
  review: CustomerReview;
}

function StarIcon({
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
      className="w-4 h-4 shrink-0 block"
      aria-hidden="true"
    >
      {fillType === 'half' && (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#E2E8F0" />
          </linearGradient>
        </defs>
      )}
      <path
        fill={
          fillType === 'full'
            ? '#FBBF24'
            : fillType === 'half'
            ? `url(#${gradientId})`
            : '#E2E8F0'
        }
        stroke={fillType === 'empty' ? '#CBD5E1' : '#F59E0B'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      />
    </svg>
  );
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="relative isolate h-full w-full min-w-0 bg-white rounded-xl border border-[#E3E8EF] p-6 sm:p-7 flex flex-col justify-between gap-5 overflow-hidden">
      <div className="space-y-4">
        {/* Top Row: Clean, Non-Overlapping Star Rating & Numeric Score */}
        <div
          className="flex items-center gap-2.5"
          aria-label={`Rated ${review.rating} out of 5 stars`}
        >
          <div className="inline-flex items-center gap-1 shrink-0">
            {Array.from({ length: 5 }).map((_, idx) => {
              const isFull = idx + 1 <= Math.floor(review.rating);
              const isHalf = !isFull && idx < review.rating;
              const fillType = isFull ? 'full' : isHalf ? 'half' : 'empty';

              return (
                <StarIcon
                  key={idx}
                  fillType={fillType}
                  gradientId={`star-grad-${review.id}-${idx}`}
                />
              );
            })}
          </div>

          <span className="text-xs font-bold text-[#101C35] tabular-nums whitespace-nowrap">
            {review.rating.toFixed(1)} / 5.0
          </span>
        </div>

        {/* Middle Row: What the Customer Said */}
        <blockquote className="text-sm sm:text-base text-[#101C35]/90 leading-relaxed break-words">
          &ldquo;{review.quote}&rdquo;
        </blockquote>
      </div>

      {/* Bottom Row: Reviewer Name on its own dedicated line */}
      <footer className="pt-4 mt-auto border-t border-[#E3E8EF] flex items-center justify-between gap-2">
        <span className="text-sm font-bold text-[#101C35] truncate">
          {review.author}
        </span>
        <span className="text-xs text-[#475569] whitespace-nowrap shrink-0">
          Verified Review
        </span>
      </footer>
    </article>
  );
}
