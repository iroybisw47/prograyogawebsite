"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { CheckIcon } from "./icons";
import {
  EMPTY_PILOT_REQUEST,
  validatePilotRequest,
  type Audience,
  type PilotRequest,
  type PilotRequestErrors,
  type PilotRequestField,
} from "@/lib/pilot-request";

const CONTROL =
  "w-full rounded-[12px] border-[1.5px] border-control bg-white px-[14px] text-[15px] text-ink outline-none transition-colors duration-150 placeholder:text-placeholder focus:border-brand";

export type PilotRequestFormCopy = {
  studioLabel: string;
  studioPlaceholder: string;
  membersLabel: string;
  membersPlaceholder: string;
  challengeLabel: string;
};

export function PilotRequestForm({ audience, copy }: { audience: Audience; copy: PilotRequestFormCopy }) {
  const [form, setForm] = useState<PilotRequest>(EMPTY_PILOT_REQUEST);
  const [errors, setErrors] = useState<PilotRequestErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onChange = (field: PilotRequestField) => (value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validatePilotRequest(form, audience);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/pilot-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audience, ...form }),
      });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong sending your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-[18px] py-3" role="status">
        <span className="flex size-11 items-center justify-center rounded-full bg-success text-white">
          <CheckIcon size={20} />
        </span>
        <p className="m-0 font-serif text-[26px]/[1.3] font-medium tracking-[-0.01em] text-pretty text-ink">
          Thanks for reaching out. We’ll be in touch within 24 hours to set up a short call.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-x-4 gap-y-[18px]"
    >
      <Field id="studio" label={copy.studioLabel} error={errors.studio}>
        <input
          id="studio"
          name="studio"
          type="text"
          autoComplete="organization"
          placeholder={copy.studioPlaceholder}
          value={form.studio}
          onChange={(e) => onChange("studio")(e.target.value)}
          {...errorProps("studio", errors)}
          className={`${CONTROL} h-12`}
        />
      </Field>
      <Field id="name" label="Your name" error={errors.name}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Jane Smith"
          value={form.name}
          onChange={(e) => onChange("name")(e.target.value)}
          {...errorProps("name", errors)}
          className={`${CONTROL} h-12`}
        />
      </Field>
      <Field id="email" label="Email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@yourstudio.com"
          value={form.email}
          onChange={(e) => onChange("email")(e.target.value)}
          {...errorProps("email", errors)}
          className={`${CONTROL} h-12`}
        />
      </Field>
      <Field id="members" label={copy.membersLabel} error={errors.members}>
        <input
          id="members"
          name="members"
          type="text"
          inputMode="numeric"
          placeholder={copy.membersPlaceholder}
          value={form.members}
          onChange={(e) => onChange("members")(e.target.value)}
          {...errorProps("members", errors)}
          className={`${CONTROL} h-12`}
        />
      </Field>
      <Field
        id="challenge"
        label={
          <>
            {copy.challengeLabel}{" "}
            <span className="font-medium text-caption">(optional)</span>
          </>
        }
        className="col-span-full"
      >
        <textarea
          id="challenge"
          name="challenge"
          rows={3}
          value={form.challenge}
          onChange={(e) => onChange("challenge")(e.target.value)}
          className={`${CONTROL} resize-y py-3 leading-[1.5]`}
        />
      </Field>
      <button
        type="submit"
        disabled={submitting}
        className="col-span-full h-[54px] cursor-pointer rounded-[15px] bg-brand-deep text-[16px] font-semibold text-white shadow-cta transition-[background-color,transform] duration-150 enabled:hover:bg-brand-hover enabled:active:scale-[.98] disabled:cursor-default disabled:opacity-70"
      >
        {submitting ? "Sending…" : "Request my pilot"}
      </button>
      {submitError && (
        <p className="col-span-full m-0 text-[13px] text-error" role="alert">
          {submitError}
        </p>
      )}
    </form>
  );
}

function errorProps(field: PilotRequestField, errors: PilotRequestErrors) {
  return errors[field]
    ? { "aria-invalid": true, "aria-describedby": `${field}-error` }
    : {};
}

function Field({
  id,
  label,
  error,
  className = "",
  children,
}: {
  id: PilotRequestField;
  label: ReactNode;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-[7px] ${className}`}>
      <label htmlFor={id} className="text-[13px] font-semibold text-body">
        {label}
      </label>
      {children}
      {error && (
        <span id={`${id}-error`} className="text-[12px] text-error">
          {error}
        </span>
      )}
    </div>
  );
}
