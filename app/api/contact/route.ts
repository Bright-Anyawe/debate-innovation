import { NextResponse } from "next/server";

import { validateContact } from "@/lib/contact-schema";

/**
 * Contact endpoint.
 *
 * Re-validates every field server-side — the client validator is a UX
 * affordance, not a gate — and rate-limits by client IP before any work is done.
 *
 * The in-memory limiter below is correct for a single instance only. On any
 * multi-instance or serverless deployment, replace `hits` with a shared store
 * (Upstash Redis, Vercel KV) or the limit resets per cold start.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

function isRateLimited(clientKey: string): boolean {
  const now = Date.now();
  const recent = (hits.get(clientKey) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    hits.set(clientKey, recent);
    return true;
  }

  recent.push(now);
  hits.set(clientKey, recent);

  // Opportunistic sweep so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, timestamps] of hits) {
      if (timestamps.every((timestamp) => now - timestamp >= WINDOW_MS)) hits.delete(key);
    }
  }

  return false;
}

function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  if (isRateLimited(getClientKey(request))) {
    return NextResponse.json(
      { ok: false, message: "Too many messages from this connection. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(WINDOW_MS / 1000) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Malformed request body." }, { status: 400 });
  }

  // Honeypot: a hidden field only a bot fills in. Answer 200 so the bot does
  // not learn it was caught, but do nothing with the submission.
  if (typeof payload === "object" && payload !== null && (payload as Record<string, unknown>).company) {
    return NextResponse.json({ ok: true, message: "Thank you — your message is on its way." });
  }

  const result = validateContact(payload);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: "Please check the highlighted fields.", errors: result.errors },
      { status: 422 },
    );
  }

  // INTEGRATION POINT — deliver the message. Options that work well here:
  //   • Resend / Postmark / SendGrid transactional email
  //   • A row in Supabase or Postgres, plus a Slack notification
  // Keep credentials in environment variables; never inline them.
  //
  // Nothing is logged here on purpose: the payload contains a name, an email
  // address, and free text, and application logs are rarely a safe home for it.
  await Promise.resolve(result.data);

  return NextResponse.json({ ok: true, message: "Thank you — your message is on its way." });
}
