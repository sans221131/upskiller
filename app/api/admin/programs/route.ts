import { NextRequest, NextResponse } from "next/server";
import { desc, eq, getTableColumns } from "drizzle-orm";

import { db } from "@/db";
import { institutions, programs } from "@/db/schema";

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
    console.error("Error fetching programs:", error);
    return NextResponse.json(
      { error: "Failed to fetch programs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const requiredFields = ["institutionId", "degreeType", "title"];
    const missing = requiredFields.filter(
      (field) => body[field] === undefined || body[field] === null
    );

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const insertPayload = {
      institutionId: Number(body.institutionId),
      degreeType: (body.degreeType as string).trim(),
      title: (body.title as string).trim(),
      durationMonths:
        typeof body.durationMonths === "number" ? body.durationMonths : null,
      deliveryMode:
        typeof body.deliveryMode === "string" &&
        ["online", "blended", "weekend", "on-campus"].includes(
          body.deliveryMode
        )
          ? (body.deliveryMode as
              | "online"
              | "blended"
              | "weekend"
              | "on-campus")
          : null,
      totalFee: typeof body.totalFee === "number" ? body.totalFee : null,
      applicationFee:
        typeof body.applicationFee === "number" ? body.applicationFee : null,
      emiAvailable:
        body.emiAvailable === undefined ? null : Boolean(body.emiAvailable),
      highlights: (body.highlights as string) || null,
      outcomes: (body.outcomes as string) || null,
      eligibility: (body.eligibility as string) || null,
      curriculum: (body.curriculum as string) || null,
      workExperienceMinYears:
        typeof body.workExperienceMinYears === "number"
          ? body.workExperienceMinYears
          : null,
      isFeatured:
        body.isFeatured === undefined ? false : Boolean(body.isFeatured),
      brochureUrl: (body.brochureUrl as string) || null,
      heroImage: (body.heroImage as string) || null,
      applyUrl: (body.applyUrl as string) || null,
      applicationDeadline: body.applicationDeadline
        ? new Date(body.applicationDeadline as string)
            .toISOString()
            .split("T")[0]
        : null,
    } satisfies typeof programs.$inferInsert;

    const [inserted] = await db
      .insert(programs)
      .values(insertPayload)
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
    console.error("Error creating program:", error);
    return NextResponse.json(
      { error: "Failed to create program" },
      { status: 500 }
    );
  }
}
