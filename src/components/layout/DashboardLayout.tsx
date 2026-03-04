"use client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative">
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  );
}