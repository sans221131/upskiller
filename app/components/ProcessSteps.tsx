"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  IconTarget,
  IconFileDescription,
  IconSend,
  IconConfetti,
  IconSchool,
  IconShieldCheck,
  IconWorld,
  IconStars,
  IconChecks,
  IconCertificate,
} from "@tabler/icons-react";
import React from "react";

/**
 * ProcessSteps — premium “How we admit you” section
 * - Brand colours: CSS variables (teal) — use --brand and --brand-teal-light
 * - Arrow connectors between steps (no solid bar)
 * - Motion respects prefers-reduced-motion
 */
export default function ProcessSteps() {
  // Use CSS variables for brand colours (teal) provided in globals.css
  const primary = "var(--brand)";
  const primaryDark = "var(--brand-teal-light)";
  const reduce = useReducedMotion();

  const stats = [
    { label: "Successful Admissions", value: "98%", description: "Students placed into preferred universities", icon: IconShieldCheck },
    { label: "Years of Experience", value: "12+", description: "Seasoned guidance in higher education", icon: IconCertificate },
    { label: "Client Satisfaction", value: "4.9/5", description: "Average rating from students & families", icon: IconStars },
    { label: "Application Success Rate", value: "92%", description: "Acceptance uplift with our process", icon: IconChecks },
  ];

  const reasons = [
    { icon: IconSchool, title: "Expert Admission Guidance", description: "Senior counsellors who know what committees actually scan for, and how to present your profile cleanly." },
    { icon: IconWorld, title: "Global University Network", description: "Direct channels to 500+ universities with priority slots and quick clarifications when documents get tricky." },
    { icon: IconFileDescription, title: "End-to-End Paperwork", description: "SOPs, LORs, transcripts, notarisation, visa checklists—tight templates, zero guesswork." },
    { icon: IconTarget, title: "Personalised Matching", description: "AI-assisted shortlists aligned to budget, background, and career targets—no catalogue dumping." },
  ];

  const processSteps = [
    { title: "Profile Assessment", description: "We map academics, goals, and constraints.", icon: IconFileDescription },
    { title: "University Matching", description: "Curated shortlist + admit chances.", icon: IconTarget },
    { title: "Application Submission", description: "Documents, forms, timelines—handled.", icon: IconSend },
    { title: "Admission Success", description: "Offer letter + next-steps playbook.", icon: IconConfetti },
  ];

  return (
    <section aria-labelledby="process-heading" className="relative py-32 px-4 sm:px-6 lg:px-8">
      {/* Background texture */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
        "radial-gradient(60rem 40rem at 50% -10%, rgba(46,124,116,0.10), transparent 60%), radial-gradient(50rem 30rem at 10% 110%, rgba(92,160,158,0.08), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-7xl">
        {/* Success pill removed per request */}

        {/* Title and subtitle removed per request */}

        {/* Stats section commented out */}

        {/* Reasons section commented out */}

  {/* Timeline */}
  <Card className="mb-8 p-8 md:p-12 lg:p-16 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-8 left-8 w-32 h-32 rounded-full" style={{ background: `linear-gradient(135deg, ${primary}, ${primaryDark})` }} />
            <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full" style={{ background: `linear-gradient(135deg, ${primary}, ${primaryDark})` }} />
          </div>
          
          <div className="relative z-10">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <span className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold shadow-xl ring-1 ring-white/20" 
                style={{ background: `linear-gradient(135deg, rgba(46,124,116,0.15), rgba(92,160,158,0.10))`, color: primary }}>
                <span className="h-2.5 w-2.5 rounded-full animate-pulse" style={{ background: primary }} />
                Simple Process
              </span>
              <h3 className="mt-8 text-4xl font-extrabold text-slate-900 md:text-5xl lg:text-6xl">
                Four steps. Zero overwhelm.
              </h3>
              <p className="mt-4 text-lg text-slate-600">
                Your journey to university admission, streamlined and stress-free
              </p>
            </div>

            {/* Enhanced process flow */}
            <div className="mb-16">
              {/* Desktop view */}
              <div className="hidden lg:block">
                <div className="relative flex items-center justify-between px-8">
                  {/* Progress line */}
                  <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-20">
                    <div className="h-1 w-full rounded-full bg-slate-200">
                      <motion.div
                        className="h-1 rounded-full"
                        style={{ background: `linear-gradient(90deg, ${primary}, ${primaryDark})` }}
                        initial={{ width: reduce ? "100%" : 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                      />
                    </div>
                  </div>
                  
                  {processSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: reduce ? 1 : 0.8, opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 }}
                      whileInView={{ scale: 1, opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ delay: i * 0.15, type: "spring", stiffness: 200, damping: 15 }}
                      className="relative z-20 flex flex-col items-center"
                    >
                      {/* Step circle */}
                      <div className="group relative mb-6">
                        <div
                          className="flex h-20 w-20 items-center justify-center rounded-full text-white text-xl font-bold shadow transition-all duration-300 group-hover:scale-110"
                          style={{ background: primary }}
                        >
                          <step.icon className="h-8 w-8" aria-hidden />
                        </div>
                      </div>
                      
                      {/* Step info */}
                      <div className="text-center max-w-xs">
                        <div className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
                          style={{ background: `linear-gradient(135deg, ${primary}, ${primaryDark})` }}>
                          Step {i + 1}
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile/Tablet view */}
              <div className="block lg:hidden">
                <div className="space-y-8">
                  {processSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      className="flex items-center gap-6 group"
                    >
                      <div className="relative">
                        <div
                          className="flex h-16 w-16 items-center justify-center rounded-full text-white text-lg font-bold shadow transition-all duration-300 group-hover:scale-110"
                          style={{ background: primary }}
                        >
                          <step.icon className="h-6 w-6" aria-hidden />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="mb-1 inline-block rounded-full px-2 py-1 text-xs font-bold uppercase tracking-wide text-white"
                          style={{ background: `linear-gradient(135deg, ${primary}, ${primaryDark})` }}>
                          Step {i + 1}
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h4>
                        <p className="text-slate-600 leading-relaxed">{step.description}</p>
                      </div>
                      
                      {/* Connector line for mobile */}
                      {i < processSteps.length - 1 && (
                        <div className="absolute left-8 mt-16 h-8 w-px bg-gradient-to-b from-slate-300 to-transparent" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Offer Letter */}
            <motion.div
              initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <OfferLetter primary={primary} primaryDark={primaryDark} />
            </motion.div>
          </div>
        </Card>

        {/* Enhanced CTA */}
        <motion.div 
          className="relative text-center pt-6"
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-32 w-96 rounded-full opacity-20 blur-3xl" 
              style={{ background: `linear-gradient(135deg, ${primary}, ${primaryDark})` }} />
          </div>
          
          <div className="relative z-10">
            <motion.a
              href="/lead-form"
              className="group relative inline-flex items-center justify-center rounded-full px-16 py-6 text-xl font-bold text-white shadow-2xl outline-none transition-all duration-300 hover:scale-105 focus-visible:ring-4 mb-8 overflow-hidden"
              style={{ 
                background: `linear-gradient(135deg, ${primary}, ${primaryDark})`, 
                boxShadow: `0 25px 50px -12px rgba(46,124,116,0.4)` 
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              <span className="relative flex items-center gap-3">
                Start Your University Application
                <motion.span 
                  className="text-2xl"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </span>
            </motion.a>
            
            <div className="flex flex-wrap items-center justify-center gap-8 text-slate-600">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="font-semibold">Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="font-semibold">98% Success Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="font-semibold">Expert Counselors</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- subcomponents ---------- */

function Card({
  children,
  className = "",
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-3xl border border-slate-100/50 bg-white/95 p-8 shadow-xl backdrop-blur-sm relative overflow-hidden",
        hover ? "transition-all duration-500 will-change-transform hover:-translate-y-3 hover:shadow-2xl hover:scale-[1.02] group" : "",
        className,
      ].join(" ")}
      role="group"
    >
      {/* Subtle gradient overlay on hover */}
      {hover && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-slate-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      
      {/* Top highlight bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-200/50 to-transparent" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

function ArrowConnector({ primary, primaryDark }: { primary: string; primaryDark: string }) {
  const id = React.useId();
  return (
    <svg className="mx-4 h-4 w-full" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={primary} />
          <stop offset="1" stopColor={primaryDark} />
        </linearGradient>
        <marker id={`${id}-arrow`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={`url(#${id}-grad)`} />
        </marker>
      </defs>

      {/* faint guide underlay */}
      <line x1="0" y1="4" x2="100" y2="4" stroke="rgba(15,23,42,0.12)" strokeWidth="2" />
      {/* gradient stroke with arrowhead */}
      <line x1="0" y1="4" x2="100" y2="4" stroke={`url(#${id}-grad)`} strokeWidth="2.5" markerEnd={`url(#${id}-arrow)`} />
    </svg>
  );
}

function OfferLetter({ primary, primaryDark }: { primary: string; primaryDark: string }) {
  return (
    <div className="mt-8 flex w-full justify-center items-center">
      <div className="text-center flex flex-col items-center">
        <h4 className="text-2xl font-bold text-slate-900 mb-8">Your Success Story Starts Here</h4>
        
        <div className="relative group flex justify-center">
          {/* Enhanced floating papers */}
          <motion.div
            initial={{ y: -8, opacity: 0.6, rotate: 12 }}
            animate={{ y: [-8, 4, -8], rotate: [12, 8, 12] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            className="absolute -right-6 -top-4 h-8 w-6 rounded-lg bg-white shadow-lg ring-1 ring-slate-200"
            aria-hidden
          />
          <motion.div
            initial={{ y: -12, opacity: 0.4, rotate: -8 }}
            animate={{ y: [-12, 6, -12], rotate: [-8, -4, -8] }}
            transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut" }}
            className="absolute right-8 -top-8 h-7 w-5 rounded-lg bg-white shadow-lg ring-1 ring-slate-200"
            aria-hidden
          />
          <motion.div
            initial={{ y: -6, opacity: 0.5, rotate: 15 }}
            animate={{ y: [-6, 3, -6], rotate: [15, 10, 15] }}
            transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}
            className="absolute -left-4 -top-2 h-6 w-4 rounded bg-white shadow-lg ring-1 ring-slate-200"
            aria-hidden
          />

          {/* Enhanced main card */}
          <motion.div
            className="relative h-[28rem] w-[22rem] mx-auto rotate-1 rounded-3xl border-2 bg-gradient-to-b from-white via-white to-slate-50/80 p-8 shadow-2xl transition-all duration-500 group-hover:rotate-0 group-hover:scale-105"
                style={{ 
                  borderColor: primary, 
                  boxShadow: `0 40px 80px -24px rgba(46,124,116,0.4), 0 0 0 1px rgba(255,255,255,0.05)` 
                }}
            aria-label="Sample Offer Letter"
            whileHover={{ 
              boxShadow: `0 50px 100px -24px rgba(46,124,116,0.5), 0 0 0 1px rgba(255,255,255,0.1)`,
              y: -5
            }}
          >
            {/* Header */}
            <div className="mb-6 text-center">
              <motion.div 
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-xl"
                style={{ background: `linear-gradient(135deg, ${primary}, ${primaryDark})` }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <IconCertificate className="h-9 w-9" aria-hidden />
              </motion.div>
              <h4 className="text-2xl font-extrabold tracking-tight" style={{ color: primary }}>
                ADMISSION LETTER
              </h4>
              <motion.div 
                className="mx-auto mt-3 h-1.5 w-20 rounded-full"
                style={{ background: `linear-gradient(135deg, ${primary}, ${primaryDark})` }}
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>

            {/* Content lines with stagger animation */}
            <div className="space-y-4">
              {[100, 83, 67].map((width, i) => (
                <motion.div
                  key={i}
                  className="h-2.5 rounded-full bg-gradient-to-r from-slate-200 to-slate-100"
                  style={{ width: `${width}%` }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
                />
              ))}
              
              {/* Acceptance badge */}
              <div className="pt-6 text-center">
                <motion.span 
                  className="inline-block rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-3 text-xl font-bold text-green-600 ring-2 ring-green-200 shadow-lg"
                  initial={{ scale: 0, rotate: -10 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.05 }}
                >
                  🎉 ACCEPTED
                </motion.span>
              </div>
              
              {[80, 50].map((width, i) => (
                <motion.div
                  key={i + 3}
                  className="h-2.5 rounded-full bg-gradient-to-r from-slate-200 to-slate-100"
                  style={{ width: `${width}%` }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: (i + 3) * 0.1 + 0.3, duration: 0.6 }}
                />
              ))}
            </div>

            {/* Success checkmark */}
            <motion.div
              className="absolute bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-xl"
              style={{ background: `linear-gradient(135deg, ${primary}, ${primaryDark})` }}
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
              whileHover={{ rotate: 360 }}
            >
              ✓
            </motion.div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </motion.div>
        </div>
        
        <motion.p 
          className="mt-4 text-lg text-slate-600 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          Join thousands of successful students who chose Upskillers
        </motion.p>
      </div>
    </div>
  );
}
