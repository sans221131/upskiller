export default function ProcessSteps() {
  const steps = [
    { num: '1', title: 'Profile & Goals', desc: 'Share current role, experience, and target outcomes' },
    { num: '2', title: 'Learning Preferences', desc: 'Select format, pace, and specialization areas' },
    { num: '3', title: 'Budget & Timeline', desc: 'Define investment capacity and availability' },
    { num: '4', title: 'Smart Matches', desc: 'Preview AI-recommended programs with fit scores' },
    { num: '5', title: 'Confirmation', desc: 'Verify via OTP and choose follow-up channel' }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Five Guided Steps in Under Three Minutes
          </h2>
          <p className="text-xl text-slate-600">
            Context-aware sections with smart defaults that capture richer data without adding friction
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-teal-400 transition-all">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-teal-600">
                {step.num}
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-semibold transition-all">
            Preview Assessment Flow
          </button>
          <p className="text-sm text-slate-500 mt-3">No payment required • Progress auto-saves</p>
        </div>
      </div>
    </section>
  );
}
