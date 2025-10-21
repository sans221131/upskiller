'use client';

import { useMemo, useState } from 'react';

type ProgramSummary = {
  id: number;
  title: string;
  degreeType: string;
  durationMonths: number | null;
  deliveryMode: string | null;
  totalFee: number | null;
  emiAvailable: boolean | null;
  highlights: string | null;
  outcomes: string | null;
  institutionId: number;
  institutionName: string | null;
  institutionSlug: string | null;
  institutionLocation: string | null;
  institutionAccreditation: string | null;
};

type Filters = {
  query: string;
  degreeType: string;
  deliveryMode: string;
  emi: string;
};

const DEFAULT_FILTERS: Filters = {
  query: '',
  degreeType: 'all',
  deliveryMode: 'all',
  emi: 'all',
};

function removeNoise(text: string) {
  return text.replace(/UGC-entitled Online Degrees?\.*/gi, '').trim();
}

function getHighlightPoints(highlights: string | null, outcomes: string | null) {
  const source = [highlights, outcomes]
    .filter(Boolean)
    .map((entry) => removeNoise(entry as string))
    .join('\n');

  if (!source) return [];

  const segments = source
    .split(/\n|•|\u2022|\u2023|\*|\.-\s|(?<=\.)\s+/g)
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0)
    .map((segment) => segment.replace(/^[-–•\d.\s]+/, '').trim())
    .filter((segment) => segment.length >= 12)
    .map((segment) => (segment.length > 140 ? `${segment.slice(0, 137).trimEnd()}…` : segment));

  const unique: string[] = [];
  segments.forEach((segment) => {
    if (unique.some((entry) => entry.toLowerCase() === segment.toLowerCase())) return;
    unique.push(segment);
  });

  return unique.slice(0, 3);
}

function formatDuration(months: number | null) {
  if (!months) return null;
  const years = months / 12;
  if (Number.isInteger(years)) {
    return `${months} months • ${years} ${years === 1 ? 'year' : 'years'}`;
  }
  return `${months} months • ${years.toFixed(1)} years`;
}

function formatDeliveryMode(mode: string | null) {
  if (!mode) return null;
  switch (mode) {
    case 'online':
      return 'Fully Online';
    case 'blended':
      return 'Blended (On-campus + Online)';
    case 'weekend':
      return 'Weekend Format';
    case 'on-campus':
      return 'On Campus';
    default:
      return mode;
  }
}

export default function ProgramCatalog({ programs }: { programs: ProgramSummary[] }) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const options = useMemo(() => {
    const degrees = new Set<string>();
    const modes = new Set<string>();

    programs.forEach((program) => {
      if (program.degreeType) {
        degrees.add(program.degreeType);
      }
      if (program.deliveryMode) {
        modes.add(program.deliveryMode);
      }
    });

    return {
      degreeTypes: Array.from(degrees).sort(),
      deliveryModes: Array.from(modes).sort(),
    };
  }, [programs]);

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesQuery = filters.query
        ? `${program.title} ${program.institutionName ?? ''}`
            .toLowerCase()
            .includes(filters.query.toLowerCase())
        : true;

      const matchesDegree = filters.degreeType === 'all' || program.degreeType === filters.degreeType;
      const matchesMode = filters.deliveryMode === 'all' || program.deliveryMode === filters.deliveryMode;

      const matchesEmi =
        filters.emi === 'all'
          ? true
          : filters.emi === 'yes'
            ? program.emiAvailable === true
            : program.emiAvailable === false || program.emiAvailable === null;

      return matchesQuery && matchesDegree && matchesMode && matchesEmi;
    });
  }, [filters, programs]);

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  if (programs.length === 0) {
    return (
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-12 text-center">
        <h2 className="text-2xl font-semibold text-slate-900 mb-3">Programs coming soon</h2>
        <p className="text-slate-600 mb-6">
          Our team is adding more courses right now. Share your goals and we’ll notify you as soon as matches are live.
        </p>
        <a href="/lead-form" className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-semibold">
          Tell us what you’re looking for
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <label htmlFor="program-search" className="text-sm font-semibold text-slate-700">
              Search by program or institution
            </label>
            <input
              id="program-search"
              type="text"
              value={filters.query}
              onChange={(event) => setFilters((prev) => ({ ...prev, query: event.target.value }))}
              placeholder="e.g. Business Analytics, NMIMS"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Degree type</label>
            <select
              value={filters.degreeType}
              onChange={(event) => setFilters((prev) => ({ ...prev, degreeType: event.target.value }))}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-teal-500 focus:outline-none"
            >
              <option value="all">All</option>
              {options.degreeTypes.map((degree) => (
                <option key={degree} value={degree}>
                  {degree}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Delivery mode</label>
            <select
              value={filters.deliveryMode}
              onChange={(event) => setFilters((prev) => ({ ...prev, deliveryMode: event.target.value }))}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm capitalize focus:border-teal-500 focus:outline-none"
            >
              <option value="all">All</option>
              {options.deliveryModes.map((mode) => (
                <option key={mode} value={mode} className="capitalize">
                  {mode}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">EMI options</label>
            <select
              value={filters.emi}
              onChange={(event) => setFilters((prev) => ({ ...prev, emi: event.target.value }))}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-teal-500 focus:outline-none"
            >
              <option value="all">All</option>
              <option value="yes">EMI available</option>
              <option value="no">No EMI</option>
            </select>
          </div>

          <div className="flex flex-col justify-end">
            <button
              type="button"
              onClick={resetFilters}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-teal-400 hover:text-teal-600"
            >
              Reset filters
            </button>
          </div>
        </div>
      </div>

      {filteredPrograms.length === 0 ? (
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-12 text-center">
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">No matches yet</h2>
          <p className="text-slate-600 mb-6">
            Try adjusting your filters or tell us about your goals for tailored suggestions.
          </p>
          <a href="/lead-form" className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-semibold">
            Get personalised guidance
          </a>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => {
            const durationLabel = formatDuration(program.durationMonths);
            const modeLabel = formatDeliveryMode(program.deliveryMode);
            const highlightPoints = getHighlightPoints(program.highlights, program.outcomes);

            return (
              <article
                key={program.id}
                className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(173,70%,95%)] px-3 py-1 text-[0.7rem] font-semibold tracking-[0.16em] text-[hsl(172,60%,32%)]">
                      {program.degreeType}
                    </span>
                    {program.emiAvailable ? (
                      <span className="rounded-full bg-[hsl(150,80%,94%)] px-3 py-1 text-[0.65rem] font-semibold tracking-[0.14em] text-[hsl(151,60%,32%)]">
                        EMI OPTIONS
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-5 space-y-2">
                    <h2 className="text-[1.625rem] font-semibold leading-tight tracking-tight text-slate-900">
                      {program.title}
                    </h2>
                    <p className="text-[0.65rem] uppercase tracking-[0.28em] text-slate-400">
                      {program.institutionName ?? 'Partner Institution'}
                      {program.institutionLocation ? ` • ${program.institutionLocation}` : ''}
                    </p>
                  </div>

                  <div className="mt-6 space-y-3 text-[0.9rem]">
                    {durationLabel ? (
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-slate-400">
                          Duration
                        </span>
                        <span className="text-sm font-medium text-slate-900">{durationLabel}</span>
                      </div>
                    ) : null}
                    {modeLabel ? (
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-slate-400">
                          Learning Model
                        </span>
                        <span className="text-sm font-medium text-slate-900">{modeLabel}</span>
                      </div>
                    ) : null}
                    {typeof program.totalFee === 'number' ? (
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-slate-400">
                          Total Investment
                        </span>
                        <span className="text-sm font-semibold text-slate-900">₹{program.totalFee.toLocaleString('en-IN')}</span>
                      </div>
                    ) : null}
                  </div>

                  {highlightPoints.length > 0 && (
                    <ul className="mt-6 space-y-2 rounded-2xl bg-slate-50/90 p-4 text-sm leading-relaxed text-slate-600">
                      {highlightPoints.map((point, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-teal-500" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-8 space-y-4 border-t border-slate-200 pt-6">
                  {program.institutionAccreditation && (
                    <div className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-400">
                      {program.institutionAccreditation}
                    </div>
                  )}
                  <a
                    href="/lead-form"
                    className="block w-full rounded-full bg-teal-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-700 hover:shadow-lg"
                  >
                    Apply Now
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
