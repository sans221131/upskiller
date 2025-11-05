"use client";

import { useState, useMemo } from "react";

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("Admissions");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const faqCategories = {
    "Admissions": [
      {
        question: "What are the eligibility criteria for degree programs?",
        answer: "Most programs require previous educational qualifications appropriate to the level (e.g., 10+2 for bachelor's, bachelor's degree for master's). Minimum marks typically range from 45-50%. Specific eligibility varies by university and program."
      },
      {
        question: "How do I apply for a degree program?",
        answer: "Fill out our online application form, speak with a counselor, submit required documents, and complete the admission process. The entire process typically takes 3-5 business days."
      },
      {
        question: "When do the batches start?",
        answer: "Most universities have multiple intake cycles throughout the year - typically in January, April, July, and October. Check program pages for specific intake details."
      },
      {
        question: "Is entrance exam required?",
        answer: "Requirements vary by university. Some accept CAT/MAT/XAT scores, while others conduct their own entrance tests or offer direct admission based on academic performance."
      }
    ],
    "Fees & EMI": [
      {
        question: "What is the fee structure for online degree programs?",
        answer: "Fees vary by degree level and university, typically ranging from ₹30,000 to ₹3,50,000 depending on the program and specialization. Detailed fee breakdown is available in program brochures and during counseling."
      },
      {
        question: "Are EMI options available?",
        answer: "Yes! Most programs offer flexible EMI options with 0% interest. EMI tenures range from 6 to 24 months. Our counselors can help you choose the best payment plan."
      },
      {
        question: "Are there any hidden fees?",
        answer: "No hidden fees. The program fee includes tuition, study materials, and LMS access. Exam fees and convocation charges (if applicable) are mentioned upfront."
      },
      {
        question: "Can I get a refund if I withdraw?",
        answer: "Refund policies vary by institution. Most universities offer full refund if you withdraw before course commencement, and partial refund within the first month. Check specific university policies."
      }
    ],
    "Curriculum & Exams": [
      {
        question: "How are online degree programs delivered?",
        answer: "Programs combine recorded video lectures, live sessions, case studies, assignments, and projects. You get 24/7 access to the learning management system (LMS)."
      },
      {
        question: "What is the exam pattern?",
        answer: "Assessment typically includes assignments, projects, quizzes, and semester-end exams. Some programs offer online proctored exams, while others require campus visits for exams."
      },
      {
        question: "How much time do I need to dedicate weekly?",
        answer: "Plan for 10-15 hours per week including lectures, assignments, and self-study. The flexible format allows you to learn at your own pace while working full-time."
      },
      {
        question: "Are the degrees UGC-entitled?",
        answer: "Yes! All programs listed on our platform are from UGC-entitled universities offering degrees with the same value as regular on-campus programs."
      }
    ],
    "Placements": [
      {
        question: "Do online degree programs offer placement assistance?",
        answer: "Most universities provide career support including resume building, interview prep, and job portal access. Placement guarantees vary by institution and program level."
      },
      {
        question: "What is the average salary after completing an online degree?",
        answer: "Salary depends on your degree level, specialization, prior experience, and industry. Many professionals see significant career growth and salary improvements within 1-2 years of completing their degree."
      },
      {
        question: "Are online degree graduates hired by top companies?",
        answer: "Yes! Graduates work at companies like TCS, Infosys, Wipro, HDFC, Amazon, and more. The degree quality and your skills matter more than the mode of study."
      }
    ],
    "Support": [
      {
        question: "How quickly do I get counselor support?",
        answer: "Our counselors respond within 2-4 hours during business hours. You can reach us via phone, email, or WhatsApp for any queries."
      },
      {
        question: "Is the counseling service really free?",
        answer: "Yes! All our counseling, program comparison, and guidance services are completely free for students. We partner with universities who compensate us."
      },
      {
        question: "Can I change my specialization later?",
        answer: "Specialization flexibility varies by university. Some allow changes in the first semester, while others require you to choose during admission. Consult with our counselors for specific cases."
      },
      {
        question: "What if I face technical issues with online classes?",
        answer: "Universities provide dedicated technical support teams. Additionally, our counselors can help coordinate with the university for any LMS or access issues."
      }
    ]
  };

  const categories = Object.keys(faqCategories);
  // combined list for search
  const activeList = faqCategories[activeCategory as keyof typeof faqCategories];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return activeList;
    return activeList.filter(
      (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  }, [search, activeList]);

  // helper to highlight matched terms
  const highlight = (text: string, q: string) => {
    if (!q) return text;
    try {
      const escaped = q.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
      const parts = text.split(new RegExp(`(${escaped})`, "ig"));
      return parts.map((part, i) =>
        part.toLowerCase() === q.toLowerCase() ? (
          <mark key={i} className="bg-yellow-100 text-yellow-800 px-0 rounded-sm">
            {part}
          </mark>
        ) : (
          part
        )
      );
    } catch (e) {
      return text;
    }
  };

  return (
    <section id="faq" className="py-20 px-6 bg-gradient-to-br from-slate-50 to-[var(--brand)]/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">Smart FAQ</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Find answers to common questions about degree programs, admissions, and more — or search to jump straight to the answer.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 items-start">
          {/* Left: categories + search */}
          <aside className="md:col-span-1">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm sticky top-24">
                <div className="mb-4">
                <label className="sr-only">Search FAQs</label>
                <div className="relative">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search questions, e.g. 'EMI'"
                    className="w-full border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)] text-black"
                  />
                  <svg className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21 20l-4.35-4.35"/><path fill="currentColor" d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/></svg>
                </div>
                {search && (
                  <div className="mt-2 text-xs text-slate-500">Showing <span className="font-semibold text-slate-700">{filtered.length}</span> result{filtered.length !== 1 ? 's' : ''} for "<span className="font-medium">{search}</span>"</div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setSearch(""); setOpenIndex(null); }}
                    className={`text-left px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-3 ${activeCategory === cat ? 'bg-[var(--brand)]/10 text-[var(--brand)] ring-1 ring-[var(--brand)]/20' : 'bg-white text-slate-700 border border-slate-100 hover:bg-[var(--brand)]/5'}`}
                  >
                    <span className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-slate-200 text-sm font-bold">{cat.charAt(0)}</span>
                    <span className="flex-1">{cat}</span>
                    <span className="text-xs text-slate-400">{faqCategories[cat as keyof typeof faqCategories].length}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Right: FAQ list */}
          <div className="md:col-span-3">
            <div className="space-y-4">
              {filtered.length === 0 && (
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
                  <p className="text-slate-700 mb-2">No results found for "<span className="font-semibold">{search}</span>"</p>
                  <p className="text-sm text-slate-500 mb-4">Try different keywords (e.g. 'EMI', 'refund', 'admissions') or talk to our counselors.</p>
                  <a href="/lead-form" className="inline-block px-5 py-2 rounded-full bg-[var(--brand)] text-white font-semibold">Talk to a Counselor</a>
                </div>
              )}

              {filtered.map((faq, idx) => {
                const open = openIndex === idx;
                return (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(open ? null : idx)}
                      className="w-full text-left flex items-start gap-4"
                      aria-expanded={open}
                    >
                      <div className="w-2 bg-[var(--brand)]/10 rounded-full mt-2" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="font-semibold text-lg text-slate-900">{highlight(faq.question, search)}</h3>
                          <svg className={`w-5 h-5 text-slate-400 transform transition-transform ${open ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>
                        </div>
                        <div className={`mt-3 text-slate-600 leading-relaxed transition-max-h duration-300 ${open ? 'max-h-96' : 'max-h-0 overflow-hidden'}`}>
                          <p>{highlight(faq.answer, search)}</p>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-[var(--brand)]/6 border border-[var(--brand)]/10 text-center">
              <p className="text-slate-800 mb-3">Still have questions? Our counselors will help you pick the right program.</p>
              <a href="/lead-form" className="inline-block px-6 py-2 rounded-full bg-[var(--brand)] text-white font-semibold">Talk to a Counselor</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
