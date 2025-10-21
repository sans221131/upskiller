export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-xl font-bold text-slate-900">Upskillers</span>
          </a>
          <a href="/lead-form" className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all">
            Get Matched
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Explore Our Programs
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
            Browse through 60+ carefully curated programs from top institutions. Find the perfect match for your career goals.
          </p>
          
          {/* CTA */}
          <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Get Personalized Recommendations
            </h3>
            <p className="text-slate-600 mb-6">
              Answer a few questions and we'll match you with programs that fit your profile, budget, and goals.
            </p>
            <a href="/lead-form" className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full font-semibold transition-all">
              Start Assessment (2 mins)
            </a>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border-2 border-slate-200 animate-pulse">
                <div className="h-6 bg-slate-200 rounded mb-4"></div>
                <div className="h-4 bg-slate-100 rounded mb-2"></div>
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
