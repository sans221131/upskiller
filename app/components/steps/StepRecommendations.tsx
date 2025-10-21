'use client';

import { useState, useEffect } from 'react';
import { FormData } from '../LeadFormWizard';

interface StepRecommendationsProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface Program {
  id: number;
  title: string;
  institutionName: string;
  degreeType: string;
  durationMonths: number;
  totalFee: number;
  deliveryMode: string;
  fitScore: number;
  highlights: string;
}

export default function StepRecommendations({ data, updateData, onNext, onBack }: StepRecommendationsProps) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<number[]>(data.selectedPrograms || []);

  useEffect(() => {
    // Fetch matched programs from API
    const fetchPrograms = async () => {
      try {
        const response = await fetch('/api/programs/match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            degreeInterest: data.degreeInterest,
            preferredMode: data.preferredMode,
            budgetRange: data.budgetRange,
            specialisation: data.specialisationInterest,
          }),
        });
        const result = await response.json();
        setPrograms(result.programs || []);
      } catch (error) {
        console.error('Failed to fetch programs:', error);
        // Mock data for demo
        setPrograms([
          {
            id: 1,
            title: 'MBA in Business Analytics',
            institutionName: 'NMIMS Global',
            degreeType: 'MBA',
            durationMonths: 24,
            totalFee: 385000,
            deliveryMode: 'online',
            fitScore: 95,
            highlights: 'UGC Approved • NAAC A+ • Industry Projects',
          },
          {
            id: 2,
            title: 'Executive MBA',
            institutionName: 'Manipal University',
            degreeType: 'Executive MBA',
            durationMonths: 18,
            totalFee: 250000,
            deliveryMode: 'blended',
            fitScore: 88,
            highlights: 'Weekend Classes • Global Faculty • Fortune 500 Projects',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, [data]);

  const toggleProgram = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    updateData({ selectedPrograms: selectedIds });
    onNext();
  };

  const formatFee = (fee: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(fee);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Finding perfect matches for you...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Your Personalized Program Matches
        </h2>
        <p className="text-slate-700 text-lg">
          Based on your profile, here are {programs.length} programs perfectly matched to your goals and budget.
        </p>
      </div>

      {/* Program Cards */}
      <div className="space-y-4">
        {programs.map((program) => (
          <div
            key={program.id}
            onClick={() => toggleProgram(program.id)}
            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedIds.includes(program.id)
                ? 'border-teal-500 bg-teal-50'
                : 'border-slate-200 hover:border-teal-300'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{program.title}</h3>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                    {program.fitScore}% Match
                  </span>
                </div>
                <p className="text-slate-600 font-medium">{program.institutionName}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedIds.includes(program.id)
                  ? 'border-teal-500 bg-teal-500'
                  : 'border-slate-300'
              }`}>
                {selectedIds.includes(program.id) && (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-4">{program.highlights}</p>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Duration:</span>
                <span className="text-slate-600">{program.durationMonths} months</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Mode:</span>
                <span className="text-slate-600 capitalize">{program.deliveryMode}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Fee:</span>
                <span className="text-teal-600 font-bold">{formatFee(program.totalFee)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedIds.length > 0 && (
        <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-4">
          <div className="text-sm font-semibold text-teal-900 mb-1">
            ✓ {selectedIds.length} Program{selectedIds.length > 1 ? 's' : ''} Selected
          </div>
          <div className="text-sm text-teal-700">
            Our counselors will reach out within 24 hours with detailed information about your selected programs.
          </div>
        </div>
      )}

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
          type="button"
          onClick={handleContinue}
          disabled={selectedIds.length === 0}
          className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-full font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Continue to Contact Details →
        </button>
      </div>

      <p className="text-center text-sm text-slate-500">
        You can select multiple programs to compare
      </p>
    </div>
  );
}
