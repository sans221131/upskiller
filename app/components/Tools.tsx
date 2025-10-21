export default function Tools() {
  const tools = [
    {
      icon: '💵',
      title: 'ROI Forecaster',
      description: 'Calculate expected salary growth versus tuition costs, factoring in industry benchmarks, inflation, and career trajectory.',
      bgColor: 'from-teal-400 to-teal-600',
      link: 'Open Calculator'
    },
    {
      icon: '🎓',
      title: 'Scholarship Finder',
      description: 'Match institution-specific scholarships, corporate partnerships, and merit-based grants with your unique profile instantly.',
      bgColor: 'from-emerald-400 to-emerald-600',
      link: 'Check Eligibility'
    },
    {
      icon: '📋',
      title: 'Progress Tracker',
      description: 'Stay on top of application deadlines, document requirements, and counselor reminders—all organized in one dashboard.',
      bgColor: 'from-cyan-400 to-cyan-600',
      link: 'View Dashboard'
    }
  ];

  const paymentFeatures = [
    { icon: '✓', title: 'Zero upfront payment options', description: 'Start learning, pay as you go' },
    { icon: '✓', title: 'Flexible tenure from 6-36 months', description: 'Choose what works for your budget' },
    { icon: '✓', title: 'Interest rates from 0-15%', description: 'Based on partner lender approval' }
  ];

  return (
    <section id="tools" className="py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Interactive Tools That Keep You Engaged
          </h2>
          <p className="text-xl text-slate-600">
            Smart calculators and planners that show real-time value and keep you motivated throughout your journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all">
              <div className={`w-14 h-14 bg-gradient-to-br ${tool.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                <span className="text-white text-2xl">{tool.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{tool.title}</h3>
              <p className="text-slate-600 mb-6">{tool.description}</p>
              <button className="text-teal-600 font-semibold hover:text-teal-700 flex items-center gap-2 group">
                {tool.link}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-teal-600 to-emerald-600 p-10 rounded-3xl text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Payment Planner Built Right In</h3>
              <p className="mb-6 opacity-90">
                Toggle monthly affordability, compare financing options, and explore EMI plans with real-time calculations from partner institutions.
              </p>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="opacity-75 mb-1">Selected Program Fee</div>
                    <div className="text-2xl font-bold">₹1.85L</div>
                  </div>
                  <div>
                    <div className="opacity-75 mb-1">Tenure</div>
                    <div className="text-2xl font-bold">18 months</div>
                  </div>
                  <div>
                    <div className="opacity-75 mb-1">Monthly EMI</div>
                    <div className="text-2xl font-bold">₹11,200</div>
                  </div>
                  <div>
                    <div className="opacity-75 mb-1">Total Savings</div>
                    <div className="text-2xl font-bold">₹18,500</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {paymentFeatures.map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">{feature.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold">{feature.title}</div>
                      <div className="text-sm opacity-75">{feature.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
