export default function CareerTransformation() {
  const benefits = [
    { icon: '🌍', title: 'Learn Anywhere', description: 'Study at your own pace, on your schedule, from anywhere in the world' },
    { icon: '📈', title: 'Career Growth', description: '48% average salary increase within 18 months of completion' },
    { icon: '💼', title: 'Industry Ready', description: 'Curriculum co-created with Fortune 500 companies and startups' },
    { icon: '🎯', title: 'Personalized', description: 'Adaptive learning paths that adjust to your progress and goals' }
  ];

  const transformations = [
    { initials: 'SK', name: 'Sanya Kapoor', increase: '+72%', role: 'Marketing Analyst → Head of Growth', color: 'bg-teal-500', textColor: 'text-teal-400' },
    { initials: 'RV', name: 'Rahul Verma', increase: '+85%', role: 'Junior Developer → Tech Lead', color: 'bg-emerald-500', textColor: 'text-emerald-400' },
    { initials: 'PM', name: 'Priya Mehta', increase: '+60%', role: 'HR Executive → People Operations Director', color: 'bg-cyan-500', textColor: 'text-cyan-400' }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Transform Your Career While You Work
          </h2>
          <p className="text-xl text-slate-600">
            Join thousands of professionals advancing their careers through flexible, industry-aligned programs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-teal-400 transition-all">
              <div className="text-3xl mb-3">{benefit.icon}</div>
              <h3 className="font-bold text-slate-900 mb-2">{benefit.title}</h3>
              <p className="text-sm text-slate-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 text-white p-12 rounded-3xl">
          <h3 className="text-2xl font-bold mb-8 text-center">Real Career Transformations</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {transformations.map((person, index) => (
              <div key={index} className="text-center">
                <div className={`w-20 h-20 ${person.color} rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold`}>
                  {person.initials}
                </div>
                <div className={`text-3xl font-bold ${person.textColor} mb-2`}>{person.increase}</div>
                <div className="text-sm opacity-90 mb-1">{person.name}</div>
                <div className="text-xs text-slate-400">{person.role}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="/lead-form" className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-semibold transition-all">
              Start Your Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
