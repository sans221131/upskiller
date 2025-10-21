import { NextRequest, NextResponse } from 'next/server';
import { eq, getTableColumns } from 'drizzle-orm';

import { db } from '@/db';
import { institutions, programs } from '@/db/schema';

function parseProgramId(id: string) {
  const programId = Number(id);
  if (!Number.isInteger(programId) || programId <= 0) {
    throw new Error('Invalid program id');
  }
  return programId;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const programId = parseProgramId(params.id);

    const program = await db
      .select({
        ...getTableColumns(programs),
        institutionName: institutions.name,
      })
      .from(programs)
      .leftJoin(institutions, eq(programs.institutionId, institutions.id))
      .where(eq(programs.id, programId))
      .then((rows) => rows[0]);

    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    return NextResponse.json(program);
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid program id') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Error fetching program:', error);
    return NextResponse.json({ error: 'Failed to fetch program' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const programId = parseProgramId(params.id);
    const body = (await request.json()) as Record<string, unknown>;

    const updateData = Object.fromEntries(
      Object.entries(body).filter(([, value]) => value !== undefined)
    );

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No fields provided to update' }, { status: 400 });
    }

    const [updated] = await db
      .update(programs)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(programs.id, programId))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid program id') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Error updating program:', error);
    return NextResponse.json({ error: 'Failed to update program' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const programId = parseProgramId(params.id);

    const [deleted] = await db
      .delete(programs)
      .where(eq(programs.id, programId))
      .returning();

    if (!deleted) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid program id') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Error deleting program:', error);
    return NextResponse.json({ error: 'Failed to delete program' }, { status: 500 });
  }
}
