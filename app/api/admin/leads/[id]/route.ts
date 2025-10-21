import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { leads } from '@/db/schema';

function parseLeadId(id: string) {
  const leadId = Number(id);
  if (!Number.isInteger(leadId) || leadId <= 0) {
    throw new Error('Invalid lead id');
  }
  return leadId;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const leadId = parseLeadId(params.id);

    const lead = await db.query.leads.findFirst({
      where: eq(leads.id, leadId),
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json(lead);
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid lead id') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Error fetching lead:', error);
    return NextResponse.json({ error: 'Failed to fetch lead' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const leadId = parseLeadId(params.id);
    const body = (await request.json()) as Record<string, unknown>;

    const updateData = Object.fromEntries(
      Object.entries(body).filter(([, value]) => value !== undefined)
    );

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No fields provided to update' }, { status: 400 });
    }

    const [updated] = await db
      .update(leads)
      .set(updateData)
      .where(eq(leads.id, leadId))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid lead id') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Error updating lead:', error);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const leadId = parseLeadId(params.id);

    const [deleted] = await db
      .delete(leads)
      .where(eq(leads.id, leadId))
      .returning();

    if (!deleted) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid lead id') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Error deleting lead:', error);
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
