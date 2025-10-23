import { NextRequest, NextResponse } from 'next/server';
import { desc } from 'drizzle-orm';

import { db } from '@/db';
import { leads } from '@/db/schema';

export async function GET() {
  try {
    const leadList = await db
      .select()
      .from(leads)
      .orderBy(desc(leads.consentedAt));

    return NextResponse.json(leadList);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const requiredFields = ['fullName', 'email', 'phone'];
    const missing = requiredFields.filter((field) => !body[field]);

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    const insertPayload = {
      fullName: (body.fullName as string).trim(),
      email: (body.email as string).trim(),
      phone: (body.phone as string).replace(/\D/g, '').slice(0, 15),
      gender: (body.gender as string) || null,
      dob: (body.dob as string) || null,
      state: (body.state as string) || null,
      city: (body.city as string) || null,
      employmentStatus: (body.employmentStatus as string) || null,
      salaryBand: (body.salaryBand as string) || null,
      highestQualification: (body.highestQualification as string) || null,
      lastScorePercent: typeof body.lastScorePercent === 'number' ? String(body.lastScorePercent) : null,
      degreeInterest: (body.degreeInterest as string) || null,
      coursePreference: (body.coursePreference as string) || null,
      specialisationInterest: (body.specialisationInterest as string) || null,
      goal: (body.goal as string) || null,
      budgetRange: (body.budgetRange as string) || null,
      wantsEmi: body.wantsEmi === undefined ? false : Boolean(body.wantsEmi),
      category: (body.category as string) || null,
      experienceYears: typeof body.experienceYears === 'number' ? String(body.experienceYears) : null,
      preferredMode: (body.preferredMode as string) || null,
      source: (body.source as string) || 'website',
      utmCampaign: (body.utmCampaign as string) || null,
      status: (body.status as string) || 'new',
    } satisfies typeof leads.$inferInsert;

    const [created] = await db.insert(leads).values(insertPayload).returning();

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
