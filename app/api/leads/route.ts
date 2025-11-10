import { NextRequest, NextResponse } from "next/server";

import { createLead, type CreateLeadInput } from "@/services/leads/create-lead";

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as CreateLeadInput;
    const { lead } = await createLead({ payload });

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error("Lead submission error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Unable to submit lead right now.";

    const status =
      error instanceof Error &&
      (message.toLowerCase().includes("missing") ||
        message.toLowerCase().includes("phone"))
        ? 400
        : 500;

    return NextResponse.json(
      { error: message || "Unable to submit lead right now." },
      { status }
    );
  }
}
