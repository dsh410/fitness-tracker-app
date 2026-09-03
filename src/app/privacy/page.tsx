import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy — Tracker",
};

export default function PrivacyPage() {
  return (
    <main className="page legal">
      <p>
        <Link href="/">← Tracker</Link>
      </p>
      <h1>Privacy</h1>
      <p>
        This site is a public personal weight log. The numbers come from a
        file in a public GitHub repo, so anyone can see them.
      </p>
      <p>
        If you subscribe, your email goes to Kit and is stored on Kit&apos;s
        servers, not in this repo. It is used only for a monthly update about
        where the numbers are and what I&apos;m building next. Email address
        only — no name, no weight, no health questions. There are no accounts
        on this site.
      </p>
      <p>
        Page visits are counted with cookie-free Vercel Web Analytics. Links
        from social bios may include <code>?s=tt</code>, <code>?s=ig</code>,{" "}
        <code>?s=yt</code>, or <code>?s=fb</code> so I can see which bio a
        visit came from. Analytics never records your weight or form input.
      </p>
    </main>
  );
}
