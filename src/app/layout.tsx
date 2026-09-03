import type { Metadata } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { introCopy } from "@/lib/config";
import "./globals.css";

const intro = introCopy();

export const metadata: Metadata = {
  title: intro,
  description: intro,
  openGraph: {
    title: intro,
    description: intro,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/">Tracker</Link>
        </header>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
