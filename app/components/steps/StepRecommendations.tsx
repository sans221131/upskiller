'use client';

import { useEffect, useMemo, useState } from 'react';
import { FormData } from '../LeadFormWizard';

interface StepRecommendationsProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface ProgramMatch {
  id: number;
  title: string;
  institutionName: string | null;
  institutionSlug: string | null;
  institutionLocation: string | null;
  degreeType: string;
  durationMonths: number | null;
  totalFee: number | null;
  deliveryMode: string | null;
  highlights: string | null;
  outcomes: string | null;
  fitScore: number;
}

const formatCurrency = (value: number | null) => {
  if (!value) return '—';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

const formatDuration = (months: number | null) => {
  if (!months) return '—';
  const years = months / 12;
  if (Number.isInteger(years)) return `${months} months · ${years} ${years === 1 ? 'year' : 'years'}`;
  return `${months} months · ${years.toFixed(1)} years`;
};

const modeLabel = (mode: string | null) => {
  if (!mode) return '—';
  switch (mode) {
    case 'online':
      return 'Fully Online';
    case 'blended':
      return 'Blended';
    case 'weekend':
      return 'Weekend Format';
    case 'on-campus':
      return 'On Campus';
    default:
      return mode;
  }
};

const cleanBulletPoints = (highlights?: string | null, outcomes?: string | null) => {
  const source = `${highlights ?? ''}\n${outcomes ?? ''}`
    .replace(/UGC-entitled Online Degrees?\.*/gi, '')
    .trim();

  if (!source) return [];

  const pieces = source
    .split(/\n|•|\u2022|\u2023|\*|(?<=\.)\s+/g)
    .map((piece) => piece.trim())
    .filter((piece) => piece.length > 0)
    .map((piece) => piece.replace(/^[-–•\d.\s]+/, '').trim())
    .filter((piece) => piece.length >= 12)
    .map((piece) => (piece.length > 140 ? `${piece.slice(0, 137).trimEnd()}…` : piece));

  const unique: string[] = [];
  for (const item of pieces) {
    if (!unique.some((existing) => existing.toLowerCase() === item.toLowerCase())) {
      unique.push(item);
    }
    if (unique.length === 3) break;
  }

  return unique;
};

export default function StepRecommendations({ data, updateData, onNext, onBack }: StepRecommendationsProps) {
  const [programs, setPrograms] = useState<ProgramMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>(data.selectedPrograms || []);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/programs/match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            degreeInterest: data.degreeInterest,
            preferredMode: data.preferredMode,
            budgetRange: data.budgetRange,
            specialisation: data.specialisationInterest,
          }),
        });

        if (!response.ok) {
          const payload = (await response.json().catch(() => ({}))) as { error?: string };
          throw new Error(payload.error || 'Unable to load recommendations');
        }

        const payload = (await response.json()) as { programs: ProgramMatch[] };
        setPrograms(payload.programs ?? []);
      } catch (fetchError) {
        console.error(fetchError);
        setError(fetchError instanceof Error ? fetchError.message : 'Unable to load recommendations');
        setPrograms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [data.degreeInterest, data.preferredMode, data.budgetRange, data.specialisationInterest]);

  useEffect(() => {
    setSelectedIds(data.selectedPrograms || []);
  }, [data.selectedPrograms]);

  const toggleProgram = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((current) => current !== id) : [...prev, id]));
  };

  const handleContinue = () => {
    updateData({ selectedPrograms: selectedIds });
    onNext();
  };

  const summaryCopy = useMemo(() => {
    if (loading) return 'We’re scoring programs against your answers…';
    if (error) return 'We couldn’t load matches just now. You can still continue — our counsellors will curate options for you.';
    if (programs.length === 0) return 'We didn’t find an exact match yet. Pick “Continue” and we’ll shortlist fresh options with our counsellors.';
    return `Based on your inputs, here are ${programs.length} programs to review. Select the ones that feel promising — you can pick more than one.`;
  }, [loading, error, programs.length]);

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-2 border-teal-500 border-b-transparent" />
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-400">matching in progress</p>
        <p className="mt-3 text-base text-slate-600">We’re analysing degree, format, and ROI signals for you.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.32em] text-slate-400">
          Step 4 · Preview matches
        </p>
        <h2 className="text-3xl font-semibold leading-tight text-slate-900">
          Choose programs you’d like guidance on
        </h2>
        <p className="text-base leading-relaxed text-slate-600">{summaryCopy}</p>
      </header>

      {error ? (
        <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-6 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {programs.length > 0 ? (
        <div className="space-y-5">
          {programs.map((program) => {
            const isSelected = selectedIds.includes(program.id);
            const bulletPoints = cleanBulletPoints(program.highlights, program.outcomes);

            return (
              <article
                key={program.id}
                className={`relative flex flex-col gap-6 rounded-3xl border px-6 py-6 transition-all ${
                  isSelected ? 'border-teal-500 bg-teal-50 shadow-sm' : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50'
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute left-0 top-4 bottom-4 w-1.5 rounded-full ${
                    isSelected ? 'bg-teal-500' : 'bg-teal-200'
                  }`}
                />
                <div className="pl-3 sm:pl-4">
                  <button
                    type="button"
                    className="flex items-start justify-between gap-4 text-left"
                    onClick={() => toggleProgram(program.id)}
                  >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-[hsl(173,70%,94%)] px-3 py-1 text-[0.65rem] font-semibold tracking-[0.18em] text-[hsl(172,60%,32%)]">
                        {program.degreeType}
                      </span>
                      <span className="rounded-full bg-[hsl(204,80%,96%)] px-3 py-1 text-[0.65rem] font-semibold tracking-[0.18em] text-[hsl(205,50%,40%)]">
                        {program.fitScore}% fit
                      </span>
                    </div>
                    <h3 className="text-[1.5rem] font-semibold leading-tight text-slate-900">{program.title}</h3>
                    <p className="text-xs uppercase tracking-[0.26em] text-slate-500">
                      {program.institutionName ?? 'Partner Institution'}
                      {program.institutionLocation ? ` • ${program.institutionLocation}` : ''}
                    </p>
                  </div>

                  <span
                    className={`mt-2 inline-flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
                      isSelected ? 'border-teal-500 bg-teal-500 text-white' : 'border-slate-300 text-transparent'
                    }`}
                    aria-hidden
                  >
                    ✓
                  </span>
                </button>

                <div className="grid gap-4 text-sm sm:grid-cols-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-slate-400">
                      Duration
                    </span>
                    <span className="text-sm font-medium text-slate-900">{formatDuration(program.durationMonths)}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-slate-400">
                      Delivery format
                    </span>
                    <span className="text-sm font-medium text-slate-900">{modeLabel(program.deliveryMode)}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-slate-400">
                      Indicative fee
                    </span>
                    <span className="text-sm font-semibold text-slate-900">{formatCurrency(program.totalFee)}</span>
                  </div>
                </div>

                    {bulletPoints.length > 0 && (
                      <ul className="space-y-2 text-sm leading-relaxed text-slate-600">
                        {bulletPoints.map((point, index) => (
                          <li key={index} className="flex gap-3">
                            <span className="mt-[6px] inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal-500" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
              </article>
            );
          })}
        </div>
      ) : null}

      <div className="flex flex-col gap-3 rounded-2xl border border-teal-100 bg-teal-50/70 p-5 text-sm text-teal-700">
        <p className="font-semibold text-teal-800">What happens after you choose?</p>
        <ul className="space-y-2 text-sm leading-relaxed">
          <li>• A mentor will call with deeper batch details, placements, and scholarships for your picks.</li>
          <li>• We can add more programs once we speak, so pick what looks interesting now.</li>
        </ul>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="w-full rounded-full border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-700 transition-all hover:border-teal-400 hover:text-teal-700 sm:w-auto"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={programs.length > 0 && selectedIds.length === 0}
          className="w-full rounded-full bg-slate-900 px-6 py-4 text-lg font-semibold text-white shadow-sm transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {programs.length > 0 ? 'Continue to Contact' : 'Continue — we’ll curate more' }
        </button>
      </div>

      <p className="text-center text-xs uppercase tracking-[0.28em] text-slate-400">
        {programs.length > 0 ? 'you can shortlist up to six programs' : 'our counsellors will add more options later'}
      </p>
    </div>
  );
}
