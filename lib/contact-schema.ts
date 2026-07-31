import { contactTopics } from "@/lib/site-data";

/**
 * One validator, used on both sides of the wire.
 *
 * The client imports it for instant inline feedback; the API route imports the
 * same function so a crafted request cannot skip the rules. Client-side
 * validation is a convenience — this module is the actual boundary.
 *
 * Hand-rolled rather than schema-library-backed: four fields do not justify
 * shipping a validation runtime to every visitor.
 */

export const FIELD_LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  message: { min: 20, max: 2000 },
} as const;

export interface ContactInput {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export type ValidationResult =
  | { ok: true; data: ContactInput }
  | { ok: false; errors: ContactErrors };

/**
 * Deliberately permissive pattern. Strict RFC 5322 matching rejects addresses
 * that real mail servers accept; the only reliable proof is a confirmation
 * email. This catches typos and nothing more.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateField(field: keyof ContactInput, value: string): string | undefined {
  const trimmed = value.trim();

  switch (field) {
    case "name":
      if (trimmed.length === 0) return "Please tell us your name.";
      if (trimmed.length < FIELD_LIMITS.name.min) return "That looks a little short.";
      if (trimmed.length > FIELD_LIMITS.name.max) return "Please keep your name under 80 characters.";
      return undefined;

    case "email":
      if (trimmed.length === 0) return "We need an email address to reply to.";
      if (trimmed.length > FIELD_LIMITS.email.max) return "That email address is too long.";
      if (!EMAIL_PATTERN.test(trimmed)) return "That does not look like a valid email address.";
      return undefined;

    case "topic":
      if (trimmed.length === 0) return "Please choose what this is about.";
      if (!contactTopics.includes(trimmed as (typeof contactTopics)[number])) {
        return "Please choose one of the listed topics.";
      }
      return undefined;

    case "message":
      if (trimmed.length === 0) return "Please add a message.";
      if (trimmed.length < FIELD_LIMITS.message.min) {
        return `A little more detail helps — at least ${FIELD_LIMITS.message.min} characters.`;
      }
      if (trimmed.length > FIELD_LIMITS.message.max) {
        return `Please keep it under ${FIELD_LIMITS.message.max} characters.`;
      }
      return undefined;

    default:
      return undefined;
  }
}

export function validateContact(raw: unknown): ValidationResult {
  if (typeof raw !== "object" || raw === null) {
    return { ok: false, errors: { name: "Invalid submission." } };
  }

  const record = raw as Record<string, unknown>;
  const fields: Array<keyof ContactInput> = ["name", "email", "topic", "message"];
  const errors: ContactErrors = {};
  const data = {} as ContactInput;

  for (const field of fields) {
    const value = typeof record[field] === "string" ? (record[field] as string) : "";
    const error = validateField(field, value);
    if (error) {
      errors[field] = error;
    } else {
      data[field] = value.trim();
    }
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data };
}
