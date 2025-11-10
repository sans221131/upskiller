"use client";

import Image from "next/image";
import { useState } from "react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="border-b border-slate-200 bg-white/95 backdrop-blur-sm fixed w-full top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="Upskillers Logo"
              width={50}
              height={50}
              className="rounded-lg"
            />
            <span className="text-xl font-bold text-slate-900 hidden sm:inline">
              Upskillers
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a
              href="/programs"
              className="text-slate-600 hover:text-[var(--brand)] transition-colors"
            >
              Programs
            </a>
            <a
              href="#universities"
              className="text-slate-600 hover:text-[var(--brand)] transition-colors"
            >
              Universities
            </a>
            <a
              href="#reviews"
              className="text-slate-600 hover:text-[var(--brand)] transition-colors"
            >
              Reviews
            </a>
            <a
              href="/about"
              className="text-slate-600 hover:text-[var(--brand)] transition-colors"
            >
              About
            </a>
            <a
              href="#faq"
              className="text-slate-600 hover:text-[var(--brand)] transition-colors"
            >
              FAQ
            </a>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919769870405"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-cta relative inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#20BA5A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
              aria-label="Chat on WhatsApp"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="h-5 w-5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span className="hidden sm:inline">WhatsApp</span>
              </span>
            </a>
            <a
              href="/lead-form"
              className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md"
              style={{
                backgroundColor: "var(--brand)",
                color: "var(--brand-contrast)",
              }}
            >
              Get Counselling
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-600 hover:text-[var(--brand)]"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="flex flex-col px-6 py-4 space-y-4">
              <a
                href="/programs"
                className="text-slate-600 hover:text-[var(--brand)] transition-colors font-medium"
              >
                Programs
              </a>
              <a
                href="/#universities"
                className="text-slate-600 hover:text-[var(--brand)] transition-colors font-medium"
              >
                Universities
              </a>
              <a
                href="/#reviews"
                className="text-slate-600 hover:text-[var(--brand)] transition-colors font-medium"
              >
                Reviews
              </a>
              <a
                href="/about"
                className="text-slate-600 hover:text-[var(--brand)] transition-colors font-medium"
              >
                About
              </a>
              <a
                href="/#faq"
                className="text-slate-600 hover:text-[var(--brand)] transition-colors font-medium"
              >
                FAQ
              </a>
            </div>
          </div>
        )}
      </nav>
      {/* mobile-only spacer to offset the fixed header so hero/content isn't hidden under it */}
      <div className="md:hidden h-16" aria-hidden="true" />
    </>
  );
}
