"use client";

import Navbar from "@/components/layout/Navbar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  );
}