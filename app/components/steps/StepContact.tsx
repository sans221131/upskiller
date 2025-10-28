'use client';

import { useMemo, useState } from 'react';
import { FormData } from '../LeadFormWizard';

interface StepContactProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Other',
] as const;

export default function StepContact({ data, updateData, onSubmit, onBack, isSubmitting }: StepContactProps) {
  const [consent, setConsent] = useState(false);

  const disableSubmit = useMemo(() => {
    return (
      !data.fullName ||
      !data.email ||
      !data.phone ||
      data.phone.length !== 10 ||
      !data.state ||
      !data.city ||
      !consent ||
      isSubmitting
    );
  }, [data.fullName, data.email, data.phone, data.state, data.city, consent, isSubmitting]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disableSubmit) return;
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <header className="space-y-3">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.32em] text-slate-400">
          Step 5 · Confirmation
        </p>
        <h2 className="text-3xl font-semibold leading-tight text-slate-900">
          Where should we send your curated matches?
        </h2>
        <p className="text-base leading-relaxed text-slate-600">
          We’ll confirm details via email, share shortlists on WhatsApp/SMS, and arrange a counsellor callback within 24 hours.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Full name <span className="text-rose-500">*</span></span>
          <input
            type="text"
            value={data.fullName}
            onChange={(event) => updateData({ fullName: event.target.value })}
            className="rounded-xl border border-slate-200 px-4 py-3 text-base text-black shadow-sm focus:border-[var(--brand)] focus:outline-none"
            placeholder="e.g. Ayesha Sharma"
            required
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Email address <span className="text-rose-500">*</span></span>
          <input
            type="email"
            value={data.email}
            onChange={(event) => updateData({ email: event.target.value })}
            className="rounded-xl border border-slate-200 px-4 py-3 text-base text-black shadow-sm focus:border-[var(--brand)] focus:outline-none"
            placeholder="you@example.com"
            required
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Mobile number <span className="text-rose-500">*</span></span>
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 shadow-sm focus-within:border-[var(--brand)]">
            <span className="text-sm font-semibold text-slate-500">+91</span>
            <input
              type="tel"
              value={data.phone}
              onChange={(event) =>
                updateData({ phone: event.target.value.replace(/\D/g, '').slice(0, 10) })
              }
              className="w-full border-none text-base text-black focus:outline-none"
              placeholder="9876543210"
              maxLength={10}
              required
            />
          </div>
          <span className="text-xs text-slate-500">We’ll use this for quick WhatsApp or SMS nudges.</span>
        </label>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-700">State <span className="text-rose-500">*</span></span>
            <select
              value={data.state}
              onChange={(event) => updateData({ state: event.target.value })}
              className="rounded-xl border border-slate-200 px-4 py-3 text-base text-black shadow-sm focus:border-[var(--brand)] focus:outline-none"
              required
            >
              <option value="">Select state…</option>
              {INDIAN_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-700">City <span className="text-rose-500">*</span></span>
            <input
              type="text"
              value={data.city}
              onChange={(event) => updateData({ city: event.target.value })}
              className="rounded-xl border border-slate-200 px-4 py-3 text-base shadow-sm focus:border-teal-500 focus:outline-none"
              placeholder="e.g. Bengaluru"
              required
            />
          </label>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Preferred contact channel</span>
          <select
            value={data.source}
            onChange={(event) => updateData({ source: event.target.value })}
            className="rounded-xl border border-slate-200 px-4 py-3 text-base text-black shadow-sm focus:border-[var(--brand)] focus:outline-none"
          >
            <option value="website">Website</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="phone">Phone call</option>
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">UTM / campaign code</span>
          <input
            type="text"
            value={data.utmCampaign}
            onChange={(event) => updateData({ utmCampaign: event.target.value })}
            className="rounded-xl border border-slate-200 px-4 py-3 text-base text-black shadow-sm focus:border-[var(--brand)] focus:outline-none"
            placeholder="Optional tracking code"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Date of birth</span>
          <input
            type="date"
            value={data.dob}
            onChange={(event) => updateData({ dob: event.target.value })}
            className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900 shadow-sm focus:border-teal-500 focus:outline-none"
            max={new Date().toISOString().split('T')[0]}
          />
        </label>
      </section>

      <section>
        <label className={`flex items-start gap-3 rounded-2xl border px-4 py-4 transition-all ${
          consent ? 'border-[var(--brand)] bg-[var(--brand)]/10 shadow-sm' : 'border-slate-200 hover:border-[var(--brand)]'
        }`}>
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className="mt-1 h-5 w-5 rounded border-slate-300 text-[var(--brand)] focus:ring-[var(--brand)]"
            required
          />
          <div className="space-y-1 text-sm leading-relaxed text-slate-700">
            <p>
              <span className="font-semibold">I consent to be contacted</span> by Upskillers and partner institutions via phone, email, SMS, and WhatsApp for guidance related to this enquiry. I understand this overrides DND/NDNC registration.
            </p>
          </div>
        </label>
      </section>

      <aside className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/6 p-5 text-sm text-[var(--brand)]">
        <p className="text-sm font-semibold text-[var(--brand)]">Timeline immediately after submission</p>
        <ol className="mt-3 space-y-3 text-sm leading-relaxed">
          <li><span className="font-semibold text-[var(--brand)]">•</span> Instant email with shortlisted programs and fit notes.</li>
          <li><span className="font-semibold text-[var(--brand)]">•</span> Counsellor call within 24 hours (or your chosen channel).</li>
          <li><span className="font-semibold text-[var(--brand)]">•</span> Financing + scholarship options tailored to your profile.</li>
        </ol>
      </aside>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="w-full rounded-full border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-700 transition-all hover:border-[var(--brand)] hover:text-[var(--brand)] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={disableSubmit}
          className="w-full rounded-full bg-[var(--brand)] px-6 py-4 text-lg font-semibold text-white shadow-sm transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {isSubmitting ? 'Submitting…' : 'Complete & Get Matches'}
        </button>
      </div>
    </form>
  );
}
