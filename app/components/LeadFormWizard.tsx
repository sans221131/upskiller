'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Step components
import StepProfile from './steps/StepProfile';
import StepPreferences from './steps/StepPreferences';
import StepEligibility from './steps/StepEligibility';
import StepRecommendations from './steps/StepRecommendations';
import StepContact from './steps/StepContact';

export interface FormData {
  // Profile & Goals (Step 1)
  fullName: string;
  gender: string;
  dob: string;
  employmentStatus: string;
  salaryBand: string;
  experienceYears: string;
  goal: string;
  
  // Course Preferences (Step 2)
  degreeInterest: string;
  coursePreference: string;
  specialisationInterest: string;
  preferredMode: string;
  
  // Eligibility Context (Step 3)
  highestQualification: string;
  lastScorePercent: string;
  category: string;
  budgetRange: string;
  wantsEmi: boolean;
  
  // Contact & Confirmation (Step 5)
  email: string;
  phone: string;
  state: string;
  city: string;
  source: string;
  utmCampaign: string;
  
  // Selected programs from recommendations (Step 4)
  selectedPrograms: number[];
}

const initialFormData: FormData = {
  fullName: '',
  gender: '',
  dob: '',
  employmentStatus: '',
  salaryBand: '',
  experienceYears: '',
  goal: '',
  degreeInterest: '',
  coursePreference: '',
  specialisationInterest: '',
  preferredMode: '',
  highestQualification: '',
  lastScorePercent: '',
  category: '',
  budgetRange: '',
  wantsEmi: false,
  email: '',
  phone: '',
  state: '',
  city: '',
  source: 'website',
  utmCampaign: '',
  selectedPrograms: [],
};

export default function LeadFormWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 5;

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/thank-you');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepProfile
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <StepPreferences
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <StepEligibility
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <StepRecommendations
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <StepContact
            data={formData}
            updateData={updateFormData}
            onSubmit={handleSubmit}
            onBack={prevStep}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-teal-600">
              STEP {currentStep} OF {totalSteps}
            </span>
            <span className="text-sm text-slate-500">
              ≈{[45, 60, 45, 30, 30][currentStep - 1]}s
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {renderStep()}
        </div>

        {/* Auto-save indicator */}
        <div className="text-center mt-4 text-sm text-slate-500">
          <span className="inline-flex items-center gap-2">
            <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Progress auto-saves
          </span>
        </div>
      </div>
    </div>
  );
}
