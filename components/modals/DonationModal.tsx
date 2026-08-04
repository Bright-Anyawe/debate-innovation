"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Heart, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { fieldError } from "@/lib/motion";
import { donationTiers } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type Frequency = "once" | "monthly";

const MIN_AMOUNT = 10;
const MAX_AMOUNT = 500_000;

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/**
 * Donation dialog.
 *
 * Collects intent only — amount and frequency — and hands off to a hosted,
 * PCI-compliant payment page. No card or mobile-money credentials are ever
 * entered into this application. Wire `handoffToCheckout` to your provider
 * (Stripe, Donorbox, and Givebutter all suit a US-registered 501(c)(3)).
 */
export function DonationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [frequency, setFrequency] = useState<Frequency>("once");
  const [selectedTier, setSelectedTier] = useState<number | null>(donationTiers[1].amount);
  const [customAmount, setCustomAmount] = useState("");
  const [error, setError] = useState<string | null>(null);

  const amount = useMemo(() => {
    if (selectedTier !== null) return selectedTier;
    const parsed = Number.parseFloat(customAmount);
    return Number.isFinite(parsed) ? parsed : 0;
  }, [selectedTier, customAmount]);

  const activeImpact = useMemo(() => {
    const matching = [...donationTiers].reverse().find((tier) => amount >= tier.amount);
    return matching?.impact ?? null;
  }, [amount]);

  function handleTierSelect(tierAmount: number) {
    setSelectedTier(tierAmount);
    setCustomAmount("");
    setError(null);
  }

  function handleCustomChange(value: string) {
    // Digits and a single decimal point only.
    if (value !== "" && !/^\d*\.?\d{0,2}$/.test(value)) return;
    setCustomAmount(value);
    setSelectedTier(null);
    setError(null);
  }

  function handoffToCheckout(event: React.FormEvent) {
    event.preventDefault();

    if (!Number.isFinite(amount) || amount < MIN_AMOUNT) {
      setError(`Please enter an amount of at least ${currency.format(MIN_AMOUNT)}.`);
      return;
    }
    if (amount > MAX_AMOUNT) {
      setError("For gifts above $500,000 please contact us directly so we can assist.");
      return;
    }

    setError(null);

    // INTEGRATION POINT — replace with your payment provider's redirect:
    //   const res = await fetch("/api/donate", { method: "POST", body: JSON.stringify({ amount, frequency }) });
    //   window.location.href = (await res.json()).authorizationUrl;
    console.info("Donation intent captured", { amount, frequency });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Fund a young African voice"
      description="Every dollar goes to coaching, travel, and materials. We publish the full breakdown each term."
    >
      <form onSubmit={handoffToCheckout} className="space-y-7">
        <fieldset>
          <legend className="sr-only">Giving frequency</legend>
          <div
            role="group"
            className="grid grid-cols-2 gap-1 rounded-full border border-ink-200 bg-surface-soft p-1"
          >
            {(["once", "monthly"] as const).map((option) => {
              const isActive = frequency === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFrequency(option)}
                  aria-pressed={isActive}
                  className={cn(
                    "relative min-h-11 rounded-full text-sm font-semibold transition-colors",
                    isActive ? "text-white" : "text-ink-500 hover:text-deep-700",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="donation-frequency-pill"
                      className="absolute inset-0 rounded-full bg-brand-500"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative z-10">
                    {option === "once" ? "One-time" : "Monthly"}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-sm font-semibold text-deep-700">Choose an amount</legend>
          <div className="grid grid-cols-2 gap-2.5">
            {donationTiers.map((tier) => (
              <label
                key={tier.amount}
                className={cn(
                  "relative flex min-h-14 cursor-pointer items-center justify-center rounded-2xl border text-base font-semibold transition-all duration-200",
                  "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-500",
                  selectedTier === tier.amount
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-ink-200 bg-white text-ink-600 hover:border-brand-300 hover:bg-brand-50/60",
                )}
              >
                <input
                  type="radio"
                  name="donation-amount"
                  value={tier.amount}
                  checked={selectedTier === tier.amount}
                  onChange={() => handleTierSelect(tier.amount)}
                  className="sr-only"
                />
                {currency.format(tier.amount)}
              </label>
            ))}
          </div>

          <div className="mt-3">
            <label htmlFor="custom-amount" className="sr-only">
              Or enter a custom amount in US dollars
            </label>
            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-ink-500"
              >
                $
              </span>
              <input
                id="custom-amount"
                name="custom-amount"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="Other amount"
                value={customAmount}
                onChange={(event) => handleCustomChange(event.target.value)}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "donation-error" : undefined}
                className="min-h-14 w-full rounded-2xl border border-ink-200 bg-surface-soft pl-11 pr-4 text-base text-deep-700 placeholder:text-ink-500 transition-colors focus:border-brand-400 focus:bg-white"
              />
            </div>
          </div>
        </fieldset>

        <AnimatePresence mode="wait" initial={false}>
          {error ? (
            <motion.p
              key="error"
              id="donation-error"
              role="alert"
              variants={fieldError}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-sm font-medium text-ghana-red"
            >
              {error}
            </motion.p>
          ) : activeImpact ? (
            <motion.p
              key={activeImpact}
              variants={fieldError}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex items-start gap-2.5 rounded-2xl border border-brand-200 bg-brand-50 p-3.5 text-sm leading-relaxed text-brand-800"
            >
              <Heart className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>
                {activeImpact}
                {frequency === "monthly" ? ", every month" : ""}.
              </span>
            </motion.p>
          ) : null}
        </AnimatePresence>

        <div className="space-y-3">
          <Button type="submit" size="lg" className="w-full">
            Continue to secure checkout
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Button>

          <p className="flex items-center justify-center gap-2 text-xs text-ink-500">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            Payment details are handled by our provider — never entered on this site.
          </p>
        </div>
      </form>
    </Modal>
  );
}
