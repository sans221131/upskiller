import { NextResponse } from 'next/server';
import { desc, eq, getTableColumns } from 'drizzle-orm';

import { db } from '@/db';
import { institutions, programs } from '@/db/schema';

export const revalidate = 300; // cache for 5 minutes

export async function GET() {
  try {
    const programList = await db
      .select({
        ...getTableColumns(programs),
        institutionName: institutions.name,
        institutionSlug: institutions.slug,
        institutionLocation: institutions.location,
        institutionAccreditation: institutions.accreditation,
      })
      .from(programs)
      .leftJoin(institutions, eq(programs.institutionId, institutions.id))
      .orderBy(desc(programs.createdAt));

    return NextResponse.json(programList);
  } catch (error) {
    console.error('Error fetching programs for public API:', error);
    return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 });
  }
}
