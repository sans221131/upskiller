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
  // Normalizer for fuzzy matching
  const normalise = (s: string) => (s || "").toString().toLowerCase().replace(/[^a-z0-9]/g, "");

  // Desired deterministic display order
  const desiredNames = [
    "NMIMS",
    "DY Patil University ( DPU )",
    "Amity University",
    "Manipal Unversity Jaipur ( MUJ )",
    "Sikkim Manipal University ( SMU )",
    "Vivekanand Global University ( VGU )",
    "Vellore Institute Of Technology ( VIT )",
  ];

  const keywordMap: Record<string, string[]> = {
    NMIMS: ["nmims", "narsee", "monjee"],
    "DY Patil University ( DPU )": ["dy", "patil", "dypatil", "patiluniversity"],
    "Amity University": ["amity"],
    "Manipal Unversity Jaipur ( MUJ )": ["manipal", "jaipur", "muj"],
    "Sikkim Manipal University ( SMU )": ["sikkim", "manipal", "smu"],
    "Vivekanand Global University ( VGU )": ["vivekanand", "vgu", "vivekanandglobal"],
    "Vellore Institute Of Technology ( VIT )": ["vellore", "vit"],
  };

  // Fetch all institutions once and then order them according to desiredNames
  const allRows = await db
    .select({
      id: institutions.id,
      name: institutions.name,
      slug: institutions.slug,
      logoUrl: institutions.logoUrl,
    })
    .from(institutions);

  const rowsNormalized = allRows.map((r: any) => ({ ...r, _n: normalise(r.name) }));

  const findMatchFor = (dn: string) => {
    // exact name
    const exact = allRows.find((r: any) => String(r.name) === dn);
    if (exact) return exact;

    const nn = normalise(dn);

    // exact normalized
    let f = rowsNormalized.find((r: any) => r._n === nn);
    if (f) return f;

    // substring normalized
    f = rowsNormalized.find((r: any) => r._n.includes(nn));
    if (f) return f;

    // keyword map
    const keys = keywordMap[dn] || [];
    for (const k of keys) {
      const kn = normalise(k);
      const m = rowsNormalized.find((r: any) => r._n.includes(kn));
      if (m) return m;
    }

    return null;
  };

  const ordered = desiredNames
    .map((dn) => findMatchFor(dn))
    .filter(Boolean) as Array<any>;

  const institutionsList: InstRow[] = ordered.map((r: any) => ({
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
          {/* Use a responsive flex-wrap: 2 per row on mobile, expanding on larger screens. */}
          {/* grid: 2 columns on mobile to keep cards small, center items so the last one centers */}
          {/* 2 columns on mobile; use flex-wrap center on md+ so incomplete last row centers */}
          <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:justify-center md:gap-8 lg:gap-10">
          {institutionsList.map((uni) => (
            <a
              key={uni.id}
              href={`/programs?institution=${encodeURIComponent(String(uni.id))}`}
              aria-label={`View programs from ${uni.name}`}
              className="flex flex-col justify-center items-center text-center p-3 bg-white rounded-lg border border-slate-200 hover:border-[rgba(46,124,116,0.12)] transition-shadow duration-150 hover:shadow-md w-[150px] md:w-[220px] min-h-[140px] md:min-h-[180px] min-w-0 last:col-span-2 md:last:col-span-1 justify-self-center"
            >
              <div className="w-full mb-2 rounded bg-white flex items-center justify-center px-3 py-2 h-14 sm:h-20">
                <img src={uni.logoUrl || '/logo.jpg'} alt={`${uni.name} logo`} className="max-h-full object-contain" />
              </div>

              <h3 className="text-sm font-semibold text-slate-900 mb-1 px-2 leading-snug w-full break-words text-center">{uni.name}</h3>

              <div className="mt-1">
                <span className="text-xs text-slate-500">{(programCounts[uni.id] || 0) + " program" + ((programCounts[uni.id] || 0) === 1 ? "" : "s")}</span>
              </div>
            </a>
          ))}
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
