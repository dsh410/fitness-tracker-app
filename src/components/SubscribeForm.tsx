"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import type { SourceTag } from "@/lib/source";

type SubscribeFormProps = {
  source: SourceTag | null;
};

const action = process.env.NEXT_PUBLIC_NEWSLETTER_ACTION;

export default function SubscribeForm({ source }: SubscribeFormProps) {
  const [status, setStatus] = useState<"idle" | "need-provider">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    if (action) return;
    event.preventDefault();
    setStatus("need-provider");
  }

  return (
    <section className="subscribe" aria-labelledby="subscribe-heading">
      <h2 id="subscribe-heading">Get updates</h2>
      <form action={action || undefined} method="post" onSubmit={onSubmit}>
        {source ? <input type="hidden" name="s" value={source} /> : null}
        <label htmlFor="email">Email</label>
        <div className="subscribe-row">
          <input
            id="email"
            name="email"
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
          Add a Kit, Buttondown, or MailerLite form URL to connect this.
        </p>
      ) : null}
      <p className="privacy-link">
        <Link href="/privacy">Privacy</Link>
      </p>
    </section>
  );
}
