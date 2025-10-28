import Image from "next/image";

export default function Footer() {
  const programs = [
    { name: 'MBA Programs', href: '/programs' },
    { name: 'Specializations', href: '/programs#specializations' },
    { name: 'University Partners', href: '#universities' },
    { name: 'Featured Programs', href: '#featured' }
  ];

  const resources = [
    { name: 'Brochures', href: '#brochures' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Application Guide', href: '#' },
    // EMI Calculator removed per design request
  ];

  const support = [
    { name: 'Get Counselling', href: '/lead-form' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact Us', href: '#contact' },
    { name: 'Admin Login', href: '/admin' }
  ];

  const legal = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Refund Policy', href: '#' }
  ];

  return (
    <footer className="bg-slate-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Redesigned integrated CTA + contact section (merged into footer).
            Removed the "Next batch" badge and simplified CTAs so there is a single primary
            action plus support actions (WhatsApp / Call). */}
        <div className="mx-auto max-w-6xl bg-white/5 backdrop-blur-sm border border-white/6 rounded-2xl p-5 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl md:text-3xl font-extrabold leading-snug text-white mb-2">Talk to a Counsellor Today</h3>
              <p className="text-slate-200 text-sm md:text-base max-w-2xl">Expert guidance to choose the right MBA program — short consultation, personalised recommendations, and straightforward EMI options. No obligation, quick response.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch">
              <a href="/lead-form" className="inline-flex items-center justify-center bg-[var(--brand)] text-white px-6 py-3 rounded-full font-semibold shadow-sm hover:opacity-95 transition text-sm" aria-label="Get free counselling">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 16l4-5h-3V4h-2v7H8l4 5z"/></svg>
                Get Free Counselling
              </a>

              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full font-semibold transition text-sm" aria-label="WhatsApp support">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.84 11.84 0 0 0 12 0C5.373 0 .034 5.338.034 11.96c0 2.11.55 4.17 1.6 5.98L0 24l6.2-1.63A11.88 11.88 0 0 0 12 23.92c6.627 0 12-5.37 12-11.96 0-3.2-1.24-6.2-3.48-8.48z"/></svg>
                WhatsApp
              </a>

              <a href="tel:+919876543210" className="inline-flex items-center gap-2 bg-transparent border border-white/25 text-white px-4 py-3 rounded-full font-semibold transition hover:bg-white/5 text-sm" aria-label="Call now">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.464 15.464 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 21.5 2.5 13.93 2.5 4a1 1 0 011-1H7a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.71 2.2z"/></svg>
                Call Now
              </a>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-12 mb-12">
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
              Your trusted partner for finding the perfect online MBA program from India's top universities.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-[var(--brand)] rounded-full flex items-center justify-center transition-all">
                <span className="text-lg">📘</span>
              </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-[var(--brand)]/80 rounded-full flex items-center justify-center transition-all">
                <span className="text-lg">🐦</span>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-all">
                <span className="text-lg">▶️</span>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-[var(--brand)]/90 rounded-full flex items-center justify-center transition-all">
                <span className="text-lg">💼</span>
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Programs</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              {programs.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="hover:text-[var(--brand)] transition-colors">
                    {item.name}
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
                  <a href={item.href} className="hover:text-blue-400 transition-colors">
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
                  <a href={item.href} className="hover:text-blue-400 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <span>📧</span>
                <span>admissions@upskillers.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📱</span>
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <span>💬</span>
                <a href="https://wa.me/919876543210" className="hover:text-green-400 transition-colors">
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
            <div className="flex flex-wrap gap-6 justify-center">
              {legal.map((item) => (
                <a key={item.name} href={item.href} className="hover:text-[var(--brand)] transition-colors">
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-500 text-center md:text-left">
            All programs listed are from UGC-entitled universities with valid accreditations.
          </div>
        </div>
      </div>
    </footer>
  );
}
