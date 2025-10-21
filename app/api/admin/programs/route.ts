import { NextRequest, NextResponse } from 'next/server';

// Programs API - GET all programs or CREATE new program
export async function GET() {
  try {
    // TODO: Connect to database and fetch programs with institution names
    // const programsData = await db.select({
    //   ...getTableColumns(programs),
    //   institutionName: institutions.name,
    // })
    // .from(programs)
    // .leftJoin(institutions, eq(programs.institutionId, institutions.id));
    
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // TODO: Connect to database and insert program
    // const result = await db.insert(programs).values(body).returning();
    
    return NextResponse.json({ success: true, message: 'Program created' }, { status: 201 });
  } catch (error) {
    console.error('Error creating program:', error);
    return NextResponse.json({ error: 'Failed to create program' }, { status: 500 });
  }
}
