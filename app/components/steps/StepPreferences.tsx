'use client';

import { FormData } from '../LeadFormWizard';

interface StepPreferencesProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const DEGREE_TYPES = [
  { value: 'MBA', label: 'MBA', desc: 'Masters with broad managerial depth' },
  { value: 'PGDM', label: 'PGDM', desc: 'Industry-aligned management diploma' },
  { value: 'Executive MBA', label: 'Executive MBA', desc: 'Designed for 5+ years of experience' },
  { value: 'PGPM', label: 'PGPM', desc: 'Intensive post graduate program' },
] as const;

const DELIVERY_MODES = [
  { value: 'online', label: 'Fully online', icon: '💻', desc: 'Live + recorded classes; exam from anywhere' },
  { value: 'blended', label: 'Blended', icon: '🔄', desc: 'Mix of campus immersions and live online' },
  { value: 'weekend', label: 'Weekend format', icon: '📅', desc: 'Compact batches on Saturdays & Sundays' },
  { value: 'on-campus', label: 'On campus', icon: '🏫', desc: 'Full-time classroom experience' },
] as const;

const SPECIALISATIONS = [
  'Finance',
  'Marketing',
  'Human Resources',
  'Operations',
  'Business Analytics',
  'Digital Marketing',
  'Entrepreneurship',
  'Supply Chain',
  'International Business',
  'Not sure yet',
] as const;

export default function StepPreferences({ data, updateData, onNext, onBack }: StepPreferencesProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <header className="space-y-3">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.32em] text-slate-400">
          Step 2 · Learning preferences
        </p>
        <h2 className="text-3xl font-semibold leading-tight text-slate-900">
          What kind of program feels like the right fit?
        </h2>
        <p className="text-base leading-relaxed text-slate-600">
          These inputs help us shortlist formats that match your pace, commitments, and how you prefer to learn.
        </p>
      </header>

      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
          Degree formats <span className="inline text-rose-500">*</span>
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {DEGREE_TYPES.map((degree) => {
            const isActive = data.degreeInterest === degree.value;
            return (
              <button
                key={degree.value}
                type="button"
                onClick={() => updateData({ degreeInterest: degree.value })}
                className={`rounded-2xl border px-5 py-4 text-left transition-all ${
                  isActive
                    ? 'border-[var(--brand)] bg-[var(--brand)]/10 shadow-sm'
                    : 'border-slate-200 hover:border-[var(--brand)] hover:bg-[var(--brand)]/6'
                }`}
              >
                <p className="text-base font-semibold text-slate-900">{degree.label}</p>
                <p className="mt-1 text-sm leading-snug text-slate-600">{degree.desc}</p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
          Learning rhythm <span className="inline text-rose-500">*</span>
        </h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {DELIVERY_MODES.map((mode) => {
            const isActive = data.preferredMode === mode.value;
            return (
              <button
                key={mode.value}
                type="button"
                onClick={() => updateData({ preferredMode: mode.value })}
                className={`rounded-2xl border px-4 py-5 text-center transition-all ${
                  isActive
                    ? 'border-[var(--brand)] bg-[var(--brand)]/10 shadow-sm'
                    : 'border-slate-200 hover:border-[var(--brand)] hover:bg-[var(--brand)]/6'
                }`}
              >
                <span className="mb-2 block text-2xl leading-none">{mode.icon}</span>
                <p className="text-sm font-semibold text-slate-900">{mode.label}</p>
                <p className="mt-1 text-xs leading-snug text-slate-600">{mode.desc}</p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Areas you’re drawn to <span className="inline text-rose-500">*</span>
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {SPECIALISATIONS.map((specialisation) => {
            const isActive = data.specialisationInterest === specialisation;
            return (
              <button
                key={specialisation}
                type="button"
                onClick={() => updateData({ specialisationInterest: specialisation })}
                className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? 'border-[var(--brand)] bg-[var(--brand)]/10 text-[var(--brand)] shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:border-[var(--brand)] hover:text-[var(--brand)]'
                    }`}
              >
                {specialisation}
              </button>
            );
          })}
  </div>
      </section>

      <section className="space-y-3">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Specific university or program already on your radar</span>
          <input
            type="text"
            value={data.coursePreference}
            onChange={(event) => updateData({ coursePreference: event.target.value })}
            className="rounded-xl border border-slate-200 px-4 py-3 text-base text-black shadow-sm focus:border-[var(--brand)] focus:outline-none"
            placeholder="Optional — helps us compare side-by-side"
          />
        </label>
      </section>

      <aside className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/6 p-5">
        <p className="text-sm font-semibold text-[var(--brand)]">Not sure about specialisations yet?</p>
        <p className="mt-1 text-sm leading-relaxed text-[var(--brand)]">
          Pick “Not sure yet” and your counsellor will co-design a track based on trending roles, salary outlook, and your background.
        </p>
      </aside>

  <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="w-full rounded-full border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-700 transition-all hover:border-[var(--brand)] hover:text-[var(--brand)] sm:w-auto"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!data.degreeInterest || !data.preferredMode || !data.specialisationInterest}
          aria-disabled={!data.degreeInterest || !data.preferredMode || !data.specialisationInterest}
          className="w-full rounded-full bg-[var(--brand)] px-6 py-4 text-lg font-semibold text-white shadow-sm transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          Continue to Eligibility
        </button>
      </div>
    </form>
  );
}
