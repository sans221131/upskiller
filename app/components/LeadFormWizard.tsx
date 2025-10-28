"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import StepProfile from "./steps/StepProfile";
import StepPreferences from "./steps/StepPreferences";
import StepEligibility from "./steps/StepEligibility";
import StepRecommendations from "./steps/StepRecommendations";
import StepContact from "./steps/StepContact";

export interface FormData {
  fullName: string;
  gender: string;
  dob: string;
  employmentStatus: string;
  salaryBand: string;
  experienceYears: string;
  goal: string;
  degreeInterest: string;
  coursePreference: string;
  specialisationInterest: string;
  preferredMode: string;
  highestQualification: string;
  lastScorePercent: string;
  category: string;
  budgetRange: string;
  wantsEmi: boolean;
  email: string;
  phone: string;
  state: string;
  city: string;
  source: string;
  utmCampaign: string;
  selectedPrograms: number[];
}

const initialFormData: FormData = {
  fullName: "",
  gender: "",
  dob: "",
  employmentStatus: "",
  salaryBand: "",
  experienceYears: "",
  goal: "",
  degreeInterest: "",
  coursePreference: "",
  specialisationInterest: "",
  preferredMode: "",
  highestQualification: "",
  lastScorePercent: "",
  category: "",
  budgetRange: "",
  wantsEmi: false,
  email: "",
  phone: "",
  state: "",
  city: "",
  source: "website",
  utmCampaign: "",
  selectedPrograms: [],
};

const STEPS = [
  { key: "profile", label: "Profile" },
  { key: "preferences", label: "Preferences" },
  { key: "eligibility", label: "Eligibility" },
  { key: "recommendations", label: "Matches" },
  { key: "contact", label: "Confirmation" },
] as const;

export default function LeadFormWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const totalSteps = STEPS.length;

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const gotoStep = (index: number) => {
    setCurrentStep(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      gotoStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      gotoStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionError(null);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(payload.error || "Unable to submit. Please try again.");
      }

      router.push("/thank-you");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to submit form. Please try again.";
      setSubmissionError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepContent = useMemo(() => {
    switch (currentStep) {
      case 0:
        return (
          <StepProfile
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
          />
        );
      case 1:
        return (
          <StepPreferences
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 2:
        return (
          <StepEligibility
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <StepRecommendations
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
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
  }, [currentStep, formData, isSubmitting]);

  return (
    <div className="relative min-h-screen bg-slate-50 py-12 px-4">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                Step {currentStep + 1} of {totalSteps}
              </span>
              <span className="text-xs text-slate-400">
                {["~45s", "~60s", "~45s", "~30s", "~30s"][currentStep]}
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-5">
              {STEPS.map((step, index) => {
                const isActive = index === currentStep;
                const isComplete = index < currentStep;
                return (
                  <div key={step.key} className="flex flex-col gap-1 text-left">
                        <div
                          className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                            isActive
                              ? "bg-[var(--brand)] text-white shadow"
                              : isComplete
                              ? "bg-[var(--brand)]/10 text-[var(--brand)]"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                      {index + 1}
                    </div>
                    <span
                      className={`text-sm font-semibold ${
                        isActive ? "text-slate-900" : "text-slate-500"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          {submissionError ? (
            <div className="mb-6 rounded-2xl border border-rose-100 bg-rose-50/70 px-4 py-3 text-sm text-rose-700">
              {submissionError}
            </div>
          ) : null}
          {stepContent}
        </div>

        <div className="text-center text-xs uppercase tracking-[0.28em] text-slate-400">
          Progress auto-saves on this device
        </div>
      </div>
    </div>
  );
}
