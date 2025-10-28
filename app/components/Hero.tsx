import { desc, eq, getTableColumns } from "drizzle-orm";

import { db } from "@/db";
import { institutions, programs as programsTable } from "@/db/schema";

import HeroClient, { ProgramCard } from "./HeroClient";

export const revalidate = 300;

async function getPrograms(): Promise<any[]> {
  const programList = await db
    .select({
      ...getTableColumns(programsTable),
      institutionName: institutions.name,
      institutionLogo: institutions.logoUrl,
      institutionAccreditation: institutions.accreditation,
    })
    .from(programsTable)
    .leftJoin(institutions, eq(programsTable.institutionId, institutions.id))
    .orderBy(desc(programsTable.createdAt))
    .limit(8);

  return programList;
}

export default async function Hero() {
  const rows = await getPrograms();

  const programs: ProgramCard[] = rows.map((r: any) => {
    const fee = typeof r.totalFee === 'number' && !Number.isNaN(r.totalFee)
      ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(r.totalFee)
      : null;

    const accreditationFull = r.institutionAccreditation ?? r.accreditation ?? null;
    const accreditationShort = accreditationFull ? accreditationFull.split(";")[0].trim() : null;

    return {
      id: r.id,
      title: r.title,
      university: r.institutionName ?? r.institution ?? "",
      mode: (r.deliveryMode ?? r.delivery_mode ?? "").toString(),
      duration: r.durationMonths ? `${r.durationMonths} months` : null,
      fee,
      emi: r.emiAvailable ? undefined : undefined,
      seats: (r.seats as number) ?? null,
      accreditation: accreditationShort,
      accreditationFull,
      placementAvg: r.placementAvg ?? null,
      highlights: r.highlights ?? null,
      applicationDeadline: r.applicationDeadline ? new Date(r.applicationDeadline).toISOString().split('T')[0] : null,
      brochureUrl: r.brochureUrl ?? null,
      logoUrl: r.institutionLogo ?? r.heroImage ?? null,
    };
  });

  return <HeroClient programs={programs} />;
}
