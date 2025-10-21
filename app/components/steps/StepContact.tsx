'use client';

import { useState } from 'react';
import { FormData } from '../LeadFormWizard';

interface StepContactProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export default function StepContact({ data, updateData, onSubmit, onBack, isSubmitting }: StepContactProps) {
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      alert('Please consent to be contacted');
      return;
    }
    onSubmit();
  };

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Other'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Final Step: Verify Your Details
        </h2>
        <p className="text-slate-700 text-lg">
          We'll use this information to send your personalized recommendations and connect you with a counselor.
        </p>
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-800">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.fullName}
          onChange={(e) => updateData({ fullName: e.target.value })}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none"
          placeholder="Enter your full name"
          required
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => updateData({ email: e.target.value })}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none"
          placeholder="your.email@example.com"
          required
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-800">
          Mobile Number <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-3.5 text-slate-600">+91</span>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
            className="w-full pl-14 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none"
            placeholder="9876543210"
            maxLength={10}
            required
          />
        </div>
      </div>

      {/* Location */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            State <span className="text-red-500">*</span>
          </label>
          <select
            value={data.state}
            onChange={(e) => updateData({ state: e.target.value })}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none"
            required
          >
            <option value="">Select state</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => updateData({ city: e.target.value })}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none"
            placeholder="Enter your city"
            required
          />
        </div>
      </div>

      {/* Date of Birth */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          Date of Birth
        </label>
        <input
          type="date"
          value={data.dob}
          onChange={(e) => updateData({ dob: e.target.value })}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none"
          max={new Date().toISOString().split('T')[0]}
        />
      </div>

      {/* Consent */}
      <div className="space-y-4">
        <label className="flex items-start gap-3 p-4 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-teal-300 transition-all">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500 mt-0.5"
            required
          />
          <div className="text-sm text-slate-700">
            <span className="font-semibold">I consent to be contacted</span> by Upskillers and partner institutions via phone, email, SMS, and WhatsApp regarding my inquiry. I understand this overrides DND/NDNC registration.
          </div>
        </label>
      </div>

      {/* What Happens Next */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border-2 border-teal-200 rounded-xl p-6">
        <h3 className="font-bold text-slate-900 mb-3">What happens next?</h3>
        <div className="space-y-2 text-sm text-slate-700">
          <div className="flex items-start gap-2">
            <span className="text-teal-600 font-bold">1.</span>
            <span>You'll receive an email with your program matches within 2 minutes</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-teal-600 font-bold">2.</span>
            <span>A dedicated counselor will call you within 24 hours</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-teal-600 font-bold">3.</span>
            <span>Get personalized guidance on applications, EMI, and scholarships</span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-8 py-4 border-2 border-slate-300 rounded-full font-semibold text-slate-700 hover:border-teal-500 transition-all disabled:opacity-50"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !consent}
          className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white py-4 rounded-full font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </>
          ) : (
            'Complete & Get Recommendations →'
          )}
        </button>
      </div>
    </form>
  );
}
