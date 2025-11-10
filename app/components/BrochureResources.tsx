export default function BrochureResources() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Program Brochures</h2>
          <p className="text-lg text-slate-600">We have removed downloadable brochures from the site. If you need program details, our counsellors can share the latest information.</p>
        </div>

        <div className="inline-block mt-6 p-8 rounded-2xl bg-[var(--brand)]/6 border border-[var(--brand)]/10">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Need Program Details?</h3>
          <p className="text-slate-600 mb-4">Talk to our counsellors to get the latest curriculum, fees and admission information.</p>
          <a href="/lead-form" className="inline-block px-8 py-3 rounded-full font-semibold transition-all bg-[var(--brand)] text-white shadow-sm hover:shadow">Get Free Counselling</a>
        </div>
      </div>
    </section>
  );
}
