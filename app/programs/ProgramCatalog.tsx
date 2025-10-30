'use client';

import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCloudinaryFetchUrl } from '../lib/cloudinary';

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
  institution?: string | null;
};

const DEFAULT_FILTERS: Filters = {
  query: '',
  degreeType: 'all',
  deliveryMode: 'all',
  emi: 'all',
  institution: null,
};

// highlights/outcomes parsing removed — cards no longer fetch or render the bullet list

function formatDuration(months: number | null) {
  if (!months) return null;
  const years = months / 12;
  if (Number.isInteger(years)) {
    return `${months} months • ${years} ${years === 1 ? 'year' : 'years'}`;
  }
  return `${months} months • ${years.toFixed(1)} years`;
}

function formatDurationShort(months: number | null) {
  if (!months) return null;
  const years = months / 12;
  if (Number.isInteger(years)) {
    return `${months} mo • ${years}y`;
  }
  return `${months} mo • ${years.toFixed(1)}y`;
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

function formatDeliveryModeShort(mode: string | null) {
  if (!mode) return null;
  switch (mode) {
    case 'online':
      return 'Online';
    case 'blended':
      return 'Blended';
    case 'weekend':
      return 'Weekend';
    case 'on-campus':
      return 'On-campus';
    default:
      return mode;
  }
}

function formatFee(fee: number | null) {
  if (fee == null) return null;
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(fee);
  } catch (e) {
    return `₹${fee}`;
  }
}

// Map common institution slugs/names to actual filenames in public/uni and public/logos
const IMAGE_MAP: Record<string, { uni?: string; logo?: string }> = {
  // uni folder
  amityuniversityonline: { uni: '/uni/amity.webp', logo: '/logos/amity.jpeg' },
  amity: { uni: '/uni/amity.webp', logo: '/logos/amity.jpeg' },
  nmims: { uni: '/uni/nmims.jpg', logo: '/logos/nmims.png' },
  manipal: { uni: '/uni/manipal.jpg', logo: '/logos/manipal.svg' },
  jain: { uni: '/uni/jain.jpg', logo: '/logos/jain.png' },
  chandigarh: { uni: '/uni/chandigarh.webp', logo: '/logos/chandighar.jpeg' },
  lpu: { uni: '/uni/lpu.webp', logo: '/logos/LPU.svg' },
  // common variants
  sikkimmanipaluniversity: { uni: '/uni/manipal.jpg', logo: '/logos/manipal.svg' },
  sikkimmanipal: { uni: '/uni/manipal.jpg', logo: '/logos/manipal.svg' },
};

const SVG_PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="480"><rect width="100%" height="100%" fill="#f8fafc"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9ca3af" font-family="Arial, Helvetica, sans-serif" font-size="20">Image not available</text></svg>'
)} `;

export default function ProgramCatalog({ programs, initialQuery = '' }: { programs: ProgramSummary[]; initialQuery?: string }) {
  // Known filename mapping for public images/logos. Filenames in /public vary in
  // casing and extensions, so map common institution slugs/names to the exact
  // files we have in /public/uni and /public/logos.
  const UNI_IMAGE_MAP: Record<string, { image?: string; logo?: string }> = {
    nmims: { image: '/uni/nmims.jpg', logo: '/logos/nmims.png' },
    manipal: { image: '/uni/manipal.jpg', logo: '/logos/manipal.svg' },
    jain: { image: '/uni/jain.jpg', logo: '/logos/jain.png' },
    lpu: { image: '/uni/lpu.webp', logo: '/logos/LPU.svg' },
    amity: { image: '/uni/amity.webp', logo: '/logos/amity.jpeg' },
    chandigarh: { image: '/uni/chandigarh.webp', logo: '/logos/chandighar.jpeg' },
  };

  function findAssets(institutionName?: string | null, institutionSlug?: string | null) {
    const candidates: string[] = [];
    if (institutionSlug) candidates.push(institutionSlug.toLowerCase());
    if (institutionName) candidates.push(institutionName.toLowerCase().replace(/\s+/g, ''));
    if (institutionName) candidates.push(institutionName.toLowerCase());

    for (const c of candidates) {
      // try direct key then a shorter token (e.g. 'jain university' -> 'jain')
      if (UNI_IMAGE_MAP[c]) return UNI_IMAGE_MAP[c];
      if (IMAGE_MAP[c]) {
        const m = IMAGE_MAP[c];
        return { image: m.uni, logo: m.logo };
      }
      const token = c.split(/[^a-z0-9]/i)[0];
      if (UNI_IMAGE_MAP[token]) return UNI_IMAGE_MAP[token];
      if (IMAGE_MAP[token]) {
        const m = IMAGE_MAP[token];
        return { image: m.uni, logo: m.logo };
      }
    }

    return {};
  }
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>({ ...DEFAULT_FILTERS, query: initialQuery });

  // If the URL contains ?institution=<id>, apply an institution filter
  // without populating the text search box — this keeps the search input clean
  // while still filtering precisely by institution id.
  useEffect(() => {
    try {
      const inst = searchParams?.get('institution') ?? searchParams?.get('institutionId') ?? '';
      if (!inst) {
        // clear institution filter if param removed
        setFilters((prev) => (prev.institution ? { ...prev, institution: null } : prev));
        return;
      }

      // ensure it's a numeric id (string ok too)
      const numeric = Number(inst);
      if (Number.isNaN(numeric)) return;

      setFilters((prev) => {
        if (prev.institution === String(numeric)) return prev;
        return { ...prev, institution: String(numeric) };
      });
    } catch (e) {
      // ignore
    }
  }, [searchParams?.toString()]);

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
      // institution filter (exact match by id) — highest precedence
      const matchesInstitution = filters.institution
        ? program.institutionId === Number(filters.institution)
        : true;

      if (!matchesInstitution) return false;
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
  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
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
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-[var(--brand)] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Degree type</label>
            <select
              value={filters.degreeType}
              onChange={(event) => setFilters((prev) => ({ ...prev, degreeType: event.target.value }))}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-[var(--brand)] focus:outline-none"
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
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 capitalize focus:border-[var(--brand)] focus:outline-none"
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
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-[var(--brand)] focus:outline-none"
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
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
          <a href="/lead-form" className="inline-block bg-[var(--brand)] hover:opacity-90 text-white px-6 py-3 rounded-full font-semibold">
            Get personalised guidance
          </a>
        </div>
    ) : (
  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPrograms.map((program) => {
            const durationLabel = formatDuration(program.durationMonths);
            const modeLabel = formatDeliveryMode(program.deliveryMode);
            // highlights removed — no longer computing highlightPoints
            const highlightPoints: string[] = [];
            const assets = findAssets(program.institutionName, program.institutionSlug);

            // If the server provided richer image fields (like institutionLogo or heroImage)
            // prefer those (and run them through Cloudinary fetch) — this mirrors
            // the behavior in FeaturedPrograms which queries the DB directly.
            const maybeInstitutionLogo = (program as any).institutionLogo ?? (program as any).logoUrl ?? (program as any).logo ?? undefined;
            const maybeHeroImage = (program as any).heroImage ?? (program as any).imageUrl ?? undefined;

            const imageSrc =
              getCloudinaryFetchUrl(maybeHeroImage ?? assets.image ?? undefined) ??
              maybeHeroImage ??
              assets.image ??
              undefined;

            const logoSrc =
              getCloudinaryFetchUrl(maybeInstitutionLogo ?? maybeHeroImage ?? assets.logo ?? undefined) ??
              maybeInstitutionLogo ??
              maybeHeroImage ??
              assets.logo ??
              `/logos/${(program.institutionName || '').toLowerCase().replace(/\s+/g, '')}.png`;

            return (
              <article
                key={program.id}
                className="group relative flex h-full flex-col justify-between rounded-3xl border border-slate-100 bg-white p-3 md:p-8 shadow-sm overflow-hidden transition-all hover:shadow-lg min-h-[14rem] pb-12 md:pb-0"
              >
                {/* top content: no permanent bottom whitespace; add padding only on hover so the action row can slide in */}
                <div className="flex flex-col justify-between pb-0 group-hover:pb-16 transition-all duration-200">
                  <div className="flex-1">
                    {/* derive image/logo paths from slug/name when available */}
                    {imageSrc ? (
                      <div className="mb-4 rounded-lg overflow-hidden shadow-sm">
                        <img
                          src={imageSrc}
                          onError={(e) => {
                            const t = e.currentTarget as HTMLImageElement;
                            t.src = SVG_PLACEHOLDER;
                          }}
                          alt={`${program.institutionName} campus`}
                          className="w-full h-28 md:h-44 object-cover"
                        />
                      </div>
                    ) : null}

                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg flex items-center justify-center border">
                          <img
                            src={logoSrc}
                            alt={`${program.institutionName} logo`}
                            className="w-6 h-6 md:w-8 md:h-8 object-contain"
                            onError={(e) => {
                              const t = e.currentTarget as HTMLImageElement;
                              const base = `/logos/${(program.institutionName || '').toLowerCase().replace(/\s+/g, '')}`;
                              if (!t.dataset.try) {
                                t.dataset.try = 'jpeg';
                                t.src = `${base}.jpeg`;
                                return;
                              }
                              if (t.dataset.try === 'jpeg') {
                                t.dataset.try = 'svg';
                                t.src = `${base}.svg`;
                                return;
                              }
                              t.src = SVG_PLACEHOLDER;
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xs md:text-sm font-bold text-slate-900">{program.institutionName ?? 'Partner Institution'}</h3>
                          {program.institutionAccreditation && (
                            <div className="mt-1 flex flex-wrap gap-2">
                              {program.institutionAccreditation
                                .split(/[,;•\u2022\|]+/) // split on common separators
                                .map((s) => s.trim())
                                .filter(Boolean)
                                .slice(0, 6)
                                .map((badge, idx) => (
                                  <span key={idx} className="inline-block bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
                                    {badge}
                                  </span>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {program.emiAvailable ? (
                        <span className="rounded-full bg-slate-50 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.14em] text-[var(--brand)]">
                          EMI OPTIONS
                        </span>
                      ) : null}
                    </div>

                    <div className="mb-2 min-h-[40px]">
                      <h2 className="text-base md:text-2xl font-bold text-slate-900 line-clamp-3">{program.title}</h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3 p-2 bg-slate-50 rounded-xl">
                      <div>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Mode</div>
                        <div className="text-xs md:text-sm font-bold text-slate-900">{formatDeliveryModeShort(program.deliveryMode) ?? '-'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Duration</div>
                        <div className="text-xs md:text-sm font-bold text-slate-900">{formatDurationShort(program.durationMonths) ?? '-'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Fees</div>
                        <div className="text-xs md:text-sm font-bold text-slate-900">{formatFee(program.totalFee) ?? 'TBD'}</div>
                      </div>
                    </div>

                    {/* highlights removed as per design: no bullet list shown */}
                  </div>

                  {/* Visible View button for mobile (desktop keeps hover action bar) - absolute so all cards align */}
                  <div className="absolute left-4 right-4 bottom-4 md:hidden">
                    <a href={`/programs/${program.id}`} className="inline-block w-full text-center bg-[var(--brand)] text-white px-3 py-2 rounded-full font-semibold">View</a>
                  </div>
                </div>

                {/* absolute action bar slides up on hover; content gains bottom padding via group-hover to avoid overlap */}
                <div className="absolute left-4 right-4 bottom-4 md:left-6 md:right-6 md:bottom-6 z-20 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-200 bg-white/90 backdrop-blur-sm rounded-b-2xl px-3 py-2">
                    <a href={`/programs/${program.id}`} className="inline-block bg-[var(--brand)] text-white px-4 py-2 rounded-full font-semibold text-sm">View</a>
                    <a href="/lead-form" className="inline-block bg-white text-[var(--brand)] border border-[var(--brand)] px-3 py-2 rounded-full font-semibold text-sm">Apply Now</a>
                    <a href={`/programs/${program.id}#curriculum`} className="text-sm font-semibold text-[var(--brand)] hover:underline">Curriculum</a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
