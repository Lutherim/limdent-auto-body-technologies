'use client';

import React, { useState, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RotateCcw,
} from 'lucide-react';
import { COMPANY_INFO } from '@/lib/limdent-data';

interface QuoteSectionProps {
  selectedService: string;
  onServiceChange: (service: string) => void;
}

interface QuoteResult {
  referenceId: string;
  formattedMessage: string;
  whatsappUrl: string;
  emailUrl: string;
}

const SERVICE_OPTIONS = [
  { value: 'Panel Beating', label: 'Panel Beating' },
  { value: 'Spray Painting', label: 'Spray Painting & Colour Matching' },
  { value: 'Auto Body Repairs', label: 'Auto Body & Accident Repairs' },
  {
    value: 'Commercial Vehicle Repairs',
    label: 'Commercial Vehicle / Trailer Repairs',
  },
  {
    value: 'Insurance / SAMBRA Claim Repair',
    label: 'Insurance / SAMBRA Claim Repair',
  },
];

export default function QuoteSection({
  selectedService,
  onServiceChange,
}: QuoteSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [claimType, setClaimType] = useState<'Private / Cash' | 'Insurance Claim'>(
    'Private / Cash'
  );
  const [notes, setNotes] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === 'string') {
        setPhotoPreview(ev.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClearPhoto = () => {
    setPhotoPreview(null);
    setPhotoName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    if (!name.trim()) {
      return 'Please enter your full name.';
    }
    const cleanPhone = phone.replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      return 'Please enter a valid South African phone or WhatsApp number.';
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return 'Please enter a valid email address or leave the email field blank.';
    }
    if (!vehicle.trim()) {
      return 'Please enter your vehicle make, model, and year.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          vehicle: vehicle.trim(),
          service: selectedService,
          claimType,
          notes: notes.trim(),
          photoName,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Could not prepare quote request.');
      }

      setQuoteResult({
        referenceId: data.referenceId,
        formattedMessage: data.formattedMessage,
        whatsappUrl: data.whatsappUrl,
        emailUrl: data.emailUrl,
      });
    } catch {
      // Fallback client-side formatting if network is unavailable
      const fallbackRef = `LD-${Date.now().toString().slice(-6)}`;
      const messageBody = [
        `Hi ${COMPANY_INFO.name}, I would like a quote:`,
        `Reference: ${fallbackRef}`,
        `Name: ${name.trim()}`,
        `Phone: ${phone.trim()}`,
        email.trim() ? `Email: ${email.trim()}` : null,
        `Vehicle: ${vehicle.trim()}`,
        `Service: ${selectedService} (${claimType})`,
        `Damage details: ${notes.trim() || 'No additional notes'}`,
        photoName ? `Attached photo: ${photoName}` : null,
      ]
        .filter(Boolean)
        .join('\n');

      setQuoteResult({
        referenceId: fallbackRef,
        formattedMessage: messageBody,
        whatsappUrl: `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
          messageBody
        )}`,
        emailUrl: `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
          `Quote Request [${fallbackRef}] - ${vehicle.trim()} (${selectedService})`
        )}&body=${encodeURIComponent(messageBody)}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setQuoteResult(null);
    setErrorMsg(null);
  };

  return (
    <section
      id="quote"
      className="py-16 sm:py-20 lg:py-24 bg-[#F4F6F8] border-b border-[#E3E8EF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (5 cols): Direct Contact Information & Assistance */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#C92332]">
                Request a Quotation
              </p>
              <h2
                className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#101C35] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Get a Clear, Competitive Repair Estimate
              </h2>
              <p className="mt-3.5 text-base text-[#475569] leading-relaxed">
                Complete the quotation form with your vehicle details or contact
                our Polokwane workshop directly via telephone, WhatsApp, or
                email.
              </p>
            </div>

            {/* Contact Channel Cards */}
            <div className="space-y-3.5">
              <a
                href={`tel:${COMPANY_INFO.phoneTel}`}
                className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#E3E8EF] hover:border-[#101C35]/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#101C35] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#475569]">
                    Call Our Workshop
                  </p>
                  <p className="text-base font-bold text-[#101C35] tabular-nums mt-0.5">
                    {COMPANY_INFO.phoneDisplay}
                  </p>
                  <p className="text-xs text-[#475569] mt-0.5">
                    Mon–Thu 7:30 am – 4:45 pm · Fri 7:30 am – 4:15 pm
                  </p>
                </div>
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                  'Hi LimDent Auto Body Technologies, I would like to request a quote for my vehicle.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#E3E8EF] hover:border-[#101C35]/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#475569]">
                    WhatsApp Direct
                  </p>
                  <p className="text-base font-bold text-[#101C35] mt-0.5">
                    Message LimDent on WhatsApp
                  </p>
                  <p className="text-xs text-[#475569] mt-0.5">
                    Send damage photos directly from your phone
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#E3E8EF] hover:border-[#101C35]/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#C92332] text-white flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#475569]">
                    Email Estimates
                  </p>
                  <p className="text-base font-bold text-[#101C35] mt-0.5">
                    {COMPANY_INFO.email}
                  </p>
                  <p className="text-xs text-[#475569] mt-0.5">
                    For insurance assessments, fleet tenders &amp; enquiries
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#E3E8EF]">
                <div className="w-10 h-10 rounded-lg bg-[#F4F6F8] text-[#101C35] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#475569]">
                    Physical Workshop Address
                  </p>
                  <p className="text-sm font-bold text-[#101C35] mt-0.5">
                    {COMPANY_INFO.address}
                  </p>
                  <a
                    href={COMPANY_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-1 text-xs font-semibold text-[#C92332] hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Interactive Quote Request Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl border border-[#E3E8EF] p-6 sm:p-8 lg:p-9">
              {!quoteResult ? (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="pb-4 border-b border-[#E3E8EF]">
                    <h3 className="text-xl font-bold text-[#101C35]">
                      Vehicle Repair Quotation Form
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#475569]">
                      Fields marked with <span className="text-[#C92332]">*</span>{' '}
                      are required.
                    </p>
                  </div>

                  {errorMsg && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs sm:text-sm text-[#C92332] font-medium"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Row 1: Name & Phone */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="quote-name"
                        className="block text-xs font-semibold text-[#101C35] mb-1.5"
                      >
                        Full Name <span className="text-[#C92332]">*</span>
                      </label>
                      <input
                        id="quote-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Thabo Mokoena"
                        className="w-full rounded-lg border border-[#E3E8EF] bg-white px-3.5 py-2.5 text-sm text-[#101C35] placeholder:text-slate-400 focus:outline-none focus:border-[#101C35] focus:ring-1 focus:ring-[#101C35]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="quote-phone"
                        className="block text-xs font-semibold text-[#101C35] mb-1.5"
                      >
                        Phone / WhatsApp Number{' '}
                        <span className="text-[#C92332]">*</span>
                      </label>
                      <input
                        id="quote-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 082 123 4567"
                        className="w-full rounded-lg border border-[#E3E8EF] bg-white px-3.5 py-2.5 text-sm text-[#101C35] placeholder:text-slate-400 focus:outline-none focus:border-[#101C35] focus:ring-1 focus:ring-[#101C35]"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Vehicle Make/Model */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="quote-email"
                        className="block text-xs font-semibold text-[#101C35] mb-1.5"
                      >
                        Email Address (Optional)
                      </label>
                      <input
                        id="quote-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. client@example.co.za"
                        className="w-full rounded-lg border border-[#E3E8EF] bg-white px-3.5 py-2.5 text-sm text-[#101C35] placeholder:text-slate-400 focus:outline-none focus:border-[#101C35] focus:ring-1 focus:ring-[#101C35]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="quote-vehicle"
                        className="block text-xs font-semibold text-[#101C35] mb-1.5"
                      >
                        Vehicle Make, Model &amp; Year{' '}
                        <span className="text-[#C92332]">*</span>
                      </label>
                      <input
                        id="quote-vehicle"
                        type="text"
                        required
                        value={vehicle}
                        onChange={(e) => setVehicle(e.target.value)}
                        placeholder="e.g. 2021 Toyota Hilux / VW Polo"
                        className="w-full rounded-lg border border-[#E3E8EF] bg-white px-3.5 py-2.5 text-sm text-[#101C35] placeholder:text-slate-400 focus:outline-none focus:border-[#101C35] focus:ring-1 focus:ring-[#101C35]"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service Required & Repair Type */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="quote-service"
                        className="block text-xs font-semibold text-[#101C35] mb-1.5"
                      >
                        Service Required <span className="text-[#C92332]">*</span>
                      </label>
                      <select
                        id="quote-service"
                        value={selectedService}
                        onChange={(e) => onServiceChange(e.target.value)}
                        className="w-full rounded-lg border border-[#E3E8EF] bg-white px-3.5 py-2.5 text-sm text-[#101C35] focus:outline-none focus:border-[#101C35] focus:ring-1 focus:ring-[#101C35]"
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <span className="block text-xs font-semibold text-[#101C35] mb-1.5">
                        Repair Type
                      </span>
                      <div className="grid grid-cols-2 gap-2.5">
                        {(['Private / Cash', 'Insurance Claim'] as const).map(
                          (type) => (
                            <label
                              key={type}
                              className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs sm:text-sm font-medium cursor-pointer transition-colors ${
                                claimType === type
                                  ? 'border-[#101C35] bg-[#101C35] text-white'
                                  : 'border-[#E3E8EF] bg-white text-[#475569] hover:border-[#101C35]/40'
                              }`}
                            >
                              <input
                                type="radio"
                                name="claimType"
                                value={type}
                                checked={claimType === type}
                                onChange={() => setClaimType(type)}
                                className="sr-only"
                              />
                              <span>{type}</span>
                            </label>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Damage Description */}
                  <div>
                    <label
                      htmlFor="quote-notes"
                      className="block text-xs font-semibold text-[#101C35] mb-1.5"
                    >
                      Description of the Repair / Damage
                    </label>
                    <textarea
                      id="quote-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Describe the dent, scratch, paintwork, or collision damage..."
                      className="w-full rounded-lg border border-[#E3E8EF] bg-white px-3.5 py-2.5 text-sm text-[#101C35] placeholder:text-slate-400 focus:outline-none focus:border-[#101C35] focus:ring-1 focus:ring-[#101C35]"
                    />
                  </div>

                  {/* Row 5: Optional Damage Photo Upload */}
                  <div>
                    <label
                      htmlFor="quote-photo"
                      className="block text-xs font-semibold text-[#101C35] mb-1.5"
                    >
                      Attach Damage Photo (Optional)
                    </label>
                    <div className="flex items-center gap-3">
                      <label
                        htmlFor="quote-photo"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E3E8EF] bg-[#F4F6F8] hover:border-[#101C35]/40 text-xs sm:text-sm font-semibold text-[#101C35] cursor-pointer transition-colors"
                      >
                        <Upload className="w-4 h-4 text-[#C92332]" />
                        <span>
                          {photoName ? 'Change Photo' : 'Select Damage Photo'}
                        </span>
                      </label>
                      <input
                        ref={fileInputRef}
                        id="quote-photo"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="sr-only"
                      />
                      {!photoName && (
                        <span className="text-xs text-[#475569]">
                          JPG or PNG from your phone or computer
                        </span>
                      )}
                    </div>

                    {photoPreview && (
                      <div className="mt-3 flex items-center gap-3.5 p-3 rounded-lg bg-[#F4F6F8] border border-[#E3E8EF]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photoPreview}
                          alt="Selected vehicle damage preview"
                          className="w-16 h-16 rounded-md object-cover border border-[#E3E8EF] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-semibold text-[#101C35] truncate">
                            {photoName}
                          </p>
                          <p className="text-xs text-[#475569]">
                            Photo ready to attach with your quote inquiry.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleClearPhoto}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#C92332] hover:underline cursor-pointer shrink-0"
                        >
                          <X className="w-4 h-4" />
                          <span>Remove</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-[#C92332] hover:bg-[#a81c29] active:bg-[#8f1722] disabled:opacity-60 text-white font-semibold text-sm sm:text-base transition-colors cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Preparing Quote Request...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Prepare My Free Quote Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* Confirmation & Dispatch State */
                <div className="space-y-6 py-2">
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E3E8EF]">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg sm:text-xl font-bold text-[#101C35]">
                            Quote Request Ready
                          </h3>
                          <span className="text-xs font-mono font-semibold text-[#475569] tabular-nums">
                            ({quoteResult.referenceId})
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#475569] mt-0.5">
                          Choose your preferred channel below to send your details
                          directly to the LimDent workshop team:
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Summary Preview */}
                  <div className="bg-[#F4F6F8] rounded-lg p-4 border border-[#E3E8EF] text-xs sm:text-sm text-[#101C35] space-y-1.5">
                    <p>
                      <span className="font-semibold">Customer:</span> {name} (
                      {phone})
                    </p>
                    <p>
                      <span className="font-semibold">Vehicle:</span> {vehicle}
                    </p>
                    <p>
                      <span className="font-semibold">Service:</span>{' '}
                      {selectedService} · {claimType}
                    </p>
                    {notes && (
                      <p>
                        <span className="font-semibold">Repair Notes:</span>{' '}
                        {notes}
                      </p>
                    )}
                    {photoName && (
                      <p className="text-xs text-[#475569] pt-1">
                        <span className="font-semibold text-[#101C35]">
                          Selected Photo:
                        </span>{' '}
                        {photoName} — remember to attach this image once WhatsApp
                        or your email client opens.
                      </p>
                    )}
                  </div>

                  {/* Direct Dispatch Actions */}
                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <a
                      href={quoteResult.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-sm transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Send via WhatsApp</span>
                    </a>

                    <a
                      href={quoteResult.emailUrl}
                      className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-lg bg-[#101C35] hover:bg-[#0B1428] text-white font-semibold text-sm transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send via Email</span>
                    </a>
                  </div>

                  <div className="pt-2 border-t border-[#E3E8EF] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#475569] hover:text-[#101C35] transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Edit Quote Details</span>
                    </button>

                    <a
                      href={`tel:${COMPANY_INFO.phoneTel}`}
                      className="text-xs sm:text-sm font-semibold text-[#C92332] hover:underline tabular-nums"
                    >
                      Or Call {COMPANY_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
