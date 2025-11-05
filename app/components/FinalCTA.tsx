export default function FinalCTA() {
  return (
  <section className="py-12 px-6 bg-[#071022] text-white relative overflow-hidden">
      {/* Subtle decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* subtle brand wash top-right (very faint) */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full blur-3xl" style={{background: 'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0))'}} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
  <div className="mx-auto w-full max-w-5xl bg-white/6 backdrop-blur-sm border border-white/6 rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 items-center gap-6">
          <div className="flex flex-col items-stretch gap-3 md:gap-4">
            <a href="/lead-form" className="inline-flex items-center justify-center bg-white text-[var(--brand)] px-6 py-3 rounded-full font-semibold shadow hover:shadow-md transition text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-[var(--brand)]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 16l4-5h-3V4h-2v7H8l4 5zM6 18h12v2H6z"/></svg>
              Get Free Counselling
            </a>

            <a href="/lead-form" className="inline-flex items-center justify-center bg-[var(--brand)] text-white px-5 py-2.5 rounded-full font-semibold shadow hover:opacity-95 transition text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M5 12h14v2H5z"/></svg>
              Get Free Counselling (Maroon)
            </a>

            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-full font-semibold transition text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.84 11.84 0 0 0 12 0C5.373 0 .034 5.338.034 11.96c0 2.11.55 4.17 1.6 5.98L0 24l6.2-1.63A11.88 11.88 0 0 0 12 23.92c6.627 0 12-5.37 12-11.96 0-3.2-1.24-6.2-3.48-8.48z"/></svg>
              WhatsApp
            </a>

            <a href="tel:+919876543210" className="inline-flex items-center gap-2 bg-transparent border border-white/25 text-white px-4 py-2.5 rounded-full font-semibold transition hover:bg-white/5 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.464 15.464 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 21.5 2.5 13.93 2.5 4a1 1 0 011-1H7a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.71 2.2z"/></svg>
              Call Now
            </a>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="inline-block bg-[rgba(255,255,255,0.04)] text-white px-3 py-1 rounded-full text-sm font-semibold">⏰ Next batch: 31 Oct 2025</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold leading-snug text-white mb-2">Talk to a Counsellor Today</h2>
            <p className="text-slate-200 text-sm md:text-base max-w-lg">Expert guidance to choose the right degree program — short consultation, personalized recommendations, and straightforward EMI options.</p>
          </div>
        </div>

  <div className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start text-sm text-slate-100 opacity-90">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-white">✓</span>
            <span>Free consultation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-white">✓</span>
            <span>Compare all programs</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-white">✓</span>
            <span>EMI assistance</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-white">✓</span>
            <span>Admission support</span>
          </div>
        </div>

        <div className="mt-6 text-center md:text-left text-sm text-slate-100 opacity-80">
          <p>📧 admissions@upskillers.com • 📱 +91 98765 43210</p>
        </div>
      </div>
    </section>
  );
}
