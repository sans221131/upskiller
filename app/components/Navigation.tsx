"use client";

import Image from "next/image";
import { useState } from "react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
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
          <span className="text-xl font-bold text-slate-900 hidden sm:inline">Upskillers</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="/programs" className="text-slate-600 hover:text-[var(--brand)] transition-colors">
            Programs
          </a>
          <a href="#universities" className="text-slate-600 hover:text-[var(--brand)] transition-colors">
            Universities
          </a>
          <a href="#reviews" className="text-slate-600 hover:text-[var(--brand)] transition-colors">
            Reviews
          </a>
          <a href="/about" className="text-slate-600 hover:text-[var(--brand)] transition-colors">
            About
          </a>
          <a href="#faq" className="text-slate-600 hover:text-[var(--brand)] transition-colors">
            FAQ
          </a>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <a
            href="/lead-form"
            className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md"
            style={{ backgroundColor: 'var(--brand)', color: 'var(--brand-contrast)' }}
          >
            Get Counselling
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-600 hover:text-[var(--brand)]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <a href="/programs" className="text-slate-600 hover:text-[var(--brand)] transition-colors font-medium">
              Programs
            </a>
            <a href="#universities" className="text-slate-600 hover:text-[var(--brand)] transition-colors font-medium">
              Universities
            </a>
            <a href="#reviews" className="text-slate-600 hover:text-[var(--brand)] transition-colors font-medium">
              Reviews
            </a>
            <a href="/about" className="text-slate-600 hover:text-[var(--brand)] transition-colors font-medium">
              About
            </a>
            <a href="#faq" className="text-slate-600 hover:text-[var(--brand)] transition-colors font-medium">
              FAQ
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
