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

/** Shared by the form and the API route so both enforce the same rules. */
export function validatePilotRequest(form: PilotRequest): PilotRequestErrors {
  const errors: PilotRequestErrors = {};
  if (!form.studio.trim()) errors.studio = "Add your studio’s name.";
  if (!form.name.trim()) errors.name = "Add your name.";
  if (!EMAIL_RE.test(form.email.trim())) errors.email = "Add a valid email.";
  if (!form.members.trim()) errors.members = "Add a rough number.";
  return errors;
}
