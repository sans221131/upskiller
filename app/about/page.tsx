import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import FounderCarousel from "../components/FounderCarousel";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 text-slate-900">
      <Navigation />

      <main className="pt-24 pb-24 px-6">
        <div className="max-w-6xl mx-auto space-y-20">
          {/* =======================================================
             HERO CARD: Story + Founder in one elevated section
          ======================================================= */}
          <section className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/60 px-6 py-8 md:px-10 md:py-10">
            <div className="flex flex-col lg:flex-row lg:items-start gap-10">
              {/* LEFT: brand story */}
              <div className="flex-1 max-w-2xl">
                {/* tiny badge */}
                <div className="inline-flex items-center gap-2 text-[11px] font-medium text-slate-600 bg-slate-100 ring-1 ring-slate-200 rounded-full px-3 py-1">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                  <span>About Upskillers</span>
                </div>

                <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                  Upskillers University Partners
                </h1>

                <p className="mt-5 text-lg text-slate-700 leading-relaxed">
                  We connect ambitious learners with universities that actually
                  move careers forward — not just with a degree, but with skills
                  employers hire for.
                </p>

                <p className="mt-4 text-base text-slate-600 leading-relaxed">
                  The work sounds simple, but it isn’t: match people to
                  high-signal programs, tell them the truth about outcomes and
                  fees, and guide them one-on-one so they choose what’s right —
                  not whatever ad shouts the loudest.
                </p>

                {/* mini list of trust signals */}
                <ul className="mt-6 grid sm:grid-cols-2 gap-4 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--brand)] flex-shrink-0" />
                    <span>
                      1:1 program guidance instead of call-center sales.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--brand)] flex-shrink-0" />
                    <span>
                      Only real universities and recognised credentials.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--brand)] flex-shrink-0" />
                    <span>
                      Focus on employability, not just “degree collected.”
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--brand)] flex-shrink-0" />
                    <span>Clear fees / EMI math upfront. No drama later.</span>
                  </li>
                </ul>
              </div>

              {/* RIGHT: founder card */}
              <aside className="w-full max-w-[320px] shrink-0">
                <FounderCarousel
                  images={["/founder/1.jpeg", "/founder/2.jpeg", "/founder/3.jpeg"]}
                  name="Harshit Soni"
                  role="Founder & Director"
                  quote={`“We’re not here to push generic courses. We’re here to align talent with the market and give people a path that actually pays off.”`}
                  interval={2800}
                />
              </aside>
            </div>
          </section>

          {/* =======================================================
             QUICK METRICS STRIP
          ======================================================= */}
          <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200/70 p-4">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                Founded
              </div>
              <div className="mt-1 text-xl font-bold text-slate-900">2025</div>
              <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                Built for employability from day one.
              </div>
            </div>

            <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200/70 p-4">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                Model
              </div>
              <div className="mt-1 text-xl font-bold text-slate-900">
                University Partnerships
              </div>
              <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                We only work with real institutions.
              </div>
            </div>

            <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200/70 p-4">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                Priority
              </div>
              <div className="mt-1 text-xl font-bold text-slate-900">
                Career Outcomes
              </div>
              <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                “Does this help you get hired?” is question #1.
              </div>
            </div>

            <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200/70 p-4">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                Location
              </div>
              <div className="mt-1 text-xl font-bold text-slate-900">
                Ahmedabad, India
              </div>
              <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                You can actually visit us.
              </div>
            </div>
          </section>

          {/* =======================================================
             MISSION + VALUES + CONTACT / SOCIAL
          ======================================================= */}
          <section className="grid lg:grid-cols-[2fr_1fr] gap-10 lg:gap-16">
            {/* LEFT: long-form story */}
            <div className="space-y-6 text-base leading-relaxed text-slate-700">
              <p>
                Upskillers University Partners is an education and career
                enablement company founded in 2025 with one clear premise:
                education should translate into opportunity. Founded by{" "}
                <span className="font-medium text-slate-900">
                  Mr. Harshit Soni
                </span>
                , we work with universities, institutes, and industry
                practitioners to deliver programs that are accessible, credible,
                and built for employability.
              </p>

              <p>
                We help learners — students, working professionals, career
                switchers — identify the right program, not just the nicest
                brochure. That means: total clarity on outcomes, transparent
                fees and EMI, formats that fit your life, and zero fake hype
                about placements.
              </p>

              <p>
                Our model blends academic depth with market signal. You don’t
                just “get a course.” You get direction, mentorship, and support
                on how this call actually fits into your career path.
              </p>

              {/* VALUES CALLOUT */}
              <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200/70 p-5">
                <div className="text-sm font-semibold text-slate-900 mb-3">
                  What we stand on
                </div>

                <div className="space-y-4 text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[var(--brand)]/10 text-[var(--brand)] flex items-center justify-center text-[11px] font-bold leading-none">
                      1
                    </div>
                    <p className="leading-relaxed">
                      Education should be employable, not just theoretical.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[var(--brand)]/10 text-[var(--brand)] flex items-center justify-center text-[11px] font-bold leading-none">
                      2
                    </div>
                    <p className="leading-relaxed">
                      People deserve clarity, not sales pressure.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[var(--brand)]/10 text-[var(--brand)] flex items-center justify-center text-[11px] font-bold leading-none">
                      3
                    </div>
                    <p className="leading-relaxed">
                      Upskilling is not “one big degree.” It’s a career habit.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: contact / socials / snapshot */}
            <div className="space-y-6">
              {/* counsellor card */}
              <div className="rounded-2xl bg-white ring-1 ring-slate-200/70 shadow-sm p-5">
                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                  Talk to a counsellor
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Not sure which program fits you? Get 1:1 guidance — fees,
                  timelines, eligibility, career impact. No spam.
                </p>
                <a
                  href="/lead-form"
                  className="inline-flex items-center justify-center w-full text-sm font-semibold rounded-full bg-[var(--brand)] text-white py-2.5 px-4 shadow hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-white"
                >
                  Get Personal Guidance
                </a>
              </div>

              {/* socials */}
              <div className="rounded-2xl bg-white ring-1 ring-slate-200/70 shadow-sm p-5">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">
                  Follow us
                </h3>
                <div className="flex flex-col gap-2 text-sm">
                  <a
                    href="https://www.linkedin.com/in/upskillers-university-partners-663a5b388"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 hover:text-[var(--brand)] underline decoration-transparent hover:decoration-[var(--brand)] underline-offset-2"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://www.instagram.com/upskillers_official?igsh=Y2MwcTQ4OGVhZjll"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 hover:text-[var(--brand)] underline decoration-transparent hover:decoration-[var(--brand)] underline-offset-2"
                  >
                    Instagram
                  </a>
                </div>
              </div>

              {/* quick snapshot */}
              <div className="rounded-2xl bg-slate-50 ring-1 ring-slate-200/70 shadow-sm p-5">
                <h4 className="text-sm font-semibold text-slate-900 mb-2">
                  Snapshot
                </h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>
                    <strong className="font-semibold text-slate-900">
                      Founded:
                    </strong>{" "}
                    2025
                  </li>
                  <li>
                    <strong className="font-semibold text-slate-900">
                      Founder:
                    </strong>{" "}
                      Mr. Harshit Soni
                  </li>
                  <li>
                    <strong className="font-semibold text-slate-900">
                      Type:
                    </strong>{" "}
                    EdTech &amp; Career Services
                  </li>
                  <li>
                    <strong className="font-semibold text-slate-900">
                      HQ:
                    </strong>{" "}
                    Ahmedabad, India
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* =======================================================
             VISIT / MAP
          ======================================================= */}
          <section className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact block */}
            <div className="rounded-2xl bg-white ring-1 ring-slate-200/70 shadow-sm p-6 flex flex-col">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                Visit / Verify / Ask
              </div>

              <h2 className="mt-2 text-2xl font-bold text-slate-900 leading-tight">
                We’re based in Ahmedabad.
              </h2>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-prose">
                You can walk in, meet us, and ask blunt questions. We’re not
                just a landing page with a WhatsApp number.
              </p>

              <div className="mt-6 space-y-5 text-sm">
                <div>
                  <div className="font-semibold text-slate-900 mb-1">
                    Address
                  </div>
                  <a
                    href="https://maps.app.goo.gl/gtttdSxz9e6VWqhb7?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-slate-600 hover:text-[var(--brand)] leading-relaxed"
                  >
                    3/304-Shivalik 9, Gulbai Tekra Rd,
                    <br />
                    Gangotri Society, Gulbai Tekra,
                    <br />
                    Ahmedabad, Gujarat 380006
                  </a>
                </div>

                <div>
                  <div className="font-semibold text-slate-900 mb-1">
                    Counsellor Support
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Get program recommendations, fee breakdowns, EMI options,
                    intake timelines.
                  </p>
                </div>

                <div>
                  <a
                    href="/lead-form"
                    className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] text-white text-sm font-semibold py-2.5 px-4 shadow hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-white"
                  >
                    Speak to a Counsellor
                  </a>
                </div>
              </div>
            </div>

            {/* Map block */}
            <div className="rounded-2xl overflow-hidden ring-1 ring-slate-200/70 shadow-sm bg-slate-100">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/9]">
                <iframe
                  title="Upskillers University Partners Location"
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.7909091408693!2d72.552!3d23.0309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84fb5e9c9b6f%3A0x0000000000000000!2sGulbai%20Tekra%2C%20Ahmedabad%2C%20Gujarat%20380006!5e0!3m2!1sen!2sin!4v0000000000000"
                />
              </div>
              <div className="bg-white border-t border-slate-200 px-4 py-3 text-[11px] leading-relaxed text-slate-500">
                Map is approximate. Tap “View on Maps” for live navigation.
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
