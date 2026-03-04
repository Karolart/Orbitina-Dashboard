"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Bot, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAgentsStore } from "@/features/agents/agents.store";

export default function DashboardView() {
  const router = useRouter();
  const agents = useAgentsStore((s) => s.agents) ?? [];
  const deleteGroup = useAgentsStore((s) => s.deleteGroup);

  const [systemOn, setSystemOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const totalGroups = agents.length;
  const totalInstances = agents.reduce(
    (sum, group) => sum + (group.instances?.length ?? 0),
    0
  );

  async function handleLogout() {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
    router.replace("/login");
  }

  function handlePowerToggle() {
    setSystemOn((prev) => {
      const next = !prev;

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.7;
        audioRef.current.play().catch(() => { });
      }

      return next;
    });
  }

  return (
    <div className="min-h-screen px-10 py-16 bg-gradient-to-br from-[#0b0f16] via-[#0e1622] to-[#0b0f16] text-slate-200">
      <header className="max-w-6xl mx-auto flex items-center justify-end mb-16 border-b border-cyan-500/20 pb-6">

        <div className="flex items-center gap-8 text-sm tracking-wide">

          <Link
            href="/agents"
            className="text-slate-400 hover:text-cyan-300 transition-colors"
          >
            View all →
          </Link>

          <button
            onClick={handleLogout}
            className="text-slate-500 hover:text-fuchsia-400 transition-colors"
          >
            Logout
          </button>

        </div>

      </header>

      <div className="max-w-6xl mx-auto space-y-20">

        {/* HERO */}
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div className="space-y-10">

            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-semibold tracking-[0.35em] text-cyan-300 drop-shadow-[0_0_18px_rgba(34,211,238,0.8)]"
            >
              ORBITINA
            </motion.h1>

            {/* POWER BUTTON */}
            <div className="relative w-80 h-80 flex items-center justify-center">

              <motion.button
                onClick={handlePowerToggle}
                whileTap={{ scale: 0.95 }}
                className="relative w-64 h-64 rounded-full overflow-hidden"
              >

                <div
                  className={`
                    absolute inset-0 rounded-full transition-all duration-700
                    bg-gradient-to-br from-slate-800 to-slate-950
                    ${systemOn
                      ? "shadow-[0_0_80px_rgba(34,211,238,1)]"
                      : "shadow-[0_0_25px_rgba(34,211,238,0.4)]"
                    }
                  `}
                />

                <Image
                  src="/logo.svg"
                  alt="Orbitina Logo"
                  fill
                  priority
                  className="object-contain p-4 pointer-events-none scale-110"
                />

                <motion.div
                  animate={{ opacity: systemOn ? 0 : 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px]"
                >
                  <span className="text-sm tracking-[0.5em] font-semibold text-cyan-200 drop-shadow-[0_0_14px_rgba(34,211,238,1)]">
                    ACTIVATE
                  </span>
                </motion.div>

              </motion.button>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-lg font-light tracking-wide text-cyan-300/90 max-w-md leading-relaxed"
            >
              Orchestrate intelligent digital entities in a unified luminous control space.
            </motion.p>

          </div>

          {/* RIGHT PANEL */}
          <motion.div
            animate={{
              opacity: systemOn ? 1 : 0.25,
              filter: systemOn ? "brightness(1)" : "brightness(0.6)"
            }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="grid gap-6">
              <StatCard label="Agent Groups" value={totalGroups} glow={systemOn} />
              <StatCard label="Total Agents" value={totalInstances} glow={systemOn} />
              <StatCard label="System Status" value={systemOn ? "ONLINE" : "OFFLINE"} glow={systemOn} />
            </div>
          </motion.div>

        </div>

        {/* AGENTS */}
        <div className="space-y-10">

          <h2 className="text-lg tracking-wide text-slate-300">
            Your Agents
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {agents.slice(0, 3).map((group) => {

              const total = group.instances?.length ?? 0;

              const active =
                group.instances?.filter((i) => i.status === "active").length ?? 0;

              return (
                <div
                  key={group.id}
                  className="group relative rounded-2xl p-6 border border-slate-700 bg-white/5 hover:border-cyan-400/40 transition"
                >

                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">

                    <Link
                      href={`/agents/${group.id}/edit`}
                      className="p-2 rounded-full hover:bg-cyan-400/10 transition"
                    >
                      <Pencil className="w-4 h-4 text-cyan-300" />
                    </Link>

                    <button
                      onClick={() => {
                        if (confirm("Delete this group?")) {
                          deleteGroup(group.id);
                        }
                      }}
                      className="p-2 rounded-full hover:bg-fuchsia-400/10 transition"
                    >
                      <Trash2 className="w-4 h-4 text-fuchsia-400" />
                    </button>

                  </div>

                  <Link href={`/agents/${group.id}`}>

                    <div className="flex flex-col items-center space-y-4">

                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${group.color}, #22d3ee)`
                        }}
                      >
                        <Bot className="w-8 h-8 text-white" />
                      </div>

                      <div className="text-center space-y-1">

                        <h3 className="text-sm font-medium text-slate-200">
                          {group.name}
                        </h3>

                        <p className="text-xs text-slate-400">
                          {total} {total === 1 ? "Agent" : "Agents"}
                        </p>

                        <p className="text-xs text-cyan-400">
                          {active} active
                        </p>

                      </div>

                    </div>

                  </Link>

                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="mt-40 flex justify-end items-center pb-8 group"
      >
        <div className="flex items-center gap-3">

          <div
            className="
        relative w-12 h-12 rounded-full overflow-hidden
        border border-cyan-400/30
        transition-all duration-300
        group-hover:border-cyan-400/70
        group-hover:shadow-[0_0_18px_rgba(34,211,238,0.7)]
      "
          >
            <Image
              src="/KarolartLogo.svg"
              alt="Karolart90 Logo"
              fill
              className="object-cover"
            />
          </div>

          <p
            className="
        text-[11px] tracking-[0.25em]
        text-cyan-400/40
        transition-all duration-300
        group-hover:text-cyan-300
      "
          >
            © 2026 — Karolart90
          </p>

        </div>
      </motion.footer>

      {/* AUDIO */}
      <audio ref={audioRef} src="/powersound.mp3" preload="auto" />

    </div>
  );
}

/* STAT CARD */

function StatCard({
  label,
  value,
  glow,
}: {
  label: string;
  value: string | number;
  glow: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`rounded-2xl p-6 bg-[#0a0f18] border ${glow ? "border-cyan-400/50" : "border-cyan-500/20"
        }`}
    >
      <p className="text-[11px] tracking-[0.25em] text-cyan-300/60 uppercase">
        {label}
      </p>

      <motion.p
        key={value}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`mt-4 text-4xl font-mono font-bold ${glow
          ? "text-cyan-300 drop-shadow-[0_0_18px_rgba(34,211,238,1)]"
          : "text-cyan-300/70"
          }`}
      >
        {value}
      </motion.p>

    </motion.div>
  );
}