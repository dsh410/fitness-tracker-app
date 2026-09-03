"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

// Pulled from kit.html. Override with NEXT_PUBLIC_KIT_FORM_ACTION if the form changes.
const kitAction =
  process.env.NEXT_PUBLIC_KIT_FORM_ACTION ||
  "https://app.kit.com/forms/9877380/subscriptions";

export default function SubscribeForm() {
  const [status, setStatus] = useState<"idle" | "need-provider">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    if (kitAction) return;
    event.preventDefault();
    setStatus("need-provider");
  }

  return (
    <section className="subscribe" aria-labelledby="subscribe-copy">
      <p id="subscribe-copy" className="subscribe-copy">
        Get a monthly update: where the numbers are, and what I&apos;m building
        next.
      </p>
      <form action={kitAction || undefined} method="post" onSubmit={onSubmit}>
        <label htmlFor="email_address">Email</label>
        <div className="subscribe-row">
          <input
            id="email_address"
            name="email_address"
            type="email"
            autoComplete="email"
            required
            placeholder="you@email.com"
          />
          <button type="submit">Subscribe</button>
        </div>
      </form>
      {status === "need-provider" ? (
        <p className="subscribe-note">
          Paste your Kit form URL into NEXT_PUBLIC_KIT_FORM_ACTION to connect
          this.
        </p>
      ) : null}
      <p className="privacy-link">
        <Link href="/privacy">Privacy</Link>
      </p>
    </section>
  );
}
