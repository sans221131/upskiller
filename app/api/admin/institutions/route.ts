import { NextRequest, NextResponse } from 'next/server';
import { desc } from 'drizzle-orm';

import { db } from '@/db';
import { institutions } from '@/db/schema';

// Institutions API - GET all institutions or CREATE new institution
export async function GET() {
  try {
    const institutionList = await db
      .select()
      .from(institutions)
      .orderBy(desc(institutions.createdAt));

    return NextResponse.json(institutionList);
  } catch (error) {
    console.error('Error fetching institutions:', error);
    return NextResponse.json({ error: 'Failed to fetch institutions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const requiredFields = ['name', 'slug'];
    const missing = requiredFields.filter((field) => !body[field]);

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    const insertPayload = {
      name: (body.name as string).trim(),
      slug: (body.slug as string).trim(),
      location: (body.location as string) || null,
      accreditation: (body.accreditation as string) || null,
      website: (body.website as string) || null,
      heroImage: (body.heroImage as string) || null,
      logoUrl: (body.logoUrl as string) || null,
      establishedYear: typeof body.establishedYear === 'number' ? body.establishedYear : null,
      shortDescription: (body.shortDescription as string) || null,
    } satisfies typeof institutions.$inferInsert;

    const [created] = await db
      .insert(institutions)
      .values(insertPayload)
      .returning();

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating institution:', error);
    return NextResponse.json({ error: 'Failed to create institution' }, { status: 500 });
  }
}
