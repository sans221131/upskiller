'use client';

import { FormData } from '../LeadFormWizard';

interface StepEligibilityProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const QUALIFICATIONS = [
  "Bachelor's Degree (Any Stream)",
  'Engineering Degree',
  'Commerce/BBA',
  'Science Degree',
  'Arts/Humanities',
  'Diploma (3 years)',
  'Other',
] as const;

const BUDGET_RANGES = [
  '< ₹1 Lakh',
  '₹1-2 Lakhs',
  '₹2-4 Lakhs',
  '₹4-6 Lakhs',
  '₹6-10 Lakhs',
  '> ₹10 Lakhs',
  'Flexible',
] as const;

const CATEGORIES = ['General', 'OBC', 'SC', 'ST', 'EWS', 'PWD', 'Prefer not to say'] as const;

export default function StepEligibility({ data, updateData, onNext, onBack }: StepEligibilityProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <header className="space-y-3">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.32em] text-slate-400">
          Step 3 · Eligibility signals
        </p>
        <h2 className="text-3xl font-semibold leading-tight text-slate-900">
          Share your academic background and investment comfort
        </h2>
        <p className="text-base leading-relaxed text-slate-600">
          We use this to surface programs where you already qualify and to personalise scholarships or instalment options.
        </p>
      </header>

      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
          Highest qualification <span className="inline text-rose-500">*</span>
        </h3>
        <select
          value={data.highestQualification}
          onChange={(event) => updateData({ highestQualification: event.target.value })}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base text-black shadow-sm focus:border-[var(--brand)] focus:outline-none"
          required
        >
          <option value="">Select the closest option…</option>
          {QUALIFICATIONS.map((qualification) => (
            <option key={qualification} value={qualification}>
              {qualification}
            </option>
          ))}
        </select>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Academic trend</h3>
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">optional</span>
        </div>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Percentage / CGPA in your latest degree</span>
          <input
            type="number"
            step="0.01"
            min="0"
            max="100"
            value={data.lastScorePercent}
            onChange={(event) => updateData({ lastScorePercent: event.target.value })}
            className="rounded-xl border border-slate-200 px-4 py-3 text-base text-black shadow-sm focus:border-[var(--brand)] focus:outline-none"
            placeholder="e.g. 75 or 7.5"
          />
          <span className="text-xs text-slate-500">Enter the value in percentage or CGPA — whichever is easier.</span>
        </label>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Social category</h3>
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">optional</span>
        </div>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
          {CATEGORIES.map((category) => {
            const isActive = data.category === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => updateData({ category })}
                className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? 'border-[var(--brand)] bg-[var(--brand)]/10 text-[var(--brand)] shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:border-[var(--brand)] hover:text-[var(--brand)]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
          Comfortable investment range <span className="inline text-rose-500">*</span>
        </h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {BUDGET_RANGES.map((budget) => {
            const isActive = data.budgetRange === budget;
            return (
              <button
                key={budget}
                type="button"
                onClick={() => updateData({ budgetRange: budget })}
                className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? 'border-[var(--brand)] bg-[var(--brand)]/10 text-[var(--brand)] shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:border-[var(--brand)] hover:text-[var(--brand)]'
                }`}
              >
                {budget}
              </button>
            );
          })}
        </div>
      </section>

      <section>
  <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 transition-all hover:border-[var(--brand)]">
          <input
            type="checkbox"
            checked={data.wantsEmi}
            onChange={(event) => updateData({ wantsEmi: event.target.checked })}
            className="mt-1 h-5 w-5 rounded border-slate-300 text-[var(--brand)] focus:ring-[var(--brand)]"
          />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-900">Show me EMI or pay-later options</p>
            <p className="text-sm leading-snug text-slate-600">
              We’ll surface monthly affordability scenarios and lender partners you can explore.
            </p>
          </div>
        </label>
      </section>

      <aside className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/6 p-5">
        <p className="text-sm font-semibold text-[var(--brand)]">Scholarship & aid match</p>
        <p className="mt-1 text-sm leading-relaxed text-[var(--brand)]">
          With these details we auto-check institutional scholarships, alumni grants, and corporate sponsorship programs you can apply for.
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
          disabled={!data.highestQualification || !data.budgetRange}
          className="w-full rounded-full bg-[var(--brand)] px-6 py-4 text-lg font-semibold text-white shadow-sm transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          See Recommendations
        </button>
      </div>
    </form>
  );
}
