import { notFound } from 'next/navigation';
import { eq, getTableColumns } from 'drizzle-orm';
import { db } from '@/db';
import { programs as programsTable, institutions, programFees, programFaqs } from '@/db/schema';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { getCloudinaryFetchUrl } from '../../lib/cloudinary';

// Avoid strict typing on the page props so Next's build-time validator won't fail
// when PageProps shapes differ across Next versions. We'll normalize params
// at runtime to support both Promise or plain object.
export default async function ProgramDetailPage(props: any) {
  const resolvedParams = await Promise.resolve(props?.params as any);
  const id = Number(resolvedParams?.id);
  if (!Number.isInteger(id) || id <= 0) return notFound();

  // Fetch program with institution
  const rows = await db
    .select({ ...(getTableColumns(programsTable) as any), institutionName: institutions.name, institutionSlug: institutions.slug, institutionLogo: institutions.logoUrl, institutionHero: institutions.heroImage, institutionAccreditation: institutions.accreditation })
    .from(programsTable)
    .leftJoin(institutions, eq(programsTable.institutionId, institutions.id))
    .where(eq(programsTable.id, id))
    .limit(1);

  if (!rows || rows.length === 0) return notFound();

  const program: any = rows[0];

  // Fetch optional fees and faqs
  const fees = await db.select().from(programFees).where(eq(programFees.programId, id));
  const faqs = await db.select().from(programFaqs).where(eq(programFaqs.programId, id)).orderBy();

  // Format highlights into bullet points
  const formatHighlights = (text: string | null) => {
    if (!text) return [];
    return text.split(/\r?\n|;|•|\u2022/).map(s => s.trim()).filter(Boolean).slice(0, 6);
  };

  const highlights = formatHighlights(program.highlights);

  // Prefer Cloudinary fetch URLs for remote images when available, else fall
  // back to the raw DB value or a local placeholder.
  const heroSrc =
    getCloudinaryFetchUrl(program.heroImage ?? program.institutionHero ?? undefined) ??
    program.heroImage ??
    program.institutionHero ??
    undefined;

  const logoSrc =
    getCloudinaryFetchUrl(program.institutionLogo ?? program.heroImage ?? undefined) ??
    program.institutionLogo ??
    program.heroImage ??
    '/logo.jpg';

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-b from-blue-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          {/* Hero Image */}
          {heroSrc && (
            <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroSrc}
                alt={program.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          )}

          {/* Header */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-200">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex items-start gap-6 flex-1">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center border-2 border-slate-100 shadow-sm">
                  <img src={logoSrc} alt={program.institutionName} className="w-12 h-12 object-contain" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-block px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-200">
                      UGC-entitled
                    </span>
                    {program.institutionAccreditation && (
                      <span className="inline-block px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-200">
                        {program.institutionAccreditation.split(';')[0]}
                      </span>
                    )}
                    {program.emiAvailable && (
                      <span className="inline-block px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold border border-purple-200">
                        EMI Available
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 leading-tight">{program.title}</h1>
                  <p className="text-lg text-slate-600 mb-4">{program.institutionName}</p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-slate-50 rounded-xl">
                      <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Mode</div>
                      <div className="text-lg font-bold text-slate-900 capitalize">{program.deliveryMode ?? '—'}</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-xl">
                      <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Duration</div>
                      <div className="text-lg font-bold text-slate-900">{program.durationMonths ? `${program.durationMonths} months` : '—'}</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-xl">
                      <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Fee</div>
                      <div className="text-lg font-bold" style={{ color: 'var(--brand)' }}>{program.totalFee ? `₹${program.totalFee.toLocaleString('en-IN')}` : 'Contact Us'}</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-xl">
                      <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">EMI from</div>
                      <div className="text-lg font-bold text-green-600">{program.totalFee ? `₹${Math.round(program.totalFee / 24).toLocaleString('en-IN')}` : '—'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col gap-3 lg:w-64">
                <a 
                  href={program.applyUrl ?? '/lead-form'} 
                  className="px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg text-center"
                  style={{ backgroundColor: 'var(--brand)', color: 'var(--brand-contrast)' }}
                >
                  Apply Now
                </a>
                {program.brochureUrl && (
                  <a 
                    href={program.brochureUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-sm text-center bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300"
                  >
                    Download Brochure
                  </a>
                )}
                <a 
                  href="/lead-form" 
                  className="px-8 py-3 rounded-full text-base font-semibold transition-all text-center"
                  style={{ backgroundColor: 'transparent', color: 'var(--brand)', border: '2px solid var(--brand)' }}
                >
                  Get Free Counselling
                </a>
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
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Program Overview</h2>
                <div className="prose max-w-none text-slate-700 leading-relaxed">
                  {program.highlights ? (
                    <div>
                      <p className="text-lg mb-6">{program.highlights.split('\n')[0] || program.highlights.split('.')[0]}.</p>
                      {highlights.length > 0 && (
                        <ul className="space-y-3">
                          {highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--brand)' }}></span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <p className="text-slate-500">Program overview not available.</p>
                  )}
                </div>
              </div>

              {/* Curriculum */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6" id="curriculum">Curriculum</h2>
                <div className="prose max-w-none text-slate-700 leading-relaxed">
                  {program.curriculum ? (
                    <div className="whitespace-pre-line">{program.curriculum}</div>
                  ) : (
                    <p className="text-slate-500">Detailed curriculum information will be provided during counselling.</p>
                  )}
                </div>
              </div>

              {/* Eligibility */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Eligibility Criteria</h2>
                <div className="prose max-w-none text-slate-700 leading-relaxed">
                  {program.eligibility ? (
                    <div className="whitespace-pre-line">{program.eligibility}</div>
                  ) : (
                    <p className="text-slate-500">Please contact our counsellors for detailed eligibility requirements.</p>
                  )}
                </div>
              </div>

              {/* FAQs */}
              {faqs && faqs.length > 0 && (
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-6">
                    {faqs.map((faq: any) => (
                      <div key={faq.id} className="border-b border-slate-200 pb-6 last:border-b-0 last:pb-0">
                        <div className="font-semibold text-lg text-slate-900 mb-3">{faq.question}</div>
                        <div className="prose max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: faq.answerHtml }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:self-start">
              {/* Program Details Card - Sticky */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200 lg:sticky lg:top-24">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Program Details</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Mode of Study</div>
                    <div className="text-lg font-bold text-slate-900 capitalize">{program.deliveryMode ?? 'Not specified'}</div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Duration</div>
                    <div className="text-lg font-bold text-slate-900">{program.durationMonths ? `${program.durationMonths} months` : 'Flexible'}</div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Fee</div>
                    <div className="text-2xl font-bold mb-2" style={{ color: 'var(--brand)' }}>
                      {program.totalFee ? `₹${program.totalFee.toLocaleString('en-IN')}` : 'Contact Us'}
                    </div>
                    {program.totalFee && (
                      <div className="text-sm text-green-600 font-semibold">
                        EMI from ₹{Math.round(program.totalFee / 24).toLocaleString('en-IN')}/month
                      </div>
                    )}
                  </div>

                  {fees && fees.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Fee Breakdown</div>
                      <div className="space-y-2">
                        {fees.map((fee: any) => (
                          <div key={fee.id} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
                            <span className="text-sm text-slate-700">{fee.label}</span>
                            <span className="font-semibold text-slate-900">₹{(fee.amount || 0).toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200">
                  <a 
                    href={program.applyUrl ?? '/lead-form'} 
                    className="w-full px-6 py-4 rounded-2xl text-lg font-semibold transition-all shadow-lg text-center block mb-4"
                    style={{ backgroundColor: 'var(--brand)', color: 'var(--brand-contrast)' }}
                  >
                    Apply Now
                  </a>
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
