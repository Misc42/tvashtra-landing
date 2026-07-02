"use client";

import { useState, type FormEvent } from "react";
import { submitWaitlist } from "@/lib/waitlist";

type Status = "idle" | "submitting" | "success" | "error";

export default function WaitlistForm({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    try {
      await submitWaitlist(email.trim());
      setStatus("success");
      setEmail("");
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("waitlist submit failed", err);
      }
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <span
        className={`self-center text-sm font-semibold text-success ${className}`}
        role="status"
        aria-live="polite"
      >
        ✓ You&rsquo;re on the list
      </span>
    );
  }

  const disabled = status === "submitting";

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className="flex max-w-[420px] gap-2.5"
        noValidate
      >
        <label className="sr-only" htmlFor="waitlist-email">
          Email
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          autoComplete="email"
          spellCheck={false}
          placeholder="you@yourdomain.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={disabled}
          className="min-w-0 flex-1 rounded-[10px] border border-rule-2 bg-bg px-4 py-3 text-sm text-ink outline-none transition placeholder:text-faint focus:border-copper-text disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={disabled}
          className="shrink-0 rounded-[10px] bg-ink px-5 py-3 text-sm font-semibold text-bg transition hover:bg-ink-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Notify me"}
        </button>
      </form>
      {status === "error" && (
        <p role="alert" className="mt-2 text-xs text-copper-text">
          Couldn&rsquo;t reach the waitlist server — try again, or email{" "}
          <a href="mailto:hello@misc42.com" className="underline underline-offset-2">
            hello@misc42.com
          </a>
          .
        </p>
      )}
    </div>
  );
}
