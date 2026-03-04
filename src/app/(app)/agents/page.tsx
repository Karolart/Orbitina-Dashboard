"use client";

import { useRouter } from "next/navigation";
import { Bot, Plus, ArrowLeft } from "lucide-react";
import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useAgentsStore } from "@/features/agents/agents.store";

export default function AgentsPage() {
  const router = useRouter();
  const parentRef = useRef<HTMLDivElement>(null);

  const agents = useAgentsStore((s) => s.agents);

  const rowVirtualizer = useVirtualizer({
    count: agents.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 160,
    overscan: 5,
  });

  return (
    <div className="min-h-screen px-10 py-16">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <div>
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-purple-300 hover:text-cyan-300 transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </button>

          <h1 className="text-4xl font-semibold text-white">
            Agents ({agents.length})
          </h1>
        </div>

        <button
          onClick={() => router.push("/agents/create")}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 text-black font-medium hover:scale-105 transition"
        >
          <Plus className="w-4 h-4 inline mr-2" />
          New Agent
        </button>

      </div>

      {agents.length === 0 && (
        <div className="text-center text-slate-400 py-20">
          No agents created yet.
        </div>
      )}

      {agents.length > 0 && (
        <div
          ref={parentRef}
          className="h-[600px] overflow-auto border border-white/10 rounded-2xl"
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const group = agents[virtualRow.index];

              return (
                <div
                  key={group.id}
                  className="absolute left-0 w-full px-6 py-4"
                  style={{
                    top: 0,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <div
                    onClick={() =>
                      router.push(`/agents/${group.id}`)
                    }
                    className="cursor-pointer bg-black/40 p-6 rounded-2xl border border-cyan-400 hover:scale-[1.02] transition"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: group.color }}
                      >
                        <Bot className="w-6 h-6 text-black" />
                      </div>

                      <div>
                        <h3 className="text-white font-semibold">
                          {group.name}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {group.instances.length} instances
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}