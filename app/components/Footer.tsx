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
        {/* Counsellor CTA removed as requested */}
  {/* Show two columns on small screens so footer doesn't look empty; keep 4 columns on md+ */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
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
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 hover:bg-[var(--brand)] rounded-full flex items-center justify-center transition-all" aria-label="Instagram">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M16 11.99a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="18.5" cy="5.5" r="0.75" fill="currentColor"/>
                </svg>
              </a>

              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all" aria-label="Facebook">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.34 2 1.86 6.48 1.86 12.07c0 4.99 3.66 9.12 8.44 9.86v-6.99H8.54v-2.87h3.76V9.4c0-3.73 2.22-5.78 5.62-5.78 1.63 0 3.33.29 3.33.29v3.66h-1.88c-1.85 0-2.42 1.15-2.42 2.33v2.1h4.12l-.66 2.87h-3.46v6.99c4.78-.74 8.44-4.87 8.44-9.86z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 hover:bg-sky-600 rounded-full flex items-center justify-center transition-all" aria-label="LinkedIn">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.026-3.037-1.85-3.037-1.851 0-2.134 1.446-2.134 2.94v5.666H9.355V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.367-1.85 3.598 0 4.266 2.367 4.266 5.451v6.29zM5.337 7.433a2.066 2.066 0 110-4.132 2.066 2.066 0 010 4.132zM6.962 20.452H3.712V9h3.25v11.452z"/>
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
                <span className="font-medium">admissions@upskillers.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
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
