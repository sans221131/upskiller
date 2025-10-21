import { NextRequest, NextResponse } from 'next/server';
import { desc, eq, getTableColumns } from 'drizzle-orm';

import { db } from '@/db';
import { institutions, programs } from '@/db/schema';

// Programs API - GET all programs or CREATE new program
export async function GET() {
  try {
    const programList = await db
      .select({
        ...getTableColumns(programs),
        institutionName: institutions.name,
      })
      .from(programs)
      .leftJoin(institutions, eq(programs.institutionId, institutions.id))
      .orderBy(desc(programs.createdAt));

    return NextResponse.json(programList);
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const requiredFields = ['institutionId', 'degreeType', 'title'];
    const missing = requiredFields.filter((field) => body[field] === undefined || body[field] === null);

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    const [inserted] = await db
      .insert(programs)
      .values({
        ...body,
        updatedAt: new Date(),
      })
      .returning();

    const [withInstitution] = await db
      .select({
        ...getTableColumns(programs),
        institutionName: institutions.name,
      })
      .from(programs)
      .leftJoin(institutions, eq(programs.institutionId, institutions.id))
      .where(eq(programs.id, inserted.id));

    return NextResponse.json(withInstitution ?? inserted, { status: 201 });
  } catch (error) {
    console.error('Error creating program:', error);
    return NextResponse.json({ error: 'Failed to create program' }, { status: 500 });
  }
}
