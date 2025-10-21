import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { institutions } from '@/db/schema';

function parseInstitutionId(id: string) {
  const institutionId = Number(id);
  if (!Number.isInteger(institutionId) || institutionId <= 0) {
    throw new Error('Invalid institution id');
  }
  return institutionId;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const institutionId = parseInstitutionId(params.id);

    const institution = await db.query.institutions.findFirst({
      where: eq(institutions.id, institutionId),
    });

    if (!institution) {
      return NextResponse.json({ error: 'Institution not found' }, { status: 404 });
    }

    return NextResponse.json(institution);
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid institution id') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Error fetching institution:', error);
    return NextResponse.json({ error: 'Failed to fetch institution' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const institutionId = parseInstitutionId(params.id);
    const body = (await request.json()) as Record<string, unknown>;

    const updateData = Object.fromEntries(
      Object.entries(body).filter(([, value]) => value !== undefined)
    );

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No fields provided to update' }, { status: 400 });
    }

    const [updated] = await db
      .update(institutions)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(institutions.id, institutionId))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: 'Institution not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid institution id') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Error updating institution:', error);
    return NextResponse.json({ error: 'Failed to update institution' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const institutionId = parseInstitutionId(params.id);

    const [deleted] = await db
      .delete(institutions)
      .where(eq(institutions.id, institutionId))
      .returning();

    if (!deleted) {
      return NextResponse.json({ error: 'Institution not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid institution id') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Error deleting institution:', error);
    return NextResponse.json({ error: 'Failed to delete institution' }, { status: 500 });
  }
}
