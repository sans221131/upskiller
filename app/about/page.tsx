import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import FounderCarousel from "../components/FounderCarousel";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 text-slate-900">
      <Navigation />

      <main className="pt-24 pb-24 px-6">
        <div className="max-w-6xl mx-auto space-y-24">
          <section className="grid gap-16 lg:grid-cols-[3fr_2fr] lg:items-start">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 text-[11px] font-medium text-slate-600 uppercase tracking-[0.28em]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                <span>About Upskillers</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
                We match ambition with verified outcomes.
              </h1>

              <p className="text-lg text-slate-700 leading-relaxed">
                Upskillers University Partners is the bridge between ambitious learners and universities that prove their programs lead to meaningful work. We design journeys that are honest about outcomes, realistic about effort, and aligned with what hiring managers actually want.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Our counsellors blend labour-market insight with accredited curriculum so every recommendation is grounded in evidence. Fees, formats, timelines, support — the complete picture shows up before you enrol, not afterwards.
              </p>

              <ul className="grid gap-4 sm:grid-cols-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--brand)] flex-shrink-0" />
                  <span>Human guidance over scripts, start to finish.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--brand)] flex-shrink-0" />
                  <span>Only university-backed credentials with audited outcomes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--brand)] flex-shrink-0" />
                  <span>Career roadmaps that evolve with market demand.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--brand)] flex-shrink-0" />
                  <span>Total fee transparency — no hidden add-ons, ever.</span>
                </li>
              </ul>

              <dl className="flex flex-wrap gap-8 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                <div>
                  <dt className="text-slate-400">Founded</dt>
                  <dd className="mt-2 text-sm tracking-normal text-slate-900">2025</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Model</dt>
                  <dd className="mt-2 text-sm tracking-normal text-slate-900">University partnerships</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Priority</dt>
                  <dd className="mt-2 text-sm tracking-normal text-slate-900">Employability</dd>
                </div>
                <div>
                  <dt className="text-slate-400">HQ</dt>
                  <dd className="mt-2 text-sm tracking-normal text-slate-900">Ahmedabad, India</dd>
                </div>
              </dl>
            </div>

            <aside className="w-full flex flex-col gap-6">
              <FounderCarousel
                images={["/founder/1.jpeg", "/founder/2.jpeg", "/founder/3.jpeg"]}
                name="Harshit Soni"
                role="Founder & Director"
                quote={`"We're not here to push generic courses. We're here to align talent with the market and give people a path that actually pays off."`}
                interval={3500}
              />

              <p className="border-l-2 border-[var(--brand)]/40 pl-4 text-sm text-slate-600 leading-relaxed">
                Led by Harshit Soni, our team brings admissions, product, and employer partnerships under one roof so learners hear a single, candid perspective on what creates mobility.
              </p>
            </aside>
          </section>

          <section className="space-y-12">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
                Why universities choose to partner with us
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                We collaborate with institutions that are serious about learner outcomes. Together we build programs that balance academic rigour with skills that hiring teams measure, and we stay with learners until those outcomes are realised.
              </p>
            </div>

            <div className="grid gap-10 md:grid-cols-3">
              <article className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Signals first
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Every program we recommend is benchmarked against live employer demand, ensuring certificates signal real capability.
                </p>
              </article>

              <article className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Guided decisions
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our counsellors stay in the loop from discovery to admission, aligning learner goals with the right cohort, pace, and financing plan.
                </p>
              </article>

              <article className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Measurable outcomes
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We publish clear placement, progression, and ROI metrics so learners and universities stay accountable to the same scorecard.
                </p>
              </article>
            </div>
          </section>

          <section className="grid gap-16 lg:grid-cols-[2fr_1fr] lg:items-start">
            <div className="space-y-6 text-base leading-relaxed text-slate-700">
              <p>
                Founded in Ahmedabad, Upskillers University Partners brings together universities, industry mentors, and learner support teams to make education a compounding career asset. We design each journey with clarity on the role it should unlock.
              </p>
              <p>
                Learners come to us when they want a verified path into technology, business, or creative roles without gambling on glossy promises. We audit outcomes, interrogate fee structures, and curate the mentors who will stay in their corner.
              </p>
              <p>
                The result is a partnership where universities grow the right cohorts and learners walk away with momentum, not uncertainty.
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                  What we stand on
                </h3>
                <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
                  <li className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--brand)] flex-shrink-0" />
                    <span>Education should convert into employability, not just certificates.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--brand)] flex-shrink-0" />
                    <span>People deserve clarity and consent, not sales pressure.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--brand)] flex-shrink-0" />
                    <span>Upskilling is a career habit — we help learners build the cadence.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2 border-t border-slate-200 pt-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                  At a glance
                </h3>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>
                    <span className="font-medium text-slate-900">Founder:</span> Harshit Soni
                  </li>
                  <li>
                    <span className="font-medium text-slate-900">Focus:</span> Employability-led higher education
                  </li>
                  <li>
                    <span className="font-medium text-slate-900">Learner segments:</span> Students, working professionals, career switchers
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="grid gap-12 lg:grid-cols-[2fr_3fr]">
            <div className="space-y-8">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                  Visit or talk to us
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">
                  Walk in, meet the team, and pressure-test the roadmap before you enrol. We believe every decision should survive pointed questions.
                </p>
              </div>

              <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Address
                  </div>
                  <a
                    href="https://maps.app.goo.gl/gtttdSxz9e6VWqhb7?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-slate-700 hover:text-[var(--brand)]"
                  >
                    3/304-Shivalik 9, Gulbai Tekra Rd, Gangotri Society, Gulbai Tekra, Ahmedabad, Gujarat 380006
                  </a>
                </div>

                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Talk to a counsellor
                  </div>
                  <p className="mt-2">
                    Get a tailored program short-list, fee breakdowns, EMI guidance, and onboarding timelines from a real person.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/lead-form"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-white"
                >
                  Get Personal Guidance
                </a>
                <div className="flex items-center gap-4 text-sm">
                  <a
                    href="https://www.linkedin.com/in/upskillers-university-partners-663a5b388"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 underline decoration-transparent transition hover:text-[var(--brand)] hover:decoration-[var(--brand)] underline-offset-2"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://www.instagram.com/upskillers_official?igsh=Y2MwcTQ4OGVhZjll"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 underline decoration-transparent transition hover:text-[var(--brand)] hover:decoration-[var(--brand)] underline-offset-2"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/9]">
                <iframe
                  title="Upskillers University Partners Location"
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=3%2F304-Shivalik%209%2C%20Gulbai%20Tekra%20Rd%2C%20Gangotri%20Society%2C%20Gulbai%20Tekra%2C%20Ahmedabad%2C%20Gujarat%20380006&z=18&hl=en&output=embed"
                />
              </div>
              <div className="border-t border-slate-200 px-5 py-3 text-[11px] leading-relaxed text-slate-500">
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
