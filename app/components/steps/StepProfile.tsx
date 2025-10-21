'use client';

import { FormData } from '../LeadFormWizard';

interface StepProfileProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

const EMPLOYMENT_STATUSES = [
  { value: 'Working professional', label: 'Working professional', icon: '💼', desc: 'Full-time or part-time employee' },
  { value: 'Student', label: 'Student', icon: '🎓', desc: 'Final or pre-final year of study' },
  { value: 'Entrepreneur', label: 'Entrepreneur / Consultant', icon: '🚀', desc: 'Building a venture or consulting' },
  { value: 'On break', label: 'On a break & exploring', icon: '🔄', desc: 'Planning a focused comeback' },
] as const;

const SALARY_BANDS = [
  '< ₹3 LPA',
  '₹3-5 LPA',
  '₹5-8 LPA',
  '₹8-12 LPA',
  '₹12-18 LPA',
  '₹18-25 LPA',
  '> ₹25 LPA',
  'Prefer not to say',
] as const;

const GOALS = [
  { value: 'Career switch', label: 'Career switch', icon: '🔄' },
  { value: 'Promotion', label: 'Get promoted faster', icon: '📈' },
  { value: 'Entrepreneurship', label: 'Start my business', icon: '🚀' },
  { value: 'Skill upgrade', label: 'Build new skills', icon: '🎯' },
  { value: 'Salary hike', label: 'Increase salary', icon: '💰' },
  { value: 'Network', label: 'Grow my network', icon: '🤝' },
] as const;

const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'] as const;

export default function StepProfile({ data, updateData, onNext }: StepProfileProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onNext();
  };

  const requireExperience = data.employmentStatus && data.employmentStatus !== 'Student';

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <header className="space-y-3">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.32em] text-slate-400">
          Step 1 · Profile snapshot
        </p>
        <h2 className="text-3xl font-semibold leading-tight text-slate-900">
          Let’s understand where you’re starting from
        </h2>
        <p className="text-base leading-relaxed text-slate-600">
          Your current context helps us prioritise mentors, programs, and financing guidance that actually fit your reality.
        </p>
      </header>

      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
          Current status <span className="inline text-rose-500">*</span>
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {EMPLOYMENT_STATUSES.map((status) => {
            const isActive = data.employmentStatus === status.value;
            return (
              <button
                key={status.value}
                type="button"
                onClick={() => updateData({ employmentStatus: status.value })}
                className={`rounded-2xl border px-5 py-4 text-left transition-all ${
                  isActive
                    ? 'border-teal-500 bg-teal-50 shadow-sm'
                    : 'border-slate-200 hover:border-teal-300 hover:bg-teal-50/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl leading-none">{status.icon}</span>
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-slate-900">{status.label}</p>
                    <p className="text-sm leading-snug text-slate-600">{status.desc}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {requireExperience && (
        <section className="space-y-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Experience & compensation
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-700">
                Total work experience <span className="text-rose-500">*</span>
              </span>
              <input
                type="number"
                step="0.5"
                min="0"
                max="40"
                value={data.experienceYears}
                onChange={(event) => updateData({ experienceYears: event.target.value })}
                className="rounded-xl border border-slate-200 px-4 py-3 text-base shadow-sm focus:border-teal-500 focus:outline-none"
                placeholder="e.g. 3.5"
                required
              />
            </label>

            {data.employmentStatus === 'Working professional' && (
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-slate-700">Current salary band</span>
                <select
                  value={data.salaryBand}
                  onChange={(event) => updateData({ salaryBand: event.target.value })}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-base shadow-sm focus:border-teal-500 focus:outline-none"
                >
                  <option value="">Choose a range…</option>
                  {SALARY_BANDS.map((band) => (
                    <option key={band} value={band}>
                      {band}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Personal profile</h3>
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">optional</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {GENDERS.map((gender) => {
            const isActive = data.gender === gender;
            return (
              <button
                key={gender}
                type="button"
                onClick={() => updateData({ gender })}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-teal-100 text-teal-700'
                    : 'border border-slate-200 text-slate-600 hover:border-teal-300 hover:text-teal-700'
                }`}
              >
                {gender}
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Primary career goal
          </h3>
          <span className="text-xs font-semibold text-rose-500">required</span>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {GOALS.map((goal) => {
            const isActive = data.goal === goal.value;
            return (
              <button
                key={goal.value}
                type="button"
                onClick={() => updateData({ goal: goal.value })}
                className={`rounded-2xl border px-4 py-5 text-center transition-all ${
                  isActive
                    ? 'border-teal-500 bg-teal-50 shadow-sm'
                    : 'border-slate-200 hover:border-teal-300 hover:bg-teal-50/40'
                }`}
              >
                <span className="mb-3 block text-3xl leading-none">{goal.icon}</span>
                <span className="text-sm font-semibold text-slate-900">{goal.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      <aside className="rounded-2xl border border-teal-100 bg-teal-50/70 p-5">
        <p className="text-sm font-semibold text-teal-800">What you unlock next</p>
        <p className="mt-1 text-sm leading-relaxed text-teal-700">
          An alumni mentor from your background connects within 24 hours, followed by tailored program matches and financing guidance curated for your situation.
        </p>
      </aside>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="submit"
          disabled={
            !data.employmentStatus ||
            !data.goal ||
            (requireExperience && !data.experienceYears)
          }
          className="w-full rounded-full bg-slate-900 px-6 py-4 text-lg font-semibold text-white shadow-sm transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          Continue to Preferences
        </button>
      </div>
    </form>
  );
}
