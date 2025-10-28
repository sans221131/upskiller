import { desc, eq, getTableColumns } from "drizzle-orm";
import { db } from "@/db";
import { programs as programsTable, institutions } from "@/db/schema";

type ProgramItem = {
  id: number;
  university: string;
  logoUrl?: string;
  imageUrl?: string;
  naac?: string;
  nirf?: string;
  title: string;
  mode?: string;
  duration?: string;
  emi?: string;
  highlights: string[];
};

type FeaturedProgramsProps = {
  title?: string;
  subtitle?: string;
};

async function getFeaturedPrograms(): Promise<ProgramItem[]> {
  // Try to fetch up to 12 featured programs; if none exist, fall back to newest programs.
  let rows = await db
    .select({
      ...(getTableColumns(programsTable) as any),
      institutionName: institutions.name,
      institutionLogo: institutions.logoUrl,
      institutionAccreditation: institutions.accreditation,
    })
    .from(programsTable)
    .leftJoin(institutions, eq(programsTable.institutionId, institutions.id))
    .where(eq(programsTable.isFeatured, true))
    .orderBy(desc(programsTable.createdAt))
    .limit(12);

  if (!rows || rows.length === 0) {
    rows = await db
      .select({
        ...(getTableColumns(programsTable) as any),
        institutionName: institutions.name,
        institutionLogo: institutions.logoUrl,
        institutionAccreditation: institutions.accreditation,
      })
      .from(programsTable)
      .leftJoin(institutions, eq(programsTable.institutionId, institutions.id))
      .orderBy(desc(programsTable.createdAt))
      .limit(12);
  }

  // Map DB rows to UI items
  const mapped = (rows as any[]).map((r: any) => {
    const highlightsText: string = r.highlights ?? "";
    const hs = highlightsText
      .split(/\r?\n|;|•|\u2022|\.|\u2023/)
      .map((s: string) => s.trim())
      .filter(Boolean)
      .slice(0, 3);

    return {
      id: r.id,
      university: r.institutionName ?? "",
      logoUrl: r.institutionLogo ?? r.heroImage ?? undefined,
      imageUrl: r.heroImage ?? undefined,
      naac: r.institutionAccreditation ?? undefined,
      nirf: undefined,
      title: r.title,
      mode: r.deliveryMode ?? undefined,
      duration: r.durationMonths ? `${r.durationMonths} months` : undefined,
      emi: r.totalFee
        ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(r.totalFee)
        : undefined,
      highlights: hs,
    } as ProgramItem;
  });

  // Shuffle mapped results using Fisher-Yates so each load shows a randomized selection
  for (let i = mapped.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = mapped[i];
    mapped[i] = mapped[j];
    mapped[j] = tmp;
  }

  // Return up to 6 randomized items
  return mapped.slice(0, 6);
}

export default async function FeaturedPrograms({ title, subtitle }: FeaturedProgramsProps) {
  const items = await getFeaturedPrograms();

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{title ?? 'Most trusted Online Higher Education'}</h2>
          <p className="text-lg text-slate-600">{subtitle ?? 'Handpicked MBA programs from trusted universities'}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {items.slice(0, 6).map((p, idx) => (
            <div key={idx} className={"group relative bg-white rounded-3xl border border-slate-100 p-4 md:p-6 shadow-sm overflow-hidden transition-all hover:shadow-lg flex flex-col h-full"}>
              {/* Header: logo + accreditation chips */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center border">
                    <img src={p.logoUrl || '/logo.jpg'} alt={`${p.university} logo`} className="w-10 h-10 object-contain" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{p.university}</h4>
                    <div className="flex gap-2 mt-1">
                      {p.naac && <span className="text-[0.65rem] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded">{p.naac.split(';')[0]}</span>}
                    </div>
                  </div>
                </div>
              </div>

              {p.imageUrl && (
                <div className="mb-4 rounded-lg overflow-hidden shadow-sm">
                  <img src={p.imageUrl} alt={`${p.university} campus`} className="w-full h-32 object-cover" />
                </div>
              )}

              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">{p.title}</h3>

              {/* Facts row */}
              <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-slate-50 rounded-xl">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Mode</div>
                  <div className="text-sm font-bold text-slate-900">{p.mode ?? '—'}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Duration</div>
                  <div className="text-sm font-bold text-slate-900">{p.duration ?? '—'}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Fee</div>
                  <div className="text-sm font-bold text-green-600">{p.emi ?? '—'}</div>
                </div>
                <div></div>
              </div>

              <ul className="space-y-1 mb-4">
                {p.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="inline-block w-1.5 h-1.5 bg-[var(--brand)] rounded-full mt-1.5 flex-shrink-0"></span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="relative pt-4 border-t border-slate-200 flex items-center justify-between gap-4 mt-auto opacity-0 -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                <a
                  href={`/programs/${p.id}`}
                  className="inline-flex items-center justify-center bg-[var(--brand)] text-white px-5 py-2 rounded-full font-semibold"
                >
                  View Details
                </a>

                <a
                  href="/lead-form"
                  className="inline-flex items-center justify-center bg-white text-[var(--brand)] border border-[var(--brand)] px-4 py-2 rounded-full font-semibold shadow"
                >
                  Apply Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
