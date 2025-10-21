export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm font-medium">
            ✓ FREE CONSULTATION • 2-MINUTE ASSESSMENT • INSTANT MATCHES
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            The Professional Growth Studio
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Your complete career advancement platform. Discover programs, optimize learning paths, and accelerate your professional growth with data-driven guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href="/lead-form" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg shadow-teal-200 hover:shadow-xl">
              Find Your Perfect Program
            </a>
            <a href="/programs" className="border-2 border-slate-300 hover:border-teal-500 text-slate-700 px-8 py-4 rounded-full text-lg font-semibold transition-all">
              Browse Courses
            </a>
          </div>
          <div className="flex gap-8 justify-center items-center text-sm">
            <div>
              <div className="text-2xl font-bold text-slate-900">4.8★</div>
              <div className="text-slate-600">Student Rating</div>
            </div>
            <div className="w-px h-12 bg-slate-300"></div>
            <div>
              <div className="text-2xl font-bold text-slate-900">60+</div>
              <div className="text-slate-600">Partner Institutions</div>
            </div>
            <div className="w-px h-12 bg-slate-300"></div>
            <div>
              <div className="text-2xl font-bold text-slate-900">35K+</div>
              <div className="text-slate-600">Careers Transformed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
