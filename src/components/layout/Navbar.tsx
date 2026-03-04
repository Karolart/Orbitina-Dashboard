"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, LayoutDashboard, History } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/agents", label: "Agents", icon: Bot },
    { path: "/history", label: "History", icon: History },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0b0f16] border-b border-cyan-400/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-3 font-semibold tracking-wide"
        >
          <Bot className="w-5 h-5 text-cyan-400" />
          <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
            AI Assistant OS
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link key={item.path} href={item.path}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full border text-sm transition-all duration-300 ${
                    isActive
                      ? "border-fuchsia-400/50 text-fuchsia-300 bg-fuchsia-400/10"
                      : "border-cyan-400/20 text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-400/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </motion.div>
              </Link>
            );
          })}
        </nav>

      </div>
    </header>
  );
}