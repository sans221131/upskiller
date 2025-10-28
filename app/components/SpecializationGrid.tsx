"use client";

export default function SpecializationGrid() {
  const specializations = [
    {
      name: "Marketing",
      icon: "📈",
      description: "Brand management, digital marketing, consumer behavior",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      hoverBorder: "hover:border-pink-400",
    },
    {
      name: "Finance",
      icon: "💰",
      description: "Investment banking, financial analysis, risk management",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      hoverBorder: "hover:border-green-400",
    },
    {
      name: "HR",
      icon: "👥",
      description: "Talent management, organizational behavior, HRIS",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      hoverBorder: "hover:border-blue-400",
    },
    {
      name: "Business Analytics",
      icon: "📊",
      description: "Data science, predictive modeling, business intelligence",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      hoverBorder: "hover:border-purple-400",
    },
    {
      name: "Operations",
      icon: "⚙️",
      description: "Supply chain, logistics, process optimization",
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      hoverBorder: "hover:border-orange-400",
    },
    {
      name: "IT/AI",
      icon: "🤖",
      description: "Technology management, AI strategy, digital transformation",
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      hoverBorder: "hover:border-teal-400",
    },
    {
      name: "Healthcare",
      icon: "🏥",
      description: "Hospital administration, health informatics, policy",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      hoverBorder: "hover:border-red-400",
    },
    {
      name: "General Management",
      icon: "🎯",
      description: "Strategic management, leadership, entrepreneurship",
      color: "from-slate-500 to-gray-500",
      bgColor: "bg-slate-50",
      borderColor: "border-slate-200",
      hoverBorder: "hover:border-slate-400",
    },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Choose Your Specialization
          </h2>
          <p className="text-xl text-slate-600">
            Explore MBA programs tailored to your career goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specializations.map((spec, index) => (
            <a
              key={index}
              href={`/programs?specialization=${encodeURIComponent(spec.name)}`}
              className={`group p-6 rounded-2xl border-2 ${spec.borderColor} ${spec.bgColor} ${spec.hoverBorder} hover:shadow-xl transition-all cursor-pointer`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${spec.color} flex items-center justify-center mb-4 text-3xl group-hover:scale-110 transition-transform`}>
                  {spec.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {spec.name}
                </h3>
                <p className="text-sm text-slate-600">
                  {spec.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/programs"
            className="inline-block bg-[var(--brand)] hover:bg-[var(--brand)]/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            View All Programs
          </a>
        </div>
      </div>
    </section>
  );
}
