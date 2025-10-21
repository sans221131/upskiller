'use client';

import { FormData } from '../LeadFormWizard';

interface StepPreferencesProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepPreferences({ data, updateData, onNext, onBack }: StepPreferencesProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const degreeTypes = [
    { value: 'MBA', label: 'MBA', desc: 'Master of Business Administration' },
    { value: 'PGDM', label: 'PGDM', desc: 'Post Graduate Diploma in Management' },
    { value: 'Executive MBA', label: 'Executive MBA', desc: 'For experienced professionals' },
    { value: 'PGPM', label: 'PGPM', desc: 'Post Graduate Program in Management' },
  ];

  const deliveryModes = [
    { value: 'online', label: 'Online', icon: '💻', desc: 'Study from anywhere' },
    { value: 'blended', label: 'Blended', icon: '🔄', desc: 'Online + campus visits' },
    { value: 'weekend', label: 'Weekend', icon: '📅', desc: 'Weekend classes' },
    { value: 'on-campus', label: 'On-Campus', icon: '🏫', desc: 'Full-time campus' },
  ];

  const specialisations = [
    'Finance', 'Marketing', 'Human Resources', 'Operations', 
    'Business Analytics', 'Digital Marketing', 'Entrepreneurship',
    'Supply Chain', 'International Business', 'Not sure yet'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          What type of program are you looking for?
        </h2>
        <p className="text-slate-700 text-lg">
          Help us understand your learning preferences and interests.
        </p>
      </div>

      {/* Degree Type */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-800">
          Degree Type <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {degreeTypes.map((degree) => (
            <button
              key={degree.value}
              type="button"
              onClick={() => updateData({ degreeInterest: degree.value })}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                data.degreeInterest === degree.value
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-slate-200 hover:border-teal-300'
              }`}
            >
              <div className="font-semibold text-slate-900">{degree.label}</div>
              <div className="text-sm text-slate-700">{degree.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Delivery Mode */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-800">
          Preferred Learning Mode <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {deliveryModes.map((mode) => (
            <button
              key={mode.value}
              type="button"
              onClick={() => updateData({ preferredMode: mode.value })}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                data.preferredMode === mode.value
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-slate-200 hover:border-teal-300'
              }`}
            >
              <div className="text-2xl mb-2">{mode.icon}</div>
              <div className="font-semibold text-slate-900 text-sm">{mode.label}</div>
              <div className="text-xs text-slate-700">{mode.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Specialisation Interest */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-800">
          Specialisation Interest
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {specialisations.map((spec) => (
            <button
              key={spec}
              type="button"
              onClick={() => updateData({ specialisationInterest: spec })}
              className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                data.specialisationInterest === spec
                  ? 'border-teal-500 bg-teal-50 text-teal-700'
                  : 'border-slate-200 hover:border-teal-300 text-slate-700'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
        <div className="text-sm font-semibold text-blue-900 mb-1">💡 PRO TIP</div>
        <div className="text-sm text-blue-700">
          Not sure about specialization? Select "Not sure yet" and our counselors will help you decide based on your goals and market demand.
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="px-8 py-4 border-2 border-slate-300 rounded-full font-semibold text-slate-700 hover:border-teal-500 transition-all"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={!data.degreeInterest || !data.preferredMode}
          className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-full font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Continue to Eligibility →
        </button>
      </div>
    </form>
  );
}
