"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  highlights?: string | null; // ignored in UI
  applicationDeadline?: string | null;
  brochureUrl?: string | null;
  logoUrl?: string | null;
};

type Props = {
  programs: ProgramCard[];
};

export default function HeroClient({ programs }: Props) {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % Math.max(1, programs.length));
    }, 4500);
    return () => clearInterval(t);
  }, [programs.length]);

  const go = (idx: number) =>
    setCurrent(
      ((idx % Math.max(1, programs.length)) + Math.max(1, programs.length)) %
        Math.max(1, programs.length)
    );

  const formatDate = (iso?: string | null) =>
    iso
      ? new Date(iso).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Open";

  const capitalize = (s?: string | null) => {
    if (!s) return s || '';
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  };

  return (
    <section className="pt-12 sm:pt-20 md:pt-32 pb-12 px-4 sm:px-6 bg-gradient-to-b from-blue-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
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

            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
              Find your perfect degree program across top Indian universities
            </h1>
            <p className="text-base sm:text-xl text-slate-600 mb-4 sm:mb-8 leading-relaxed">
              Compare fees, specializations, mode, and eligibility across all degrees. Get
              counsellor guidance.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-8">
              <a
                href="/programs"
                className="px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-lg font-semibold transition-all shadow-lg text-center"
                style={{
                  backgroundColor: "var(--brand)",
                  color: "var(--brand-contrast)",
                  boxShadow: "0 10px 30px rgba(46,124,116,0.12)",
                }}
              >
                Browse Programs
              </a>
            </div>
          </div>

          {/* Right – Slideshow */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 border border-slate-200 overflow-hidden">
              <div className="relative min-h-[260px] md:h-[30rem]">
                {programs.map((p, i) => {
                  const active = i === current;
                  return (
                    <div
                      key={p.id}
                      className={[
                        "transition-opacity duration-700 ease-in-out transform md:absolute md:inset-0",
                        active ? "block" : "hidden md:block",
                        active
                          ? "opacity-100 md:translate-y-0"
                          : "opacity-0 md:pointer-events-none",
                      ].join(" ")}
                    >
                      <div className="w-full flex flex-col md:flex-row items-stretch gap-4 h-full">
                        {/* Program panel */}
                        <div
                          className="flex-1 rounded-2xl p-3 md:p-6 text-white shadow-lg flex flex-col justify-between h-full"
                          style={{
                            background:
                              "linear-gradient(135deg, var(--brand), var(--brand-teal-light))",
                          }}
                        >
                          <div className="flex flex-col justify-center flex-grow">
                            <h4 className="text-xs md:text-sm uppercase font-semibold opacity-80">
                              {p.university}
                            </h4>
                            <h3 className="text-base md:text-2xl lg:text-3xl font-bold mt-2 leading-tight whitespace-normal break-words">
                              {p.title}
                            </h3>
                            <div className="mt-2 text-sm opacity-90">
                              {p.mode ? capitalize(p.mode) : '—'} {p.duration ? `• ${p.duration}` : ""}
                            </div>
                          </div>

                          <div className="mt-3">
                            <div className="text-sm md:text-base font-semibold">
                              {p.fee}
                              <span className="text-xs md:text-sm font-medium opacity-80 ml-2">
                                {p.emi ? `(${p.emi})` : ""}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Meta / Actions */}
                        <div className="w-full md:w-72 lg:w-80 bg-white rounded-2xl p-3 md:p-4 flex flex-col justify-between border border-slate-100 h-full">
                          {/* Logo */}
                          <div className="mb-3 flex flex-col items-center">
                            <img
                              src={p.logoUrl || "/logo.jpg"}
                              alt={`${p.university} logo`}
                              className="h-12 w-28 md:h-16 md:w-32 object-contain"
                            />
                            <div className="mt-2 text-xs md:text-sm font-medium text-slate-700 text-center">
                              {p.university}
                            </div>
                          </div>

                          {/* NEW: At a glance grid (replaces pills block) */}
                          <div className="mt-1">
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                              At a glance
                            </div>
                            <dl className="grid grid-cols-2 gap-2">
                              <div className="bg-slate-50 rounded-lg p-2.5">
                                <dt className="text-[11px] text-slate-500">
                                  Duration
                                </dt>
                                <dd className="text-sm font-semibold text-slate-900 truncate">
                                  {p.duration ?? "—"}
                                </dd>
                              </div>
                              <div className="bg-slate-50 rounded-lg p-2.5">
                                <dt className="text-[11px] text-slate-500">
                                  Mode
                                </dt>
                                <dd className="text-sm font-semibold text-slate-900 truncate">
                                  {p.mode ? capitalize(p.mode) : "—"}
                                </dd>
                              </div>
                              <div className="bg-slate-50 rounded-lg p-2.5">
                                <dt className="text-[11px] text-slate-500">
                                  Total fee
                                </dt>
                                <dd className="text-sm font-semibold text-slate-900 truncate">
                                  {p.fee ?? "—"}
                                </dd>
                              </div>
                              <div className="bg-slate-50 rounded-lg p-2.5">
                                <dt className="text-[11px] text-slate-500">
                                  EMI
                                </dt>
                                <dd className="text-sm font-semibold text-slate-900 truncate">
                                  {p.emi ?? "—"}
                                </dd>
                              </div>
                              <div className="bg-slate-50 rounded-lg p-2.5">
                                <dt className="text-[11px] text-slate-500">
                                  Apply by
                                </dt>
                                <dd className="text-sm font-semibold text-slate-900 truncate">
                                  {formatDate(p.applicationDeadline)}
                                </dd>
                              </div>
                              <div className="bg-slate-50 rounded-lg p-2.5 col-span-2">
                                <dt className="text-[11px] text-slate-500">
                                  Accreditation
                                </dt>
                                <dd
                                  className="text-sm font-semibold text-slate-900 truncate"
                                  title={p.accreditationFull || p.accreditation || ""}
                                >
                                  {p.accreditation ?? "—"}
                                </dd>
                              </div>
                            </dl>
                          </div>

                          {/* Actions */}
                          <div className="mt-3 flex flex-col sm:flex-row gap-2 items-stretch">
                            <button
                              onClick={() => router.push(`/programs/${p.id}`)}
                              className="flex-1 text-center px-4 py-2 md:px-6 md:py-3 rounded-xl font-semibold flex items-center justify-center shadow-md transition-all"
                              style={{
                                backgroundColor: "var(--brand)",
                                color: "var(--brand-contrast)",
                              }}
                            >
                              View Program
                            </button>

                            <a
                              href={p.brochureUrl || "#"}
                              className="flex-1 bg-white text-center px-4 py-2 md:px-6 md:py-3 rounded-xl font-semibold flex items-center justify-center shadow-sm transition-all"
                              style={{
                                border: "1px solid var(--brand)",
                                color: "var(--brand)",
                              }}
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Controls */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    aria-label="Previous"
                    onClick={() => go(current - 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-100 shadow-md hover:bg-slate-50 focus:outline-none focus:ring-2"
                    style={{
                      color: "var(--brand)",
                      ["--tw-ring-color" as any]: "rgba(46,124,116,0.25)",
                    }}
                  >
                    <span className="text-lg font-bold">‹</span>
                  </button>
                  <button
                    aria-label="Next"
                    onClick={() => go(current + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-100 shadow-md hover:bg-slate-50 focus:outline-none focus:ring-2"
                    style={{
                      color: "var(--brand)",
                      ["--tw-ring-color" as any]: "rgba(46,124,116,0.25)",
                    }}
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
                      className="w-2 h-2 rounded-full"
                        style={{
                        backgroundColor:
                          i === current ? "var(--brand)" : "#e2e8f0",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* /Right */}
        </div>
      </div>
    </section>
  );
}
