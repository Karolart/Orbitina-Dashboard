import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orbitina AI",
  description: "Control and orchestrate your AI agents from a unified dashboard.",
  keywords: ["AI agents", "automation", "dashboard", "Orbitina", "AI assistant"],
  authors: [{ name: "Karolart90" }],

  openGraph: {
    title: "Orbitina AI",
    description: "AI Agent orchestration dashboard",
    siteName: "Orbitina",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}