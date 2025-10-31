import Image from "next/image";
import { db } from "@/db";
import { institutions } from "@/db/schema";

/**
 * Normalizer for fuzzy name matching.
 */
const normalise = (s: string) =>
  (s || "").toString().toLowerCase().replace(/[^a-z0-9]/g, "");

export default async function Footer() {
  const programs = [
    { name: "All Programs", href: "/programs" },
    // make these absolute paths so clicks from any page navigate to /programs and scroll
    { name: "University Partners", href: "/#universities" },
    { name: "Featured Programs", href: "/#featured" },
  ];

  const degreeLabels = [
    "B.Com",
    "BBA",
    "BCA",
    "B.Sc.",
    "BA",
    "MBA",
    "MCA",
    "MCom",
    "MA",
    "M.Sc",
  ];

  const comboMap: Record<string, string[]> = {
    BBA: ["BBA", "BBA+MBA", "MBA+BBA"],
    MBA: ["MBA", "BBA+MBA", "MBA+BBA"],
  };

  const buildDegreeHref = (label: string) => {
    const vals = comboMap[label] ?? [label];
    const qs = vals.map((v) => `degree=${encodeURIComponent(v)}`).join("&");
    return `/programs?${qs}`;
  };

  const resources = [
    { name: "FAQ", href: "#faq" },
    { name: "Reviews", href: "#reviews" },
    { name: "Application Guide", href: "#" },
  ];

  const support = [
    { name: "Get Counselling", href: "/lead-form" },
    { name: "Admin Login", href: "/admin" },
  ];


  // -------------------- Universities (ordered) --------------------
  const desiredNames = [
    "NMIMS",
    "DY Patil University ( DPU )",
    "Amity University",
    "Manipal Unversity Jaipur ( MUJ )",
    "Sikkim Manipal University ( SMU )",
    "Vivekanand Global University ( VGU )",
    "Vellore Institute Of Technology ( VIT )",
  ];

  // Explicit override: display name -> id
  const explicitIds: Record<string, number> = {
    "Amity University": 1,
  };

  const keywordMap: Record<string, string[]> = {
    NMIMS: ["nmims", "narsee", "monjee"],
    "DY Patil University ( DPU )": ["dy", "patil", "dypatil", "patiluniversity"],
    "Amity University": ["amity"],
    "Manipal Unversity Jaipur ( MUJ )": ["manipal", "jaipur", "muj"],
    "Sikkim Manipal University ( SMU )": ["sikkim", "manipal", "smu"],
    "Vivekanand Global University ( VGU )": ["vivekanand", "vgu", "vivekanandglobal"],
    "Vellore Institute Of Technology ( VIT )": ["vellore", "vit"],
  };

  // Fetch once; avoid nested awaits in JSX.
  const allRows: { id: number; name: string }[] = await db
    .select({ id: institutions.id, name: institutions.name })
    .from(institutions);

  const byExactName = new Map(allRows.map((r) => [String(r.name), r]));
  const byId = new Map(allRows.map((r) => [Number(r.id), r]));
  const rowsNormalized = allRows.map((r) => ({ ...r, _n: normalise(r.name) }));

  const orderedUniversities = desiredNames
    .map((dn) => {
      // 1) explicit id
      if (explicitIds[dn] && byId.has(explicitIds[dn])) {
        const r = byId.get(explicitIds[dn])!;
        return { ...r, displayName: dn };
      }
      // 2) exact display name match
      if (byExactName.has(dn)) return byExactName.get(dn)!;

      const nn = normalise(dn);

      // 3) exact normalized
      let found = rowsNormalized.find((r) => r._n === nn);
      if (found) return found;

      // 4) substring normalized
      found = rowsNormalized.find((r) => r._n.includes(nn));
      if (found) return found;

      // 5) keyword-based
      const keys = keywordMap[dn] || [];
      for (const k of keys) {
        const kn = normalise(k);
        const m = rowsNormalized.find((r) => r._n.includes(kn));
        if (m) return m;
      }

      // skip if not found
      return null;
    })
    .filter(Boolean) as Array<{ id: number; name: string; displayName?: string }>;

  // ----------------------------------------------------------------

  return (
    <footer className="bg-slate-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* grid: 5 sibling columns (Brand, Programs, Universities, Resources, Support) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.jpg"
                alt="Upskillers Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-xl font-bold">Upskillers</span>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Your trusted partner for finding the perfect online MBA program from
              India&apos;s top universities.
            </p>
            <div className="flex gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/upskillers_official?igsh=Y2MwcTQ4OGVhZjll"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-[var(--brand)] rounded-full flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M16 11.99a4 4 0 11-8 0 4 4 0 018 0z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="18.5" cy="5.5" r="0.75" fill="currentColor" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/upskillers-university-partners-663a5b388"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-sky-600 rounded-full flex items-center justify-center transition-all"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.026-3.037-1.85-3.037-1.851 0-2.134 1.446-2.134 2.94v5.666H9.355V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.367-1.85 3.598 0 4.266 2.367 4.266 5.451v6.29zM5.337 7.433a2.066 2.066 0 110-4.132 2.066 2.066 0 010 4.132zM6.962 20.452H3.712V9h3.25v11.452z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/upskillers"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.06 5.66 21.13 10.44 21.98v-7.02H7.9v-2.89h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.77-1.61 1.56v1.87h2.74l-.44 2.89h-2.3V22C18.34 21.13 22 17.06 22 12.07z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://x.com/upskillers_official"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-sky-500 rounded-full flex items-center justify-center transition-all"
                aria-label="Twitter"
              >
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.3 3.9A12.14 12.14 0 013 4.89a4.28 4.28 0 001.33 5.71c-.65-.02-1.26-.2-1.79-.5v.05a4.28 4.28 0 003.43 4.2c-.49.13-1.01.16-1.54.06a4.29 4.29 0 004 2.97A8.59 8.59 0 012 19.54a12.12 12.12 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19-.01-.38-.02-.57A8.72 8.72 0 0024 6.56a8.5 8.5 0 01-2.54.7z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Programs</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              {programs.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-[var(--brand)] transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Degree filters */}
            <div className="mt-4">
              <h5 className="font-semibold mb-2 text-sm text-slate-200">
                By degree
              </h5>
              <ul className="grid grid-cols-2 gap-2 text-sm text-slate-400">
                {degreeLabels.map((d) => (
                  <li key={d}>
                    <a
                      href={buildDegreeHref(d)}
                      className="hover:text-[var(--brand)] transition-colors"
                    >
                      {d}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Universities (separate grid column) */}
          <div id="universities">
            <h4 className="font-bold mb-4 text-lg">Universities</h4>
            <ul className="space-y-2 text-sm text-slate-400 max-h-56 overflow-auto">
              {orderedUniversities.map((inst) => (
                <li key={inst.id}>
                  <a
                    href={`/programs?institution=${encodeURIComponent(String(inst.id))}#universities`}
                    className="hover:text-[var(--brand)] transition-colors"
                  >
                    {"displayName" in inst && inst.displayName
                      ? inst.displayName
                      : inst.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Resources</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              {resources.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Support</h4>
            <ul className="space-y-3 text-sm text-slate-400 mb-6">
              {support.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-medium">upskillersmba@gmail.com</span>
              </div>
              <div className="flex flex-col gap-2">
                <a href="tel:+919769870405" className="font-medium hover:underline">
                  +91 97698 70405
                </a>
                <a href="tel:+918347766999" className="font-medium hover:underline">
                  +91 83477 66999
                </a>
              </div>
              <div className="pt-3">
                <h4 className="font-semibold text-white">
                  Upskillers University Partners.
                </h4>
                <address className="not-italic text-sm text-slate-400 mt-1">
                  3/304-Shivalik 9 gulbai tekra Rd, Gangotri Society, CG Road
                  Ahmedabad, Gujarat 380006
                </address>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/919769870405"
                  className="hover:text-green-400 transition-colors"
                >
                  WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <div>© 2025 Upskillers. All rights reserved.</div>
          
          </div>
          <div className="mt-4 text-xs text-slate-500 text-center md:text-left">
            All programs listed are from UGC-entitled universities with valid
            accreditations.
          </div>
        </div>
      </div>
    </footer>
  );
}
