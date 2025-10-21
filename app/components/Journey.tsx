export default function Journey() {
  const steps = [
    {
      number: '01',
      title: 'Discover Your Goals',
      description: 'Share your current role, salary expectations, and career aspirations. Our AI analyzes industry trends to suggest optimal paths.',
      metric: '✓ 95% profile completion rate'
    },
    {
      number: '02',
      title: 'Compare with Clarity',
      description: 'Side-by-side program comparisons with curriculum depth, instructor credentials, and ROI projections all in one view.',
      metric: '✓ Avg. 4.2 programs compared'
    },
    {
      number: '03',
      title: 'Enroll with Confidence',
      description: 'Connect with admissions teams armed with counselor summaries, pre-validated financing options, and clear next steps.',
      metric: '✓ 72% enrollment rate'
    }
  ];

  return (
    <section id="journey" className="py-20 px-6 bg-gradient-to-br from-teal-50 to-emerald-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            A Clear Path from <br/>Discovery to Success
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Guided workflows that transform confusion into confidence, helping every professional make informed learning decisions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-4xl font-bold text-teal-600 mb-4">{step.number}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 mb-4">{step.description}</p>
              <div className="text-sm text-teal-600 font-semibold">{step.metric}</div>
            </div>
          ))}
        </div>

        <div className="bg-white p-12 rounded-2xl shadow-sm">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Personalized Learning Roadmaps</h3>
              <p className="text-slate-600 mb-6">
                Share your constraints and goals, then receive a curated shortlist with detailed next steps—all in under three minutes.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-teal-600 text-sm">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Smart questionnaire</div>
                    <div className="text-sm text-slate-600">Adapts based on your responses</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-teal-600 text-sm">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Instant matches</div>
                    <div className="text-sm text-slate-600">AI-powered program recommendations</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-teal-600 text-sm">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Expert follow-up</div>
                    <div className="text-sm text-slate-600">Counselor call scheduled within 24 hours</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-teal-500 to-emerald-600 p-8 rounded-2xl text-white">
              <div className="text-sm font-semibold mb-2 opacity-90">REAL SUCCESS STORY</div>
              <p className="text-lg mb-4 leading-relaxed">
                "Upskillers transformed my career search into a strategic plan. Within 2 months, I transitioned from a developer to a senior engineering role with a 55% salary increase."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold">
                  AK
                </div>
                <div>
                  <div className="font-semibold">Amit Kumar</div>
                  <div className="text-sm opacity-90">Software Engineer → Engineering Manager</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
