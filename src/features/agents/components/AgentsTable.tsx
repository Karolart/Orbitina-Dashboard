"use client";

import { useRouter } from "next/navigation";
import {
  Bot,
  Plus,
  Search,
  ArrowLeft,
  Trash2,
  Pencil,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useMemo, useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useAgentsStore } from "@/features/agents/agents.store";

export default function AgentsVirtualList() {
  const router = useRouter();
  const parentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const agents = useAgentsStore((s) => s.agents);
  const deleteGroup = useAgentsStore((s) => s.deleteGroup);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredAgents = useMemo(() => {
    return agents.filter((group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [agents, searchQuery]);

  const columnCount = 6;
  const allItems = [{ type: "new" }, ...filteredAgents];
  const rowCount = Math.ceil(allItems.length / columnCount);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 170,
    overscan: 5,
  });

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0b0f16] px-10 py-20 text-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* HEADER */}
        <div className="space-y-6">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </button>

          <h1 className="text-2xl font-semibold tracking-tight">
            Agent Registry ({filteredAgents.length})
          </h1>
        </div>

        {/* SEARCH */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              pl-9 h-10 w-full
              rounded-lg
              bg-[#0f1623]
              border border-cyan-500/20
              focus:border-cyan-400/40
              focus:outline-none
              text-sm
              transition
            "
          />
        </div>

        {/* GRID */}
        <div ref={parentRef} className="h-[700px] overflow-auto">
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const startIndex = virtualRow.index * columnCount;
              const rowItems = allItems.slice(
                startIndex,
                startIndex + columnCount
              );

              return (
                <div
                  key={virtualRow.index}
                  className="absolute left-0 w-full grid grid-cols-6 gap-6"
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {rowItems.map((item: any) => {

                    // NEW NODE
                    if (item.type === "new") {
                      return (
                        <motion.div
                          key="new"
                          whileHover={{ scale: 1.08 }}
                          onClick={() => router.push("/agents/create")}
                          className="
                            relative
                            aspect-square
                            rounded-lg
                            border border-dashed border-cyan-500/30
                            flex items-center justify-center
                            cursor-pointer
                            hover:border-cyan-400/70
                            transition
                            group
                          "
                        >
                          <Plus className="w-6 h-6 text-cyan-400" />

                          <span className="
                            absolute bottom-[-26px] left-1/2 -translate-x-1/2
                            text-[10px]
                            tracking-widest
                            uppercase
                            text-cyan-400
                            opacity-0
                            group-hover:opacity-100
                            transition
                            whitespace-nowrap
                          ">
                            Create
                          </span>
                        </motion.div>
                      );
                    }

                    const group = item;

                    return (
                      <motion.div
                        key={group.id}
                        whileHover={{ scale: 1.08 }}
                        className="relative group"
                      >
                        <div
                          onClick={() =>
                            router.push(`/agents/${group.id}`)
                          }
                          className="
                            aspect-square
                            rounded-lg
                            bg-[#0a0f18]
                            border border-cyan-500/15
                            flex items-center justify-center
                            cursor-pointer
                            transition
                          "
                        >
                          <div
                            className="w-14 h-14 rounded-full flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${group.color}, rgba(34,211,238,0.8))`,
                            }}
                          >
                            <Bot className="w-5 h-5 text-black" />
                          </div>
                        </div>

                        {/* Tooltip name */}
                        <span className="
                          absolute bottom-[-26px] left-1/2 -translate-x-1/2
                          text-[10px]
                          tracking-widest
                          uppercase
                          text-cyan-300
                          opacity-0
                          group-hover:opacity-100
                          transition
                          whitespace-nowrap
                        ">
                          {group.name}
                        </span>

                        {/* Hover controls */}
                        <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                          <button
                            onClick={() =>
                              router.push(`/agents/${group.id}/edit`)
                            }
                            className="text-slate-500 hover:text-cyan-300 transition"
                          >
                            <Pencil className="w-3 h-3" />
                          </button>

                          <button
                            onClick={() => {
                              const confirmed = confirm("Delete?");
                              if (confirmed) deleteGroup(group.id);
                            }}
                            className="text-slate-500 hover:text-rose-400 transition"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>

                      </motion.div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}