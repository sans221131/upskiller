"use client";

import { FormEvent, useMemo, useState } from "react";
import { flattenValidationErrors } from "next-safe-action";
import { useAction } from "next-safe-action/hooks";

import { submitQuickConnect } from "@/app/lead-form/actions";
import type { ActionResponse } from "@/types/actions";

const initialFormValues: QuickConnectFormValues = {
  fullName: "",
  email: "",
  phone: "",
  question: "",
};

export function QuickConnectForm() {
  const [formValues, setFormValues] =
    useState<QuickConnectFormValues>(initialFormValues);
  const [showSuccess, setShowSuccess] = useState(false);

  const { execute, result, status, reset } = useAction(submitQuickConnect, {
    onExecute: () => {
      setShowSuccess(false);
    },
    onSuccess: ({ data }) => {
      if (data?.success) {
        setFormValues(initialFormValues);
        setShowSuccess(true);
      } else {
        setShowSuccess(false);
      }
    },
  });

  const isPending = status === "executing" || status === "transitioning";

  const validation = useMemo(() => {
    if (!result.validationErrors) return null;
    return flattenValidationErrors(result.validationErrors);
  }, [result.validationErrors]);

  const fieldErrors = (validation?.fieldErrors ?? {}) as Partial<
    Record<keyof QuickConnectFormValues, string[]>
  >;
  const formErrors = validation?.formErrors ?? [];
  const actionResponse = result.data as ActionResponse | undefined;
  const actionError = actionResponse?.error || result.serverError;

  function handleChange(field: keyof QuickConnectFormValues, value: string) {
    setFormValues((current) => ({ ...current, [field]: value }));
    if (result.data || result.validationErrors) reset();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      fullName: formValues.fullName.trim(),
      email: formValues.email.trim(),
      phone: formValues.phone.trim(),
      question: formValues.question.trim()
        ? formValues.question.trim()
        : undefined,
    };

    execute(payload);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-3xl border border-[var(--brand)]/15 bg-white/80 p-6 shadow-lg backdrop-blur"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--brand)]/90 via-[var(--brand)] to-[var(--brand)]/70" />
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Prefer talking to a counsellor first?
          </h2>
          <p className="text-sm text-slate-500">
            Share your details and we will call within one business day to guide
            you through the best-fit programs.
          </p>
        </div>

        {showSuccess ? (
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 px-4 py-3 text-sm text-emerald-700">
            Thanks for reaching out! Our counsellor will connect with you
            shortly.
          </div>
        ) : null}

        {actionError ? (
          <div className="rounded-2xl border border-rose-100 bg-rose-50/70 px-4 py-3 text-sm text-rose-700">
            {actionError}
          </div>
        ) : null}

        {formErrors.length > 0 ? (
          <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            {formErrors.join(" ")}
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Full name
            </span>
            <input
              name="fullName"
              value={formValues.fullName}
              onChange={(event) => handleChange("fullName", event.target.value)}
              placeholder="Enter your full name"
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-[var(--brand)]"
              autoComplete="name"
              disabled={isPending}
              required
            />
            {fieldErrors.fullName?.[0] ? (
              <span className="text-xs text-rose-600">
                {fieldErrors.fullName[0]}
              </span>
            ) : null}
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Email
            </span>
            <input
              name="email"
              type="email"
              value={formValues.email}
              onChange={(event) => handleChange("email", event.target.value)}
              placeholder="name@email.com"
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-[var(--brand)]"
              autoComplete="email"
              disabled={isPending}
              required
            />
            {fieldErrors.email?.[0] ? (
              <span className="text-xs text-rose-600">
                {fieldErrors.email[0]}
              </span>
            ) : null}
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Phone
            </span>
            <input
              name="phone"
              value={formValues.phone}
              onChange={(event) => handleChange("phone", event.target.value)}
              placeholder="Include country code if any"
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-[var(--brand)]"
              autoComplete="tel"
              disabled={isPending}
              required
            />
            {fieldErrors.phone?.[0] ? (
              <span className="text-xs text-rose-600">
                {fieldErrors.phone[0]}
              </span>
            ) : null}
          </label>
        </div>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Any specific questions?{" "}
            <span className="text-slate-400">(Optional)</span>
          </span>
          <textarea
            name="question"
            value={formValues.question}
            onChange={(event) => handleChange("question", event.target.value)}
            rows={3}
            placeholder="Share anything you want us to prepare before the call."
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[var(--brand)]"
            disabled={isPending}
          />
          {fieldErrors.question?.[0] ? (
            <span className="text-xs text-rose-600">
              {fieldErrors.question[0]}
            </span>
          ) : null}
        </label>

        <div className="flex flex-col gap-2 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            Our counsellor will WhatsApp or call you within one business day.
          </p>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--brand)]/90 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Request a call"}
          </button>
        </div>
      </div>
    </form>
  );
}

interface QuickConnectFormValues {
  fullName: string;
  email: string;
  phone: string;
  question: string;
}
