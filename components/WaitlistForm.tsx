"use client";

import { useState, type FormEvent } from "react";
import { submitWaitlist } from "@/lib/waitlist";

type Status = "idle" | "submitting" | "success" | "error";

interface WaitlistFormProps {
  context?: "install" | "browser" | "hero";
  className?: string;
}

const messages = {
  success: "Thanks — we'll email you when there's something to try.",
  error: "Couldn't reach the waitlist server — DM @tanaymisra97 instead.",
} as const;

export default function WaitlistForm({
  context = "hero",
  className = "",
}: WaitlistFormProps) {
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
      console.error("waitlist submit failed", err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p
        className={`font-mono text-sm text-green ${className}`}
        role="status"
        aria-live="polite"
        data-context={context}
      >
        {messages.success}
      </p>
    );
  }

  const disabled = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-3 sm:flex-row sm:items-stretch ${className}`}
      data-context={context}
      noValidate
    >
      <label className="sr-only" htmlFor={`waitlist-${context}`}>
        Email
      </label>
      <input
        id={`waitlist-${context}`}
        type="email"
        required
        autoComplete="email"
        spellCheck={false}
        placeholder="you@yourdomain.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        disabled={disabled}
        className="min-w-0 flex-1 rounded-sm border border-rule bg-paper px-4 py-3 font-mono text-sm text-ink outline-none transition placeholder:text-faint focus:border-saffron disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={disabled}
        className="inline-flex items-center justify-center rounded-sm border border-saffron bg-saffron px-5 py-3 font-mono text-[0.74rem] uppercase tracking-[0.14em] text-paper transition hover:bg-transparent hover:text-saffron disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Join the beta"}
      </button>
      {status === "error" && (
        <p
          role="alert"
          className="font-mono text-xs text-[var(--accent-warm)] sm:absolute sm:translate-y-[3.6rem]"
        >
          {messages.error}
        </p>
      )}
    </form>
  );
}
