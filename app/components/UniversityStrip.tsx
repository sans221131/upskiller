import { desc, inArray } from "drizzle-orm";
import { db } from "@/db";
import { institutions } from "@/db/schema";
import { programs } from "@/db/schema";

type InstRow = {
  id: number;
  name: string;
  slug?: string | null;
  logoUrl?: string | null;
  accreditation?: string | null;
  shortDescription?: string | null;
};

export default async function UniversityStrip() {
  const rows = await db
    .select({
      id: institutions.id,
      name: institutions.name,
      slug: institutions.slug,
      logoUrl: institutions.logoUrl,
      accreditation: institutions.accreditation,
      shortDescription: institutions.shortDescription,
    })
    .from(institutions)
  .orderBy(desc(institutions.createdAt))
  .limit(8);

  const institutionsList: InstRow[] = rows.map((r: any) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    logoUrl: r.logoUrl ?? r.heroImage ?? null,
    accreditation: r.accreditation ?? null,
    shortDescription: r.shortDescription ?? null,
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

  // Helper to pull a short NIRF label if present in shortDescription or accreditation
  const extractNirf = (r: InstRow) => {
    const text = (r.shortDescription || "" ) + " " + (r.accreditation || "");
    const m = text.match(/(NIRF[^,.;]*)/i);
    return m ? m[1].trim() : null;
  };

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
          {/* make the auto-fit min width smaller so mobile shows 2 columns when space allows */}
          {/* Force two columns on the smallest screens, then revert to auto-fit with a smaller min width on sm+ */}
          <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,_minmax(120px,_1fr))] gap-3 sm:gap-6 md:gap-8 lg:gap-10 justify-items-center">
          {institutionsList.map((uni) => (
            <a
              key={uni.id}
              href={`/programs?university=${encodeURIComponent(uni.name)}`}
              aria-label={`View programs from ${uni.name}`}
              // allow grid to size cards on very small screens; keep max width on sm+
              className="flex flex-col items-center text-center p-3 sm:p-6 bg-white rounded-2xl border border-slate-200 hover:border-[rgba(138,13,40,0.12)] transition-shadow duration-150 hover:shadow-md w-full sm:max-w-[320px]"
            >
              <div className="w-full mb-4 rounded-lg bg-white flex items-center justify-center shadow-inner px-6 py-4">
                {/* Make logos larger and cover width of the card area while preserving aspect ratio */}
                <img src={uni.logoUrl || '/logo.jpg'} alt={`${uni.name} logo`} className="w-full max-h-12 sm:max-h-28 object-contain" />
              </div>

              <h3 className="text-xs sm:text-sm font-semibold text-slate-900 mb-2">{uni.name}</h3>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-slate-500">{(programCounts[uni.id] || 0) + " program" + ((programCounts[uni.id] || 0) === 1 ? "" : "s")}</span>
              </div>

              <div className="flex flex-col gap-1 items-center">
                {uni.accreditation ? (
                  <span className="text-[10px] sm:text-[11px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded">{uni.accreditation.split(';')[0]}</span>
                ) : null}
                {extractNirf(uni) ? (
                  <span className="text-[10px] sm:text-[11px] font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded">{extractNirf(uni)}</span>
                ) : null}
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="/programs" className="inline-block px-5 py-3 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: 'var(--brand)' }}>
            View all partner institutions
          </a>
        </div>
      </div>
      </div>
    </section>
  );
}
