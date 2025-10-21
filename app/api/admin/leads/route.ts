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

    const [created] = await db
      .insert(leads)
      .values(body)
      .returning();

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
