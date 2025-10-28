import { db } from "@/db";
import { institutions } from "@/db/schema";

export default async function BrochureResources() {
  const brochures = [
    {
      university: "NMIMS",
      program: "MBA in Business Analytics",
      logoUrl: "/logos/nmims.png",
      size: "2.3 MB",
      pages: "24 pages",
      icon: "🏛️",
      filename: "nmims.pdf"
    },
    {
      university: "Manipal",
      program: "MBA in Digital Marketing",
      logoUrl: "/logos/manipal.svg",
      size: "1.8 MB",
      pages: "20 pages",
      icon: "🎓",
      filename: "manipal.pdf"
    },
    {
      university: "Jain University",
      program: "MBA in Finance",
      logoUrl: "/logos/jain.png",
      size: "2.1 MB",
      pages: "22 pages",
      icon: "📚",
      filename: "jain.pdf"
    },
    {
  university: "Amity University",
  program: "MBA in HR Management",
  logoUrl: "/logos/amity.jpeg",
      size: "1.9 MB",
      pages: "18 pages",
      icon: "🎯",
      filename: "amity.pdf"
    },
    {
      university: "LPU",
      program: "MBA in Operations",
      logoUrl: "/logos/LPU.svg",
      size: "2.5 MB",
      pages: "26 pages",
      icon: "🎓",
      filename: "lpu.pdf"
    },
    {
      university: "Chandigarh University",
      program: "MBA in IT Management",
      logoUrl: "/logos/chandighar.jpeg",
      size: "2.0 MB",
      pages: "21 pages",
      icon: "🏫",
      filename: "chandigarh.pdf"
    },
  ];

  // Server-side: fetch up to 3 institutions and render brochure-style cards for them.
  // This ensures the brochure area shows the actual partner institutions from DB.
  const rows = await db
    .select({ id: institutions.id, name: institutions.name, slug: institutions.slug, logo: institutions.logoUrl, heroImage: institutions.heroImage })
    .from(institutions)
    .limit(3);

  const matched = (rows as any[]).map((r: any) => {
    const slug = r.slug ?? (r.name || '').toLowerCase().replace(/\s+/g, '-');
    const filename = `${slug}.pdf`;
    const heroImageUrl = r.heroImage ?? null;
    return {
      university: r.name ?? 'Partner Institution',
      program: 'MBA — Upskillers Counselling Support',
      logoUrl: r.logo ?? `/logos/${slug}.png`,
      heroImageUrl,
      size: '-',
      pages: '-',
      icon: '🏛️',
      filename,
    };
  });

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Download Program Brochures
          </h2>
          <p className="text-xl text-slate-600">
            Get detailed information about curriculum, fees, and admission process
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matched.map((brochure, index) => (
            <div
              key={brochure.filename ?? index}
              className="group bg-white rounded-2xl p-3 md:p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-transform hover:-translate-y-1 flex flex-col h-full min-h-[14rem]"
            >
              {brochure.heroImageUrl ? (
                <div className="mb-3 overflow-hidden rounded-xl">
                  <img src={brochure.heroImageUrl} alt={`${brochure.university} hero`} className="w-full h-24 md:h-36 object-cover" />
                </div>
              ) : null}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0 bg-white border-2 border-[var(--brand)] shadow-sm">
                  <img src={brochure.logoUrl || '/logo.jpg'} alt={`${brochure.university} logo`} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 mb-1 text-base md:text-lg truncate">
                    {brochure.university}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 truncate">{brochure.program ?? 'MBA — Upskillers Counselling Support'}</p>
                </div>

                <div className="text-sm text-slate-400 opacity-80">{/* reserved */}</div>
              </div>

              <div className="flex items-center gap-2 mb-4 text-sm text-slate-600">
                <div className="inline-flex items-center gap-2 bg-slate-50 px-2 py-1 rounded-full text-[12px]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-slate-400"><path fill="currentColor" d="M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM13 3.5V9h5.5L13 3.5z"/></svg>
                  <span className="font-semibold">PDF</span>
                </div>

                <div className="text-xs text-slate-500 flex items-center gap-3">
                  <span className="hidden md:inline">{brochure.size ?? '—'}</span>
                  <span className="hidden md:inline">{brochure.pages ?? '—'}</span>
                </div>
              </div>

              <div className="mt-auto">
                <a
                  href={`/brochure/${brochure.filename}`}
                  download
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 px-4 py-2 md:px-6 md:py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#8b0f2e] to-[#6d0a22] shadow hover:brightness-95 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current opacity-90"><path d="M12 16l4-5h-3V4h-2v7H8l4 5zM6 18h12v2H6z"/></svg>
                  <span>Download Brochure</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-2xl bg-[var(--brand)]/6 border border-[var(--brand)]/10 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Need Help Choosing?
          </h3>
          <p className="text-slate-600 mb-4">
            Talk to our counselors to get personalized program recommendations
          </p>
          <a
            href="/lead-form"
            className="inline-block px-8 py-3 rounded-full font-semibold transition-all bg-[var(--brand)] text-white shadow-sm hover:shadow"
          >
            Get Free Counselling
          </a>
        </div>
      </div>
    </section>
  );
}
