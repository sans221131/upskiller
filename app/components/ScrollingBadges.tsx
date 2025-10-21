export default function ScrollingBadges() {
  const badges = [
    'CERTIFIED COURSES',
    'INDUSTRY EXPERTS',
    'FLEXIBLE LEARNING',
    'CAREER COUNSELING IN 3 MINS',
    'GLOBAL CERTIFICATIONS',
    'AI-POWERED MATCHING',
    'SCHOLARSHIP SUPPORT'
  ];

  return (
    <section className="py-8 bg-slate-100 overflow-hidden">
      <div className="flex gap-6 animate-scroll whitespace-nowrap">
        {badges.map((text, i) => (
          <div key={i} className="inline-block px-6 py-3 bg-white rounded-full text-sm font-semibold text-slate-700 border border-slate-200">
            {text}
          </div>
        ))}
      </div>
    </section>
  );
}
