import {
  EMPTY_PILOT_REQUEST,
  validatePilotRequest,
  type PilotRequest,
} from "@/lib/pilot-request";

const MAX_FIELD_LENGTH = 2000;

/**
 * Receives "Request my pilot" submissions and forwards them as JSON to
 * PILOT_REQUEST_WEBHOOK_URL (e.g. a Formspree form endpoint, a Zapier/Make
 * webhook, or a CRM intake URL) so they reach the team inbox.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const form = normalize(body);
  const errors = validatePilotRequest(form);
  if (Object.keys(errors).length) {
    return Response.json({ errors }, { status: 422 });
  }

  const webhookUrl = process.env.PILOT_REQUEST_WEBHOOK_URL;
  if (!webhookUrl) {
    if (process.env.NODE_ENV === "development") {
      console.info("[pilot-request] PILOT_REQUEST_WEBHOOK_URL not set; submission:", form);
      return Response.json({ ok: true });
    }
    console.error("[pilot-request] PILOT_REQUEST_WEBHOOK_URL is not configured");
    return Response.json({ error: "Form handler not configured" }, { status: 500 });
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      ...form,
      _subject: `Pilot request: ${form.studio}`,
      submittedAt: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    console.error("[pilot-request] Webhook responded with", res.status, await res.text());
    return Response.json({ error: "Could not deliver request" }, { status: 502 });
  }

  return Response.json({ ok: true });
}

function normalize(body: unknown): PilotRequest {
  const input = (typeof body === "object" && body !== null ? body : {}) as Record<string, unknown>;
  const form = { ...EMPTY_PILOT_REQUEST };
  for (const key of Object.keys(form) as (keyof PilotRequest)[]) {
    const value = input[key];
    form[key] = typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "";
  }
  return form;
}
