/**
 * DATABASE INTEGRATION GUIDE
 * 
 * This file shows how to connect the API endpoints to your Drizzle ORM database.
 * Replace the TODO comments in /api/admin/* route files with these implementations.
 */

// ============================================================================
// EXAMPLE 1: Leads API Integration
// ============================================================================

// File: app/api/admin/leads/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db'; // adjust path to your db connection
import { leads } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const leadsData = await db.select().from(leads);
    return NextResponse.json(leadsData);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await db.insert(leads).values(body).returning();
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}

// File: app/api/admin/leads/[id]/route.ts
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const leadId = parseInt(params.id);
    const body = await request.json();
    
    const result = await db
      .update(leads)
      .set(body)
      .where(eq(leads.id, leadId))
      .returning();
    
    if (result.length === 0) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const leadId = parseInt(params.id);
    
    const result = await db
      .delete(leads)
      .where(eq(leads.id, leadId))
      .returning();
    
    if (result.length === 0) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, deleted: result[0] });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}

// ============================================================================
// EXAMPLE 2: Programs API Integration
// ============================================================================

// File: app/api/admin/programs/route.ts
import { getTableColumns } from 'drizzle-orm';
import { db } from '@/db';
import { programs, institutions } from '@/db/schema';

export async function GET() {
  try {
    const programsData = await db
      .select({
        ...getTableColumns(programs),
        institutionName: institutions.name,
      })
      .from(programs)
      .leftJoin(institutions, eq(programs.institutionId, institutions.id));
    
    return NextResponse.json(programsData);
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await db.insert(programs).values(body).returning();
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating program:', error);
    return NextResponse.json({ error: 'Failed to create program' }, { status: 500 });
  }
}

// File: app/api/admin/programs/[id]/route.ts
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const programId = parseInt(params.id);
    const body = await request.json();
    
    const result = await db
      .update(programs)
      .set(body)
      .where(eq(programs.id, programId))
      .returning();
    
    if (result.length === 0) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating program:', error);
    return NextResponse.json({ error: 'Failed to update program' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const programId = parseInt(params.id);
    
    // Cascade delete will handle:
    // - program_assets
    // - program_faqs
    // - program_specialisations
    // - program_fees
    // - lead_program_interests
    const result = await db
      .delete(programs)
      .where(eq(programs.id, programId))
      .returning();
    
    if (result.length === 0) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, deleted: result[0] });
  } catch (error) {
    console.error('Error deleting program:', error);
    return NextResponse.json({ error: 'Failed to delete program' }, { status: 500 });
  }
}

// ============================================================================
// EXAMPLE 3: Institutions API Integration
// ============================================================================

// File: app/api/admin/institutions/route.ts
import { db } from '@/db';
import { institutions } from '@/db/schema';

export async function GET() {
  try {
    const institutionsData = await db.select().from(institutions);
    return NextResponse.json(institutionsData);
  } catch (error) {
    console.error('Error fetching institutions:', error);
    return NextResponse.json({ error: 'Failed to fetch institutions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await db.insert(institutions).values(body).returning();
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating institution:', error);
    return NextResponse.json({ error: 'Failed to create institution' }, { status: 500 });
  }
}

// File: app/api/admin/institutions/[id]/route.ts
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const institutionId = parseInt(params.id);
    const body = await request.json();
    
    const result = await db
      .update(institutions)
      .set(body)
      .where(eq(institutions.id, institutionId))
      .returning();
    
    if (result.length === 0) {
      return NextResponse.json({ error: 'Institution not found' }, { status: 404 });
    }
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating institution:', error);
    return NextResponse.json({ error: 'Failed to update institution' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const institutionId = parseInt(params.id);
    
    // Cascade delete will handle:
    // - all programs under this institution
    // - all program_assets, program_faqs, etc. for those programs
    // - all lead_program_interests for those programs
    const result = await db
      .delete(institutions)
      .where(eq(institutions.id, institutionId))
      .returning();
    
    if (result.length === 0) {
      return NextResponse.json({ error: 'Institution not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, deleted: result[0] });
  } catch (error) {
    console.error('Error deleting institution:', error);
    return NextResponse.json({ error: 'Failed to delete institution' }, { status: 500 });
  }
}

// ============================================================================
// ADDITIONAL: Advanced Queries Example
// ============================================================================

// Get institution with all its programs
export async function getInstitutionWithPrograms(institutionId: number) {
  const institutionWithPrograms = await db.query.institutions.findFirst({
    where: eq(institutions.id, institutionId),
    with: {
      programs: {
        with: {
          specialisations: true,
          faqs: true,
          fees: true,
        },
      },
    },
  });
  return institutionWithPrograms;
}

// Get program with all details
export async function getProgramDetails(programId: number) {
  const programDetails = await db.query.programs.findFirst({
    where: eq(programs.id, programId),
    with: {
      institution: true,
      specialisations: true,
      fees: true,
      faqs: true,
      assets: {
        with: {
          asset: true,
        },
      },
    },
  });
  return programDetails;
}

// Get leads with program interests
export async function getLeadWithPrograms(leadId: number) {
  const leadWithPrograms = await db.query.leads.findFirst({
    where: eq(leads.id, leadId),
    with: {
      programInterests: {
        with: {
          program: {
            with: {
              institution: true,
            },
          },
        },
      },
    },
  });
  return leadWithPrograms;
}

// Get leads by status for analytics
export async function getLeadsByStatus(status: string) {
  return await db
    .select()
    .from(leads)
    .where(eq(leads.status, status));
}

// Get leads by location (city/state)
export async function getLeadsByLocation(state: string, city?: string) {
  const query = db.select().from(leads).where(eq(leads.state, state));
  if (city) {
    return query.where(eq(leads.city, city));
  }
  return query;
}

// ============================================================================
// NOTES FOR IMPLEMENTATION
// ============================================================================

/*
1. Import paths may need adjustment based on your actual project structure
   Current assumed: @/db and @/db/schema

2. Make sure your database is properly initialized with Drizzle ORM

3. Use TypeScript for type safety - all queries are type-safe with Drizzle

4. For production, add:
   - Authentication middleware (verify admin token)
   - Request validation (zod schemas)
   - Rate limiting
   - Error logging
   - CORS headers if needed

5. Consider adding these features:
   - Pagination for large datasets
   - Sorting options
   - Advanced filtering
   - Full-text search
   - Caching with Redis

6. For cascade deletes:
   - Institutions → deletes all programs
   - Programs → deletes program_assets, program_faqs, program_fees, program_specialisations, lead_program_interests
   - Leads → deletes lead_program_interests

7. Test API endpoints with:
   - curl
   - Postman
   - Thunder Client
   - VS Code REST Client
*/
