'use client';

import React from 'react';
import {
  Wrench,
  Paintbrush,
  Car,
  Truck,
  ShieldCheck,
  ArrowRight,
  Check,
} from 'lucide-react';
import { ServiceItem } from '@/lib/limdent-data';

interface ServiceCardProps {
  service: ServiceItem;
  onSelectService: (formValue: string) => void;
}

const ICON_MAP = {
  Wrench: Wrench,
  Paintbrush: Paintbrush,
  Car: Car,
  Truck: Truck,
  ShieldCheck: ShieldCheck,
};

export default function ServiceCard({
  service,
  onSelectService,
}: ServiceCardProps) {
  const IconComponent = ICON_MAP[service.iconName];

  return (
    <article className="group bg-white rounded-xl border border-[#E3E8EF] hover:border-[#101C35]/30 p-6 sm:p-7 flex flex-col justify-between transition-transform duration-150 hover:-translate-y-1">
      <div>
        {/* Top Row: Clean Icon Well + Editorial Number & Category */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="w-12 h-12 rounded-lg bg-[#F4F6F8] group-hover:bg-[#101C35] text-[#101C35] group-hover:text-white flex items-center justify-center transition-colors duration-150">
            <IconComponent className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#475569]">
            <span className="font-mono font-semibold text-[#101C35] tabular-nums">
              {service.number}
            </span>
            <span aria-hidden="true">·</span>
            <span>{service.category}</span>
          </div>
        </div>

        {/* Service Title */}
        <h3 className="text-xl font-bold text-[#101C35] tracking-tight">
          {service.title}
        </h3>

        {/* Description */}
        <p className="mt-2.5 text-sm text-[#475569] leading-relaxed">
          {service.description}
        </p>

        {/* Key Scope List */}
        <ul className="mt-5 pt-4 border-t border-[#E3E8EF]/80 space-y-2">
          {service.highlights.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-xs sm:text-sm text-[#101C35]/90 font-medium"
            >
              <Check className="w-4 h-4 text-[#C92332] shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Interactive CTA */}
      <div className="mt-6 pt-4 border-t border-[#E3E8EF]">
        <button
          type="button"
          onClick={() => onSelectService(service.formValue)}
          className="w-full inline-flex items-center justify-between text-sm font-semibold text-[#101C35] group-hover:text-[#C92332] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#101C35] rounded"
        >
          <span>Request Quote for {service.title}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
        </button>
      </div>
    </article>
  );
}
