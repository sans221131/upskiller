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
    })
    .from(programsTable)
    .leftJoin(institutions, eq(programsTable.institutionId, institutions.id))
    .orderBy(desc(programsTable.createdAt));

  return programList;
}

export const revalidate = 300;

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-xl font-bold text-slate-900">Upskillers</span>
          </a>
          <a
            href="/lead-form"
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all"
          >
            Get Matched
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Explore Our Programs
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
            Browse through 60+ carefully curated programs from top institutions.
            Find the perfect match for your career goals.
          </p>

          {/* CTA */}
          <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Get Personalized Recommendations
            </h3>
            <p className="text-slate-600 mb-6">
              Answer a few questions and we'll match you with programs that fit
              your profile, budget, and goals.
            </p>
            <a
              href="/lead-form"
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full font-semibold transition-all"
            >
              Start Assessment (2 mins)
            </a>
          </div>
        </div>
      </section>

      {/* Program Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <ProgramCatalog programs={programs} />
        </div>
      </section>
    </div>
  );
}
