// Wire this to Formspree / Tally / Plausible Forms / your own endpoint.
// Set NEXT_PUBLIC_WAITLIST_ENDPOINT to a URL that accepts a JSON POST with { email }.
// The variable is inlined at build time — no runtime secrets here.

export async function submitWaitlist(email: string): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT;
  if (!endpoint) {
    throw new Error(
      "waitlist endpoint not configured: set NEXT_PUBLIC_WAITLIST_ENDPOINT at build time",
    );
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error(`waitlist server returned ${res.status}`);
  }
}
