import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AegisMind OS • Autonomous Cloud-Edge Incident Sentinel",
  description: "Enterprise AIOps Self-Healing Infrastructure Sentinel powered by Multi-Agent Adversarial Consensus, Intel OpenVINO, and Speechmatics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#f1f3f5] text-slate-900 min-h-screen antialiased selection:bg-[#ede8df] selection:text-[#383025]">
        {children}
      </body>
    </html>
  );
}
