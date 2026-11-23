'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MoveHorizontal, Check, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/limdent-data';

interface BeforeAfterSliderProps {
  onSelectService: (formValue: string) => void;
}

export default function BeforeAfterSlider({
  onSelectService,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  return (
    <section
      id="work"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E3E8EF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Workmanship Explanation & Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#C92332]">
                <span>Our Workmanship</span>
                <span aria-hidden="true" className="text-slate-400">
                  ·
                </span>
                <span className="text-[#475569] font-medium">
                  Real Workshop Project
                </span>
              </div>

              <h2
                className="mt-2.5 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#101C35] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                See the Difference Quality Repairs Make.
              </h2>

              <p className="mt-3.5 text-base text-[#475569] leading-relaxed">
                Slide across this recent LimDent restoration project completed
                in our Polokwane workshop—taking a heavily weathered, rusted
                trailer body back to bare metal and refinishing it in high-gloss
                white with new lighting and safety trim.
              </p>
            </div>

            {/* Interactive Segmented Preset Controls */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-[#475569]">
                Comparison View
              </p>
              <div className="inline-flex items-center gap-1 p-1 bg-[#F4F6F8] border border-[#E3E8EF] rounded-lg">
                <button
                  type="button"
                  onClick={() => setSliderPosition(92)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    sliderPosition >= 80
                      ? 'bg-[#101C35] text-white shadow-xs'
                      : 'text-[#475569] hover:text-[#101C35]'
                  }`}
                >
                  Show Before
                </button>
                <button
                  type="button"
                  onClick={() => setSliderPosition(50)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    sliderPosition > 20 && sliderPosition < 80
                      ? 'bg-[#101C35] text-white shadow-xs'
                      : 'text-[#475569] hover:text-[#101C35]'
                  }`}
                >
                  50 / 50 Split
                </button>
                <button
                  type="button"
                  onClick={() => setSliderPosition(8)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    sliderPosition <= 20
                      ? 'bg-[#C92332] text-white shadow-xs'
                      : 'text-[#475569] hover:text-[#101C35]'
                  }`}
                >
                  Show After
                </button>
              </div>
            </div>

            {/* Technical Steps Performed */}
            <ul className="space-y-3 pt-2 border-t border-[#E3E8EF]">
              <li className="flex items-start gap-2.5 text-sm text-[#101C35] font-medium">
                <Check className="w-4 h-4 text-[#C92332] shrink-0 mt-0.5" />
                <span>
                  Surface corrosion and peeling paint stripped, treated, and
                  primed
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-[#101C35] font-medium">
                <Check className="w-4 h-4 text-[#C92332] shrink-0 mt-0.5" />
                <span>
                  Panel straightening, seam sealing, and full high-gloss white
                  respray
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-[#101C35] font-medium">
                <Check className="w-4 h-4 text-[#C92332] shrink-0 mt-0.5" />
                <span>
                  New tail-lamp assembly fitment, number plate mount, and
                  reflective safety tape
                </span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                type="button"
                onClick={() =>
                  onSelectService('Commercial Vehicle Repairs')
                }
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#C92332] hover:text-[#101C35] transition-colors cursor-pointer"
              >
                <span>Request a Refurbishment or Paint Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Before / After Comparison Slider */}
          <div className="lg:col-span-7">
            <div className="relative rounded-xl overflow-hidden border border-[#E3E8EF] bg-[#0B1428] aspect-[4/3] select-none">
              {/* Base Layer: AFTER Restoration (1_66028261.jpg) */}
              <div className="absolute inset-0">
                <Image
                  src={COMPANY_INFO.assets.afterRepair}
                  alt="After LimDent restoration - freshly painted glossy white trailer in the Polokwane workshop"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  referrerPolicy="no-referrer"
                  className="object-cover object-center"
                />
              </div>

              {/* Clipped Overlay Layer: BEFORE Restoration (2_6e218484.jpg) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                }}
              >
                <Image
                  src={COMPANY_INFO.assets.beforeRepair}
                  alt="Before LimDent restoration - weathered and rusted trailer body prior to stripping and respray"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  referrerPolicy="no-referrer"
                  className="object-cover object-center"
                />
              </div>

              {/* Clean Corner Labels */}
              <div className="absolute top-3.5 left-3.5 z-10 bg-[#0B1428]/85 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1.5 rounded-md border border-white/15 pointer-events-none">
                Before Repair
              </div>
              <div className="absolute top-3.5 right-3.5 z-10 bg-[#C92332] text-white text-xs font-semibold px-3 py-1.5 rounded-md pointer-events-none">
                After Refinishing
              </div>

              {/* Vertical Divider Line */}
              <div
                aria-hidden="true"
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)] pointer-events-none z-20"
                style={{ left: `${sliderPosition}%` }}
              />

              {/* Center Drag Handle */}
              <div
                aria-hidden="true"
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#C92332] border-2 border-white text-white shadow-lg flex items-center justify-center pointer-events-none z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                <MoveHorizontal className="w-5 h-5" />
              </div>

              {/* Accessible Range Input Overlay */}
              <input
                type="range"
                min={0}
                max={100}
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                aria-label="Compare before and after vehicle restoration"
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0"
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-[#475569]">
              <span>Drag handle left or right to inspect</span>
              <span className="font-mono tabular-nums">
                Split: {sliderPosition}% / {100 - sliderPosition}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
