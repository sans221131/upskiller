import LeadFormWizard from '../components/LeadFormWizard';

export const metadata = {
  title: 'Find Your Perfect Program - Upskillers',
  description: 'Answer a few questions and we\'ll match you with programs that fit your goals, budget, and schedule.',
};

export default function LeadFormPage() {
  return (
    <div>
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-xl font-bold text-slate-900">Upskillers</span>
          </a>
        </div>
      </div>

      {/* Form Wizard */}
      <LeadFormWizard />
    </div>
  );
}
