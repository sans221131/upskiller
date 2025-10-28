"use client";

import { useState, useEffect } from "react";

export type ProgramCard = {
  id: string | number;
  title: string;
  university: string;
  mode: string;
  duration: string | null;
  fee: string | null;
  emi?: string | null;
  seats?: number | null;
  accreditation?: string | null;
  accreditationFull?: string | null;
  placementAvg?: string | null;
  highlights?: string | null;
  applicationDeadline?: string | null; // ISO date string (YYYY-MM-DD) or null
  brochureUrl?: string | null;
  logoUrl?: string | null;
};

type Props = {
  programs: ProgramCard[];
};

export default function HeroClient({ programs }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % Math.max(1, programs.length));
    }, 4500);
    return () => clearInterval(t);
  }, [programs.length]);

  const go = (idx: number) =>
    setCurrent(((idx % Math.max(1, programs.length)) + Math.max(1, programs.length)) % Math.max(1, programs.length));

  // Render highlights as a small bullet list when possible.
  const renderHighlightsList = (h?: string | null) => {
    if (!h) return null;

    // First, split on common separators (newlines, semicolons, bullet chars)
    let parts = h.split(/\r?\n|;|•|\u2022/).map((s) => s.trim()).filter(Boolean);

    // If that produced a single long string, try splitting into sentences.
    if (parts.length === 1) {
      const sentenceParts = parts[0].split(/(?<=[.?!])\s+/).map((s) => s.trim()).filter(Boolean);
      if (sentenceParts.length > 1) parts = sentenceParts;
    }

    // Limit to 2 short highlights for the hero card and truncate each to 80 chars.
    parts = parts.slice(0, 2).map((s) => (s.length > 80 ? s.slice(0, 80).trim() + '…' : s));

    return (
      <ul className="list-disc list-inside mt-1 text-sm text-slate-700 space-y-1 text-left">
        {parts.map((it, idx) => (
          <li key={idx} className="leading-snug">
            {it}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className="pt-20 sm:pt-28 md:pt-32 pb-20 px-6 bg-gradient-to-b from-blue-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-block px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-200">
                UGC-entitled
              </span>
              <span className="inline-block px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-200">
                NAAC A/A+
              </span>
              <span className="inline-block px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold border border-purple-200">
                NIRF-ranked
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Find your Online MBA across top Indian universities
            </h1>

            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Compare fees, specializations, mode, and eligibility. Get counsellor guidance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="/programs"
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all shadow-lg text-center"
                style={{ backgroundColor: 'var(--brand)', color: 'var(--brand-contrast)', boxShadow: '0 10px 30px rgba(138,13,40,0.12)' }}
              >
                Browse Programs
              </a>
            </div>
          </div>

          {/* Right side - Slideshow */}
            <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-6 border border-slate-200 overflow-hidden">
              {/* Ensure a reasonable minimum height on small screens so absolute slides don't collapse */}
              <div className="relative min-h-[280px] md:h-96">
                {programs.map((p, i) => (
                  <div
                    key={p.id}
                    // On small screens make slides participate in normal flow (block/hidden)
                    // so the container can expand to fit content. On md+ keep absolute
                    // positioning and transition-based slideshow.
                    className={
                      (() => {
                        const active = i === current;
                        const base = `transition-opacity duration-700 ease-in-out transform md:absolute md:inset-0`;
                        // small screens: show only active slide (block) and hide others (hidden)
                        const small = active ? 'block' : 'hidden md:block';
                        // md+ screens: use opacity/translate for transitions
                        const desktop = active ? 'opacity-100 md:translate-y-0' : 'opacity-0 md:-translate-y-4 md:pointer-events-none';
                        return `${base} ${small} ${desktop}`;
                      })()
                    }
                  >
                    <div className="w-full flex flex-col md:flex-row items-stretch gap-4 h-full">
                      <div className="flex-1 rounded-2xl p-4 md:p-6 text-white shadow-lg flex flex-col justify-between" style={{ background: 'linear-gradient(135deg, var(--brand), #65071f)' }}>
                        <div>
                          <h4 className="text-xs md:text-sm uppercase font-semibold opacity-80">{p.university}</h4>
                          <h3 className="text-lg md:text-2xl lg:text-3xl font-bold mt-2 leading-tight">{p.title}</h3>
                          <div className="mt-3 text-sm opacity-90">{p.mode} {p.duration ? `• ${p.duration}` : ''}</div>
                        </div>

                        <div className="mt-4">
                          <div className="text-base md:text-lg font-semibold">{p.fee} <span className="text-xs md:text-sm font-medium opacity-80 ml-2">{p.emi ? `(${p.emi})` : ''}</span></div>
                        </div>
                      </div>

                      <div className="w-full md:w-72 lg:w-80 bg-white rounded-2xl p-4 md:p-4 flex flex-col justify-between border border-slate-100">
                        <div className="mb-3 flex flex-col items-center">
                          <img src={p.logoUrl || "/logo.jpg"} alt={`${p.university} logo`} className="h-14 object-contain" />
                          <div className="mt-2 text-sm font-medium text-slate-700 text-center">{p.university}</div>
                        </div>

                        <div>
                          <ul className="mt-4 text-sm text-slate-700 space-y-2">
                            <li>
                              <span className="font-medium">Highlights:</span>
                              <div className="mt-1">
                                {p.highlights ? (
                                  renderHighlightsList(p.highlights)
                                ) : (
                                  <span className="text-slate-400">—</span>
                                )}
                              </div>
                            </li>

                            <li>
                              <span className="font-medium">Accreditation:</span>{' '}
                              {p.accreditation ? (
                                <span title={p.accreditationFull ?? ''} className="inline-block text-sm text-slate-700">
                                  {p.accreditation}
                                </span>
                              ) : (
                                <span className="text-slate-400">—</span>
                              )}
                            </li>

                            <li>
                              <span className="font-medium">Apply by:</span>{' '}
                              {p.applicationDeadline ? (
                                <time className="text-slate-700" dateTime={p.applicationDeadline}>{new Date(p.applicationDeadline).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</time>
                              ) : (
                                <span className="text-slate-400">Open</span>
                              )}
                            </li>

                            <li><span className="font-medium">Mode:</span> {p.mode}</li>
                          </ul>
                        </div>

                        <div className="mt-4 flex flex-col sm:flex-row gap-3 items-stretch">
                          <a
                            href={`/programs?program=${p.id}`}
                            className="flex-1 text-center px-6 py-3 rounded-xl font-semibold flex items-center justify-center shadow-md transition-all"
                            style={{ backgroundColor: 'var(--brand)', color: 'var(--brand-contrast)' }}
                          >
                            View Program
                          </a>

                          <a
                            href={p.brochureUrl || '#'}
                            className="flex-1 bg-white text-center px-6 py-3 rounded-xl font-semibold flex items-center justify-center shadow-sm transition-all"
                            style={{ border: '1px solid var(--brand)', color: 'var(--brand)' }}
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Controls */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    aria-label="Previous"
                    onClick={() => go(current - 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-100 shadow-md hover:bg-slate-50 focus:outline-none focus:ring-2"
                    style={{ color: 'var(--brand)', ['--tw-ring-color' as any]: 'rgba(138,13,40,0.25)' }}
                  >
                    <span className="text-lg font-bold">‹</span>
                  </button>
                  <button
                    aria-label="Next"
                    onClick={() => go(current + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-100 shadow-md hover:bg-slate-50 focus:outline-none focus:ring-2"
                    style={{ color: 'var(--brand)', ['--tw-ring-color' as any]: 'rgba(138,13,40,0.25)' }}
                  >
                    <span className="text-lg font-bold">›</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {programs.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => go(i)}
                      className={`w-2 h-2 rounded-full`}
                      style={{ backgroundColor: i === current ? 'var(--brand)' : '#e2e8f0' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
