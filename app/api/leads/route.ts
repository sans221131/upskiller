import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/db';
import { leadProgramInterests, leads } from '@/db/schema';

interface LeadPayload {
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

const REQUIRED_FIELDS: Array<keyof LeadPayload> = ['fullName', 'email', 'phone'];

const parseNumeric = (value: string) => {
  if (!value) return null;
  const converted = Number(value);
  return Number.isNaN(converted) ? null : converted;
};

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as LeadPayload;

    const missing = REQUIRED_FIELDS.filter((field) => !payload[field] || payload[field].toString().trim().length === 0);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 },
      );
    }

    const phone = payload.phone.replace(/\D/g, '').slice(0, 15);

    const leadInsert = {
      fullName: payload.fullName.trim(),
      gender: payload.gender || null,
      email: payload.email.trim(),
      phone,
      dob: payload.dob ? new Date(payload.dob) : null,
      state: payload.state || null,
      city: payload.city || null,
      employmentStatus: payload.employmentStatus || null,
      salaryBand: payload.salaryBand || null,
      highestQualification: payload.highestQualification || null,
      lastScorePercent: parseNumeric(payload.lastScorePercent),
      degreeInterest: payload.degreeInterest || null,
      coursePreference: payload.coursePreference || null,
      specialisationInterest: payload.specialisationInterest || null,
      goal: payload.goal || null,
      budgetRange: payload.budgetRange || null,
      wantsEmi: Boolean(payload.wantsEmi),
      category: payload.category || null,
      experienceYears: parseNumeric(payload.experienceYears),
      preferredMode: payload.preferredMode || null,
      source: payload.source || 'website',
      utmCampaign: payload.utmCampaign || null,
      status: 'new',
    } satisfies typeof leads.$inferInsert;

    const [createdLead] = await db.insert(leads).values(leadInsert).returning();

    if (createdLead && Array.isArray(payload.selectedPrograms) && payload.selectedPrograms.length > 0) {
      const uniquePrograms = Array.from(new Set(payload.selectedPrograms.filter((id) => Number.isInteger(id))));

      if (uniquePrograms.length > 0) {
        await db
          .insert(leadProgramInterests)
          .values(
            uniquePrograms.map((programId) => ({
              leadId: createdLead.id,
              programId,
              notes: null,
            })),
          )
          .onConflictDoNothing({
            target: [leadProgramInterests.leadId, leadProgramInterests.programId],
          });
      }
    }

    return NextResponse.json({ success: true, leadId: createdLead?.id });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json({ error: 'Unable to submit lead right now.' }, { status: 500 });
  }
}
