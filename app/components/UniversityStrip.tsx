import { desc, inArray } from "drizzle-orm";
import { db } from "@/db";
import { institutions } from "@/db/schema";
import { programs } from "@/db/schema";

type InstRow = {
  id: number;
  name: string;
  slug?: string | null;
  logoUrl?: string | null;
};

export default async function UniversityStrip() {
  const rows = await db
    .select({
      id: institutions.id,
      name: institutions.name,
      slug: institutions.slug,
      logoUrl: institutions.logoUrl,
    })
    .from(institutions)
    .orderBy(desc(institutions.createdAt))
    .limit(8);

  const institutionsList: InstRow[] = rows.map((r: any) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    logoUrl: r.logoUrl ?? r.heroImage ?? null,
  }));

  // Fetch program counts for these institutions (small, efficient server-side query)
  const ids = institutionsList.map((i) => i.id);
  let programCounts: Record<number, number> = {};
  if (ids.length > 0) {
    const progRows: { institutionId: number }[] = await db
      .select({ institutionId: programs.institutionId })
      .from(programs)
      .where(inArray(programs.institutionId, ids));

    programCounts = progRows.reduce((acc: Record<number, number>, r: any) => {
      const k = Number(r.institutionId);
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {});
  }

  return (
    <section className="py-16 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Trusted universities we partner with
          </h2>
          <p className="text-md text-slate-600 mt-3">All institutions are UGC-entitled and accredited</p>
        </div>

  <div className="mx-auto w-full max-w-6xl">
          {/* center a fixed-column inline-grid so 4 tiles sit centered on wide screens */}
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 md:gap-8 lg:gap-10">
          {institutionsList.map((uni) => (
            <a
              key={uni.id}
              href={`/programs?university=${encodeURIComponent(uni.slug ?? String(uni.id))}`}
              aria-label={`View programs from ${uni.name}`}
              className="flex flex-col justify-center items-center text-center p-4 bg-white rounded-lg border border-slate-200 hover:border-[rgba(138,13,40,0.12)] transition-shadow duration-150 hover:shadow-md w-[220px] h-56"
            >
              <div className="w-full mb-3 rounded bg-white flex items-center justify-center px-4 py-2 h-20 sm:h-24">
                <img src={uni.logoUrl || '/logo.jpg'} alt={`${uni.name} logo`} className="max-h-full object-contain" />
              </div>

              <h3 className="text-sm font-semibold text-slate-900 mb-1 px-2 leading-snug">{uni.name}</h3>

              <div className="mt-1">
                <span className="text-xs text-slate-500">{(programCounts[uni.id] || 0) + " program" + ((programCounts[uni.id] || 0) === 1 ? "" : "s")}</span>
              </div>
            </a>
          ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <a href="/programs" className="inline-block px-5 py-3 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: 'var(--brand)' }}>
            View all partner institutions
          </a>
        </div>
      </div>
    </section>
  );
}
