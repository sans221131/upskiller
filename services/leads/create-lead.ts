import { db } from "@/db";
import { leadProgramInterests, leads } from "@/db/schema";

export async function createLead({
  payload,
}: {
  payload: CreateLeadInput;
}): Promise<CreateLeadResult> {
  if (!payload) throw new Error("Lead details are required.");

  const missingFields = requiredLeadFields.filter((field) => {
    const value = payload[field];
    if (typeof value !== "string") return true;
    return value.trim().length === 0;
  });

  if (missingFields.length > 0) {
    throw new Error(
      `Missing required lead fields: ${missingFields
        .map((field) => fieldLabels[field])
        .join(", ")}.`
    );
  }

  const phone = payload.phone.replace(/\D/g, "").slice(0, 15);
  if (phone.length < 7) {
    throw new Error("Phone number must include at least 7 digits.");
  }

  const leadInsert = {
    fullName: payload.fullName.trim(),
    gender: payload.gender || null,
    email: payload.email.trim(),
    phone,
    dob: payload.dob || null,
    state: payload.state || null,
    city: payload.city || null,
    employmentStatus: payload.employmentStatus || null,
    salaryBand: payload.salaryBand || null,
    highestQualification: payload.highestQualification || null,
    lastScorePercent: parseNumeric(payload.lastScorePercent),
    degreeInterest: payload.degreeInterest || null,
    coursePreference: payload.coursePreference || null,
    specialisationInterest: payload.specialisationInterest || null,
    goal: payload.goal || null,
    budgetRange: payload.budgetRange || null,
    wantsEmi: Boolean(payload.wantsEmi),
    category: payload.category || null,
    experienceYears: parseNumeric(payload.experienceYears),
    preferredMode: payload.preferredMode || null,
    source: payload.source || "website",
    utmCampaign: payload.utmCampaign || null,
    status: payload.status || "new",
    notes: payload.notes || null,
  } satisfies typeof leads.$inferInsert;

  try {
    const [createdLead] = await db.insert(leads).values(leadInsert).returning();
    if (!createdLead) {
      throw new Error("We could not save your details. Please try again.");
    }

    await createLeadProgramInterests({
      leadId: createdLead.id,
      programIds: payload.selectedPrograms,
    });

    return { lead: createdLead };
  } catch (error) {
    console.error("createLead error", error);
    throw new Error("We could not save your details. Please try again.");
  }
}

async function createLeadProgramInterests({
  leadId,
  programIds,
}: {
  leadId: number;
  programIds?: number[];
}) {
  if (!programIds?.length) return;

  const uniqueIds = Array.from(
    new Set(programIds.filter((programId) => Number.isInteger(programId)))
  );

  if (!uniqueIds.length) return;

  await db
    .insert(leadProgramInterests)
    .values(
      uniqueIds.map((programId) => ({
        leadId,
        programId,
        notes: null,
      }))
    )
    .onConflictDoNothing({
      target: [leadProgramInterests.leadId, leadProgramInterests.programId],
    });
}

function parseNumeric(value?: string | null) {
  if (!value) return null;
  const converted = Number(value);
  if (Number.isNaN(converted)) return null;
  return String(converted);
}

const fieldLabels: Record<keyof CreateLeadInput, string> = {
  fullName: "Full name",
  gender: "Gender",
  dob: "Date of birth",
  employmentStatus: "Employment status",
  salaryBand: "Salary band",
  experienceYears: "Experience",
  goal: "Career goal",
  degreeInterest: "Degree interest",
  coursePreference: "Course preference",
  specialisationInterest: "Specialisation interest",
  preferredMode: "Preferred mode",
  highestQualification: "Highest qualification",
  lastScorePercent: "Last score percent",
  category: "Category",
  budgetRange: "Budget range",
  wantsEmi: "EMI preference",
  email: "Email",
  phone: "Phone",
  state: "State",
  city: "City",
  source: "Source",
  utmCampaign: "UTM campaign",
  selectedPrograms: "Selected programs",
  notes: "Notes",
  status: "Status",
};

const requiredLeadFields = ["fullName", "email", "phone"] as const;

export interface CreateLeadInput {
  fullName: string;
  gender?: string;
  dob?: string;
  employmentStatus?: string;
  salaryBand?: string;
  experienceYears?: string;
  goal?: string;
  degreeInterest?: string;
  coursePreference?: string;
  specialisationInterest?: string;
  preferredMode?: string;
  highestQualification?: string;
  lastScorePercent?: string;
  category?: string;
  budgetRange?: string;
  wantsEmi?: boolean;
  email: string;
  phone: string;
  state?: string;
  city?: string;
  source?: string;
  utmCampaign?: string;
  selectedPrograms?: number[];
  notes?: string;
  status?: string;
}

export interface CreateLeadResult {
  lead: typeof leads.$inferSelect;
}
