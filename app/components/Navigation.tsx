export default function Navigation() {
  return (
    <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">U</span>
          </div>
          <span className="text-xl font-bold text-slate-900">Upskillers</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm">
          <a href="#features" className="text-slate-600 hover:text-teal-600 transition-colors">Features</a>
          <a href="#journey" className="text-slate-600 hover:text-teal-600 transition-colors">Your Journey</a>
          <a href="#tools" className="text-slate-600 hover:text-teal-600 transition-colors">Tools</a>
          <a href="#faq" className="text-slate-600 hover:text-teal-600 transition-colors">FAQ</a>
        </div>
        <a href="/lead-form" className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all">
          Get Started
        </a>
      </div>
    </nav>
  );
}
