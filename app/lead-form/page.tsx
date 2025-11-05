import Image from "next/image";
import LeadFormWizard from '../components/LeadFormWizard';

export const metadata = {
  title: 'Get Degree Counselling - Upskillers',
  description: 'Answer a few questions and get personalized degree program recommendations from our expert counselors.',
};

export default function LeadFormPage() {
  return (
    <div>
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <a href="/" className="flex items-center gap-3">
            <Image 
              src="/logo.jpg" 
              alt="Upskillers Logo" 
              width={40} 
              height={40}
              className="rounded-lg"
            />
            <span className="text-xl font-bold text-slate-900">Upskillers</span>
          </a>
        </div>
      </div>

      {/* Form Wizard */}
      <LeadFormWizard />
    </div>
  );
}
