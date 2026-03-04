"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { History, Search, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { getGenerationRuns } from "@/features/generations/generation.service";

export default function GenerationHistory() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const runs = useMemo(() => getGenerationRuns(), []);

  const filtered = useMemo(() => {
    return runs.filter((run) =>
      run.parameters.type
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [runs, searchQuery]);

  return (
    <div className="relative min-h-screen bg-[#0b0f16] px-10 py-20 text-slate-200">

      <div className="relative max-w-5xl mx-auto space-y-16">

        {/* BACK — texto sistema */}
        <motion.button
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ x: -4 }}
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-300 transition-colors tracking-wide"
        >
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </motion.button>

        {/* HEADER */}
        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-semibold tracking-tight"
          >
            Generation Runs
          </motion.h1>

          <p className="text-slate-400 text-sm tracking-wide">
            {runs.length}{" "}
            {runs.length === 1 ? "execution recorded" : "executions recorded"}
          </p>
        </div>

        {/* SEARCH — módulo técnico */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />

          <input
            placeholder="Search by type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              pl-10 h-11 w-full
              rounded-xl
              bg-[#0f1623]
              border border-cyan-500/20
              text-slate-200
              focus:outline-none
              focus:border-cyan-400/40
              transition
            "
          />

          {/* micro glow */}
          <div className="absolute inset-0 pointer-events-none rounded-xl bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05),transparent_70%)]" />
        </motion.div>

        {/* LIST */}
        <div className="space-y-6">

          {filtered.map((run, index) => (
            <motion.div
              key={run.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="
                relative
                rounded-2xl
                p-6
                bg-[#0a0f18]
                border border-cyan-500/15
                overflow-hidden
              "
            >
              {/* Halo interno sutil */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05),transparent_70%)]" />

              {/* Marco técnico interno */}
              <div className="absolute inset-2 rounded-xl border border-cyan-400/10 pointer-events-none" />

              <div className="relative z-10 flex justify-between items-start">

                <div className="space-y-3">

                  <h3 className="text-base font-medium text-cyan-300">
                    {run.parameters.quantity} agents generated
                  </h3>

                  <p className="text-xs text-slate-500 tracking-wide">
                    {new Date(run.createdAt).toLocaleString()}
                  </p>

                  <p className="text-xs text-cyan-400/80 uppercase tracking-widest">
                    Type: {run.parameters.type ?? "N/A"}
                  </p>

                  {run.parameters.seed && (
                    <p className="text-xs text-slate-600">
                      Seed: {run.parameters.seed}
                    </p>
                  )}
                </div>

                {/* STATUS estilo señal digital */}
                <motion.div
                  animate={{
                    opacity:
                      run.status === "success"
                        ? [0.6, 1, 0.6]
                        : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat:
                      run.status === "success"
                        ? Infinity
                        : 0,
                  }}
                  className={`
                    text-xs tracking-widest uppercase
                    ${
                      run.status === "success"
                        ? "text-cyan-300"
                        : "text-rose-400"
                    }
                  `}
                >
                  {run.status}
                </motion.div>

              </div>

              {/* LINK COMO TEXTO SISTEMA */}
              {run.generatedGroupIds.length > 0 && (
                <div className="mt-6">
                  <button
                    onClick={() =>
                      router.push(
                        `/agents/${run.generatedGroupIds[0]}`
                      )
                    }
                    className="text-sm text-slate-400 hover:text-cyan-300 transition-colors tracking-wide"
                  >
                    View generated group →
                  </button>
                </div>
              )}

            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-600">
              <History className="w-6 h-6 mx-auto mb-3 opacity-60" />
              No generation runs found.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}