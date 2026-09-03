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
        This site is a public personal weight log. The numbers on the chart
        come from a file in a public GitHub repo, so anyone can see them.
      </p>
      <p>
        If you subscribe, your email is sent to the newsletter tool connected
        to the form (Kit, Buttondown, or MailerLite). It is used only to send
        updates about this project. There are no accounts on this site.
      </p>
      <p>
        Links from social bios may include a source tag such as{" "}
        <code>?s=tt</code>, <code>?s=ig</code>, <code>?s=yt</code>, or{" "}
        <code>?s=fb</code>. That tag is used to see which bio a visit came
        from. Vercel Web Analytics also records page views.
      </p>
    </main>
  );
}
