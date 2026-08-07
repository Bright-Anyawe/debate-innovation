"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { fieldError, springSoft } from "@/lib/motion";
import { FIELD_LIMITS, validateField, type ContactErrors, type ContactInput } from "@/lib/contact-schema";
import { contactTopics } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const EMPTY_FORM: ContactInput = { name: "", email: "", topic: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(EMPTY_FORM);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (field: keyof ContactInput, value: string) => {
      setValues((current) => ({ ...current, [field]: value }));

      // Only re-validate live once a field has been visited, so the form does
      // not shout at someone who is still typing their name for the first time.
      if (touched[field]) {
        setErrors((current) => ({ ...current, [field]: validateField(field, value) }));
      }
    },
    [touched],
  );

  const handleBlur = useCallback(
    (field: keyof ContactInput) => {
      setTouched((current) => ({ ...current, [field]: true }));
      setErrors((current) => ({ ...current, [field]: validateField(field, values[field]) }));
    },
    [values],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fields: Array<keyof ContactInput> = ["name", "email", "topic", "message"];
    const nextErrors: ContactErrors = {};
    for (const field of fields) {
      const error = validateField(field, values[field]);
      if (error) nextErrors[field] = error;
    }

    setTouched({ name: true, email: true, topic: true, message: true });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setFormMessage("Please check the highlighted fields.");
      return;
    }

    setStatus("submitting");
    setFormMessage(null);

    // Submit directly to Web3Forms. `access_key` identifies this form's
    // inbox; every other entry is forwarded as a plain-text field.
    const formData = new FormData();
    formData.append("access_key", "c9e76338-dacd-4921-9346-c20e37db8cc4");
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("topic", values.topic);
    formData.append("message", values.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const text = await response.text();
      let result: { success: boolean; message: string };
      try {
        result = JSON.parse(text);
      } catch {
        // Web3Forms can return an HTML error page instead of JSON. Surface the
        // HTTP status so the failure is diagnosable rather than a mystery.
        setStatus("error");
        setFormMessage(`Unexpected response (${response.status}). Please try again.`);
        return;
      }

      if (!response.ok || !result.success) {
        setStatus("error");
        setFormMessage(result.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setFormMessage(result.message);
      setValues(EMPTY_FORM);
      setTouched({});
    } catch (error) {
      console.error("Web3Forms submission failed:", error);
      setStatus("error");
      setFormMessage("We could not reach the server. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={springSoft}
        role="status"
        className="flex min-h-[28rem] flex-col items-center justify-center rounded-3xl border border-brand-200 bg-brand-50 p-10 text-center"
      >
        <motion.span
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ ...springSoft, delay: 0.1 }}
          className="grid size-16 place-items-center rounded-full bg-brand-500 text-white shadow-card"
        >
          <CircleCheck className="size-8" aria-hidden="true" />
        </motion.span>

        <h3 className="mt-6 text-2xl">Message received</h3>
        <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ink-600">
          {formMessage} We reply to everything within two working days — usually sooner.
        </p>

        <Button
          variant="outline"
          className="mt-8"
          strength={8}
          onClick={() => {
            setStatus("idle");
            setFormMessage(null);
          }}
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:p-8"
    >
      {/* Honeypot. Hidden from sighted users and from screen readers alike, and
          skipped by the tab order — only a form-filling bot will populate it. */}
      <div aria-hidden="true" className="h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company (leave this empty)</label>
        <input
          ref={honeypotRef}
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Your name"
          value={values.name}
          error={errors.name}
          onChange={(value) => handleChange("name", value)}
          onBlur={() => handleBlur("name")}
          autoComplete="name"
          maxLength={FIELD_LIMITS.name.max}
        />

        <Field
          id="email"
          label="Email address"
          type="email"
          value={values.email}
          error={errors.email}
          onChange={(value) => handleChange("email", value)}
          onBlur={() => handleBlur("email")}
          autoComplete="email"
          maxLength={FIELD_LIMITS.email.max}
        />
      </div>

      <div className="mt-5">
        <FieldShell id="topic" label="What is this about?" error={errors.topic}>
          <select
            id="topic"
            name="topic"
            value={values.topic}
            onChange={(event) => handleChange("topic", event.target.value)}
            onBlur={() => handleBlur("topic")}
            aria-invalid={errors.topic ? true : undefined}
            aria-describedby={errors.topic ? "topic-error" : undefined}
            className={inputClasses(Boolean(errors.topic), "min-h-14 appearance-none pr-10")}
          >
            <option value="">Choose a topic…</option>
            {contactTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </FieldShell>
      </div>

      <div className="mt-5">
        <FieldShell id="message" label="Your message" error={errors.message}>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(event) => handleChange("message", event.target.value)}
            onBlur={() => handleBlur("message")}
            maxLength={FIELD_LIMITS.message.max}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : "message-hint"}
            placeholder="Tell us about your school, your organisation, or what you would like to build with us."
            className={inputClasses(Boolean(errors.message), "resize-y py-4")}
          />
        </FieldShell>
        <p id="message-hint" className="mt-2 text-right text-xs tabular-nums text-ink-500">
          {values.message.length} / {FIELD_LIMITS.message.max}
        </p>
      </div>

      <AnimatePresence initial={false}>
        {status === "error" && formMessage ? (
          <motion.p
            role="alert"
            variants={fieldError}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-5 flex items-start gap-2.5 rounded-2xl border border-ghana-red/25 bg-ghana-red/8 p-3.5 text-sm text-ghana-red"
          >
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {formMessage}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </>
          )}
        </Button>

        <p className="text-xs leading-relaxed text-ink-500 sm:max-w-[16rem] sm:text-right">
          We use your details only to reply. We never sell or share them.
        </p>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/* Field primitives                                                           */
/* -------------------------------------------------------------------------- */

function inputClasses(hasError: boolean, extra = ""): string {
  return cn(
    "min-h-14 w-full rounded-2xl border bg-surface-soft px-4 text-[0.9375rem] text-deep-700 transition-colors duration-200",
    "placeholder:text-ink-500 focus:bg-white",
    hasError
      ? "border-ghana-red/60 focus:border-ghana-red"
      : "border-ink-200 hover:border-ink-300 focus:border-brand-400",
    extra,
  );
}

interface FieldShellProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

function FieldShell({ id, label, error, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-deep-700">
        {label}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            id={`${id}-error`}
            variants={fieldError}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-2 flex items-center gap-1.5 text-sm text-ghana-red"
          >
            <CircleAlert className="size-3.5 shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

interface FieldProps {
  id: keyof ContactInput;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  type?: string;
  autoComplete?: string;
  maxLength?: number;
}

function Field({ id, label, value, error, onChange, onBlur, type = "text", autoComplete, maxLength }: FieldProps) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        autoComplete={autoComplete}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClasses(Boolean(error))}
      />
    </FieldShell>
  );
}
