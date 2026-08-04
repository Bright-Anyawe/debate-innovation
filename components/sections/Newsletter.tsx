"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, Send } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { fieldError } from "@/lib/motion";
import { cn } from "@/lib/utils";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Newsletter sign-up.
 *
 * Validates on submit only — nagging someone mid-way through typing an address
 * is the classic newsletter-form annoyance. Wire `subscribe` to your provider;
 * it currently just confirms locally.
 */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);

  function subscribe(event: React.FormEvent) {
    event.preventDefault();

    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setIsDone(true);
    // INTEGRATION POINT — POST to Mailchimp, Buttondown, Resend Audiences, etc.
  }

  return (
    <section aria-labelledby="newsletter-heading" className="container-page py-14 sm:py-16">
      <Reveal>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <h2
            id="newsletter-heading"
            className="text-[clamp(1.75rem,1.2rem+1.9vw,2.75rem)] leading-tight"
          >
            Get updated with the latest newsletter
          </h2>

          <AnimatePresence mode="wait" initial={false}>
            {isDone ? (
              <motion.p
                key="done"
                role="status"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 rounded-full border border-brand-200 bg-white px-6 py-4 text-[0.9375rem] font-medium text-deep-700"
              >
                <CircleCheck className="size-5 shrink-0 text-brand-500" aria-hidden="true" />
                You&rsquo;re on the list. Thank you.
              </motion.p>
            ) : (
              <motion.form
                key="form"
                onSubmit={subscribe}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full"
              >
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex-1">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Your email address
                    </label>
                    <input
                      id="newsletter-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        if (error) setError(null);
                      }}
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? "newsletter-error" : undefined}
                      className={cn(
                        "min-h-14 w-full rounded-full border bg-white px-6 text-[0.9375rem] text-deep-700 transition-colors placeholder:text-ink-500",
                        error
                          ? "border-ghana-red/60 focus:border-ghana-red"
                          : "border-ink-200 focus:border-brand-400",
                      )}
                    />
                  </div>

                  <Button type="submit" size="lg" className="shrink-0">
                    Subscribe Now
                    <Send className="size-4" aria-hidden="true" />
                  </Button>
                </div>

                <AnimatePresence initial={false}>
                  {error ? (
                    <motion.p
                      id="newsletter-error"
                      role="alert"
                      variants={fieldError}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="mt-2 pl-6 text-sm text-ghana-red"
                    >
                      {error}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
