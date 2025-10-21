'use client';

import { FormData } from '../LeadFormWizard';

interface StepEligibilityProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepEligibility({ data, updateData, onNext, onBack }: StepEligibilityProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const qualifications = [
    'Bachelor\'s Degree (Any Stream)',
    'Engineering Degree',
    'Commerce/BBA',
    'Science Degree',
    'Arts/Humanities',
    'Diploma (3 years)',
    'Other'
  ];

  const budgetRanges = [
    '< ₹1 Lakh',
    '₹1-2 Lakhs',
    '₹2-4 Lakhs',
    '₹4-6 Lakhs',
    '₹6-10 Lakhs',
    '> ₹10 Lakhs',
    'Flexible'
  ];

  const categories = [
    'General',
    'OBC',
    'SC',
    'ST',
    'EWS',
    'PWD',
    'Prefer not to say'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Tell us about your educational background
        </h2>
        <p className="text-slate-700 text-lg">
          This helps us match you with programs you're eligible for.
        </p>
      </div>

      {/* Highest Qualification */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-800">
          Highest Qualification <span className="text-red-500">*</span>
        </label>
        <select
          value={data.highestQualification}
          onChange={(e) => updateData({ highestQualification: e.target.value })}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none"
          required
        >
          <option value="">Select your qualification</option>
          {qualifications.map((qual) => (
            <option key={qual} value={qual}>{qual}</option>
          ))}
        </select>
      </div>

      {/* Last Score */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-800">
          Percentage/CGPA in Last Degree
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          max="100"
          value={data.lastScorePercent}
          onChange={(e) => updateData({ lastScorePercent: e.target.value })}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none"
          placeholder="e.g., 75.5 or 7.5 CGPA"
        />
        <p className="text-xs text-slate-500">Enter percentage (e.g., 75) or CGPA (e.g., 7.5)</p>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-800">
          Category
        </label>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => updateData({ category: cat })}
              className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                data.category === cat
                  ? 'border-teal-500 bg-teal-50 text-teal-700'
                  : 'border-slate-200 hover:border-teal-300 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Budget Range */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-800">
          Investment Budget (Total Program Fee) <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {budgetRanges.map((budget) => (
            <button
              key={budget}
              type="button"
              onClick={() => updateData({ budgetRange: budget })}
              className={`px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                data.budgetRange === budget
                  ? 'border-teal-500 bg-teal-50 text-teal-700'
                  : 'border-slate-200 hover:border-teal-300 text-slate-700'
              }`}
            >
              {budget}
            </button>
          ))}
        </div>
      </div>

      {/* EMI Interest */}
      <div className="space-y-2">
        <label className="flex items-center gap-3 p-4 border-2 border-slate-200 rounded-xl hover:border-teal-300 cursor-pointer transition-all">
          <input
            type="checkbox"
            checked={data.wantsEmi}
            onChange={(e) => updateData({ wantsEmi: e.target.checked })}
            className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
          />
          <div>
            <div className="font-semibold text-slate-900">I'm interested in EMI options</div>
            <div className="text-sm text-slate-600">We'll show you flexible payment plans with our partner lenders</div>
          </div>
        </label>
      </div>

      {/* Info Box */}
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4">
        <div className="text-sm font-semibold text-emerald-900 mb-1">✓ SCHOLARSHIP ELIGIBILITY</div>
        <div className="text-sm text-emerald-700">
          Based on your profile, we'll automatically check scholarship opportunities from institutions and recommend the best fit.
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
          disabled={!data.highestQualification || !data.budgetRange}
          className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-full font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          See Recommendations →
        </button>
      </div>
    </form>
  );
}
