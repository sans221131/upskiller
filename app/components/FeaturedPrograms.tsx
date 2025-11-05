import { desc, eq, getTableColumns } from "drizzle-orm";
import { db } from "@/db";
import { programs as programsTable, institutions } from "@/db/schema";
import { getCloudinaryFetchUrl } from "../lib/cloudinary";

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
  // highlights removed from UI per design
  // highlights: string[];
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
      institutionShortDescription: institutions.shortDescription,
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
        institutionShortDescription: institutions.shortDescription,
      })
      .from(programsTable)
      .leftJoin(institutions, eq(programsTable.institutionId, institutions.id))
      .orderBy(desc(programsTable.createdAt))
      .limit(12);
  }

  // Map DB rows to UI items
  const mapped = (rows as any[]).map((r: any) => {
    // Do not surface highlights in the featured cards (removed by design)

    return {
      id: r.id,
      university: r.institutionName ?? "",
      logoUrl: getCloudinaryFetchUrl(r.institutionLogo ?? r.heroImage ?? undefined) ?? (r.institutionLogo ?? r.heroImage ?? undefined),
      imageUrl: getCloudinaryFetchUrl(r.heroImage ?? undefined) ?? (r.heroImage ?? undefined),
      // extract only NAAC token (if present) from accreditation or shortDescription
      naac: (() => {
        const acc = (r.institutionAccreditation || '') + ' ' + (r.institutionShortDescription || '');
        const m = acc.match(/(NAAC[^,;:\)\(\.]*)/i);
        return m ? m[1].trim() : undefined;
      })(),
      nirf: undefined,
      title: r.title,
      mode: r.deliveryMode ?? undefined,
      duration: r.durationMonths ? `${r.durationMonths} months` : undefined,
      emi: r.totalFee
        ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(r.totalFee)
        : undefined,
  // highlights omitted
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

function formatDurationShort(months: number | null) {
  if (!months) return null;
  const years = months / 12;
  if (Number.isInteger(years)) return `${months} mo • ${years}y`;
  return `${months} mo • ${years.toFixed(1)}y`;
}

function formatDeliveryModeShort(mode: string | null | undefined) {
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

export default async function FeaturedPrograms({ title, subtitle }: FeaturedProgramsProps) {
  const items = await getFeaturedPrograms();

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{title ?? 'Most trusted Online Higher Education'}</h2>
          <p className="text-lg text-slate-600">{subtitle ?? 'Handpicked degree programs from trusted universities'}</p>
        </div>

  {/* Mobile: show two cards per row for a denser grid; keep md+ layout unchanged */}
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.slice(0, 6).map((p, idx) => (
            <div key={idx} className={"group relative bg-white rounded-3xl border border-slate-100 p-3 md:p-6 shadow-sm overflow-hidden transition-all hover:shadow-lg flex flex-col h-full min-h-[14rem] pb-12 md:pb-0"}>
              {/* card content - no permanent bottom whitespace; padding added on hover */}
                <div className="flex flex-col justify-between pb-0 md:group-hover:pb-16 transition-all duration-200">
                <div className="flex-1">
                {/* Header: logo + accreditation chips */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-lg flex items-center justify-center border">
                      <img src={p.logoUrl || '/logo.jpg'} alt={`${p.university} logo`} className="w-6 h-6 md:w-10 md:h-10 object-contain" />
                    </div>
                    <div>
                      <h4 className="text-xs md:text-sm font-bold text-slate-900">{p.university}</h4>
                      <div className="flex gap-2 mt-1">
                        {p.naac && <span className="text-[10px] md:text-[0.65rem] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded">{p.naac.split(';')[0]}</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {p.imageUrl && (
                  <div className="mb-3 rounded-lg overflow-hidden shadow-sm">
                    <img src={p.imageUrl} alt={`${p.university} campus`} className="w-full h-24 md:h-32 object-cover" />
                  </div>
                )}

                <h3 className="text-lg md:text-2xl font-bold text-slate-900 mb-2 line-clamp-3">{p.title}</h3>

                {/* Facts row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 p-2 bg-slate-50 rounded-xl">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Mode</div>
                    <div className="text-xs md:text-sm font-bold text-slate-900">{formatDeliveryModeShort(p.mode) ?? '—'}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Duration</div>
                    <div className="text-xs md:text-sm font-bold text-slate-900">{formatDurationShort(p.duration as any) ?? '—'}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Fee</div>
                    <div className="text-xs md:text-sm font-bold text-green-600">{p.emi ?? '—'}</div>
                  </div>
                </div>

                {/* highlights removed from featured cards per request */}

                </div>

                {/* Visible View button for mobile (desktop keeps hover action bar) - absolute to align with other cards */}
                <div className="absolute left-4 right-4 bottom-4 md:hidden">
                  <a href={`/programs/${p.id}`} className="inline-block w-full text-center bg-[var(--brand)] text-white px-3 py-2 rounded-full font-semibold">View</a>
                </div>
              </div>

              {/* absolute action bar slides up on hover */}
                <div className="absolute left-4 right-4 bottom-4 z-20 opacity-0 translate-y-4 pointer-events-none md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:pointer-events-auto transition-all duration-200 hidden md:block">
                <div className="flex items-center gap-4 pt-4 border-t border-slate-200 bg-white/90 backdrop-blur-sm rounded-b-2xl px-4 py-2">
                  <a
                    href={`/programs/${p.id}`}
                    className="inline-flex items-center justify-center bg-[var(--brand)] text-white px-5 py-2 rounded-full font-semibold"
                  >
                    View
                  </a>

                  <a
                    href="/lead-form"
                    className="inline-flex items-center justify-center bg-white text-[var(--brand)] border border-[var(--brand)] px-4 py-2 rounded-full font-semibold shadow"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
