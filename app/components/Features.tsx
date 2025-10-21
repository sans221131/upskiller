export default function Features() {
  const features = [
    {
      icon: '📊',
      title: 'Career Path Analytics',
      description: 'Interactive roadmaps showing skill gaps, market demand, and salary projections for your target role.',
      metric: 'Avg. 38% faster career advancement',
      bgColor: 'bg-teal-100'
    },
    {
      icon: '🤖',
      title: 'AI Learning Advisor',
      description: 'Personalized course recommendations using machine learning to match your goals, timeline, and budget.',
      metric: '92% recommendation accuracy',
      bgColor: 'bg-emerald-100'
    },
    {
      icon: '💰',
      title: 'Cost & ROI Calculator',
      description: 'Compare tuition fees, payment plans, and projected salary increases with real industry data.',
      metric: '47% higher enrollment confidence',
      bgColor: 'bg-cyan-100'
    },
    {
      icon: '🎓',
      title: 'Expert Course Reviews',
      description: 'Verified reviews from working professionals with detailed curriculum breakdowns and career outcomes.',
      metric: 'Maintains >89% satisfaction rate',
      bgColor: 'bg-teal-100'
    },
    {
      icon: '📅',
      title: 'Smart Schedule Planner',
      description: 'Balance work, life, and learning with adaptive schedules that adjust to your availability.',
      metric: '83% course completion rate',
      bgColor: 'bg-emerald-100'
    },
    {
      icon: '🏆',
      title: 'Scholarship Matcher',
      description: 'Automatically find and apply to scholarships based on your profile, background, and chosen programs.',
      metric: '$2.4M in scholarships awarded',
      bgColor: 'bg-cyan-100'
    }
  ];

  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Smart Learning Solutions
          </h2>
          <p className="text-xl text-slate-600">
            Purpose-built tools that turn career aspirations into actionable learning paths
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-teal-300 transition-all hover:shadow-xl">
              <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 mb-4">{feature.description}</p>
              <div className="text-sm font-semibold text-teal-600">{feature.metric}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
