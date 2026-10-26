export const AUDIENCES = ["studios", "trainers"] as const;
export type Audience = (typeof AUDIENCES)[number];

export type PilotRequest = {
  studio: string;
  name: string;
  email: string;
  members: string;
  challenge: string;
};

export type PilotRequestField = keyof PilotRequest;
export type PilotRequestErrors = Partial<Record<PilotRequestField, string>>;

export const EMPTY_PILOT_REQUEST: PilotRequest = {
  studio: "",
  name: "",
  email: "",
  members: "",
  challenge: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STUDIO_ERROR: Record<Audience, string> = {
  studios: "Add your studio’s name.",
  trainers: "Add your gym or studio name.",
};

/** Shared by the form and the API route so both enforce the same rules. */
export function validatePilotRequest(form: PilotRequest, audience: Audience): PilotRequestErrors {
  const errors: PilotRequestErrors = {};
  if (!form.studio.trim()) errors.studio = STUDIO_ERROR[audience];
  if (!form.name.trim()) errors.name = "Add your name.";
  if (!EMAIL_RE.test(form.email.trim())) errors.email = "Add a valid email.";
  if (!form.members.trim()) errors.members = "Add a rough number.";
  return errors;
}

export function isAudience(value: unknown): value is Audience {
  return AUDIENCES.includes(value as Audience);
}
