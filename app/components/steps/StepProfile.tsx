'use client';

import { FormData } from '../LeadFormWizard';

interface StepProfileProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

export default function StepProfile({ data, updateData, onNext }: StepProfileProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const employmentStatuses = [
    { value: 'Working professional', label: 'Working professional', icon: '💼', desc: 'Full-time or part-time employee' },
    { value: 'Student', label: 'Student', icon: '🎓', desc: 'Final or pre-final year' },
    { value: 'Entrepreneur', label: 'Entrepreneur / Consultant', icon: '🚀', desc: 'Building your own venture' },
    { value: 'On break', label: 'On a break & exploring', icon: '🔄', desc: 'Planning a focused comeback' },
  ];

  const salaryBands = [
    '< ₹3 LPA',
    '₹3-5 LPA',
    '₹5-8 LPA',
    '₹8-12 LPA',
    '₹12-18 LPA',
    '₹18-25 LPA',
    '> ₹25 LPA',
    'Prefer not to say'
  ];

  const goals = [
    { value: 'Career switch', label: 'Career switch', icon: '🔄' },
    { value: 'Promotion', label: 'Get promoted faster', icon: '📈' },
    { value: 'Entrepreneurship', label: 'Start my business', icon: '🚀' },
    { value: 'Skill upgrade', label: 'Learn new skills', icon: '🎯' },
    { value: 'Salary hike', label: 'Increase salary', icon: '💰' },
    { value: 'Network', label: 'Build network', icon: '🤝' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Where are you in your professional journey?
        </h2>
        <p className="text-slate-700 text-lg">
          We tailor recommendations based on your current context, so pick the one closest to you.
        </p>
      </div>

      {/* Employment Status */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-800">
          Current Status <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {employmentStatuses.map((status) => (
            <button
              key={status.value}
              type="button"
              onClick={() => updateData({ employmentStatus: status.value })}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                data.employmentStatus === status.value
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-slate-200 hover:border-teal-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{status.icon}</span>
                <div>
                  <div className="font-semibold text-slate-900">{status.label}</div>
                  <div className="text-sm text-slate-700">{status.desc}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Experience Years */}
      {data.employmentStatus && data.employmentStatus !== 'Student' && (
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">
            Years of Work Experience <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.5"
            min="0"
            max="40"
            value={data.experienceYears}
            onChange={(e) => updateData({ experienceYears: e.target.value })}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none"
            placeholder="e.g., 3.5"
            required
          />
        </div>
      )}

      {/* Salary Band */}
      {data.employmentStatus === 'Working professional' && (
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">
            Current Salary Range
          </label>
          <select
            value={data.salaryBand}
            onChange={(e) => updateData({ salaryBand: e.target.value })}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none"
          >
            <option value="">Select salary range</option>
            {salaryBands.map((band) => (
              <option key={band} value={band}>{band}</option>
            ))}
          </select>
        </div>
      )}

      {/* Gender */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-800">
          Gender
        </label>
        <div className="flex gap-3">
          {['Male', 'Female', 'Other', 'Prefer not to say'].map((gender) => (
            <button
              key={gender}
              type="button"
              onClick={() => updateData({ gender })}
              className={`px-6 py-3 rounded-full border-2 transition-all ${
                data.gender === gender
                  ? 'border-teal-500 bg-teal-50 text-teal-700'
                  : 'border-slate-200 hover:border-teal-300'
              }`}
            >
              {gender}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Goal */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-800">
          What's your primary goal? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {goals.map((goal) => (
            <button
              key={goal.value}
              type="button"
              onClick={() => updateData({ goal: goal.value })}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                data.goal === goal.value
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-slate-200 hover:border-teal-300'
              }`}
            >
              <div className="text-3xl mb-2">{goal.icon}</div>
              <div className="text-sm font-semibold text-slate-900">{goal.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* What You Get */}
      <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-4">
        <div className="text-sm font-semibold text-teal-900 mb-1">✓ WHAT YOU GET</div>
        <div className="text-sm text-teal-700">
          Connect with alumni mentors from your background within 24 hours of signing up.
        </div>
      </div>

      {/* Next Button */}
      <button
        type="submit"
        disabled={!data.employmentStatus || !data.goal}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-full font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Continue to Course Preferences →
      </button>
    </form>
  );
}
