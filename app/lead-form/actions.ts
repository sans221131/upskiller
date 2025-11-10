"use server";

import { z } from "zod";

import { actionClient } from "@/lib/safe-action";
import { zodToStandardSchema } from "@/lib/standard-schema";
import { createLead } from "@/services/leads/create-lead";
import type { ActionResponse } from "@/types/actions";

const quickConnectSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z
    .string()
    .email("Enter a valid email so our counsellor can reach you."),
  phone: z
    .string()
    .min(7, "Phone number must include at least 7 digits.")
    .max(18, "Phone number seems too long."),
  question: z
    .string()
    .max(500, "Please keep your question within 500 characters.")
    .optional()
    .nullable(),
});

export const submitQuickConnect = actionClient
  .inputSchema(zodToStandardSchema(quickConnectSchema))
  .action(async ({ parsedInput }): Promise<ActionResponse> => {
    const { fullName, email, phone, question } = parsedInput;

    const notes = question?.trim();
    if (notes && notes.length === 0) {
      return { success: false, error: "Please share a short question." };
    }

    try {
      await createLead({
        payload: {
          fullName,
          email,
          phone,
          notes: notes ?? undefined,
          source: "quick-connect",
        },
      });

      return { success: true };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "We could not save your details. Please try again.";
      return { success: false, error: message };
    }
  });
