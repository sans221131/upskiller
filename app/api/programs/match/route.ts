import { NextRequest, NextResponse } from 'next/server';
import { desc, eq, getTableColumns } from 'drizzle-orm';

import { db } from '@/db';
import { institutions, programs } from '@/db/schema';

interface MatchRequestBody {
  degreeInterest?: string;
  preferredMode?: string;
  budgetRange?: string;
  specialisation?: string;
}

function computeFitScore(program: any, input: MatchRequestBody) {
  let score = 60;

  if (input.degreeInterest && program.degreeType) {
    if (program.degreeType.toLowerCase() === input.degreeInterest.toLowerCase()) {
      score += 18;
    }
  }

  if (input.preferredMode && program.deliveryMode) {
    if (program.deliveryMode === input.preferredMode) {
      score += 12;
    } else if (input.preferredMode === 'online' && program.deliveryMode === 'blended') {
      score += 6;
    }
  }

  if (input.specialisation) {
    const spec = input.specialisation.toLowerCase();
    const composite = `${program.highlights ?? ''} ${program.outcomes ?? ''}`.toLowerCase();
    if (composite.includes(spec) && spec !== 'not sure yet') {
      score += 6;
    }
  }

  if (input.budgetRange && program.totalFee) {
    const total = Number(program.totalFee);
    if (!Number.isNaN(total)) {
      switch (input.budgetRange) {
        case '< ₹1 Lakh':
          if (total <= 100000) score += 6;
          break;
        case '₹1-2 Lakhs':
          if (total >= 100000 && total <= 200000) score += 6;
          break;
        case '₹2-4 Lakhs':
          if (total >= 200000 && total <= 400000) score += 6;
          break;
        case '₹4-6 Lakhs':
          if (total >= 400000 && total <= 600000) score += 6;
          break;
        case '₹6-10 Lakhs':
          if (total >= 600000 && total <= 1000000) score += 6;
          break;
        case '> ₹10 Lakhs':
          if (total > 1000000) score += 6;
          break;
        default:
          break;
      }
    }
  } else if (input.budgetRange === 'Flexible') {
    score += 4;
  }

  return Math.min(score, 97);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as MatchRequestBody;

    const programRows = await db
      .select({
        ...getTableColumns(programs),
        institutionName: institutions.name,
        institutionSlug: institutions.slug,
        institutionLocation: institutions.location,
      })
      .from(programs)
      .leftJoin(institutions, eq(programs.institutionId, institutions.id))
      .orderBy(desc(programs.createdAt));

    const programsWithScores = programRows
      .map((program) => ({
        ...program,
        fitScore: computeFitScore(program, body),
      }))
      .sort((a, b) => b.fitScore - a.fitScore)
      .slice(0, 6);

    return NextResponse.json({ programs: programsWithScores });
  } catch (error) {
    console.error('Program match error:', error);
    return NextResponse.json({ error: 'Unable to fetch recommendations' }, { status: 500 });
  }
}
