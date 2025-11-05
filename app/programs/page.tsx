import { desc, eq, getTableColumns } from "drizzle-orm";

import { db } from "@/db";
import { institutions, programs as programsTable } from "@/db/schema";

import ProgramCatalog from "./ProgramCatalog";

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

async function getPrograms(): Promise<ProgramSummary[]> {
  const programList = await db
    .select({
      ...getTableColumns(programsTable),
      institutionName: institutions.name,
      institutionSlug: institutions.slug,
      institutionLocation: institutions.location,
      institutionAccreditation: institutions.accreditation,
      institutionLogo: institutions.logoUrl,
      institutionHero: institutions.heroImage,
      institutionShortDescription: institutions.shortDescription,
    })
    .from(programsTable)
    .leftJoin(institutions, eq(programsTable.institutionId, institutions.id))
    .orderBy(desc(programsTable.createdAt));

  // Post-process accreditation to only include NAAC and any UGC-entitled mention
  const cleaned = (programList as any[]).map((r) => {
    const acc = (r.institutionAccreditation || '') + ' ' + (r.institutionShortDescription || '');

    // capture NAAC token like 'NAAC A+' or 'NAAC - A+' up to punctuation
    const naacMatch = acc.match(/(NAAC[^,;:\)\(\.]*)/i);
    const naac = naacMatch ? naacMatch[1].trim() : null;



      return {
        ...r,
        institutionAccreditation: naac || null,
      };
  });

  return cleaned as ProgramSummary[];
}

export const revalidate = 300;

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default async function ProgramsPage({ searchParams }: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const programs = await getPrograms();
  const resolvedSearchParams = await (searchParams as Promise<Record<string, any>> | undefined);
  const initialQuery = typeof resolvedSearchParams?.university === 'string' ? resolvedSearchParams.university : '';
  // support ?degree=... (single or repeated) — prefer the first value as initial degree filter
  let initialDegree = 'all';
  if (resolvedSearchParams) {
    const d = resolvedSearchParams.degree;
    if (Array.isArray(d) && d.length > 0) initialDegree = String(d[0]);
    else if (typeof d === 'string') initialDegree = d;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero - smaller on mobile */}
      <section className="pt-20 md:pt-32 pb-12 px-4 sm:px-6 bg-gradient-to-b from-[var(--brand)]/5 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-3 px-3 py-1.5 bg-[var(--brand)]/10 text-[var(--brand)] rounded-full text-xs sm:text-sm font-semibold">
            {programs.length}+ Degree Programs Available
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">
            Find Your Perfect Degree Program
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-slate-600 mb-8 sm:mb-12 max-w-3xl mx-auto">
            Compare fees, specializations, and universities across India's top online degree programs
          </p>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[var(--brand)]/5 to-[var(--brand)]/10 border-2 border-[var(--brand)]/10 rounded-2xl p-6 sm:p-8 max-w-xl sm:max-w-2xl mx-auto">
            <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">
              Not Sure Where to Start?
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">
              Get personalized program recommendations based on your career goals, budget, and eligibility
            </p>
            <a
              href="/lead-form"
              className="inline-block bg-[var(--brand)] hover:bg-[var(--brand)]/90 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Get Free Counselling
            </a>
          </div>
        </div>
      </section>

      {/* Program Finder/Filter + Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              All Degree Programs
            </h2>
            <p className="text-slate-600">
              Use filters below to narrow down your options
            </p>
          </div>
      <ProgramCatalog programs={programs} initialQuery={initialQuery} initialDegree={initialDegree} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
