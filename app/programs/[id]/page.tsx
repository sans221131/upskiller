import { notFound } from "next/navigation";
import Link from "next/link";
import { eq, getTableColumns } from "drizzle-orm";
import { db } from "@/db";
import {
  programs as programsTable,
  institutions,
  programFees,
  programFaqs,
} from "@/db/schema";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import { getCloudinaryFetchUrl } from "../../lib/cloudinary";

// Avoid strict typing on the page props so Next's build-time validator won't fail
// when PageProps shapes differ across Next versions. We'll normalize params
// at runtime to support both Promise or plain object.
export default async function ProgramDetailPage(props: any) {
  const resolvedParams = await Promise.resolve(props?.params as any);
  const id = Number(resolvedParams?.id);
  if (!Number.isInteger(id) || id <= 0) return notFound();

  // Fetch program with institution
  const rows = await db
    .select({
      ...(getTableColumns(programsTable) as any),
      institutionName: institutions.name,
      institutionSlug: institutions.slug,
      institutionLogo: institutions.logoUrl,
      institutionHero: institutions.heroImage,
      institutionAccreditation: institutions.accreditation,
      institutionShortDescription: institutions.shortDescription,
    })
    .from(programsTable)
    .leftJoin(institutions, eq(programsTable.institutionId, institutions.id))
    .where(eq(programsTable.id, id))
    .limit(1);

  if (!rows || rows.length === 0) return notFound();

  const program: any = rows[0];

  // Fetch optional fees and faqs
  const fees = await db
    .select()
    .from(programFees)
    .where(eq(programFees.programId, id));
  const faqs = await db
    .select()
    .from(programFaqs)
    .where(eq(programFaqs.programId, id))
    .orderBy();

  const curriculumAbbreviations: CurriculumAbbreviation[] = [
    { key: "OB", value: "Organisational Behaviour" },
    { key: "MIS", value: "Management Information Systems" },
    { key: "Quant Methods", value: "Quantitative Methods" },
    { key: "Legal Aspects", value: "Legal Aspects of Business" },
  ];

  function parseHighlights({
    highlights,
  }: {
    highlights: string | null;
  }): ParsedHighlights {
    if (!highlights) return { summary: null, facts: [], bullets: [] };

    const segments = highlights
      .split(/\r?\n|[•;\u2022]/)
      .map((segment) => segment.trim())
      .filter((segment) => segment.length > 0);

    if (segments.length === 0) return { summary: null, facts: [], bullets: [] };

    const [first, ...restSegments] = segments;
    const firstLooksLikeFact = /^[^:]+:\s*.+$/.test(first);
    const summary = firstLooksLikeFact ? null : first ?? null;
    const details = (firstLooksLikeFact ? segments : restSegments).slice(0, 6);

    const facts = details.reduce<HighlightFact[]>((acc, line) => {
      const match = line.match(/^([^:]+):\s*(.+)$/);
      if (!match) return acc;

      const [, rawLabel, rawValue] = match;
      if (!rawLabel || !rawValue) return acc;

      acc.push({
        label: rawLabel.trim(),
        value: rawValue.trim(),
      });
      return acc;
    }, []);

    if (facts.length > 0) return { summary, facts, bullets: [] };

    return { summary, facts: [], bullets: details };
  }

  const highlightContent = parseHighlights({ highlights: program.highlights });
  const {
    summary: highlightSummary,
    facts: highlightFacts,
    bullets: highlightBullets,
  } = highlightContent;
  const formattedHighlightSummary =
    highlightSummary && /[.!?]$/.test(highlightSummary)
      ? highlightSummary
      : highlightSummary
      ? `${highlightSummary}.`
      : null;

  const curriculumSections = parseCurriculumSections({
    curriculum: program.curriculum,
    abbreviations: curriculumAbbreviations,
  });
  const hasStructuredCurriculum = curriculumSections.length > 0;
  const eligibilityContent = parseEligibility({
    eligibility: program.eligibility,
  });
  const hasEligibilityRequirements = eligibilityContent.requirements.length > 0;
  const programLogistics = buildProgramLogistics({ program });
  const hasProgramLogistics = programLogistics.length > 0;
  const financialSummary = buildFinancialSummary({ program });
  const hasFinancialSummary = financialSummary.length > 0;
  const feeBreakdownRows = parseFeeBreakdown({ fees });
  const hasFeeBreakdown = feeBreakdownRows.length > 0;

  // Prefer Cloudinary fetch URLs for remote images when available, else fall
  // back to the raw DB value or a local placeholder.
  const heroSrc =
    getCloudinaryFetchUrl(
      program.heroImage ?? program.institutionHero ?? undefined
    ) ??
    program.heroImage ??
    program.institutionHero ??
    undefined;

  const logoSrc =
    getCloudinaryFetchUrl(
      program.institutionLogo ?? program.heroImage ?? undefined
    ) ??
    program.institutionLogo ??
    program.heroImage ??
    "/logo.jpg";

  const emiAmount =
    program.emiAvailable && program.totalFee
      ? Math.round(program.totalFee / 24)
      : null;

  const applyUrl = program.applyUrl ?? "/lead-form";
  const isExternalUrl =
    applyUrl.startsWith("http://") || applyUrl.startsWith("https://");

  const ApplyNowLink = ({
    className,
    style,
  }: {
    className?: string;
    style?: React.CSSProperties;
  }) => {
    const commonProps = {
      target: "_blank" as const,
      rel: "noopener noreferrer" as const,
      className,
      style,
    };

    if (isExternalUrl) {
      return (
        <a href={applyUrl} {...commonProps}>
          Apply Now
        </a>
      );
    }
    return (
      <Link href={applyUrl} {...commonProps}>
        Apply Now
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 bg-gradient-to-b from-slate-950/5 via-white to-slate-50">
        <div className="max-w-7xl mx-auto space-y-8 lg:space-y-10">
          <div className="relative overflow-hidden rounded-[32px] bg-slate-900 shadow-2xl">
            {heroSrc ? (
              <img
                src={heroSrc}
                alt={program.title}
                className="h-[420px] w-full object-cover md:h-[520px]"
              />
            ) : (
              <div className="h-[420px] w-full bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 md:h-[520px]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end">
              <div className="px-6 pb-8 pt-24 md:px-10 md:pb-12 md:pt-32">
                <div className="max-w-3xl space-y-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur md:h-16 md:w-16">
                      <img
                        src={logoSrc}
                        alt={program.institutionName}
                        className="h-9 w-9 object-contain md:h-10 md:w-10"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-300">
                        Offered by
                      </p>
                      <p className="text-sm font-semibold text-white md:text-base">
                        {program.institutionName}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/15 px-3 py-1.5 text-xs font-semibold text-emerald-50">
                      <span className="h-2 w-2 rounded-full bg-emerald-300" />
                      UGC-entitled
                    </span>
                    {program.institutionAccreditation && (
                      <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                        {program.institutionAccreditation.split(";")[0]}
                      </span>
                    )}
                    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                      {program.degreeType}
                    </span>
                    {program.deliveryMode && (
                      <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                        {`${program.deliveryMode
                          .charAt(0)
                          .toUpperCase()}${program.deliveryMode.slice(1)}`}
                      </span>
                    )}
                    {program.emiAvailable && (
                      <span className="inline-flex items-center rounded-full border border-purple-400/40 bg-purple-500/20 px-3 py-1.5 text-xs font-semibold text-purple-100">
                        EMI Available
                      </span>
                    )}
                  </div>

                  <div>
                    <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl md:leading-[1.05]">
                      {program.title}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:items-start">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl lg:p-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Program Snapshot
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-center">
                  <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                    Mode
                  </div>
                  <div className="mt-2 text-base font-semibold text-slate-900 capitalize md:text-lg">
                    {program.deliveryMode ?? "—"}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-center">
                  <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                    Duration
                  </div>
                  <div className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                    {program.durationMonths
                      ? `${program.durationMonths} months`
                      : "—"}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-center">
                  <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                    Total Fee
                  </div>
                  <div
                    className="mt-2 text-base font-semibold md:text-lg"
                    style={{ color: "var(--brand)" }}
                  >
                    {program.totalFee
                      ? `₹${program.totalFee.toLocaleString("en-IN")}`
                      : "Contact Us"}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-center">
                  <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                    EMI from
                  </div>
                  <div className="mt-2 text-base font-semibold text-emerald-600 md:text-lg">
                    {emiAmount
                      ? `₹${emiAmount.toLocaleString("en-IN")}/month`
                      : "—"}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl lg:p-8">
              <div className="flex flex-col gap-3">
                <ApplyNowLink
                  className="block w-full rounded-full px-4 py-3 text-base font-semibold shadow-lg transition-all sm:px-8 sm:py-4 sm:text-lg"
                  style={{
                    backgroundColor: "var(--brand)",
                    color: "var(--brand-contrast)",
                  }}
                />
                {program.brochureUrl && (
                  <a
                    href={program.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-full border-2 border-slate-200 bg-white px-4 py-3 text-base font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 sm:px-8 sm:py-4 sm:text-lg"
                  >
                    Download Brochure
                  </a>
                )}
                <a
                  href="/lead-form"
                  className="block w-full rounded-full px-4 py-3 text-base font-semibold transition-all sm:px-8 sm:py-3 sm:text-lg"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--brand)",
                    border: "2px solid var(--brand)",
                  }}
                >
                  Get Free Counselling
                </a>
                {program.emiAvailable && emiAmount && (
                  <div className="mt-1 rounded-2xl border border-purple-100 bg-purple-50/70 px-4 py-3 text-sm text-purple-900">
                    Flexible EMI plans starting at{" "}
                    <span className="font-semibold">
                      ₹{emiAmount.toLocaleString("en-IN")}/month
                    </span>
                    . Talk to our counsellor to customise your plan.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Program Overview */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                  Program Overview
                </h2>
                <div className="prose max-w-none text-slate-700 leading-relaxed">
                  {formattedHighlightSummary ||
                  highlightFacts.length > 0 ||
                  highlightBullets.length > 0 ? (
                    <div className="space-y-6">
                      {formattedHighlightSummary && (
                        <p className="text-lg text-slate-700">
                          {formattedHighlightSummary}
                        </p>
                      )}
                      {highlightFacts.length > 0 && (
                        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {highlightFacts.map((fact) => (
                            <div
                              key={`${fact.label}-${fact.value}`}
                              className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                            >
                              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                {fact.label}
                              </dt>
                              <dd className="mt-2 text-lg font-semibold text-slate-900">
                                {fact.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      )}
                      {highlightFacts.length === 0 &&
                        highlightBullets.length > 0 && (
                          <ul className="space-y-3">
                            {highlightBullets.map((highlight, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span
                                  className="mt-2 inline-block h-2 w-2 flex-shrink-0 rounded-full"
                                  style={{ backgroundColor: "var(--brand)" }}
                                ></span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>
                  ) : (
                    <p className="text-slate-500">
                      Program overview not available.
                    </p>
                  )}
                </div>
              </div>

              {/* Curriculum */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
                <h2
                  className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
                  id="curriculum"
                >
                  Curriculum
                </h2>
                <div className="prose max-w-none text-slate-700 leading-relaxed">
                  {program.curriculum ? (
                    hasStructuredCurriculum ? (
                      <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                        {curriculumSections.map((section, index) => (
                          <div
                            key={section.title}
                            className={`grid gap-6 p-6 md:grid-cols-[220px_1fr] ${
                              index !== curriculumSections.length - 1
                                ? "border-b border-slate-100"
                                : ""
                            }`}
                          >
                            <div className="flex flex-col gap-2">
                              <span className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
                                Curriculum
                              </span>
                              <div className="space-y-1">
                                <h3 className="text-base font-semibold text-slate-900">
                                  {section.title ?? program.title}
                                </h3>
                                {section.subtitle && (
                                  <p className="text-sm font-medium text-slate-600">
                                    {section.subtitle}
                                  </p>
                                )}
                              </div>
                            </div>
                            <ul className="space-y-2 text-slate-700">
                              {section.items.map((item, itemIdx) => (
                                <li
                                  key={`${section.title}-${itemIdx}`}
                                  className="flex items-start gap-3"
                                >
                                  <span
                                    className="mt-[6px] inline-block h-2 w-2 flex-shrink-0 rounded-full"
                                    style={{ backgroundColor: "var(--brand)" }}
                                  ></span>
                                  <span className="leading-relaxed">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="whitespace-pre-line">
                        {program.curriculum}
                      </div>
                    )
                  ) : (
                    <p className="text-slate-500">
                      Detailed curriculum information will be provided during
                      counselling.
                    </p>
                  )}
                </div>
              </div>

              {/* Eligibility */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                  Eligibility Criteria
                </h2>
                <div className="prose max-w-none text-slate-700 leading-relaxed">
                  {program.eligibility ? (
                    <div className="space-y-4">
                      {eligibilityContent.summary && (
                        <p className="text-slate-700 leading-relaxed">
                          {ensureTrailingPeriod(eligibilityContent.summary)}
                        </p>
                      )}
                      {hasEligibilityRequirements && (
                        <ul className="space-y-2 text-slate-700">
                          {eligibilityContent.requirements.map(
                            (item, requirementIdx) => (
                              <li
                                key={`eligibility-${requirementIdx}`}
                                className="flex items-start gap-3"
                              >
                                <span
                                  className="mt-[6px] inline-block h-2 w-2 flex-shrink-0 rounded-full"
                                  style={{ backgroundColor: "var(--brand)" }}
                                ></span>
                                <span className="leading-relaxed">
                                  {ensureTrailingPeriod(item)}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                      {!eligibilityContent.summary &&
                        !hasEligibilityRequirements && (
                          <div className="whitespace-pre-line">
                            {program.eligibility}
                          </div>
                        )}
                    </div>
                  ) : (
                    <p className="text-slate-500">
                      Please contact our counsellors for detailed eligibility
                      requirements.
                    </p>
                  )}
                </div>
              </div>

              {/* FAQs */}
              {faqs && faqs.length > 0 && (
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-6">
                    {faqs.map((faq: any) => (
                      <div
                        key={faq.id}
                        className="border-b border-slate-200 pb-6 last:border-b-0 last:pb-0"
                      >
                        <div className="font-semibold text-lg text-slate-900 mb-3">
                          {faq.question}
                        </div>
                        <div
                          className="prose max-w-none text-slate-700"
                          dangerouslySetInnerHTML={{ __html: faq.answerHtml }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:self-start">
              {/* Program Details Card - Sticky */}
              <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-slate-200 lg:sticky lg:top-24 lg:max-w-md lg:w-full">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  Program Details
                </h3>

                <div className="space-y-8">
                  {hasProgramLogistics && (
                    <section>
                      <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                        Program Logistics
                      </h4>
                      <dl className="mt-4 grid gap-4">
                        {programLogistics.map((item) => (
                          <div
                            key={item.label}
                            className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                          >
                            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                              {item.label}
                            </dt>
                            <dd className="mt-2 text-base font-semibold text-slate-900">
                              {item.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </section>
                  )}

                  {hasFinancialSummary && (
                    <section>
                      <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                        Investment Snapshot
                      </h4>
                      <dl className="mt-4 grid gap-3">
                        {financialSummary.map((item) => (
                          <div
                            key={item.label}
                            className="flex items-baseline justify-between gap-3 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0"
                          >
                            <dt className="text-sm font-medium text-slate-600">
                              {item.label}
                            </dt>
                            <dd className="text-base font-semibold text-slate-900">
                              {item.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </section>
                  )}

                  {hasFeeBreakdown && (
                    <section>
                      <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                        Fee Breakdown
                      </h4>
                      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100">
                        <div className="max-h-72 overflow-y-auto">
                          <table className="min-w-full divide-y divide-slate-100 text-sm">
                            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.18em] text-slate-500">
                              <tr>
                                <th className="px-4 py-3 font-semibold">
                                  Component
                                </th>
                                <th className="px-4 py-3 font-semibold">
                                  Details
                                </th>
                                <th className="px-4 py-3 font-semibold text-right">
                                  Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                              {feeBreakdownRows.map((row) => (
                                <tr key={row.id}>
                                  <td className="px-4 py-3 font-medium text-slate-900">
                                    {row.label}
                                  </td>
                                  <td className="px-4 py-3 text-slate-600">
                                    {row.note ?? "—"}
                                  </td>
                                  <td className="px-4 py-3 text-right font-semibold text-slate-900">
                                    {row.amount}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </section>
                  )}
                </div>

                <div className="mt-10 pt-6 border-t border-slate-200">
                  <ApplyNowLink
                    className="w-full px-6 py-4 rounded-2xl text-lg font-semibold transition-all shadow-lg text-center block mb-4"
                    style={{
                      backgroundColor: "var(--brand)",
                      color: "var(--brand-contrast)",
                    }}
                  />
                  <a
                    href="/lead-form"
                    className="w-full px-6 py-3 rounded-2xl text-base font-semibold transition-all text-center block bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    Get Free Counselling
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

interface ParsedHighlights {
  summary: string | null;
  facts: HighlightFact[];
  bullets: string[];
}

interface HighlightFact {
  label: string;
  value: string;
}

function parseCurriculumSections({
  curriculum,
  abbreviations,
}: {
  curriculum: string | null;
  abbreviations: CurriculumAbbreviation[];
}): CurriculumSection[] {
  if (!curriculum) return [];

  const normalized = curriculum.replace(/\r?\n/g, "\n").trim();
  if (!normalized) return [];

  const sections = normalized
    .replace(/\s*•\s*/g, " • ") // normalise bullet spacing
    .split(
      /(?=(?:Sem(?:ester)?|Trimester|Term|Module|Year)\s*\d+(?:[\s:–—-]|$))/gi
    )
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);

  if (sections.length === 0) return [];

  return sections.reduce<CurriculumSection[]>((acc, segment) => {
    const section = extractCurriculumSection({ segment, abbreviations });
    if (!section) return acc;
    acc.push(section);
    return acc;
  }, []);
}

function expandCurriculumAbbreviation({
  topic,
  abbreviations,
}: {
  topic: string;
  abbreviations: CurriculumAbbreviation[];
}): string {
  const found = abbreviations.find(
    (entry) => entry.key.toLowerCase() === topic.toLowerCase()
  );
  if (found) return found.value;
  return topic;
}

function extractCurriculumSection({
  segment,
  abbreviations,
}: {
  segment: string;
  abbreviations: CurriculumAbbreviation[];
}): CurriculumSection | null {
  const headingRegex =
    /^((?:Sem(?:ester)?|Trimester|Term|Module|Year)\s*\d+)(?:\s*[–—-]\s*([^:•\n]+))?(?:[:\-–—]\s*)?(.+)$/i;

  let coreHeading: string | null = null;
  let extraHeading: string | null = null;
  let remainder = segment;

  const headingMatch = segment.match(headingRegex);
  if (headingMatch) {
    const [, coreGroup, extraGroup, bodyGroup] = headingMatch;
    coreHeading = coreGroup?.trim() ?? null;
    extraHeading = extraGroup?.trim() ?? null;
    remainder = bodyGroup?.trim() ?? "";
  } else {
    const [firstLine, ...rest] = segment
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    if (
      firstLine &&
      /^(?:Sem(?:ester)?|Trimester|Term|Module|Year)\s*\d+/i.test(firstLine)
    ) {
      const parts = firstLine
        .split(/[–—-]/)
        .map((part) => part.trim())
        .filter(Boolean);
      coreHeading = parts[0] ?? null;
      extraHeading = parts.slice(1).join(" — ") || null;
      remainder = rest.join(" ") || "";
    }
  }

  const topicSource = remainder.length > 0 ? remainder : segment;

  const rawTopics = topicSource
    .split(/(?:[;•\u2022]|\r?\n)+/)
    .map((topic) => topic.replace(/^[\-–—•\u2022]+/, "").trim())
    .filter((topic) => topic.length > 0);

  const topics = rawTopics
    .filter(
      (topic) =>
        !/^(?:Sem(?:ester)?|Trimester|Term|Module|Year)\s*\d+/i.test(topic)
    )
    .map((topic) => expandCurriculumAbbreviation({ topic, abbreviations }));

  if (topics.length === 0) return null;

  return {
    title: formatCurriculumHeading(coreHeading),
    subtitle: formatCurriculumSubtitle({ coreHeading, extraHeading }),
    items: topics,
  };
}

function formatCurriculumHeading(value: string | null): string {
  if (!value) return "Curriculum";
  return value
    .replace(/\s+/g, " ")
    .replace(/\bSem\b/i, "Semester")
    .trim();
}

function formatCurriculumSubtitle({
  coreHeading,
  extraHeading,
}: {
  coreHeading: string | null;
  extraHeading: string | null;
}): string | null {
  const sanitizedExtra = extraHeading?.trim() ?? null;
  if (sanitizedExtra && !shouldSuppressSubtitle(sanitizedExtra))
    return sanitizedExtra;
  if (!coreHeading) return null;
  const match = coreHeading.match(/(Semester\s*\d+)\s*(.*)$/i);
  if (match && match[2]) {
    const derived = match[2].trim();
    if (derived.length > 0 && !shouldSuppressSubtitle(derived)) return derived;
  }
  return null;
}

function shouldSuppressSubtitle(subtitle: string): boolean {
  if (!subtitle) return true;
  const normalized = subtitle.toLowerCase();
  if (normalized.includes("core subjects")) return true;
  if (normalized.startsWith("e.g.") || normalized.includes("e.g.")) return true;
  if (normalized.startsWith("for example")) return true;
  return false;
}

function parseEligibility({
  eligibility,
}: {
  eligibility: string | null;
}): ParsedEligibility {
  if (!eligibility) return { summary: null, requirements: [] };

  const segments = eligibility
    .split(/\r?\n|[•;\u2022]/)
    .map((segment) => segment.trim())
    .filter(Boolean);

  if (segments.length === 0) return { summary: null, requirements: [] };

  const [first, ...rest] = segments;
  if (rest.length === 0) return { summary: first, requirements: [] };

  return {
    summary: first,
    requirements: rest,
  };
}

function ensureTrailingPeriod(value: string): string {
  if (!value) return value;
  return /[.!?)]$/.test(value) ? value : `${value}.`;
}

function buildProgramLogistics({
  program,
}: {
  program: any;
}): ProgramLogisticItem[] {
  const items: ProgramLogisticItem[] = [];

  if (program.deliveryMode)
    items.push({
      label: "Mode of Study",
      value: formatDeliveryMode(program.deliveryMode),
    });
  if (program.durationMonths)
    items.push({
      label: "Duration",
      value: `${program.durationMonths} months`,
    });
  if (program.degreeType)
    items.push({ label: "Degree Path", value: program.degreeType });
  if (program.workExperienceMinYears)
    items.push({
      label: "Recommended Experience",
      value: `${program.workExperienceMinYears}+ years`,
    });
  if (program.applicationDeadline)
    items.push({
      label: "Application Deadline",
      value: formatDate(program.applicationDeadline),
    });

  return items;
}

function buildFinancialSummary({
  program,
}: {
  program: any;
}): FinancialSummaryItem[] {
  const items: FinancialSummaryItem[] = [];

  if (typeof program.totalFee === "number" && program.totalFee > 0) {
    items.push({
      label: "Total Program Fee",
      value: formatIndianCurrency(program.totalFee),
    });
  }

  if (
    program.emiAvailable &&
    typeof program.totalFee === "number" &&
    program.totalFee > 0
  ) {
    items.push({
      label: "Illustrative EMI (24 months)",
      value: `${formatIndianCurrency(Math.round(program.totalFee / 24))}/month`,
    });
  }

  if (
    typeof program.applicationFee === "number" &&
    program.applicationFee > 0
  ) {
    items.push({
      label: "Application Fee",
      value: formatIndianCurrency(program.applicationFee),
    });
  }

  return items;
}

function parseFeeBreakdown({ fees }: { fees: any[] }): FeeBreakdownRow[] {
  if (!fees || fees.length === 0) return [];

  return fees.reduce<FeeBreakdownRow[]>((acc, fee, index) => {
    const rawLabel = typeof fee.label === "string" ? fee.label.trim() : "";
    const amountNumber = typeof fee.amount === "number" ? fee.amount : null;

    if (!rawLabel && (amountNumber === null || Number.isNaN(amountNumber)))
      return acc;

    const match = rawLabel.match(/^([^()]+?)(?:\(([^)]+)\))?$/);
    const label =
      (match?.[1] ?? rawLabel ?? `Component ${index + 1}`).trim() ||
      `Component ${index + 1}`;
    const note = match?.[2] ? match[2].trim() : null;
    const amount =
      amountNumber !== null && !Number.isNaN(amountNumber)
        ? formatIndianCurrency(amountNumber)
        : "—";

    acc.push({
      id: fee.id ? String(fee.id) : `${label}-${index}`,
      label,
      note,
      amount,
    });
    return acc;
  }, []);
}

function formatIndianCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDeliveryMode(value: string): string {
  const normalized = value.toLowerCase();
  if (normalized === "online") return "Fully Online";
  if (normalized === "blended") return "Blended (Online + In-campus)";
  if (normalized === "weekend") return "Weekend Format";
  if (normalized === "on-campus") return "On Campus";
  return value;
}

function formatDate(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface CurriculumSection {
  title: string;
  subtitle: string | null;
  items: string[];
}

interface CurriculumAbbreviation {
  key: string;
  value: string;
}

interface ParsedEligibility {
  summary: string | null;
  requirements: string[];
}

interface ProgramLogisticItem {
  label: string;
  value: string;
}

interface FinancialSummaryItem {
  label: string;
  value: string;
}

interface FeeBreakdownRow {
  id: string;
  label: string;
  note: string | null;
  amount: string;
}
